const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'internationalLawsData.ts');
let content = fs.readFileSync(file, 'utf8');

const urlMap = {
  'gdpr': 'https://www.bitraser.com/article/everything-you-need-to-know-to-ensure-GDPR-EU-Compliance.php',
  'uk-dpa': 'https://www.bitraser.com/article/uk-data-protection-act-gdpr-explained.php',
  'bdsg': 'https://www.bitraser.com/article/decoding-germanys-federal-data-protection-act-bdsg.php',
  'fdpa': 'https://www.bitraser.com/article/french-data-protection-act-fdpa-explained.php',
  'fadp': 'https://www.bitraser.com/article/understanding-switzerland-federal-act-data-protection-fadp.php',
  'ccpa': 'https://www.bitraser.com/article/deciphered-the-basics-of-CCPA.php',
  'hipaa': 'https://www.bitraser.com/article/everything-you-need-to-know-to-ensure-compliance-with-the-HIPAA-security-rule.php',
  'glba': 'https://www.bitraser.com/article/the-basics-of-gramm-leach-bliley-act-worth-knowing.php',
  'sox': 'https://www.bitraser.com/article/Sarbanes-Oxley-Act-SOX-Compliance-Requirements.php',
  'us-privacy-act': 'https://www.bitraser.com/article/us-privacy-act-1974.php',
  'nypa': 'https://www.bitraser.com/article/new-york-data-privacy-law.php',
  'tdpsa': 'https://www.bitraser.com/article/texas-data-privacy-and-security-act.php',
  'vcdpa': 'https://www.bitraser.com/article/virginia-consumer-data-protection-act.php',
  'mhmda': 'https://www.bitraser.com/article/washington-my-health-my-data-act-mhmda.php',
  'pipeda': 'https://www.bitraser.com/article/personal-information-protection-and-electronic-documents-act-pipeda.php',
  'dpdp': 'https://www.bitraser.com/blog/indian-digital-personal-data-protection-bill-2023/',
  'appi': 'https://www.bitraser.com/article/japan-appi-data-protection-law.php',
  'pipl': 'https://www.bitraser.com/article/understanding-china-personal-information-protection-law-pipl.php',
  'pdp-ph': 'https://www.bitraser.com/article/philippines-data-privacy-act.php',
  'privacy-act-au': 'https://www.bitraser.com/article/privacy-act-1988.php',
  'nz-privacy': 'https://www.bitraser.com/article/new-zealand-privacy-act-2020.php',
  'pdpl-sa': 'https://www.bitraser.com/article/pdpl-saudi-arabia-personal-data-protection-law.php',
  'popia': 'https://www.bitraser.com/article/popia-act.php',
  'lgpd': 'https://www.bitraser.com/article/lgpd-brazils-personal-data-protection-law.php',
  'lfpdppp': 'https://www.bitraser.com/article/mexico-data-protection-law-explained.php',
  'ley-25326': 'https://www.bitraser.com/article/ley-25.326-argentina-personal-data-protection-act.php',
  'peru-pdp': 'https://www.bitraser.com/article/peru-data-protection-law.php'
};

for (const [id, url] of Object.entries(urlMap)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?learnMoreUrl:\\s*)'[^']*'`, 'g');
  content = content.replace(regex, `$1'${url}'`);
}

fs.writeFileSync(file, content, 'utf8');
console.log('URLs updated successfully!');
