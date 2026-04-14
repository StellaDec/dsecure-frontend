const fs = require('fs');
const path = require('path');

/**
 * Recursively find all files in a directory
 */
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const srcDir = path.resolve(__dirname, '..', 'src');
const files = walk(srcDir);

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Replace relative imports of AuthContext with aliased imports
    // Matches: from "../../auth/AuthContext" or "./auth/AuthContext"
    content = content.replace(
        /from\s+["']([\.\/]+)auth\/AuthContext["']/g,
        'from "@/auth/AuthContext"'
    );
    
    // Also handle Case Sensitive directory name if someone used Auth/AuthContext
    content = content.replace(
        /from\s+["']([\.\/]+)Auth\/AuthContext["']/g,
        'from "@/auth/AuthContext"'
    );

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`✅ Updated: ${path.relative(path.join(__dirname, '..'), file)}`);
    }
});

console.log(`\n🎉 Total files standardized: ${updatedCount}`);
