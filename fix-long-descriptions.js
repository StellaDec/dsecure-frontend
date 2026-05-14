import fs from 'fs';
import path from 'path';

const replacements = [
  {
    long: "Choosing the right data erasure method for your security requirements, compliance needs, and operational constraints. Guide to NIST 800-88, DoD, and Crypto Erase.",
    short: "Choose the right data erasure method for security and compliance. Guide to NIST 800-88, DoD, and Crypto Erase."
  },
  {
    long: "Calculate the financial impact of a data breach by industry and record count. Free online tool using IBM & Ponemon Institute data. See your GDPR/HIPAA exposure in seconds.",
    short: "Calculate the financial impact of a data breach. Free tool using IBM data to see GDPR/HIPAA exposure instantly."
  },
  {
    long: "Free online calculator: determine the exact number of overwrite passes and erasure time for HDD, SSD, and NVMe drives under NIST 800-88 and DoD 5220.22-M standards.",
    short: "Determine exact overwrite passes and erasure time for HDD, SSD & NVMe under NIST and DoD standards."
  },
  {
    long: "Learn exactly what Cryptographic Erase means under NIST SP 800-88 — how it works, when to use it, and why it qualifies as a Purge method. Includes key destruction steps.",
    short: "Learn what Cryptographic Erase means under NIST SP 800-88, how it works, when to use it, and key destruction steps."
  },
  {
    long: "Most DR plans overlook secure data erasure — and regulators notice. See how to embed certified erasure into your recovery workflow for GDPR, HIPAA & ISO compliance.",
    short: "Embed certified data erasure into your disaster recovery workflow for GDPR, HIPAA, and ISO compliance."
  },
  {
    long: "Free data erasure tools seem cheaper, but are they safe or compliant? Compare features, risks, and real costs to understand why enterprises choose certified erasure software.",
    short: "Are free data erasure tools safe? Compare features, risks, and costs to see why enterprises choose certified software."
  },
  {
    long: "Step-by-step guide for IT teams to securely erase MacBook, iMac, Mac Mini & Mac Pro — including Apple Silicon. Learn why factory reset fails compliance and how to use certified erasure tools.",
    short: "Guide for IT teams to securely erase Macs, including Apple Silicon. Learn why factory resets fail compliance."
  },
  {
    long: "Loose drives from data centers, printers & ITAD generate massive breach risk. Learn certified erasure steps for SATA, NVMe & SAS loose drives using NIST-compliant tools.",
    short: "Learn certified erasure steps for SATA, NVMe & SAS loose drives using NIST-compliant tools to prevent breaches."
  },
  {
    long: "Understand NIST SP 800-88 Rev. 1 — the gold standard for data sanitization. Learn how Clear, Purge, and Destroy protect your organization from residual data exposure.",
    short: "Understand NIST SP 800-88 Rev. 1 data sanitization. Learn how Clear, Purge, and Destroy protect your organization."
  },
  {
    long: "Understand the critical difference between NIST 800-88 Clear and Purge methods — when to use each, applicable drive types, and how D-Secure implements both for enterprise compliance.",
    short: "Understand differences between NIST 800-88 Clear and Purge methods, when to use each, and how to stay compliant."
  },
  {
    long: "Detailed comparison of NIST 800-88 and IEEE 2883 media sanitization standards — understand which applies to your organization, how they differ in scope, methods and verification requirements.",
    short: "Compare NIST 800-88 and IEEE 2883 sanitization standards to understand their scope, methods, and requirements."
  },
  {
    long: "Protect corporate data across remote and hybrid teams with certified remote data erasure. Enterprise best practices for BYOD device wipe, employee off-boarding data security, and distributed workforce compliance.",
    short: "Protect corporate data with certified remote data erasure. Enterprise best practices for BYOD and off-boarding."
  },
  {
    long: "A technical speed analysis comparing legacy overwriting to modern cryptographic erasure. Benchmark data for HDD, SSD, and NVMe data sanitization performance.",
    short: "Speed analysis comparing legacy overwriting to cryptographic erasure. Benchmark data for HDD, SSD, and NVMe."
  },
  {
    long: "Explore the 2026 Global Data Destruction report. Technical analysis of e-waste trends, sanitization standard adoption (NIST 800-88), and the impact of AI on asset decommissioning.",
    short: "Explore the 2026 Global Data Destruction report: e-waste trends, NIST 800-88 adoption, and AI impacts."
  },
  {
    long: "Access enterprise-grade technical research, benchmark studies, and security whitepapers. Deep-dives into NIST 800-88, ZTA sanitization, and data destruction trends.",
    short: "Access technical research, benchmark studies, and whitepapers on NIST 800-88, ZTA, and data destruction."
  }
];

const searchDirs = ['src/pages', 'src/components', 'src/utils', 'src/data'];

function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = searchDirs.flatMap(walkDir);

let changedFilesCount = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const { long, short } of replacements) {
    if (content.includes(long)) {
      content = content.replace(long, short);
      changed = true;
      console.log(`Replaced string in ${filePath}`);
    } else {
        // Also try replacing escaped quotes if they are inside strings
        const escapedLong = long.replace(/"/g, '\\"');
        if (content.includes(escapedLong)) {
            content = content.replace(escapedLong, short.replace(/"/g, '\\"'));
            changed = true;
            console.log(`Replaced escaped string in ${filePath}`);
        }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    changedFilesCount++;
  }
}

console.log(`Finished replacing. Modified ${changedFilesCount} files.`);
