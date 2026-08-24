import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import { SEOHeadNative } from "@/components/SEOHeadNative"
import { getSEOForPage } from '@/utils/seo'
import { CheckIcon, CloudIcon, ShieldIcon, DatabaseIcon } from '@/components/FlatIcons'

export default function RemoteErasurePage() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage('remote-erasure')} />
      
      <div className="bg-slate-50 min-h-screen">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-emerald-900 to-slate-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dhwi5wevf/image/upload/v1709110000/grid-pattern.svg')] opacity-10"></div>
          <div className="container-app relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Remote Data Wiping Services
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Enterprise Remote <span className="text-emerald-400">Data Erasure</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl">
                    Securely wipe endpoints, servers, and cloud instances remotely. 
                    Ensure NIST 800-88 compliance without ever touching the physical device.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-primary">
                      Request Consultation
                    </Link>
                    <Link to="/products/file-eraser" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
                      View Free Trial
                    </Link>
                  </div>
                </Reveal>
              </div>
              
              <div className="relative hidden lg:block">
                <Reveal delayMs={200}>
                  <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CloudIcon className="w-6 h-6 text-white" filled={true} />
                      </div>
                      <div>
                        <div className="text-emerald-400 font-semibold">Remote Sanitization Active</div>
                        <div className="text-sm text-slate-300">Connected to 142 Endpoints</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between border border-white/5">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                            <span className="text-sm font-medium">LPT-NY-{8040 + i}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${i === 3 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                            {i === 3 ? 'Wiping (45%)' : 'Verified'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20">
          <div className="container-app">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Remote Data Erasure?
              </h2>
              <p className="text-lg text-slate-600">
                Manage your global IT asset disposition (ITAD) securely from a single pane of glass.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Zero-Touch Sanitization',
                  desc: 'Execute NIST 800-88 Purge/Clear commands across global endpoints without physical access.',
                  icon: <CloudIcon className="w-6 h-6 text-emerald-600" filled={true} />
                },
                {
                  title: 'Cryptographic Erasure',
                  desc: 'Instant data destruction through cryptographic key sanitization for NVMe and modern SSDs.',
                  icon: <ShieldIcon className="w-6 h-6 text-emerald-600" filled={true} />
                },
                {
                  title: 'Automated Audit Trails',
                  desc: 'Generate tamper-evident PDF certificates for every remote wipe automatically.',
                  icon: <DatabaseIcon className="w-6 h-6 text-emerald-600" filled={true} />
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Seamless Integration with Your IT Stack</h2>
                <p className="text-slate-300 mb-8 text-lg">
                  Deploy remote erasure commands via Microsoft Intune, SCCM, or our proprietary lightweight agent.
                </p>
                <ul className="space-y-4">
                  {[
                    'Deploy the silent MSI package via MDM',
                    'Target specific machine groups for decommissioning',
                    'Initiate wiping commands remotely from the console',
                    'Certificates sync back to your ITAM system automatically'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckIcon className="w-6 h-6 text-emerald-400 shrink-0" filled={true} />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <pre className="text-sm text-emerald-400 font-mono overflow-x-auto">
                  <code>
                    {`> Requesting remote wipe for endpoint_id: 994...
> Verifying NIST 800-88 compliance profile...
> Establishing secure TLS connection...
> Initiating Cryptographic Erase (CE)...
> Wiping complete. Generating certificate.
> Syncing to ServiceNow ITAM... [SUCCESS]`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
