import React, { useState, useEffect, useRef } from "react";
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import { ChevronRight, ArrowUp, Download } from "lucide-react";

interface NavItem {
    id: string;
    title: string;
    content?: React.ReactNode;
    children?: NavItem[];
}

const ImageManual = ({ src, alt }: { src: string; alt: string }) => (
    <div className="mt-6 mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-slate-50 flex justify-center">
        <img
            src={src}
            alt={alt}
            className="w-full max-w-4xl max-h-[450px] object-contain"
            style={{ borderRadius: "0.5rem" }}
        />
    </div>
);

const navigationTree: NavItem[] = [
    {
        id: "about",
        title: "About D-Secure Drive Diagnostic",
        content: (
            <>
                <p className="text-slate-700 leading-relaxed mb-4"><strong>D-Secure Drive Diagnostic</strong> is a boot-based, enterprise-grade hardware testing solution designed to comprehensively evaluate the health and functionality of computer systems. Operating independently of the host operating system, it boots from a USB or PXE environment to ensure accurate, low-level hardware access without OS interference.</p>
                <p className="text-slate-700 leading-relaxed mb-4">D-Secure Drive Diagnostic performs rigorous testing across <strong>21+ hardware components</strong> including Motherboard, CPU, RAM, Display, Storage, Battery, Wi-Fi, Bluetooth, Audio, USB Ports, Fingerprint Sensor, Camera, and Keyboard. Each diagnostic operation generates a Tamper-proof audit report with a definitive <strong>Pass/Fail/Warning</strong> grade that can be uploaded to the D-Secure Cloud Console for centralized reporting.</p>
                <p className="text-slate-700 leading-relaxed mb-6">The software features an intuitive graphical interface with a step-by-step wizard that guides users through component detection, test configuration, interactive testing, progress monitoring, and completion verification. It is the perfect tool for IT administrators, refurbishers, ITAD companies, and quality assurance teams.</p>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li><strong>Boot-Based Operation</strong> — Boots from USB or PXE, independent of the host OS for accurate low-level hardware diagnostics.</li>
                    <li><strong>Automatic Hardware Detection</strong> — Scans and identifies all internal and external components accurately.</li>
                    <li><strong>21+ Comprehensive Tests</strong> — Evaluates everything from CPU and RAM to Fingerprint, Audio, and Wi-Fi.</li>
                    <li><strong>Pass/Fail Grading System</strong> — Automatically grades components as Pass, Fail, or Warning based on health thresholds.</li>
                    <li><strong>Automated & Interactive Testing</strong> — Runs automated backend tests alongside interactive tests (e.g., typing on the keyboard, confirming audio playback).</li>
                    <li><strong>Wi-Fi & LAN Connectivity</strong> — Connect via Wi-Fi networks or LAN/Ethernet for cloud license validation and report upload.</li>
                    <li><strong>Offline Mode</strong> — Operate in air-gapped environments with offline activation and local report storage.</li>
                    <li><strong>Compliance Reports</strong> — Generate Tamper-proof audit reports with certificates including system details, test results, and final grades.</li>
                    <li><strong>Cloud Integration</strong> — Automatic report upload to D-Secure Cloud Console for centralized management.</li>
                    <li><strong>Multi-Theme Support</strong> — Switch between Light, Dark, D-Secure Green, and D-Secure Light themes.</li>
                </ul>
            </>
        ),
    },
    {
        id: "guide",
        title: "About the Guide",
        content: (
            <>
                <p className="text-slate-700 leading-relaxed mb-6">This user guide provides comprehensive step-by-step instructions for every feature and function of <strong>D-Secure Drive Diagnostic</strong>. Each section includes detailed explanations accompanied by actual screenshots from the application.</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4 mb-6">
                    <li><strong>About D-Secure Drive Diagnostic</strong></li>
                    <li><strong>About the Guide</strong></li>
                    <li><strong>Getting Started</strong> — Boot process, system summary, hardware detection, network setup, and authentication</li>
                    <li><strong>Working with D-Secure Drive Diagnostic</strong> — Dashboard, diagnostic wizard (5-step process), reports, and settings</li>
                    <li><strong>Help & Support</strong></li>
                    <li><strong>About D-Secure</strong></li>
                </ol>
                <p className="text-slate-700 leading-relaxed">This is a web-based guide and requires an active internet connection. You can read this guide with all popular browsers like Chrome, Firefox, and Safari. For better viewing experience, it is recommended to use the <strong>Chrome</strong> browser.</p>
            </>
        ),
    },
    {
        id: "getting-started",
        title: "Getting Started",
        children: [
            {
                id: "create-bootable-usb",
                title: "Creating a Bootable USB",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            To use <strong>D-Secure Drive Diagnostic</strong>, you first need to create a bootable USB drive using our provided ISO image. We recommend using <strong>UNetbootin</strong>, a reliable and easy-to-use tool for creating bootable media on any operating system.
                        </p>
                        <div className="bg-emerald-50 border-emerald-500 border rounded-lg p-6 mb-6">
                            <h4 className="text-emerald-800 font-bold mb-4">Download UNetbootin Tool:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <a href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-windows-702.exe" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-emerald-200 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-100 transition-all shadow-sm">
                                    🪟 Windows
                                </a>
                                <a href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-linux64-702.bin" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-emerald-200 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-100 transition-all shadow-sm">
                                    🐧 Linux
                                </a>
                                <a href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-mac-702.dmg" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-emerald-200 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-100 transition-all shadow-sm">
                                    🍎 macOS
                                </a>
                            </div>
                        </div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-3">Steps to create Bootable USB:</h4>
                        <ol className="list-decimal list-inside space-y-3 text-slate-700 ml-4 mb-6">
                            <li><strong>Download</strong> the version of UNetbootin that matches your current operating system from the links above.</li>
                            <li><strong>Connect</strong> a USB flash drive (minimum 1GB) to your computer.</li>
                            <li><strong>Open</strong> UNetbootin. You may need Administrator/Root privileges.</li>
                            <li>Select <strong>"Diskimage"</strong> and ensure <strong>"ISO"</strong> is selected in the dropdown.</li>
                            <li>Click the <strong>"..."</strong> button to browse and select the <strong>D-Secure Drive Diagnostic ISO</strong> file you downloaded.</li>
                            <li>Ensure <strong>"USB Drive"</strong> is selected as the Type, and select the correct drive letter/name for your USB.</li>
                            <li>Click <strong>"OK"</strong> to start writing the ISO to the USB.</li>
                            <li>Once complete, you can use this USB to boot the target system for diagnostics.</li>
                        </ol>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                            <p className="text-amber-900 font-semibold mb-1">Important:</p>
                            <p className="text-amber-800 text-sm">Formatting the USB will erase all existing data on it. Please back up any important files before proceeding.</p>
                        </div>
                    </>
                ),
            },
            {
                id: "booting-iso-grub",
                title: "Booting the ISO & GRUB Menu",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Once you have created your bootable USB or configured your PXE server, boot the target machine from it. You will first be greeted by the <strong>GRUB Boot Menu</strong>.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li>Use your keyboard arrow keys to navigate the menu.</li>
                            <li>Select the <strong>D-Secure Drive Diagnostic</strong> option and press <strong>Enter</strong> to proceed.</li>
                        </ul>

                        {/* GRUB Menu Image */}
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550938/rkzj2jojk8dwxghjrrnu.jpg" alt="D-Secure GRUB Boot Menu" />

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                            <p className="text-blue-900 font-semibold mb-1">Loading Process (Please Wait 2-3 Minutes):</p>
                            <p className="text-blue-800 text-sm">
                                After selecting the boot option, the system will begin extracting the ISO and loading the OS into memory. <strong>The system is working in the background, please be patient and wait for at least 2-3 minutes.</strong>
                            </p>
                        </div>

                        <p className="text-slate-700 leading-relaxed mb-4">
                            During this loading period, you will see two different screens. First, an initial loading screen will appear as the system starts unpacking files.
                        </p>

                        {/* First Loading Screen Image */}
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550928/qxfcuu9usdmrcl4hujng.jpg" alt="Initial loading screen" />

                        <p className="text-slate-700 leading-relaxed my-4">
                            Shortly after, this will transition to a <strong>black screen</strong> with system initialization text. This is completely normal behavior and confirms the system is working properly. Once the background loading completes, it will automatically launch the graphical interface.
                        </p>

                        {/* Black Screen Initialization Image */}
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550923/acqj9pseeu9vsriga0dv.jpg" alt="Black loading initialization screen" />
                    </>
                ),
            },
            {
                id: "welcome-screen",
                title: "Welcome Screen & System Summary",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">When the system boots using D-Secure Drive Diagnostic (via USB or PXE), the <strong>Welcome Screen</strong> is displayed. This screen provides an initial overview of your system hardware and serves as the starting point for the testing process.</p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>Product Name & Version</strong> — D-Secure Drive Diagnostic, Boot Edition 1.0.0vbeta</li>
                            <li><strong>Boot Mode</strong> — UEFI or Legacy BIOS</li>
                            <li><strong>Memory</strong> — Total system RAM (e.g., 16 GB DDR4)</li>
                            <li><strong>CPU</strong> — Processor model (e.g., Intel Core i7-9700)</li>
                            <li><strong>Network Status</strong> — Current network connection status</li>
                            <li><strong>License Status</strong> — Connection and offline mode availability</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mb-4">Click the <strong>"Start Diagnostics"</strong> button to begin the hardware detection and testing process.</p>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550924/nsssqabjcgufvzygzkvb.jpg" alt="D-Secure Drive Diagnostic Welcome Screen" />
                    </>
                ),
            },
            {
                id: "hardware-detection",
                title: "Detecting Hardware Components",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">After clicking <strong>"Start Diagnostics"</strong>, the application begins a deep automatic hardware detection process. The system scans all internal buses and external ports.</p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>Core Components</strong> — Identifies CPU architecture, RAM modules, and Motherboard details.</li>
                            <li><strong>Storage & Drives</strong> — Detects all SATA, NVMe, and USB storage devices.</li>
                            <li><strong>Peripherals & Sensors</strong> — Locates Audio cards, Wi-Fi/Bluetooth modules, Webcams, and Fingerprint sensors.</li>
                            <li><strong>I/O Ports</strong> — Enumerates all active USB, HDMI, and Display ports.</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mb-4">A loading spinner with status messages is displayed during this process. The status bar at the bottom shows <strong>"Initializing"</strong> while detection is in progress.</p>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550925/u0cin0vzzogeojzn7puu.jpg" alt="Detecting Hardware Components" />
                    </>
                ),
            },
            {
                id: "network-connection",
                title: "Network Connection Setup",
                children: [
                    {
                        id: "wifi-connection",
                        title: "Connecting via Wi-Fi",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">After hardware detection, a <strong>Network Connection</strong> dialog appears prompting you to connect to the internet for license validation. The Wi-Fi tab displays all available wireless networks.</p>
                                <p className="text-slate-700 leading-relaxed mb-4">Each network entry shows the <strong>network name (SSID)</strong>, <strong>signal strength</strong>, <strong>security status</strong>, and <strong>frequency band</strong> (2.4 GHz or 5 GHz). Click on a network to connect.</p>
                                <p className="text-slate-700 leading-relaxed mb-4">You can also click <strong>"Skip"</strong> to proceed without a network connection and use offline mode instead.</p>
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1773305166/ycdyjanbhcaxulah3unl.png" alt="Network Connection - Wi-Fi Networks" />
                            </>
                        ),
                    },
                    {
                        id: "lan-connection",
                        title: "Connecting via LAN / Ethernet",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">Switch to the <strong>"LAN / Ethernet"</strong> tab for wired connections. This option is ideal for enterprise environments where wired connections are more reliable.</p>
                                <p className="text-slate-700 leading-relaxed mb-4">If no Ethernet cable is detected, click <strong>"Detect LAN Connection"</strong> after plugging in the cable. The system will automatically configure the network using DHCP.</p>
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550923/hjkbxamlo77u5hblqzi1.jpg" alt="Network Connection - LAN / Ethernet" />
                            </>
                        ),
                    },
                ],
            },
            {
                id: "authentication",
                title: "Authentication & Login",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            After network setup, the <strong>Authentication Required</strong> screen appears. Enter your registered <strong>Email Address</strong> and <strong>Password</strong> and click <strong>"Login"</strong> to authenticate. After a successful login, you will be connected to the cloud console, and your license credits (Diagnostics) will be updated.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                            <p className="text-blue-900 font-semibold mb-1">Pro Tip:</p>
                            <p className="text-blue-800 text-sm">If you are logging in for the first time, ensure your internet connection is stable for license synchronization.</p>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4">If you are in an environment where the internet is not available, click <strong>"Continue in Offline Mode"</strong>. You can then follow the offline activation process.</p>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550924/nsssqabjcgufvzygzkvb.jpg" alt="Authentication & Login Interface" />
                    </>
                ),
            },
            {
                id: "offline-activation",
                title: "Offline Activation",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">The <strong>Offline Activation</strong> screen allows you to activate your license without internet. This is essential for air-gapped or secure environments.</p>
                        <div className="space-y-4 mb-4">
                            <p className="text-slate-700"><strong>Step 1 — Your Machine Code:</strong> A unique machine code is generated based on your hardware. Copy this code and send it to <strong>support@dsecuretech.com</strong> to receive your activation response code.</p>
                            <p className="text-slate-700"><strong>Step 2 — Enter Activation Code:</strong> Enter the received activation code and click <strong>"Verify & Activate"</strong> to complete the activation.</p>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4">Click <strong>"Back to Login"</strong> to return to the login screen, or use <strong>"Continue in Offline Mode"</strong> to proceed with limited functionality.</p>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550943/rvbi409vgkporpx4wurd.jpg" alt="Offline Activation" />
                    </>
                ),
            },
        ],
    },
    {
        id: "working",
        title: "Working with D-Secure Drive Diagnostic",
        children: [
            {
                id: "dashboard",
                title: "Dashboard Overview",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">After authentication, the <strong>Dashboard</strong> serves as the main control center, providing a comprehensive overview of system status, license info, and recent activity.</p>
                        <h4 className="text-base font-semibold text-slate-800 mb-3">Dashboard Components:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>Header Bar</strong> — Product name, power/restart icons, user email, remaining diagnostic credits, connection status</li>
                            <li><strong>Left Sidebar</strong> — Quick links to Dashboard, Diagnostics, Reports, Settings, About, and Help</li>
                            <li><strong>Network Connection Card</strong> — Wi-Fi and LAN connection status</li>
                            <li><strong>License Status Card</strong> — Remaining diagnostic credits (e.g., 47/100) with progress bar</li>
                            <li><strong>Last Activity Card</strong> — Most recent diagnostic activity</li>
                            <li><strong>Statistics Card</strong> — Cumulative pass/fail testing statistics</li>
                            <li><strong>Action Buttons</strong> — "Start New Diagnostic" and "View Reports"</li>
                        </ul>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550924/f6zhq9kopnippek1jsqm.jpg" alt="Dashboard Overview" />
                    </>
                ),
            },
            {
                id: "diagnostic-process",
                title: "Diagnostic Testing Process",
                children: [
                    {
                        id: "automated-tests",
                        title: "1. Automated Hardware Diagnostics",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    Once you start the diagnostics, the system first runs a series of <strong>Automated Tests</strong> in the background. These tests require no human intervention and quickly evaluate the core components of the machine.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                                    <li><strong>Core Processing</strong> — Stress tests CPU performance and RAM integrity.</li>
                                    <li><strong>Storage Health</strong> — Reads SMART data to check HDD/SSD health and sector status.</li>
                                    <li><strong>Missing Components</strong> — Automatically flags if a standard component (like a Wi-Fi card or Bluetooth module) is missing or unresponsive.</li>
                                </ul>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    A progress bar will indicate the status of these automated checks. Once they finish, the system seamlessly transitions to the interactive testing phase.
                                </p>
                                {/* TODO: Add your Automated Test Image URL */}
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550929/rpkqbz0jhfectyinzhwu.jpg" alt="Automated Hardware Diagnostics" />
                            </>
                        ),
                    },
                    {
                        id: "interactive-tests",
                        title: "2. Manual & Interactive Testing",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    After the automated checks are complete, the software will prompt you to perform <strong>Manual & Interactive Tests</strong>. These are necessary to verify hardware that requires physical human confirmation.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                                    <li><strong>Keyboard & Touchpad</strong> — Press specific keys and use the touchpad to ensure responsiveness.</li>
                                    <li><strong>Display & Audio</strong> — Check for dead pixels on the screen and confirm if you hear the audio playback.</li>
                                    <li><strong>Sensors & Ports</strong> — Swipe the fingerprint sensor, test the webcam, and insert USBs if prompted.</li>
                                </ul>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                                    <p className="text-amber-900 font-semibold mb-1">Attention:</p>
                                    <p className="text-amber-800 text-sm">Please remain at the console during this phase to manually input your confirmation (e.g., clicking "Pass" or "Fail" if you hear the audio properly).</p>
                                </div>
                                {/* TODO: Add your Interactive Test Image URL */}
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777552878/lchmwhnzrptcwpfnbjvq.jpg" alt="Manual and Interactive Testing" />
                            </>
                        ),
                    },
                    {
                        id: "diagnostic-completion",
                        title: "3. Completion & Report Generation",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    Upon finishing both the automated and manual tests, the system displays the final <strong>Diagnostic Results</strong>, showing exactly what passed, failed, or requires attention.
                                </p>
                                <div className="bg-emerald-50 border-emerald-500 border rounded-lg p-6 mb-6">
                                    <h5 className="text-emerald-800 font-bold mb-2">Diagnostics Completed!</h5>
                                    <p className="text-emerald-700 text-sm">A Tamper-proof audit report with a certificate has been automatically generated detailing the health of all 21+ components. You can view it by clicking the "View Report" button.</p>
                                </div>
                                <p className="text-slate-700 leading-relaxed mb-4">
                                    The final report includes full system details, the tests executed, and the precise pass/fail status of all components. You can save this report locally to a USB drive or upload it directly to the D-Secure Cloud Console.
                                </p>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                                    <p className="text-blue-900 font-semibold mb-1">Report Structure:</p>
                                    <p className="text-blue-800 text-sm">The <strong>first page</strong> serves as the official <strong>Certificate</strong>, while the subsequent pages contain the detailed <strong>Summary</strong> and hardware grading logs.</p>
                                </div>
                                {/* TODO: Add your Completion/Report Image URL */}
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777552879/ud9o1btgyajtwe9maxwe.jpg" alt="Diagnostic Completion and Report" />
                            </>
                        ),
                    },
                ],
            },
            {
                id: "reports",
                title: "Reports & Compliance Proofs",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">The <strong>Reports</strong> section provides a centralized view of all diagnostic compliance reports with certificates and records.</p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>Total Reports Counter</strong> — Total number of reports generated</li>
                            <li><strong>Search Bar</strong> — Filter by Report ID, System Serial, or Model</li>
                            <li><strong>Status Filter</strong> — All Statuses, Completed, Failed, In Progress</li>
                            <li><strong>Reports Table</strong> — Report ID, System Serial, Test Suite, Date, Status, Action</li>
                        </ul>
                        <div className="p-4 bg-slate-50 border rounded-lg mb-6">
                            <p className="text-sm text-slate-600 italic">Note: Reports are cryptographically signed to ensure tamper-proof integrity. The **Certificate (Page 1)** is designed for quick compliance audits, with subsequent pages providing full forensic audit trails of the hardware health.</p>
                        </div>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550947/okrzyl9tgp4tnlhqskba.jpg" alt="Reports Interface" />
                    </>
                ),
            },
            {
                id: "settings",
                title: "Settings & Configuration",
                children: [
                    {
                        id: "general-settings",
                        title: "General Settings",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">The <strong>Settings</strong> page is organized into three tabs: <strong>General</strong>, <strong>Account</strong>, and <strong>Network</strong>.</p>
                                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                                    <li><strong>Language</strong> — Select display language</li>
                                    <li><strong>Appearance / Theme</strong> — Light, Dark (Default Boot), D-Secure Green, D-Secure Light</li>
                                    <li><strong>Defaults</strong> — Default Diagnostic Suite and Test Parameters</li>
                                </ul>
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550938/bp6acykjztzxpyczlogh.jpg" alt="Settings - General" />
                                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-3">Default Diagnostic Suite:</h4>
                                <p className="text-slate-700 leading-relaxed mb-4">Scroll down to set default test parameters that will be pre-selected for every new diagnostic session.</p>
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550938/bp6acykjztzxpyczlogh.jpg" alt="Settings - Default Diagnostic Suite" />
                            </>
                        ),
                    },
                    {
                        id: "account-settings",
                        title: "Account Settings",
                        content: (
                            <>
                                <p className="text-slate-700 leading-relaxed mb-4">The <strong>Account</strong> tab allows you to manage your user profile and license information. You can see how many diagnostic credits have been used and how many remain.</p>
                                <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550924/pykrec7icyfecmvu591a.jpg" alt="Settings - Account" />

                                <h4 className="text-base font-semibold text-slate-800 mt-12 mb-4">Reports & Settings - Product Screenshots</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-slate-700 mb-2 text-sm font-medium">Reports Dashboard:</p>
                                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550947/okrzyl9tgp4tnlhqskba.jpg" alt="Reports Interface" />
                                    </div>
                                    <div>
                                        <p className="text-slate-700 mb-2 text-sm font-medium">General Settings:</p>
                                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550948/gg2k1hevoqxpxmp5075b.jpg" alt="General Settings" />
                                    </div>
                                    <div>
                                        <p className="text-slate-700 mb-2 text-sm font-medium">Help Documentation:</p>
                                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550942/hkph9nbomleo05fsvha2.jpg" alt="Help Page Interface" />
                                    </div>
                                    <div>
                                        <p className="text-slate-700 mb-2 text-sm font-medium">Software Details (About):</p>
                                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550944/uzyf0zjt6xaisdgze1eb.jpg" alt="About Interface" />
                                    </div>
                                </div>
                            </>
                        ),
                    },
                ],
            },
            {
                id: "about-page",
                title: "About — Product & System Information",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">The <strong>About</strong> page provides detailed product and system hardware information.</p>
                        <h4 className="text-base font-semibold text-slate-800 mb-3">Product Information:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>Product</strong> — D-Secure Drive Diagnostic</li>
                            <li><strong>Edition</strong> — Boot Edition</li>
                            <li><strong>Version</strong> — 1.0.0vbeta</li>
                            <li><strong>License Type</strong> — Hardware Diagnostic</li>
                        </ul>
                        <h4 className="text-base font-semibold text-slate-800 mb-3">System Hardware:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>CPU</strong> — Intel Core i7-9700 @ 3.00GHz</li>
                            <li><strong>Memory</strong> — 16 GB DDR4</li>
                            <li><strong>Firmware Mode</strong> — UEFI</li>
                        </ul>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550944/uzyf0zjt6xaisdgze1eb.jpg" alt="About Page" />
                    </>
                ),
            },
            {
                id: "help-page",
                title: "Help — User Manual & Documentation",
                content: (
                    <>
                        <p className="text-slate-700 leading-relaxed mb-4">The <strong>Help</strong> page serves as a built-in documentation center with a search bar and expandable topic sections.</p>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                            <li><strong>Getting Started</strong> — Boot environment, hardware detection, login</li>
                            <li><strong>Diagnostic Process</strong> — Step-by-step guide for testing 21 components</li>
                            <li><strong>Compliance & Reporting</strong> — Pass/Fail logs and certificates</li>
                            <li><strong>Reports & Compliance Documents</strong> — Managing reports</li>
                            <li><strong>Configuration & Settings</strong> — Customizing diagnostic preferences</li>
                            <li><strong>Troubleshooting</strong> — Common hardware test issues</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mb-4">For additional help: <strong>support@dsecure.io</strong> and <strong>docs.dsecure.io</strong>.</p>
                        <ImageManual src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1777550942/hkph9nbomleo05fsvha2.jpg" alt="Help Page - Top" />
                    </>
                ),
            },
        ],
    },
    {
        id: "contact",
        title: "Contact & Support",
        content: (
            <div className="text-slate-700 leading-relaxed">
                <p className="mb-2"><strong>Email:</strong> support@dsecuretech.com</p>
                <p className="mb-2"><strong>Website:</strong> www.dsecuretech.com</p>
                <p className="mb-2"><strong>Documentation:</strong> docs.dsecure.io</p>
                <p><strong>Support Hours:</strong> 24/7 Business Hours</p>
            </div>
        ),
    },
];

