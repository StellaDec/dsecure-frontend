import React from "react";
import BlogFooterStandard from "./BlogFooterStandard";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DeploymentOptionsBlog: React.FC = () => {
    return (
      <div className="min-h-screen bg-white">
        <SEOHead
          seo={getBlogSEO({
            title: "Data Erasure Deployment Options",
            excerpt:
              "Comparing on-premise, cloud, and hybrid deployment options for data erasure solutions.",
            slug: "deployment-options",
            author: "D-Secure Editorial Team",
            publishDate: "May 17, 2025",
            keywords: "deployment, on-premise, cloud, hybrid",
            category: "Guide",
            tag: "Technical",
          })}
        />

        <section className="py-16 bg-white shadow-none">
          <Reveal>
            <div className="text-center px-6">
              <span className="inline-block px-4 py-1 text-sm font-medium text-[#0e7c66] bg-[#d4ede4] rounded-full mb-4">
                Deployment
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-8 leading-tight">
                Flexible Deployment Options for D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link>
              </h1>
              <p className="text-xl md:text-2xl text-[#5a6672] max-w-4xl mx-auto leading-relaxed">
                Explore various deployment methods tailored to your specific
                requirements and device types for effective data erasure.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="max-w-[95%] lg:max-w-6xl mx-auto px-4 md:px-8 py-12">
          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <p className="text-[#5a6672] leading-loose text-xl">
                Businesses use a wide variety of devices for storing and
                processing data, such as laptops, MacBooks, Chromebooks, and
                servers. These devices have inherently different architectures
                and security protocols that require{" "}
                <strong className="text-[#0a2e1e]">
                  tailored deployment strategies
                </strong>{" "}
                for data erasure software.
              </p>
              <p className="text-[#5a6672] leading-loose text-lg">
                D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> addresses the erasure needs of
                organizations looking to perform data wiping both onsite and
                remotely. Each variant is deployed using different methods
                tailored to specific requirements and device types, ensuring
                effective data erasure across all device categories.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="prose prose-emerald prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-[#0a2e1e] prose-p:leading-loose text-[#5a6672] text-justify mb-8">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Deployment Options
              </h2>

              <div className="space-y-8">
                <div className="border-l-4 border-[#0e7c66] pl-8 py-4">
                  <h3 className="font-bold text-[#0a2e1e] text-2xl mb-4">
                    1. Using a Bootable USB
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose mb-4">
                    Both D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> Cloud and Offline variants can be
                    deployed using a bootable USB to erase PCs, laptops, and
                    servers.
                  </p>

                  <h3 className="font-bold text-[#0e7c66] text-lg mb-3 mt-6">
                    For PCs, Laptops, and Servers:
                  </h3>
                  <ul className="space-y-2 text-[#5a6672]">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Login to D-Secure Cloud Console
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Download the D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> ISO image
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Create a bootable USB using a tool like UNetbootin.
                      Download for:{" "}
                      <a
                        href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-windows-702.exe"
                        className="text-[#0e7c66] hover:text-[#0e7c66] font-medium ml-1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Windows
                      </a>
                      ,{" "}
                      <a
                        href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-linux64-702.bin"
                        className="text-[#0e7c66] hover:text-[#0e7c66] font-medium ml-1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Linux
                      </a>
                      ,{" "}
                      <a
                        href="https://downloads.dsecuretech.com/tools%20for%20usb%20bootable/unetbootin-mac-702.dmg"
                        className="text-[#0e7c66] hover:text-[#0e7c66] font-medium ml-1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Mac
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Boot the device using the D-Secure bootable USB
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Connect to the internet and fetch licenses
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Select drives to erase and click Erase
                    </li>
                  </ul>

                  <h3 className="font-bold text-[#0e7c66] text-lg mb-3 mt-6">
                    For MacBooks:
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose mb-3">
                    Mac devices have different security protocols, so we use the
                    Mac variant of D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> to wipe Mac with M3,
                    M2, M1, T2, T1 chips:
                  </p>
                  <ul className="space-y-2 text-[#5a6672]">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Login and download D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> for Mac from the
                      Cloud console
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Initiate via the D-Secure USB creator application
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Boot the Mac device with the bootable USB
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Connect to the internet and get licenses
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Perform Erasure
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-4">
                  <h3 className="font-bold text-[#0a2e1e] text-2xl mb-4">
                    2. Using PXE Boot
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose mb-4">
                    With this method, you can erase up to{" "}
                    <strong>65,000 drives</strong> (in chassis or servers) and
                    up to <strong>254 devices</strong> (PC, Laptop) connected
                    over a network.
                  </p>
                  <ul className="space-y-2 text-[#5a6672]">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Download the D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> Network Cloud variant
                      ISO file from the Cloud console
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Configure the PXE Server to enable PXE boot for required
                      network services
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Connect client devices to the network and boot via PXE
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#0e7c66] rounded-full mr-3 mt-2"></span>
                      Perform bulk erasure across all connected devices
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-[#0e7c66] pl-8 py-4">
                  <h3 className="font-bold text-[#0a2e1e] text-2xl mb-4">
                    3. Remote Deployment (MSI Package)
                  </h3>
                  <p className="text-[#5a6672] text-lg leading-loose mb-4">
                    For remote Windows endpoint devices, D-Secure can be
                    deployed using an MSI package, enabling erasure without
                    physical access to the device.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#0e7c66] rounded-none shadow-none p-10 mt-10 text-white">
              <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">Flexibility</h3>
                  <p className="text-white/90 text-sm">
                    Choose the deployment method that best suits your
                    infrastructure and requirements
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">Scalability</h3>
                  <p className="text-white/90 text-sm">
                    From single devices to thousands of drives simultaneously
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">Broad Support</h3>
                  <p className="text-white/90 text-sm">
                    Works with PCs, Macs, servers, and Chromebooks
                  </p>
                </div>
                <div className="bg-white/10 rounded-none p-6">
                  <h3 className="font-bold text-lg mb-3">Remote Capability</h3>
                  <p className="text-white/90 text-sm">
                    Erase devices without physical access
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-[#d4ede4] border border-[#d0d5dc] rounded-none p-10 mt-10 space-y-6">
              <h2 className="text-3xl font-bold text-[#0a2e1e] mb-6">
                Conclusion
              </h2>
              <p className="text-[#5a6672] leading-loose text-lg">
                D-Secure <Link to="/products/drive-eraser" className="text-[#0e7c66] hover:underline font-medium">Drive Eraser</Link> offers flexible deployment options to meet
                diverse organizational needs. Whether you need to erase a single
                device or thousands of drives across a network, D-Secure
                provides the tools and flexibility to ensure secure, compliant
                data erasure.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="py-20 bg-[#0e7c66] text-center">
          <Reveal>
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Deploy D-Secure Your Way
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Choose the deployment method that works best for your
                organization's needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block bg-white text-[#0e7c66] px-8 py-4 rounded-none font-semibold hover:bg-slate-100 transition-all text-lg"
                >
                  Request Free Demo
                </Link>
                <Link
                  to="/all-products"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-none font-semibold hover:bg-white/10 transition-colors text-lg"
                >
                  View Products
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      <BlogFooterStandard 
        blogId="deployment-options" 
        blogTitle="Data Erasure Deployment Options" category="Guide" tag="Technical" 
      />
    </div>
  );
};

export default DeploymentOptionsBlog;
