import React, { useState, memo, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "@/utils/seo";
import { showInfoToast } from "@/utils/toast";
import { Monitor, Laptop, Terminal, Cpu, Download, ChevronDown, Copy, Check, ShieldCheck, Info, HardDrive, SearchCheck, File } from "lucide-react";
import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeIconContainer, themeClasses } from "@/components/ui/Theme";
import { fetchLatestUpdate, EnhancedUpdateResponse } from "@/services/updatesAPI";
// --- Types Definitions (Best Practice for maintainability) ---
interface DownloadInfo {
    url: string;
    filename: string;
    size: string;
    arch: string;
    sha256?: string;
}

interface ProductDownloads {
    windowsAmd?: DownloadInfo;
    windows?: DownloadInfo;
    macos: DownloadInfo;
    linux: DownloadInfo;
}

interface Product {
    id: string;
    name: string;
    subtitle: string;
    description: string;
}

// --- Static Data (Moved outside component to prevent recreation on every render) ---
// Yahan hum sab products aur unke descriptions define karte hain
const PRODUCTS: Product[] = [
  {
    id: "drive-eraser",
    name: "Drive Eraser",
    subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
    description: "Complete Hard Drive & SSD Erasure with Enterprise-Grade Security Standards",
  },
  {
    id: "drive-eraser-diagnostic",
    name: "Drive Eraser Diagnostic",
    subtitle: "Hardware Diagnostic Tool",
    description: "Enterprise-grade hardware diagnostics for hard drives and SSDs before erasure.",
  },
  {
    id: "file-eraser",
    name: "File Eraser",
    subtitle: "Erase Files, Folders & Volumes",
    description: "Secure File, Folder & Application Trace Elimination",
  },
];

// Yahan har OS ke liye download links define kiye gaye hain
const DOWNLOAD_LINKS: Record<string, ProductDownloads> = {
  "drive-eraser": {
    windowsAmd: {
      url:
        import.meta.env.VITE_DRIVE_ERASER_ISO_DOWNLOAD_LINK ||
        `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/x64x86/Drive%20Eraser/D-Secure-Drive-Eraser(v1.0.0x64-arch-amd).iso`,
      filename: "D-Secure-Drive-Eraser-x64.iso",
      size: "450 MB",
      arch: "x64x86 (ISO Image)",
    },
    macos: {
      url:
        import.meta.env.VITE_DRIVE_ERASER_ISO_DOWNLOAD_LINK ||
        `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/x64x86/Drive%20Eraser/D-Secure-Drive-Eraser(v1.0.0x64-arch-amd).iso`,
      filename: "D-Secure-Drive-Eraser-x64.iso",
      size: "450 MB",
      arch: "x64x86 (ISO Image)",
    },
    linux: {
      url: `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/drive-eraser-diagnostic-x64-v1/D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso`,
      filename: "D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso",
      size: "Less than 1 GB",
      arch: "x64 (ISO Image)",
      sha256:
        "4032b90a67fd9556b8ba82af8f3581a328385d7c03f34d33332705f3eb0a7af4",
    },
  },
  "drive-eraser-diagnostic": {
    windowsAmd: {
      url:
        import.meta.env.VITE_DRIVE_ERASER_DIAGNOSTIC_ISO_DOWNLOAD_LINK ||
        `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/drive-eraser-diagnostic-x64-v1/D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso`,
      filename: "D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso",
      size: "Less than 1 GB",
      arch: "x64 (ISO Image)",
      sha256:
        "4032b90a67fd9556b8ba82af8f3581a328385d7c03f34d33332705f3eb0a7af4",
    },
    macos: {
      url:
        import.meta.env.VITE_DRIVE_ERASER_DIAGNOSTIC_ISO_DOWNLOAD_LINK ||
        `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/drive-eraser-diagnostic-x64-v1/D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso`,
      filename: "D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso",
      size: "Less than 1 GB",
      arch: "x64 (ISO Image)",
      sha256:
        "4032b90a67fd9556b8ba82af8f3581a328385d7c03f34d33332705f3eb0a7af4",
    },
    linux: {
      url: `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/drive-eraser-diagnostic-x64-v1/D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso`,
      filename: "D-SECURE-DRIVE-ERASER-DIAGNOSTICS-x64-v1.0.0.0.iso",
      size: "Less than 1 GB",
      arch: "x64 (ISO Image)",
      sha256:
        "4032b90a67fd9556b8ba82af8f3581a328385d7c03f34d33332705f3eb0a7af4",
    },
  },
  "file-eraser": {
    windows: {
      url: `${import.meta.env.VITE_DOWNLOADS_BASE_URL}/windows/D-Secure_Eraser_Setup_v1_1_0_1.exe`,
      filename: "D-Secure_Eraser_Setup_v1_1_0_1.exe",
      size: "600 MB",
      arch: "64-bit",
      sha256:
        "5cf39efc466b36a6421e17cf64a5410e27112c6969047e230cf24ec91667f4a4",
    },
    macos: {
      url: "#",
      filename: "D-SecureFileEraser.dmg",
      size: "38 MB",
      arch: "Intel & Apple Silicon",
    },
    linux: {
      url: "#",
      filename: "d-secure-file-eraser.deb",
      size: "28 MB",
      arch: "64-bit (Ubuntu/Debian)",
    },
  },
};

