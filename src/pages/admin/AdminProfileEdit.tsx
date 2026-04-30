import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from "@/auth/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AdminDashboardAPI,
  type ProfileData,
} from "@/services/adminDashboardAPI";
import { getPrimaryRole } from "@/utils/roleHelper";
import { isDemoMode } from "@/data/demoData";

export default function AdminProfileEdit() {
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // LocalStorage se user data nikalne ka helper
  const getUserDataFromStorage = () => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        // Silently ignore parsing errors for legacy data
      }
    }

    if (authUser) {
      try {
        return JSON.parse(authUser);
      } catch (e) {
        console.error("Error parsing authUser:", e);
      }
    }

    return null;
  };

  const storedUserData = getUserDataFromStorage();
  const primaryRole = getPrimaryRole(storedUserData) || user?.role || "user";

  const [profileData, setProfileData] = useState<ProfileData>({
    name: storedUserData?.user_name || user?.name || "",
    email: storedUserData?.user_email || user?.email || "",
    timezone: storedUserData?.timezone || "Asia/Kolkata",
    role: primaryRole,
    phone: storedUserData?.phone_number || "",
    department: storedUserData?.department || "",
  });

  // Profile data fetch karte hain mount par
  useEffect(() => {
    const loadProfileData = async () => {
      setDataLoading(true);
      try {
        const response = await AdminDashboardAPI.getAdminProfile();
        if (response.success) {
          setProfileData(response.data);
        } else {
          // API fail hone par fallback logic
          const storedData = getUserDataFromStorage();
          const fallbackRole = getPrimaryRole(storedData) || user?.role || "user";
          setProfileData({
            name: storedData?.user_name || user?.name || "",
            email: storedData?.user_email || user?.email || "",
            timezone: storedData?.timezone || "Asia/Kolkata",
            role: fallbackRole,
            phone: storedData?.phone_number || "",
            department: storedData?.department || "",
          });
        }
      } catch (error) {
        console.error("Profile data loading error:", error);
      } finally {
        setDataLoading(false);
      }
    };

    loadProfileData();
  }, [user?.email, user?.name, user?.role]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    // Demo mode check zaroori hai
    if (isDemoMode()) {
      showInfo("You are in Demo Mode. Action is not permitted.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await AdminDashboardAPI.updateAdminProfile(profileData);

      if (response.success) {
        showSuccess(
          "Profile Updated Successfully",
          "Your profile information has been updated."
        );
        navigate("/admin");
      } else {
        throw new Error(response.error || "Update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      showError("Update Failed", "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const timezones = [
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "America/Los_Angeles",
    "Europe/Paris",
    "Asia/Dubai",
  ];

  return (
    <>
      {/* SEO Head component */}
      <SEOHead seo={getSEOForPage("admin-profile-edit")} />

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/admin")}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Go back to dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Administrator Profile
              </h1>
            </div>
            <p className="text-slate-600">
              Update your account details and preferences
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card !p-8">
            {dataLoading ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 text-slate-600 font-medium">
                  <div className="animate-spin w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
                  Loading profile data...
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Avatar Display */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-full mx-auto flex items-center justify-center shadow-lg mb-4">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button className="text-emerald-700 hover:text-emerald-800 text-sm font-semibold transition-colors">
                    Change Profile Picture
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="profile-fullname" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="profile-fullname"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Email Input (ReadOnly) */}
                  <div>
                    <label htmlFor="profile-email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      value={profileData.email}
                      readOnly
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="profile-phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="profile-phone"
                      type="tel"
                      value={profileData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Department Input */}
                  <div>
                    <label htmlFor="profile-dept" className="block text-sm font-semibold text-slate-700 mb-2">
                      Department
                    </label>
                    <input
                      id="profile-dept"
                      type="text"
                      value={profileData.department || ""}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="Enter department"
                    />
                  </div>

                  {/* Timezone Select */}
                  <div>
                    <label htmlFor="profile-timezone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Time Zone *
                    </label>
                    <select
                      id="profile-timezone"
                      value={profileData.timezone}
                      onChange={(e) => handleInputChange("timezone", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>

                  {/* Role Display */}
                  <div>
                    <label htmlFor="profile-role-display" className="block text-sm font-semibold text-slate-700 mb-2">
                      System Role
                    </label>
                    <input
                      id="profile-role-display"
                      type="text"
                      value={profileData.role}
                      readOnly
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="btn-primary flex-1 py-3 text-base font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? "Saving Profile..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => navigate("/admin")}
                    disabled={isLoading}
                    className="btn-secondary flex-1 py-3 text-base font-bold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}