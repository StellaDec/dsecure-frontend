import fs from 'fs';

const content = fs.readFileSync('src/layouts/MainLayout.tsx', 'utf8');

function getUsedIcons(jsx) {
    const matches = jsx.match(/<([A-Z][a-zA-Z0-9]*)/g) || [];
    const components = new Set(matches.map(m => m.substring(1)));
    const allLucide = ['X', 'ChevronRight', 'Smartphone', 'HardDrive', 'Server', 'FileText', 'Cloud', 'Trash2', 'ShieldCheck', 'Laptop', 'Database', 'Microchip', 'Activity', 'Shield', 'Globe', 'CheckCircle', 'Zap', 'ArrowRight', 'Menu', 'LogOut', 'User', 'Settings', 'Building', 'Briefcase', 'Heart', 'Stethoscope', 'GraduationCap', 'Landmark', 'Scale', 'PiggyBank', 'Building2', 'BadgeCheck', 'Check'];
    return Array.from(components).filter(c => allLucide.includes(c));
}

function extract(startStr, endStr) {
    const s = content.indexOf(startStr);
    const e = content.indexOf(endStr, s);
    return content.substring(s, e);
}

const pStart = '{/* Dropdown Panel — Zoho-style mega menu */}\r\n                {productsDropdownOpen && (';
const pEnd = '                )}\r\n              </div>\r\n              {/* Solutions Dropdown */}';

const sStart = '{/* Dropdown Panel — Zoho-style mega menu */}\r\n                {solutionsDropdownOpen && (';
const sEnd = '                )}\r\n              </div>\r\n              <NavLink\r\n                to="/resources"';

let pBlock = extract(pStart, pEnd);
if (!pBlock) pBlock = extract(pStart.replace(/\r\n/g, '\n'), pEnd.replace(/\r\n/g, '\n'));

let sBlock = extract(sStart, sEnd);
if (!sBlock) sBlock = extract(sStart.replace(/\r\n/g, '\n'), sEnd.replace(/\r\n/g, '\n'));

if (pBlock && sBlock) {
    // Return block with fragment wrapper to fix TS1005 JSX parsing errors
    fs.writeFileSync('src/components/layout/ProductsMegaMenu.tsx', `import React from 'react';\nimport { Link } from 'react-router-dom';\nimport { ${getUsedIcons(pBlock).join(', ')} } from 'lucide-react';\nimport { useTranslation } from 'react-i18next';\n\nexport default function ProductsMegaMenu({ productsDropdownOpen, setProductsDropdownOpen, productsDropdownTab, setProductsDropdownTab }) {\n    const { t } = useTranslation();\n    return (\n<>\n${pBlock}\n</>\n    );\n}\n`);
    
    fs.writeFileSync('src/components/layout/SolutionsMegaMenu.tsx', `import React from 'react';\nimport { Link } from 'react-router-dom';\nimport { ${getUsedIcons(sBlock).join(', ')} } from 'lucide-react';\nimport { useTranslation } from 'react-i18next';\n\nexport default function SolutionsMegaMenu({ solutionsDropdownOpen, setSolutionsDropdownOpen }) {\n    const { t } = useTranslation();\n    return (\n<>\n${sBlock}\n</>\n    );\n}\n`);
    
    let newContent = content;
    // Replace the exact blocks with the Suspense wrappers (passing the necessary state)
    // We do NOT wrap the conditional again inside MainLayout since we want the Suspense to conditionally render
    newContent = newContent.replace(pBlock, '<React.Suspense fallback={null}><ProductsMegaMenu productsDropdownOpen={productsDropdownOpen} setProductsDropdownOpen={setProductsDropdownOpen} productsDropdownTab={productsDropdownTab} setProductsDropdownTab={setProductsDropdownTab} /></React.Suspense>\n              </div>\n              {/* Solutions Dropdown */}');
    
    // Oh wait, the replace function will just replace the exact text.
    // The previous regex replacement was slightly flawed because pBlock didn't include the trailing '</div>\n{/* Solutions Dropdown */}'.
    // Let's just do it manually with strings:
    
    // For Products: we found pBlock. We replace it.
    newContent = newContent.replace(pBlock, '<React.Suspense fallback={null}><ProductsMegaMenu productsDropdownOpen={productsDropdownOpen} setProductsDropdownOpen={setProductsDropdownOpen} productsDropdownTab={productsDropdownTab} setProductsDropdownTab={setProductsDropdownTab} /></React.Suspense>');
    
    // For Solutions:
    newContent = newContent.replace(sBlock, '<React.Suspense fallback={null}><SolutionsMegaMenu solutionsDropdownOpen={solutionsDropdownOpen} setSolutionsDropdownOpen={setSolutionsDropdownOpen} /></React.Suspense>');
    
    newContent = newContent.replace('import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";', 'import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";\nconst ProductsMegaMenu = React.lazy(() => import("../components/layout/ProductsMegaMenu"));\nconst SolutionsMegaMenu = React.lazy(() => import("../components/layout/SolutionsMegaMenu"));');
    
    fs.writeFileSync('src/layouts/MainLayout.tsx', newContent);
    console.log('Successfully extracted and replaced.');
} else {
    console.log('Failed to match blocks:', !!pBlock, !!sBlock);
}
