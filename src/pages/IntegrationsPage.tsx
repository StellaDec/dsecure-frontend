import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  GearIcon,
  CloudIcon,
  ServerIcon,
  CheckIcon,
  ShieldIcon,
  ActivityIcon,
  ClipboardIcon,
  BuildingIcon
} from '@/components/FlatIcons';

export default function IntegrationsPage() {
  const integrationCategories = [
    {
      category: "IT Asset Management (ITAM)",
      items: [
        {
          title: 'ServiceNow',
          description: 'Bidirectional sync with ServiceNow CMDB to update asset status and attach erasure certificates to configuration items.',
          details: 'Supports Rome, San Diego, and Tokyo releases via REST API.'
        },
        {
          title: 'Atlassian Jira Service Management',
          description: 'Automate asset decommissioning tickets and attach audit logs directly to Jira issues for seamless workflow management.',
          details: 'Forge-based integration for Jira Cloud and Data Center.'
        },
        {
          title: 'Flexera One',
          description: 'Enhance your hardware visibility by feeding forensic-level erasure data into the Flexera asset intelligence platform.',
          details: 'Direct API data pipe for automated reconciliation.'
        }
      ]
    },
    {
      category: "Security Operations (SecOps)",
      items: [
        {
          title: 'Splunk',
          description: 'Forward real-time erasure telemetry and audit logs to Splunk for unified security monitoring and compliance dashboards.',
          details: 'Pre-built D-Secure Add-on for Splunk available.'
        },
        {
          title: 'Microsoft Sentinel',
          description: 'Integrate data sanitization events into your Azure-based SIEM for high-fidelity threat hunting and log retention.',
          details: 'Direct Log Analytics workspace ingestion.'
        },
        {
          title: 'IBM QRadar',
          description: 'Automatic LEEF log forwarding for centralized compliance tracking across global data center decommissioning projects.',
          details: 'Supports syslog and API-based retrieval.'
        }
      ]
    },
    {
      category: "Cloud & Infrastructure",
      items: [
        {
          title: 'Azure Active Directory',
          description: 'Single Sign-On (SSO) and Role-Based Access Control (RBAC) synchronization for secure operator management.',
          details: 'SAML 2.0 and OIDC support with SCIM provisioning.'
        },
        {
          title: 'Microsoft SCCM / MECM',
          description: 'Zero-touch PXE boot integration for mass-erasure of enterprise PC fleets directly from the ConfigMgr console.',
          details: 'Custom Task Sequence templates included.'
        },
        {
          title: 'AWS Security Hub',
          description: 'Consolidate sanitization findings from your virtual and cloud-hosted environments into a single security view.',
          details: 'Lambda-based automation for multi-region fleets.'
        }
      ]
    }
  ];

  return (
    <>
      <SEOHeadNative seo={getSEOForPage('integrations')} />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="container-responsive relative z-10 text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/20 text-white">
                <GearIcon className="w-12 h-12" filled={true} />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Connected <span className="text-blue-400">Ecosystem</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                Extend the power of D-Secure across your entire technology stack. Our high-assurance APIs and pre-built connectors transform data sanitization into a programmable, audited workflow.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/support/api-docs"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-3"
                >
                  View API Documentation
                  <ArrowRightIcon className="w-5 h-5" filled={true} />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20"
                >
                  Request Custom Connector
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Integration Grid */}
        {integrationCategories.map((cat, catIdx) => (
          <section key={cat.category} className={`py-24 ${catIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
            <div className="container-responsive">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 flex items-center gap-4">
                  <span className="w-2 h-10 bg-blue-500 rounded-full"></span>
                  {cat.category}
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cat.items.map((item, itemIdx) => (
                  <Reveal key={item.title} delayMs={itemIdx * 100}>
                    <div className="p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-slate-600 mb-6 flex-1 leading-relaxed">{item.description}</p>
                      <div className="pt-6 border-t border-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Technical Specs: {item.details}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Developer Portal Section */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
          <div className="container-responsive relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Built for <span className="text-blue-400">Automation Engineers</span></h2>
                  <p className="text-xl text-slate-300 mb-10">
                    D-Secure's RESTful API provides developers with the granular controls needed to build custom sanitization logic into internal portals, DevOps pipelines, and mobile apps.
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ActivityIcon className="w-6 h-6 text-blue-400" filled={true} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Webhook Events</h4>
                        <p className="text-slate-400 text-sm">Subscribe to real-time events for 'erasure_completed', 'audit_failed', or 'certificate_generated'.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShieldIcon className="w-6 h-6 text-emerald-400" filled={true} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Mutual TLS (mTLS)</h4>
                        <p className="text-slate-400 text-sm">Secure your API calls with certificate-based authentication for high-security environments.</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:w-1/2">
                <Reveal delayMs={200}>
                  <div className="bg-slate-800 rounded-3xl p-8 border border-white/10 font-mono text-sm shadow-2xl">
                    <div className="flex gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-emerald-400"># Start a new remote erasure session</p>
                      <p className="text-blue-400">POST /api/v1/erasure/session</p>
                      <p className="text-slate-400">{'{'}</p>
                      <p className="text-slate-400 ml-4">"target_id": <span className="text-orange-400">"NODE-88291"</span>,</p>
                      <p className="text-slate-400 ml-4">"standard": <span className="text-orange-400">"NIST_800_88_PURGE"</span>,</p>
                      <p className="text-slate-400 ml-4">"verification_level": <span className="text-orange-400">1.0</span>,</p>
                      <p className="text-slate-400 ml-4">"webhook_url": <span className="text-orange-400">"https://your-it-portal.com/callback"</span></p>
                      <p className="text-slate-400">{'}'}</p>
                      <p className="pt-4 text-slate-500">// Response: 202 Accepted</p>
                      <p className="text-slate-400">{'{'}</p>
                      <p className="text-slate-400 ml-4">"session_id": <span className="text-orange-400">"erasure-5f3a1"</span>,</p>
                      <p className="text-slate-400 ml-4">"status": <span className="text-orange-400">"initiating"</span></p>
                      <p className="text-slate-400">{'}'}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Connect Your Stack?</h2>
              <p className="text-xl mb-12 opacity-90">
                Talk to our integration architects about your specific environment and security requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl"
                >
                  Schedule Tech Call
                </Link>
                <Link
                  to="/support/integrations-hub"
                  className="px-10 py-4 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-all border border-blue-500/50"
                >
                  Browse Apps
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
