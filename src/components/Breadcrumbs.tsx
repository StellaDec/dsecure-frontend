import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/** Ek breadcrumb item ki definition */
interface BreadcrumbItem {
  name: string;
  path: string;
  /** Last item ke liye current page indicator */
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  /** Custom items provide karo — nahi to auto-generate hoga route se */
  items?: BreadcrumbItem[];
  /** Custom CSS class for wrapper */
  className?: string;
  /** Schema markup include karo ya nahi */
  includeSchema?: boolean;
}

/**
 * Route path ko human-readable label mein convert karo
 * Example: "drive-eraser" → "Drive Eraser"
 */
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Current location se breadcrumb items auto-generate karo
 * / → [Home]
 * /products/drive-eraser → [Home, Products, Drive Eraser]
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
  ];

  let cumulativePath = '';
  segments.forEach((segment, index) => {
    cumulativePath += `/${segment}`;
    crumbs.push({
      name: formatSegment(segment),
      path: cumulativePath,
      isCurrentPage: index === segments.length - 1,
    });
  });

  return crumbs;
}

/**
 * BreadcrumbList JSON-LD schema generate karo
 * Google rich results ke liye zaroori hai
 */
function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const BASE_URL = 'https://dsecuretech.com';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
  return JSON.stringify(schema);
}

/**
 * Breadcrumbs Component — SEO-optimized navigation trail
 * Auto-generates from current route ya manual items accept karta hai
 * BreadcrumbList schema inject karta hai Google rich results ke liye
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items: propItems,
  className = '',
  includeSchema = true,
}) => {
  const location = useLocation();

  // Custom items ya auto-generated items
  const items = propItems ?? generateBreadcrumbsFromPath(location.pathname);

  // Homepage pe breadcrumbs show nahi karte — unnecessary hai
  if (items.length <= 1) return null;

  return (
    <>
      {/* BreadcrumbList Schema — Google rich snippet ke liye */}
      {includeSchema && (
        <script type="application/ld+json">
          {generateBreadcrumbSchema(items)}
        </script>
      )}

      {/* Visual Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb navigation"
        className={`w-full ${className}`}
      >
        <ol
          className="flex flex-wrap items-center gap-1 text-sm text-slate-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={item.path}
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator — pehle item ke baad */}
                {index > 0 && (
                  <svg
                    className="w-3 h-3 text-slate-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}

                {/* Last item — current page, no link */}
                {isLast ? (
                  <span
                    className="text-slate-700 font-medium truncate max-w-[200px]"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-emerald-600 transition-colors duration-200 truncate max-w-[150px] underline-offset-2 hover:underline"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}

                {/* Schema position — hidden metadata */}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
