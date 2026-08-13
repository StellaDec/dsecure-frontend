import fs from 'fs';
import { marked } from 'marked';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const mdPath = path.join(__dirname, 'NIST_800-88_Rev_2_vs_IEEE_2883_SEO_Guide.md');
    const tsPath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');

    let markdown = fs.readFileSync(mdPath, 'utf8');

    // Strip top SEO stuff
    const topMatchIndex = markdown.indexOf('# NIST SP 800-88 Rev.');
    if (topMatchIndex !== -1) {
        markdown = markdown.substring(topMatchIndex);
    }

    // Strip bottom SEO stuff
    const bottomMatch = markdown.indexOf('# Recommended CTA Section');
    if (bottomMatch !== -1) {
        markdown = markdown.substring(0, bottomMatch);
    }

    // Add internal links
    markdown = markdown.replace(/\bD-Secure Drive Eraser\b/g, '[D-Secure Drive Eraser](/products/drive-eraser)');
    markdown = markdown.replace(/\bD-Secure File Eraser\b/g, '[D-Secure File Eraser](/products/file-eraser)');

    // Fix Table 1: Revision comparison
    const table1Ascii = `  -----------------------------------------------------------------------
  Area                    NIST Rev. 1             NIST Rev. 2
  ----------------------- ----------------------- -----------------------
  Publication year        2014                    2025

  Current status          Withdrawn               Current

  Primary focus           Practical               Enterprise sanitization
                          media-specific guidance programme

  Media tables            Included detailed       Removed
                          tables                  

  Logical and cloud       Limited treatment       Explicitly included
  storage                                         

  Verification            Present in older        Clearly separated from
                          workflow                validation

  Validation              Less distinctly         Formal acceptance
                          defined                 decision

  Technology techniques   Included within NIST    Generally referred to
                          tables                  current external
                                                  standards

  Cryptographic erase     Covered                 Retained with expanded
                                                  conditions

  Documentation           Certificate model       Stronger programme and
                          evidence focus

  Main external technical Various media guidance  IEEE 2883 and other
  reference                                       approved standards
  -----------------------------------------------------------------------`;

    const table1Markdown = `| Area | NIST Rev. 1 | NIST Rev. 2 |
|---|---|---|
| Publication year | 2014 | 2025 |
| Current status | Withdrawn | Current |
| Primary focus | Practical media-specific guidance | Enterprise sanitization programme |
| Media tables | Included detailed tables | Removed |
| Logical and cloud storage | Limited treatment | Explicitly included |
| Verification | Present in older workflow | Clearly separated from validation |
| Validation | Less distinctly defined | Formal acceptance decision |
| Technology techniques | Included within NIST tables | Generally referred to current external standards |
| Cryptographic erase | Covered | Retained with expanded conditions |
| Documentation | Certificate model included | Stronger programme and evidence focus |
| Main external technical reference | Various media guidance | IEEE 2883 and other approved standards |`;

    markdown = markdown.replace(table1Ascii, table1Markdown);

    // Fix Table 2: Practical method-selection overview
    const table2Ascii = `  -----------------------------------------------------------------------
  Media             Possible Clear       Possible Purge approach Destroy
                    approach                                     consideration
  ----------------- -------------------- ----------------------- ----------------
  Magnetic HDD      Verified overwrite   Approved device         Required when
                    of user-addressable  sanitize command,       device is failed,
                    locations            suitable CE or approved inaccessible or
                                         media-specific          policy prohibits
                                         technique               reuse

  SATA SSD          Factory reset or     Block erase, CE or      Use when the
                    logical operation    approved                device cannot be
                    only where policy    firmware/device         reliably
                    accepts Clear        sanitize operation      sanitized or
                                                                 reuse is
                                                                 prohibited

  NVMe SSD          Logical clear where  NVMe/device-supported   Use for failed
                    risk and scope       sanitization or CE      devices or
                    permit               where prerequisites are high-risk
                                         met                     non-reuse cases

  Self-encrypting   Clear depends on     CE where encryption and Use if CE
  drive             implementation       key-management          assurance cannot
                                         requirements are        be established
                                         satisfied               

  USB flash drive   Logical Clear may    Device-specific support Destruction may
                    not reach            may be limited          be necessary for
                    controller-managed                           sensitive data
                    areas                                        

  RAID storage      Member-drive and     Apply validated         Destroy failed
                    controller           techniques to every     members that
                    architecture must be relevant member and     cannot be
                    assessed             storage layer           sanitized

  Virtual disk      Delete or format is  CE or                   Physical
                    not automatically    provider-supported      destruction is
                    sanitization         logical sanitization    normally
                                         may be appropriate      controlled by the
                                                                 provider

  Cloud storage     Provider deletion    Key destruction or      Physical media is
                    may represent only   provider-supported      generally
                    logical removal      purge workflow          inaccessible to
                                                                 the customer
  -----------------------------------------------------------------------`;

    const table2Markdown = `| Media | Possible Clear approach | Possible Purge approach | Destroy consideration |
|---|---|---|---|
| Magnetic HDD | Verified overwrite of user-addressable locations | Approved device sanitize command, suitable CE or approved media-specific technique | Required when device is failed, inaccessible or policy prohibits reuse |
| SATA SSD | Factory reset or logical operation only where policy accepts Clear | Block erase, CE or approved firmware/device sanitize operation | Use when the device cannot be reliably sanitized or reuse is prohibited |
| NVMe SSD | Logical clear where risk and scope permit | NVMe/device-supported sanitization or CE where prerequisites are met | Use for failed devices or high-risk non-reuse cases |
| Self-encrypting drive | Clear depends on implementation | CE where encryption and key-management requirements are satisfied | Use if CE assurance cannot be established |
| USB flash drive | Logical Clear may not reach controller-managed areas | Device-specific support may be limited | Destruction may be necessary for sensitive data |
| RAID storage | Member-drive and controller architecture must be assessed | Apply validated techniques to every relevant member and storage layer | Destroy failed members that cannot be sanitized |
| Virtual disk | Delete or format is not automatically sanitization | CE or provider-supported logical sanitization may be appropriate | Physical destruction is normally controlled by the provider |
| Cloud storage | Provider deletion may represent only logical removal | Key destruction or provider-supported purge workflow | Physical media is generally inaccessible to the customer |`;

    markdown = markdown.replace(table2Ascii, table2Markdown);

    // Provide standard options to marked to enable GFM
    const htmlContent = marked.parse(markdown, { gfm: true, breaks: true });

    let tsContent = fs.readFileSync(tsPath, 'utf8');

    const regex = /id:\s*"nist-vs-ieee",[\s\S]*?(?=\n\s*{|\n\];)/;
    
    if (regex.test(tsContent)) {
        const replacement = 'id: "nist-vs-ieee",\n' +
    'slug: "nist-vs-ieee",\n' +
    'title: "NIST SP 800-88 Rev. 2 vs IEEE 2883-2022: What Data Sanitization Teams Need to Know",\n' +
    'excerpt: "Understand NIST SP 800-88 Rev. 2 vs IEEE 2883-2022, including Clear, Purge, Destroy, verification, validation and media selection.",\n' +
    'link: "/blog/nist-vs-ieee",\n' +
    'author: "D-Secure Data Sanitization Team",\n' +
    'publishDate: "August 04, 2026",\n' +
    'keywords: "NIST SP 800-88 Rev. 2 vs IEEE 2883, NIST 800-88 Rev. 2, IEEE 2883-2022, NIST media sanitization guidelines, Clear Purge Destroy, data sanitization standards, SSD data sanitization, NVMe secure erase",\n' +
    'tag: "Data Sanitization Standards",\n' +
    'category: "Technical Guide",\n' +
    'readTime: "12 min read",\n' +
    'content: `\\n<div class="blog-formatted-content">\\n' + htmlContent.replace(/`/g, '\\`').replace(/\\$/g, '\\\\$') + '\\n</div>\\n`\n  },';
        tsContent = tsContent.replace(regex, replacement);
        
        fs.writeFileSync(tsPath, tsContent);
        console.log("Updated tables and internal links successfully!");
    } else {
        console.log("Could not find the nist-vs-ieee block to update.");
    }
}

main().catch(console.error);
