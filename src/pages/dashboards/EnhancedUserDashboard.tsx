import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from '@/auth/AuthContext'
import { useCurrentUser, RoleGuard, PermissionGuard } from '@/components/ProtectedRoute'
import { authService } from '@/utils/authService'
import { apiClient } from '@/utils/enhancedApiClient'
import { useState, useEffect } from 'react'
import Reveal from '@/components/Reveal'
import { Play, Settings, FileText, Download, HelpCircle, Layers, Calendar, Shield, ExternalLink, ChevronDown, ChevronUp, BarChart, HardDrive, Percent, Database, TrendingUp, AlertTriangle } from 'lucide-react';
import { ThemeCard, ThemeButton, ThemeIconContainer, themeClasses } from '@/components/ui/Theme';
interface DashboardStats {
  monthlyErasures: number
  totalDevices: number
  successRate: string
  storageReclaimed: string
}

export default function EnhancedUserDashboard() {
  const { user, logout, hasRole, hasPermission } = useAuth()
  const currentUser = useCurrentUser() // Alternative way to get user from JWT
  const [stats, setStats] = useState<DashboardStats>({
    monthlyErasures: 0,
    totalDevices: 0,
    successRate: '0%',
    storageReclaimed: '0 TB'
  })
  const [loading, setLoading] = useState(true)
  const [tokenInfo, setTokenInfo] = useState({
    timeUntilExpiry: 0,
    isAboutToExpire: false
  })

  // Update token info every minute
  useEffect(() => {
    const updateTokenInfo = () => {
      setTokenInfo({
        timeUntilExpiry: authService.getTimeUntilExpiry() || 0,
        isAboutToExpire: authService.isTokenAboutToExpire()
      })
    }

    updateTokenInfo()
    const interval = setInterval(updateTokenInfo, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Fetch dashboard data using enhanced API client
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Example API calls that automatically include JWT token
        const [userResponse] = await Promise.all([
          apiClient.getCurrentUser()
          // apiClient.getDashboardStats() // Implement this endpoint when backend is ready
        ])

        if (userResponse.success) {
          // //console.log('Current user from API:', userResponse.data)
        }

        // Mock stats for demo
        setStats({
          monthlyErasures: 132,
          totalDevices: 450,
          successRate: '100%',
          storageReclaimed: '2.4 TB'
        })
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (authService.isAuthenticated()) {
      fetchDashboardData()
    }
  }, [])

  const certificates = [
    { id: 'ER-1001', status: 'completed', date: '2h ago', type: 'Device', devices: 5 },
    { id: 'ER-1002', status: 'completed', date: '1d ago', type: 'Server', devices: 2 },
    { id: 'ER-1003', status: 'processing', date: 'Just now', type: 'Cloud', devices: 3 }
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("enhanced-user-dashboard")} />
      <div className="container-app py-12">
        {/* Header with JWT-based user info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Welcome back, {user?.name || currentUser?.name}
            </h1>
            <div className="mt-2 flex flex-col gap-1 text-sm text-[#5a6672]">
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0e7c66]"></span>
                Role: <span className="font-bold text-slate-900">{user?.role}</span>
                {user?.department && (
                  <>
                    <span className="text-[#d0d5dc]">•</span>
                    Department: <span className="font-bold text-slate-900">{user?.department}</span>
                  </>
                )}
              </p>

              {/* Token expiration warning */}
              {tokenInfo.isAboutToExpire && (
                <p className="flex items-center gap-2 text-[#0a2e1e]">
                  <AlertTriangle className="w-4 h-4" />
                  Session expires in {formatTime(tokenInfo.timeUntilExpiry)}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {/* Permission-based action visibility */}
            <PermissionGuard permissions={['write:own', 'access:dashboard']}>
              <ThemeButton className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start New Erasure
              </ThemeButton>
            </PermissionGuard>

            {/* Role-based admin access */}
            <RoleGuard roles={['admin', 'manager']}>
              <ThemeButton
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.open('/admin', '_blank')}
              >
                <Settings className="w-5 h-5" />
                Admin Panel
              </ThemeButton>
            </RoleGuard>

            <button
              className={`${themeClasses.button.base} text-red-600 border-2 border-red-200 hover:bg-red-50`}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>

        {/* JWT Authentication Status Panel */}
        <div className="mb-8">
          <Reveal>
            <ThemeCard className="!p-6 border-[#d0d5dc]/60 bg-[#f4fbf8]">
              <h2 className="text-lg font-bold text-[#0a2e1e] mb-4">Authentication Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-[#0e7c66] font-bold">Authentication:</span>
                  <span className="ml-2 text-[#0a2e1e] font-bold">✓ Active</span>
                </div>
                <div>
                  <span className="text-[#0e7c66] font-bold">Token Expires:</span>
                  <span className={`ml-2 font-bold ${tokenInfo.isAboutToExpire ? 'text-[#0a2e1e]' : 'text-[#0a2e1e]'}`}>
                    {formatTime(tokenInfo.timeUntilExpiry)}
                  </span>
                </div>
                <div>
                  <span className="text-[#0e7c66] font-bold">Permissions:</span>
                  <span className="ml-2 text-slate-700">{authService.getPermissions().length} granted</span>
                </div>
              </div>

              {/* Show user permissions */}
              <details className="mt-4 group">
                <summary className="cursor-pointer text-[#0e7c66] font-bold hover:text-[#0a2e1e] transition-colors">View Permissions</summary>
                <div className="mt-2 flex flex-wrap gap-2">
                  {authService.getPermissions().map(permission => (
                    <span
                      key={permission}
                      className="px-2 py-1 bg-[#d4ede4] text-[#0e7c66] rounded-none text-xs font-bold border border-[#0e7c66]/20"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </details>
            </ThemeCard>
          </Reveal>
        </div>

        {/* Stats Grid with permission-based visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Reveal>
            <ThemeCard className="!p-6 h-full hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#5a6672]">Monthly Erasures</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {loading ? '...' : stats.monthlyErasures.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-[#d4ede4] rounded-full">
                  <BarChart className="w-6 h-6 text-[#0e7c66]" />
                </div>
              </div>
            </ThemeCard>
          </Reveal>

          <PermissionGuard permissions={['read:all', 'read:department']}>
            <Reveal delayMs={10}>
              <ThemeCard className="!p-6 h-full hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#5a6672]">Total Devices</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {loading ? '...' : stats.totalDevices.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-[#d4ede4] rounded-full">
                    <HardDrive className="w-6 h-6 text-[#0e7c66]" />
                  </div>
                </div>
              </ThemeCard>
            </Reveal>
          </PermissionGuard>

          <Reveal delayMs={20}>
            <ThemeCard className="!p-6 h-full hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#5a6672]">Success Rate</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {loading ? '...' : stats.successRate}
                  </p>
                </div>
                <div className="p-3 bg-[#d4ede4] rounded-full">
                  <Percent className="w-6 h-6 text-[#0e7c66]" />
                </div>
              </div>
            </ThemeCard>
          </Reveal>

          <Reveal delayMs={30}>
            <ThemeCard className="!p-6 h-full hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#5a6672]">Storage Reclaimed</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {loading ? '...' : stats.storageReclaimed}
                  </p>
                </div>
                <div className="p-3 bg-[#d4ede4] rounded-full">
                  <Database className="w-6 h-6 text-[#0e7c66]" />
                </div>
              </div>
            </ThemeCard>
          </Reveal>
        </div>

        {/* Quick Actions with role-based visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Reveal>
            <ThemeCard className="!p-6 h-full">
              <h2 className="text-lg font-bold text-[#0a2e1e] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <PermissionGuard permissions={['write:own']}>
                  <button className={`${themeClasses.button.base} w-full text-left flex items-center justify-start gap-3 bg-[#0e7c66] hover:bg-[#0e7c66] text-white border-2 border-[#0e7c66]`}>
                    <Play className="w-5 h-5" />
                    Start New Erasure
                  </button>
                </PermissionGuard>

                <button className={`${themeClasses.button.base} w-full text-left flex items-center justify-start gap-3 bg-white hover:bg-[#f4fbf8] text-[#0a2e1e] border-2 border-[#0a2e1e]`}>
                  <Download className="w-5 h-5" />
                  Download Agent
                </button>

                <PermissionGuard permissions={['read:own', 'access:reports']}>
                  <button className={`${themeClasses.button.base} w-full text-left flex items-center justify-start gap-3 bg-white hover:bg-[#f4fbf8] text-[#0a2e1e] border-2 border-[#0a2e1e]`}>
                    <BarChart className="w-5 h-5" />
                    View Reports
                  </button>
                </PermissionGuard>

                <button className={`${themeClasses.button.base} w-full text-left flex items-center justify-start gap-3 bg-white hover:bg-[#f4fbf8] text-[#0a2e1e] border-2 border-[#0a2e1e]`}>
                  <HelpCircle className="w-5 h-5" />
                  Get Support
                </button>
              </div>
            </ThemeCard>
          </Reveal>

          {/* Recent Activity */}
          <Reveal delayMs={10}>
            <ThemeCard className="!p-6 h-full">
              <h2 className="text-lg font-bold text-[#0a2e1e] mb-4">Recent Erasures</h2>
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div key={cert.id} className="flex items-center justify-between py-3 border-b border-[#d0d5dc]/40 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${cert.status === 'completed' ? 'bg-[#0e7c66]' :
                        cert.status === 'processing' ? 'bg-[#0e7c66]' : 'bg-slate-400'
                        }`}></div>
                      <div>
                        <p className="font-bold text-slate-900">{cert.id}</p>
                        <p className="text-sm text-[#5a6672]">{cert.type} • {cert.devices} devices</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold ${cert.status === 'completed'
                        ? 'bg-[#d4ede4] text-[#0e7c66]'
                        : cert.status === 'processing'
                          ? 'bg-[#d4ede4] text-[#0a2e1e]'
                          : 'bg-slate-100 text-slate-800'
                        }`}>
                        {cert.status}
                      </span>
                      <p className="text-xs text-[#5a6672] mt-1">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ThemeCard>
          </Reveal>
        </div>

        {/* Developer Info Panel (Only show in development) */}
        {import.meta.env.DEV && (
          <Reveal delayMs={10}>
            <ThemeCard className="!p-6 bg-white">
              <h2 className="text-lg font-bold mb-4 text-[#0a2e1e] flex items-center gap-2">
                <Settings className="w-5 h-5" />
                JWT Debug Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[#5a6672] mb-2">Token Info</h3>
                  <pre className="bg-[#f4fbf8] p-3 rounded-none border border-[#d0d5dc]/60 text-xs overflow-auto text-slate-900">
                    {JSON.stringify({
                      isAuthenticated: authService.isAuthenticated(),
                      tokenExpiry: tokenInfo.timeUntilExpiry,
                      isAboutToExpire: tokenInfo.isAboutToExpire,
                      userRole: user?.role,
                      userDepartment: user?.department
                    }, null, 2)}
                  </pre>
                </div>
                <div>
                  <h3 className="font-bold text-[#5a6672] mb-2">User Permissions</h3>
                  <div className="bg-[#f4fbf8] p-3 rounded-none border border-[#d0d5dc]/60">
                    {authService.getPermissions().map((permission: string) => (
                      <div key={permission} className="text-xs font-medium text-slate-900 mb-1">
                        <span className="text-[#0e7c66] mr-1">✓</span> {permission}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ThemeCard>
          </Reveal>
        )}
      </div>
    </>
  )
}
