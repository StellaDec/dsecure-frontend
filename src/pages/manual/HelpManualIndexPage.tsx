import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import { ArrowLeft, ChevronRight, Download, Play, Book, HelpCircle, FileText, Calendar, Settings, Mouse, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpManualIndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEOHead seo={getSEOForPage("help-manual")} />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/support"
                className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 dark:text-white font-medium">
                Help Manual
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Book className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              D-Secure Help Manual
            </h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Complete Visual Guide To Learn More About D-Secure Products,
            Installation, FAQs, Report Management & Advanced Settings
            Configuration
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">7</div>
              <div className="text-blue-200 text-sm">Complete Guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">19+</div>
              <div className="text-blue-200 text-sm">FAQ Answers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-blue-200 text-sm">Visual Guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-blue-200 text-sm">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Getting Started Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Play className="w-6 h-6 text-green-800 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Getting Started
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Essential guides for new users
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/support/manual/installation"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Installation Guide
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Step-by-step visual installation process with screenshots and
                detailed instructions for all platforms.
              </p>
            </Link>

            <Link
              to="/support/manual/system-setup"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
                  <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  System Setup
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Full disk access configuration, system permissions, and initial
                setup for macOS, Windows, and Linux.
              </p>
            </Link>

            <Link
              to="/support/help-manual/working-guide"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <Mouse className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Working with D-Secure
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Complete user interface guide, activation process, and file
                erasure operations with visual examples.
              </p>
            </Link>
          </div>
        </div>

        {/* Data Erasure Methods Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Erasure Methods
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Understanding sanitization standards
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/support/manual/overwrite-patterns"
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Overwrite Patterns</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">DoD, NIST, and custom algorithms.</p>
            </Link>
            <Link
              to="/support/manual/cryptographic-erasure"
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Crypto Erasure</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Secure key destruction for SSDs.</p>
            </Link>
            <Link
              to="/support/manual/physical-destruction"
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Physical Methods</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Degaussing and shredding guides.</p>
            </Link>
            <Link
              to="/support/manual/verification-methods"
              className="bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Verification</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Ensuring 100% data destruction.</p>
            </Link>
          </div>
        </div>

        {/* Platform Guides Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Platform Guides
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Operating system specific instructions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/support/manual/windows-systems"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Windows</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step for PC & Laptops</p>
            </Link>
            <Link
              to="/support/manual/macos-systems"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-gray-400 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">macOS</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Intel & Apple Silicon (M1/M2/M3)</p>
            </Link>
            <Link
              to="/support/manual/linux-systems"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-orange-500 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Linux</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise Server & Workstation</p>
            </Link>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Advanced Features
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Management, reporting, and automation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/support/help-manual/report-management"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                  <FileText className="w-5 h-5 text-green-800 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Report Management
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Learn to preview, save, customize, and sync erasure reports to
                cloud with comprehensive management features.
              </p>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                ✓ Preview Reports ✓ Save & Export ✓ Cloud Sync ✓ Customization
              </div>
            </Link>

            <Link
              to="/support/help-manual/schedule-settings"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Scheduling & Settings
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Configure automated erasure tasks, customize themes, and manage
                general application settings.
              </p>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                ✓ Task Scheduling ✓ Theme Configuration ✓ General Settings ✓
                Automation
              </div>
            </Link>
          </div>
        </div>

        {/* Support & FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Support & FAQ
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get answers and find solutions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/support/help-manual/faqs"
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    General FAQs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get answers to common questions about features and usage.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>

            <Link
              to="/support/manual/common-issues"
              className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors">
                  <Settings className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Troubleshooting
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Solutions for common errors and performance issues.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          </div>
        </div>

        {/* Complete Manual Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Book className="w-6 h-6 text-green-800 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Complete Reference
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                All-in-one comprehensive manuals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/support/help-manual/complete-manual"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">D-Secure File Eraser Manual</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive guide for file and folder sanitization.</p>
            </Link>
            <Link
              to="/support/help-manual/complete-drive-manual"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">D-Secure Drive Eraser Manual</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full disk erasure and bulk drive processing guide.</p>
            </Link>
            <Link
              to="/support/help-manual/network-file"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Network File Eraser Manual</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Technical guide for network-based file erasure and deployment.</p>
            </Link>
            <Link
              to="/support/help-manual/complete-freeze-state-manual"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Freeze State Manual</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reboot-to-Restore technology configuration.</p>
            </Link>
            <Link
              to="/support/help-manual/complete-diagnostic-manual"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Diagnostic Manual</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hardware health check and performance testing.</p>
            </Link>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/support/help-manual/complete-manual"
              className="text-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              <Book className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="font-medium text-white text-sm">
                Complete Manual
              </div>
            </Link>
            <Link
              to="/support/manual/installation"
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Download className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                Installation
              </div>
            </Link>
            <Link
              to="/support/manual/system-setup"
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                Setup
              </div>
            </Link>
            <Link
              to="/support/manual/working-with-dsecure"
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Mouse className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">
                User Guide
              </div>
            </Link>
          </div>
        </div>

        {/* Help Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Need Additional Help?
            </h3>
            <p className="text-blue-800 dark:text-blue-300 mb-4">
              Can't find what you're looking for? Our support team is ready to
              help you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Contact Support
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpManualIndexPage;