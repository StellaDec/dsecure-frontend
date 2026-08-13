import { useAuth } from "@/auth/AuthContext";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../../utils/seo";
import { useNotification } from "@/contexts/NotificationContext";
// ✅ NAYA CODE: Added startTransition to allow navigation to interrupt data-sync updates
import { useState, useMemo, useEffect, startTransition } from "react";
import { AlertTriangle, ArrowDownToLine, ArrowRightLeft, BadgeCheck, BarChart, BarChart2, Calendar, Check, ChevronDown, ChevronRight, ChevronUp, Clock, Cloud, CreditCard, Database, HardDrive, Download, Edit, FileText, File, Folder, Globe, Info, Key, Loader2, Lock, Mail, MapPin, Package, Plus, RefreshCw, Server, Settings, Tag, TrendingUp, UserPlus, Users, X, Zap } from 'lucide-react';

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
const COLORS = ['#0a2e1e', '#0e7c66', '#22a689', '#d4ede4', '#a7d5c5'];
import {
  AdminDashboardAPI,
  type DashboardStats,
  type UserActivity,
  type GroupData,
  type LicenseData,
  type RecentReport,
  type ProfileData,
  type MethodMetric,
} from "@/services/adminDashboardAPI";
import RoleBased from "@/components/RoleBased";
import {
  getRolePermissions,
  hasPermission,
  canManageUser,
  filterUsersByRole,
  getRoleDisplayInfo,
  getAssignableRoles,
  isFeatureVisible,
} from "@/utils/rolePermissions";
import { getPrimaryRole } from "@/utils/roleHelper";
import {
  apiClient,
  type Machine,
  type AuditReport,
  type Subuser,
  type Session,
} from "@/utils/enhancedApiClient";
import { fetchLatestUpdate } from '@/services/updatesAPI';
import {
  useSubusers,
  useCreateSubuser,
  useUpdateSubuser,
  useDeleteSubuser,
} from "@/hooks/useSubusers";
import { useDashboardData, useDashboardLicenseList, useDashboardSessions, useGroupsWithUsers } from "@/hooks/useDashboardData";
import {
  useUserMachines,
  useActiveLicensesCount,
} from "@/hooks/useUserMachines";
import {
  useAuditReports,
  useEnhancedAuditReports,
} from "@/hooks/useAuditReports";
import { useErasureMetrics } from "@/hooks/useErasureMetrics";
import { usePerformanceData } from "@/hooks/usePerformanceData";
// ✅ NAYA CODE: Isolated PieChart component to fix infinite re-render loop in Performance tab
import ErasureMethodPieChart from "@/components/charts/ErasureMethodPieChart";
import authService from "@/utils/authService";
// ********** NAYA CODE — Phase 3: Import IDB service for IDB-first reads **********
import { indexedDBService } from "@/services/indexedDBService";
// *******************************************
const EMPTY_METHOD_METRICS: MethodMetric[] = [];
const EMPTY_SUBUSERS: any[] = [];

// ============================================================================
// 🏗️ RBAC ARCHITECTURE: Hierarchical Role-Based Access Control System
/**
 * Role Hierarchy Definition
 * Descending order of access privileges
 */
import { 
  Roles, 
  buildWhereClause, 
  buildReportFilter, 
  buildMachineFilter, 
  buildSessionFilter, 
  buildLicenseFilter, 
  buildPerformanceFilter,
  type CurrentUser 
} from '@/utils/dashboardFilters';

// ✅ Helper: Format date with proper UTC to local timezone conversion (Parity with AdminSessions)
// const formatSessionDate = (dateString: string) => {
//   if (!dateString || dateString === "N/A") return "-";
//   try {
//     let dateValue = dateString;
//     let date: Date;

//     // ISO format or simple date string (e.g., '2023-01-01 10:00:00')
//     if (typeof dateValue === "string" && (dateValue.includes("T") || dateValue.includes("-"))) {
//       if (!dateValue.endsWith("Z") && !dateValue.includes("+")) {
//         dateValue = dateValue.replace(" ", "T") + "Z";
//       }
//       date = new Date(dateValue);
//     } else {
//       // Fallback for custom formats (e.g., "10 Feb, 10:00 am")
//       let dateStr = dateValue;
//       if (!/\d{4}/.test(dateStr)) {
//         dateStr += ` ${new Date().getFullYear()}`;
//       }

//       const localDate = new Date(dateStr);
//       if (!isNaN(localDate.getTime())) {
//         // Shift internal epoch by timezone offset to interpret as UTC
//         date = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
//       } else {
//         date = new Date(); // fallback
//       }
//     }

//     if (!date || isNaN(date.getTime())) return dateString;

//     return date.toLocaleString("en-IN", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   } catch (e: any) {
//     console.warn("Date parsing error:", dateString, e);
//     return dateString;
//   }
// };

