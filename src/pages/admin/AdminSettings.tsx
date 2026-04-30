import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from '@/auth/AuthContext'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotification } from "@/contexts/NotificationContext";
import { isDemoMode } from "@/data/demoData";

export default function AdminSettings() {
  // Unused user removed if not needed, but keeping useAuth for context consistency
  useAuth();
  const navigate = useNavigate();
  const { showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      siteName: "D-SecureTech",
      siteDescription: "Professional Data Erasure Solutions",
      defaultLanguage: "en",
      timezone: "UTC",
      maintenanceMode: false,
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 30,
      twoFactorAuth: false,
      maxLoginAttempts: 5,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      reportGeneration: true,
      systemAlerts: true,
      userRegistration: true,
    },
    license: {
      totalLicenses: 3287,
      usedLicenses: 2087,
      availableLicenses: 1200,
      expiryDate: "2025-12-31",
      autoRenewal: true,
    },
  });

  // Settings update handler
  // Category aur key ke basis pe state update karte hain
  const handleSettingChange = (category: string, key: string, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  // Settings save handler
  // Demo mode check ke baad save logic execute karenge
  const handleSaveSettings = () => {
    if (isDemoMode()) {
      showInfo("You are in Demo Mode. Action is not permitted.");
      return;
    }
    // Handle settings save logic yahan aayegi
    console.log('Saving settings:', settings);
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "license", name: "License", icon: "🔑" },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-settings")} />

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/admin")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Go back to admin dashboard"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                System Settings
              </h1>
            </div>
            <p className="text-slate-600">
              Configure system preferences and security settings
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveSettings}
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Settings
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card !p-0">
              <nav className="space-y-1 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-emerald-100 text-emerald-700 font-medium"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {activeTab === "general" && (
              <div className="card">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-900">
                    General Settings
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Manage basic system configuration
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="site-name" className="block text-sm font-medium text-slate-700 mb-2">
                      Site Name
                    </label>
                    <input
                      id="site-name"
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteName",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="site-description" className="block text-sm font-medium text-slate-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      id="site-description"
                      value={settings.general.siteDescription}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "siteDescription",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="default-language" className="block text-sm font-medium text-slate-700 mb-2">
                        Default Language
                      </label>
                      <select
                        id="default-language"
                        value={settings.general.defaultLanguage}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "defaultLanguage",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timezone-setting" className="block text-sm font-medium text-slate-700 mb-2">
                        Timezone
                      </label>
                      <select
                        id="timezone-setting"
                        value={settings.general.timezone}
                        onChange={(e) =>
                          handleSettingChange(
                            "general",
                            "timezone",
                            e.target.value,
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="GMT">Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "maintenanceMode",
                          e.target.checked,
                        )
                      }
                      className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="maintenanceMode"
                      className="text-sm font-medium text-slate-700"
                    >
                      Enable Maintenance Mode
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="card">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-900">
                    Security Settings
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Configure security and authentication settings
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="min-password-length" className="block text-sm font-medium text-slate-700 mb-2">
                        Password Minimum Length
                      </label>
                      <input
                        id="min-password-length"
                        type="number"
                        min="6"
                        max="20"
                        value={settings.security.passwordMinLength}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "passwordMinLength",
                            Number.parseInt(e.target.value, 10),
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="session-timeout" className="block text-sm font-medium text-slate-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        id="session-timeout"
                        type="number"
                        min="5"
                        max="480"
                        value={settings.security.sessionTimeout}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "sessionTimeout",
                            Number.parseInt(e.target.value, 10),
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="max-login-attempts" className="block text-sm font-medium text-slate-700 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      id="max-login-attempts"
                      type="number"
                      min="3"
                      max="10"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "maxLoginAttempts",
                          Number.parseInt(e.target.value, 10),
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="requireSpecialChars"
                        checked={settings.security.requireSpecialChars}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "requireSpecialChars",
                            e.target.checked,
                          )
                        }
                        className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                      />
                      <label
                        htmlFor="requireSpecialChars"
                        className="text-sm font-medium text-slate-700"
                      >
                        Require special characters in passwords
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="twoFactorAuth"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) =>
                          handleSettingChange(
                            "security",
                            "twoFactorAuth",
                            e.target.checked,
                          )
                        }
                        className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                      />
                      <label
                        htmlFor="twoFactorAuth"
                        className="text-sm font-medium text-slate-700"
                      >
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="card">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-900">
                    Notification Settings
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Configure notification preferences
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {Object.entries(settings.notifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <label htmlFor={`notif-${key}`} className="text-sm font-medium text-slate-700 cursor-pointer">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </label>
                          <p className="text-sm text-slate-500">
                            {key === "emailNotifications" &&
                              "Send notifications via email"}
                            {key === "smsNotifications" &&
                              "Send notifications via SMS"}
                            {key === "reportGeneration" &&
                              "Notify when reports are generated"}
                            {key === "systemAlerts" &&
                              "Send system alerts and warnings"}
                            {key === "userRegistration" &&
                              "Notify when new users register"}
                          </p>
                        </div>
                        <input
                          id={`notif-${key}`}
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) =>
                            handleSettingChange(
                              "notifications",
                              key,
                              e.target.checked,
                            )
                          }
                          className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {activeTab === "license" && (
              <div className="card">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-900">
                    License Information
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    View and manage license details
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">
                        {settings.license.totalLicenses}
                      </div>
                      <div className="text-sm text-slate-600">
                        Total Licenses
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {settings.license.usedLicenses}
                      </div>
                      <div className="text-sm text-slate-600">
                        Used Licenses
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-800">
                        {settings.license.availableLicenses}
                      </div>
                      <div className="text-sm text-slate-600">
                        Available Licenses
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="license-expiry" className="block text-sm font-medium text-slate-700 mb-2">
                      License Expiry Date
                    </label>
                    <input
                      id="license-expiry"
                      type="date"
                      value={settings.license.expiryDate}
                      onChange={(e) =>
                        handleSettingChange(
                          "license",
                          "expiryDate",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="autoRenewal"
                      checked={settings.license.autoRenewal}
                      onChange={(e) =>
                        handleSettingChange(
                          "license",
                          "autoRenewal",
                          e.target.checked,
                        )
                      }
                      className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="autoRenewal"
                      className="text-sm font-medium text-slate-700"
                    >
                      Enable Auto-Renewal
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
