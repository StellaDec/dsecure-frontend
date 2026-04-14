const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directory to search
const srcDir = path.resolve(__dirname, 'src');

// Batch process files to standardize AuthContext imports
const files = glob.sync('src/**/*.{ts,tsx}', { absolute: true });

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Replace relative imports of AuthContext with aliased imports
    // Regex matches: import { ... } from "([...])/auth/AuthContext"
    content = content.replace(
        /from\s+["']([\.\/]+)auth\/AuthContext["']/g,
        'from "@/auth/AuthContext"'
    );
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`✅ Updated: ${path.relative(process.cwd(), file)}`);
    }
});

console.log(`\n🎉 Total files standardized: ${updatedCount}`);
