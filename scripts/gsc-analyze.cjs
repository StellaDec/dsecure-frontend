/**
 * GSC API se real data pull karne ka script
 * pk folder ke service account credentials use karta hai
 * Analyze: clicks, impressions, CTR, position, top/declining queries, pages
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Service account credentials ka path
const KEY_FILE = path.resolve(__dirname, '..', 'public', 'pk', 'd-secure-file-eraser-0a6cf1cbd31c.json');
const SITE_URL = 'https://www.dsecuretech.com/'; // GSC property URL

// Date helpers
function formatDate(d) {
  return d.toISOString().split('T')[0];
}
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return formatDate(d);
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔗 GSC API Connection — D-Secure Real Data Analysis');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Step 1: Authenticate
  console.log('\n📌 Step 1: Service Account se authenticate ho rahe hain...');
  if (!fs.existsSync(KEY_FILE)) {
    console.error('❌ Credentials file nahi mili:', KEY_FILE);
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const client = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: client });

  console.log('✅ Authentication successful!');
  console.log(`📍 Site URL: ${SITE_URL}`);

  // Step 2: Verify site access
  console.log('\n📌 Step 2: Site access verify kar rahe hain...');
  try {
    const sites = await searchconsole.sites.list();
    const siteList = sites.data.siteEntry || [];
    console.log(`✅ Total sites accessible: ${siteList.length}`);
    siteList.forEach(s => console.log(`   → ${s.siteUrl} (${s.permissionLevel})`));
    
    const hasAccess = siteList.some(s => s.siteUrl === SITE_URL || s.siteUrl === 'https://dsecuretech.com/' || s.siteUrl === 'sc-domain:dsecuretech.com');
    if (!hasAccess) {
      console.log('\n⚠️ WARNING: Direct URL match nahi mila. Available sites upar dikhe hain.');
      console.log('   Agar "sc-domain:dsecuretech.com" hai toh wo use hoga.');
    }
  } catch (e) {
    console.error('❌ Site list fetch failed:', e.message);
  }

  // Determine the correct site URL to query
  let querySiteUrl = SITE_URL;
  try {
    const sites = await searchconsole.sites.list();
    const siteList = sites.data.siteEntry || [];
    // sc-domain ko prefer karo agar available ho
    const scDomain = siteList.find(s => s.siteUrl.startsWith('sc-domain:'));
    const urlProp = siteList.find(s => s.siteUrl.includes('dsecuretech.com'));
    if (scDomain) querySiteUrl = scDomain.siteUrl;
    else if (urlProp) querySiteUrl = urlProp.siteUrl;
  } catch(e) { /* fallback to default */ }

  console.log(`\n🔍 Querying site: ${querySiteUrl}`);

  // Date ranges
  const endDate = daysAgo(3); // GSC data 2-3 din late aata hai
  const startDate28 = daysAgo(31);
  const startDate7 = daysAgo(10);
  const prevStart28 = daysAgo(59);
  const prevEnd28 = daysAgo(32);

  // ═══════════════════════════════════════
  // SECTION A: Overall Performance (Last 28 Days)
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('📊 SECTION A: Overall Performance (Last 28 Days)');
  console.log('═'.repeat(60));

  try {
    const overallCurrent = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: [],
        type: 'web',
      },
    });

    const overallPrev = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: prevStart28,
        endDate: prevEnd28,
        dimensions: [],
        type: 'web',
      },
    });

    const curr = overallCurrent.data.rows?.[0] || {};
    const prev = overallPrev.data.rows?.[0] || {};

    const clicks = curr.clicks || 0;
    const impressions = curr.impressions || 0;
    const ctr = ((curr.ctr || 0) * 100).toFixed(2);
    const position = (curr.position || 0).toFixed(1);

    const prevClicks = prev.clicks || 0;
    const prevImpressions = prev.impressions || 0;
    const prevCtr = ((prev.ctr || 0) * 100).toFixed(2);
    const prevPosition = (prev.position || 0).toFixed(1);

    const clicksDelta = prevClicks > 0 ? (((clicks - prevClicks) / prevClicks) * 100).toFixed(1) : 'N/A';
    const impDelta = prevImpressions > 0 ? (((impressions - prevImpressions) / prevImpressions) * 100).toFixed(1) : 'N/A';

    console.log(`\n  Total Clicks:      ${clicks.toLocaleString()} (prev: ${prevClicks.toLocaleString()}, ${clicksDelta}%)`);
    console.log(`  Total Impressions: ${impressions.toLocaleString()} (prev: ${prevImpressions.toLocaleString()}, ${impDelta}%)`);
    console.log(`  Avg CTR:           ${ctr}% (prev: ${prevCtr}%)`);
    console.log(`  Avg Position:      ${position} (prev: ${prevPosition})`);
  } catch (e) {
    console.error('❌ Overall data fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION B: Top 30 Queries by Clicks
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('🔑 SECTION B: Top 30 Queries by Clicks (Last 28 Days)');
  console.log('═'.repeat(60));

  try {
    const topQueries = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: ['query'],
        rowLimit: 30,
        type: 'web',
      },
    });

    const rows = topQueries.data.rows || [];
    console.log(`\n  ${'#'.padEnd(4)} ${'Query'.padEnd(55)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(92));
    rows.forEach((r, i) => {
      const q = r.keys[0].substring(0, 53);
      console.log(`  ${String(i+1).padEnd(4)} ${q.padEnd(55)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(8)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
  } catch (e) {
    console.error('❌ Top queries fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION C: Top 30 Pages by Clicks
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('📄 SECTION C: Top 30 Pages by Clicks (Last 28 Days)');
  console.log('═'.repeat(60));

  try {
    const topPages = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: ['page'],
        rowLimit: 30,
        type: 'web',
      },
    });

    const rows = topPages.data.rows || [];
    console.log(`\n  ${'#'.padEnd(4)} ${'Page URL'.padEnd(65)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(100));
    rows.forEach((r, i) => {
      const page = r.keys[0].replace('https://www.dsecuretech.com', '').replace('https://dsecuretech.com', '').substring(0, 63);
      console.log(`  ${String(i+1).padEnd(4)} ${(page || '/').padEnd(65)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(8)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
  } catch (e) {
    console.error('❌ Top pages fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION D: Striking Distance Keywords (Position 5-20)
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('🎯 SECTION D: Striking Distance Keywords (Position 5-20, High Impressions)');
  console.log('═'.repeat(60));

  try {
    const strikingQueries = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: ['query'],
        rowLimit: 100,
        type: 'web',
      },
    });

    const rows = (strikingQueries.data.rows || [])
      .filter(r => r.position >= 5 && r.position <= 20 && r.impressions >= 10)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25);

    console.log(`\n  ${'#'.padEnd(4)} ${'Query'.padEnd(55)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(92));
    rows.forEach((r, i) => {
      const q = r.keys[0].substring(0, 53);
      console.log(`  ${String(i+1).padEnd(4)} ${q.padEnd(55)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(8)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
    if (rows.length === 0) console.log('  (Koi striking distance keyword nahi mila is range mein)');
  } catch (e) {
    console.error('❌ Striking distance fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION E: Low CTR Opportunities (High Impressions, Low CTR)
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('⚡ SECTION E: Low CTR Opportunities (High Impr + Low CTR)');
  console.log('═'.repeat(60));

  try {
    const lowCtr = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: ['query'],
        rowLimit: 200,
        type: 'web',
      },
    });

    const rows = (lowCtr.data.rows || [])
      .filter(r => r.impressions >= 20 && r.ctr < 0.03)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20);

    console.log(`\n  ${'#'.padEnd(4)} ${'Query'.padEnd(55)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(8)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(92));
    rows.forEach((r, i) => {
      const q = r.keys[0].substring(0, 53);
      console.log(`  ${String(i+1).padEnd(4)} ${q.padEnd(55)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(8)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
    if (rows.length === 0) console.log('  (Koi low CTR opportunity nahi mili)');
  } catch (e) {
    console.error('❌ Low CTR fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION F: Country-wise Traffic Breakdown
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('🌍 SECTION F: Country-wise Traffic (Top 15)');
  console.log('═'.repeat(60));

  try {
    const countryData = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: ['country'],
        rowLimit: 15,
        type: 'web',
      },
    });

    const rows = countryData.data.rows || [];
    console.log(`\n  ${'#'.padEnd(4)} ${'Country'.padEnd(15)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(10)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(55));
    rows.forEach((r, i) => {
      console.log(`  ${String(i+1).padEnd(4)} ${r.keys[0].padEnd(15)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(10)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
  } catch (e) {
    console.error('❌ Country data fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION G: Device-wise Performance
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('📱 SECTION G: Device-wise Performance');
  console.log('═'.repeat(60));

  try {
    const deviceData = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: startDate28,
        endDate: endDate,
        dimensions: ['device'],
        type: 'web',
      },
    });

    const rows = deviceData.data.rows || [];
    console.log(`\n  ${'Device'.padEnd(15)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(10)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(50));
    rows.forEach(r => {
      console.log(`  ${r.keys[0].padEnd(15)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(10)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
  } catch (e) {
    console.error('❌ Device data fetch failed:', e.message);
  }

  // ═══════════════════════════════════════
  // SECTION H: Daily Trend (Last 14 Days)
  // ═══════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('📈 SECTION H: Daily Trend (Last 14 Days)');
  console.log('═'.repeat(60));

  try {
    const dailyData = await searchconsole.searchanalytics.query({
      siteUrl: querySiteUrl,
      requestBody: {
        startDate: daysAgo(17),
        endDate: endDate,
        dimensions: ['date'],
        type: 'web',
      },
    });

    const rows = dailyData.data.rows || [];
    console.log(`\n  ${'Date'.padEnd(15)} ${'Clicks'.padStart(8)} ${'Impr'.padStart(10)} ${'CTR%'.padStart(7)} ${'Pos'.padStart(6)}`);
    console.log('  ' + '─'.repeat(50));
    rows.forEach(r => {
      console.log(`  ${r.keys[0].padEnd(15)} ${String(r.clicks).padStart(8)} ${String(r.impressions).padStart(10)} ${(r.ctr*100).toFixed(1).padStart(7)} ${r.position.toFixed(1).padStart(6)}`);
    });
  } catch (e) {
    console.error('❌ Daily trend fetch failed:', e.message);
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ GSC Analysis Complete!');
  console.log('═'.repeat(60));
}

main().catch(err => {
  console.error('❌ Script error:', err.message);
  if (err.message.includes('403')) {
    console.log('\n💡 Fix: GSC mein jaake service account email ko property owner/user banao:');
    console.log('   Email: nishu-569@d-secure-file-eraser.iam.gserviceaccount.com');
    console.log('   GSC → Settings → Users and permissions → Add user → Owner/Full');
  }
  process.exit(1);
});
