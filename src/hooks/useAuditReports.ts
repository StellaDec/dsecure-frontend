import { useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, type AuditReport } from '@/utils/enhancedApiClient'
import { ExtendedAdminReport } from '@/types/models'

import { indexedDBService } from '@/services/indexedDBService'
import { isDemoMode, DEMO_AUDIT_REPORTS } from '@/data/demoData'

/**
 * Query keys for audit reports caching
 */
export const auditReportKeys = {
  all: ['auditReports'] as const,
  lists: () => [...auditReportKeys.all, 'list'] as const,
  list: (email?: string) => [...auditReportKeys.lists(), email] as const,
  allReports: () => [...auditReportKeys.all, 'all-reports'] as const,
}

/**
 * Fetch audit reports by user email
 * Automatically cached and shared across components
 * 
 * @param userEmail - Email of user to fetch audit reports for
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query result with audit reports data
 */
export function useAuditReports(userEmail?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: auditReportKeys.list(userEmail),
    queryFn: async () => {
      if (!userEmail) {
        throw new Error("User email is required");
      }

      // Return demo data if in demo mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO audit reports data");
        return DEMO_AUDIT_REPORTS;
      }

      // 1. Try IDB first
      // ********** PURANA CODE (wrong store 'recent_reports' with userEmail key) **********
      // const cached = await indexedDBService.get('recent_reports', userEmail);
      // *******************************************
      // ********** NAYA CODE — Read from correct 'audit_reports' store **********
      try {
        const cached = await indexedDBService.get("audit_reports", userEmail);
        if (cached && Array.isArray(cached) && cached.length > 0) {
          console.log(
            `✅ Loaded audit reports for ${userEmail} from IndexedDB`,
          );
          return cached;
        }
      } catch (e) {
        console.warn("IDB Read Failed: audit_reports", e);
      }
      // *******************************************

      // PURANA CODE: getAuditReportsByEmail fail hota tha
      // NAYA CODE: getFilteredAuditReports use karo (proven working)
      let reports: AuditReport[] = [];

      try {
        const response = await apiClient.getFilteredAuditReports({ userEmail });
        if (response.success && response.data) {
          const resData = response.data as any;
          if (resData.reports && Array.isArray(resData.reports)) {
            reports = resData.reports;
          } else if (Array.isArray(response.data)) {
            reports = response.data as AuditReport[];
          }
        }
      } catch (e) {
        console.warn('⚠️ getFilteredAuditReports failed, trying fallback:', e);
      }

      // Fallback: purana endpoint
      if (reports.length === 0) {
        try {
          const fallbackRes = await apiClient.getAuditReportsByEmail(userEmail);
          if (fallbackRes.success && fallbackRes.data) {
            reports = Array.isArray(fallbackRes.data) ? fallbackRes.data : [];
          }
        } catch (e) {
          console.warn('⚠️ getAuditReportsByEmail fallback also failed:', e);
        }
      }

      if (reports.length === 0) {
        return [];
      }

      // IDB mein cache karo
      indexedDBService
        .put("audit_reports", userEmail, reports)
        .catch((e) => console.error("IDB Write Failed: audit_reports", e));

      return reports;
    },
    enabled: enabled && !!userEmail,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    placeholderData: (previousData: any) => previousData, // ✅ Keep previous data while refetching
    refetchOnMount: false, // ✅ Don't refetch on tab switch
    refetchOnWindowFocus: false, // ✅ Don't refetch on window focus
    refetchOnReconnect: false,
    retry: 1,
  });
}

/**
 * Fetch all audit reports (admin only)
 * 
 * @param enabled - Whether to enable the query
 * @returns Query result with all audit reports
 */
export function useAllAuditReports(enabled: boolean = true) {
  return useQuery({
    queryKey: auditReportKeys.allReports(),
    queryFn: async () => {
      const response = await apiClient.getAuditReports()

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch all audit reports')
      }

      return response.data
    },
    enabled,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  })
}

/**
 * Get audit reports count
 * Uses the cached audit reports data if available
 * 
 * @param userEmail - Email of user
 * @returns Number of audit reports
 */
export function useAuditReportsCount(userEmail?: string) {
  const { data: reports = [] } = useAuditReports(userEmail)
  return reports.length
}

/**
 * Manually refetch audit reports data
 */
export function useRefetchAuditReports() {
  const queryClient = useQueryClient()

  return (userEmail?: string) => {
    if (userEmail) {
      queryClient.invalidateQueries({ queryKey: auditReportKeys.list(userEmail) })
    } else {
      queryClient.invalidateQueries({ queryKey: auditReportKeys.lists() })
    }
  }
}

/**
 * Get audit reports with enhanced device count
 * Fetches machines data for each report to calculate device count
 * 
 * @param userEmail - Email of user
 * @param enabled - Whether to enable the query
 * @returns Enhanced audit reports with device counts
 */