/* ===========================
   UI Components & Helpers
   =========================== */
const Anchor: React.FC<{ id: string }> = ({ id }) => (
    <div id={id} className="relative -top-24" />
);

const useScrollToHash = () => {
    useEffect(() => {
        const { hash } = globalThis.location;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);
};

const SidebarItem: React.FC<{ item: NavItem; activeSection: string; onJump: (id: string) => void; level?: number }> = ({ item, activeSection, onJump, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeSection === item.id;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="text-sm">
            <button
                className={`flex items-center w-full text-left gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`}
                style={{ paddingLeft: `${(level * 12) + 12}px` }}
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); onJump(`#${item.id}`); if (hasChildren) setIsExpanded(!isExpanded); }}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onJump(`#${item.id}`); if (hasChildren) setIsExpanded(!isExpanded); } }}
            >
                {hasChildren && (
                    <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); setIsExpanded(!isExpanded); } }}
                        className="p-0.5 hover:bg-gray-200 rounded"
                    >
                        {isExpanded ? <ChevronRight className="w-3.5 h-3.5 rotate-90 transition-transform" /> : <ChevronRight className="w-3.5 h-3.5 transition-transform" />}
                    </span>
                )}
                {!hasChildren && <span className="w-3.5" />}
                <span className="flex-1 break-words">{item.title}</span>
            </button>
            {hasChildren && isExpanded && (
                <div className="mt-1 border-l border-gray-200 ml-6">
                    {item.children!.map(child => (<SidebarItem key={child.id} item={child} activeSection={activeSection} onJump={onJump} level={level + 1} />))}
                </div>
            )}
        </div>
    );
};

