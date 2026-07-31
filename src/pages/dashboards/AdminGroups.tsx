import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../../utils/seo";
import { useState, useEffect, useRef, useCallback } from "react";
import { AlertCircle, ArrowRightLeft, Ban, BarChart2, CheckCircle, ChevronDown, Edit, FileText, Loader2, Monitor, Plus, Trash2, UserPlus, Users, X } from 'lucide-react';

// ✅ AbortController ref — stale API requests cancel karne ke liye
let abortControllerRefGroups: AbortController | null = null;
import {
  apiClient,
  type Group as APIGroup,
  type GroupUser,
  type CreateGroupPayload,
} from "@/utils/enhancedApiClient";
import { useAuth } from "@/auth/AuthContext";
import { useSubusers } from "@/hooks/useSubusers";
import { authService } from "@/utils/authService";
import { isDemoMode } from "@/data/demoData";
import { encodeEmail } from "@/utils/encodeEmail";
import { indexedDBService } from "@/services/indexedDBService";
import { useNotification } from "@/contexts/NotificationContext";

// ✅ Helper to suppress logs in demo mode
const devLog = (...args: any[]) => {
  if (!isDemoMode()) {
    console.log(...args);
  }
};
const devError = (...args: any[]) => {
  if (!isDemoMode()) {
    console.error(...args);
  }
};

interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Subuser" | "Group Admin";
  department: string;
  license: number;
  licenseKey: string;
  profile: string;
  isGroupAdmin?: boolean;
}

interface Group {
  id: number;
  name: string;
  description: string;
  created: string;
  users: User[];
  licenseStats?: {
    totalAllocated: number;
    distributedToUsers: number;
    available: number;
    usagePercent: number;
  };
}

interface LicenseSummary {
  totalAllocated: number;
  totalDistributed: number;
  totalAvailable: number;
  overallUsagePercent: number;
}

