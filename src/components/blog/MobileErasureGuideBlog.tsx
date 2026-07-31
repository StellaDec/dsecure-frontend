import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  HoverIcon,
  MobileIcon,
} from "@/components/FlatIcons";
import BlogFooterStandard from "./BlogFooterStandard";

const MobileErasureGuideBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO: Compliance ke liye mobile data erasure optimized title aur description set kiya */}
      <SEOHead
        seo={getBlogSEO({
          title: "Certified mobile data erasure: smartphones, tablets, and MDM",
          excerpt:
            "Factory reset doesn't meet NIST 800-88 or GDPR requirements. Certified mobile erasure does — here's how it works for iOS, Android, and MDM-managed device fleets.",
          slug: "mobile-erasure-guide",
          author: "D-Secure Editorial Team",
          publishDate: "January 28, 2025",
          keywords:
            "secure mobile data erasure software,mobile data erasure, smartphone sanitization, tablet wiping, MDM erasure, iOS erasure, Android wiping, NIST 800-88",
          category: "Security",
          tag: "Mobile",
        })}
      />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-none">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
              Mobile Security
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight">
              <span className="bg-white bg-clip-text text-transparent">
                Comprehensive Mobile Device Erasure Guide: Securing Smartphones
                & Tablets
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#5a6672] max-w-3xl mx-auto leading-relaxed">
              Securely erase smartphones, tablets, and mobile devices before
              resale, recycling, or employee transitions.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            {/* Why Mobile Erasure is Different */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                Why Mobile Devices Require Special Attention
              </h2>
              <p className="text-[#5a6672] leading-relaxed text-lg">
                Mobile devices present unique data erasure challenges due to
                their diverse operating systems, built-in encryption, cloud
                synchronization, and embedded storage that cannot be removed.
              </p>
              <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-6 rounded-none">
                <strong className="text-[#0a2e1e] block mb-2">
                  ⚠️ Common Misconception
                </strong>
                <p className="text-sm text-[#0a2e1e]">
                  Factory reset ≠ Secure data erasure. Many factory reset
                  processes don't fully sanitize data and can be recovered with
                  forensic tools.
                </p>
              </div>
            </div>

            {/* Platform-Specific Instructions */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                Platform-Specific Erasure Methods
              </h2>

              {/* iOS/iPhone */}
              <div className="bg-white border border-[#d0d5dc] p-6 rounded-none">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 flex items-center gap-2">
                  <span className="text-2xl">🍎</span> iOS Devices (iPhone/iPad)
                </h3>
                <div className="space-y-3">
                  <p className="text-[#5a6672]">
                    <strong>Erasure Method:</strong> Cryptographic erasure via
                    "Erase All Content and Settings"
                  </p>
                  <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                    <p className="font-semibold text-[#0a2e1e] mb-2">
                      Step-by-Step Process:
                    </p>
                    <ol className="text-sm text-[#5a6672] space-y-2 ml-4">
                      <li>
                        <strong>1.</strong> Back up device (if needed) via
                        iCloud or iTunes
                      </li>
                      <li>
                        <strong>2.</strong> Sign out of iCloud: Settings → [Your
                        Name] → Sign Out
                      </li>
                      <li>
                        <strong>3.</strong> Sign out of iTunes & App Store
                      </li>
                      <li>
                        <strong>4.</strong> Unpair Apple Watch (if applicable)
                      </li>
                      <li>
                        <strong>5.</strong> Settings → General → Transfer or
                        Reset iPhone → Erase All Content and Settings
                      </li>
                      <li>
                        <strong>6.</strong> Enter passcode and confirm erasure
                      </li>
                      <li>
                        <strong>7.</strong> Verify device shows "Hello" setup
                        screen
                      </li>
                    </ol>
                  </div>
                  <div className="bg-[#d4ede4] border-l-4 border-[#0e7c66] p-4 rounded-none mt-3">
                    <p className="text-sm text-[#0a2e1e]">
                      ✅ <strong>Security Note:</strong> iOS uses hardware-based
                      encryption. Erasing the encryption key makes all data
                      permanently unrecoverable—equivalent to{" "}
                      <Link
                        to="/products/drive-eraser"
                        className="text-[#0e7c66] hover:underline font-medium"
                      >
                        <Link
                          to="/compliance/nist-800-88"
                          className="text-[#0e7c66] hover:underline font-medium"
                        >
                          NIST 800-88
                        </Link>
                      </Link>{" "}
                      Purge level.
                    </p>
                  </div>
                </div>
              </div>

              {/* Android */}
              <div className="bg-white border border-[#d0d5dc] p-6 rounded-none mt-4">
                <h3 className="text-xl font-bold text-[#0a2e1e] mb-4 flex items-center gap-2">
                  <span className="text-2xl">🤖</span> Android Devices
                </h3>
                <div className="space-y-3">
                  <p className="text-[#5a6672]">
                    <strong>Erasure Method:</strong> Factory reset + encryption
                    verification
                  </p>
                  <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                    <p className="font-semibold text-[#0a2e1e] mb-2">
                      Step-by-Step Process:
                    </p>
                    <ol className="text-sm text-[#5a6672] space-y-2 ml-4">
                      <li>
                        <strong>1.</strong> Verify device encryption is enabled:
                        Settings → Security → Encryption
                      </li>
                      <li>
                        <strong>2.</strong> Remove Google account: Settings →
                        Accounts → Remove all accounts
                      </li>
                      <li>
                        <strong>3.</strong> Remove SD card (if present)
                      </li>
                      <li>
                        <strong>4.</strong> Settings → System → Reset → Factory
                        Data Reset
                      </li>
                      <li>
                        <strong>5.</strong> Confirm and wait for reset
                        completion
                      </li>
                      <li>
                        <strong>6.</strong> Verify device shows initial setup
                        wizard
                      </li>
                    </ol>
                  </div>
                  <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-4 rounded-none mt-3">
                    <p className="text-sm text-[#0a2e1e]">
                      ⚠️ <strong>Critical:</strong> Older Android devices
                      (pre-2015) may not have encryption enabled by default. For
                      these devices, use dedicated mobile erasure software or
                      physical destruction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Mobile Device Management */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                Enterprise Mobile Device Management (MDM)
              </h2>
              <p className="text-[#5a6672] leading-relaxed">
                For organizations managing fleets of mobile devices, MDM
                solutions enable centralized, remote erasure capabilities.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">Remote Wipe</h3>
                  <p className="text-sm text-[#0a2e1e]">
                    Trigger factory reset remotely via MDM portal. Useful for
                    lost/stolen devices or immediate employee departures.
                  </p>
                </div>
                <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">
                    Selective Wipe
                  </h3>
                  <p className="text-sm text-[#0a2e1e]">
                    Erase only corporate data and apps, leaving personal data
                    intact. Ideal for BYOD (Bring Your Own Device) scenarios.
                  </p>
                </div>
                <div className="bg-[#d4ede4] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">
                    Compliance Reporting
                  </h3>
                  <p className="text-sm text-[#0a2e1e]">
                    Generate audit logs and certificates proving erasure
                    occurred. Required for regulatory compliance.
                  </p>
                </div>
                <div className="bg-[#d4ede4] border border-[#d0d5dc] p-4 rounded-none">
                  <h3 className="font-bold text-[#0a2e1e] mb-2">
                    Activation Lock Management
                  </h3>
                  <p className="text-sm text-[#0a2e1e]">
                    Disable Find My iPhone/Android Device Manager locks before
                    disposal to enable device reuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                Mobile Erasure Best Practices
              </h2>
              <div className="space-y-3">
                <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                  <h3 className="font-semibold text-[#0a2e1e] mb-1">
                    1. Verify Encryption Before Erasure
                  </h3>
                  <p className="text-sm text-[#5a6672]">
                    Confirm device encryption is active. Without encryption,
                    factory reset may leave recoverable data.
                  </p>
                </div>
                <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                  <h3 className="font-semibold text-[#0a2e1e] mb-1">
                    2. Remove All Accounts
                  </h3>
                  <p className="text-sm text-[#5a6672]">
                    Sign out of Google, Apple ID, Microsoft, and all third-party
                    accounts to prevent activation locks.
                  </p>
                </div>
                <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                  <h3 className="font-semibold text-[#0a2e1e] mb-1">
                    3. Remove External Storage
                  </h3>
                  <p className="text-sm text-[#5a6672]">
                    Extract SD cards, SIM cards, and any removable storage
                    before erasure.
                  </p>
                </div>
                <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                  <h3 className="font-semibold text-[#0a2e1e] mb-1">
                    4. Document Serial Numbers
                  </h3>
                  <p className="text-sm text-[#5a6672]">
                    Record IMEI/serial numbers before erasure for audit trails
                    and compliance reporting.
                  </p>
                </div>
                <div className="bg-white border-l-4 border-[#0e7c66] p-4 rounded-none shadow-none">
                  <h3 className="font-semibold text-[#0a2e1e] mb-1">
                    5. Verify Erasure Success
                  </h3>
                  <p className="text-sm text-[#5a6672]">
                    Power on device post-erasure to confirm initial setup screen
                    appears and no data is accessible.
                  </p>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0a2e1e]">
                Common Mistakes to Avoid
              </h2>
              <div className="bg-[#f4fbf8] border border-[#d0d5dc] p-6 rounded-none">
                <ul className="space-y-2 text-[#5a6672]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0a2e1e] font-bold mt-0.5">❌</span>
                    <span>
                      <strong>Forgetting to disable Find My iPhone:</strong>{" "}
                      Device becomes unusable for next owner
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0a2e1e] font-bold mt-0.5">❌</span>
                    <span>
                      <strong>Not removing corporate MDM profiles:</strong>{" "}
                      Prevents factory reset or reactivation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0a2e1e] font-bold mt-0.5">❌</span>
                    <span>
                      <strong>Skipping encryption verification:</strong> Leaves
                      data vulnerable on older devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0a2e1e] font-bold mt-0.5">❌</span>
                    <span>
                      <strong>Assuming factory reset = secure:</strong> May not
                      meet compliance requirements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* D-Secure Mobile Solution */}
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-2xl font-bold text-[#0a2e1e] mb-6">
              D-Secure Mobile Device Erasure
            </h2>
            <p className="text-[#5a6672] leading-relaxed mb-6">
              D-Secure integrates with leading MDM platforms and provides
              standalone mobile erasure capabilities with comprehensive audit
              trails.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                <CheckIcon
                  className="w-6 h-6 text-[#0e7c66] mb-2"
                  filled={true}
                />
                <h3 className="font-bold text-[#0a2e1e] text-sm mb-1">
                  Multi-Platform Support
                </h3>
                <p className="text-xs text-[#5a6672]">
                  iOS, Android, Windows Mobile coverage
                </p>
              </div>
              <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                <CheckIcon
                  className="w-6 h-6 text-[#0e7c66] mb-2"
                  filled={true}
                />
                <h3 className="font-bold text-[#0a2e1e] text-sm mb-1">
                  Compliance Certificates
                </h3>
                <p className="text-xs text-[#5a6672]">
                  Automated documentation for audits
                </p>
              </div>
              <div className="bg-white p-4 rounded-none border border-[#d0d5dc]">
                <CheckIcon
                  className="w-6 h-6 text-[#0e7c66] mb-2"
                  filled={true}
                />
                <h3 className="font-bold text-[#0a2e1e] text-sm mb-1">
                  MDM Integration
                </h3>
                <p className="text-xs text-[#5a6672]">
                  Works with Intune, Jamf, MobileIron
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Secure Your Mobile Fleet
            </h2>
            <p className="leading-relaxed mb-6">
              Get enterprise-grade mobile device erasure with centralized
              management and compliance reporting.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-[#0e7c66] px-6 py-3 rounded-none font-semibold hover:bg-gray-50 transition-colors shadow-none"
            >
              <HoverIcon>
                {(filled) => (
                  <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />
                )}
              </HoverIcon>
              Request Demo
              <HoverIcon>
                {(filled) => (
                  <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />
                )}
              </HoverIcon>
            </Link>
          </div>
        </Reveal>
      </section>

      <BlogFooterStandard
        blogId="mobile-erasure-guide"
        blogTitle="Certified mobile data erasure: smartphones, tablets, and MDM"
      />
    </div>
  );
};

export default MobileErasureGuideBlog;