const ContentSection: React.FC<{ item: NavItem; level?: number }> = ({ item, level = 0 }) => (
    <section className="scroll-mt-24 mb-12">
        <Anchor id={item.id} />
        <div className={`mb-6 ${level === 0 ? 'pb-4 border-b-2 border-gray-200' : ''}`}>
            <div className="flex items-center gap-3">
                {(() => {
                    let headingClass = 'text-xl font-medium text-gray-800 mt-6';
                    if (level === 0) headingClass = 'text-3xl font-bold text-gray-900';
                    else if (level === 1) headingClass = 'text-2xl font-semibold text-gray-800 mt-8';

                    const HeadingTag = level === 0 ? 'h2' : level === 1 ? 'h3' : 'h4';
                    return (
                        <HeadingTag className={headingClass}>
                            {item.title}
                        </HeadingTag>
                    );
                })()}
            </div>
        </div>
        {item.content && (
            <div className="text-gray-700 text-base leading-relaxed space-y-4 prose prose-blue max-w-none">{item.content}</div>
        )}
        {item.children && (
            <div className="space-y-8 mt-6">
                {item.children.map(child => (<ContentSection key={child.id} item={child} level={level + 1} />))}
            </div>
        )}
    </section>
);

/* ===========================
   Main Component
   =========================== */