export default function AdminGroups() {
  const { showInfo, showSuccess, showError } = useNotification();
  const { user } = useAuth();
  const isDemo = isDemoMode();

  // ✅ Get current user email from multiple sources (same as AdminReports)
  const getUserEmail = (): string => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");

    let storedUserData = null;
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {
        // console.error("Error parsing user_data:", e);
      }
    }

    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {
        // console.error("Error parsing authUser:", e);
      }
    }

    const jwtUser = authService.getUserFromToken();
    return (
      storedUserData?.user_email ||
      jwtUser?.user_email ||
      jwtUser?.email ||
      user?.email ||
      ""
    );
  };

  const currentUserEmail = getUserEmail();

  // Fetch subusers for dropdown - only if we have a valid email
  const {
    data: subusersData = [],
    isLoading: isLoadingSubusers,
    error: subusersError,
  } = useSubusers(currentUserEmail, !!currentUserEmail);

  // Debug logging for subusers data
  useEffect(() => {
    // console.log('============ ADMINGROUPS DEBUG ============');
    // console.log('👤 User from AuthContext:', user);
    // console.log('📧 Current User Email (from getUserEmail):', currentUserEmail);
    // console.log('📋 Subusers Data:', subusersData);
    // console.log('📊 Subusers Count:', subusersData?.length || 0);
    // console.log('⏳ Is Loading Subusers:', isLoadingSubusers);
    // console.log('❌ Subusers Error:', subusersError);
    // console.log('==========================================');
  }, [user, currentUserEmail, subusersData, isLoadingSubusers, subusersError]);

  const [groups, setGroups] = useState<Group[]>([]);
  const [licenseSummary, setLicenseSummary] = useState<LicenseSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [groupsCached, setGroupsCached] = useState(false);

  // ✅ processGroupsData — Extracted for reuse
  const processGroupsData = useCallback((groupsData: any) => {
    if (!groupsData?.groups?.data || !Array.isArray(groupsData.groups.data)) {
      devError("❌ Unexpected response structure:", groupsData);
      return;
    }

    const apiGroups = groupsData.groups.data;
    const apiLicenseSummary = groupsData.groups.licenseSummary;

    if (apiLicenseSummary) {
      setLicenseSummary(apiLicenseSummary);
    }

    const transformedGroups: Group[] = apiGroups.map((group: any, index: number) => {
      const cleanId = group.groupId?.toString().replace(/^group-/, "") || `${index + 1}`;
      return {
        id: parseInt(cleanId) || index + 1,
        name: group.groupName || "Unnamed Group",
        description: group.groupDescription || "",
        created: group.createdAt || new Date().toISOString().split("T")[0],
        licenseStats: group.licenseStats || null,
        users: group.users?.map((user: any, userIndex: number) => {
          const cleanUserId = user.userId?.toString().replace(/^user-/, "") || `${userIndex + 1}`;
          return {
            id: parseInt(cleanUserId) || userIndex + 1,
            name: user.name || "Unknown",
            email: user.email || "",
            role: (user.role === "GroupAdmin" ? "Group Admin" : user.role === "user" ? "User" : "Subuser") as any,
            license: user.licenseCount || user.license || 0,
            profile: user.role || "User",
          };
        }) || [],
      };
    });

    setGroups(transformedGroups);
    setGroupsCached(true);
  }, []);

  // ✅ fetchGroups — optimized with cache-first logic
  const fetchGroups = useCallback(async (silent: boolean = false) => {
    if (groupsCached && !silent) return;

    if (!silent) {
      setIsLoading(true);
      setIsError(null);
    }

    if (isDemo) {
      setIsLoading(false);
      setGroupsCached(true);
      return; // static data handled in init
    }

    try {
      const groupsCacheKey = currentUserEmail ? `groups_with_users_${currentUserEmail}` : "groups_with_users";

      if (!silent) {
        const cached = await indexedDBService.get("groups", groupsCacheKey);
        if (cached) {
          devLog("✅ Loaded groups from IndexedDB");
          processGroupsData(cached);
          if (!silent) setIsLoading(false);
          // Refresh background
          fetchGroups(true);
          return;
        }
      }

      const response = await apiClient.getGroupsWithUsers();
      if (response.success && response.data) {
        indexedDBService.put("groups", groupsCacheKey, response.data).catch(e => devError("IDB Write Failed", e));
        processGroupsData(response.data);
      } else {
        if (!silent) setIsError(response.message || "Failed to fetch groups");
      }
    } catch (error: any) {
      devError("Error fetching groups:", error);
      if (!silent) setIsError(error.message || "An unexpected error occurred");
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [groupsCached, isDemo, currentUserEmail, processGroupsData]);

  // ✅ fetchMachinesAndReportsCount — optimized metrics
  // PURANA CODE: getAuditReportsByEmail use karta tha jo response format mismatch ki wajah se 0 return karta tha
  // NAYA CODE: getFilteredAuditReports use karo (same as AdminReports) + wrapped response format handle karo
  const fetchMachinesAndReportsCount = useCallback(async (silent = false) => {
    if (abortControllerRefGroups) abortControllerRefGroups.abort();
    abortControllerRefGroups = new AbortController();
    const currentAbort = abortControllerRefGroups;

    if (isDemo) return;

    const email = getUserEmail();
    const cacheKey = email ? `group_metrics_${email}` : "group_metrics";

    try {
      if (!silent) {
        const cached = await indexedDBService.get("groups", cacheKey);
        if (cached) {
          setTotalMachines(cached.totalMachines || 0);
          setTotalReports(cached.totalReports || 0);
          // NOTE: Cache skip kar rahe hain — hamesha fresh fetch karo taaki stale 0 values na dikhen
        }
      }

      // Sab group users ke unique emails nikalo
      const allGroupUsers = groups.flatMap((group) => group.users);
      const uniqueUserEmails = [...new Set(allGroupUsers.map((user) => user.email))].filter(Boolean);

      // Admin user ka email bhi include karo agar groups mein nahi hai
      if (email && !uniqueUserEmails.includes(email)) {
        uniqueUserEmails.push(email);
      }

      if (uniqueUserEmails.length === 0) return;

      const results = await Promise.all(uniqueUserEmails.map(async (uEmail) => {
        try {
          // Machines aur Reports parallel fetch karo — dono enhanced endpoints use karo
          const [mRes, rRes] = await Promise.all([
            apiClient.getFilteredMachines({ userEmail: uEmail }),
            apiClient.getFilteredAuditReports({ userEmail: uEmail }),
          ]);

          // 🔍 DEBUG: API response structure dekhne ke liye
          console.log(`📊 [AdminGroups] Machines API for ${uEmail}:`, {
            success: mRes.success,
            isArray: Array.isArray(mRes.data),
            dataType: typeof mRes.data,
            dataKeys: mRes.data && typeof mRes.data === 'object' ? Object.keys(mRes.data as any) : 'N/A',
            dataLength: Array.isArray(mRes.data) ? mRes.data.length : 'not array',
            rawData: mRes.data,
          });
          console.log(`📊 [AdminGroups] Reports API for ${uEmail}:`, {
            success: rRes.success,
            isArray: Array.isArray(rRes.data),
            dataType: typeof rRes.data,
            dataKeys: rRes.data && typeof rRes.data === 'object' ? Object.keys(rRes.data as any) : 'N/A',
            rawData: rRes.data,
          });

          // Machines count — response { machines: [...] } ya direct array ho sakta hai
          let machineCount = 0;
          if (mRes.success && mRes.data) {
            const mData = mRes.data as any;
            if (mData.machines && Array.isArray(mData.machines)) {
              // Wrapped format: { machines: [...] }
              machineCount = mData.machines.length;
            } else if (Array.isArray(mRes.data)) {
              // Direct array format
              machineCount = mRes.data.length;
            } else if (typeof mData === 'object' && !Array.isArray(mData)) {
              // Single object — count as 1
              machineCount = 1;
            }
          }

          // Reports count — response { reports: [...] } ya direct array ho sakta hai
          let reportCount = 0;
          if (rRes.success && rRes.data) {
            const resData = rRes.data as any;
            if (resData.reports && Array.isArray(resData.reports)) {
              // Wrapped format: { reports: [...] }
              reportCount = resData.reports.length;
            } else if (Array.isArray(rRes.data)) {
              // Direct array format
              reportCount = rRes.data.length;
            }
          }

          console.log(`✅ [AdminGroups] Counts for ${uEmail}: machines=${machineCount}, reports=${reportCount}`);
          return { machines: machineCount, reports: reportCount };
        } catch (err) {
          console.error(`❌ [AdminGroups] Error fetching for ${uEmail}:`, err);
          return { machines: 0, reports: 0 };
        }
      }));

      if (currentAbort.signal.aborted) return;

      let allMachines = 0; let allReports = 0;
      results.forEach(res => { allMachines += res.machines; allReports += res.reports; });

      setTotalMachines(allMachines);
      setTotalReports(allReports);
      indexedDBService.put("groups", cacheKey, { totalMachines: allMachines, totalReports: allReports, updatedAt: new Date().toISOString() });
    } catch (error) {
      if (!currentAbort.signal.aborted) devError("Error fetching metrics:", error);
    }
  }, [groups, isDemo, getUserEmail]);

  useEffect(() => {
    // ✅ NAYA CODE — Initialization logic
    const init = async () => {
      if (isDemo) {
        // Demo mode bypass
        setGroups([
          {
            id: 1,
            name: "Engineering Team",
            description: "Software development and engineering",
            created: "2024-01-15",
            licenseStats: {
              totalAllocated: 100,
              distributedToUsers: 45,
              available: 55,
              usagePercent: 45,
            },
            users: [
              {
                id: 1,
                name: "John Doe",
                email: "john.doe@demo.com",
                role: "User",
                department: "Engineering",
                license: 5,
                licenseKey: "",
                profile: "Developer",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@demo.com",
                role: "User",
                department: "Engineering",
                license: 3,
                licenseKey: "",
                profile: "Senior Developer",
              },
            ],
          },
          {
            id: 2,
            name: "Marketing Team",
            description: "Marketing and communications",
            created: "2024-02-20",
            licenseStats: {
              totalAllocated: 50,
              distributedToUsers: 28,
              available: 22,
              usagePercent: 56,
            },
            users: [
              {
                id: 3,
                name: "Mike Johnson",
                email: "mike.johnson@demo.com",
                role: "User",
                department: "Marketing",
                license: 2,
                licenseKey: "",
                profile: "Marketing Manager",
              },
            ],
          },
        ]);
        setLicenseSummary({
          totalAllocated: 150,
          totalDistributed: 73,
          totalAvailable: 77,
          overallUsagePercent: 48.7,
        });
        setTotalMachines(47);
        setTotalReports(128);
        setIsLoading(false);
        setGroupsCached(true);
      } else {
        // Live Mode: Strictly Cache-First
        await fetchGroups(false);
      }
    };
    init();
  }, []);

  /* import { indexedDBService } from "@/services/indexedDBService"; */
  /* Note: Assuming imports are at top, I will add import in a separate block or assuming user handles it. 
     Wait, I can't add import here easily if I target this block. 
     I will add import in a separate replace_file_content call first. 
  */


  const fetchAvailableUsers = async () => {
    try {
      setIsLoadingUsers(true);

      // Skip API calls for demo mode
      if (isDemo) {
        setAvailableUsers([
          {
            email: "john.doe@demo.com",
            name: "John Doe (Demo)",
            type: "Subuser",
          },
          {
            email: "jane.smith@demo.com",
            name: "Jane Smith (Demo)",
            type: "Subuser",
          },
        ]);
        setIsLoadingUsers(false);
        return;
      }

      // console.log('🔍 Fetching available users and subusers...');

      // Get current authenticated user email from AuthContext
      const authenticatedEmail = user?.email;

      if (!authenticatedEmail) {
        // console.error('❌ No authenticated user found in AuthContext');
        // console.log('🔍 AuthContext user object:', user);
        setAvailableUsers([]);
        setIsLoadingUsers(false);
        return;
      }

      // console.log('👤 Authenticated user from AuthContext:', authenticatedEmail);
      // console.log('👤 User role:', user?.role);

      // Fetch subusers for the authenticated user
      // console.log('📡 Calling API: /api/Subuser/by-superuser/' + authenticatedEmail);
      const subusersResponse =
        await apiClient.getSubusersBySuperuser(authenticatedEmail);

      // console.log('📥 API Response:', subusersResponse);

      const usersList: Array<{ email: string; name: string; type: string }> =
        [];

      // Add subusers to the list
      if (subusersResponse.success && Array.isArray(subusersResponse.data)) {
        // console.log('✅ Raw subusers data:', subusersResponse.data);

        subusersResponse.data.forEach((subuser: any) => {
          // console.log('🔹 Processing subuser:', subuser);
          if (subuser.email || subuser.subuser_email) {
            const subuserEmail = subuser.email || subuser.subuser_email;
            const subuserName =
              subuser.name || subuser.subuser_name || subuserEmail;

            usersList.push({
              email: subuserEmail,
              name: subuserName,
              type: "Subuser",
            });
            // console.log('✅ Added subuser to dropdown:', subuserEmail);
          }
        });
        // console.log('✅ Found subusers:', subusersResponse.data.length);
      } else {
        // console.log('ℹ️ No subusers found for authenticated user:', authenticatedEmail);
        // console.log('ℹ️ API response success:', subusersResponse.success);
        // console.log('ℹ️ API response data:', subusersResponse.data);
      }

      setAvailableUsers(usersList);
      // console.log('✅ Total users loaded for dropdown:', usersList.length);
      // console.log('✅ Final dropdown list:', usersList);
    } catch (error: any) {
      // console.error('❌ Error fetching subusers:', error);
      // console.error('❌ Error details:', error.message, error.stack);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [makeGroupAdmin, setMakeGroupAdmin] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<
    Array<{ email: string; name: string; type: string }>
  >([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [removingUser, setRemovingUser] = useState<{
    groupId: number;
    userEmail: string;
  } | null>(null);

  // Transfer modal state
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [selectedTransferUser, setSelectedTransferUser] = useState("");
  const [availableMachines, setAvailableMachines] = useState<any[]>([]);
  const [availableLicenses, setAvailableLicenses] = useState<any[]>([]);
  const [isLoadingMachines, setIsLoadingMachines] = useState(false);

  // Revoke modal state
  const [selectedRevokeMachines, setSelectedRevokeMachines] = useState<
    string[]
  >([]);
  const [selectedRevokeLicenses, setSelectedRevokeLicenses] = useState<
    string[]
  >([]);
  const [selectedRevokeUser, setSelectedRevokeUser] = useState("");
  const [userMachines, setUserMachines] = useState<any[]>([]);
  const [userLicenses, setUserLicenses] = useState<any[]>([]);
  const [isLoadingUserAssets, setIsLoadingUserAssets] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    licenseAllocation: 0,
    permission: "",
    status: "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const totalUsers = groups.reduce((sum, group) => sum + group.users.length, 0);
  const [totalMachines, setTotalMachines] = useState(0);
  const [totalReports, setTotalReports] = useState(0);

  // Fetch total machines and reports for all group members
  useEffect(() => {
    if (groups.length === 0) return;

    // ✅ Debounce 300ms 
    const timer = setTimeout(() => {
      fetchMachinesAndReportsCount();
    }, 300);

    return () => clearTimeout(timer);
  }, [groups]);


  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const handleAddGroup = () => {
    setFormData({
      name: "",
      description: "",
      licenseAllocation: 0,
      permission: "",
      status: "active",
    });
    setErrorMessage("");
    setShowAddModal(true);
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    setFormData({
      name: group.name,
      description: group.description,
      licenseAllocation: 0, // Will need to get from API response if available
      permission: "", // Will need to get from API response if available
      status: "active", // Will need to get from API response if available
    });
    setErrorMessage("");
    setShowEditModal(true);
  };

  const handleDeleteGroup = (group: Group) => {
    setSelectedGroup(group);
    setShowDeleteModal(true);
  };

  const handleSaveNewGroup = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const now = new Date().toISOString();
      const payload: CreateGroupPayload = {
        groupId: 0,
        groupName: formData.name,
        groupDescription: formData.description,
        groupLicenseAllocation: formData.licenseAllocation,
        groupPermission: formData.permission,
        status: formData.status,
        createdAt: now,
        updatedAt: now,
      };

      if (isDemo) {
        showInfo("Demo Mode", "Adding groups is disabled in demo mode");
        setShowAddModal(false);
        return;
      }

      // console.log('📤 Creating group with payload:', payload);
      const response = await apiClient.createGroup(payload);

      if (response.success) {
        // console.log('✅ Group created successfully:', response.data);
        setShowAddModal(false);
        setFormData({
          name: "",
          description: "",
          licenseAllocation: 0,
          permission: "",
          status: "active",
        });
        setErrorMessage("");
        // Silent refresh to get updated data
        await fetchGroups(true);
      } else {
        const errorMsg = response.error || response.message || "Unknown error";
        // console.error('❌ Failed to create group:', errorMsg);

        // Parse license allocation error
        if (
          errorMsg.includes("License allocation") &&
          errorMsg.includes("exceeds available licenses")
        ) {
          const availableMatch = errorMsg.match(
            /Available for allocation: (\d+)/,
          );
          const requestedMatch = errorMsg.match(/Requested: (\d+)/);
          const maxMatch = errorMsg.match(/Max Licenses: (\d+)/);

          if (availableMatch && requestedMatch) {
            setErrorMessage(
              `Cannot allocate ${requestedMatch[1]} licenses. Only ${availableMatch[1]} licenses available for allocation${maxMatch ? ` (out of ${maxMatch[1]} total)` : ""}.`,
            );
          } else {
            setErrorMessage(errorMsg);
          }
        } else {
          setErrorMessage(errorMsg);
        }
      }
    } catch (error: any) {
      // console.error('❌ Error creating group:', error);
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEditGroup = async () => {
    if (!selectedGroup) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const now = new Date().toISOString();
      const payload: CreateGroupPayload = {
        groupId: selectedGroup.id,
        groupName: formData.name,
        groupDescription: formData.description,
        groupLicenseAllocation: formData.licenseAllocation,
        groupPermission: formData.permission,
        status: formData.status,
        createdAt: now, // API might ignore this, but keeping for consistency
        updatedAt: now,
      };

      // console.log('📝 Updating group:', selectedGroup.id, 'Payload:', payload);

      if (isDemo) {
        showInfo("Demo Mode", "Editing groups is disabled in demo mode");
        setShowEditModal(false);
        return;
      }

      const response = await apiClient.updateGroup(
        selectedGroup.id.toString(),
        payload,
      );

      if (response.success) {
        // console.log('✅ Group updated successfully:', response.data);
        setShowEditModal(false);
        setErrorMessage("");
        setSelectedGroup(null);
        setFormData({
          name: "",
          description: "",
          licenseAllocation: 0,
          permission: "",
          status: "active",
        });
        // Silent refresh to get updated data
        await fetchGroups(true);
      } else {
        const errorMsg = response.error || response.message || "Unknown error";
        // console.error('❌ Failed to update group:', errorMsg);
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      // console.error('❌ Error updating group:', error);
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveUserFromGroup = async (
    groupId: number,
    groupName: string,
    userEmail: string,
    userName: string,
  ) => {
    if (
      !confirm(
        `Are you sure you want to remove ${userName} (${userEmail}) from ${groupName}?`,
      )
    ) {
      return;
    }

    try {
      setRemovingUser({ groupId, userEmail });

      // console.log(`🗑️ Removing user ${userEmail} from group ${groupName}`);

      if (isDemo) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setRemovingUser(null);
        await fetchGroups(true);
        return;
      }

      const response = await apiClient.removeUserFromGroupByEmail(
        groupId.toString(),
        userEmail,
      );

      if (!response.success) {
        const errorMsg =
          response.error ||
          response.message ||
          "Failed to remove user from group";
        // console.error('❌ Failed to remove user:', errorMsg);
        setRemovingUser(null);
        return;
      }

      // console.log('✅ User removed successfully');
      // Silent refresh to get updated data
      await fetchGroups(true);
    } catch (error) {
      // console.error('❌ Failed to remove user from group:', error);
    } finally {
      setRemovingUser(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedGroup) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // console.log('🗑️ Deleting group:', selectedGroup.id, selectedGroup.name);

      if (isDemo) {
        showInfo("Demo Mode", "Deleting groups is disabled in demo mode");
        setShowDeleteModal(false);
        return;
      }

      const response = await apiClient.deleteGroup(selectedGroup.id.toString());

      if (response.success) {
        // console.log('✅ Group deleted successfully');
        setShowDeleteModal(false);
        setSelectedGroup(null);
        // Silent refresh to get updated data
        await fetchGroups(true);
      } else {
        const errorMsg = response.error || response.message || "Unknown error";
        // console.error('❌ Failed to delete group:', errorMsg);

        // Parse specific error messages for better user guidance
        if (
          errorMsg.toLowerCase().includes("assigned subusers") ||
          errorMsg.toLowerCase().includes("has members")
        ) {
          setErrorMessage(
            "Cannot delete group with assigned members. Please remove all users from this group before deleting it.",
          );
        } else if (errorMsg.toLowerCase().includes("not found")) {
          setErrorMessage("Group not found. It may have already been deleted.");
        } else if (
          errorMsg.toLowerCase().includes("permission") ||
          errorMsg.toLowerCase().includes("unauthorized")
        ) {
          setErrorMessage("You do not have permission to delete this group.");
        } else {
          setErrorMessage(errorMsg);
        }
      }
    } catch (error: any) {
      // console.error('❌ Error deleting group:', error);
      setErrorMessage(
        error.message ||
          "An unexpected error occurred while deleting the group.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenAddUserModal = (group: Group) => {
    setSelectedGroup(group);
    setUserEmail("");
    setMakeGroupAdmin(false);
    setErrorMessage("");
    setShowAddUserModal(true);

    // Log details when modal opens
    // console.log('🔓 Add User Modal Opened');
    // console.log('📧 User Email for API:', currentUserEmail);
    // console.log('📋 Available Subusers:', subusersData);
    // console.log('🔢 Subusers Count:', subusersData?.length || 0);

    // Check if subusers are being fetched
    if (!currentUserEmail) {
      // console.error('❌ No user email found! Cannot fetch subusers.');
      setErrorMessage("Unable to load users. Please ensure you are logged in.");
    } else if (subusersData.length === 0) {
      // console.warn('⚠️ No subusers found for user:', currentUserEmail);
    }
  };

  const handleAddUserToGroup = async () => {
    if (!selectedGroup || !userEmail) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      /* 
      // ********** PURANA CODE (COMMENTED) **********
      const response = await apiClient.addUserToGroupByEmail(
        selectedGroup.id.toString(),
        userEmail,
      );
      // *******************************************
      */

      if (isDemo) {
        showInfo("Demo Mode", "Adding members is disabled in demo mode");
        setShowAddUserModal(false);
        return;
      }

      // ********** NAYA CODE (APPLIED) **********
      // If the "Group Admin" box is checked, assign GroupAdmin role
      const response = await apiClient.addMemberToGroupByEmail(
        selectedGroup.id.toString(),
        {
          email: userEmail,
          groupRole: makeGroupAdmin ? "GroupAdmin" : "GroupMember",
        },
      );
      // *****************************************

      if (response.success) {
        // console.log('✅ User added successfully:', response.data);
        setShowAddUserModal(false);
        setUserEmail("");
        setMakeGroupAdmin(false);
        setErrorMessage("");
        setSelectedGroup(null);
        // Silent refresh to get updated data
        await fetchGroups(true);
      } else {
        const errorMsg = response.error || response.message || "Unknown error";
        // console.error('❌ Failed to add user:', errorMsg);
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      // console.error('❌ Error adding user:', error);
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transfer Modal Handlers
  const handleOpenTransferModal = async (group: Group) => {
    setSelectedGroup(group);
    setShowTransferModal(true);
    setSelectedMachines([]);
    setSelectedLicenses([]);
    setSelectedTransferUser("");
    setErrorMessage("");

    // Fetch available machines and licenses for the GroupAdmin of this group
    await fetchAvailableMachinesAndLicenses(group);
  };

  const fetchAvailableMachinesAndLicenses = async (group: Group) => {
    try {
      setIsLoadingMachines(true);

      if (isDemo) {
        setAvailableMachines([
          {
            id: 1,
            machine_id: "demo-m1",
            machine_name: "Desktop-En1",
            mac_address: "00:00:00:00:00:00",
          },
          {
            id: 2,
            machine_id: "demo-m2",
            machine_name: "Desktop-En2",
            mac_address: "11:11:11:11:11:11",
          },
        ]);
        setAvailableLicenses([]);
        return;
      }

      // Find the GroupAdmin's email from the group
      const groupAdminEmail =
        group.users.find((u) => u.role === "Group Admin")?.email ||
        currentUserEmail;
      console.log("📧 Fetching machines for GroupAdmin:", groupAdminEmail);

      // Fetch machines for the GroupAdmin
      const machinesResponse =
        await apiClient.getMachinesByEmail(groupAdminEmail);
      if (machinesResponse.success && machinesResponse.data) {
        setAvailableMachines(machinesResponse.data);
        console.log(
          "✅ GroupAdmin machines loaded:",
          machinesResponse.data.length,
        );
      } else {
        setAvailableMachines([]);
      }

      // Fetch available licenses - you may need to create this API endpoint
      // For now, using placeholder
      setAvailableLicenses([]);
    } catch (error: any) {
      console.error("Error fetching machines/licenses:", error);
      setErrorMessage("Failed to load available machines and licenses");
    } finally {
      setIsLoadingMachines(false);
    }
  };

  const handleTransferAssets = async () => {
    if (!selectedGroup || !selectedTransferUser) {
      setErrorMessage("Please select a user to transfer to");
      return;
    }

    if (selectedMachines.length === 0) {
      setErrorMessage("Please select at least one machine to transfer");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (isDemo) {
        showInfo("Demo Mode", "Transferring assets is disabled in demo mode");
        setShowTransferModal(false);
        return;
      }

      if (!currentUserEmail) {
        setErrorMessage("User email not found. Please log in again.");
        return;
      }

      // Get MAC addresses for selected machines and filter for valid strings
      console.log("🔍 Selected machine IDs:", selectedMachines);
      console.log(
        "🔍 Available machines:",
        availableMachines.map((m) => ({
          id: m.id,
          machine_id: m.machine_id,
          mac_address: m.mac_address,
          machine_name: m.machine_name,
        })),
      );

      const macAddresses = availableMachines
        .filter((m) => {
          const id = String(m.id || m.machine_id);
          return selectedMachines.includes(id);
        })
        .map((m) => m.mac_address)
        .filter(
          (mac): mac is string => typeof mac === "string" && mac.length > 0,
        );

      if (macAddresses.length === 0) {
        throw new Error("No valid MAC addresses found for selected machines");
      }

      console.log("🔍 Resolved MAC addresses:", macAddresses);

      const groupAdminEmail =
        selectedGroup.users.find((u) => u.role === "Group Admin")?.email ||
        currentUserEmail;

      // Transfer via GroupDetails admin transfer endpoint
      const payload = {
        groupAdminEmail: groupAdminEmail,
        memberEmail: selectedTransferUser,
        macAddresses: macAddresses,
      };

      const apiUrl = `/api/GroupDetails/${selectedGroup.id}/admin/transfer`;
      console.log("📤 Admin Transfer URL:", apiUrl);
      console.log(
        "📤 Admin Transfer Payload:",
        JSON.stringify(payload, null, 2),
      );
      console.log("📧 GroupAdmin Email:", groupAdminEmail);
      console.log("📧 Member Email:", selectedTransferUser);

      const response = await apiClient.post(apiUrl, payload);

      console.log(
        "📥 Admin Transfer Response:",
        JSON.stringify(response, null, 2),
      );

      if (!response.success) {
        const errMsg =
          response.error || response.message || "Failed to transfer assets";
        setErrorMessage(errMsg);
        throw new Error(`${errMsg} (Details: ${JSON.stringify(response)})`);
      }

      setShowTransferModal(false);
      setSelectedMachines([]);
      setSelectedLicenses([]);
      setSelectedTransferUser("");
      await fetchGroups(true);
      await fetchMachinesAndReportsCount(true);
    } catch (error: any) {
      // console.error("Transfer error:", error);
      setErrorMessage(error.message || "Failed to transfer assets");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Revoke Modal Handlers
  const handleOpenRevokeModal = async (group: Group) => {
    setSelectedGroup(group);
    setShowRevokeModal(true);
    setSelectedRevokeMachines([]);
    setSelectedRevokeLicenses([]);
    setSelectedRevokeUser("");
    setErrorMessage("");
  };

  const handleRevokeUserChange = async (userEmail: string) => {
    setSelectedRevokeUser(userEmail);
    if (!userEmail) {
      setUserMachines([]);
      setUserLicenses([]);
      return;
    }

    try {
      setIsLoadingUserAssets(true);

      if (isDemo) {
        setUserMachines([
          {
            id: 1,
            machine_id: "demo-m1",
            machine_name: "Desktop-En1",
            mac_address: "00:00:00:00:00:00",
          },
          {
            id: 2,
            machine_id: "demo-m2",
            machine_name: "Desktop-En2",
            mac_address: "11:11:11:11:11:11",
          },
        ]);
        setUserLicenses([]);
        return;
      }

      // Fetch user's machines (all machines for the member)
      const machinesResponse = await apiClient.getMachinesByEmail(userEmail);
      if (machinesResponse.success && machinesResponse.data) {
        setUserMachines(machinesResponse.data);
        console.log("✅ Member machines loaded:", machinesResponse.data.length);
      }

      // Fetch user's licenses (implement based on your API)
      setUserLicenses([]);
    } catch (error: any) {
      console.error("Error fetching user assets:", error);
      setErrorMessage("Failed to load user assets");
    } finally {
      setIsLoadingUserAssets(false);
    }
  };

  const handleRevokeAssets = async () => {
    if (!selectedGroup || !selectedRevokeUser) {
      setErrorMessage("Please select a user");
      return;
    }

    if (selectedRevokeMachines.length === 0) {
      setErrorMessage("Please select at least one machine to revoke");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (isDemo) {
        showInfo("Demo Mode", "Revoking assets is disabled in demo mode");
        setShowRevokeModal(false);
        return;
      }

      // Get MAC addresses for selected machines to revoke
      const macAddresses = userMachines
        .filter((m: any) => {
          const id = String(m.id || m.machine_id);
          return selectedRevokeMachines.includes(id);
        })
        .map((m: any) => m.mac_address)
        .filter(
          (mac: any): mac is string =>
            typeof mac === "string" && mac.length > 0,
        );

      if (macAddresses.length === 0) {
        throw new Error("No valid MAC addresses found for selected machines");
      }

      // Revoke via GroupDetails admin revoke endpoint
      const payload = {
        groupAdminEmail:
          selectedGroup.users.find((u) => u.role === "Group Admin")?.email ||
          currentUserEmail,
        memberEmail: selectedRevokeUser,
        macAddresses: macAddresses,
      };

      console.log("📤 Admin Revoke Payload:", payload);

      const response = await apiClient.post(
        `/api/GroupDetails/${selectedGroup.id}/admin/revoke`,
        payload,
      );

      console.log("📥 Admin Revoke Response:", response);

      if (!response.success) {
        throw new Error(response.error || "Failed to revoke assets");
      }

      setShowRevokeModal(false);
      setSelectedRevokeMachines([]);
      setSelectedRevokeLicenses([]);
      setSelectedRevokeUser("");
      await fetchGroups(true);
      await fetchMachinesAndReportsCount(true);
    } catch (error: any) {
      // console.error("Revoke error:", error);
      setErrorMessage(error.message || "Failed to revoke assets");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("admin-groups")} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0a2e1e]">Groups</h1>
            <p className="text-slate-600 mt-1">
              Manage user groups and permissions
            </p>
          </div>
          <button
            onClick={handleAddGroup}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-none transition-colors bg-[#0e7c66] text-white hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Group
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Groups</p>
                <p className="text-3xl font-bold text-[#0a2e1e] mt-1">
                  {groups.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d4ede4] rounded-none flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0a2e1e]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-3xl font-bold text-[#0a2e1e] mt-1">
                  {totalUsers}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d4ede4] rounded-none flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-[#0a2e1e]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Machines</p>
                <p className="text-3xl font-bold text-[#0a2e1e] mt-1">
                  {totalMachines}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d4ede4] rounded-none flex items-center justify-center">
                <Monitor className="w-6 h-6 text-[#0a2e1e]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Reports</p>
                <p className="text-3xl font-bold text-[#0a2e1e] mt-1">
                  {totalReports}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d4ede4] rounded-none flex items-center justify-center">
                <BarChart2 className="w-6 h-6 text-[#0a2e1e]" />
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Total Available Licenses
                </p>
                <p className="text-3xl font-bold text-[#0a2e1e] mt-1">
                  {licenseSummary?.totalAllocated || 0}
                </p>
                {licenseSummary && (
                  <p className="text-xs text-slate-500 mt-1">
                    {licenseSummary.totalDistributed} distributed
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-[#d4ede4] rounded-none flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0a2e1e]" />
              </div>
            </div>
          </div> */}

          {/* <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Unsed License Available
                </p>
                <p className="text-3xl font-bold text-[#0a2e1e] mt-1">
                  {licenseSummary?.totalAvailable || 0}
                </p>
                {licenseSummary && (
                  <p className="text-xs text-slate-500 mt-1">
                    {licenseSummary.overallUsagePercent.toFixed(0)}% used
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-[#d4ede4] rounded-none flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#0a2e1e]" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-none p-4 text-red-700">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="font-medium">Failed to load groups</p>
            </div>
            <p className="text-sm opacity-90 mb-3">{isError}</p>
            <button
              onClick={() => fetchGroups()}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-none hover:bg-red-700 transition-colors shadow-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && groups.length === 0 && (
          /* ********** NAYA CODE — Shimmer Skeleton UI for Groups ********** */
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 overflow-hidden">
                {/* Group Header Skeleton */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-none" />
                  <div className="flex-1">
                    <div className="h-5 bg-slate-200 rounded w-32 mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-48" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded-none w-20" />
                </div>
                {/* Group Members Skeleton */}
                <div className="px-6 py-3 space-y-3">
                  {[1, 2].map((j) => (
                    <div key={j} className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 bg-slate-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded w-40 mb-1" />
                        <div className="h-3 bg-slate-100 rounded w-28" />
                      </div>
                      <div className="h-6 bg-slate-100 rounded-full w-16" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          /* ********** END Shimmer UI ********** */
        )}

        {/* Groups List with Expandable Users */}
        {!isLoading && groups.length > 0 && (
          <div className="space-y-4">
            {groups.map((group: Group) => (
              <div key={group.id} className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 overflow-hidden">
                {/* Group Header */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="w-10 h-10 bg-[#0e7c66] rounded-none flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                    >
                      {group.name.charAt(0)}
                    </button>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#0a2e1e]">
                        {group.name}
                      </h2>
                      <p className="text-sm text-slate-600">
                        {group.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#d4ede4] text-[#0a2e1e]">
                        {group.users.length} users
                      </span>
                      <span className="text-sm text-slate-500">
                        Created: {new Date(group.created).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditGroup(group)}
                      className="px-3 py-1.5 text-sm text-[#0a2e1e] hover:bg-[#d4ede4] rounded-none transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-none transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="p-2 hover:bg-slate-100 rounded-none transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Expandable Users Table */}
                {expandedGroups.includes(group.id) && (
                  <div>
                    {/* Add User, Transfer, and Revoke Buttons */}
                    <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenTransferModal(group)}
                        className="px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                        Transfer
                      </button>
                      <button
                        onClick={() => handleOpenRevokeModal(group)}
                        className="px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Ban className="w-4 h-4" />
                        Revoke
                      </button>
                      <button
                        onClick={() => handleOpenAddUserModal(group)}
                        className="px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Add User
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              User Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Role
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                    Department
                                                </th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              License
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Profile
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {group.users.map((user: User) => (
                            <tr
                              key={user.id}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-[#0e7c66] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {user.name.charAt(0)}
                                  </div>
                                  <span className="font-medium text-[#0a2e1e]">
                                    {user.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.role === "User"
                                      ? "bg-[#d4ede4] text-[#0a2e1e]"
                                      : user.role === "Group Admin"
                                        ? "bg-[#d4ede4] text-[#0a2e1e]"
                                        : "bg-[#d4ede4] text-[#0a2e1e]"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                        {user.department}
                                                    </td> */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.license > 0
                                      ? "bg-[#d4ede4] text-[#0a2e1e]"
                                      : "bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  {user.license}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {user.profile}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  {/* <button
                                    onClick={() => {
                                      // Logic for editing member could go here
                                      // console.log('Edit member:', user.email);
                                    }}
                                    className="px-3 py-1.5 text-sm text-[#0a2e1e] hover:bg-[#d4ede4] rounded-none transition-colors flex items-center gap-1"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </button> */}
                                  <button
                                    onClick={() =>
                                      handleRemoveUserFromGroup(
                                        group.id,
                                        group.name,
                                        user.email,
                                        user.name,
                                      )
                                    }
                                    disabled={
                                      removingUser?.groupId === group.id &&
                                      removingUser?.userEmail === user.email
                                    }
                                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                  >
                                    {removingUser?.groupId === group.id &&
                                    removingUser?.userEmail === user.email ? (
                                      <>
                                        <Loader2 className="animate-spin h-4 w-4" />
                                        Removing...
                                      </>
                                    ) : (
                                      <>
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                      </>
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add User to Group Modal */}
        {showAddUserModal && selectedGroup && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddUserModal(false)}
          >
            <div
              className="bg-white rounded-none shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-[#0a2e1e] mb-4">
                Add User to {selectedGroup.name}
              </h2>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Unable to Add User
                      </p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                    <button
                      onClick={() => setErrorMessage("")}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Select User <span className="text-red-500">*</span>
                  </label>
                  {isLoadingSubusers ? (
                    <div className="w-full px-3 py-2 border border-slate-300 rounded-none bg-slate-50 flex items-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4 text-[#0a2e1e]" />
                      <span className="text-sm text-slate-600">
                        Loading users...
                      </span>
                    </div>
                  ) : !currentUserEmail ? (
                    <div className="w-full px-3 py-2 border border-red-300 rounded-none bg-red-50">
                      <p className="text-sm text-red-700">
                        ⚠️ User not authenticated. Please log in again.
                      </p>
                    </div>
                  ) : subusersError ? (
                    <div className="w-full px-3 py-2 border border-red-300 rounded-none bg-red-50">
                      <p className="text-sm text-red-700">
                        ❌ Error loading subusers. Please try again.
                      </p>
                    </div>
                  ) : (
                    (() => {
                      const validSubusers =
                        subusersData?.filter(
                          (subuser: any) =>
                            subuser.subuser_email !== currentUserEmail,
                        ) || [];
                      return validSubusers.length > 0 ? (
                        <select
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          required
                        >
                          <option value="">Select a user...</option>
                          <optgroup label="Subuser List">
                            {validSubusers.map((subuser: any) => (
                              <option
                                key={subuser.subuser_email}
                                value={subuser.subuser_email}
                              >
                                {subuser.subuser_email}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-full px-3 py-2 border border-[#d4ede4] rounded-none bg-[#d4ede4]">
                            <p className="text-sm text-[#0a2e1e] font-medium">
                              ⚠️ No subusers available
                            </p>
                            <p className="text-xs text-[#0a2e1e] mt-1">
                              Current user: <strong>{currentUserEmail}</strong>
                            </p>
                            <p className="text-xs text-[#0a2e1e]">
                              Please create subusers first in the Subusers
                              section.
                            </p>
                          </div>
                        </div>
                      );
                    })()
                  )}
                  <p className="mt-1 text-xs text-slate-500">
                    💡 Select a subuser from your account to add to this group.
                  </p>
                </div>

                {/* Group Admin Checkbox */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={makeGroupAdmin}
                      onChange={(e) => setMakeGroupAdmin(e.target.checked)}
                      className="w-4 h-4 text-[#0a2e1e] border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-[#0a2e1e] transition-colors">
                        Make this user a Group Admin
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Group Admins can transfer and revoke machines/licenses
                        within this group
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {" "}
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUserToGroup}
                  className="flex-1 px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting || !userEmail}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Adding...
                    </>
                  ) : (
                    "Add User"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Group Modal */}
        {showAddModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <div
              className="bg-white rounded-none shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-[#0a2e1e] mb-4">
                Add New Group
              </h2>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Unable to Create Group
                      </p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                    <button
                      onClick={() => setErrorMessage("")}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Group Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter group name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter description"
                    rows={3}
                    required
                  />
                </div>
                {/* <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        License Allocation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.licenseAllocation}
                                        onChange={(e) => setFormData({ ...formData, licenseAllocation: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter license allocation"
                                        min="0"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        💡 Allocate only the number of licenses available in your account. Check with admin if unsure.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Permission <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.permission}
                                        onChange={(e) => setFormData({ ...formData, permission: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="">Select permission</option>
                                        <option value="read">Read</option>
                                        <option value="write">Write</option>
                                        <option value="admin">Admin</option>
                                        <option value="full">Full Access</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div> */}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewGroup}
                  className="flex-1 px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={
                    isSubmitting || !formData.name || !formData.description
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Creating...
                    </>
                  ) : (
                    "Add Group"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Group Modal */}
        {showEditModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="bg-white rounded-none shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-[#0a2e1e] mb-4">
                Edit Group
              </h2>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Unable to Update Group
                      </p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                    <button
                      onClick={() => setErrorMessage("")}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Group Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                    required
                  />
                </div>
                {/* <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        License Allocation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.licenseAllocation}
                                        onChange={(e) => setFormData({ ...formData, licenseAllocation: parseInt(e.target.value) || 0 })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Enter license allocation"
                                        min="0"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        💡 Allocate only the number of licenses available in your account.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Permission <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.permission}
                                        onChange={(e) => setFormData({ ...formData, permission: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="">Select permission</option>
                                        <option value="read">Read</option>
                                        <option value="write">Write</option>
                                        <option value="admin">Admin</option>
                                        <option value="full">Full Access</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div> */}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditGroup}
                  className="flex-1 px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={
                    isSubmitting || !formData.name || !formData.description
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedGroup && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => !isSubmitting && setShowDeleteModal(false)}
          >
            <div
              className="bg-white rounded-none shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-[#0a2e1e] mb-4">
                Delete Group
              </h2>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 mb-1">
                        Unable to Delete Group
                      </p>
                      <p className="text-sm text-red-700">{errorMessage}</p>
                      {errorMessage
                        .toLowerCase()
                        .includes("assigned members") && (
                        <div className="mt-3 p-2 bg-[#d4ede4] border border-[#d4ede4] rounded">
                          <p className="text-xs text-[#0a2e1e] font-medium mb-1">
                            💡 How to fix:
                          </p>
                          <ol className="text-xs text-[#0a2e1e] list-decimal list-inside space-y-1">
                            <li>Expand this group in the list</li>
                            <li>Remove all users from the group</li>
                            <li>Then try deleting again</li>
                          </ol>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setErrorMessage("")}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <p className="text-slate-600 mb-6">
                Are you sure you want to delete the group{" "}
                <strong>"{selectedGroup.name}"</strong>? This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-none hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Modal */}
        {showTransferModal && selectedGroup && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTransferModal(false)}
          >
            <div
              className="bg-white rounded-none shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-[#0a2e1e] mb-4">
                Transfer Machines & Licenses
              </h2>

              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Group Admin Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Group Admin Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={
                      selectedGroup.users.find((u) => u.role === "Group Admin")
                        ?.email || currentUserEmail
                    }
                    readOnly
                    className="w-full px-3 py-2 border border-slate-200 rounded-none bg-slate-50 text-slate-600 cursor-not-allowed"
                  />
                </div>

                {/* Select Member */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Member Email <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedTransferUser}
                    onChange={(e) => setSelectedTransferUser(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a member...</option>
                    {selectedGroup.users.map((user) => (
                      <option key={user.email} value={user.email}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Available Machines */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Machines to Transfer
                  </label>
                  {isLoadingMachines ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin h-8 w-8 text-[#0a2e1e]" />
                    </div>
                  ) : availableMachines.length > 0 ? (
                    <div className="space-y-3">
                      {/* Dropdown to select machine */}
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const machineId = e.target.value;
                          if (!machineId) return;

                          if (selectedMachines.includes(machineId)) {
                            setSelectedMachines(
                              selectedMachines.filter((id) => id !== machineId),
                            );
                          } else {
                            setSelectedMachines([
                              ...selectedMachines,
                              machineId,
                            ]);
                          }
                          e.target.value = ""; // Reset dropdown
                        }}
                        value=""
                      >
                        <option value="">Select a machine...</option>
                        {availableMachines
                          .filter(
                            (machine) =>
                              !selectedMachines.includes(String(machine.id)) &&
                              !selectedMachines.includes(
                                String(machine.machine_id),
                              ),
                          )
                          .map((machine: any, idx: number) => (
                            <option
                              key={`machine-${machine.id || machine.machine_id || idx}`}
                              value={String(machine.id || machine.machine_id)}
                            >
                              {machine.machine_name || "Unnamed Machine"} -{" "}
                              {machine.mac_address}
                            </option>
                          ))}
                      </select>

                      {/* Selected machines display */}
                      {selectedMachines.length > 0 && (
                        <div className="border border-[#d4ede4] rounded-none bg-[#d4ede4] p-3">
                          <p className="text-xs font-medium text-[#0a2e1e] mb-2">
                            Selected Machines ({selectedMachines.length})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedMachines.map((machineId) => {
                              const machine = availableMachines.find(
                                (m) =>
                                  String(m.id || m.machine_id) === machineId,
                              );
                              return machine ? (
                                <div
                                  key={machineId}
                                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-[#d4ede4]"
                                >
                                  <span className="text-slate-700 font-medium">
                                    {machine.machine_name || "Unnamed"}
                                  </span>
                                  <span className="text-slate-400 text-xs">
                                    {machine.mac_address || "N/A"}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setSelectedMachines(
                                        selectedMachines.filter(
                                          (id) => id !== machineId,
                                        ),
                                      )
                                    }
                                    className="text-[#0a2e1e] hover:text-[#0a2e1e] hover:bg-[#d4ede4] rounded-full p-0.5"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 py-4">
                      No available machines to transfer
                    </p>
                  )}
                </div>

                {/* Available Licenses */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Licenses to Transfer
                  </label>
                  {availableLicenses.length > 0 ? (
                    <div className="space-y-3">
                      {/* Dropdown to select license */}
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          const licenseId = e.target.value;
                          if (
                            licenseId &&
                            !selectedLicenses.includes(licenseId)
                          ) {
                            setSelectedLicenses([
                              ...selectedLicenses,
                              licenseId,
                            ]);
                          }
                          e.target.value = ""; // Reset dropdown
                        }}
                        value=""
                      >
                        <option value="">Select a license...</option>
                        {availableLicenses
                          .filter(
                            (license) => !selectedLicenses.includes(license.id),
                          )
                          .map((license: any, idx: number) => (
                            <option
                              key={`license-${license.id || idx}`}
                              value={license.id}
                            >
                              License #{license.id}
                            </option>
                          ))}
                      </select>

                      {/* Selected licenses display */}
                      {selectedLicenses.length > 0 && (
                        <div className="border border-[#d4ede4] rounded-none bg-[#d4ede4] p-3">
                          <p className="text-xs font-medium text-[#0a2e1e] mb-2">
                            Selected Licenses ({selectedLicenses.length})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedLicenses.map((licenseId) => {
                              const license = availableLicenses.find(
                                (l) => l.id === licenseId,
                              );
                              return license ? (
                                <div
                                  key={licenseId}
                                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-[#d4ede4]"
                                >
                                  <span className="text-slate-700 font-medium">
                                    License #{license.id}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setSelectedLicenses(
                                        selectedLicenses.filter(
                                          (id) => id !== licenseId,
                                        ),
                                      )
                                    }
                                    className="text-[#0a2e1e] hover:text-[#0a2e1e] hover:bg-[#d4ede4] rounded-full p-0.5"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 py-4">
                      No available licenses to transfer
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransferAssets}
                  className="flex-1 px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={
                    isSubmitting ||
                    !selectedTransferUser ||
                    selectedMachines.length === 0
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Transferring...
                    </>
                  ) : (
                    "Transfer"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Revoke Modal */}
        {showRevokeModal && selectedGroup && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRevokeModal(false)}
          >
            <div
              className="bg-white rounded-none shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-[#0a2e1e] mb-4">
                Revoke Machines & Licenses
              </h2>

              {errorMessage && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-none">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Group Admin Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Group Admin Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={
                      selectedGroup.users.find((u) => u.role === "Group Admin")
                        ?.email || currentUserEmail
                    }
                    readOnly
                    className="w-full px-3 py-2 border border-slate-200 rounded-none bg-slate-50 text-slate-600 cursor-not-allowed"
                  />
                </div>

                {/* Select Member */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Member Email <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedRevokeUser}
                    onChange={(e) => handleRevokeUserChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select a member...</option>
                    {selectedGroup.users.map((user) => (
                      <option key={user.email} value={user.email}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* User's Available Machines */}
                {selectedRevokeUser && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Machines to Revoke (Not In Use)
                      </label>
                      {isLoadingUserAssets ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="animate-spin h-8 w-8 text-[#0a2e1e]" />
                        </div>
                      ) : userMachines.length > 0 ? (
                        <div className="space-y-3">
                          {/* Dropdown to select machine */}
                          <select
                            className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onChange={(e) => {
                              const machineId = e.target.value;
                              if (
                                machineId &&
                                !selectedRevokeMachines.includes(machineId)
                              ) {
                                setSelectedRevokeMachines([
                                  ...selectedRevokeMachines,
                                  machineId,
                                ]);
                              }
                              e.target.value = ""; // Reset dropdown
                            }}
                            value=""
                          >
                            <option value="">Select a machine...</option>
                            {userMachines
                              .filter(
                                (machine) =>
                                  !selectedRevokeMachines.includes(
                                    String(machine.id),
                                  ) &&
                                  !selectedRevokeMachines.includes(
                                    String(machine.machine_id),
                                  ),
                              )
                              .map((machine: any, idx: number) => (
                                <option
                                  key={`revoke-machine-${machine.id || machine.machine_id || idx}`}
                                  value={String(
                                    machine.id || machine.machine_id,
                                  )}
                                >
                                  {machine.machine_name || "Unnamed Machine"} -{" "}
                                  {machine.mac_address}
                                </option>
                              ))}
                          </select>

                          {/* Selected machines display */}
                          {selectedRevokeMachines.length > 0 && (
                            <div className="border border-[#d4ede4] rounded-none bg-[#d4ede4] p-3">
                              <p className="text-xs font-medium text-[#0a2e1e] mb-2">
                                Selected Machines (
                                {selectedRevokeMachines.length})
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {selectedRevokeMachines.map((machineId) => {
                                  const machine = userMachines.find(
                                    (m) =>
                                      String(m.id || m.machine_id) ===
                                      machineId,
                                  );
                                  return machine ? (
                                    <div
                                      key={machineId}
                                      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-[#d4ede4]"
                                    >
                                      <span className="text-slate-700 font-medium">
                                        {machine.machine_name || "Unnamed"}
                                      </span>
                                      <span className="text-slate-400 text-xs">
                                        {machine.mac_address || "N/A"}
                                      </span>
                                      <button
                                        onClick={() =>
                                          setSelectedRevokeMachines(
                                            selectedRevokeMachines.filter(
                                              (id) => id !== machineId,
                                            ),
                                          )
                                        }
                                        className="text-[#0a2e1e] hover:text-[#0a2e1e] hover:bg-[#d4ede4] rounded-full p-0.5"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 py-4">
                          No available machines to revoke
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Licenses to Revoke (Not In Use)
                      </label>
                      {userLicenses.length > 0 ? (
                        <div className="space-y-3">
                          {/* Dropdown to select license */}
                          <select
                            className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onChange={(e) => {
                              const licenseId = e.target.value;
                              if (
                                licenseId &&
                                !selectedRevokeLicenses.includes(licenseId)
                              ) {
                                setSelectedRevokeLicenses([
                                  ...selectedRevokeLicenses,
                                  licenseId,
                                ]);
                              }
                              e.target.value = ""; // Reset dropdown
                            }}
                            value=""
                          >
                            <option value="">Select a license...</option>
                            {userLicenses
                              .filter(
                                (license) =>
                                  !selectedRevokeLicenses.includes(license.id),
                              )
                              .map((license: any) => (
                                <option key={license.id} value={license.id}>
                                  License #{license.id}
                                </option>
                              ))}
                          </select>

                          {/* Selected licenses display */}
                          {selectedRevokeLicenses.length > 0 && (
                            <div className="border border-[#d4ede4] rounded-none bg-[#d4ede4] p-3">
                              <p className="text-xs font-medium text-[#0a2e1e] mb-2">
                                Selected Licenses (
                                {selectedRevokeLicenses.length})
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {selectedRevokeLicenses.map((licenseId) => {
                                  const license = userLicenses.find(
                                    (l) => l.id === licenseId,
                                  );
                                  return license ? (
                                    <div
                                      key={licenseId}
                                      className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-sm border border-[#d4ede4]"
                                    >
                                      <span className="text-slate-700 font-medium">
                                        License #{license.id}
                                      </span>
                                      <button
                                        onClick={() =>
                                          setSelectedRevokeLicenses(
                                            selectedRevokeLicenses.filter(
                                              (id) => id !== licenseId,
                                            ),
                                          )
                                        }
                                        className="text-[#0a2e1e] hover:text-[#0a2e1e] hover:bg-[#d4ede4] rounded-full p-0.5"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 py-4">
                          No available licenses to revoke
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRevokeModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRevokeAssets}
                  className="flex-1 px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={
                    isSubmitting ||
                    !selectedRevokeUser ||
                    selectedRevokeMachines.length === 0
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Revoking...
                    </>
                  ) : (
                    "Revoke"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
