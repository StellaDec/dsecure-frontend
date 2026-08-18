// Internal linking component — related products ke beech SEO link equity distribute karta hai
import React from "react";
import { Link } from "react-router-dom";
import { ThemeSection, ThemeSectionHeading, ThemeIconContainer } from "./ui/Theme";
import {
  HardDrive,
  ShieldCheck,
  Activity,
  FileText,
  File,
  Globe,
  Smartphone,
  Search,
  Building2,
  Cloud,
  Usb,
  ScanSearch,
  Snowflake,
  ArrowLeftRight,
  Monitor,
  BarChart3,
} from "lucide-react";

// Lucide icon type use karna emoji ki jagah
interface RelatedProduct {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

export interface ProductInternalLinksProps {
  heading?: string;
  links?: RelatedProduct[];
  currentProduct?: string;
}

// Har product ke liye predefined link map with Lucide icons
export const PRODUCT_LINKS: Record<string, RelatedProduct> = {
  "drive-eraser": {
    href: "/products/drive-eraser",
    label: "Drive Eraser",
    description: "NIST 800-88 compliant HDD & SSD secure erasure",
    icon: HardDrive,
  },
  "drive-verifier": {
    href: "/products/drive-verifier",
    label: "Drive Verifier",
    description: "Post-erasure verification — confirm zero data traces",
    icon: ShieldCheck,
  },
  "hardware-diagnostics": {
    href: "/products/hardware-diagnostics",
    label: "Hardware Diagnostics",
    description: "50+ automated PC & server health tests",
    icon: Activity,
  },
  "file-eraser": {
    href: "/products/file-eraser",
    label: "File Eraser",
    description: "Secure file & folder shredding beyond Recycle Bin",
    icon: File,
  },
  "file-eraser-network": {
    href: "/products/file-eraser-network",
    label: "File Eraser Network",
    description: "Centralized enterprise network data sanitization",
    icon: Globe,
  },
  "smartphone-eraser": {
    href: "/products/smartphone-eraser",
    label: "Smartphone Eraser",
    description: "compliant iOS & Android mobile data wipe",
    icon: Smartphone,
  },
  "smartphone-diagnostic": {
    href: "/products/smartphone-diagnostic",
    label: "Smartphone Diagnostic",
    description: "60+ automated hardware tests for mobile devices",
    icon: Search,
  },
  "lun-eraser": {
    href: "/products/lun-eraser",
    label: "LUN Eraser",
    description: "SAN & NAS active storage array sanitization",
    icon: Building2,
  },
  "virtual-machine-eraser": {
    href: "/products/virtual-machine-eraser",
    label: "VM Eraser",
    description: "VMware, Hyper-V & cloud VM data deletion",
    icon: Cloud,
  },
  "removable-media-eraser": {
    href: "/products/removable-media-eraser",
    label: "Removable Media Eraser",
    description: "Secure USB, SD card & flash drive wiping",
    icon: Usb,
  },
  "forensic-imaging": {
    href: "/products/forensic-imaging",
    label: "Forensic Imaging",
    description: "Bit-for-bit drive clone & evidence capture",
    icon: ScanSearch,
  },
  "freeze-state": {
    href: "/products/freeze-state",
    label: "Freeze State",
    description: "Deep Freeze alternative for Windows workstations",
    icon: Snowflake,
  },
  "data-migration": {
    href: "/products/data-migration",
    label: "Data Migration",
    description: "Secure bit-perfect file transfer & system migration",
    icon: ArrowLeftRight,
  },
  "asset-reimaging": {
    href: "/products/asset-reimaging",
    label: "Asset Reimaging",
    description: "Zero-touch OS deployment to hundreds of devices",
    icon: Monitor,
  },
  "hard-drive-monitor": {
    href: "/products/hard-drive-monitor",
    label: "Hard Drive Monitor",
    description: "S.M.A.R.T. health tracking & bad sector detection",
    icon: BarChart3,
  },
};

export const ProductInternalLinks: React.FC<ProductInternalLinksProps> = ({
  heading = "Related Products",
  links,
  currentProduct,
}) => {
  // Agar links manually nahi diye gaye, toh currentProduct ke basis pe generate karte hain
  const displayLinks = React.useMemo(() => {
    if (links && links.length > 0) return links;

    if (currentProduct) {
      // Current product ko hata kar baaki links dikhate hain (limit to 8 for better UI)
      return Object.entries(PRODUCT_LINKS)
        .filter(([key]) => key !== currentProduct)
        .slice(0, 8)
        .map(([_, value]) => value);
    }

    return [];
  }, [links, currentProduct]);

  if (displayLinks.length === 0) return null;

  return (
    // Related products section — internal linking ke liye
    <ThemeSection aria-label="Related D-Secure Products">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <ThemeSectionHeading 
          centered 
          subtitle="Explore the full D-Secure data security suite"
        >
          {heading}
        </ThemeSectionHeading>

        {/* Centered link grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {displayLinks.map((product) => {
            const IconComp = product.icon;
            return (
              <div
                key={product.href}
                className="relative flex items-center gap-4 p-5 bg-white border border-[#d0d5dc] rounded-none w-full transition-all hover:shadow-md hover:border-[#0e7c66] group"
              >
                {/* Lucide Icon */}
                <ThemeIconContainer icon={IconComp} size="md" />
                <div>
                  <Link
                    to={product.href}
                    className="block font-semibold text-[#0a2e1e] text-sm mb-1 no-underline"
                  >
                    {/* Stretched link — poora card clickable */}
                    <span
                      className="absolute inset-0 z-[1]"
                      aria-hidden="true"
                    ></span>
                    {product.label}
                  </Link>
                  <span className="block text-[#5a6672] text-xs leading-snug relative z-[2] pointer-events-none">
                    {product.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ThemeSection>
  );
};

export default ProductInternalLinks;

