import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from '@/auth/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import Reveal from '@/components/Reveal'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Settings, FileText, Download, Play, HelpCircle, Layers, Calendar, Shield, ExternalLink, ChevronDown, ChevronUp, BarChart, HardDrive, Percent, Database, TrendingUp } from 'lucide-react';
import { ThemeCard, ThemeButton, ThemeIconContainer, themeClasses } from '@/components/ui/Theme';
import { apiClient } from '@/utils/enhancedApiClient'
import type { EnhancedSubuser } from '@/utils/enhancedApiClient'
import { isDemoMode } from '@/data/demoData'

// ✅ DEMO MODE: Suppress console logs in demo mode
const devLog = (...args: any[]) => { if (!isDemoMode()) console.log(...args); };
const devWarn = (...args: any[]) => { if (!isDemoMode()) console.warn(...args); };
const devError = (...args: any[]) => { if (!isDemoMode()) console.error(...args); };

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const { showInfo } = useNotification()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    certificates: false,
    quickActions: false
  })
  const profileMenuRef = useRef<HTMLDivElement>(null)

  // Profile data state - can be user or subuser
  const [profileData, setProfileData] = useState<{
    name: string
    email: string
    role: string
    department?: string
    phone?: string
    isSubuser: boolean
  } | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Fetch profile data - user or subuser based on localStorage
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoadingProfile(true)

        // Get stored user data from localStorage
        const storedUserData = localStorage.getItem('user_data')

        if (!storedUserData) {
          // devLog('⚠️ No user_data in localStorage')
          // Fallback to AuthContext user
          if (user) {
            setProfileData({
              name: user.name,
              email: user.email,
              role: user.role,
              department: user.department,
              phone: user.phone_number,
              isSubuser: false
            })
          }
          setLoadingProfile(false)
          return
        }

        const parsedData = JSON.parse(storedUserData)
        // devLog('📦 Parsed user_data:', parsedData)

        // Check if logged-in user is a subuser
        const userType = parsedData.user_type || parsedData.userType || user?.role
        const isSubuser = userType === 'subuser'

        // devLog(`🔍 User Type: ${userType}, Is Subuser: ${isSubuser}`)

        if (isSubuser) {
          // Fetch subuser data from API
          const subuserEmail = parsedData.user_email || parsedData.email || user?.email

          if (!subuserEmail) {
            devError('❌ No subuser email found')
            setLoadingProfile(false)
            return
          }

          // ✅ DEMO MODE GUARD: Skip API call in demo mode
          if (isDemoMode()) {
            setProfileData({
              name: parsedData.user_name || parsedData.name || 'Demo Subuser',
              email: subuserEmail,
              role: parsedData.user_role || 'Subuser',
              department: parsedData.department || 'Demo Department',
              phone: parsedData.phone_number || '+91-9876543210',
              isSubuser: true
            })
            setLoadingProfile(false)
            return
          }

          // devLog(`📧 Fetching subuser data for: ${subuserEmail}`)

          const response = await apiClient.getEnhancedSubuser(subuserEmail)

          if (response.success && response.data) {
            const subuserData = response.data
            // devLog('✅ Subuser data fetched:', subuserData)

            // Use Subuser interface fields: subuser_name, subuser_phone, name, phone
            setProfileData({
              name: subuserData.subuser_name || subuserData.name || 'Subuser',
              email: subuserData.subuser_email || subuserEmail,
              role: subuserData.subuser_role || subuserData.role || 'Subuser',
              department: subuserData.department,
              phone: subuserData.subuser_phone || subuserData.phone,
              isSubuser: true
            })
          } else {
            devWarn('⚠️ Failed to fetch subuser data, using stored data')
            setProfileData({
              name: parsedData.user_name || parsedData.name || user?.name || 'Subuser',
              email: subuserEmail,
              role: parsedData.user_role || parsedData.role || 'Subuser',
              department: parsedData.department || user?.department,
              phone: parsedData.phone_number || user?.phone_number,
              isSubuser: true
            })
          }
        } else {
          // Regular user - use AuthContext or localStorage data
          // devLog('👤 Regular user detected')
          setProfileData({
            name: parsedData.user_name || parsedData.name || user?.name || 'User',
            email: parsedData.user_email || parsedData.email || user?.email || '',
            role: parsedData.user_role || parsedData.role || user?.role || 'User',
            department: parsedData.department || user?.department,
            phone: parsedData.phone_number || user?.phone_number,
            isSubuser: false
          })
        }
      } catch (error) {
        devError('❌ Error fetching profile data:', error)
        // Fallback to AuthContext user
        if (user) {
          setProfileData({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            phone: user.phone_number,
            isSubuser: false
          })
        }
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfileData()
  }, [user])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const certificates = [
    { id: 'ER-1001', status: 'completed', date: '2h ago', type: 'Device', devices: 5 },
    { id: 'ER-1002', status: 'completed', date: '1d ago', type: 'Server', devices: 2 },
    { id: 'ER-1003', status: 'processing', date: 'Just now', type: 'Cloud', devices: 3 },
    { id: 'ER-1004', status: 'completed', date: '3d ago', type: 'Mobile', devices: 8 },
    { id: 'ER-1005', status: 'completed', date: '5d ago', type: 'Laptop', devices: 12 },
    { id: 'ER-1006', status: 'completed', date: '1w ago', type: 'Workstation', devices: 4 }
  ]

  const displayedCertificates = expandedSections.certificates ? certificates : certificates.slice(0, 3)

  const stats = {
    monthlyErasures: 132,
    totalDevices: 450,
    successRate: '100%',
    storageReclaimed: '2.4 TB'
  }

  const quickActions = [
    { name: 'Start New Erasure', icon: Play, type: 'primary', action: () => navigate('/admin/new-erasure') },
    { name: 'Download Agent', icon: Download, type: 'secondary', action: () => navigate('/admin/download-agent') },
    { name: 'View Reports', icon: BarChart, type: 'secondary', action: () => navigate('/admin/reports') },
    { name: 'Get Support', icon: HelpCircle, type: 'secondary', action: () => navigate('/support') },
    { name: 'Bulk Operations', icon: Layers, type: 'secondary', action: () => showInfo('Feature Coming Soon', 'Bulk Operations feature is currently in development') },
    { name: 'Schedule Erasure', icon: Calendar, type: 'secondary', action: () => showInfo('Feature Coming Soon', 'Schedule Erasure feature is currently in development') },
    { name: 'Compliance Check', icon: Shield, type: 'secondary', action: () => showInfo('Feature Coming Soon', 'Compliance Check feature is currently in development') },
    { name: 'Export Data', icon: Download, type: 'secondary', action: () => navigate('/admin/reports') }
  ]

  const displayedQuickActions = expandedSections.quickActions ? quickActions : quickActions.slice(0, 4)

  // Generate user initials for avatar
  const getUserInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  }

  // Handle certificate actions
  const viewCertificateDetails = (certId: string) => {
    navigate('/admin/reports')
  }

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("user-dashboard")} />
      <div className="container-app py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Circular Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#0e7c66] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {loadingProfile ? '...' : getUserInitials(profileData?.name || user?.name || '')}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0e7c66] rounded-full border-2 border-white"></div>
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                {loadingProfile ? 'Loading...' : `Welcome back, ${profileData?.name || user?.name || 'User'}`}
              </h1>
              <p className="mt-1 text-[#5a6672] flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0e7c66]"></span>
                {loadingProfile ? 'Loading...' : profileData?.email || user?.email || 'user@example.com'}
                {' • '}
                {loadingProfile ? '...' : profileData?.isSubuser ? 'Subuser Account' : 'Account Active'}
                {profileData?.department && ` • ${profileData.department}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-full border border-[#d0d5dc]/60 hover:bg-[#d4ede4]/30 transition-colors"
                aria-label="Profile settings"
              >
                <Settings className="w-5 h-5 text-[#5a6672]" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-none shadow-lg border border-[#d0d5dc]/60 py-1 z-50">
                  <div className="px-4 py-3 border-b border-[#d0d5dc]/40">
                    <p className="text-sm font-medium text-slate-900">{profileData?.name || user?.name}</p>
                    <p className="text-sm text-[#5a6672]">{profileData?.email || user?.email}</p>
                    {profileData?.isSubuser && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-[#d4ede4] text-[#0e7c66] rounded-none">
                        Subuser
                      </span>
                    )}
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-[#5a6672] hover:bg-[#d4ede4]/30 flex items-center gap-3">
                    <User className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-[#5a6672] hover:bg-[#d4ede4]/30 flex items-center gap-3">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-[#5a6672] hover:bg-[#d4ede4]/30 flex items-center gap-3">
                    <FileText className="w-4 h-4" />
                    Billing & Usage
                  </button>
                  <div className="border-t border-[#d0d5dc]/40 my-1"></div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <Link to="/admin/new-erasure" className={`${themeClasses.button.base} ${themeClasses.button.primary}`}>
              <Play className="w-5 h-5 mr-2" />
              Start New Erasure
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Reveal delayMs={0}>
            <ThemeCard className="!p-6 h-full border-[#d0d5dc]/60 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0a2e1e]">
                <BarChart className="w-5 h-5 text-[#0e7c66]" />
                Monthly Erasures
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.monthlyErasures}</div>
                <div className="text-sm text-[#0e7c66] mb-1 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  +12%
                </div>
              </div>
            </ThemeCard>
          </Reveal>
          <Reveal delayMs={10}>
            <ThemeCard className="!p-6 h-full border-[#d0d5dc]/60 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0a2e1e]">
                <HardDrive className="w-5 h-5 text-[#0e7c66]" />
                Total Devices
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.totalDevices}</div>
                <div className="text-sm text-[#0e7c66] mb-1 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  +24
                </div>
              </div>
            </ThemeCard>
          </Reveal>
          <Reveal delayMs={20}>
            <ThemeCard className="!p-6 h-full border-[#d0d5dc]/60 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0a2e1e]">
                <Percent className="w-5 h-5 text-[#0e7c66]" />
                Success Rate
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.successRate}</div>
                <div className="text-sm text-[#0e7c66] mb-1 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  +0.2%
                </div>
              </div>
            </ThemeCard>
          </Reveal>
          <Reveal delayMs={30}>
            <ThemeCard className="!p-6 h-full border-[#d0d5dc]/60 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0a2e1e]">
                <Database className="w-5 h-5 text-[#0e7c66]" />
                Storage Reclaimed
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.storageReclaimed}</div>
                <div className="text-sm text-[#0e7c66] mb-1 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  +0.8TB
                </div>
              </div>
            </ThemeCard>
          </Reveal>
        </div>

        {/* Recent Certificates */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Recent Certificates</h2>
            <button
              onClick={() => toggleSection('certificates')}
              className="text-[#0e7c66] hover:text-[#0a2e1e] text-sm font-bold flex items-center gap-1 transition-colors"
            >
              {expandedSections.certificates ? 'Show Less' : 'View All'}
              {expandedSections.certificates ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedCertificates.map((cert, i) => (
              <Reveal key={cert.id} delayMs={i * 100}>
                <ThemeCard className="!p-4 sm:!p-6 h-full border-[#d0d5dc]/60 hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-900">{cert.id}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold ${cert.status === 'completed'
                        ? 'bg-[#d4ede4] text-[#0e7c66]' 
                        : 'bg-[#d4ede4] text-[#0a2e1e]'
                      }`}>
                      {cert.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="text-[#5a6672]">{cert.type} Erasure</div>
                    <div className="text-[#5a6672]">{cert.devices} devices</div>
                  </div>
                  <div className="mt-4 text-xs text-[#5a6672]">{cert.date}</div>
                  <div className="mt-4 pt-4 border-t border-[#d0d5dc]/60 flex justify-end">
                    <button
                      onClick={() => viewCertificateDetails(cert.id)}
                      className="text-[#0e7c66] hover:text-[#0a2e1e] text-sm font-bold transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                </ThemeCard>
              </Reveal>
            ))}
          </div>
          {expandedSections.certificates && certificates.length > 3 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => toggleSection('certificates')}
                className="text-[#5a6672] hover:text-slate-900 text-sm font-bold"
              >
                Collapse
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Quick Actions</h2>
            <button
              onClick={() => toggleSection('quickActions')}
              className="text-[#0e7c66] hover:text-[#0a2e1e] text-sm font-bold flex items-center gap-1 transition-colors"
            >
              {expandedSections.quickActions ? 'Show Less' : 'View All'}
              {expandedSections.quickActions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedQuickActions.map((action, i) => {
              const ActionIcon = action.icon;
              return (
                <Reveal key={action.name} delayMs={i * 100}>
                  <button
                    onClick={action.action}
                    className={`group border transition-all duration-150 ease-out flex flex-col relative overflow-hidden items-center justify-center py-6 sm:py-8 !p-4 sm:!p-6 min-w-0 h-full w-full rounded-none hover:-translate-y-1 hover:shadow-lg ${
                      action.type === 'primary'
                        ? 'bg-[#0e7c66] hover:bg-[#0e7c66] text-white border-[#0e7c66]'
                        : 'bg-[#0e7c66] hover:bg-[#f4fbf8] text-[#0a2e1e] border-[#d0d5dc]/60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      action.type === 'primary'
                        ? 'bg-[#0e7c66] text-[#0e7c66]'
                        : 'bg-[#d4ede4] text-[#0e7c66] group-hover:bg-[#0e7c66] group-hover:text-white'
                    }`}>
                      <ActionIcon className="w-6 h-6" />
                    </div>
                    <div className={`mt-3 sm:mt-4 text-xs sm:text-sm font-bold text-center px-2`}>
                      <span className="block truncate">{action.name}</span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
          {expandedSections.quickActions && quickActions.length > 4 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => toggleSection('quickActions')}
                className="text-[#5a6672] hover:text-slate-900 text-sm font-bold"
              >
                Collapse
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