const CompleteDSecureDaignosticManual: React.FC = () => {
    useScrollToHash();
    const [activeSection, setActiveSection] = useState("");
    const [shouldShowScrollTop, setShouldShowScrollTop] = useState(false);
    const contentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setShouldShowScrollTop(globalThis.scrollY > 400);
            const headingElements = document.querySelectorAll('[id]');
            let currentSection = "";
            headingElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= 300) currentSection = el.id;
            });
            if (currentSection) setActiveSection(currentSection);
        };
        globalThis.addEventListener("scroll", handleScroll);
        return () => globalThis.removeEventListener("scroll", handleScroll);
    }, []);

    const onJump = (hash: string) => {
        const el = document.querySelector(hash);
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); setActiveSection(hash.replace('#', '')); }
    };

    const scrollToTop = () => globalThis.scrollTo({ top: 0, behavior: 'smooth' });
    const handleDownloadPDF = () => globalThis.print();

    const handleDownloadEditable = () => {
        const content = contentRef.current;
        if (!content) { alert('Content not found!'); return; }
        const clone = content.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('button, .pdf-hide-btn, aside, nav, thead, tfoot, .print-watermark').forEach(el => el.remove());
        const images = clone.querySelectorAll('img');
        images.forEach(img => { img.style.maxWidth = '100%'; img.style.height = 'auto'; if (img.src.startsWith('/')) img.src = globalThis.location.origin + img.src; });
        const watermarkUrl = globalThis.location.origin + '/company-logo.png';
        const htmlContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><title>D-Secure Drive Diagnostic - User Manual</title><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]--><style>body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:12pt;line-height:1.6;color:#1a1a1a;padding:20px 40px}h1{font-size:24pt;font-weight:bold;color:#111827;margin-top:30px;margin-bottom:12px}h2{font-size:18pt;font-weight:bold;color:#1f2937;margin-top:24px;margin-bottom:10px}h3{font-size:14pt;font-weight:bold;color:#374151;margin-top:18px;margin-bottom:8px}h4,h5,h6{font-size:12pt;font-weight:bold;color:#4b5563;margin-top:14px;margin-bottom:6px}p{margin:6px 0}ul,ol{margin:8px 0;padding-left:24px}li{margin:4px 0}img{max-width:100%;height:auto;display:block;margin:10px auto}a{color:#2563eb}.watermark{position:fixed;top:10px;right:10px;width:60px;height:60px;opacity:0.08;z-index:-1}@page{size:A4;margin:20mm 15mm}</style></head><body><img src="${watermarkUrl}" class="watermark" alt="" />${clone.innerHTML}</body></html>`;
        const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'D-Secure_System_Diagnostic_User_Manual.doc'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SEOHead seo={getSEOForPage("support/help-manual/complete-diagnostic-manual")} />
            <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        html { scroll-behavior: smooth; }
        @media print {
          @page { margin: 0; }
          header, footer, aside, nav, .pdf-hide-btn, button, [class*="fixed"], [class*="sticky"], .min-h-dvh > footer { display: none !important; }
          html, body { background: white !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          .min-h-screen, .min-h-dvh { min-height: auto !important; background: white !important; }
          .container { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .flex.gap-8 { display: block !important; }
          .flex-1 { flex: none !important; }
          main { width: 100% !important; max-width: 100% !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; margin: 0 !important; padding: 0 12mm 0 12mm !important; overflow: hidden !important; box-sizing: border-box !important; }
          main *, main *::before, main *::after { box-sizing: border-box !important; max-width: 100% !important; }
          main p, main li, main span, main div, main td, main th { overflow-wrap: break-word !important; word-break: break-word !important; }
          .space-y-16 > * + * { margin-top: 1rem !important; }
          .space-y-8 > * + * { margin-top: 0.5rem !important; }
          .space-y-6 > * + * { margin-top: 0.4rem !important; }
          .space-y-4 > * + * { margin-top: 0.3rem !important; }
          .space-y-2 > * + * { margin-top: 0.15rem !important; }
          .mb-12 { margin-bottom: 0.75rem !important; }
          .mb-8 { margin-bottom: 0.5rem !important; }
          .mb-6 { margin-bottom: 0.4rem !important; }
          .mb-4 { margin-bottom: 0.3rem !important; }
          .mt-20 { margin-top: 0.75rem !important; }
          .mt-10, .mt-8 { margin-top: 0.5rem !important; }
          .pb-8 { padding-bottom: 0.5rem !important; }
          .pt-8 { padding-top: 0.5rem !important; }
          .py-8 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
          .p-8 { padding: 0.5rem !important; }
          .p-12 { padding: 0.75rem !important; }
          .gap-8 { gap: 0.5rem !important; }
          .leading-relaxed { line-height: 1.5 !important; }
          h1 { margin-top: 40px !important; margin-bottom: 12px !important; page-break-after: avoid !important; }
          h2 { margin-top: 32px !important; margin-bottom: 10px !important; page-break-after: avoid !important; }
          h3 { margin-top: 24px !important; margin-bottom: 8px !important; page-break-after: avoid !important; }
          h4, h5, h6 { margin-top: 16px !important; margin-bottom: 6px !important; page-break-after: avoid !important; }
          img { display: block !important; max-width: 85% !important; width: auto !important; height: auto !important; margin: 10px auto !important; page-break-inside: avoid !important; object-fit: contain !important; }
          section { page-break-inside: auto !important; }
          table, figure { page-break-inside: avoid !important; }
          .print-header-logo { display: block !important; position: fixed !important; top: 5mm !important; left: 10mm !important; width: 140px !important; height: auto !important; max-width: 140px !important; opacity: 1 !important; z-index: 10 !important; pointer-events: none !important; margin: 0 !important; background: white !important; padding: 2px 6px !important; }
          .print-center-watermark { display: block !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 400px !important; height: auto !important; max-width: 400px !important; opacity: 0.08 !important; z-index: 0 !important; pointer-events: none !important; margin: 0 !important; }
          .print-product-logo { display: block !important; margin: 0 !important; max-width: 160px !important; }
        }
      `}</style>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <aside className="hidden lg:block lg:w-72 shrink-0">
                        <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto sidebar-scroll pr-2">
                            <div className="mb-6">
                                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Table of Contents</h3>
                                <nav className="space-y-1">
                                    {navigationTree.map((item) => (
                                        <SidebarItem key={item.id} item={item} activeSection={activeSection} onJump={onJump} />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    <main ref={contentRef} className="flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12">
                        <img src="/company-logo.png" alt="" className="print-header-logo hidden" />
                        <img src="/company-logo.png" alt="" className="print-center-watermark hidden" />

                        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                            <thead className="hidden print:table-header-group">
                                <tr><th className="p-0 border-none font-normal"><div style={{ height: '96px' }} /></th></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-0 border-none align-top w-full">
                                        <div className="mb-12 pb-8 border-b border-gray-200">
                                            <div className="flex items-start justify-between gap-6">
                                                <div>
                                                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">D-Secure Drive Diagnostic</h1>
                                                    <p className="text-xl text-gray-500">Complete User Guide & Documentation</p>
                                                </div>
                                                <img src="/product-logo.png" alt="D-Secure Drive Diagnostic" className="hidden print-product-logo shrink-0 w-40 h-auto rounded-2xl shadow-lg" />
                                            </div>
                                        </div>

                                        <div className="space-y-16">
                                            {navigationTree.map(item => (<ContentSection key={item.id} item={item} />))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot className="hidden print:table-footer-group">
                                <tr><td className="p-0 border-none"><div style={{ height: '17px' }} /></td></tr>
                            </tfoot>
                        </table>
                    </main>
                </div>
            </div>

            <button onClick={scrollToTop} className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 z-50 ${shouldShowScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
};

export default CompleteDSecureDaignosticManual;