// ✅ NAYA CODE — formatSessionDate: Always treat API date strings as UTC
// API sends dates without timezone info (e.g., "2024-01-15T10:30:00")
// which browsers parse as local time. We append "Z" to force UTC interpretation.
const formatSessionDate = (dateString: string) => {
  if (!dateString || dateString === "N/A") return "-";

  let formattedValue = dateString;

  // If the string has no timezone indicator (Z or +/-offset), treat as UTC
  if (
    typeof dateString === "string" &&
    !dateString.endsWith("Z") &&
    !dateString.includes("+") &&
    !/\d{2}:\d{2}:\d{2}[+-]/.test(dateString)
  ) {
    formattedValue = dateString.replace(" ", "T");
    if (!formattedValue.endsWith("Z")) {
      formattedValue += "Z";
    }
  }

  const date = new Date(formattedValue);

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// ✅ Import Demo Data for "Try Demo Account" mode
import {
  isDemoMode,
  DEMO_DASHBOARD_STATS,
  DEMO_PROFILE,
  DEMO_USERS,
  DEMO_USER_ACTIVITY,
  DEMO_REPORTS,
  DEMO_SYSTEM_LOGS,
  DEMO_LICENSE_DETAILS,
  DEMO_GROUPS,
  DEMO_MACHINES,
  DEMO_PERFORMANCE_DATA,
  DEMO_AUDIT_REPORTS,
  DEMO_SUBUSERS,
  DEMO_BILLING_DETAILS,
  DEMO_SESSIONS,
} from "@/data/demoData";
import { decodeEmail, encodeEmail } from "@/utils/encodeEmail";

// ✅ DEMO MODE: Suppress all console logs in demo mode
const devLog = (...args: any[]) => {
  if (!isDemoMode()) {
    console.log(...args);
  }
};
const devWarn = (...args: any[]) => {
  if (!isDemoMode()) {
    console.warn(...args);
  }
};
const devError = (...args: any[]) => {
  if (!isDemoMode()) {
    console.error(...args);
  }
};

// Interface for merged user data displayed in Users tab
interface MergedUserData {
  user_name: string;
  email: string;
  role: "Superuser" | "Subuser";
  licenses: string;
  date_created: string;
  totalLicenses?: number; // For progress bar calculation
  consumedLicenses?: number; // For progress bar calculation
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // ✅ RBAC: Role detection functions
  const getUserRole = (): string => {
    // ✅ Check demo mode first - demo user is always superadmin
    const isDemoMode = localStorage.getItem("demo_mode") === "true";
    if (isDemoMode) {
      return "superadmin";
    }

    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");
    let storedUserData = null;

    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {}
    }
    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {}
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
      } catch (e) {}
    }
    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {}
    }

    const groupId =
      storedUserData?.user_group ||
      storedUserData?.groupId ||
      storedUserData?.group_id ||
      null;

    return groupId;
  };

  const getUserEmail = (): string => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");
    let storedUserData = null;

    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {}
    }
    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {}
    }

    return (
      storedUserData?.userEmail ||
      storedUserData?.user_email ||
      storedUserData?.email ||
      user?.email ||
      ""
    );
  };

  // ✅ RBAC: Determine user's role and capabilities
  const currentUserRole = getUserRole().toLowerCase();
  const currentUserGroupId = getUserGroupId();
  const currentUserEmail = getUserEmail();
  const isSuperAdmin = currentUserRole === "superadmin";
  const isGroupAdmin =
    currentUserRole === "admin" ||
    currentUserRole === "administrator" ||
    currentUserRole === "groupadmin";
  const isSubUser = currentUserRole === "user";

  // Modal states
  const [showBulkLicenseModal, setShowBulkLicenseModal] = useState(false);
  const [showLicenseAuditModal, setShowLicenseAuditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileEditForm, setProfileEditForm] = useState({
    user_name: "",
    phone_number: "",
    timezone: "",
  });
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsTab, setSettingsTab] = useState<"billing" | "password">(
    "billing",
  );
  const [billingDetails, setBillingDetails] = useState<any>(null);
  const [billingAccordion, setBillingAccordion] = useState({
    activePlan: true,
    licenseUsage: true,
    planInfo: false,
  });
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showSystemSettingsModal, setShowSystemSettingsModal] = useState(false);
  const [showAssignLicensesModal, setShowAssignLicensesModal] = useState(false);
  const [selectedGroupForLicenses, setSelectedGroupForLicenses] =
    useState<GroupData | null>(null);
  const [bulkUserCount, setBulkUserCount] = useState("10");
  const [bulkLicenseCount, setBulkLicenseCount] = useState("5");
  const [isLoading, setIsLoading] = useState(false);

  // 🎛️ RBAC Filter Panel States

  // Form states for modals
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    phone: "",
    department: "",
    group: "",
    license_allocation: "0", // Default allocation
  });
  const [newGroupForm, setNewGroupForm] = useState({
    name: "",
    description: "",
    licenses: 0,
  });
  const [assignLicensesForm, setAssignLicensesForm] = useState({
    licenseCount: 10,
    expiryDate: "",
    licenseType: "basic",
  });

  // Private Cloud Setup Modal States
  const [showPrivateCloudModal, setShowPrivateCloudModal] = useState(false);
  const [availableTables, setAvailableTables] = useState<string[]>([
    "Users",
    "Machines",
    "AuditReports",
    "Sessions",
    "SystemLogs",
    "Licenses",
    "Payments",
  ]);
  const [privateCloudForm, setPrivateCloudForm] = useState({
    connectionString: "",
    selectedTables: [] as string[],
    migrateData: false,
    migrateTables: false,
  });
  const [privateCloudLoading, setPrivateCloudLoading] = useState(false);

  // Pagination states - dynamic items per page for each tab
  const pageSizeOptions = [5, 10, 25, 50, 100];
  const [licensePageSize, setLicensePageSize] = useState(5);
  const [usersPageSize, setUsersPageSize] = useState(5);
  const [groupsPageSize, setGroupsPageSize] = useState(5);
  const [activityPageSize, setActivityPageSize] = useState(5);
  const [reportsPageSize, setReportsPageSize] = useState(5);
  const [systemLogsPageSize, setSystemLogsPageSize] = useState(5);
  const [recentReportsPageSize, setRecentReportsPageSize] = useState(5);

  const [usersPage, setUsersPage] = useState(1);
  const [groupsPage, setGroupsPage] = useState(1);
  const [userActivityPage, setUserActivityPage] = useState(1);
  const [reportsPage, setReportsPage] = useState(1);
  const [systemLogsPage, setSystemLogsPage] = useState(1);
  const [licenseDetailsPage, setLicenseDetailsPage] = useState(1);
  const [recentReportsPage, setRecentReportsPage] = useState(1);

  // Helper function to get user data from localStorage
  const getUserDataFromStorage = () => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        devError("Error parsing user_data:", e);
      }
    }

    if (authUser) {
      try {
        return JSON.parse(authUser);
      } catch (e) {
        devError("Error parsing authUser:", e);
      }
    }

    return null;
  };

  // Helper function to extract name from email
  const getNameFromEmail = (email: string | undefined): string => {
    if (!email) return "User";
    const beforeAt = email.split("@")[0];
    // Remove numbers and special symbols, keep only letters
    const cleanedName = beforeAt.replace(/[^a-zA-Z]/g, "");
    // Convert to readable name with capitalized first letter
    if (!cleanedName) return "User";
    return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
  };

  // ✅ Cache Helper Functions - Store data with timestamp
  // API Data States - React Query will populate these via useEffect
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    isDemoMode() ? DEMO_DASHBOARD_STATS : null,
  );
  const [userActivity, setUserActivity] = useState<UserActivity[]>(
    isDemoMode() ? DEMO_USER_ACTIVITY : [],
  );
  const [groups, setGroups] = useState<GroupData[]>(isDemoMode() ? DEMO_GROUPS : []);
  const [groupsWithUsers, setGroupsWithUsers] = useState<any[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsCached, setGroupsCached] = useState(false); // ✅ Cache flag
  const [licenseData, setLicenseData] = useState<LicenseData[]>(
    isDemoMode() ? DEMO_LICENSE_DETAILS : [],
  );
  const [recentReports, setRecentReports] = useState<RecentReport[]>(
    isDemoMode()
      ? DEMO_REPORTS.map((r) => ({
          id: r.id,
          type: r.type,
          devices: r.devices,
          status: r.status,
          date: r.date,
          method: r.method,
        }))
      : [],
  );
  const [activeLicensesCount, setActiveLicensesCount] = useState<number>(
    isDemoMode()
      ? DEMO_MACHINES.filter(
          (m) => m.status === "Active" || m.status === "Running",
        ).length
      : 0,
  );
  const [auditReportsCount, setAuditReportsCount] = useState<number>(
    isDemoMode() ? DEMO_AUDIT_REPORTS.length : 0,
  );
  const [auditReports, setAuditReports] = useState<AuditReport[]>(
    isDemoMode() ? (DEMO_AUDIT_REPORTS as any) : [],
  );
  const [userLicenseDetails, setUserLicenseDetails] = useState<LicenseData[]>(
    isDemoMode() ? DEMO_LICENSE_DETAILS : [],
  );
  // ✅ License list from /api/License/admin/all (same as AdminLicenses page)
  const [dashboardLicenseList, setDashboardLicenseList] = useState<any[]>([]);
  // ✅ OPTIMIZED: licenseListLoading ab line ~830 pe directly derive hota hai (licenseListQuery ke baad)
  const [recentSystemLogs, setRecentSystemLogs] = useState<any[]>(
    isDemoMode() ? DEMO_SYSTEM_LOGS : [],
  );
  const [recentSessions, setRecentSessions] = useState<any[]>(
    isDemoMode() ? DEMO_SESSIONS : [],
  );

  // Performance data state
  const [performanceData, setPerformanceData] = useState<{
    monthlyErasures: { month: string; count: number }[];
    avgDuration: { month: string; duration: number }[];
    throughput: { month: string; count: number }[];
    successRate: string;
    successCount: number;
    failureCount: number;
  }>(
    isDemoMode()
      ? (DEMO_PERFORMANCE_DATA as any)
      : {
          monthlyErasures: [],
          avgDuration: [],
          throughput: [],
          successRate: "0%",
          successCount: 0,
          failureCount: 0,
        },
  );

  // Separate states for Users and Subusers (not merged)
  const [superuserData, setSuperuserData] = useState<MergedUserData | null>(
    null,
  );

  // ✅ OPTIMIZED: Initialize profileData with localStorage data using useMemo to avoid re-renders
  const storedUserData = useMemo(() => getUserDataFromStorage(), [user]);
  // Priority: userRole > user_role > role > user_type
  const primaryRole =
    storedUserData?.userRole ||
    storedUserData?.user_role ||
    getPrimaryRole(storedUserData) ||
    user?.role ||
    "user";
  const [profileData, setProfileData] = useState<ProfileData | null>({
    name:
      storedUserData?.user_name ||
      storedUserData?.subuser_name ||
      storedUserData?.name ||
      user?.name ||
      getNameFromEmail(
        storedUserData?.user_email || storedUserData?.email || user?.email,
      ),
    phone_number:
      storedUserData?.phone_number ||
      storedUserData?.phone ||
      storedUserData?.subuser_phone ||
      user?.phone_number,
    email:
      storedUserData?.user_email ||
      storedUserData?.email ||
      user?.email ||
      "user@example.com",
    timezone: storedUserData?.timezone || "Asia/Kolkata",
    role: primaryRole,
    userRole: storedUserData?.userRole || storedUserData?.user_role,
    user_role: storedUserData?.user_role || storedUserData?.userRole,
    phone:
      storedUserData?.phone_number ||
      storedUserData?.phone ||
      storedUserData?.subuser_phone ||
      "",
    department: storedUserData?.department || "",
    licenses: 0, // Will be updated from API
    is_private_cloud:
      storedUserData?.is_private_cloud || user?.is_private_cloud,
    is_groups_enabled:
      storedUserData?.is_groups_enabled || user?.is_groups_enabled,
    is_subusers_enabled:
      storedUserData?.is_subusers_enabled || user?.is_subusers_enabled,
  });

  // ✅ OPTIMIZED: Update stored user data useEffect removed (now using useMemo above)
  const isDemo = isDemoMode();

  // Dynamic version state for File Eraser
  const [dseVersion, setDseVersion] = useState("2.0.1");

  useEffect(() => {
    if (!isDemo) {
      fetchLatestUpdate("DSErase").then(data => {
        if (data && data.version_number) {
          let v = data.version_number;
          if (v.length === 4 && !isNaN(Number(v))) {
            v = v.split('').join('.');
          }
          setDseVersion(v);
        }
      }).catch(() => {});
    }
  }, [isDemo]);

  // Check if user has private cloud access
  const isPrivateCloudEnabled =
    user?.is_private_cloud || storedUserData?.is_private_cloud;

  const isGroupsEnabled =
    isDemo ||
    user?.is_groups_enabled ||
    storedUserData?.is_groups_enabled ||
    storedUserData?.isGroupsEnabled ||
    profileData?.is_groups_enabled ||
    false;

  const isSubusersEnabled =
    isDemo ||
    user?.is_subusers_enabled ||
    storedUserData?.is_subusers_enabled ||
    storedUserData?.isSubusersEnabled ||
    profileData?.is_subusers_enabled ||
    false;

  // ✅ NAYA CODE: Commented out render-body logs to prevent blocking main thread on every re-render
  // PURANA CODE: These logs created heavy objects on EVERY render, slowing down React's reconciler
  // devLog("🔍 Private Cloud Check:", { userIsPrivateCloud: user?.is_private_cloud, storedIsPrivateCloud: storedUserData?.is_private_cloud, isPrivateCloudEnabled, user, storedUserData });
  // console.log("🚀 Feature Flags Debug:", { isGroupsEnabled, isSubusersEnabled, user_is_groups_enabled: user?.is_groups_enabled, stored_is_groups_enabled: storedUserData?.is_groups_enabled, user_is_subusers_enabled: user?.is_subusers_enabled, stored_is_subusers_enabled: storedUserData?.is_subusers_enabled });

  // Get user email for API calls (calculate before using in queries)
  const userEmail =
    storedUserData?.user_email || storedUserData?.email || user?.email || "";

  // ✅ RBAC: Build CurrentUser object for centralized filter builder (after storedUserData is defined)
  const currentUser: Partial<CurrentUser> = useMemo(
    () => ({
      id: storedUserData?.user_id || storedUserData?.id || user?.id || "",
      email: currentUserEmail,
      role: isSuperAdmin
        ? Roles.SUPER_ADMIN
        : isGroupAdmin
          ? Roles.GROUP_ADMIN
          : isSubUser
            ? Roles.SUB_USER
            : Roles.USER,
      groupId: currentUserGroupId || undefined,
      parentUserId:
        storedUserData?.parent_user_id ||
        storedUserData?.parentUserId ||
        undefined,
      departmentId:
        storedUserData?.department_id ||
        storedUserData?.departmentId ||
        undefined,
    }),
    [
      currentUserRole,
      currentUserGroupId,
      currentUserEmail,
      storedUserData,
      user,
      isSuperAdmin,
      isGroupAdmin,
      isSubUser,
    ],
  );

  // PURANA CODE: devLog("🔐 RBAC Info (AdminDashboard):", { role: currentUserRole, groupId: currentUserGroupId, email: currentUserEmail, centralizedUser: currentUser });

  // ✅ React Query: Fetch dashboard data with automatic caching
  // Overview metrics are now cached until logout via staleTime: Infinity in useDashboardData
  const dashboardDataEnabled = true; // Always enabled to maintain background cache
  const dashboardQuery = useDashboardData(userEmail, dashboardDataEnabled);

  // PURANA CODE: console.log("dashboardQuery>>>>>>>>>>>>>>>>", dashboardQuery);

  // ✅ Check if current user is a subuser
  const currentUserType =
    storedUserData?.user_type || storedUserData?.userType || "";
  const isCurrentUserSubuser = currentUserType === "subuser";

  // PURANA CODE: devLog("👤 Current User Type:", currentUserType, "| Is Subuser:", isCurrentUserSubuser);

  // ✅ React Query: Fetch subusers data with automatic caching and refetching
  // Fetch subusers filtered by current user's email (works for both regular users and subusers)
  // Always fetch to show Active Users count on overview tab
  // Note: userEmail is already defined above (line 284)

  // ✅ In Demo Mode, disable all React Query API calls

  const subusersQuery = useSubusers(userEmail, !!userEmail && !isDemo);

  const subusersData = isDemo ? DEMO_SUBUSERS : (subusersQuery.data || EMPTY_SUBUSERS);
  const _usersDataLoading = subusersQuery.isLoading;
  const subusersError = subusersQuery.error;
  const refetchSubusers = subusersQuery.refetch;
  const isRefetching = subusersQuery.isRefetching;

  // 🎭 In Demo Mode, never show loading state
  const usersDataLoading = isDemo ? false : _usersDataLoading;

  // ✅ RBAC FILTERING: Filter subusers data using centralized WHERE clause builder
  const filteredSubusersData = useMemo(() => {
    if (!subusersData || subusersData.length === 0) return [];

    const whereClause = buildWhereClause(currentUser);

    // SuperAdmin: No filtering (base clause only)
    if (currentUser.role === Roles.SUPER_ADMIN) {
      return subusersData;
    }

    // GroupAdmin: Filter by groupId
    if (currentUser.role === Roles.GROUP_ADMIN && "groupId" in whereClause) {
      const groupId = (whereClause as any).groupId;
      if (!groupId) return subusersData;

      const filtered = subusersData.filter((subuser: any) => {
        const subuserGroupId =
          subuser.user_group || subuser.groupId || subuser.group_id;
        return (
          subuserGroupId === groupId ||
          subuser.subuser_email === currentUserEmail
        );
      });
      devLog(
        `🔒 GroupAdmin Filter (Subusers): ${subusersData.length} → ${filtered.length}`,
        whereClause,
      );
      return filtered;
    }

    // SubUser/User: Filter by email/ownerId
    const ownerId =
      "ownerId" in whereClause ? (whereClause as any).ownerId : currentUser.id;
    const filtered = subusersData.filter(
      (subuser: any) =>
        subuser.subuser_email === currentUserEmail ||
        subuser.email === currentUserEmail ||
        subuser.owner_id === ownerId,
    );
    devLog(
      `🔒 SubUser/User Filter (Subusers): ${subusersData.length} → ${filtered.length}`,
      whereClause,
    );
    return filtered;
  }, [subusersData, currentUser, currentUserEmail]);

  // ✅ RBAC: Use filtered data for rendering (replaces original subusersData in UI)
  const displaySubusersData = filteredSubusersData;

  // TEMPORARY DEBUG LOG FOR DEMO MODE
  useEffect(() => {
    if (isDemo && activeTab === "users") {
      console.log("USERS TAB DATA DEBUG", {
        rawLength: subusersData?.length || 0,
        displayLength: displaySubusersData?.length || 0,
        currentUserRole,
        isSuperAdmin,
        currentUser
      });
    }
  }, [isDemo, activeTab, subusersData, displaySubusersData, currentUserRole, isSuperAdmin, currentUser]);

  // ✅ React Query: Fetch machines and audit reports for user (disabled in demo mode)
  const machinesQuery = useUserMachines(userEmail, !!userEmail && !isDemo);

  // ✅ RBAC FILTERING: Filter machines using centralized buildMachineFilter
  const displayMachinesData = machinesQuery.data || [];

  const auditReportsQuery = useAuditReports(userEmail, !!userEmail && !isDemo);

  const displayAuditReportsData = auditReportsQuery.data || [];

  const enhancedAuditReportsQuery = useEnhancedAuditReports(
    userEmail,
    // ✅ NAYA CODE: Keep query enabled on overview and reports tabs to maintain cache
    !!userEmail && (activeTab === "overview" || activeTab === "reports") && !isDemo,
  );

  // ✅ React Query: Get active licenses count directly from cache (disabled in demo mode)
  const activeLicensesFromCache = useActiveLicensesCount(
    isDemo ? "" : userEmail,
  );

  // ✅ React Query: Fetch performance data automatically from cached audit reports and machines (disabled in demo mode)
  // ALWAYS enable in background for instant tab switching
  const performanceQuery = usePerformanceData(
    isDemo ? "" : userEmail,
    !!userEmail && !isDemo,
  );

  // ✅ React Query: Fetch Erasure Metrics for Performance Tab
  // ✅ OPTIMIZED: Initialize directly using useMemo to prevent unnecessary re-renders
  const erasureMetricsFilters = useMemo(
    () => ({
      year: new Date().getFullYear(),
      userEmails: userEmail ? [userEmail] : [],
    }),
    [userEmail],
  );

  const erasureMetricsQuery = useErasureMetrics(
    erasureMetricsFilters,
    !!userEmail && !isDemo,
  );

  const {
    data: erasureMetrics,
    isLoading: erasureMetricsLoading,
    error: erasureMetricsError,
  } = erasureMetricsQuery;

  // ✅ React Query: Fetch Groups with Users for Groups Tab
  const groupsWithUsersQuery = useGroupsWithUsers(
    userEmail,
    !!userEmail && !isDemo
  );

  // ✅ Fetch license list from /api/License/admin/all
  // ✅ NAYA CODE: Fetch in background so that billing details always has license data
  const licenseListQuery = useDashboardLicenseList(
    userEmail,
    !!userEmail && !isDemo,
  );
  // ✅ OPTIMIZED: Direct derivation — purana useState + useEffect hataya, ab seedha query se derive
  const licenseListLoading = licenseListQuery.isLoading && !isDemo;

  // ✅ NAYA CODE: Prefetch Billing Details in background for SuperAdmins
  useEffect(() => {
    if (!isSuperAdmin || isDemo || !userEmail) return;
    if (billingDetails && Object.keys(billingDetails).length > 0) return;

    let isMounted = true;

    const fetchBillingDetails = async () => {
      // Helper function to format date in user's local timezone
      const formatDateLocal = (dateStr: string | undefined) => {
        if (!dateStr) return "N/A";
        try {
          return new Date(dateStr).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } catch {
          return dateStr;
        }
      };

      try {
        const apiUserRes = await apiClient.getUserByEmail(userEmail);
        if (apiUserRes.success && apiUserRes.data && isMounted) {
          const apiUser = apiUserRes.data;
          let combinedBillingInfo: any = {};

          // 1️⃣ Load license details and normalize to DEMO format
          const licenseDetailsJson = apiUser.license_details_json;
          if (licenseDetailsJson && licenseDetailsJson !== "{}") {
            try {
              const parsed = JSON.parse(licenseDetailsJson);
              if (parsed.plans && parsed.summary) {
                combinedBillingInfo = {
                  activePlanTypes: parsed.summary.activePlanTypes?.join(", ") || "N/A",
                  activePlanIds: parsed.summary.activePlanIds?.join(", ") || "N/A",
                  totalPurchases: parsed.summary.totalPurchases || 0,
                  totalLicenses: parsed.summary.totalLicensesAcrossAllPlans || 0,
                  availableLicenses: parsed.summary.totalAvailableLicenses || 0,
                  consumedLicenses: parsed.summary.totalConsumedLicenses || 0,
                  usedLicenses: parsed.summary.totalConsumedLicenses || 0,
                  userEmail: parsed.useremail || userEmail,
                  status: "Active",
                };

                if (parsed.plans.length > 0) {
                  const firstPlan = parsed.plans[0];
                  combinedBillingInfo.planType = firstPlan.planType || firstPlan.plan_type || combinedBillingInfo.activePlanTypes;
                  combinedBillingInfo.totalLicenses = firstPlan.totalLicenses || firstPlan.total_licenses || combinedBillingInfo.totalLicenses || 0;
                  combinedBillingInfo.purchaseDate = formatDateLocal(firstPlan.purchaseDate);
                  combinedBillingInfo.startDate = formatDateLocal(firstPlan.startDate || firstPlan.purchaseDate);
                  combinedBillingInfo.validityYears = firstPlan.validityYears || firstPlan.validity_years || "N/A";
                  combinedBillingInfo.expiryDate = formatDateLocal(firstPlan.expiryDate);
                  combinedBillingInfo.billingCycle = firstPlan.billingCycle || firstPlan.billing_cycle || "Annual";
                  combinedBillingInfo.amount = firstPlan.amount || firstPlan.price || "N/A";
                  combinedBillingInfo.features = Array.isArray(firstPlan.features) ? firstPlan.features.join(", ") : firstPlan.features || "Standard Features";
                }
              } else {
                combinedBillingInfo = {
                  activePlanTypes: parsed.plan_type || parsed.planType || parsed.activePlanTypes || "Standard",
                  activePlanIds: parsed.plan_id || parsed.planId || parsed.activePlanIds || "N/A",
                  totalPurchases: parsed.total_purchases || parsed.totalPurchases || 1,
                  totalLicenses: parsed.total_licenses || parsed.totalLicenses || parsed.licenses || parsed.totalLicenses || 0,
                  availableLicenses: parsed.available_licenses || parsed.availableLicenses || 0,
                  consumedLicenses: parsed.consumed_licenses || parsed.consumedLicenses || parsed.usedLicenses || 0,
                  usedLicenses: parsed.used_licenses || parsed.usedLicenses || parsed.consumedLicenses || 0,
                  validityYears: parsed.validity_years || parsed.validityYears || "1",
                  purchaseDate: formatDateLocal(parsed.purchase_date || parsed.purchaseDate),
                  startDate: formatDateLocal(parsed.start_date || parsed.startDate),
                  expiryDate: formatDateLocal(parsed.expiry_date || parsed.expiryDate),
                  billingCycle: parsed.billing_cycle || parsed.billingCycle || "Annual",
                  amount: parsed.amount || parsed.price || "N/A",
                  status: parsed.status || "Active",
                  userEmail: parsed.user_email || parsed.userEmail || userEmail,
                  features: Array.isArray(parsed.features) ? parsed.features.join(", ") : parsed.features || "Standard Features",
                };
              }
            } catch (e) {
              devError("❌ Failed to parse license details:", e);
            }
          }

          // 2️⃣ Load payment details
          const paymentDetailsJson = apiUser.payment_details_json;
          if (paymentDetailsJson && paymentDetailsJson !== "{}") {
            try {
              const paymentParsed = JSON.parse(paymentDetailsJson);
              combinedBillingInfo = { ...combinedBillingInfo, ...paymentParsed };
            } catch (e) {
              devError("❌ Failed to parse payment details:", e);
            }
          }

          if (Object.keys(combinedBillingInfo).length > 0 && isMounted) {
            setBillingDetails(combinedBillingInfo);
          }
        }
      } catch (error) {
        devError("❌ Error fetching billing data in background:", error);
      }
    };

    fetchBillingDetails();

    return () => { isMounted = false; };
  }, [isSuperAdmin, isDemo, userEmail]);

  useEffect(() => {
    // NAYA CODE: ensure dashboardLicenseList is loaded right away if we have data
    if (dashboardLicenseList.length > 0) return;

    if (isDemo) {
      // Show dummy demo data matching the new tabular format
      setDashboardLicenseList([
        {
          license_id: "1",
          license_key: "ENT-A1B2-C3D4-E5F6",
          user_email: "admin@dsecure.com",
          license_type: "Enterprise",
          status: "Active",
          created_at: "2024-01-15T09:00:00Z",
          expires_at: "2027-01-15T09:00:00Z",
          activated_at: "2024-01-15T10:30:00Z",
          machine_count: 5,
        },
        {
          license_id: "2",
          license_key: "PRO-X7Y8-Z9W0-V1U2",
          user_email: "manager@dsecure.com",
          license_type: "Professional",
          status: "Active",
          created_at: "2024-02-20T14:00:00Z",
          expires_at: "2026-02-20T14:00:00Z",
          machine_count: 2,
        },
        {
          license_id: "3",
          license_key: "STD-Q3R4-S5T6-U7V8",
          user_email: "user1@dsecure.com",
          license_type: "Standard",
          status: "Inactive",
          created_at: "2024-03-10T11:00:00Z",
          expires_at: "2025-03-10T11:00:00Z",
          machine_count: 1,
        },
        {
          license_id: "4",
          license_key: "TRIAL-L9M0-N1O2-P3Q4",
          user_email: "trial@demo.com",
          license_type: "Trial",
          status: "Expired",
          created_at: "2023-11-01T10:00:00Z",
          expires_at: "2023-12-01T10:00:00Z",
          machine_count: 0,
        },
      ]);
      return;
    }

    // Sync license list from React Query cache
    startTransition(() => {
      if (licenseListQuery.data && licenseListQuery.data.length > 0) {
        setDashboardLicenseList(licenseListQuery.data);
      }
    });
  }, [activeTab, isDemo, licenseListQuery.data]);

  // ✅ OPTIMIZED: licenseListLoading ab line 503 pe directly derive hota hai — useEffect hata diya

  /* 
  // PURANA CODE: Manual fetch without caching
  useEffect(() => {
    if (activeTab !== "licenses" || dashboardLicenseList.length > 0) return;

    if (isDemo) { ... }

    const fetchLicenseList = async () => {
      setLicenseListLoading(true);
      try {
        const listRes = await apiClient.get<any>("/api/License/admin/all");
        // ... mapping and filtering logic ...
        setDashboardLicenseList(filteredList);
      } catch (err) {
        console.error("Failed to fetch license list for dashboard:", err);
      } finally {
        setLicenseListLoading(false);
      }
    };

    fetchLicenseList();
  }, [activeTab, userEmail, isDemo]);
  */
  // ✅ MEMOIZED: Performance Metrics Adapter
  // Adapts standard API data or Demo data into the format expected by the UI
  const displayErasureMetrics = useMemo(() => {
    if (isDemoMode()) {
      // Return mapped demo data
      return {
        totalErasures: DEMO_PERFORMANCE_DATA.monthlyErasures.reduce(
          (acc, curr) => acc + curr.count,
          0,
        ),
        monthlyMetrics: DEMO_PERFORMANCE_DATA.monthlyErasures.map((m) => ({
          month: m.month,
          erasureCount: m.count,
        })),
        avgDuration: "00:45:00", // Static for demo
        successRate: parseFloat(DEMO_PERFORMANCE_DATA.successRate), // "99.2%" -> 99.2
        methodMetrics: DEMO_PERFORMANCE_DATA.methodMetrics || [],
      };
    }
    // PURANA CODE: console.log("Dashboard Display Metrics:", erasureMetrics?.methodMetrics);
    return erasureMetrics;
  }, [erasureMetrics]);

  // ✅ React Query: Fetch sessions data with caching (disabled in demo mode)
  const sessionsQuery = useDashboardSessions(
    isDemo ? "" : userEmail,
    !!userEmail && !isDemo,
  );

  const displaySessionsData = sessionsQuery.data || [];

  // React Query mutations for CRUD operations
  const createSubuserMutation = useCreateSubuser();
  const updateSubuserMutation = useUpdateSubuser();
  const deleteSubuserMutation = useDeleteSubuser();

  // ✅ RBAC: currentUserRole, isSuperAdmin, isGroupAdmin, isSubUser are already defined above (lines 155-160)
  // Role-based permissions (using the RBAC currentUserRole from above)
  const permissions = getRolePermissions(currentUserRole);
  const roleInfo = getRoleDisplayInfo(currentUserRole);

  // Helper function to format datetime for Last Login display
  const formatLastLogin = (lastLogin: string | null | undefined): string => {
    if (!lastLogin || lastLogin === "Never" || lastLogin === "-") {
      return "Never";
    }

    try {
      const date = new Date(lastLogin);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      // Less than 1 minute ago
      if (diffMins < 1) {
        return "Just now";
      }
      // Less than 1 hour ago
      else if (diffMins < 60) {
        return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      }
      // Less than 24 hours ago
      else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      }
      // Less than 7 days ago
      else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      }
      // More than 7 days - show formatted date
      else {
        return date.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year:
            date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
        });
      }
    } catch (error) {
      devError("Error formatting last login date:", error);
      return lastLogin;
    }
  };

  // Debug: Log role and permissions
  // PURANA CODE: devLog("🔍 AdminDashboard Role Debug:", { currentUserRole, userRole: user?.role, permissions });

  // Note: All users can access admin dashboard, but with limited permissions
  // UI elements will be hidden based on role permissions

  // ✅ Listen for auth state changes (logout/login) to reset dashboard
  useEffect(() => {
    const handleAuthStateChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === null) {
        // User logged out - reset all dashboard state
        devLog("🚪 User logged out - clearing AdminDashboard state");
        setDashboardStats(null);
        setUserActivity([]);
        setGroups([]);
        setLicenseData([]);
        setRecentReports([]);
        setActiveLicensesCount(0);
        setAuditReportsCount(0);
        setAuditReports([]);
        // setUserLicenseDetails([]);
        setRecentSystemLogs([]);
        setPerformanceData({
          monthlyErasures: [],
          avgDuration: [],
          throughput: [],
          successRate: "100%",
          successCount: 0,
          failureCount: 0,
        });
        setSuperuserData(null);
        // ✅ React Query handles cache invalidation automatically
        // setSubusersData([]) // No longer needed - React Query manages this
        setProfileData(null);
      }
    };

    window.addEventListener("authStateChanged", handleAuthStateChange);
    return () =>
      window.removeEventListener("authStateChanged", handleAuthStateChange);
  }, []);

  // ✅ React Query provides data directly - no need for useEffect with object dependencies
  // Using dashboardQuery.activity directly in UI to avoid "Maximum update depth" error

  // ✅ React Query provides data directly - no need for useEffect with object dependencies
  // Using dashboardQuery.activity directly in UI to avoid "Maximum update depth" error

  // loading state is now reactive to React Query
  const dataLoading = dashboardQuery.isLoading && !isDemo;

  // ✅ NAYA CODE: Wrapped ALL setState calls in startTransition so navigation can interrupt them
  // PURANA CODE: Same effect but setState calls were NOT wrapped in startTransition,
  // causing them to be HIGH priority and blocking sidebar navigation in real login mode
  useEffect(() => {
    if (isDemo) return; // Skip in demo mode

    startTransition(() => {
      // Sync stats (✅ OPTIMIZED: Object.is equality check prevents re-renders)
      if (dashboardQuery.stats) {
        setDashboardStats((prev) => prev === dashboardQuery.stats ? prev : dashboardQuery.stats);
      }

      // Sync groups
      if (dashboardQuery.groups && dashboardQuery.groups.length > 0) {
        setGroups((prev) => prev === dashboardQuery.groups ? prev : dashboardQuery.groups);
      }

      // Sync license data (from React Query cache)
      if (dashboardQuery.licenses && dashboardQuery.licenses.length > 0) {
        setLicenseData((prev) => prev === dashboardQuery.licenses ? prev : dashboardQuery.licenses);
        setUserLicenseDetails((prev) => prev === dashboardQuery.licenses ? prev : dashboardQuery.licenses);
      } else if (
        dashboardQuery.stats &&
        Number(dashboardQuery.stats.totalLicenses) > 0
      ) {
        const fallbackLicense: LicenseData = {
          product: "D-Secure License",
          total: Number(dashboardQuery.stats.totalLicenses) || 0,
          consumed: Number(dashboardQuery.stats.licensesInUse) || 0,
          available: Number(dashboardQuery.stats.availableLicenses) || 0,
        };
        // Use functional state update to prevent overriding if already fallback
        setLicenseData((prev) => (prev && prev.length === 1 && prev[0].product === "D-Secure License" && prev[0].total === fallbackLicense.total) ? prev : [fallbackLicense]);
        setUserLicenseDetails((prev) => (prev && prev.length === 1 && prev[0].product === "D-Secure License" && prev[0].total === fallbackLicense.total) ? prev : [fallbackLicense]);
      }

      // Sync reports
      if (dashboardQuery.reports && dashboardQuery.reports.length > 0) {
        setRecentReports((prev) => prev === dashboardQuery.reports ? prev : dashboardQuery.reports);
      }

      // Sync profile data and flags
      if (dashboardQuery.profile) {
        setProfileData((prev) => prev === dashboardQuery.profile ? prev : dashboardQuery.profile);

        if (!isDemo) {
          const currentData = getUserDataFromStorage() || {};
          const updatedData = {
            ...currentData,
            is_groups_enabled: dashboardQuery.profile.is_groups_enabled,
            is_subusers_enabled: dashboardQuery.profile.is_subusers_enabled,
          };
          localStorage.setItem("user_data", JSON.stringify(updatedData));
          localStorage.setItem("authUser", JSON.stringify(updatedData));
        }
      }
    });
  }, [
    // Using dashboardQuery directly here is safe now because useDashboardData is memoized.
    dashboardQuery.stats,
    dashboardQuery.groups,
    dashboardQuery.licenses,
    dashboardQuery.reports,
    dashboardQuery.profile,
    isDemo,
  ]);

  // ✅ OPTIMIZED: 5 alag useEffect ko 1 consolidated useEffect mein merge kiya
  // PURANA CODE: Har query change pe alag useEffect → alag setState → alag re-render (5 re-renders!)
  // NAYA CODE: Ek hi useEffect mein sab batch hota hai → sirf 1 re-render
  useEffect(() => {
    startTransition(() => {
      // Machines se active licenses count derive karo
      if (machinesQuery.data) {
        const activeLicenses = machinesQuery.data.filter(
          (machine: Machine) => machine.license_activated === true,
        ).length;
        setActiveLicensesCount(activeLicenses);
      }

      // Audit reports count set karo
      if (auditReportsQuery.data) {
        setAuditReportsCount(auditReportsQuery.data.length);
      }

      // Enhanced audit reports sync karo — fallback: agar enhanced query fail ho toh basic query ka data use karo
      if (enhancedAuditReportsQuery.data && enhancedAuditReportsQuery.data.length > 0) {
        setAuditReports(enhancedAuditReportsQuery.data);
      } else if (auditReportsQuery.data && auditReportsQuery.data.length > 0) {
        // FALLBACK: Enhanced query fail hui toh basic audit reports use karo
        setAuditReports(auditReportsQuery.data as any);
      }

      // Performance data sync karo
      if (performanceQuery.data) {
        setPerformanceData(performanceQuery.data);
      }

      // Sessions data sync karo
      if (sessionsQuery.data) {
        setRecentSessions(sessionsQuery.data);
      }

      // Groups with Users sync karo
      if (groupsWithUsersQuery.data) {
        setGroupsWithUsers(groupsWithUsersQuery.data);
        setGroupsCached(true);
      }
    });
  }, [
    machinesQuery.data,
    auditReportsQuery.data,
    enhancedAuditReportsQuery.data,
    performanceQuery.data,
    sessionsQuery.data,
    groupsWithUsersQuery.data, // ✅ NAYA CODE: Missing dependency added
  ]);

  // ✅ RBAC FILTERING: Filter license data using centralized buildLicenseFilter
  const displayLicenseData = licenseData || [];

  // ✅ OPTIMIZED: displayPerformanceData ab seedha query data use karta hai jab available ho
  const displayPerformanceData = performanceQuery.data || performanceData;

  // ✅ DEMO MODE: Set static/dummy data when user logs in via "Try Demo Account"
  useEffect(() => {
    if (isDemoMode()) {
      devLog("🎭 DEMO MODE ACTIVE - Loading static demo data");

      // Set demo dashboard stats
      setDashboardStats(DEMO_DASHBOARD_STATS);

      // Set demo profile
      setProfileData(DEMO_PROFILE);

      // Set demo user activity
      setUserActivity(DEMO_USER_ACTIVITY);

      // Set demo groups
      setGroups(DEMO_GROUPS);

      // Set demo license data
      setLicenseData(DEMO_LICENSE_DETAILS);
      setUserLicenseDetails(DEMO_LICENSE_DETAILS);

      // Set demo reports
      setRecentReports(
        DEMO_REPORTS.map((r) => ({
          id: r.id,
          type: r.type,
          devices: r.devices,
          status: r.status,
          date: r.date,
          method: r.method,
        })),
      );

      // Set demo system logs
      setRecentSystemLogs(DEMO_SYSTEM_LOGS);

      // Set demo sessions
      setRecentSessions(DEMO_SESSIONS);

      // Set demo performance data
      setPerformanceData(DEMO_PERFORMANCE_DATA as any);

      // Set demo audit reports
      setAuditReports(DEMO_AUDIT_REPORTS as any);
      setAuditReportsCount(DEMO_AUDIT_REPORTS.length);

      // Set demo active licenses count
      setActiveLicensesCount(
        DEMO_MACHINES.filter(
          (m) => m.status === "Active" || m.status === "Running",
        ).length,
      );

      // Set demo billing details (for Settings modal)
      setBillingDetails(DEMO_BILLING_DETAILS);

      // ✅ OPTIMIZED: Merged 2 demo initialization useEffects into 1
      setGroupsWithUsers([
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
            { id: 1, name: "John Doe", email: "john.doe@demo.com", role: "User", license: 5, profile: "Developer" },
            { id: 2, name: "Jane Smith", email: "jane.smith@demo.com", role: "User", license: 3, profile: "Senior Developer" },
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
            { id: 3, name: "Mike Johnson", email: "mike.johnson@demo.com", role: "User", license: 2, profile: "Marketing Manager" },
          ],
        },
        {
          id: 3,
          name: "Sales Team",
          description: "Sales and business development",
          created: "2024-03-10",
          licenseStats: {
            totalAllocated: 75,
            distributedToUsers: 62,
            available: 13,
            usagePercent: 82.7,
          },
          users: [
            { id: 4, name: "Sarah Williams", email: "sarah.williams@demo.com", role: "User", license: 4, profile: "Sales Executive" },
            { id: 5, name: "Tom Brown", email: "tom.brown@demo.com", role: "User", license: 3, profile: "Account Manager" },
          ],
        },
      ]);
      setGroupsCached(true);
    }
  }, []);

  // ✅ React Query now handles data fetching automatically when activeTab === 'users'
  // No need for manual useEffect - React Query hook useUserMetrics is enabled globally
  
  // ✅ React Query now handles Groups with Users fetching automatically
  // No need for manual useEffect or fetchGroupsWithUsers function.
  // The useGroupsWithUsers hook is always enabled in the background for instant tab switching.
  const fetchGroupsWithUsers = async (silent = false) => {
    if (silent) {
      groupsWithUsersQuery.refetch();
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  /**
   * 🔄 fetchAndMergeUsersData has been removed
   * React Query hooks (useSubusers, useUserMachines, etc.) handle this now.
   * Caching is persisted via IndexedDB and React Query staleTime: Infinity
   */

  // Generate stats array from API data or use defaults
  const stats = useMemo(() => {
    // ✅ DEMO MODE: Always use demo stats in demo mode (no API dependency)
    const statsData = isDemo ? DEMO_DASHBOARD_STATS : dashboardStats;
    if (!statsData) return [];

    return [
      {
        label: "Total Licenses",
        value: statsData.totalLicenses || "0",
        change: statsData.changes?.totalLicenses?.value || "0",
        trend: statsData.changes?.totalLicenses?.trend || "up",
        color: "bg-[#0e7c66]",
      },
      {
        label: "Active Users",
        value: statsData.activeUsers,
        change: statsData.changes?.activeUsers?.value || "0",
        trend: statsData.changes?.activeUsers?.trend || "up",
        color: "bg-[#0e7c66]",
      },
      {
        label: "Available Licenses",
        value: statsData.availableLicenses,
        change: statsData.changes?.availableLicenses?.value || "0",
        trend: statsData.changes?.availableLicenses?.trend || "up",
        color: "bg-[#0e7c66]",
      },
      {
        label: "Success Rate",
        value: isDemo
          ? statsData.successRate
          : performanceData.successRate || "0%",
        change: statsData.changes?.successRate?.value || "0%",
        trend: statsData.changes?.successRate?.trend || "up",
        color: "bg-[#0e7c66]",
      },
    ];
  }, [dashboardStats, isDemo, performanceData]);

  // Calculate active users count (status === 'active' or 'Active')
  const activeUsersCount = useMemo(() => {
    if (!subusersData) return 0;
    return subusersData.filter(
      (subuser: any) =>
        subuser.status === "active" || subuser.status === "Active",
    ).length;
  }, [subusersData]);

  // License Management Handlers
  const handleBulkLicenseAssignment = () => {
    setShowBulkLicenseModal(true);
  };

  const handleBulkLicenseSubmit = async () => {
    // ✅ DEMO MODE GUARD: Prevent bulk license assignment in demo mode
    if (isDemo) {
      showInfo("Demo Mode", "Bulk license assignment is disabled in demo mode");
      setShowBulkLicenseModal(false);
      return;
    }

    if (
      !bulkUserCount ||
      !bulkLicenseCount ||
      isNaN(Number(bulkUserCount)) ||
      isNaN(Number(bulkLicenseCount))
    ) {
      showError("Invalid Input", "Please enter valid numbers for both fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await AdminDashboardAPI.assignBulkLicenses(
        Number(bulkUserCount),
        Number(bulkLicenseCount),
      );

      if (response.success) {
        const totalLicenses = Number(bulkUserCount) * Number(bulkLicenseCount);
        showSuccess(
          "Licenses Assigned Successfully",
          `Assigned ${bulkLicenseCount} licenses to ${bulkUserCount} users. Total licenses assigned: ${totalLicenses}`,
        );

        // Refresh dashboard data after successful assignment
        dashboardQuery.refetch();

        setShowBulkLicenseModal(false);
        setBulkUserCount("10");
        setBulkLicenseCount("5");
      } else {
        throw new Error(response.error || "Assignment failed");
      }
    } catch (error) {
      devError("Bulk license assignment error:", error);
      showError(
        "Assignment Failed",
        "Failed to assign licenses. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLicenseAudit = async () => {
    setShowLicenseAuditModal(true);

    // Load fresh license audit data when modal opens
    try {
      const response = await AdminDashboardAPI.getLicenseAudit();
      if (response.success) {
        setLicenseData(response.data);
      }
    } catch (error) {
      devError("License audit data loading error:", error);
    }
  };

  // New handler functions for buttons and actions
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserSubmit = async () => {
    // ✅ DEMO MODE GUARD: Prevent user creation in demo mode
    if (isDemo) {
      showInfo("Demo Mode", "User creation is disabled in demo mode");
      setShowAddUserModal(false);
      return;
    }

    if (
      !newUserForm.name ||
      !newUserForm.email ||
      !newUserForm.password ||
      !newUserForm.phone
    ) {
      showError("Invalid Input", "Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // Get superuser email from localStorage
      const storedUserData = getUserDataFromStorage();
      const superuserEmail =
        storedUserData?.user_email ||
        storedUserData?.email ||
        (user as any)?.user_email ||
        user?.email;

      devLog("📧 Creating subuser with superuser email:", superuserEmail);

      if (!superuserEmail) {
        throw new Error("Superuser email not found. Please log in again.");
      }

      // Map form fields to database fields
      const subuserData = {
        name: newUserForm.name,
        subuser_email: newUserForm.email,
        role: newUserForm.role,
        department: newUserForm.department || "",
        subuser_password: newUserForm.password,
        phone: newUserForm.phone,
        subuser_group: newUserForm.group || "",
        superuser_email: superuserEmail,
        license_allocation: newUserForm.license_allocation || "0",
      };

      devLog("📤 Sending subuser data to API:");
      devLog("  - name:", subuserData.name);
      devLog("  - subuser_email:", subuserData.subuser_email);
      devLog("  - role:", subuserData.role);
      devLog("  - department:", subuserData.department);
      devLog("  - phone:", subuserData.phone);
      devLog("  - subuser_group:", subuserData.subuser_group);
      devLog("  - license_allocation:", subuserData.license_allocation);
      devLog("  - superuser_email:", subuserData.superuser_email);

      // Use apiClient which handles authentication automatically
      const response = await apiClient.createSubuser(subuserData);

      devLog("✅ Subuser creation response:", response);

      if (response && response.success && response.data) {
        showSuccess(
          "User Created",
          `User ${newUserForm.name} created successfully`,
        );
        setShowAddUserModal(false);
        setNewUserForm({
          name: "",
          email: "",
          role: "user",
          password: "",
          phone: "",
          department: "",
          group: "",
          license_allocation: "0",
        });

        // ✅ Clear users cache to force fresh data fetch
        localStorage.removeItem("dashboard_cache_subusers");
        localStorage.removeItem("dashboard_cache_superuser");
        devLog("🗑️ Cleared users cache after creating new user");

        // loadDashboardData(); // Refresh dashboard data
      } else {
        const errorMessage =
          response?.error || response?.message || "User creation failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      devError("❌ User creation error:", error);
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as Error).message
          : "Failed to create user. Please try again.";
      showError("Creation Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGroup = () => {
    setShowAddGroupModal(true);
  };

  const handleAddGroupSubmit = async () => {
    // ✅ DEMO MODE GUARD: Prevent group creation in demo mode
    if (isDemo) {
      showInfo("Demo Mode", "Group creation is disabled in demo mode");
      setShowAddGroupModal(false);
      return;
    }

    if (!newGroupForm.name || !newGroupForm.description) {
      showError("Invalid Input", "Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await AdminDashboardAPI.createGroup(newGroupForm);

      if (response.success) {
        showSuccess(
          "Group Created",
          `Group ${newGroupForm.name} created successfully`,
        );
        setShowAddGroupModal(false);
        setNewGroupForm({ name: "", description: "", licenses: 0 });
        // loadDashboardData(); // Refresh dashboard data
      } else {
        throw new Error(response.error || "Group creation failed");
      }
    } catch (error) {
      devError("Group creation error:", error);
      showError("Creation Failed", "Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageUsers = () => {
    navigate("/admin/subusers");
  };

  const handleManageGroups = () => {
    setActiveTab("users");
    showInfo("Switched to Users tab");
    // Data will be fetched automatically by useEffect when activeTab changes
  };

  const handleAdminReports = () => {
    navigate("/admin/reports");
  };

  const handleSystemSettings = () => {
    setShowSystemSettingsModal(true);
  };

  // Superuser Actions
  const handleEditSuperuser = () => {
    if (superuserData) {
      showInfo(
        "Edit Superuser",
        `Opening profile settings for ${superuserData.user_name}`,
      );
      navigate("/profile/settings");
    }
  };

  const handleManageSuperuserLicenses = () => {
    if (superuserData) {
      showInfo(
        "Manage Licenses",
        `Managing licenses for ${superuserData.user_name}`,
      );
      // Future: Open license management modal
      navigate("/admin/licenses");
    }
  };

  // Subuser Actions
  const handleEditSubuser = (subuser: Subuser) => {
    // ✅ DEMO MODE GUARD: Prevent subuser editing in demo mode
    if (isDemo) {
      showInfo("Demo Mode", "Subuser editing is disabled in demo mode");
      return;
    }
    showInfo("Edit Subuser", `Opening edit page for ${subuser.subuser_email}`);
    // Future: Navigate to subuser edit page or open modal
    devLog("Edit subuser:", subuser);
  };

  const handleDeleteSubuser = async (subuser: Subuser) => {
    // ✅ DEMO MODE GUARD: Prevent subuser deletion in demo mode
    if (isDemo) {
      showInfo("Demo Mode", "Subuser deletion is disabled in demo mode");
      return;
    }
    // Simple confirmation using window.confirm
    const confirmed = window.confirm(
      `Are you sure you want to delete ${subuser.subuser_email}?\n\nThis action cannot be undone.`,
    );

    if (confirmed) {
      try {
        showInfo("Deleting Subuser", `Deleting ${subuser.subuser_email}...`);

        // Future: Call delete API
        // await apiClient.deleteSubuser(subuser.id)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // ✅ React Query: Refetch users data after deletion
        await refetchSubusers();
        showSuccess(
          "Subuser Deleted",
          `${subuser.subuser_email} has been deleted successfully`,
        );
      } catch (error) {
        devError("Error deleting subuser:", error);
        showError("Delete Failed", `Failed to delete ${subuser.subuser_email}`);
      }
    }
  };

  const handleAssignLicenses = (group: GroupData) => {
    setSelectedGroupForLicenses(group);
    setShowAssignLicensesModal(true);
  };

  const handleAssignLicensesSubmit = async () => {
    // ✅ DEMO MODE GUARD: Prevent license assignment in demo mode
    if (isDemo) {
      showInfo("Demo Mode", "License assignment is disabled in demo mode");
      setShowAssignLicensesModal(false);
      return;
    }

    if (
      !selectedGroupForLicenses ||
      !assignLicensesForm.licenseCount ||
      !assignLicensesForm.expiryDate
    ) {
      showError("Invalid Input", "Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await AdminDashboardAPI.assignLicensesToGroup(
        selectedGroupForLicenses.name, // Using name as ID for demo
        assignLicensesForm,
      );

      if (response.success) {
        showSuccess(
          "Licenses Assigned",
          `${assignLicensesForm.licenseCount} licenses assigned to ${selectedGroupForLicenses.name}`,
        );
        setShowAssignLicensesModal(false);
        setSelectedGroupForLicenses(null);
        setAssignLicensesForm({
          licenseCount: 10,
          expiryDate: "",
          licenseType: "basic",
        });
        dashboardQuery.refetch(); // Refresh dashboard data
      } else {
        throw new Error(response.error || "License assignment failed");
      }
    } catch (error) {
      devError("License assignment error:", error);
      showError(
        "Assignment Failed",
        "Failed to assign licenses. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // All data is now loaded from API and stored in state
  // No more hardcoded data arrays needed

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("admin-dashboard")} />
      <div className="container-app py-8 lg:py-12 bg-white min-h-screen">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a2e1e]">
                {t("dashboard.adminDashboard")}
              </h1>
              {/* Role Badge */}
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleInfo.bgColor} ${roleInfo.color}`}
              >
                {roleInfo.label}
              </span>
            </div>
            <p className="mt-2 text-slate-600 flex flex-wrap items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#0e7c66] flex-shrink-0"></span>
              <span className="break-all sm:break-normal">
                {t("dashboard.welcomeBack")},{" "}
                {storedUserData?.name ||
                  storedUserData?.user_name ||
                  storedUserData?.subuser_name ||
                  profileData?.name ||
                  user?.name ||
                  getNameFromEmail(
                    profileData?.email ||
                      storedUserData?.user_email ||
                      storedUserData?.email ||
                      user?.email ||
                      "user@example.com",
                  )}
              </span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="hidden sm:inline text-sm text-slate-500">
                {roleInfo.description}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 lg:justify-end">
            {/* Profile Button - Always visible with dynamic avatar */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-brand-600 hover:to-brand-800 rounded-none transition-all duration-200 shadow-lg"
            >
              <span>{t("dashboard.profile")}</span>
            </button>

            {/* Private Cloud Setup Button - Only if is_private_cloud is true */}
            {/* {isPrivateCloudEnabled && !isDemo && (
              <button
                onClick={() => navigate('/admin/private-cloud-setup')}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-all duration-200 shadow-lg"
                title="Private Cloud Setup"
              >
                <Cloud className="w-5 h-5" />
                <span className="hidden sm:inline">Private Cloud</span>
              </button>
            )} */}
            <button
              onClick={() => navigate("/admin/private-cloud-setup")}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-all duration-200 shadow-lg"
              title="Private Cloud Setup"
            >
              <Cloud className="w-5 h-5" />
              <span className="hidden sm:inline">Private Cloud</span>
            </button>

            {/* Settings Button - Billing & Password */}
            {/* ✅ RBAC: All users can access Settings (Billing restricted inside) */}
            <button
              onClick={() => {
                setShowSettingsModal(true);
                // 🎭 In Demo Mode, use DEMO_BILLING_DETAILS directly
                if (isDemo && isSuperAdmin) {
                  devLog("🎭 Demo Mode: Using DEMO_BILLING_DETAILS");
                  setBillingDetails(DEMO_BILLING_DETAILS);
                }
                setSettingsTab(isSuperAdmin ? "billing" : "password");
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-none transition-all duration-200 shadow-sm"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {/* Private Cloud Button - For Superadmin (Not Demo) */}
            {/* {currentUserRole === 'superadmin' && isDemo && (
              <button
                onClick={() => {
                  // Always navigate to private cloud page
                  // Page will handle enabled/disabled state internally
                  navigate('/admin/private-cloud-setup');
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#0a2e1e] bg-[#d4ede4] hover:bg-[#d4ede4] border border-[#d0d5dc] rounded-none transition-all duration-200 shadow-sm"
                title="Private Cloud"
              >
                <Cloud className="w-5 h-5" />
                <span className="hidden sm:inline">Private Cloud</span>
              </button>
            )} */}

            {/* Private Cloud Button (Gradient) - Only for Private Cloud Enabled Users */}

            {/* Renew License Button */}
            {/* <button 
            onClick={() => {
              window.location.href = '/pricing';
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-all duration-200 shadow-lg"
            title="Renew Your License"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="hidden sm:inline">Renew License</span>
          </button> */}

            {/* Add User Button - Role-based visibility, Hidden in Demo Mode */}
            {!isDemo && (
              <RoleBased permission="canCreateUser">
                <button
                  onClick={handleAddUser}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-none transition-colors bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  <span>Add User</span>
                </button>
              </RoleBased>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Role-Based Visibility */}
        <div className="mb-8">
          <div className="border-b border-slate-200 overflow-hidden">
            <nav className="-mb-px flex overflow-x-auto">
              <div className="flex space-x-4 sm:space-x-8 px-1 min-w-max">
                {[
                  {
                    id: "overview",
                    name: t("dashboard.overview"),
                    permission: "canViewDashboard", // All roles can see
                    iconSvg: (
                      <BarChart className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "licenses",
                    name: t("dashboard.licenses"),
                    permission: "canViewLicenses", // All roles except basic user can see
                    iconSvg: (
                      <Key className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "users",
                    name: t("dashboard.users"),
                    permission: "canViewAllUsers", // Only admin/superadmin/manager
                    iconSvg: (
                      <Users className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "groups",
                    name: t("dashboard.groups"),
                    permission: "canViewAllUsers", // Only admin/superadmin/manager
                    iconSvg: (
                      <Users className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "activity",
                    name: t("dashboard.userActivity"),
                    permission: "canViewAllUsers", // Only admin/superadmin/manager
                    iconSvg: (
                      <BarChart className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "reports",
                    name: t("dashboard.reports"),
                    permission: "canViewReports", // All roles can see
                    iconSvg: (
                      <FileText className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "performance",
                    name: t("dashboard.performance"),
                    permission: "canViewDashboard", // All roles can see
                    iconSvg: (
                      <TrendingUp className="w-5 h-5" />
                    ),
                  },
                  {
                    id: "mydownloads",
                    name: "My Downloads",
                    permission: "canViewDashboard", // All roles can see
                    iconSvg: (
                      <Download className="w-5 h-5" />
                    ),
                  },
                ]
                  .filter((tab) => {
                    // Check base role permission
                    const hasRolePermission = hasPermission(
                      currentUserRole,
                      tab.permission as any,
                    );

                    // Apply feature flag checks
                    if (tab.id === "groups" && !isGroupsEnabled) return false;
                    if (tab.id === "users" && !isSubusersEnabled) return false;

                    return hasRolePermission;
                  }) // Only show tabs user has permission for
                  .map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-[#0e7c66] text-[#0a2e1e]"
                          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {tab.iconSvg}
                      <span>{tab.name}</span>
                    </button>
                  ))}
              </div>
            </nav>
          </div>
        </div>

        {/* ********** NAYA CODE — Skeleton Shimmer UI while data loads ********** */}
        {/* ********** NAYA CODE — Skeleton Shimmer UI while data loads ********** */}
        {/* ✅ OPTIMIZED: Only show skeleton if we lack critical stats data */}
        {dataLoading && !dashboardStats && (
          <div className="animate-pulse space-y-6">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-none shadow-sm border border-slate-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded w-16 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-20" />
                </div>
              ))}
            </div>

            {/* Chart Area Skeleton */}
            <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6">
              <div className="h-5 bg-slate-200 rounded w-40 mb-4" />
              <div className="h-48 bg-slate-100 rounded-none" />
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6">
              <div className="h-5 bg-slate-200 rounded w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 rounded w-1/5" />
                    <div className="h-4 bg-slate-100 rounded w-1/6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* ********** END Skeleton UI ********** */}

        {/* ********** NAYA CODE — Hide real content while skeleton is showing ********** */}
        {/* ✅ OPTIMIZED: Show content immediately if we have stats, even if background loading is active */}
        {(!dataLoading || !!dashboardStats) && (
          <>
            {/* Stats Grid - Role-Based Display */}
            {/* Full Stats for SuperAdmin/Admin */}
            <RoleBased permission="canViewAllStats">
              {stats.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6 flex items-start justify-between min-w-0 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-3 h-3 rounded-full ${stat.color} flex-shrink-0`}
                          ></div>
                          <p className="text-sm font-medium text-slate-600">
                            {stat.label}
                          </p>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ml-2 flex-shrink-0 ${
                          stat.trend === "up"
                            ? "text-[#0a2e1e]"
                            : "text-red-600"
                        }`}
                      >
                        <span>{stat.change}</span>
                        <ChevronUp className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-none p-8 text-center mb-8">
                  <BarChart className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                    No Statistics Available
                  </h2>
                  <p className="text-sm text-slate-600">
                    Dashboard statistics are not available from the server.
                  </p>
                </div>
              )}
            </RoleBased>

            {/* Limited Stats for Manager */}
            <RoleBased permission="canViewAllStats" roles={["Manager"]}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Licenses
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {dashboardStats?.totalLicenses || 0}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">All licenses</p>
                </div>
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Active Users
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {activeUsersCount}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Team members</p>
                </div>
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Licenses Assigned
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {billingDetails?.consumedLicenses || billingDetails?.usedLicenses || dashboardStats?.licensesInUse || activeLicensesFromCache || 0}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">In use</p>
                </div>
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Reports Generated
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {auditReports.length}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">This month</p>
                </div>
              </div>
            </RoleBased>

            {/* Minimal Stats for User */}
            <RoleBased roles={["user"]}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Licenses
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {dashboardStats?.totalLicenses || 0}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">All licenses</p>
                </div>
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Active Users
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {activeUsersCount}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Team members</p>
                </div>
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      My Licenses
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {billingDetails?.consumedLicenses || billingDetails?.usedLicenses || dashboardStats?.licensesInUse || activeLicensesFromCache || 0}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Active licenses</p>
                </div>
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-4 lg:!p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-[#0e7c66] flex-shrink-0"></div>
                    <p className="text-sm font-medium text-slate-600">
                      Available Reports
                    </p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#0a2e1e]">
                    {dashboardStats?.totalReports || 0}
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Ready to download
                  </p>
                </div>
              </div>
            </RoleBased>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Recent Reports */}
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 min-w-0">
                  <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="font-semibold text-[#0a2e1e]">
                      Recent Reports
                    </h2>
                    <Link
                      to="/admin/reports"
                      className="text-[#0a2e1e] hover:text-[#0a2e1e] text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6-content divide-y divide-slate-200 max-h-[300px] min-h-[300px] overflow-y-auto">
                    {auditReports.length > 0 ? (
                      <>
                        {auditReports
                          .slice(
                            (recentReportsPage - 1) * recentReportsPageSize,
                            recentReportsPage * recentReportsPageSize,
                          )
                          .map((report) => (
                            <div
                              key={report.id || report.report_id}
                              className="px-4 sm:px-6 py-4 flex items-start justify-between hover:bg-slate-50 transition-colors min-w-0 gap-3"
                            >
                              <div className="flex items-start gap-2 sm:gap-4 min-w-0 flex-1">
                                <div
                                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                                    report.status === "completed" ||
                                    report.status === "Completed"
                                      ? "bg-[#0e7c66]"
                                      : report.status === "running" ||
                                          report.status === "Running"
                                        ? "bg-[#0e7c66]"
                                        : report.status === "pending" ||
                                            report.status === "Pending"
                                          ? "bg-[#0e7c66]"
                                          : "bg-red-400"
                                  }`}
                                ></div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-medium text-[#0a2e1e] truncate" title={report.report_name || report.reportType}>
                                    {report.report_name ||
                                      report.reportType ||
                                      `Report #${
                                        report.report_id ||
                                        report.reportId ||
                                        report.id
                                      }`}
                                  </div>
                                  <div className="text-sm text-slate-500 truncate">
                                    {report.erasure_method && (
                                      <span className="mr-2">{report.erasure_method}</span>
                                    )}
                                    {report.reportType && (
                                      <span>{report.reportType}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs sm:text-sm text-slate-500 flex-shrink-0 mt-1">
                                {report.report_datetime
                                  ? new Date(
                                      report.report_datetime,
                                    ).toLocaleDateString("en-IN", {
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : report.reportDate
                                    ? new Date(
                                        report.reportDate,
                                      ).toLocaleDateString("en-IN", {
                                        month: "short",
                                        day: "numeric",
                                      })
                                    : "N/A"}
                              </div>
                            </div>
                          ))}
                      </>
                    ) : (
                      <div className="px-4 sm:px-6 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                          <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                          No Data Available
                        </h2>
                        <p className="text-sm text-slate-600">
                          No reports data available from the server.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Recent Reports Pagination Footer */}
                  {auditReports.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-600 whitespace-nowrap">
                            Rows:
                          </label>
                          <select
                            value={recentReportsPageSize}
                            onChange={(e) => {
                              setRecentReportsPageSize(
                                parseInt(e.target.value, 10),
                              );
                              setRecentReportsPage(1);
                            }}
                            className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                          >
                            {pageSizeOptions.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {Math.min(
                            (recentReportsPage - 1) * recentReportsPageSize + 1,
                            auditReports.length,
                          )}-{Math.min(
                            recentReportsPage * recentReportsPageSize,
                            auditReports.length,
                          )} of {auditReports.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <span className="text-xs text-slate-600 whitespace-nowrap">
                          Page {recentReportsPage} of{" "}
                          {Math.ceil(
                            auditReports.length / recentReportsPageSize,
                          )}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              setRecentReportsPage((prev) =>
                                Math.max(prev - 1, 1),
                              )
                            }
                            disabled={recentReportsPage === 1}
                            className="px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Prev
                          </button>
                          <button
                            onClick={() =>
                              setRecentReportsPage((prev) =>
                                Math.min(
                                  prev + 1,
                                  Math.ceil(
                                    auditReports.length / recentReportsPageSize,
                                  ),
                                ),
                              )
                            }
                            disabled={
                              recentReportsPage >=
                              Math.ceil(
                                auditReports.length / recentReportsPageSize,
                              )
                            }
                            className="px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Sessions */}
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 min-w-0">
                  <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="font-semibold text-[#0a2e1e]">
                      Recent Sessions
                    </h2>
                    <Link
                      to="/admin/sessions"
                      className="text-[#0a2e1e] hover:text-[#0a2e1e] text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6-content divide-y divide-slate-200 max-h-[300px] min-h-[300px] overflow-y-auto">
                    {recentSessions.length > 0 ? (
                      <>
                        {recentSessions
                          .slice(
                            (systemLogsPage - 1) * systemLogsPageSize,
                            systemLogsPage * systemLogsPageSize,
                          )
                          .map((session, index) => (
                            <div
                              key={session.session_id || index}
                              className="px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors min-w-0"
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                {/* Session Status Badge */}
                                <div className="flex-shrink-0 mt-0.5">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      session.session_status === "active" ||
                                      session.session_status === "Active"
                                        ? "bg-[#d4ede4] text-[#0a2e1e]"
                                        : session.session_status ===
                                              "inactive" ||
                                            session.session_status ===
                                              "Inactive"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-slate-100 text-slate-700"
                                    }`}
                                  >
                                    {session.session_status || "Unknown"}
                                  </span>
                                </div>

                                {/* Session Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-1">
                                    <p className="font-medium text-[#0a2e1e] text-sm truncate" title={session.user_email}>
                                      {session.user_email || "Unknown User"}
                                    </p>
                                    <span className="text-[10px] sm:text-xs text-slate-500 flex-shrink-0 mt-0.5">
                                      {session.login_time
                                        ? formatSessionDate(session.login_time)
                                        : "N/A"}
                                    </span>
                                  </div>

                                  {/* Additional Info */}
                                  <div className="flex items-center gap-3 text-xs text-slate-500">
                                    {session.ip_address && (
                                      <span className="">
                                        <Globe className="w-3 h-3 inline mr-1" />
                                        {session.ip_address}
                                      </span>
                                    )}
                                    {session.logout_time && (
                                      <span className="truncate text-slate-400">
                                        Logout: {formatSessionDate(session.logout_time)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    ) : (
                      <div className="px-4 sm:px-6 py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                          <Clock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                          No Sessions Found
                        </h2>
                        <p className="text-sm text-slate-600">
                          No recent sessions available at this time.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Sessions Pagination - always show when data exists */}
                  {recentSessions.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-600 whitespace-nowrap">Rows:</label>
                          <select
                            value={systemLogsPageSize}
                            onChange={(e) => {
                              setSystemLogsPageSize(parseInt(e.target.value, 10));
                              setSystemLogsPage(1);
                            }}
                            className="px-2 py-1 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                          >
                            {pageSizeOptions.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {Math.min((systemLogsPage - 1) * systemLogsPageSize + 1, recentSessions.length)}-{Math.min(systemLogsPage * systemLogsPageSize, recentSessions.length)} of {recentSessions.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <span className="text-xs text-slate-600 whitespace-nowrap">
                          Page {systemLogsPage} of{" "}
                          {Math.ceil(recentSessions.length / systemLogsPageSize)}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setSystemLogsPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={systemLogsPage === 1}
                            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                          >
                            Prev
                          </button>
                          <button
                            onClick={() =>
                              setSystemLogsPage((prev) =>
                                Math.min(
                                  prev + 1,
                                  Math.ceil(
                                    recentSessions.length / systemLogsPageSize,
                                  ),
                                ),
                              )
                            }
                            disabled={
                              systemLogsPage >=
                              Math.ceil(
                                recentSessions.length / systemLogsPageSize,
                              )
                            }
                            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions - COMMENTED OUT AS PER REQUIREMENT */}
                {/* 
          <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-[#0a2e1e]">Quick Actions</h2>
            </div>
            <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6-content space-y-3 p-4 sm:p-6">
              <RoleBased permission="canViewAllUsers">
                <button 
                  onClick={handleManageUsers}
                  className="w-full flex items-center gap-4 p-4 rounded-none border border-slate-200 hover:border-[#0e7c66] hover:bg-[#f4fbf8] transition-all text-left"
                >
                  <div className="w-10 h-10 bg-[#d4ede4] rounded-none flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-[#0a2e1e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#0a2e1e]">Manage Users</div>
                    <div className="text-sm text-slate-500">Add, edit or remove user accounts</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canViewGroups">
                <button 
                  onClick={handleManageGroups}
                  className="w-full flex items-center gap-4 p-4 rounded-none border border-slate-200 hover:border-[#0e7c66] hover:bg-[#f4fbf8] transition-all text-left"
                >
                  <div className="w-10 h-10 bg-[#d4ede4] rounded-none flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#0a2e1e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#0a2e1e]">Manage Groups</div>
                    <div className="text-sm text-slate-500">Create and manage user groups</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canGenerateReports">
                <button 
                  onClick={handleAdminReports}
                  className="w-full flex items-center gap-4 p-4 rounded-none border border-slate-200 hover:border-[#0e7c66] hover:bg-[#f4fbf8] transition-all text-left"
                >
                  <div className="w-10 h-10 bg-[#d4ede4] rounded-none flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5 text-[#0a2e1e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#0a2e1e]">Admin Reports</div>
                    <div className="text-sm text-slate-500">Generate and manage admin reports</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canViewSettings">
                <button 
                  onClick={handleSystemSettings}
                  className="w-full flex items-center gap-4 p-4 rounded-none border border-slate-200 hover:border-[#0e7c66] hover:bg-[#f4fbf8] transition-all text-left"
                >
                  <div className="w-10 h-10 bg-[#d4ede4] rounded-none flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5 text-[#0a2e1e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#0a2e1e]">System Settings</div>
                    <div className="text-sm text-slate-500">Configure system preferences</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canViewLicenses">
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-white rounded-none flex items-center justify-center">
                      <Server className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0a2e1e]">License Management</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <RoleBased permission="canBulkAssignLicenses">
                      <button 
                        onClick={() => handleBulkLicenseAssignment()}
                        className="group flex items-center gap-4 p-4 rounded-none border border-slate-200 hover:border-[#0e7c66] hover: hover:from-[#0e7c66] hover:to-[#0a2e1e] transition-all text-left shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#0a2e1e] group-hover:text-[#0a2e1e] transition-colors">Bulk License Assignment</div>
                          <div className="text-sm text-slate-600 mt-1">Assign licenses to multiple users at once with advanced options</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-[#d4ede4] text-[#0a2e1e] px-2 py-1 rounded-full font-medium">Quick Setup</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">Batch Processing</span>
                          </div>
                        </div>
                        <div className="text-[#0a2e1e] group-hover:translate-x-1 transition-transform">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </button>
                    </RoleBased>
                    
                    <button 
                      onClick={() => handleLicenseAudit()}
                      className="group flex items-center gap-4 p-4 rounded-none border border-slate-200 hover:border-[#0e7c66] hover: hover:from-[#0e7c66] hover:to-[#0a2e1e] transition-all text-left shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <BarChart className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#0a2e1e] group-hover:text-[#0a2e1e] transition-colors">License Audit Report</div>
                        <div className="text-sm text-slate-600 mt-1">Comprehensive analysis of license usage and optimization insights</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-[#d4ede4] text-[#0a2e1e] px-2 py-1 rounded-full font-medium">Detailed Analytics</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">Export Available</span>
                        </div>
                      </div>
                      <div className="text-[#0a2e1e] group-hover:translate-x-1 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                </div>
              </RoleBased>
            </div>
          </div>
          */}
              </div>
            )}

            {activeTab === "licenses" && (
              <div className="space-y-6">
                {/* License Overview - Same pattern as AdminLicenses page */}
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-[#0a2e1e]">
                        License Details
                      </h2>
                      <p className="text-sm text-slate-600 mt-1">
                        Manage and monitor your software licenses
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">
                      {dashboardLicenseList.length} found
                    </span>
                  </div>
                  <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
                    <table className="w-full relative">
                      <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            License Key
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            User Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Expires
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {licenseListLoading ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 py-12 text-center text-slate-500"
                            >
                              <div className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin w-5 h-5 text-[#0a2e1e]" />
                                Loading licenses...
                              </div>
                            </td>
                          </tr>
                        ) : dashboardLicenseList.length > 0 ? (
                          dashboardLicenseList
                            .slice(
                              (licenseDetailsPage - 1) * licensePageSize,
                              licenseDetailsPage * licensePageSize,
                            )
                            .map((license: any, index: number) => (
                              <tr
                                key={license.license_id || index}
                                className="hover:bg-slate-50"
                              >
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-[#0a2e1e] max-w-xs overflow-x-auto">
                                  {license.license_key || "N/A"}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                                  {license.user_email || "N/A"}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#d4ede4] text-[#0a2e1e]">
                                    {license.license_type || "N/A"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                      license.status?.toLowerCase() === "active"
                                        ? "bg-[#d4ede4] text-[#0a2e1e]"
                                        : license.status?.toLowerCase() ===
                                            "expired"
                                          ? "bg-red-100 text-red-800"
                                          : license.status?.toLowerCase() ===
                                              "revoked"
                                            ? "bg-[#d4ede4] text-[#0a2e1e]"
                                            : "bg-[#d4ede4] text-[#0a2e1e]"
                                    }`}
                                  >
                                    {license.status?.toUpperCase() === "IN_USE"
                                      ? "Inactive"
                                      : license.status || "Unknown"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                                  {license.expires_at
                                    ? new Date(
                                        license.expires_at,
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="py-8 text-center text-slate-500"
                            >
                              No license data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* License Details Pagination */}
                  {dashboardLicenseList.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-3 border-t border-slate-200 bg-slate-50">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <label className="text-xs sm:text-sm text-slate-600">
                          Rows:
                        </label>
                        <select
                          value={licensePageSize}
                          onChange={(e) => {
                            setLicensePageSize(parseInt(e.target.value, 10));
                            setLicenseDetailsPage(1);
                          }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-none text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        >
                          {pageSizeOptions.map((size: number) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
                          Showing{" "}
                          {Math.min(
                            (licenseDetailsPage - 1) * licensePageSize + 1,
                            dashboardLicenseList.length,
                          )}{" "}
                          to{" "}
                          {Math.min(
                            licenseDetailsPage * licensePageSize,
                            dashboardLicenseList.length,
                          )}{" "}
                          of {dashboardLicenseList.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm text-slate-600">
                          Page {licenseDetailsPage} of{" "}
                          {Math.ceil(
                            dashboardLicenseList.length / licensePageSize,
                          )}
                        </span>
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() =>
                              setLicenseDetailsPage((prev) =>
                                Math.max(prev - 1, 1),
                              )
                            }
                            disabled={licenseDetailsPage === 1}
                            className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sm:hidden">Prev</span>
                            <span className="hidden sm:inline">Previous</span>
                          </button>
                          <button
                            onClick={() =>
                              setLicenseDetailsPage((prev) =>
                                Math.min(
                                  prev + 1,
                                  Math.ceil(
                                    dashboardLicenseList.length /
                                      licensePageSize,
                                  ),
                                ),
                              )
                            }
                            disabled={
                              licenseDetailsPage >=
                              Math.ceil(
                                dashboardLicenseList.length / licensePageSize,
                              )
                            }
                            className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "users" &&
              (isSubusersEnabled ? (
                <div className="space-y-6">
                  {/* Users Management */}
                  <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6">
                    <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h2 className="font-semibold text-[#0a2e1e]">Users</h2>
                        <p className="text-sm text-slate-600 mt-1">
                          Manage all users
                        </p>
                      </div>
                      {/* Add User button */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handleAddUser}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-none transition-colors bg-[#0e7c66] text-white hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed text-sm px-4 py-2 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add User
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Loading State */}
                      {usersDataLoading && (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0e7c66] border-r-transparent"></div>
                            <p className="mt-4 text-sm text-slate-600">
                              Loading users data...
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Empty State - No users found */}
                      {!usersDataLoading &&
                        displaySubusersData.length === 0 && (
                          <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                              <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                              No Users Found
                            </h2>
                            <p className="text-sm text-slate-600">
                              {isCurrentUserSubuser
                                ? "You don't have any subusers associated with your account."
                                : "Click 'Manage Users' to load user data or create a new subuser."}
                            </p>
                          </div>
                        )}

                      {/* Users Table - Show for all users if data exists */}
                      {!usersDataLoading && displaySubusersData.length > 0 && (
                        <div>
                          <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
                            <table className="w-full">
                              <thead className="sticky top-0 bg-white shadow-sm z-10">
                                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                    Email
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                    Role
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden md:table-cell">
                                    Department
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                    Status
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden lg:table-cell">
                                    Group
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden sm:table-cell">
                                    Last Login
                                  </th>
                                  <th className="pb-3 font-medium whitespace-nowrap hidden xl:table-cell">
                                    License Allocation
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {displaySubusersData
                                  .slice(
                                    (usersPage - 1) * usersPageSize,
                                    usersPage * usersPageSize,
                                  )
                                  .map((subuser, index) => {
                                    return (
                                      <tr
                                        key={subuser.id || index}
                                        className="hover:bg-slate-50"
                                      >
                                        {/* Email */}
                                        <td className="py-4 font-medium text-[#0a2e1e]">
                                          {subuser.subuser_email}
                                        </td>

                                        {/* Role */}
                                        <td className="py-4">
                                          <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                              (subuser as any).role ===
                                                "admin" ||
                                              (subuser as any).defaultRole ===
                                                "admin"
                                                ? "bg-[#d4ede4] text-[#0a2e1e]"
                                                : (subuser as any).role ===
                                                      "manager" ||
                                                    (subuser as any)
                                                      .defaultRole === "manager"
                                                  ? "bg-[#d4ede4] text-[#0a2e1e]"
                                                  : "bg-slate-100 text-slate-800"
                                            }`}
                                          >
                                            {(subuser as any).role ||
                                              (subuser as any).defaultRole ||
                                              "user"}
                                          </span>
                                        </td>

                                        {/* Department */}
                                        <td className="py-4 text-slate-600 hidden md:table-cell">
                                          {(subuser as any).department || "-"}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4">
                                          {subuser.status ? (
                                            <span
                                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                subuser.status === "active"
                                                  ? "bg-[#d4ede4] text-[#0a2e1e]"
                                                  : subuser.status ===
                                                      "inactive"
                                                    ? "bg-gray-100 text-gray-800"
                                                    : subuser.status ===
                                                        "suspended"
                                                      ? "bg-red-100 text-red-800"
                                                      : "bg-[#d4ede4] text-[#0a2e1e]"
                                              }`}
                                            >
                                              {subuser.status}
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">
                                              -
                                            </span>
                                          )}
                                        </td>

                                        {/* User Group */}
                                        <td className="py-4 text-slate-600 hidden lg:table-cell">
                                          {(subuser as any).subuser_group ||
                                            "-"}
                                        </td>

                                        {/* Last Login */}
                                        <td className="py-4 text-slate-600 text-sm hidden sm:table-cell">
                                          <div className="flex flex-col">
                                            <span className="font-medium">
                                              {formatLastLogin(
                                                (subuser as any).last_login,
                                              )}
                                            </span>
                                            {(subuser as any).last_login &&
                                              (subuser as any).last_login !==
                                                "Never" &&
                                              (subuser as any).last_login !==
                                                "-" && (
                                                <span
                                                  className="text-xs text-slate-400 mt-0.5"
                                                  title={new Date(
                                                    (subuser as any).last_login,
                                                  ).toLocaleString()}
                                                >
                                                  {new Date(
                                                    (subuser as any).last_login,
                                                  ).toLocaleString("en-IN", {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                  })}
                                                </span>
                                              )}
                                          </div>
                                        </td>

                                        {/* License Allocation */}
                                        <td className="py-4 hidden xl:table-cell">
                                          {(subuser as any)
                                            .license_allocation ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#d4ede4] text-[#0a2e1e]">
                                              {
                                                (subuser as any)
                                                  .license_allocation
                                              }
                                            </span>
                                          ) : (
                                            <span className="text-slate-400">
                                              -
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                          {/* Users Pagination - always show when data exists */}
                          {displaySubusersData.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 bg-white">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <label className="text-xs sm:text-sm text-slate-600">
                                  Rows:
                                </label>
                                <select
                                  value={usersPageSize}
                                  onChange={(e) => {
                                    setUsersPageSize(
                                      parseInt(e.target.value, 10),
                                    );
                                    setUsersPage(1);
                                  }}
                                  className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-none text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                                >
                                  {pageSizeOptions.map((size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
                                  Showing{" "}
                                  {Math.min(
                                    (usersPage - 1) * usersPageSize + 1,
                                    displaySubusersData.length,
                                  )}{" "}
                                  to{" "}
                                  {Math.min(
                                    usersPage * usersPageSize,
                                    displaySubusersData.length,
                                  )}{" "}
                                  of {displaySubusersData.length}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-xs sm:text-sm text-slate-600">
                                  Page {usersPage} of{" "}
                                  {Math.ceil(
                                    displaySubusersData.length / usersPageSize,
                                  )}
                                </span>
                                <div className="flex gap-1 sm:gap-2">
                                  <button
                                    onClick={() =>
                                      setUsersPage((prev) =>
                                        Math.max(prev - 1, 1),
                                      )
                                    }
                                    disabled={usersPage === 1}
                                    className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <span className="sm:hidden">Prev</span>
                                    <span className="hidden sm:inline">
                                      Previous
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      setUsersPage((prev) =>
                                        Math.min(
                                          prev + 1,
                                          Math.ceil(
                                            displaySubusersData.length /
                                              usersPageSize,
                                          ),
                                        ),
                                      )
                                    }
                                    disabled={
                                      usersPage >=
                                      Math.ceil(
                                        displaySubusersData.length /
                                          usersPageSize,
                                      )
                                    }
                                    className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                    Feature Disabled
                  </h2>
                  <p className="text-sm text-slate-600">
                    User management is currently disabled for your account.
                  </p>
                </div>
              ))}

            {activeTab === "groups" &&
              (isGroupsEnabled ? (
                <div className="space-y-6">
                  {/* Groups Section */}
                  <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6">
                    <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h2 className="font-semibold text-[#0a2e1e]">
                          Groups & Members
                        </h2>
                        <p className="text-sm text-slate-600 mt-1">
                          View all groups and their members
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Loading State */}
                      {(groupsWithUsersQuery.isLoading && groupsWithUsers.length === 0) && (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0e7c66] border-r-transparent"></div>
                            <p className="mt-4 text-sm text-slate-600">
                              Loading groups data...
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Empty State */}
                      {!groupsWithUsersQuery.isLoading && (groupsWithUsersQuery.data?.length === 0 || groupsWithUsers.length === 0) && (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <Users className="w-8 h-8 text-slate-400" />
                          </div>
                          <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                            No Groups Found
                          </h2>
                          <p className="text-sm text-slate-600">
                            No groups are available in your organization.
                          </p>
                        </div>
                      )}

                      {/* Groups List with Expandable Users */}
                      {!groupsLoading && groupsWithUsers.length > 0 && (
                        <div className="space-y-4">
                          {groupsWithUsers.map((group: any) => (
                            <div
                              key={group.id}
                              className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6 !p-0 overflow-hidden"
                            >
                              {/* Group Header */}
                              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                  <button
                                    onClick={() => toggleGroup(group.id)}
                                    className="w-10 h-10 bg-[#0e7c66] rounded-none flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                                  >
                                    {(group.name || "G").charAt(0)}
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
                                      Created:{" "}
                                      {new Date(
                                        group.created,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                          License
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                          Profile
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                      {group.users.map((user: any) => (
                                        <tr
                                          key={user.id}
                                          className="hover:bg-slate-50 transition-colors"
                                        >
                                          <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                              <div className="w-8 h-8 bg-[#0e7c66] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                {(user.name || "U").charAt(0)}
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
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                    Feature Disabled
                  </h2>
                  <p className="text-sm text-slate-600">
                    Group management is currently disabled for your account.
                  </p>
                </div>
              ))}

            {activeTab === "activity" &&
              (isSubusersEnabled ? (
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6">
                  <div className="px-6 py-5 border-b border-slate-200">
                    <div>
                      <h2 className="font-semibold text-[#0a2e1e]">
                        Cloud Users Activity
                      </h2>
                      <p className="text-sm text-slate-600 mt-1">
                        Monitor user login and logout activity
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Use demo data when in demo mode, otherwise use API data */}
                    {(() => {
                      const activityData = isDemo
                        ? DEMO_USER_ACTIVITY
                        : dashboardQuery.activity || [];
                      if (!activityData || activityData.length === 0) {
                        return (
                          <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                              <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                              No Data Available
                            </h2>
                            <p className="text-slate-600 mb-6">
                              No user activity data available from the server.
                            </p>
                          </div>
                        );
                      }
                      return (
                        <>
                          <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
                            <table className="w-full">
                              <thead className="sticky top-0 bg-white shadow-sm z-10">
                                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                    User Email
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                    Login Time
                                  </th>
                                  <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden sm:table-cell">
                                    Logout Time
                                  </th>
                                  <th className="pb-3 font-medium whitespace-nowrap">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {activityData
                                  .slice(
                                    (userActivityPage - 1) * activityPageSize,
                                    userActivityPage * activityPageSize,
                                  )
                                  .map((activity, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-slate-50"
                                    >
                                      <td className="py-4 font-medium text-[#0a2e1e]">
                                        {activity.email}
                                      </td>
                                      <td className="py-4 text-slate-600">
                                        {activity.loginTime}
                                      </td>
                                      <td className="py-4 text-slate-600 hidden sm:table-cell">
                                        {activity.logoutTime || "-"}
                                      </td>
                                      <td className="py-4">
                                        <span
                                          className={`inline-flex items-center gap-1 ${
                                            activity.status === "active"
                                              ? "text-[#0a2e1e]"
                                              : "text-slate-500"
                                          }`}
                                        >
                                          <span
                                            className={`w-2 h-2 rounded-full ${
                                              activity.status === "active"
                                                ? "bg-[#0e7c66]"
                                                : "bg-slate-400"
                                            }`}
                                          ></span>
                                          {activity.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                          {/* User Activity Pagination - always show when data exists */}
                          {activityData.length > 0 && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 bg-white">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <label className="text-xs sm:text-sm text-slate-600">
                                  Rows:
                                </label>
                                <select
                                  value={activityPageSize}
                                  onChange={(e) => {
                                    setActivityPageSize(
                                      parseInt(e.target.value, 10),
                                    );
                                    setUserActivityPage(1);
                                  }}
                                  className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-none text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                                >
                                  {pageSizeOptions.map((size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
                                  Showing{" "}
                                  {Math.min(
                                    (userActivityPage - 1) * activityPageSize +
                                      1,
                                    activityData.length,
                                  )}{" "}
                                  to{" "}
                                  {Math.min(
                                    userActivityPage * activityPageSize,
                                    activityData.length,
                                  )}{" "}
                                  of {activityData.length}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-xs sm:text-sm text-slate-600">
                                  Page {userActivityPage} of{" "}
                                  {Math.ceil(
                                    activityData.length / activityPageSize,
                                  )}
                                </span>
                                <div className="flex gap-1 sm:gap-2">
                                  <button
                                    onClick={() =>
                                      setUserActivityPage((prev) =>
                                        Math.max(prev - 1, 1),
                                      )
                                    }
                                    disabled={userActivityPage === 1}
                                    className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <span className="sm:hidden">Prev</span>
                                    <span className="hidden sm:inline">
                                      Previous
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      setUserActivityPage((prev) =>
                                        Math.min(
                                          prev + 1,
                                          Math.ceil(
                                            activityData.length /
                                              activityPageSize,
                                          ),
                                        ),
                                      )
                                    }
                                    disabled={
                                      userActivityPage >=
                                      Math.ceil(
                                        activityData.length / activityPageSize,
                                      )
                                    }
                                    className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                    Feature Disabled
                  </h2>
                  <p className="text-sm text-slate-600">
                    UserActivity is currently disabled for your account.
                  </p>
                </div>
              ))}

            {activeTab === "reports" && (
              <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6">
                <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-[#0a2e1e]">
                      Erasure Reports
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      View and manage data erasure reports
                    </p>
                  </div>
                  <Link to="/admin/reports" className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-none transition-colors bg-[#0e7c66] text-white hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                    View All Reports
                  </Link>
                </div>

                <div className="p-6">
                  {auditReports.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                      </div>
                      <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                        No Data Available
                      </h2>
                      <p className="text-slate-600 mb-6">
                        No reports data available from the server.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto max-h-[500px] min-h-[300px] overflow-y-auto">
                        <table className="w-full">
                          <thead className="sticky top-0 bg-white shadow-sm z-10">
                            <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                              <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                Report ID
                              </th>
                              <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                Type
                              </th>
                              {/* <th className="pb-3 font-medium">Devices</th> */}
                              <th className="pb-3 pr-4 font-medium whitespace-nowrap">
                                Status
                              </th>
                              <th className="pb-3 pr-4 font-medium whitespace-nowrap hidden sm:table-cell">
                                Date
                              </th>
                              <th className="pb-3 font-medium whitespace-nowrap hidden md:table-cell">
                                Method
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {auditReports
                              .slice(
                                (reportsPage - 1) * reportsPageSize,
                                reportsPage * reportsPageSize,
                              )
                              .map((report) => (
                                <tr
                                  key={report.report_id || report.id}
                                  className="hover:bg-slate-50"
                                >
                                  <td className="py-4 font-medium text-[#0a2e1e]">
                                    #
                                    {report.report_id ||
                                      report.reportId ||
                                      report.id}
                                  </td>
                                  <td className="py-4 text-slate-600">
                                    {(() => {
                                      // Parse reportType from report_details_json (same logic as AdminReports)
                                      let reportType = "Erasure";
                                      const reportWithDetails = report as any;

                                      if (
                                        reportWithDetails.report_details_json
                                      ) {
                                        try {
                                          const reportDetails = JSON.parse(
                                            reportWithDetails.report_details_json,
                                          );
                                          reportType =
                                            reportDetails?.report_type ||
                                            reportDetails?.Erasure_Type ||
                                            (report as any).erasure_type ||
                                            "Files and Folders";
                                        } catch (e) {
                                          reportType =
                                            (report as any).reportType ||
                                            (report as any).erasure_type ||
                                            "Erasure";
                                        }
                                      } else {
                                        reportType =
                                          (report as any).reportType ||
                                          (report as any).erasure_type ||
                                          "Erasure";
                                      }

                                      return (
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#d4ede4] text-[#0a2e1e]">
                                          {reportType}
                                        </span>
                                      );
                                    })()}
                                  </td>
                                  {/* <td className="py-4 text-slate-600">
                            {(() => {
                              // Priority: API deviceCount > calculated from machines
                              if (report.deviceCount && report.deviceCount > 0) {
                                return report.deviceCount;
                              }
                              
                              // Calculate from actual machines data
                              if (displayMachinesData && displayMachinesData.length > 0) {
                                // If report has user_email, filter machines by that email
                                if (report.user_email) {
                                  const userMachines = displayMachinesData.filter(
                                    (machine: Machine) => machine.user_email === report.user_email
                                  );
                                  return userMachines.length || 0;
                                }
                                // Otherwise return total machines count
                                return machinesQuery.data.length;
                              }
                              
                              // Fallback if no data available
                              return 0;
                            })()}
                          </td> */}
                                  <td className="py-4">
                                    {(() => {
                                      // Parse status from report_details_json (same logic as AdminReports)
                                      let statusValue = "completed"; // default

                                      // Type cast to access report_details_json which may exist at runtime
                                      const reportWithDetails = report as any;

                                      if (
                                        reportWithDetails.report_details_json
                                      ) {
                                        try {
                                          const reportDetails = JSON.parse(
                                            reportWithDetails.report_details_json,
                                          );
                                          statusValue =
                                            reportDetails?.status?.toLowerCase() ||
                                            "completed";
                                        } catch (e) {
                                          // If parsing fails, use report.status directly
                                          statusValue =
                                            report.status?.toLowerCase() ||
                                            "completed";
                                        }
                                      } else if (report.status) {
                                        statusValue =
                                          report.status.toLowerCase();
                                      }

                                      return (
                                        <span
                                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                            statusValue === "completed"
                                              ? "bg-[#d4ede4] text-[#0a2e1e]"
                                              : statusValue === "running" ||
                                                  statusValue === "pending"
                                                ? "bg-[#d4ede4] text-[#0a2e1e]"
                                                : statusValue === "warning"
                                                  ? "bg-[#d4ede4] text-[#0a2e1e]"
                                                  : statusValue === "failed"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-slate-100 text-slate-800"
                                          }`}
                                        >
                                          <span
                                            className={`w-2 h-2 rounded-full ${
                                              statusValue === "completed"
                                                ? "bg-[#0e7c66]"
                                                : statusValue === "running" ||
                                                    statusValue === "pending"
                                                  ? "bg-[#0e7c66]"
                                                  : statusValue === "warning"
                                                    ? "bg-[#0e7c66]"
                                                    : statusValue === "failed"
                                                      ? "bg-red-500"
                                                      : "bg-slate-500"
                                            }`}
                                          ></span>
                                          {statusValue}
                                        </span>
                                      );
                                    })()}
                                  </td>
                                  <td className="py-4 text-slate-600 hidden sm:table-cell">
                                    {report.report_datetime ||
                                    (report as any).report_date
                                      ? new Date(
                                          report.report_datetime ||
                                            (report as any).report_date,
                                        ).toLocaleDateString("en-IN", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })
                                      : "N/A"}
                                  </td>
                                  <td className="py-4 text-slate-600 hidden md:table-cell">
                                    {report.erasure_method || "N/A"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Reports Pagination - always show when data exists */}
                      {auditReports.length > 0 && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 bg-white">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <label className="text-xs sm:text-sm text-slate-600">
                              Rows:
                            </label>
                            <select
                              value={reportsPageSize}
                              onChange={(e) => {
                                setReportsPageSize(
                                  parseInt(e.target.value, 10),
                                );
                                setReportsPage(1);
                              }}
                              className="px-2 sm:px-3 py-1 sm:py-1.5 border border-slate-300 rounded-none text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                            >
                              {pageSizeOptions.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                            <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
                              Showing{" "}
                              {Math.min(
                                (reportsPage - 1) * reportsPageSize + 1,
                                auditReports.length,
                              )}{" "}
                              to{" "}
                              {Math.min(
                                reportsPage * reportsPageSize,
                                auditReports.length,
                              )}{" "}
                              of {auditReports.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm text-slate-600">
                              Page {reportsPage} of{" "}
                              {Math.ceil(auditReports.length / reportsPageSize)}
                            </span>
                            <div className="flex gap-1 sm:gap-2">
                              <button
                                onClick={() =>
                                  setReportsPage((prev) =>
                                    Math.max(prev - 1, 1),
                                  )
                                }
                                disabled={reportsPage === 1}
                                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <span className="sm:hidden">Prev</span>
                                <span className="hidden sm:inline">
                                  Previous
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  setReportsPage((prev) =>
                                    Math.min(
                                      prev + 1,
                                      Math.ceil(
                                        auditReports.length / reportsPageSize,
                                      ),
                                    ),
                                  )
                                }
                                disabled={
                                  reportsPage >=
                                  Math.ceil(
                                    auditReports.length / reportsPageSize,
                                  )
                                }
                                className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === "performance" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0a2e1e]">
                      Performance
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Monitor system performance and erasure metrics
                    </p>
                  </div>
                </div>

                {erasureMetricsLoading && !displayErasureMetrics ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0e7c66] border-r-transparent"></div>
                      <p className="mt-4 text-sm text-slate-600">Loading performance data...</p>
                    </div>
                  </div>
                ) : erasureMetricsError || !displayErasureMetrics ? (
                  <div className="bg-white rounded-none shadow-sm border border-slate-200 p-12 text-center">
                    <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                      No Performance Metrics Available
                    </h2>
                    <p className="text-slate-600">
                      There are no performance metrics to display for this
                      account.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Top 3 Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      {/* Erasure Method Distribution (Pie Chart) */}
                      {/* Erasure Method Distribution (Pie Chart) */}
                      {/* Erasure Method Distribution (Pie Chart) */}
                      {/* ✅ NAYA CODE: Isolated PieChart component — fixes infinite re-render loop */}
                      <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6 flex flex-col min-h-[400px]">
                        <div className="mb-6">
                          <p className="text-base md:text-lg text-slate-500 mb-2 font-medium">
                            Erasure Method Breakdown
                          </p>
                          <p className="text-3xl md:text-4xl font-bold text-[#0a2e1e]">
                            {displayErasureMetrics?.methodMetrics &&
                            displayErasureMetrics.methodMetrics.length > 0
                              ? displayErasureMetrics.methodMetrics
                                  .reduce(
                                    (acc: number, curr: MethodMetric) =>
                                      acc + curr.count,
                                    0,
                                  )
                                  .toLocaleString()
                              : 0}
                          </p>
                        </div>
                        <div className="flex-1 w-full relative min-h-[300px]">
                          <ErasureMethodPieChart methodMetrics={displayErasureMetrics?.methodMetrics} />
                        </div>
                      </div>

                      {/* ========== PURANA CODE (COMMENTED OUT) — Inline PieChart that caused infinite re-render loop ==========
                      <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6 flex flex-col min-h-[400px]">
                        <div className="mb-6">
                          <p className="text-base md:text-lg text-slate-500 mb-2 font-medium">
                            Erasure Method Breakdown
                          </p>
                          <p className="text-3xl md:text-4xl font-bold text-[#0a2e1e]">
                            {displayErasureMetrics?.methodMetrics &&
                            displayErasureMetrics.methodMetrics.length > 0
                              ? displayErasureMetrics.methodMetrics
                                  .reduce(
                                    (acc: number, curr: MethodMetric) =>
                                      acc + curr.count,
                                    0,
                                  )
                                  .toLocaleString()
                              : 0}
                          </p>
                        </div>
                        <div className="flex-1 w-full relative min-h-[300px]">
                          {displayErasureMetrics?.methodMetrics &&
                          displayErasureMetrics.methodMetrics.length > 0 ? (
                            <div style={{ width: '100%', height: '300px', minHeight: '300px', display: 'flex', justifyContent: 'center' }}>
                              <PieChart width={350} height={300}>
                                <Pie
                                  data={(displayErasureMetrics.methodMetrics as any) || []}
                                  cx="50%" cy="50%" innerRadius="60%" outerRadius="80%"
                                  paddingAngle={5} dataKey="count" nameKey="methodName"
                                  isAnimationActive={false}
                                >
                                  {displayErasureMetrics.methodMetrics.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={2} stroke="#0e7c66" />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value: any, name: any) => {
                                  const total = displayErasureMetrics.methodMetrics?.reduce((acc: any, curr: any) => acc + curr.count, 0) || 1;
                                  const percent = ((value / total) * 100).toFixed(1);
                                  return [`${value} (${percent}%)`, name];
                                }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={10} />
                              </PieChart>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic text-sm">
                              No erasure data found
                            </div>
                          )}
                        </div>
                      </div>
                      ========== PURANA CODE END ========== */}

                      {/* Erasure Method Distribution List View */}
                      {/* <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6 flex flex-col">
                        <div className="mb-4">
                          <p className="text-sm text-slate-500 mb-1">
                            Erasure Method Distribution
                          </p>
                          {displayErasureMetrics.methodMetrics &&
                            displayErasureMetrics.methodMetrics.length > 0 && (
                              <p className="text-2xl font-bold text-[#0a2e1e]">
                                {displayErasureMetrics.methodMetrics.reduce(
                                  (acc: number, curr: MethodMetric) =>
                                    acc + curr.count,
                                  0,
                                )}
                              </p>
                            )}
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-48 pr-2 space-y-3 custom-scrollbar">
                          {displayErasureMetrics.methodMetrics &&
                          displayErasureMetrics.methodMetrics.length > 0 ? (
                            displayErasureMetrics.methodMetrics.map(
                              (metric: MethodMetric, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex flex-col text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span
                                      className="font-medium text-slate-700 truncate max-w-[150px]"
                                      title={metric.methodName}
                                    >
                                      {metric.methodName}
                                    </span>
                                    <span className="font-bold text-[#0a2e1e]">
                                      {metric.count}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                                    <span>Avg: {metric.avgDuration}</span>
                                    <span className="text-[#0a2e1e] font-medium">
                                      {metric.successRate}% Success
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                                    <div
                                      className="bg-[#0e7c66] h-1.5 rounded-full"
                                      style={{
                                        width: `${metric.successRate}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              ),
                            )
                          ) : displayErasureMetrics.erasureLog &&
                            displayErasureMetrics.erasureLog.length > 0 ? (
                            // Fallback to erasureLog if methodMetrics not available (backend backward compatibility)
                            displayErasureMetrics.erasureLog
                              .slice(0, 5)
                              .map((log: ErasureLogEntry, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0"
                                >
                                  <div className="flex flex-col">
                                    <span
                                      className="font-medium text-slate-700 truncate max-w-[120px]"
                                      title={log.user_email}
                                    >
                                      {log.user_email.split("@")[0]}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {new Date(
                                        log.timestamp,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        log.method.includes("DoD")
                                          ? "bg-[#d4ede4] text-[#0a2e1e]"
                                          : log.method.includes("NIST")
                                            ? "bg-[#d4ede4] text-[#0a2e1e]"
                                            : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {log.method}
                                    </span>
                                  </div>
                                </div>
                              ))
                          ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                              No erasure data found
                            </div>
                          )}
                        </div>
                      </div> */}

                      {/* Success Rate */}
                      {/* <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6">
                        <div className="mb-4">
                          <p className="text-sm text-slate-500 mb-1">
                            Success rate
                          </p>
                          <p className="text-3xl font-bold text-[#0a2e1e]">
                            {displayErasureMetrics.successRate}%
                          </p>
                        </div>
                        <div className="h-24">
                          <svg viewBox="0 0 300 80" className="w-full h-full">
                            <defs>
                              <linearGradient
                                id="areaGradient3"
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#F59E0B"
                                  stopOpacity="0.3"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#F59E0B"
                                  stopOpacity="0.05"
                                />
                              </linearGradient>
                            </defs>
                           
                            <path
                              d={`M 0 80 L 0 ${80 - (displayErasureMetrics.successRate / 100) * 60} L 300 ${80 - (displayErasureMetrics.successRate / 100) * 60} L 300 80 Z`}
                              fill="url(#areaGradient3)"
                            />
                            <path
                              d={`M 0 ${80 - (displayErasureMetrics.successRate / 100) * 60} L 300 ${80 - (displayErasureMetrics.successRate / 100) * 60}`}
                              stroke="#0e7c66"
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div> */}
                    </div>

                    {/* Detailed Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                      {/* <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-[#0a2e1e] mb-6">
                          Monthly Erasure Trends
                        </h2>
                        <div className="h-64">
                          <svg viewBox="0 0 800 200" className="w-full h-full">
                            {displayErasureMetrics.monthlyMetrics.map(
                              (item: any, index: number, arr: any[]) => {
                                const maxCount = Math.max(
                                  ...arr.map((i: any) => i.erasureCount),
                                  1,
                                );
                                const barWidth = 800 / arr.length - 10;
                                const x = (index * 800) / arr.length + 5;
                                const barHeight =
                                  (item.erasureCount / maxCount) * 160;
                                const y = 160 - barHeight;

                                return (
                                  <g key={index}>
                                    
                                    <rect
                                      x={x}
                                      y={y}
                                      width={barWidth}
                                      height={barHeight}
                                      fill="#0e7c66"
                                      rx="4"
                                    />
                                    
                                    <text
                                      x={x + barWidth / 2}
                                      y="185"
                                      textAnchor="middle"
                                      fill="#0e7c66"
                                      fontSize="12"
                                    >
                                      {item.month}
                                    </text>
                                  
                                    <text
                                      x={x + barWidth / 2}
                                      y={y - 5}
                                      textAnchor="middle"
                                      fill="#0e7c66"
                                      fontSize="10"
                                      fontWeight="bold"
                                    >
                                      {item.erasureCount}
                                    </text>
                                  </g>
                                );
                              },
                            )}
                          </svg>
                        </div>
                      </div> */}

                      {/* Erasure By Method (Placeholder) */}
                      {/* <div className="bg-white rounded-none shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-[#0a2e1e] mb-6">
                      Erasure Methods
                    </h2>
                     <div className="flex items-center justify-center h-64 text-slate-500">
                        Method breakdown not available
                     </div>
                  </div> */}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Bulk License Assignment Modal */}
            {showBulkLicenseModal && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setShowBulkLicenseModal(false)}
              >
                <div
                  className="bg-white rounded-none shadow-xl max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-[#d4ede4] rounded-full">
                        <Users className="w-6 h-6 text-[#0a2e1e]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[#0a2e1e]">
                          Bulk License Assignment
                        </h2>
                        <p className="text-sm text-slate-600">
                          Assign licenses to multiple users at once
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Number of Users
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={bulkUserCount}
                          onChange={(e) => setBulkUserCount(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-[#0e7c66]"
                          placeholder="Enter number of users"
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Licenses per User
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={bulkLicenseCount}
                          onChange={(e) => setBulkLicenseCount(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:ring-2 focus:ring-blue-500 focus:border-[#0e7c66]"
                          placeholder="Enter licenses per user"
                          disabled={isLoading}
                        />
                      </div>

                      {bulkUserCount &&
                        bulkLicenseCount &&
                        !isNaN(Number(bulkUserCount)) &&
                        !isNaN(Number(bulkLicenseCount)) && (
                          <div className="bg-[#d4ede4] p-3 rounded-none">
                            <div className="text-sm text-slate-600">
                              <div className="flex justify-between">
                                <span>Total Users:</span>
                                <span className="font-medium">
                                  {Number(bulkUserCount).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Licenses per User:</span>
                                <span className="font-medium">
                                  {Number(bulkLicenseCount).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-[#0a2e1e] font-medium mt-1 pt-1 border-t">
                                <span>Total Licenses:</span>
                                <span>
                                  {(
                                    Number(bulkUserCount) *
                                    Number(bulkLicenseCount)
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        onClick={() => {
                          setShowBulkLicenseModal(false);
                          setBulkUserCount("10");
                          setBulkLicenseCount("5");
                        }}
                        className="px-4 py-2 text-slate-700 border border-slate-300 rounded-none hover:bg-slate-50 transition-colors"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleBulkLicenseSubmit}
                        disabled={
                          isLoading ||
                          !bulkUserCount ||
                          !bulkLicenseCount ||
                          isNaN(Number(bulkUserCount)) ||
                          isNaN(Number(bulkLicenseCount))
                        }
                        className="px-4 py-2 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        {isLoading && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        {isLoading ? "Assigning..." : "Assign Licenses"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* License Audit Modal */}
            {showLicenseAuditModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setShowLicenseAuditModal(false)}
              >
                <div
                  className="bg-white rounded-none shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-none">
                          <BarChart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-[#0a2e1e]">
                            License Audit Report
                          </h2>
                          <p className="text-sm text-slate-600">
                            Comprehensive overview of license usage and
                            analytics
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowLicenseAuditModal(false)}
                        className="text-slate-400 hover:text-slate-600 p-2 rounded-none hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Check if license data is available */}
                    {userLicenseDetails.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                          <Server className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-lg font-medium text-[#0a2e1e] mb-2">
                          No License Data Available
                        </h2>
                        <p className="text-slate-600">
                          License audit data is not available from the server.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Summary Cards - Dynamic Data */}
                        {(() => {
                          const totalLicenses = userLicenseDetails.reduce(
                            (sum, lic) => sum + lic.total,
                            0,
                          );
                          const consumedLicenses = userLicenseDetails.reduce(
                            (sum, lic) => sum + lic.consumed,
                            0,
                          );
                          const availableLicenses = userLicenseDetails.reduce(
                            (sum, lic) => sum + lic.available,
                            0,
                          );
                          const utilizationPercent =
                            totalLicenses > 0
                              ? (
                                  (consumedLicenses / totalLicenses) *
                                  100
                                ).toFixed(1)
                              : 0;

                          return (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#0e7c66] rounded-none flex items-center justify-center">
                                      <Server className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-[#0a2e1e]">
                                        Total Licenses
                                      </div>
                                      <div className="text-2xl font-bold text-[#0a2e1e]">
                                        {totalLicenses.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-6 rounded-none border border-[#d4ede4]">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#0e7c66] rounded-none flex items-center justify-center">
                                      <Check className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-[#0a2e1e]">
                                        Active/Used Licenses
                                      </div>
                                      <div className="text-2xl font-bold text-[#0a2e1e]">
                                        {consumedLicenses.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#0e7c66] rounded-none flex items-center justify-center">
                                      <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-[#0a2e1e]">
                                        Available
                                      </div>
                                      <div className="text-2xl font-bold text-[#0a2e1e]">
                                        {availableLicenses.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white p-6 rounded-none border border-[#d0d5dc]">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#0e7c66] rounded-none flex items-center justify-center">
                                      <BarChart className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-[#0a2e1e]">
                                        Utilization
                                      </div>
                                      <div className="text-2xl font-bold text-[#0a2e1e]">
                                        {utilizationPercent}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Utilization Chart - Dynamic Data */}
                              <div className="bg-white p-6 rounded-none border border-slate-200 mb-8">
                                <h3 className="text-lg font-semibold text-[#0a2e1e] mb-4">
                                  License Utilization Overview
                                </h3>
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">
                                      Overall Utilization
                                    </span>
                                    <span className="text-lg font-bold text-[#0a2e1e]">
                                      {utilizationPercent}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-200 rounded-full h-3">
                                    <div
                                      className="bg-white h-3 rounded-full"
                                      style={{
                                        width: `${Math.min(Number(utilizationPercent), 100)}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="text-center">
                                      <div className="font-medium text-[#0a2e1e]">
                                        Utilized
                                      </div>
                                      <div className="text-[#0a2e1e] font-semibold">
                                        {consumedLicenses.toLocaleString()} (
                                        {utilizationPercent}%)
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium text-[#0a2e1e]">
                                        Available
                                      </div>
                                      <div className="text-[#0a2e1e] font-semibold">
                                        {availableLicenses.toLocaleString()} (
                                        {totalLicenses > 0
                                          ? (
                                              100 - Number(utilizationPercent)
                                            ).toFixed(1)
                                          : 0}
                                        %)
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <div className="font-medium text-[#0a2e1e]">
                                        Products
                                      </div>
                                      <div className="text-[#0a2e1e] font-semibold">
                                        {userLicenseDetails.length}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })()}

                        {/* License Breakdown Table - Dynamic Data */}
                        <div className="bg-white border border-slate-200 rounded-none overflow-hidden">
                          <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-[#0a2e1e]">
                              License Breakdown by Product
                            </h3>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="text-left p-4 font-semibold text-slate-700">
                                    Product
                                  </th>
                                  <th className="text-left p-4 font-semibold text-slate-700">
                                    Total
                                  </th>
                                  <th className="text-left p-4 font-semibold text-slate-700">
                                    Used
                                  </th>
                                  <th className="text-left p-4 font-semibold text-slate-700">
                                    Available
                                  </th>
                                  <th className="text-left p-4 font-semibold text-slate-700">
                                    Utilization
                                  </th>
                                  <th className="text-left p-4 font-semibold text-slate-700">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {userLicenseDetails.map((license, index) => {
                                  const usagePercent =
                                    license.total > 0
                                      ? (license.consumed / license.total) * 100
                                      : 0;
                                  const statusColor =
                                    usagePercent > 80
                                      ? "red"
                                      : usagePercent > 60
                                        ? "orange"
                                        : "blue";
                                  const statusText =
                                    usagePercent > 80
                                      ? "High Usage"
                                      : usagePercent > 60
                                        ? "Moderate"
                                        : "Low Usage";
                                  const progressColor =
                                    usagePercent > 80
                                      ? "bg-red-500"
                                      : usagePercent > 60
                                        ? "bg-[#0e7c66]"
                                        : "bg-[#0e7c66]";

                                  return (
                                    <tr
                                      key={index}
                                      className="border-t border-slate-200"
                                    >
                                      <td className="p-4 font-medium text-[#0a2e1e]">
                                        {license.product}
                                      </td>
                                      <td className="p-4 text-slate-600">
                                        {license.total.toLocaleString()}
                                      </td>
                                      <td className="p-4 text-slate-600">
                                        {license.consumed.toLocaleString()}
                                      </td>
                                      <td className="p-4 text-slate-600">
                                        {license.available.toLocaleString()}
                                      </td>
                                      <td className="p-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-16 bg-slate-200 rounded-full h-2">
                                            <div
                                              className={`${progressColor} h-2 rounded-full`}
                                              style={{
                                                width: `${Math.min(usagePercent, 100)}%`,
                                              }}
                                            ></div>
                                          </div>
                                          <span
                                            className={`text-sm font-medium text-${statusColor}-600`}
                                          >
                                            {usagePercent.toFixed(0)}%
                                          </span>
                                        </div>
                                      </td>
                                      <td className="p-4">
                                        <span
                                          className={`bg-${statusColor}-100 text-${statusColor}-700 px-2 py-1 rounded-full text-xs font-medium`}
                                        >
                                          {statusText}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <button
                        onClick={() => {
                          showInfo(
                            "Report Exported",
                            "Detailed license audit report has been sent to your email",
                          );
                          setShowLicenseAuditModal(false);
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0e7c66] text-white rounded-none hover:bg-[#0e7c66] transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Export Detailed Report
                      </button>
                      <button
                        onClick={() =>
                          showInfo(
                            "Optimization Report",
                            "License optimization suggestions have been generated and will be sent to your email",
                          )
                        }
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50 transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Get Optimization Report
                      </button>
                      <button
                        onClick={() => setShowLicenseAuditModal(false)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-none hover:bg-slate-200 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Modal - Matching the attached design */}
            {showProfileModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
                <div className="bg-white rounded-none shadow-2xl max-w-sm w-full mx-4 transform transition-all relative">
                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setIsEditingProfile(false);
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-white hover:bg-[#0e7c66]/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Modal Header with Theme Gradient Background */}
                  <div className="bg-[#0e7c66] px-6 py-6 rounded-none text-white">
                    <h2 className="text-xl font-bold mb-0">
                      {isEditingProfile ? "Edit Profile" : "Profile"}
                    </h2>
                  </div>

                  {/* Profile Content */}
                  <div className="p-6">
                    {/* Profile Avatar - Dynamic with First Letter */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-[#0e7c66] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-bold text-white uppercase">
                          {(profileData?.name || user?.name || "U").charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Profile Information - View or Edit Mode */}
                    {!isEditingProfile ? (
                      <>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Name:
                            </span>
                            <span className="text-[#0a2e1e]">
                              {storedUserData?.name ||
                                storedUserData?.user_name ||
                                storedUserData?.subuser_name ||
                                profileData?.name ||
                                user?.name ||
                                getNameFromEmail(
                                  profileData?.email ||
                                    storedUserData?.user_email ||
                                    user?.email ||
                                    "user@example.com",
                                )}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Email:
                            </span>
                            <span className="text-[#0a2e1e] text-right">
                              {profileData?.email ||
                                storedUserData?.user_email ||
                                user?.email ||
                                "user@example.com"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Phone:
                            </span>
                            <span className="text-[#0a2e1e]">
                              {profileData?.phone ||
                                storedUserData?.phone_number ||
                                "Not provided"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Role:
                            </span>
                            <span className="text-[#0a2e1e] font-semibold capitalize">
                              {currentUserRole}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Department:
                            </span>
                            <span className="text-[#0a2e1e]">
                              {profileData?.department ||
                                storedUserData?.department ||
                                "N/A"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              User Group:
                            </span>
                            <span className="text-[#0a2e1e]">
                              {storedUserData?.user_group ||
                                storedUserData?.department ||
                                "N/A"}
                            </span>
                          </div>

                          {/* Conditional field for Subuser - Parent User Email */}
                          {storedUserData?.user_type === "subuser" &&
                            storedUserData?.parent_user_email && (
                              <div className="flex justify-between bg-[#d4ede4] -mx-2 px-2 py-2 rounded-none border border-[#d0d5dc]">
                                <span className="font-medium text-[#0a2e1e]">
                                  Parent User Email:
                                </span>
                                <span className="text-[#0a2e1e] font-semibold text-right break-all">
                                  {storedUserData.parent_user_email}
                                </span>
                              </div>
                            )}

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Time Zone:
                            </span>
                            <span className="text-[#0a2e1e]">
                              {profileData?.timezone ||
                                storedUserData?.timezone ||
                                "Asia/Kolkata"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-slate-700">
                              Login Time:
                            </span>
                            <span className="text-[#0a2e1e] text-right text-xs">
                              {(() => {
                                const userTimezone =
                                  profileData?.timezone ||
                                  storedUserData?.timezone ||
                                  "Asia/Kolkata";
                                const loginTime = new Date();
                                return loginTime.toLocaleString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  timeZone: userTimezone,
                                  timeZoneName: "short",
                                });
                              })()}
                            </span>
                          </div>

                          {/* <div className="flex justify-between">
                        <span className="font-medium text-slate-700">
                          Private Cloud:
                        </span>
                        <span className={`font-semibold ${profileData?.is_private_cloud || storedUserData?.is_private_cloud ? 'text-[#0a2e1e]' : 'text-slate-500'}`}>
                          {profileData?.is_private_cloud || storedUserData?.is_private_cloud ? 'Enabled' : 'Disabled'}
                        </span>
                      </div> */}
                        </div>

                        {/* Edit Button */}
                        <div className="mt-6 text-center">
                          <button
                            onClick={() => {
                              setIsEditingProfile(true);
                              setProfileEditForm({
                                user_name:
                                  profileData?.name || user?.name || "",
                                phone_number:
                                  profileData?.phone ||
                                  storedUserData?.phone_number ||
                                  "",
                                timezone:
                                  profileData?.timezone ||
                                  storedUserData?.timezone ||
                                  "Asia/Kolkata",
                              });
                            }}
                            className="bg-brand hover:bg-brand-700 text-white px-6 py-2 rounded-none text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Edit Form */}
                        <form
                          className="space-y-4"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            // ✅ DEMO MODE GUARD: Prevent profile update in demo mode
                            if (isDemo) {
                              showInfo("Demo Mode", "Profile updates are disabled in demo mode");
                              setIsEditingProfile(false);
                              return;
                            }
                            setProfileUpdateLoading(true);

                            try {
                              const userEmail =
                                profileData?.email || user?.email;
                              if (!userEmail) {
                                showError(
                                  "Update Failed",
                                  "User email not found",
                                );
                                return;
                              }

                              devLog("🔄 Updating profile for:", userEmail);
                              devLog("📝 Update data:", profileEditForm);

                              // Call APIs to update user profile
                              // 1. Update name and phone via DynamicUser/profile
                              const profileResponse =
                                await apiClient.updateUserProfile({
                                  name: profileEditForm.user_name,
                                  phone: profileEditForm.phone_number,
                                  timezone: profileEditForm.timezone,
                                });

                              devLog(
                                "📡 Profile API Response:",
                                profileResponse,
                              );

                              // 2. Update timezone via RoleBasedAuth/update-timezone
                              const timezoneResponse =
                                await apiClient.updateTimezone(
                                  userEmail,
                                  profileEditForm.timezone,
                                );

                              devLog(
                                "📡 Timezone API Response:",
                                timezoneResponse,
                              );

                              if (
                                profileResponse.success &&
                                timezoneResponse.success
                              ) {
                                devLog(
                                  "✅ Profile and timezone updated successfully in database",
                                );

                                // Update local state with response data from server (handle both User and Subuser fields)
                                setProfileData((prev) => ({
                                  ...prev!,
                                  name:
                                    profileResponse.data?.user_name ||
                                    profileResponse.data?.subuser_name ||
                                    profileResponse.data?.name ||
                                    profileEditForm.user_name,
                                  phone:
                                    profileResponse.data?.phone_number ||
                                    profileResponse.data?.phone ||
                                    profileResponse.data?.subuser_phone ||
                                    profileEditForm.phone_number,
                                  timezone:
                                    timezoneResponse.data?.timezone ||
                                    profileEditForm.timezone,
                                }));

                                // Update localStorage with server response
                                const storedData = getUserDataFromStorage();
                                if (storedData) {
                                  storedData.user_name =
                                    profileResponse.data?.user_name ||
                                    profileResponse.data?.subuser_name ||
                                    profileEditForm.user_name;
                                  ((storedData.phone_number =
                                    profileResponse.data?.phone_number ||
                                    profileResponse.data?.phone ||
                                    profileResponse.data?.subuser_phone ||
                                    profileEditForm.phone_number),
                                    (storedData.timezone =
                                      timezoneResponse.data?.timezone ||
                                      profileEditForm.timezone));
                                  localStorage.setItem(
                                    "userData",
                                    JSON.stringify(storedData),
                                  );
                                  devLog(
                                    "💾 LocalStorage updated with server data",
                                  );
                                }

                                showSuccess(
                                  "Profile Updated",
                                  "Your profile and timezone have been updated successfully",
                                );
                                setIsEditingProfile(false);
                              } else {
                                const errorMsg =
                                  profileResponse.error ||
                                  timezoneResponse.error ||
                                  "Failed to update profile";
                                devError("❌ API Error:", errorMsg);
                                showError("Update Failed", errorMsg);
                              }
                            } catch (error) {
                              devError("❌ Profile update error:", error);
                              showError(
                                "Update Failed",
                                "An error occurred while updating profile",
                              );
                            } finally {
                              setProfileUpdateLoading(false);
                            }
                          }}
                        >
                          {/* Editable: Name */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={profileEditForm.user_name}
                              onChange={(e) =>
                                setProfileEditForm((prev) => ({
                                  ...prev,
                                  user_name: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                              placeholder="Enter your name"
                              required
                            />
                          </div>

                          {/* Editable: Phone Number */}
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={profileEditForm.phone_number}
                              onChange={(e) =>
                                setProfileEditForm((prev) => ({
                                  ...prev,
                                  phone_number: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                              placeholder="Enter phone number"
                            />
                          </div>

                          {/* Editable: Timezone */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium text-slate-700">
                                Time Zone
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  // Auto-detect timezone from browser
                                  const detectedTimezone =
                                    Intl.DateTimeFormat().resolvedOptions()
                                      .timeZone;
                                  setProfileEditForm((prev) => ({
                                    ...prev,
                                    timezone: detectedTimezone,
                                  }));
                                  showInfo(
                                    "Timezone Detected",
                                    `Automatically detected: ${detectedTimezone}`,
                                  );
                                }}
                                className="text-xs text-brand hover:text-brand-700 font-medium flex items-center gap-1"
                              >
                                <MapPin className="w-3 h-3" />
                                Auto-Detect
                              </button>
                            </div>
                            <select
                              value={profileEditForm.timezone}
                              onChange={(e) =>
                                setProfileEditForm((prev) => ({
                                  ...prev,
                                  timezone: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                            >
                              <option value="Asia/Kolkata">
                                Asia/Kolkata (IST)
                              </option>
                              <option value="America/New_York">
                                America/New York (EST)
                              </option>
                              <option value="America/Los_Angeles">
                                America/Los Angeles (PST)
                              </option>
                              <option value="America/Chicago">
                                America/Chicago (CST)
                              </option>
                              <option value="Europe/London">
                                Europe/London (GMT)
                              </option>
                              <option value="Europe/Paris">
                                Europe/Paris (CET)
                              </option>
                              <option value="Europe/Berlin">
                                Europe/Berlin (CET)
                              </option>
                              <option value="Asia/Tokyo">
                                Asia/Tokyo (JST)
                              </option>
                              <option value="Asia/Shanghai">
                                Asia/Shanghai (CST)
                              </option>
                              <option value="Asia/Dubai">
                                Asia/Dubai (GST)
                              </option>
                              <option value="Asia/Singapore">
                                Asia/Singapore (SGT)
                              </option>
                              <option value="Australia/Sydney">
                                Australia/Sydney (AEDT)
                              </option>
                              <option value="Pacific/Auckland">
                                Pacific/Auckland (NZDT)
                              </option>
                              <option value="UTC">UTC</option>
                            </select>
                            <p className="text-xs text-slate-500 mt-1">
                              Current time:{" "}
                              {new Date().toLocaleString("en-IN", {
                                timeZone: profileEditForm.timezone,
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZoneName: "short",
                              })}
                            </p>
                          </div>

                          {/* Read-Only: Email */}
                          {/* <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email 
                      </label>
                      <input
                        type="email"
                        value={profileData?.email || user?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-none bg-slate-50 text-slate-500 cursor-not-allowed"
                      />
                    </div> */}

                          {/* Read-Only: Role */}
                          {/* <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Role 
                      </label>
                      <input
                        type="text"
                        value={profileData?.role || user?.role || 'user'}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-none bg-slate-50 text-slate-500 cursor-not-allowed capitalize"
                      />
                    </div> */}

                          {/* Action Buttons */}
                          <div className="flex gap-3 mt-6">
                            <button
                              type="button"
                              onClick={() => setIsEditingProfile(false)}
                              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-none hover:bg-slate-50 transition-colors"
                              disabled={profileUpdateLoading}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={profileUpdateLoading}
                              className="flex-1 bg-brand hover:bg-brand-700 text-white px-4 py-2 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              {profileUpdateLoading ? (
                                <>
                                  <Loader2 className="animate-spin h-4 w-4" />
                                  Saving...
                                </>
                              ) : (
                                "Save Changes"
                              )}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Modal - Billing & Password */}
            {showSettingsModal && (
              <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
                <div className="bg-white rounded-none shadow-2xl max-w-2xl w-full my-8">
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-[#0a2e1e]">
                        Settings
                      </h2>
                      <p className="text-sm text-slate-600 mt-1">
                        Manage your billing and security settings
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowSettingsModal(false);
                        setSettingsTab(isSuperAdmin ? "billing" : "password");
                        setChangePasswordForm({
                          currentPassword: "",
                          newPassword: "",
                        });
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-slate-200">
                    <div className="flex">
                      {isSuperAdmin && (
                        <button
                          onClick={() => setSettingsTab("billing")}
                          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                            settingsTab === "billing"
                              ? "text-brand border-b-2 border-brand bg-brand/5"
                              : "text-slate-600 hover:text-[#0a2e1e] hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Billing Usage
                          </div>
                        </button>
                      )}
                      <button
                        onClick={() => setSettingsTab("password")}
                        className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                          settingsTab === "password"
                            ? "text-brand border-b-2 border-brand bg-brand/5"
                            : "text-slate-600 hover:text-[#0a2e1e] hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Lock className="w-5 h-5" />
                          Change Password
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="px-6 py-6">
                    {settingsTab === "billing" ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-[#0a2e1e]">
                            Billing Usage
                          </h3>
                          {/* <button
                            type="button"
                            onClick={() => {
                              // Get current user data for prefilling checkout
                              const userData = storedUserData || user;
                              const firstName =
                                userData?.user_name?.split(" ")[0] ||
                                userData?.name?.split(" ")[0] ||
                                "";
                              const lastName =
                                userData?.user_name
                                  ?.split(" ")
                                  .slice(1)
                                  .join(" ") ||
                                userData?.name?.split(" ").slice(1).join(" ") ||
                                "";
                              const email =
                                userData?.user_email || userData?.email || "";
                              const phone =
                                userData?.phone_number || userData?.phone || "";
                              const company =
                                userData?.company ||
                                userData?.organization ||
                                userData?.department ||
                                "";

                              // Get plan type and license count from billing details
                              const planType =
                                billingDetails?.planType ||
                                billingDetails?.activePlanTypes ||
                                billingDetails?.plan_type ||
                                "Standard";
                              const totalLicenses =
                                billingDetails?.totalLicenses ||
                                billingDetails?.total_licenses ||
                                billingDetails?.purchase_details
                                  ?.total_licenses ||
                                "1";

                              // Get price/amount from billing details
                              const amount =
                                billingDetails?.amount ||
                                billingDetails?.price ||
                                billingDetails?.unitPrice ||
                                "99";
                              const validityYears =
                                billingDetails?.validityYears ||
                                billingDetails?.validity_years ||
                                "1";
                              const expiryDate =
                                billingDetails?.expiryDate ||
                                billingDetails?.expiry_date ||
                                "";

                              // Build query params with user data and plan info
                              const params = new URLSearchParams({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                phone: phone,
                                company: company,
                                planType: String(planType),
                                licenses: String(totalLicenses),
                                price:
                                  String(amount).replace(/[^0-9.]/g, "") ||
                                  "99",
                                validityYears: String(validityYears),
                                expiryDate: String(expiryDate),
                                renew: "true",
                              });

                              // Navigate to checkout with prefilled data
                              window.location.href = `/checkout?${params.toString()}`;
                            }}
                            className="px-4 py-2  from-brand to-brand/80 text-white rounded-none hover:from-brand/90 hover:to-brand/70 transition-all duration-200 flex items-center gap-2 shadow-sm"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Renew License
                          </button> */}
                        </div>

                        {(() => {
                          devLog(
                            "🔍 DEBUG RENDER: billingDetails:",
                            billingDetails,
                          );
                          devLog(
                            "🔍 DEBUG RENDER: billingDetails is truthy?",
                            !!billingDetails,
                          );
                          devLog(
                            "🔍 DEBUG RENDER: billingDetails type:",
                            typeof billingDetails,
                          );
                          devLog(
                            "🔍 DEBUG RENDER: Object.keys(billingDetails):",
                            billingDetails
                              ? Object.keys(billingDetails)
                              : "null",
                          );
                          return null;
                        })()}

                        {billingDetails &&
                        Object.keys(billingDetails).length > 0 ? (
                          <div className="space-y-4">
                            {/* Accordion 1: Active License Plan */}
                            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-none border border-brand/20 overflow-hidden">
                              <button
                                onClick={() =>
                                  setBillingAccordion((prev) => ({
                                    ...prev,
                                    activePlan: !prev.activePlan,
                                  }))
                                }
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-brand/5 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-brand/20 rounded-none flex items-center justify-center">
                                    <BadgeCheck className="w-5 h-5 text-brand" />
                                  </div>
                                  <div className="text-left">
                                    <h4 className="text-lg font-semibold text-[#0a2e1e]">
                                      Active License Plan
                                    </h4>
                                    <p className="text-sm text-slate-600">
                                      Your current subscription details
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown className="w-5 h-5" />
                              </button>

                              <div
                                className={`transition-all duration-300 ease-in-out ${
                                  billingAccordion.activePlan
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                              >
                                <div className="px-6 pb-6">
                                  {(() => {
                                    devLog(
                                      "🔍 DEBUG ACCORDION 1: billingDetails.activePlanTypes:",
                                      billingDetails.activePlanTypes,
                                    );
                                    devLog(
                                      "🔍 DEBUG ACCORDION 1: billingDetails.totalPurchases:",
                                      billingDetails.totalPurchases,
                                    );
                                    return null;
                                  })()}
                                  <div className="grid grid-cols-2 gap-4">
                                    {/* PURANA CODE
                                      <div className="bg-white/60 backdrop-blur-sm rounded-none p-4">
                                        <p className="text-xs text-slate-600 mb-1">
                                          Plan Type
                                        </p>
                                        <p className="text-lg font-bold text-brand">
                                          {billingDetails.activePlanTypes ||
                                            billingDetails.planType ||
                                            billingDetails.plan_type ||
                                            "N/A"}
                                        </p>
                                      </div>
                                      <div className="bg-white/60 backdrop-blur-sm rounded-none p-4">
                                      {/* NAYA CODE */}
                                      <div className="bg-slate-50 rounded-none p-4 flex flex-col h-full border border-slate-100">
                                        <p className="text-xs text-slate-500 mb-1 shrink-0">
                                          Plan Type
                                        </p>
                                        <div className="overflow-y-auto custom-scrollbar max-h-24 pr-2 flex-1">
                                          <p className="text-sm font-bold text-[#0e7c66] leading-relaxed break-words">
                                            {dashboardLicenseList.length > 0
                                              ? Array.from(
                                                  new Set(
                                                    dashboardLicenseList.map(
                                                      (l) => l.license_type || l.edition || l.type || "D-Secure File Eraser"
                                                    )
                                                  )
                                                ).join(", ")
                                              : "D-Secure File Eraser"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="bg-slate-50 rounded-none p-4 flex flex-col h-full border border-slate-100">
                                        <p className="text-xs text-slate-500 mb-1 shrink-0">
                                          Total Licenses
                                        </p>
                                        <p className="text-xl font-bold text-[#0a2e1e] mt-auto">
                                          {billingDetails?.totalLicenses ||
                                            billingDetails?.total_licenses ||
                                            0}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            {/* Accordion 2: License Usage Stats */}
                            {/* <div className="bg-white rounded-none border border-slate-200 overflow-hidden">
                        <button
                          onClick={() => setBillingAccordion(prev => ({ ...prev, licenseUsage: !prev.licenseUsage }))}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#d4ede4] rounded-none flex items-center justify-center">
                              <BarChart className="w-5 h-5 text-[#0a2e1e]" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-base font-semibold text-[#0a2e1e]">License Usage</h4>
                              <p className="text-sm text-slate-600">Track your license consumption</p>
                            </div>
                          </div>
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        
                        <div className={`transition-all duration-300 ease-in-out ${billingAccordion.licenseUsage ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                          <div className="px-6 pb-6 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Total Licenses</span>
                              <span className="text-lg font-bold text-[#0a2e1e]">{billingDetails.totalLicenses || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Consumed</span>
                              <span className="text-lg font-bold text-[#0a2e1e]">{billingDetails.consumedLicenses || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Available</span>
                              <span className="text-lg font-bold text-[#0a2e1e]">{billingDetails.availableLicenses || 0}</span>
                            </div>
                            
                            
                            <div className="pt-2">
                              <div className="flex justify-between text-xs text-slate-600 mb-2">
                                <span>Usage</span>
                                <span>
                                  {billingDetails.totalLicenses > 0 
                                    ? Math.round((billingDetails.consumedLicenses / billingDetails.totalLicenses) * 100)
                                    : 0}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full transition-all duration-300 ${
                                    (billingDetails.consumedLicenses / billingDetails.totalLicenses) > 0.8 
                                      ? 'bg-red-500' 
                                      : (billingDetails.consumedLicenses / billingDetails.totalLicenses) > 0.6
                                        ? 'bg-[#0e7c66]'
                                        : 'bg-[#0e7c66]'
                                  }`}
                                  style={{ 
                                    width: `${billingDetails.totalLicenses > 0 
                                      ? Math.min((billingDetails.consumedLicenses / billingDetails.totalLicenses) * 100, 100)
                                      : 0}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}

                            {/* Accordion 3: Plan Details */}
                            <div className="bg-slate-50 rounded-none border border-slate-200 overflow-hidden">
                              <button
                                onClick={() =>
                                  setBillingAccordion((prev) => ({
                                    ...prev,
                                    planInfo: !prev.planInfo,
                                  }))
                                }
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-[#d4ede4] rounded-none flex items-center justify-center">
                                    <Info className="w-5 h-5 text-[#0a2e1e]" />
                                  </div>
                                  <div className="text-left">
                                    <h4 className="text-base font-semibold text-[#0a2e1e]">
                                      Plan Information
                                    </h4>
                                    <p className="text-sm text-slate-600">
                                      Detailed plan and billing info
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown className="w-5 h-5" />
                              </button>

                              <div
                                className={`transition-all duration-300 ease-in-out ${
                                  billingAccordion.planInfo
                                    ? "max-h-[600px] opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                              >
                                <div className="px-6 pb-6 space-y-4">
                                  {/* Display parsed billing details - Filter sensitive data */}
                                  
                                  {/* NEW STATIC FEATURES DISPLAY */}
                                  {(() => {
                                    let expiryRaw: any = "N/A";
                                    
                                    if (dashboardLicenseList?.length > 0 && (dashboardLicenseList[0]?.expires_at || dashboardLicenseList[0]?.expiryDate || dashboardLicenseList[0]?.expirationDate || dashboardLicenseList[0]?.expiration_date || dashboardLicenseList[0]?.valid_till)) {
                                      expiryRaw = dashboardLicenseList[0]?.expires_at || dashboardLicenseList[0]?.expiryDate || dashboardLicenseList[0]?.expirationDate || dashboardLicenseList[0]?.expiration_date || dashboardLicenseList[0]?.valid_till;
                                    } else if (userLicenseDetails?.length > 0 && ((userLicenseDetails[0] as any)?.expires_at || (userLicenseDetails[0] as any)?.expiryDate || (userLicenseDetails[0] as any)?.expiry_date || (userLicenseDetails[0] as any)?.expirationDate || (userLicenseDetails[0] as any)?.valid_till)) {
                                      expiryRaw = (userLicenseDetails[0] as any)?.expires_at || (userLicenseDetails[0] as any)?.expiryDate || (userLicenseDetails[0] as any)?.expiry_date || (userLicenseDetails[0] as any)?.expirationDate || (userLicenseDetails[0] as any)?.valid_till;
                                    } else if (billingDetails?.expiryDate || billingDetails?.expiry_date || billingDetails?.expires_at || billingDetails?.expirationDate || billingDetails?.valid_till) {
                                      expiryRaw = billingDetails?.expiryDate || billingDetails?.expiry_date || billingDetails?.expires_at || billingDetails?.expirationDate || billingDetails?.valid_till;
                                    }

                                    if (!expiryRaw || expiryRaw === "undefined" || expiryRaw === "null") {
                                      expiryRaw = "N/A";
                                    }

                                    let displayExpiry = String(expiryRaw);
                                    let isExpired = false;
                                    
                                    if (typeof expiryRaw === "string" && !isNaN(Date.parse(expiryRaw)) && expiryRaw !== "N/A") {
                                      try { 
                                        const expiryDateObj = new Date(expiryRaw);
                                        displayExpiry = expiryDateObj.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); 
                                        isExpired = expiryDateObj < new Date();
                                      } catch {}
                                    }

                                    const planStatus = isExpired ? "Expired" : (billingDetails?.status || (dashboardLicenseList?.length > 0 ? dashboardLicenseList[0]?.status : "Active"));
                                    const statusDisplay = String(planStatus);

                                    const InfoRow = ({ label, value, isStatus = false }: { label: string, value: string, isStatus?: boolean }) => {
                                      const icon = label === "Expiry Date" ? (
                                        <Calendar className="w-5 h-5 text-brand" />
                                      ) : (
                                        <Info className="w-5 h-5 text-brand" />
                                      );

                                      let valueClass = "text-[#0a2e1e]";
                                      if (isStatus) {
                                        valueClass = value.toLowerCase() === "active" ? "text-[#0a2e1e]" : "text-red-600";
                                      } else if (value === "Enabled") {
                                        valueClass = "text-[#0a2e1e]";
                                      } else if (value === "Disabled") {
                                        valueClass = "text-slate-500";
                                      }

                                      return (
                                        <div className="py-3 border-b border-slate-200 last:border-0">
                                          <div className="flex items-center gap-3">
                                            {icon}
                                            <div className="flex-1 flex justify-between items-center">
                                              <span className="text-sm font-medium text-slate-700 capitalize">{label}</span>
                                              <span className={`text-sm font-semibold capitalize ${valueClass}`}>
                                                {value}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    };

                                    return (
                                      <>
                                        <InfoRow label="Status" value={statusDisplay} isStatus={true} />
                                        {/* <InfoRow label="Expiry Date" value={displayExpiry} /> */}
                                        <InfoRow label="Subusers" value={profileData?.is_subusers_enabled ? "Enabled" : "Disabled"} />
                                        <InfoRow label="Groups" value={profileData?.is_groups_enabled ? "Enabled" : "Disabled"} />
                                        <InfoRow label="Private Cloud" value={profileData?.is_private_cloud ? "Enabled" : "Disabled"} />
                                      </>
                                    );
                                  })()}

                                  {/* PREVIOUS NAYA CODE */}
                                  {false && Object.entries(billingDetails).map(([key, value]) => {
                                    const allowedFields = ["status", "expirydate", "expiry_date", "expires_at", "expiredate", "valid_till"];
                                    if (!allowedFields.includes(key.toLowerCase())) return null;

                                    let displayLabel = key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim();
                                    if (key.toLowerCase() === "status") displayLabel = "Status";
                                    else if (key.toLowerCase().includes("expir")) displayLabel = "Expiry Date";

                                    const icon = key.toLowerCase().includes("expir") || key.toLowerCase().includes("date") ? (
                                      <Calendar className="w-5 h-5 text-brand" />
                                    ) : (
                                      <Info className="w-5 h-5 text-brand" />
                                    );

                                    let displayValue = String(value);
                                    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
                                      try { displayValue = new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); } catch {}
                                    }

                                    return (
                                      <div key={key} className="py-3 border-b border-slate-200 last:border-0">
                                        <div className="flex items-center gap-3">
                                          {icon}
                                          <div className="flex-1 flex justify-between items-center">
                                            <span className="text-sm font-medium text-slate-700 capitalize">{displayLabel}</span>
                                            <span className={`text-sm font-semibold capitalize ${key.toLowerCase() === "status" ? (displayValue.toLowerCase() === "active" ? "text-[#0a2e1e]" : "text-red-600") : "text-[#0a2e1e]"}`}>
                                              {displayValue}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {/* PURANA CODE */}
                                  {false && Object.entries(billingDetails).map(
                                    ([key, value]) => {
                                      // Skip fields already shown in cards above and raw JSON fields
                                      const skipFields = [
                                        "activePlanTypes",
                                        "totalPurchases",
                                        "totalLicenses",
                                        "consumedLicenses",
                                        "availableLicenses",
                                        // Hide raw JSON array/object fields
                                        "plans",
                                        "summary",
                                        "activeBindings",
                                        "useremail",
                                        "machines",
                                        "bindings",
                                        // Duplicate/internal fields
                                        "activePlanIds",
                                        "usedLicenses",
                                        // Payment/gateway internal fields
                                        "paymentGate",
                                        "paymentGateway",
                                        "payment_gate",
                                        "payment_gateway",
                                        "gatewayId",
                                        "gateway_id",
                                        "transactionId",
                                        "transaction_id",
                                        "orderId",
                                        "order_id",
                                        // Internal IDs and timestamps
                                        "purchaseId",
                                        "purchase_id",
                                        "invoiceId",
                                        "invoice_id",
                                        "unbindCount",
                                        "licenseTransferAllowed",
                                        "planNotes",
                                        "plan_notes",
                                        // Additional payment/internal fields
                                        "paymentVerified",
                                        "payment_verified",
                                        "paymentId",
                                        "payment_id",
                                        "currency",
                                        // Nested objects to hide
                                        "purchaseDetails",
                                        "purchase_details",
                                        // Additional internal/timestamp fields
                                        "transactionDate",
                                        "transaction_date",
                                        "transactionStatus",
                                        "transaction_status",
                                        "updatedAt",
                                        "updated_at",
                                        "userEmail",
                                        "user_email",
                                        // ✅ NAYA CODE: hide license allocations
                                        // "licenseAllocations",
                                        // "license_allocations",
                                        // "allocations"
                                      ];

                                      if (skipFields.includes(key)) {
                                        return null;
                                      }

                                      // List of sensitive fields to hide
                                      const sensitiveFields = [
                                        "card_number",
                                        "cardNumber",
                                        "card",
                                        "cardnumber",
                                        "cvv",
                                        "cvc",
                                        "securityCode",
                                        "security_code",
                                        "card_cvv",
                                        "card_cvc",
                                        "pin",
                                        "password",
                                        "secret",
                                        "account_number",
                                        "accountNumber",
                                        "routing_number",
                                        "routingNumber",
                                        "ssn",
                                        "social_security",
                                      ];

                                      // Check if field is sensitive (case-insensitive)
                                      const isSensitive = sensitiveFields.some(
                                        (field) =>
                                          key
                                            .toLowerCase()
                                            .includes(field.toLowerCase()),
                                      );

                                      // Skip sensitive fields
                                      if (isSensitive) {
                                        return null;
                                      }

                                      if (
                                        Object.keys(billingDetails).includes(
                                          "{}",
                                        )
                                      )
                                        return "No billing details available";

                                      // Special handling for address objects
                                      if (
                                        typeof value === "object" &&
                                        value !== null
                                      ) {
                                        // ✅ Skip arrays entirely (like activeBindings, machines, etc.)
                                        if (Array.isArray(value)) {
                                          return null;
                                        }
                                        // Check if it's an address object
                                        const isAddress = [
                                          "street",
                                          "city",
                                          "state",
                                          "country",
                                          "zipCode",
                                          "zip",
                                          "postal",
                                        ].some((field) =>
                                          Object.keys(value).some((k) =>
                                            k.toLowerCase().includes(field),
                                          ),
                                        );

                                        if (isAddress) {
                                          const addr = value as any;
                                          const addressLine = [
                                            addr.street || addr.address || "",
                                            addr.city || "",
                                            addr.state || "",
                                            addr.country || "",
                                            addr.zipCode ||
                                              addr.zip ||
                                              addr.postalCode ||
                                              "",
                                          ]
                                            .filter(Boolean)
                                            .join(", ");

                                          return (
                                            <div
                                              key={key}
                                              className="py-3 border-b border-slate-200 last:border-0"
                                            >
                                              <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                                                <div className="flex-1">
                                                  <span className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                                                    {key.replace(/_/g, " ")}
                                                  </span>
                                                  <span className="text-sm text-[#0a2e1e] leading-relaxed">
                                                    {addressLine}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }

                                        // For other objects, show prettified JSON
                                        return (
                                          <div
                                            key={key}
                                            className="py-3 border-b border-slate-200 last:border-0"
                                          >
                                            <span className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                                              {key.replace(/_/g, " ")}
                                            </span>
                                            <pre className="text-xs text-[#0a2e1e] bg-white p-2 rounded border border-slate-200 overflow-auto">
                                              {JSON.stringify(value, null, 2)}
                                            </pre>
                                          </div>
                                        );
                                      }

                                      // Regular field display with icon
                                      let icon = null;
                                      let displayLabel = key
                                        .replace(/_/g, " ")
                                        .replace(/([A-Z])/g, " $1")
                                        .trim();

                                      // Customize display labels for specific fields
                                      const labelMap: {
                                        [key: string]: string;
                                      } = {
                                        activePlanIds: "Plan ID",
                                        purchaseDate: "Purchase Date",
                                        expiryDate: "Expiry Date",
                                        validityYears: "Validity Period",
                                        userEmail: "Account Email",
                                      };

                                      if (labelMap[key]) {
                                        displayLabel = labelMap[key];
                                      }

                                      // Select appropriate icon
                                      if (key.toLowerCase().includes("email")) {
                                        icon = (
                                          <Mail className="w-5 h-5 text-brand" />
                                        );
                                      } else if (
                                        key.toLowerCase().includes("date")
                                      ) {
                                        icon = (
                                          <Calendar className="w-5 h-5 text-brand" />
                                        );
                                      } else if (
                                        key
                                          .toLowerCase()
                                          .includes("validity") ||
                                        key.toLowerCase().includes("years")
                                      ) {
                                        icon = (
                                          <Clock className="w-5 h-5 text-brand" />
                                        );
                                      } else if (
                                        key.toLowerCase().includes("plan") ||
                                        key.toLowerCase().includes("id")
                                      ) {
                                        icon = (
                                          <Tag className="w-5 h-5 text-brand" />
                                        );
                                      } else {
                                        icon = (
                                          <Info className="w-5 h-5 text-brand" />
                                        );
                                      }

                                      // Format display value
                                      let displayValue = String(value);

                                      // Detect and format ISO date strings (e.g., 2024-12-01T10:05:00Z)
                                      const isoDateRegex =
                                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
                                      if (
                                        typeof value === "string" &&
                                        isoDateRegex.test(value)
                                      ) {
                                        try {
                                          displayValue = new Date(
                                            value,
                                          ).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          });
                                        } catch {
                                          // Keep original value if parsing fails
                                        }
                                      }

                                      if (key === "validityYears") {
                                        displayValue = `${value} ${
                                          parseInt(String(value)) === 1
                                            ? "Year"
                                            : "Years"
                                        }`;
                                      }

                                      return (
                                        <div
                                          key={key}
                                          className="py-3 border-b border-slate-200 last:border-0"
                                        >
                                          <div className="flex items-center gap-3">
                                            {icon}
                                            <div className="flex-1 flex justify-between items-center">
                                              <span className="text-sm font-medium text-slate-700">
                                                {displayLabel}
                                              </span>
                                              <span className="text-sm text-[#0a2e1e] font-semibold">
                                                {displayValue}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-none border border-slate-200">
                            <CreditCard className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                            <p className="text-base font-medium">
                              No billing details available
                            </p>
                            <p className="text-sm mt-1">
                              Your billing information will appear here once you
                              subscribe
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#0a2e1e] mb-4">
                          Change Password
                        </h3>

                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();

                            // ✅ DEMO MODE GUARD: Prevent password change in demo mode
                            if (isDemo) {
                              showInfo("Demo Mode", "Password change is disabled in demo mode");
                              setShowSettingsModal(false);
                              return;
                            }

                            // if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
                            //   showError('Password Mismatch', 'New password and confirm password do not match')
                            //   return
                            // }

                            if (changePasswordForm.newPassword.length < 6) {
                              showError(
                                "Weak Password",
                                "Password must be at least 6 characters long",
                              );
                              return;
                            }

                            setPasswordChangeLoading(true);

                            try {
                              const userEmail =
                                profileData?.email || user?.email;
                              if (!userEmail) {
                                showError("Error", "User email not found");
                                return;
                              }

                              const response = await apiClient.changePassword(
                                changePasswordForm.currentPassword,
                                changePasswordForm.newPassword,
                              );

                              if (response.success) {
                                showSuccess(
                                  "Password Changed",
                                  "Your password has been updated successfully",
                                );
                                setChangePasswordForm({
                                  currentPassword: "",
                                  newPassword: "",
                                });
                                setShowSettingsModal(false);
                              } else {
                                showError(
                                  "Change Failed",
                                  response.error || "Failed to change password",
                                );
                              }
                            } catch (error) {
                              devError("Password change error:", error);
                              showError(
                                "Error",
                                "An error occurred while changing password",
                              );
                            } finally {
                              setPasswordChangeLoading(false);
                            }
                          }}
                        >
                          <div className="space-y-4">
                            {/* Current Password */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Current Password{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="password"
                                value={changePasswordForm.currentPassword}
                                onChange={(e) =>
                                  setChangePasswordForm((prev) => ({
                                    ...prev,
                                    currentPassword: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
                                placeholder="Enter current password"
                                required
                              />
                            </div>

                            {/* New Password */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                New Password{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="password"
                                value={changePasswordForm.newPassword}
                                onChange={(e) =>
                                  setChangePasswordForm((prev) => ({
                                    ...prev,
                                    newPassword: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
                                placeholder="Enter new password (min 6 characters)"
                                required
                                minLength={6}
                              />
                            </div>

                            {/* Confirm Password */}
                            {/* <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={changePasswordForm.confirmPassword}
                          onChange={(e) => setChangePasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
                          placeholder="Confirm new password"
                          required
                        />
                      </div> */}

                            {/* Submit Buttons */}
                            <div className="flex gap-3 pt-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowSettingsModal(false);
                                  setChangePasswordForm({
                                    currentPassword: "",
                                    newPassword: "",
                                  });
                                }}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-none transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={passwordChangeLoading}
                                className="flex-1 bg-brand hover:bg-brand-700 text-white px-4 py-2 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                              >
                                {passwordChangeLoading ? (
                                  <>
                                    <Loader2 className="animate-spin h-4 w-4" />
                                    Changing...
                                  </>
                                ) : (
                                  "Change Password"
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Add User Modal */}
            {showAddUserModal && (
              <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4">
                <div className="bg-white rounded-none shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                  {/* <div className="px-6 py-5 border-b border-slate-200"> */}
                  {/* <h2 className="text-xl font-semibold text-[#0a2e1e]">Add New User</h2> */}
                  {/* <p className="text-sm text-slate-600 mt-1">Create a new user account</p> */}
                  {/* </div> */}
                  <div className="px-6 py-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="userName"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="userName"
                          value={newUserForm.name}
                          onChange={(e) =>
                            setNewUserForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="licenseAllocation"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          License Allocation *
                        </label>
                        <input
                          type="number"
                          id="licenseAllocation"
                          value={newUserForm.license_allocation}
                          onChange={(e) =>
                            setNewUserForm((prev) => ({
                              ...prev,
                              license_allocation: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          placeholder="Enter license allocation"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="userEmail"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="userEmail"
                        value={newUserForm.email}
                        onChange={(e) =>
                          setNewUserForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="">
                        <label
                          htmlFor="userDepartment"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Department
                        </label>
                        <input
                          type="text"
                          id="userDepartment"
                          value={newUserForm.department}
                          onChange={(e) =>
                            setNewUserForm((prev) => ({
                              ...prev,
                              department: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          placeholder="Enter department"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="userRole"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          id="userRole"
                          value={newUserForm.role}
                          onChange={(e) =>
                            setNewUserForm((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          placeholder="Enter role (e.g., user, admin, manager)"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="userPassword"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Password *
                      </label>
                      <input
                        type="password"
                        id="userPassword"
                        value={newUserForm.password}
                        onChange={(e) =>
                          setNewUserForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="userPhone"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="userPhone"
                          value={newUserForm.phone}
                          onChange={(e) =>
                            setNewUserForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="userGroup"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Group
                        </label>
                        <input
                          type="text"
                          id="userGroup"
                          value={newUserForm.group}
                          onChange={(e) =>
                            setNewUserForm((prev) => ({
                              ...prev,
                              group: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          placeholder="Enter group"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                    <button
                      onClick={() => {
                        setShowAddUserModal(false);
                        setNewUserForm({
                          name: "",
                          email: "",
                          role: "user",
                          password: "",
                          phone: "",
                          department: "",
                          group: "",
                          license_allocation: "0",
                        });
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddUserSubmit}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Creating..." : "Create User"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add Group Modal */}
            {showAddGroupModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-none shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="px-6 py-5 border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-[#0a2e1e]">
                      Add New Group
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Create a new user group
                    </p>
                  </div>
                  <div className="px-6 py-5 space-y-4">
                    <div>
                      <label
                        htmlFor="groupName"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Group Name *
                      </label>
                      <input
                        type="text"
                        id="groupName"
                        value={newGroupForm.name}
                        onChange={(e) =>
                          setNewGroupForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="groupDescription"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Description *
                      </label>
                      <textarea
                        id="groupDescription"
                        rows={3}
                        value={newGroupForm.description}
                        onChange={(e) =>
                          setNewGroupForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter group description"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="groupLicenses"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Initial License Count
                      </label>
                      <input
                        type="number"
                        id="groupLicenses"
                        min="0"
                        value={newGroupForm.licenses}
                        onChange={(e) =>
                          setNewGroupForm((prev) => ({
                            ...prev,
                            licenses: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                    <button
                      onClick={() => {
                        setShowAddGroupModal(false);
                        setNewGroupForm({
                          name: "",
                          description: "",
                          licenses: 0,
                        });
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddGroupSubmit}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Creating..." : "Create Group"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Assign Licenses Modal */}
            {showAssignLicensesModal && selectedGroupForLicenses && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-none shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="px-6 py-5 border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-[#0a2e1e]">
                      Assign Licenses
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Assign licenses to group:{" "}
                      <span className="font-medium">
                        {selectedGroupForLicenses.name}
                      </span>
                    </p>
                  </div>
                  <div className="px-6 py-5 space-y-4">
                    <div>
                      <label
                        htmlFor="licenseCount"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Number of Licenses *
                      </label>
                      <input
                        type="number"
                        id="licenseCount"
                        min="1"
                        value={assignLicensesForm.licenseCount}
                        onChange={(e) =>
                          setAssignLicensesForm((prev) => ({
                            ...prev,
                            licenseCount: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter license count"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="licenseType"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        License Type
                      </label>
                      <select
                        id="licenseType"
                        value={assignLicensesForm.licenseType}
                        onChange={(e) =>
                          setAssignLicensesForm((prev) => ({
                            ...prev,
                            licenseType: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      >
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Expiry Date *
                      </label>
                      <input
                        type="date"
                        id="expiryDate"
                        value={assignLicensesForm.expiryDate}
                        onChange={(e) =>
                          setAssignLicensesForm((prev) => ({
                            ...prev,
                            expiryDate: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                      />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                    <button
                      onClick={() => {
                        setShowAssignLicensesModal(false);
                        setSelectedGroupForLicenses(null);
                        setAssignLicensesForm({
                          licenseCount: 10,
                          expiryDate: "",
                          licenseType: "basic",
                        });
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssignLicensesSubmit}
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Assigning..." : "Assign Licenses"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings Modal */}
            {showSystemSettingsModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-none shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="px-6 py-5 border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-[#0a2e1e]">
                      System Settings
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Configure system-wide settings and preferences
                    </p>
                  </div>
                  <div className="px-6 py-5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="systemName"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          System Name
                        </label>
                        <input
                          type="text"
                          id="systemName"
                          defaultValue="D-Secure Admin System"
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="adminEmail"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Admin Email
                        </label>
                        <input
                          type="email"
                          id="adminEmail"
                          defaultValue="admin@dsecuretech.com"
                          className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        />
                      </div>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <h3 className="font-medium text-[#0a2e1e] mb-3">
                        Security Settings
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-slate-700">
                              Two-Factor Authentication
                            </span>
                            <p className="text-xs text-slate-500">
                              Require 2FA for all admin users
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-slate-700">
                              Auto-logout
                            </span>
                            <p className="text-xs text-slate-500">
                              Automatic logout after inactivity
                            </p>
                          </div>
                          <select className="text-sm border border-slate-300 rounded px-2 py-1">
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                            <option>Never</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <h3 className="font-medium text-[#0a2e1e] mb-3">
                        License Settings
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Default License Duration (days)
                          </label>
                          <input
                            type="number"
                            defaultValue="365"
                            className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Max Licenses Per User
                          </label>
                          <input
                            type="number"
                            defaultValue="5"
                            className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
                    <button
                      onClick={() => setShowSystemSettingsModal(false)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-none hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        showSuccess(
                          "Settings Saved",
                          "System settings have been updated successfully",
                        );
                        setShowSystemSettingsModal(false);
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* My Downloads Tab */}
            {activeTab === "mydownloads" && (
              <div className="space-y-6">
                <div className="bg-white rounded-none border border-[#d0d5dc] shadow-sm overflow-hidden p-6">
                  <div className="px-6 py-5 border-b border-slate-200">
                    <h2 className="font-semibold text-[#0a2e1e]">
                      Software Downloads
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Download D-Secure software installers for your platform
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {/* File Eraser */}
                      <div className="group bg-white rounded-none p-6 border border-[#d4ede4] hover:border-[#d4ede4] hover:shadow-lg transition-all duration-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center">
                            <File className="w-6 h-6 text-[#0a2e1e]" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-[#0a2e1e]">
                              File Eraser
                            </h2>
                            <p className="text-xs text-slate-600">
                              Version {dseVersion}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-4">
                          Securely erase files and folders with military-grade
                          algorithms
                        </p>
                        <Link
                          to="/download?product=file-eraser"
                          onClick={(e) => {
                            if (isDemo) {
                              e.preventDefault();
                              showInfo("Demo Restricted", "Software downloads are not available in demo accounts. Please create a real account.");
                            }
                          }}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download Now
                        </Link>
                      </div>

                      {/* Drive Eraser */}
                      <div className="group bg-white rounded-none p-6 border border-[#d0d5dc] hover:border-[#d0d5dc] hover:shadow-lg transition-all duration-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center">
                            <HardDrive className="w-6 h-6 text-[#0a2e1e]" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-[#0a2e1e]">
                              Drive Eraser
                            </h2>
                            <p className="text-xs text-slate-600">
                              Version 2.0.1
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-4">
                          Complete drive sanitization for HDDs and SSDs
                        </p>
                        <Link
                          to="/download?product=drive-eraser"
                          onClick={(e) => {
                            if (isDemo) {
                              e.preventDefault();
                              showInfo("Demo Restricted", "Software downloads are not available in demo accounts. Please create a real account.");
                            }
                          }}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download Now
                        </Link>
                      </div>

                      {/* Network Eraser - HIDDEN */}
                      {/* <div className="group bg-white rounded-none p-6 border border-[#d0d5dc] hover:border-[#d0d5dc] hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#d4ede4] rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-[#0a2e1e]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-[#0a2e1e]">Network Eraser</h2>
                        <p className="text-xs text-slate-600">Version 2.0.1</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mb-4">
                      Enterprise network-wide data sanitization solution
                    </p>
                    <Link
                      to="/download?product=drive-eraser"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download Now
                    </Link>
                  </div> */}
                    </div>

                    {/* System Requirements - HIDDEN */}
                    {/* <div className="mt-8 bg-slate-50 rounded-none p-6 border border-slate-200">
                  <h3 className="text-sm font-semibold text-[#0a2e1e] mb-3">System Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
                    <div>
                      <p className="font-medium text-[#0a2e1e] mb-1">Windows</p>
                      <ul className="text-xs space-y-1">
                        <li>• Windows 10/11 (64-bit)</li>
                        <li>• 4GB RAM minimum</li>
                        <li>• 500MB free disk space</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-[#0a2e1e] mb-1">macOS</p>
                      <ul className="text-xs space-y-1">
                        <li>• macOS 10.15 or later</li>
                        <li>• 4GB RAM minimum</li>
                        <li>• 500MB free disk space</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-[#0a2e1e] mb-1">Linux</p>
                      <ul className="text-xs space-y-1">
                        <li>• Ubuntu 20.04+ / CentOS 8+</li>
                        <li>• 4GB RAM minimum</li>
                        <li>• 500MB free disk space</li>
                      </ul>
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>
              </div>
            )}

            {/* Private Cloud Setup Modal */}
            {showPrivateCloudModal && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowPrivateCloudModal(false)}
              >
                <div
                  className="bg-white rounded-none shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-slate-200 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-none">
                        <Cloud className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Private Cloud Setup
                        </h2>
                        <p className="text-sm text-[#d4ede4] mt-1">
                          Configure your private cloud database connection
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="px-6 py-5 space-y-6">
                    {/* Connection String */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Connection String{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={privateCloudForm.connectionString}
                        onChange={(e) =>
                          setPrivateCloudForm({
                            ...privateCloudForm,
                            connectionString: e.target.value,
                          })
                        }
                        placeholder="Server=myserver;Database=mydb;User Id=myuser;Password=mypass;"
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-[#0e7c66] font-mono text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Enter your database connection string
                      </p>
                    </div>

                    {/* Select Tables */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Select Tables to Sync{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="border border-slate-300 rounded-none p-4 bg-slate-50 max-h-64 overflow-y-auto">
                        <div className="space-y-2">
                          {availableTables.map((table) => (
                            <label
                              key={table}
                              className="flex items-center gap-3 p-2 hover:bg-white rounded-none cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={privateCloudForm.selectedTables.includes(
                                  table,
                                )}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setPrivateCloudForm({
                                      ...privateCloudForm,
                                      selectedTables: [
                                        ...privateCloudForm.selectedTables,
                                        table,
                                      ],
                                    });
                                  } else {
                                    setPrivateCloudForm({
                                      ...privateCloudForm,
                                      selectedTables:
                                        privateCloudForm.selectedTables.filter(
                                          (t) => t !== table,
                                        ),
                                    });
                                  }
                                }}
                                className="w-4 h-4 text-[#0a2e1e] border-slate-300 rounded focus:ring-purple-500"
                              />
                              <div className="flex items-center gap-2 flex-1">
                                <Folder className="w-4 h-4 text-slate-500" />
                                <span className="text-sm font-medium text-slate-700">
                                  {table}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {privateCloudForm.selectedTables.length} table(s)
                        selected
                      </p>
                    </div>

                    {/* Migrate Data Switch */}
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex items-center justify-between p-4 bg-[#d4ede4] rounded-none">
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                            <ArrowDownToLine className="w-5 h-5 text-[#0a2e1e]" />
                            Migrate Data
                          </label>
                          <p className="text-xs text-slate-600 mt-1 ml-7">
                            Transfer existing data to private cloud
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privateCloudForm.migrateData}
                            onChange={(e) =>
                              setPrivateCloudForm({
                                ...privateCloudForm,
                                migrateData: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0e7c66]"></div>
                        </label>
                      </div>
                    </div>

                    {/* Migrate Tables Switch */}
                    <div>
                      <div className="flex items-center justify-between p-4 bg-[#d4ede4] rounded-none">
                        <div className="flex-1">
                          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                            <ArrowRightLeft className="w-5 h-5 text-[#0a2e1e]" />
                            Migrate Tables
                          </label>
                          <p className="text-xs text-slate-600 mt-1 ml-7">
                            Sync table structure to private cloud
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privateCloudForm.migrateTables}
                            onChange={(e) =>
                              setPrivateCloudForm({
                                ...privateCloudForm,
                                migrateTables: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0e7c66]"></div>
                        </label>
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-[#d4ede4] border border-[#d0d5dc] rounded-none p-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#0a2e1e] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-[#0a2e1e] mb-1">
                            Important Note
                          </h3>
                          <ul className="text-xs text-[#0a2e1e] space-y-1">
                            <li>
                              • Ensure your connection string is correct before
                              proceeding
                            </li>
                            <li>
                              • Data migration may take time depending on data
                              volume
                            </li>
                            <li>• Backup your data before migration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-3">
                    <button
                      onClick={() => {
                        setShowPrivateCloudModal(false);
                        setPrivateCloudForm({
                          connectionString: "",
                          selectedTables: [],
                          migrateData: false,
                          migrateTables: false,
                        });
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-none transition-colors"
                      disabled={privateCloudLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        if (!privateCloudForm.connectionString.trim()) {
                          showError(
                            "Validation Error",
                            "Please enter a connection string",
                          );
                          return;
                        }
                        if (privateCloudForm.selectedTables.length === 0) {
                          showError(
                            "Validation Error",
                            "Please select at least one table",
                          );
                          return;
                        }

                        setPrivateCloudLoading(true);
                        try {
                          // TODO: API call to setup private cloud
                          // await apiClient.setupPrivateCloud(privateCloudForm);

                          await new Promise((resolve) =>
                            setTimeout(resolve, 2000),
                          ); // Simulate API call

                          showSuccess(
                            "Private Cloud Setup",
                            `Successfully configured private cloud with ${privateCloudForm.selectedTables.length} table(s)`,
                          );
                          setShowPrivateCloudModal(false);
                          setPrivateCloudForm({
                            connectionString: "",
                            selectedTables: [],
                            migrateData: false,
                            migrateTables: false,
                          });
                        } catch (error) {
                          devError("Private cloud setup error:", error);
                          showError(
                            "Setup Failed",
                            "Failed to configure private cloud. Please try again.",
                          );
                        } finally {
                          setPrivateCloudLoading(false);
                        }
                      }}
                      disabled={privateCloudLoading}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#0e7c66] hover:from-[#0e7c66] hover:to-[#0a2e1e] rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {privateCloudLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin h-4 w-4" />
                          Setting Up...
                        </span>
                      ) : (
                        "Setup Private Cloud"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* ********** END !dataLoading guard ********** */}
          </>
        )}
      </div>
    </>
  );
}
