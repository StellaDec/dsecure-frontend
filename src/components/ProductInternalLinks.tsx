// Internal linking component — related products ke beech SEO link equity distribute karta hai
import React from "react";
import { Link } from "react-router-dom";

interface RelatedProduct {
  href: string;
  label: string;
  description: string;
  icon: string;
}

interface ProductInternalLinksProps {
  heading?: string;
  links: RelatedProduct[];
}

// Har product ke liye predefined link map
export const PRODUCT_LINKS: Record<string, RelatedProduct> = {
  "drive-eraser": {
    href: "/products/drive-eraser",
    label: "Drive Eraser",
    description: "NIST 800-88 compliant HDD & SSD secure erasure",
    icon: "🗄️",
  },
  "drive-verifier": {
    href: "/products/drive-verifier",
    label: "Drive Verifier",
    description: "Post-erasure verification — confirm zero data traces",
    icon: "✅",
  },
  "hardware-diagnostics": {
    href: "/products/hardware-diagnostics",
    label: "Hardware Diagnostics",
    description: "50+ automated PC & server health tests",
    icon: "🔬",
  },
  "file-eraser": {
    href: "/products/file-eraser",
    label: "File Eraser",
    description: "Secure file & folder shredding beyond Recycle Bin",
    icon: "📄",
  },
  "file-eraser-network": {
    href: "/products/file-eraser-network",
    label: "File Eraser Network",
    description: "Centralized enterprise network data sanitization",
    icon: "🌐",
  },
  "smartphone-eraser": {
    href: "/products/smartphone-eraser",
    label: "Smartphone Eraser",
    description: "Certified iOS & Android mobile data wipe",
    icon: "📱",
  },
  "smartphone-diagnostic": {
    href: "/products/smartphone-diagnostic",
    label: "Smartphone Diagnostic",
    description: "60+ automated hardware tests for mobile devices",
    icon: "🔍",
  },
  "lun-eraser": {
    href: "/products/lun-eraser",
    label: "LUN Eraser",
    description: "SAN & NAS active storage array sanitization",
    icon: "🏢",
  },
  "virtual-machine-eraser": {
    href: "/products/virtual-machine-eraser",
    label: "VM Eraser",
    description: "VMware, Hyper-V & cloud VM data deletion",
    icon: "☁️",
  },
  "removable-media-eraser": {
    href: "/products/removable-media-eraser",
    label: "Removable Media Eraser",
    description: "Secure USB, SD card & flash drive wiping",
    icon: "💾",
  },
  "forensic-imaging": {
    href: "/products/forensic-imaging",
    label: "Forensic Imaging",
    description: "Bit-for-bit drive clone & evidence capture",
    icon: "🔎",
  },
  "freeze-state": {
    href: "/products/freeze-state",
    label: "Freeze State",
    description: "Deep Freeze alternative for Windows workstations",
    icon: "🧊",
  },
  "data-migration": {
    href: "/products/data-migration",
    label: "Data Migration",
    description: "Secure bit-perfect file transfer & system migration",
    icon: "🔄",
  },
  "asset-reimaging": {
    href: "/products/asset-reimaging",
    label: "Asset Reimaging",
    description: "Zero-touch OS deployment to hundreds of devices",
    icon: "🖥️",
  },
  "hard-drive-monitor": {
    href: "/products/hard-drive-monitor",
    label: "Hard Drive Monitor",
    description: "S.M.A.R.T. health tracking & bad sector detection",
    icon: "📊",
  },
};

const ProductInternalLinks: React.FC<ProductInternalLinksProps> = ({
  heading = "Related Products",
  links,
}) => {
  if (!links || links.length === 0) return null;

  return (
    // Related products section — internal linking ke liye
    <section
      aria-label="Related D-Secure Products"
      style={{
        padding: "48px 24px",
        background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            color: "#6b7280",
            textAlign: "center",
            marginBottom: "32px",
            fontSize: "0.95rem",
          }}
        >
          Explore the full D-Secure data security suite
        </p>

        {/* Link grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {links.map((product) => (
            <Link
              key={product.href}
              to={product.href}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "16px",
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                textDecoration: "none",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 4px 16px rgba(16,185,129,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "#10b981";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "#e5e7eb";
              }}
            >
              {/* Icon */}
              <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>
                {product.icon}
              </span>
              <div>
                <span
                  style={{
                    display: "block",
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: "0.9rem",
                    marginBottom: "4px",
                  }}
                >
                  {product.label}
                </span>
                <span
                  style={{
                    display: "block",
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    lineHeight: 1.4,
                  }}
                >
                  {product.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductInternalLinks;
