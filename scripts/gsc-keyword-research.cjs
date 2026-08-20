/**
 * GSC se ALL ranking queries pull karo + keyword clusters banao
 * Ye script 1000 queries pull karega aur categorize karega
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEY_FILE = path.resolve(__dirname, '..', 'public', 'pk', 'd-secure-file-eraser-0a6cf1cbd31c.json');

function formatDate(d) { return d.toISOString().split('T')[0]; }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return formatDate(d); }

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const client = await auth.getClient();
  const sc = google.searchconsole({ version: 'v1', auth: client });

  // Site URL find karo
  const sites = await sc.sites.list();
  const siteList = sites.data.siteEntry || [];
  const scDomain = siteList.find(s => s.siteUrl.startsWith('sc-domain:'));
  const siteUrl = scDomain ? scDomain.siteUrl : siteList[0]?.siteUrl || 'https://www.dsecuretech.com/';
  
  console.log(`Site: ${siteUrl}\n`);

  const endDate = daysAgo(3);
  const startDate = daysAgo(90); // 90 din ka data — zyada keywords milenge

  // ALL queries pull karo (max 25000)
  console.log('📥 Pulling ALL queries (last 90 days)...\n');
  
  const allQueries = [];
  let startRow = 0;
  const BATCH = 25000;

  const result = await sc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: BATCH,
      startRow: 0,
      type: 'web',
    },
  });

  const rows = result.data.rows || [];
  allQueries.push(...rows);
  console.log(`✅ Total queries found: ${allQueries.length}\n`);

  // ═══════════════════════════════════════
  // SECTION 1: Already Ranking — Improve Position
  // ═══════════════════════════════════════
  console.log('═'.repeat(70));
  console.log('🏆 SECTION 1: ALREADY RANKING — Position Improve Karo (Pos 1-10)');
  console.log('═'.repeat(70));

  const page1 = allQueries.filter(r => r.position <= 10).sort((a, b) => b.impressions - a.impressions);
  console.log(`\n  ${'Query'.padEnd(60)} ${'Clicks'.padStart(7)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
  console.log('  ' + '─'.repeat(92));
  page1.slice(0, 30).forEach(r => {
    console.log(`  ${r.keys[0].substring(0, 58).padEnd(60)} ${String(r.clicks).padStart(7)} ${String(r.impressions).padStart(8)} ${(r.ctr * 100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
  });

  // ═══════════════════════════════════════
  // SECTION 2: Striking Distance — Page 1 Push
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(70));
  console.log('🎯 SECTION 2: STRIKING DISTANCE — Page 1 Push (Pos 10-20)');
  console.log('═'.repeat(70));

  const striking = allQueries.filter(r => r.position > 10 && r.position <= 20).sort((a, b) => b.impressions - a.impressions);
  console.log(`\n  ${'Query'.padEnd(60)} ${'Clicks'.padStart(7)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
  console.log('  ' + '─'.repeat(92));
  striking.slice(0, 40).forEach(r => {
    console.log(`  ${r.keys[0].substring(0, 58).padEnd(60)} ${String(r.clicks).padStart(7)} ${String(r.impressions).padStart(8)} ${(r.ctr * 100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
  });

  // ═══════════════════════════════════════
  // SECTION 3: Page 2-3 — Content Depth Needed
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(70));
  console.log('📊 SECTION 3: PAGE 2-3 — Content Depth Badhao (Pos 20-30)');
  console.log('═'.repeat(70));

  const page23 = allQueries.filter(r => r.position > 20 && r.position <= 30).sort((a, b) => b.impressions - a.impressions);
  console.log(`\n  ${'Query'.padEnd(60)} ${'Clicks'.padStart(7)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
  console.log('  ' + '─'.repeat(92));
  page23.slice(0, 30).forEach(r => {
    console.log(`  ${r.keys[0].substring(0, 58).padEnd(60)} ${String(r.clicks).padStart(7)} ${String(r.impressions).padStart(8)} ${(r.ctr * 100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
  });

  // ═══════════════════════════════════════
  // SECTION 4: High Impression / Zero Click — CTR Fix
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(70));
  console.log('⚡ SECTION 4: HIGH IMPRESSIONS + ZERO CLICKS — CTR Emergency');
  console.log('═'.repeat(70));

  const zeroClick = allQueries.filter(r => r.clicks === 0 && r.impressions >= 10).sort((a, b) => b.impressions - a.impressions);
  console.log(`\n  ${'Query'.padEnd(60)} ${'Impr'.padStart(8)} ${'Pos'.padStart(6)}`);
  console.log('  ' + '─'.repeat(78));
  zeroClick.slice(0, 50).forEach(r => {
    console.log(`  ${r.keys[0].substring(0, 58).padEnd(60)} ${String(r.impressions).padStart(8)} ${r.position.toFixed(1).padStart(6)}`);
  });

  // ═══════════════════════════════════════
  // SECTION 5: Query + Page Mapping (Which page ranks for what)
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(70));
  console.log('🗺️ SECTION 5: TOP QUERY-PAGE MAPPING');
  console.log('═'.repeat(70));

  try {
    const queryPage = await sc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 100,
        type: 'web',
      },
    });

    const qpRows = queryPage.data.rows || [];
    console.log(`\n  ${'Query'.padEnd(45)} ${'Page'.padEnd(40)} ${'Clicks'.padStart(6)} ${'Impr'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(108));
    qpRows.sort((a, b) => b.impressions - a.impressions).slice(0, 50).forEach(r => {
      const q = r.keys[0].substring(0, 43);
      const p = r.keys[1].replace('https://www.dsecuretech.com', '').replace('https://dsecuretech.com', '').substring(0, 38);
      console.log(`  ${q.padEnd(45)} ${(p || '/').padEnd(40)} ${String(r.clicks).padStart(6)} ${String(r.impressions).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
  } catch (e) {
    console.error('Query-page mapping failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION 6: Keyword Clusters by Topic
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(70));
  console.log('🏷️ SECTION 6: KEYWORD CLUSTERS BY TOPIC');
  console.log('═'.repeat(70));

  const clusters = {
    'FILE ERASURE': [],
    'DATA ERASURE/SANITIZATION': [],
    'NIST / DoD / IEEE Standards': [],
    'ADISA': [],
    'HIPAA / Healthcare': [],
    'GDPR / Privacy': [],
    'ITAD / Asset Disposal': [],
    'SSD / Drive Wiping': [],
    'MAC / Apple': [],
    'Brand (D-Secure)': [],
    'Data Destruction': [],
    'Compliance (General)': [],
    'OTHER': [],
  };

  allQueries.forEach(r => {
    const q = r.keys[0].toLowerCase();
    if (q.includes('d-secure') || q.includes('dsecure') || q.includes('d secure')) clusters['Brand (D-Secure)'].push(r);
    else if (q.includes('file eras') || q.includes('file shred') || q.includes('file delet') || q.includes('delete file')) clusters['FILE ERASURE'].push(r);
    else if (q.includes('adisa')) clusters['ADISA'].push(r);
    else if (q.includes('nist') || q.includes('800-88') || q.includes('800 88') || q.includes('dod') || q.includes('5220') || q.includes('ieee') || q.includes('2883')) clusters['NIST / DoD / IEEE Standards'].push(r);
    else if (q.includes('hipaa') || q.includes('healthcare') || q.includes('phi') || q.includes('ephi')) clusters['HIPAA / Healthcare'].push(r);
    else if (q.includes('gdpr') || q.includes('right to eras') || q.includes('article 17') || q.includes('ccpa') || q.includes('privacy')) clusters['GDPR / Privacy'].push(r);
    else if (q.includes('itad') || q.includes('asset dispos') || q.includes('it asset') || q.includes('decommission')) clusters['ITAD / Asset Disposal'].push(r);
    else if (q.includes('ssd') || q.includes('hdd') || q.includes('drive') || q.includes('nvme') || q.includes('disk') || q.includes('bios')) clusters['SSD / Drive Wiping'].push(r);
    else if (q.includes('mac') || q.includes('apple') || q.includes('m1') || q.includes('m2') || q.includes('macos')) clusters['MAC / Apple'].push(r);
    else if (q.includes('data eras') || q.includes('data sanit') || q.includes('data wip') || q.includes('secure wip') || q.includes('sanitiz')) clusters['DATA ERASURE/SANITIZATION'].push(r);
    else if (q.includes('data destruct') || q.includes('destruct') || q.includes('shred')) clusters['Data Destruction'].push(r);
    else if (q.includes('complian') || q.includes('certified') || q.includes('standard') || q.includes('regulation')) clusters['Compliance (General)'].push(r);
    else clusters['OTHER'].push(r);
  });

  for (const [cluster, items] of Object.entries(clusters)) {
    if (items.length === 0) continue;
    const totalImpr = items.reduce((s, r) => s + r.impressions, 0);
    const totalClicks = items.reduce((s, r) => s + r.clicks, 0);
    const avgPos = items.reduce((s, r) => s + r.position, 0) / items.length;
    
    console.log(`\n  📂 ${cluster} (${items.length} queries, ${totalImpr.toLocaleString()} impr, ${totalClicks} clicks, avg pos ${avgPos.toFixed(1)})`);
    items.sort((a, b) => b.impressions - a.impressions).slice(0, 8).forEach(r => {
      console.log(`     → ${r.keys[0].substring(0, 55).padEnd(57)} ${String(r.impressions).padStart(7)} impr | pos ${r.position.toFixed(1)}`);
    });
  }

  // Summary stats
  console.log('\n' + '═'.repeat(70));
  console.log('📊 SUMMARY STATS');
  console.log('═'.repeat(70));
  console.log(`  Total unique queries: ${allQueries.length}`);
  console.log(`  Page 1 queries (pos 1-10): ${page1.length}`);
  console.log(`  Striking distance (pos 10-20): ${striking.length}`);
  console.log(`  Page 2-3 (pos 20-30): ${page23.length}`);
  console.log(`  Zero-click queries (10+ impr): ${zeroClick.length}`);
  console.log(`  Total impressions: ${allQueries.reduce((s, r) => s + r.impressions, 0).toLocaleString()}`);
  console.log(`  Total clicks: ${allQueries.reduce((s, r) => s + r.clicks, 0)}`);

  console.log('\n✅ Complete!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
