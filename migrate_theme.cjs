const fs = require('fs');

function migrateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add Theme imports
    if (!content.includes('import { ThemeSection')) {
        content = content.replace(
            /import \{[^}]*\} from "lucide-react";/,
            'import { ThemeSection, ThemeSectionHeading, ThemeCard, ThemeButton, ThemeIconContainer } from "@/components/ui/Theme";\n$&'
        );
        // Also import common lucide icons we use for replacement if not already imported
        const lucideIconsToImport = ['Shield', 'CheckCircle', 'ArrowRight', 'ArrowLeft', 'Globe', 'Cloud', 'Settings', 'FileText', 'Star', 'Server'];
        // we can just add a new import statement
        content = content.replace(
            /import \{[^}]*\} from "lucide-react";/,
            'import { Shield, CheckCircle, ArrowRight, ArrowLeft, Globe, Cloud, Settings, FileText, Star, Server } from "lucide-react";\n$&'
        );
    }

    // 2. Remove FlatIcons import
    content = content.replace(/import \{[^}]+\} from "@\/components\/FlatIcons";\n?/, '');

    // 3. Replace Icon components
    content = content.replace(/<ShieldIcon[^>]*\/>/g, '<Shield className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<CheckIcon[^>]*\/>/g, '<CheckCircle className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<ArrowRightIcon[^>]*\/>/g, '<ArrowRight className="w-5 h-5 text-emerald-600" />');
    content = content.replace(/<ArrowLeftIcon[^>]*\/>/g, '<ArrowLeft className="w-5 h-5 text-emerald-600" />');
    content = content.replace(/<GlobeIcon[^>]*\/>/g, '<Globe className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<CloudIcon[^>]*\/>/g, '<Cloud className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<GearIcon[^>]*\/>/g, '<Settings className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<ClipboardIcon[^>]*\/>/g, '<FileText className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<StarIcon[^>]*\/>/g, '<Star className="w-6 h-6 text-emerald-600" />');
    content = content.replace(/<ServerIcon[^>]*\/>/g, '<Server className="w-6 h-6 text-emerald-600" />');

    // 4. Section Replacements
    content = content.replace(/<section(\s+id="[^"]+")?\s+className="[^"]*"(>|.*?>)/g, '<ThemeSection$1 alternate={false}$2');
    
    // Replace closing tags
    content = content.replace(/<\/section>/g, '</ThemeSection>');

    // 5. Replace custom bg-gradient cards with ThemeCard
    content = content.replace(/<div\s+className="group\s+bg-white\s+rounded-2xl\s+p-6\s+border\s+border-slate-200[^"]*"[^>]*>/g, '<ThemeCard className="group">');
    content = content.replace(/<div\s+className="group\s+bg-gradient-[^"]*"\s*>/g, '<ThemeCard className="group">');
    content = content.replace(/<div\s+className="bg-white\s+rounded-2xl\s+p-8\s+shadow-lg[^"]*"[^>]*>/g, '<ThemeCard>');
    content = content.replace(/<div\s+className="bg-white\/10\s+backdrop-blur-sm\s+rounded-xl[^"]*"[^>]*>/g, '<ThemeCard className="bg-white/10 backdrop-blur-sm border-white/10">');
    content = content.replace(/<div\s+className="group\s+relative\s+bg-slate-50\s+rounded-2xl[^"]*"[^>]*>/g, '<ThemeCard className="group relative bg-slate-50">');
    // Not replacing closing divs because that's too hard with regex. I will just rely on manual replacements or specific block replacements.

    fs.writeFileSync(filePath, content);
    console.log(`Migrated ${filePath}`);
}

const files = [
    'src/pages/FileEraserNetwork.tsx',
    'src/pages/DriveEraserPage.tsx',
    'src/pages/DriveEraserDiagnosticPage.tsx',
    'src/pages/HardDriveMonitorPage.tsx',
    'src/pages/SmartphoneEraserPage.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) migrateFile(f);
});