// Icons imported from lucide-react above

const DownloadPage: React.FC = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] =
    useState<string>("drive-eraser");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [latestUpdate, setLatestUpdate] = useState<EnhancedUpdateResponse | null>(null);

  // Backend se latest update data fetch karo (hardcoded DSErase)
  useEffect(() => {
    let isMounted = true;
    const fetchUpdates = async () => {
      // Hardcoded 'DSErase' pass kiya gaya hai as per request
      const data = await fetchLatestUpdate("DSErase");
      if (isMounted && data) {
        setLatestUpdate(data);
      }
    };
    fetchUpdates();
    return () => { isMounted = false; };
  }, []);

  // Initial load logic
  useEffect(() => {
    const productParam = searchParams.get("product");
    const validProducts = PRODUCTS.map((p) => p.id);
    if (productParam && validProducts.includes(productParam)) {
      setSelectedProduct(productParam);
    }
  }, [searchParams]);

  // Derived state (Efficient way to get current data)
  const currentProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedProduct) || PRODUCTS[0],
    [selectedProduct],
  );

  const currentDownloads = useMemo(() => {
    const baseDownloads = DOWNLOAD_LINKS[selectedProduct];
    
    // Agar API se latest version aaya hai aur product file-eraser hai toh link dynamically set karo
    // (Kyunki humne DSErase hardcode fetch kiya hai)
    if (latestUpdate && selectedProduct === "file-eraser") {
      const ext = latestUpdate.download_link.split('.').pop() || 'exe';
      const cleanVersion = latestUpdate.version_number.replace(/\./g, '_');
      
      const filename = `D-Secure_Eraser_Setup_v${cleanVersion}.${ext}`;

      if (baseDownloads.windows) {
        return {
          ...baseDownloads,
          windows: {
            ...baseDownloads.windows,
            url: latestUpdate.download_link,
            filename: filename,
          }
        };
      }
    }
    
    return baseDownloads;
  }, [selectedProduct, latestUpdate]);

  // Handle Tab Change
  const handleProductChange = useCallback(
    (productId: string) => {
      setSelectedProduct(productId);
      setOpenDropdown(null); // Close dropdowns on product switch
      navigate(`/download?product=${productId}`, { replace: true });
    },
    [navigate],
  );

  // --- Core Logic for Download without Reload ---
  const handleDownload = useCallback(
    (osKey: keyof ProductDownloads, e: React.MouseEvent) => {
      // 1. Prevent Default Behavior (Important to stop reload)
      e.preventDefault();
      e.stopPropagation();

      const downloadInfo = currentDownloads[osKey];

      if (downloadInfo && downloadInfo.url && downloadInfo.url !== "#") {
        // 2. Create a temporary link element
        const link = document.createElement("a");
        link.href = downloadInfo.url;

        // 3. Set download attribute (forces browser to treat as download)
        link.setAttribute("download", downloadInfo.filename);

        // 4. Append, Click, Remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback for missing links
        console.warn("Download link missing or invalid");
        showInfoToast("This version will be available soon. Stay tuned!");
      }

      // Close dropdown after selection
      setOpenDropdown(null);
    },
    [currentDownloads],
  );

  // Dropdown Toggler
  const toggleDropdown = useCallback((key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const currentSha256 = currentDownloads.windows?.sha256 || currentDownloads.windowsAmd?.sha256 || currentDownloads.linux?.sha256;

  return (
    <>
      <SEOHeadNative seo={getSEOForPage("download")} />

      <ThemeSection>
        <div className="container mx-auto px-4 xs:px-6 sm:px-6 md:px-8 max-w-7xl">
          {/* Header */}
          <ThemeSectionHeading centered subtitle="Choose your operating system and download our enterprise-grade data erasure software. Works on Windows, macOS, and Linux.">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4ede4] text-[#0e7c66] rounded-full text-sm font-bold border border-[#0e7c66]/20 mb-4 align-middle">
              <Download className="w-4 h-4" />
              FREE DOWNLOAD
            </span><br/>
            Download D-Secure Software
          </ThemeSectionHeading>

          {/* Custom Installer Note */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-[#f4fbf8] border-l-4 border-[#0e7c66] p-4 flex items-start gap-3">
              <Info className="text-[#0e7c66] w-6 h-6 shrink-0" />
              <p className="text-[#0a2e1e] font-medium pt-0.5">
                For custom installer setup, please contact the support team.
              </p>
            </div>
          </div>

          {/* Product Selection Tabs */}
          <div className="flex justify-center mb-12">
            <div className="border-b border-[#d0d5dc]/80 w-full overflow-x-auto">
              <div className="flex space-x-6 sm:space-x-10 min-w-max px-2 justify-center">
                {PRODUCTS.map((product) => {
                  const isActive = selectedProduct === product.id;
                  let Icon = HardDrive;
                  if (product.id === "drive-eraser-diagnostic") Icon = SearchCheck;
                  else if (product.id === "file-eraser") Icon = File;

                  return (
                    <button
                      key={product.id}
                      onClick={() => handleProductChange(product.id)}
                      className={`pb-3 font-bold text-base sm:text-lg transition-all duration-200 border-b-4 whitespace-nowrap flex items-center gap-2 ${
                        isActive
                          ? "border-[#0e7c66] text-[#0e7c66]"
                          : "border-transparent text-[#2d3748] hover:text-[#0e7c66]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {product.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Download Card */}
          <ThemeCard className="max-w-4xl mx-auto mb-8 p-0" interactive={false}>
            <div className="p-6 md:p-10 border-b border-[#d0d5dc]/60">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 flex items-center justify-center bg-[#f4fbf8] rounded-none shrink-0 border border-[#0e7c66]/20">
                  <ThemeIconContainer
                    icon={
                      selectedProduct === "drive-eraser-diagnostic"
                        ? SearchCheck
                        : selectedProduct === "file-eraser"
                        ? File
                        : HardDrive
                    }
                    size="lg"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-[#0a2e1e] mb-2">
                    D-Secure {currentProduct.name}
                  </h2>
                  <p className="text-[#5a6672] mb-1">
                    {currentProduct.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#d0d5dc]/60 bg-[#f4fbf8]">
              {/* --- WINDOWS BUTTON --- */}
              <div className="relative group">
                <button
                  onClick={(e) =>
                    selectedProduct.includes("drive-eraser")
                      ? toggleDropdown("windows-drive", e)
                      : handleDownload("windows", e)
                  }
                  type="button"
                  className="w-full flex flex-col items-center p-8 hover:bg-white transition-colors duration-150 h-full"
                >
                  <ThemeIconContainer icon={selectedProduct.includes("drive-eraser") ? Cpu : Monitor} size="lg" className="mb-4" />
                  <h3 className={themeClasses.typography.cardTitle}>
                    {selectedProduct.includes("drive-eraser")
                      ? "x64 Architecture"
                      : "Windows"}
                  </h3>
                  <p className={`${themeClasses.typography.cardBody} text-sm mb-4`}>
                    {selectedProduct.includes("drive-eraser")
                      ? "AMD/Intel (x64x86)"
                      : "x64 & ARM64"}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[#0e7c66] font-bold text-sm tracking-wide uppercase">
                    <Download className="w-4 h-4" />
                    Download
                    {selectedProduct.includes("drive-eraser") && <ChevronDown className="w-4 h-4 ml-1" />}
                  </div>
                </button>

                {/* Windows Dropdown (Only for Drive Eraser) */}
                {openDropdown === "windows-drive" && (
                  <DropdownMenu>
                    <DropdownItem
                      title="AMD/Intel (x64x86)"
                      subtitle="For standard PCs"
                      onClick={(e) => handleDownload("windowsAmd", e)}
                      size={currentDownloads.windowsAmd?.size}
                    />
                  </DropdownMenu>
                )}
              </div>

              {/* --- macOS BUTTON --- */}
              <div className="relative group">
                <button
                  onClick={(e) => {
                    if (currentDownloads.macos?.url === "#") {
                      e.preventDefault();
                      e.stopPropagation();
                      showInfoToast("macOS version will be available soon. Stay tuned!");
                    } else {
                      toggleDropdown("macos", e);
                    }
                  }}
                  type="button"
                  className="w-full flex flex-col items-center p-8 hover:bg-white transition-colors duration-150 h-full"
                >
                  <ThemeIconContainer icon={selectedProduct.includes("drive-eraser") ? Cpu : Laptop} size="lg" className="mb-4" />
                  <h3 className={themeClasses.typography.cardTitle}>
                    {selectedProduct.includes("drive-eraser")
                      ? "x86 Architecture"
                      : "macOS"}
                  </h3>
                  <p className={`${themeClasses.typography.cardBody} text-sm mb-4`}>
                    {selectedProduct.includes("drive-eraser")
                      ? "AMD/Intel (x64x86)"
                      : "Intel & Apple Silicon"}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[#0e7c66] font-bold text-sm tracking-wide uppercase">
                    <Download className="w-4 h-4" />
                    Download
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                </button>

                {openDropdown === "macos" && (
                  <DropdownMenu>
                    <DropdownItem
                      title={
                        selectedProduct.includes("drive-eraser")
                          ? "AMD/Intel (x64x86)"
                          : "Universal Installer"
                      }
                      subtitle={
                        selectedProduct.includes("drive-eraser")
                          ? "For standard PCs"
                          : "For Intel & M1/M2/M3"
                      }
                      onClick={(e) => handleDownload("macos", e)}
                      size={currentDownloads.macos.size}
                    />
                  </DropdownMenu>
                )}
              </div>

              {/* --- LINUX BUTTON --- */}
              <div className="relative group">
                <button
                  onClick={(e) => {
                    if (currentDownloads.linux?.url === "#") {
                      e.preventDefault();
                      e.stopPropagation();
                      showInfoToast("Linux version will be available soon. Stay tuned!");
                    } else {
                      toggleDropdown("linux", e);
                    }
                  }}
                  type="button"
                  className="w-full flex flex-col items-center p-8 hover:bg-white transition-colors duration-150 h-full"
                >
                  <ThemeIconContainer icon={selectedProduct.includes("drive-eraser") ? Cpu : Terminal} size="lg" className="mb-4" />
                  <h3 className={themeClasses.typography.cardTitle}>
                    {selectedProduct.includes("drive-eraser")
                      ? "ARM Architecture"
                      : "Linux"}
                  </h3>
                  <p className={`${themeClasses.typography.cardBody} text-sm mb-4`}>
                    {selectedProduct.includes("drive-eraser")
                      ? "AMD/Intel (x64x86)"
                      : "DEB & RPM"}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[#0e7c66] font-bold text-sm tracking-wide uppercase">
                    <Download className="w-4 h-4" />
                    Download
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                </button>

                {openDropdown === "linux" && (
                  <DropdownMenu>
                    <DropdownItem
                      title={
                        selectedProduct.includes("drive-eraser")
                          ? "AMD/Intel (x64x86)"
                          : ".DEB Package"
                      }
                      subtitle={
                        selectedProduct.includes("drive-eraser")
                          ? "For standard PCs"
                          : "For Ubuntu, Debian, Mint"
                      }
                      onClick={(e) => handleDownload("linux", e)}
                      size={currentDownloads.linux.size}
                    />
                    {/* Add RPM logic here if URL is different, currently mapping both to 'linux' key */}
                  </DropdownMenu>
                )}
              </div>
            </div>
            
            {/* --- SHA256 Verification Section --- */}
            {currentSha256 && (
              <div className="p-6 md:p-10 border-t border-[#d0d5dc]/60 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <ThemeIconContainer icon={ShieldCheck} size="md" />
                  <div>
                    <h3 className={themeClasses.typography.cardTitle + " !mb-1"}>File Integrity Verification</h3>
                    <p className={themeClasses.typography.cardBody + " text-sm"}>Ensure your download is authentic and has not been tampered with.</p>
                  </div>
                </div>

                <div className="bg-[#f4fbf8] p-6 border border-[#d0d5dc]/60 rounded-none relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-[#0e7c66] animate-pulse"></span>
                      <span className="text-xs font-bold text-[#0a2e1e] uppercase tracking-widest">SHA256 Checksum</span>
                    </div>
                    <CopyButton text={currentSha256} />
                  </div>
                  
                  <div className="font-mono text-sm md:text-base text-[#0e7c66] break-all leading-relaxed bg-white p-4 border border-[#d0d5dc]/60 select-all">
                    {currentSha256}
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#5a6672]">
                    <Info className="w-4 h-4 shrink-0" />
                    Compare this hash with your downloaded file using 'certutil -hashfile filename SHA256' or similar tools.
                  </div>
                </div>
              </div>
            )}
          </ThemeCard>
        </div>
      </ThemeSection>
    </>
  );
});

// --- Helper Component for Copy Logic ---
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all duration-150 rounded-none border-2 ${
        copied 
          ? 'bg-[#0e7c66] text-white border-[#0e7c66]' 
          : 'bg-white text-[#0a2e1e] border-[#0a2e1e] hover:bg-[#0e7c66]/10'
      }`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          COPIED TO CLIPBOARD
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          COPY HASH
        </>
      )}
    </button>
  );
};

// --- Helper Components for Cleaner JSX ---

const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="absolute top-full left-0 right-0 mt-0 z-20">
        <div className="bg-white border-2 border-[#0e7c66] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {children}
        </div>
    </div>
);

const DropdownItem: React.FC<{ 
    title: string; 
    subtitle: string; 
    size?: string;
    onClick: (e: React.MouseEvent) => void 
}> = ({ title, subtitle, size, onClick }) => (
    <button
        onClick={onClick}
        type="button"
        className="w-full px-6 py-4 text-left hover:bg-[#f4fbf8] transition-colors border-b border-[#d0d5dc]/60 last:border-0 flex items-center justify-between group rounded-none"
    >
        <div>
            <p className="font-bold text-[#0a2e1e] group-hover:text-[#0e7c66] transition-colors">{title}</p>
            <div className="flex gap-2 mt-1">
                <p className="text-xs text-[#5a6672]">{subtitle}</p>
                {size && <p className="text-xs font-bold text-[#0e7c66]">({size})</p>}
            </div>
        </div>
        <Download className="w-5 h-5 text-[#0a2e1e] group-hover:text-[#0e7c66]" />
    </button>
);

DownloadPage.displayName = "DownloadPage";

export default DownloadPage;