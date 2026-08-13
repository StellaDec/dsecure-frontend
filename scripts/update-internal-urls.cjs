const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data', 'internationalLawsData.ts');
let content = fs.readFileSync(file, 'utf8');

const slugMap = {
  'glba': 'glba-compliance',
  'hipaa': 'hipaa-compliance',
  'uk-dpa': 'uk-dpa-compliance',
  'bdsg': 'bdsg-compliance',
  'pdp-ph': 'philippines-dpa-compliance',
  'fdpa': 'fdpa-compliance',
  'pdpl-sa': 'pdpl-sa-compliance',
  'sox': 'sox-compliance',
  'appi': 'appi-compliance',
  'pipl': 'pipl-compliance',
  'fadp': 'fadp-compliance',
  'lgpd': 'lgpd-compliance',
  'privacy-act-au': 'privacy-act-au-compliance',
  'popia': 'popia-compliance',
  'pipeda': 'pipeda-compliance',
  'lfpdppp': 'lfpdppp-compliance',
  'dpdp': 'dpdp-compliance',
  'us-privacy-act': 'us-privacy-act-compliance',
  'nz-privacy': 'nz-privacy-act-compliance',
  'mhmda': 'mhmda-compliance',
  'ley-25326': 'ley-25326-compliance',
  'tdpsa': 'tdpsa-compliance',
  'peru-pdp': 'peru-pdp-compliance',
  'vcdpa': 'vcdpa-compliance'
};

for (const [id, slug] of Object.entries(slugMap)) {
  // Find the learnMoreUrl entry for this id block and replace it
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?learnMoreUrl:\\s*)'[^']*'`, 'g');
  content = content.replace(regex, `$1'/blog/${slug}'`);
}

fs.writeFileSync(file, content, 'utf8');
console.log('URLs updated to internal blog slugs successfully!');