export function useEnhancedAuditReports(userEmail?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: [...auditReportKeys.list(userEmail), "enhanced"],
    queryFn: async () => {
      if (!userEmail) {
        throw new Error("User email is required");
      }

      // 1. Try IDB first for instant load
      try {
        const cached = await indexedDBService.get(
          "enhanced_audit_reports",
          userEmail,
        );
        if (cached && Array.isArray(cached) && cached.length > 0) {
          console.log(
            `✅ Loaded enhanced audit reports for ${userEmail} from IndexedDB`,
          );
          return cached;
        }
      } catch (e) {
        console.warn("IDB Read Failed: enhanced_audit_reports", e);
      }

      // PURANA CODE: getAuditReportsByEmail → fail hota tha isliye dashboard pe reports nahi aati thi
      // NAYA CODE: getFilteredAuditReports use karo (same as AdminReports) — proven working endpoint
      let reports: AuditReport[] = [];

      try {
        const response = await apiClient.getFilteredAuditReports({ userEmail });
        if (response.success && response.data) {
          const resData = response.data as any;
          if (resData.reports && Array.isArray(resData.reports)) {
            reports = resData.reports;
          } else if (Array.isArray(response.data)) {
            reports = response.data;
          }
        }
      } catch (e) {
        console.warn('⚠️ getFilteredAuditReports failed, trying fallback:', e);
      }

      // Fallback: purana endpoint try karo
      if (reports.length === 0) {
        try {
          const fallbackRes = await apiClient.getAuditReportsByEmail(userEmail);
          if (fallbackRes.success && fallbackRes.data) {
            reports = Array.isArray(fallbackRes.data) ? fallbackRes.data : [];
          }
        } catch (e) {
          console.warn('⚠️ getAuditReportsByEmail fallback also failed:', e);
        }
      }

      if (reports.length === 0) {
        console.warn(`⚠️ No audit reports found for ${userEmail}`);
        return [];
      }

      // Fetch device count for each report in parallel
      const reportsWithDeviceCount = await Promise.all(
        reports.map(async (report: AuditReport) => {
          try {
            const machinesRes = await apiClient.getFilteredMachines({
              userEmail: report.user_email,
            });
            let deviceCount = 0;
            if (machinesRes.success && machinesRes.data) {
              const mData = machinesRes.data as any;
              if (mData.machines && Array.isArray(mData.machines)) {
                deviceCount = mData.machines.length;
              } else if (Array.isArray(machinesRes.data)) {
                deviceCount = machinesRes.data.length;
              }
            }

            return {
              ...report,
              deviceCount,
            };
          } catch (error) {
            console.warn(
              `⚠️ Failed to fetch machines for ${report.user_email}:`,
              error,
            );
            return {
              ...report,
              deviceCount: 0,
            };
          }
        }),
      );

      // IDB cache mein save karo
      indexedDBService
        .put("enhanced_audit_reports", userEmail, reportsWithDeviceCount)
        .catch((e) =>
          console.error("IDB Write Failed: enhanced_audit_reports", e),
        );

      return reportsWithDeviceCount;
    },
    enabled: enabled && !!userEmail,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    placeholderData: (previousData: any) => previousData, // ✅ Keep previous data while refetching
    refetchOnMount: false, // ✅ Don't refetch on tab switch
    refetchOnWindowFocus: false, // ✅ Don't refetch on window focus
    refetchOnReconnect: false,
    retry: 1,
  });
}

/**
 * Enhanced hook for filtered audit reports with parallel fetching for subusers
 * replacement for loadReportsData in AdminReports.tsx
 */
export function useFilteredAuditReports(
  filters: {
    userEmail: string;
    subuserFilter?: string;
    query?: string;
    statusFilter?: string;
    fromDate?: string;
    toDate?: string;
    reportTypeFilter?: string;
    groupFilter?: string;
  },
  subusersData: any[] = [],
  enabled: boolean = true
) {
  return useQuery({
    queryKey: auditReportKeys.list(filters.userEmail + JSON.stringify(filters)),
    queryFn: async () => {
      // 0. Demo Mode
      if (isDemoMode()) {
        return []; // AdminReports handles demo data itself or we can move it here
      }

      const {
        userEmail,
        subuserFilter,
        query,
        statusFilter,
        fromDate,
        toDate,
        reportTypeFilter,
        groupFilter,
      } = filters;

      // Determine target email
      let targetEmail = userEmail;
      if (subuserFilter && subuserFilter !== "all" && subuserFilter !== "") {
        targetEmail = subuserFilter;
      }

      // Build filters for API
      const apiFilters: any = {
        userEmail: targetEmail,
      };
      if (query) apiFilters.search = query;
      if (statusFilter) apiFilters.status = statusFilter;
      if (fromDate) apiFilters.dateFrom = fromDate;
      if (toDate) apiFilters.dateTo = toDate;
      if (reportTypeFilter) apiFilters.reportType = reportTypeFilter;
      if (groupFilter) apiFilters.groupName = groupFilter;

      let uniqueReports: any[] = [];
      const response = await apiClient.getFilteredAuditReports(apiFilters);

      if (response.success && response.data) {
        const responseData = response.data as any;
        uniqueReports = Array.isArray(responseData.reports) 
          ? responseData.reports 
          : Array.isArray(response.data) 
            ? response.data 
            : [response.data];
      }

      // Handle "all" subusers
      if (subuserFilter === "all" && subusersData.length > 0) {
        const subuserPromises = subusersData.map((s: any) =>
          apiClient.getFilteredAuditReports({
            ...apiFilters,
            userEmail: s.subuser_email || s.email,
          }),
        );
        const subuserResults = await Promise.all(subuserPromises);
        
        subuserResults.forEach((res) => {
          if (res.success && res.data) {
            const resData = res.data as any;
            const reportsArray = Array.isArray(resData.reports)
              ? resData.reports
              : Array.isArray(res.data)
                ? res.data
                : [res.data];
            uniqueReports = [...uniqueReports, ...reportsArray];
          }
        });

        // Remove duplicates
        uniqueReports = Array.from(
          new Map(
            uniqueReports.map((report) => [
              report.report_id || report.id,
              report,
            ]),
          ).values(),
        );
      }

      return uniqueReports;
    },
    enabled: enabled && !!filters.userEmail,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

