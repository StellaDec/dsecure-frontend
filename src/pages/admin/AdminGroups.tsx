import { useAuth } from "@/auth/AuthContext";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  apiClient,
  type Group as APIGroup,
  type GroupUser,
} from "@/utils/enhancedApiClient";

interface Group {
  id: string;
  name: string;
  description: string;
  licenses: number;
  permissions?: string[];
  userCount?: number;
  users?: GroupUser[];
  createdDate?: string;
  date?: string;
}

export default function AdminGroups() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ RBAC: Role detection functions
  const getUserRole = (): string => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");
    let storedUserData = null;

    // User data fetch karne ka logic
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing user_data:", e);
      }
    }

    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {
        console.error("Error parsing authUser:", e);
      }
    }

    const role =
      storedUserData?.userRole ||
      storedUserData?.role ||
      storedUserData?.user_role ||
      user?.role ||
      "user";

    return role;
  };

  const getUserGroupId = (): string | null => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");
    let storedUserData = null;

    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing user_data:", e);
      }
    }
    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {
        console.error("Error parsing authUser:", e);
      }
    }

    const groupId =
      storedUserData?.user_group ||
      storedUserData?.groupId ||
      storedUserData?.group_id ||
      null;

    return groupId;
  };

  const currentUserRole = getUserRole().toLowerCase();
  const currentUserGroupId = getUserGroupId();
  const isSuperAdmin = currentUserRole === "superadmin";
  const isGroupAdmin =
    currentUserRole === "admin" ||
    currentUserRole === "administrator" ||
    currentUserRole === "groupadmin";
  const isSubUser = currentUserRole === "user";

  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchGroups = useCallback(async () => {
    try {
      setIsLoadingGroups(true);
      setIsError(false);

      const response = await apiClient.getGroupsWithUsers();

      if (!response.success) {
        setIsError(true);
        setIsLoadingGroups(false);
        return;
      }

      if (
        !response.data?.groups?.data ||
        !Array.isArray(response.data.groups.data)
      ) {
        setIsError(true);
        setIsLoadingGroups(false);
        return;
      }

      const apiGroups = response.data.groups.data;

      if (apiGroups.length === 0) {
        setGroups([]);
        setIsLoadingGroups(false);
        return;
      }

      const transformedGroups: Group[] = apiGroups.map(
        (group: APIGroup, index: number) => {
          const cleanId =
            group.groupId?.toString().replace(/^group-/, "") || `temp-${index}`;

          return {
            id: cleanId,
            name: group.groupName || "Unnamed Group",
            description: group.groupDescription || "",
            licenses:
              group.users?.reduce(
                (sum: number, user: GroupUser) => sum + (user.license || 0),
                0,
              ) || 0,
            permissions: ["basic_access"],
            userCount: group.users?.length || 0,
            users: group.users || [],
            createdDate: new Date().toISOString(),
          };
        },
      );

      let filteredGroups = transformedGroups;

      if (isSubUser && currentUserGroupId) {
        filteredGroups = transformedGroups.filter(
          (group: Group) => group.id === currentUserGroupId,
        );
      }
      else if (isGroupAdmin && currentUserGroupId) {
        filteredGroups = transformedGroups.filter(
          (group: Group) => group.id === currentUserGroupId,
        );
      }

      setGroups(filteredGroups);
    } catch (error) {
      console.error("❌ Error fetching groups:", error);
      setIsError(true);
    } finally {
      setIsLoadingGroups(false);
    }
  }, [isSubUser, isGroupAdmin, currentUserGroupId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGroups();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchGroups]);

  const handleDeleteGroup = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    if ((group.userCount || 0) > 0) {
      return;
    }

    if (confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
      // Logic for group deletion
      console.log(`Group "${group.name}" has been deleted successfully!`);
      fetchGroups();
    }
  };

  // License assignment modal state
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [licenseCount, setLicenseCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignGroupLicense = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;

    setSelectedGroup(group);
    setLicenseCount(group.licenses.toString());
    setIsLicenseModalOpen(true);
  };

  const handleLicenseSubmit = async () => {
    if (!selectedGroup) return;

    // Strict numeric parsing for license count
    const newCount = Number.parseInt(licenseCount, 10);
    if (isNaN(newCount) || newCount < 0) {
      return;
    }

    setIsLoading(true);

    try {
      // API call simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedGroups = groups.map((g) =>
        g.id === selectedGroup.id ? { ...g, licenses: newCount } : g,
      );
      setGroups(updatedGroups);

      setIsLicenseModalOpen(false);
      setSelectedGroup(null);
      setLicenseCount("");

      fetchGroups();
    } catch {
      console.error("Failed to update licenses.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGroupsList = useMemo(() => {
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [groups, searchTerm]);

  const permissionLabels: Record<string, string> = {
    basic_access: "Basic Access",
    advanced_erasure: "Advanced Erasure",
    report_generation: "Report Generation",
    user_management: "User Management",
    system_settings: "System Settings",
    license_management: "License Management",
  };

  return (
    <>
      {/* SEO Head component */}
      <SEOHead seo={getSEOForPage("admin-groups")} />

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/admin")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Back to Admin Dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Manage Organization Groups
              </h1>
            </div>
            <p className="text-slate-600">
              Create and manage user groups with specific permissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => navigate("/admin/groups/add")}
                className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Group
              </button>
            )}
          </div>
        </div>

        {/* Search Control */}
        <div className="card mb-6">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label htmlFor="search-groups-input" className="block text-sm font-medium text-slate-700 mb-2">
                  Search Groups
                </label>
                <input
                  id="search-groups-input"
                  type="text"
                  placeholder="Search by group name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-slate-600">
                  Showing {filteredGroupsList.length} of {groups.length} groups
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State Indicators (Loading/Error/Empty) */}
        {isLoadingGroups && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 text-emerald-500 mx-auto mb-4 border-4 border-t-transparent rounded-full"></div>
              <p className="text-slate-600">Loading groups...</p>
            </div>
          </div>
        )}

        {isError && !isLoadingGroups && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>Failed to load groups. Please try again.</span>
              </div>
              <button onClick={refetch} className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm font-medium transition-colors">
                Retry
              </button>
            </div>
          </div>
        )}

        {!isLoadingGroups && !isError && groups.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No Groups Found</h3>
            <button onClick={() => navigate("/admin/groups/add")} className="btn-primary mt-2">
              Create Group
            </button>
          </div>
        )}

        {/* Groups Display Grid */}
        {!isLoadingGroups && !isError && groups.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroupsList.map((group) => (
              <div key={group.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">
                        {group.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {group.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      {(isSuperAdmin || (isGroupAdmin && group.id === currentUserGroupId)) && (
                        <button
                          onClick={() => navigate(`/admin/groups/edit/${group.id}`)}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Edit Group"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      {(isSuperAdmin || (isGroupAdmin && group.id === currentUserGroupId)) && (
                        <button
                          onClick={() => handleAssignGroupLicense(group.id)}
                          className="text-emerald-800 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50 transition-colors"
                          title="Assign License"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </button>
                      )}
                      {isSuperAdmin && (
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete Group"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-slate-200">
                    <div>
                      <div className="text-sm font-medium text-slate-700">Users</div>
                      <div className="text-lg font-semibold text-slate-900">{group.userCount}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700">Licenses</div>
                      <div className="text-lg font-semibold text-slate-900">{group.licenses.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">Permissions</div>
                    <div className="flex flex-wrap gap-1">
                      {(group.permissions || []).slice(0, 3).map((p) => (
                        <span key={p} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {permissionLabels[p] || p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    Created: {new Date(group.createdDate || 0).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* License Assignment Modal */}
        {isLicenseModalOpen && selectedGroup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Assign Licenses</h3>
                    <p className="text-sm text-slate-600">Group: {selectedGroup.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="new-license-count" className="block text-sm font-medium text-slate-700 mb-2">
                      New License Count
                    </label>
                    <input
                      id="new-license-count"
                      type="number"
                      min="0"
                      value={licenseCount}
                      onChange={(e) => setLicenseCount(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="Enter amount"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Current:</span>
                      <span className="font-semibold text-slate-900">{selectedGroup.licenses.toLocaleString()}</span>
                    </div>
                    {licenseCount && !isNaN(Number(licenseCount)) && (
                      <div className="flex justify-between text-emerald-700 pt-1 border-t border-slate-200 mt-1">
                        <span className="font-medium">New Total:</span>
                        <span className="font-bold">{Number.parseInt(licenseCount, 10).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => {
                      setIsLicenseModalOpen(false);
                      setSelectedGroup(null);
                    }}
                    className="btn-secondary px-4"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLicenseSubmit}
                    disabled={isLoading || !licenseCount}
                    className="btn-primary px-6"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
