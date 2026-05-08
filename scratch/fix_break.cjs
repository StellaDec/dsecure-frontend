const fs = require('fs');
const path = 'c:/Users/nishu/Downloads/dsecure-frontend/src/pages/FreezeStatePage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('const [activeSection, setActiveSection] = useState("overview");`r`n  const [isNavVisible, setIsNavVisible] = useState(false);', 
    'const [activeSection, setActiveSection] = useState("overview");\n  const [isNavVisible, setIsNavVisible] = useState(false);');

fs.writeFileSync(path, content);
console.log('Fixed line break');
