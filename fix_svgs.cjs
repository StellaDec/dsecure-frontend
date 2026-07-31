const fs = require("fs");
const path = require("path");
const dir = "src/components/blog";
const files = fs.readdirSync(dir).filter(f => f.endsWith("Blog.tsx") || f === "BlogPostTemplate.tsx" || f === "BlogPage.tsx");

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("<svg")) {
    const needsArrowRight = content.includes("d=\"M17 8l4 4m0 0l-4 4m4-4H3\"") || content.includes("d=\"M14 5l7 7m0 0l-7 7m7-7H3\"");
    const needsCheck = content.includes("d=\"M5 13l4 4L19 7\"");
    const needsExternalLink = content.includes("d=\"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14\"");
    const needsAlertTriangle = content.includes("M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z");
    const needsInfo = content.includes("M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z");
    const needsTerminal = content.includes("M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z");

    let hasLucideImport = content.includes("from \"lucide-react\"");
    let importedIcons = [];
    if (hasLucideImport) {
        const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+["']lucide-react["']/);
        if (importMatch) {
            importedIcons = importMatch[1].split(",").map(s => s.trim());
        }
    }
    
    if (needsArrowRight && !importedIcons.includes("ArrowRight")) importedIcons.push("ArrowRight");
    if (needsCheck && !importedIcons.includes("Check")) importedIcons.push("Check");
    if (needsExternalLink && !importedIcons.includes("ExternalLink")) importedIcons.push("ExternalLink");
    if (needsAlertTriangle && !importedIcons.includes("AlertTriangle")) importedIcons.push("AlertTriangle");
    if (needsInfo && !importedIcons.includes("Info")) importedIcons.push("Info");
    if (needsTerminal && !importedIcons.includes("Terminal")) importedIcons.push("Terminal");

    if (importedIcons.length > 0) {
        if (hasLucideImport) {
            content = content.replace(/import\s+{[^}]+}\s+from\s+["']lucide-react["'];?/, 'import { ' + importedIcons.join(', ') + ' } from "lucide-react";');
        } else {
            content = content.replace(/(import React[^;]*;)/, '$1\nimport { ' + importedIcons.join(', ') + ' } from "lucide-react";');
        }
    }

    content = content.replace(/<svg[^>]*>[\s\S]*?<\/svg>/g, (match) => {
        if (match.includes("M17 8l4 4m0 0l-4 4m4-4H3")) {
            if (match.includes("rotate-90")) return "<ArrowRight className=\"w-8 h-8 transform rotate-90\" />";
            return "<ArrowRight className=\"w-8 h-8\" />";
        }
        if (match.includes("M14 5l7 7m0 0l-7 7m7-7H3")) {
            return "<ArrowRight className=\"w-5 h-5 ml-2\" />";
        }
        if (match.includes("M5 13l4 4L19 7")) {
            return "<Check className=\"w-6 h-6\" />";
        }
        if (match.includes("M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14")) {
            return "<ExternalLink className=\"w-4 h-4 ml-2 inline\" />";
        }
        if (match.includes("M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")) {
            return "<AlertTriangle className=\"w-6 h-6 inline mr-2 text-amber-500\" />";
        }
        if (match.includes("M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z")) {
            return "<Info className=\"w-6 h-6 inline mr-2 text-blue-500\" />";
        }
        if (match.includes("M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z")) {
            return "<Terminal className=\"w-6 h-6 inline mr-2 text-slate-700\" />";
        }
        
        // If unknown, replace with check icon as a fallback
        if (!importedIcons.includes("Check")) {
             return match;
        }
        return "<Check className=\"w-5 h-5 mr-2\" />";
    });

    fs.writeFileSync(filePath, content);
  }
});
console.log("Processed SVG replacements.");
