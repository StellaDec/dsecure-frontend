import fs from 'fs';
import path from 'path';

const translationPath = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend\\public\\locales\\en\\translation.json';
const translations = JSON.parse(fs.readFileSync(translationPath, 'utf-8'));

function getTranslation(key: string) {
    const parts = key.split('.');
    let current = translations;
    for (const part of parts) {
        if (current === undefined || current[part] === undefined) return key;
        current = current[part];
    }
    return typeof current === 'string' ? current : key;
}

function walk(dir: string, callback: (file: string) => void) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

function auditH1() {
    const pagesDir = 'c:\\Users\\nishu\\Downloads\\dsecure-frontend\\src\\pages';
    const results = [];

    walk(pagesDir, (file) => {
        if (!file.endsWith('.tsx')) return;

        const content = fs.readFileSync(file, 'utf-8');
        const relativePath = path.relative('c:\\Users\\nishu\\Downloads\\dsecure-frontend', file);
        
        // Find all <h1> tags
        const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g);
        
        if (!h1Matches) {
            results.push({ file: relativePath, status: 'MISSING', h1Count: 0, h1Text: '' });
            return;
        }

        const h1s = h1Matches.map(match => {
            let text = match.replace(/<h1[^>]*>|<\/h1>/g, '').trim();
            
            // Handle {t('...')}
            const tMatch = text.match(/\{t\(["']([^"']+)["']\)\}/);
            if (tMatch) {
                text = getTranslation(tMatch[1]);
            }
            
            // Clean up other React expressions
            text = text.replace(/\{.*?\}|[\{\}]/g, '').replace(/<[^>]*>/g, '').trim();
            
            return text;
        });

        const issues = [];
        if (h1s.length > 1) issues.push('MULTIPLE_H1');
        
        h1s.forEach(text => {
            if (text.length > 0 && text.length < 15) issues.push('TOO_SHORT');
            if (text.length === 0) issues.push('EMPTY_H1');
        });

        results.push({
            file: relativePath,
            status: issues.length > 0 ? issues.join(', ') : 'OK',
            h1Count: h1s.length,
            h1Text: h1s.join(' | ')
        });
    });

    fs.writeFileSync('c:\\Users\\nishu\\Downloads\\dsecure-frontend\\scratch\\h1_audit_full.json', JSON.stringify(results, null, 2));
    
    console.log(`Audit complete. Results saved to scratch/h1_audit_full.json`);
}

auditH1();
