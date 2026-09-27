import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Technical Partners & Vendors — Tulcan Energy",
  description: "Collaborating for precision. Meet Tulcan Energy's global network of tier-one engineering partners, logistics providers, and technology vendors.",
};

export default function PartnersPage() {
  const partners = [
    {
      code: "SYS-01",
      name: "Subsea 7 & Ocean Technical Services",
      category: "Offshore Engineering & Subsea EPCI",
      desc: "Providing primary subsea architecture, pipeline installation, and riser integration for deep and shallow-water extraction assets, adhering to strict metallurgical tolerances.",
      icon: "precision_manufacturing",
    },
    {
      code: "SYS-02",
      name: "Schlumberger (SLB) Reservoir Diagnostics",
      category: "Subsurface Geoscience & Well Logging",
      desc: "Supplying real-time Measurement-While-Drilling (MWD), high-resolution wireline logging, and advanced dynamic reservoir simulation models.",
      icon: "sensors",
    },
    {
      code: "SYS-03",
      name: "Baker Hughes Turbomachinery",
      category: "Process & Compression Systems",
      desc: "Engineering high-reliability gas compressors, multiphase pumping stations, and intelligent power generation packages for remote coastal installations.",
      icon: "settings",
    },
    {
      code: "SYS-04",
      name: "Meridian Global Marine Logistics",
      category: "Offshore Support Vessels (OSV) & Towage",
      desc: "Executing specialized heavy marine logistics, anchor handling tug supply (AHTS), and crew transfer operations across West African territorial waters.",
      icon: "local_shipping",
    },
    {
      code: "SYS-05",
      name: "Schneider Electric / SCADA Systems",
      category: "Industrial Automation & Safety Instrumented Systems",
      desc: "Delivering fail-safe Emergency Shutdown (ESD) architectures, cyber-secure remote telemetry, and predictive maintenance sensor arrays.",
      icon: "memory",
    },
    {
      code: "SYS-06",
      name: "DNV & Bureau Veritas Verifications",
      category: "Asset Integrity & Classification",
      desc: "Independent classification society certifying structural hull integrity, pressure containment systems, and environmental compliance audits.",
      icon: "verified_user",
    },
  ];

  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-[88px]">
        {/* Hero Section */}
        <header className="relative w-full min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] flex items-center pt-8 sm:pt-10 pb-10 sm:pb-12 overflow-hidden bg-surface text-pure-white border-b border-black/10">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-65"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerPartners.publicId, SECTION_ASSETS.headerPartners.fallback)}'), url('${SECTION_ASSETS.headerPartners.fallback}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-surface/40"></div>
            <div className="absolute inset-0 bg-grid opacity-15"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin my-auto">
            <div className="max-w-3xl">
              <span className="font-label-technical text-xs text-primary uppercase tracking-widest block mb-2 sm:mb-3 font-semibold">
                Vendor Ecosystem &amp; Supply Chain
              </span>
              <h1 className="font-headline-lg-mobile md:font-headline-xl text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-pure-white mb-3 sm:mb-4 tracking-tight leading-tight">
                Collaborating for <span className="text-primary">Precision.</span>
              </h1>
              <p className="font-body-lg text-on-surface-variant mb-5 sm:mb-6 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl">
                Our technical partners and vendors are integral to our operational excellence. We build resilient, transparent supply chains founded on rigorous engineering standards and mutual technological capability.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 border border-primary-container hover:scale-105 transition-transform rounded-lg sm:rounded-xl lg:rounded-none shadow-sm lg:shadow-none"
                >
                  Register as a Vendor
                </Link>
                <a
                  href="#partners"
                  className="bg-pure-white/10 backdrop-blur-md text-pure-white font-label-technical text-xs uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 border border-white/20 hover:border-white transition-all inline-flex items-center gap-2 rounded-lg sm:rounded-xl lg:rounded-none"
                >
                  <span>View Network</span>
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </a>
              </div>
            </div>
          </div>
        </header>

      {/* Section 1: Our Partners */}
      <section id="partners" className="py-12 sm:py-16 md:py-section-v-desktop bg-pure-white text-pure-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin relative z-10">
          <div className="mb-10 sm:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-6 sm:pb-8 gap-2 sm:gap-0">
            <div>
              <span className="font-label-technical text-xs text-primary-container font-semibold uppercase tracking-widest block mb-1 sm:mb-2">
                Tier-One Network
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold text-pure-black tracking-tight">
                Strategic Partnerships
              </h2>
              <p className="font-body-md text-surface-variant text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                A world-class alliance of specialized engineering contractors, equipment manufacturers, and subsea infrastructure experts.
              </p>
            </div>
            <span className="font-label-technical text-[11px] sm:text-xs text-surface-variant uppercase tracking-wider font-semibold">
              06 KEY CONTRACTORS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {partners.map((partner) => (
              <div
                key={partner.code}
                className="border border-black/10 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-none hover:border-primary-container hover:shadow-md lg:hover:shadow-none transition-all duration-300 group relative bg-neutral-50/40 flex flex-col justify-between"
              >
                <div>
                  <div className="absolute top-4 right-4 font-label-technical text-[11px] sm:text-xs text-black/40 font-bold">
                    {partner.code}
                  </div>
                  <div className="h-12 sm:h-14 w-12 sm:w-14 mb-4 sm:mb-6 bg-pure-black flex items-center justify-center text-pure-white rounded-lg sm:rounded-xl lg:rounded-DEFAULT group-hover:bg-primary-container transition-colors shadow-sm lg:shadow-none">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">{partner.icon}</span>
                  </div>
                  <span className="font-label-technical text-[10px] sm:text-[11px] text-primary-container uppercase tracking-wider block mb-1 font-semibold">
                    {partner.category}
                  </span>
                  <h3 className="font-headline-md text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-pure-black group-hover:text-primary-container transition-colors">
                    {partner.name}
                  </h3>
                  <p className="font-body-md text-surface-variant text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                    {partner.desc}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="font-label-technical text-xs uppercase tracking-widest text-primary-container inline-flex items-center gap-2 group-hover:gap-3 transition-all font-semibold"
                >
                  <span>Inquire</span>
                  <span className="material-symbols-outlined text-sm">east</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prequalification Criteria Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-neutral-50 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-6">
              <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container block mb-2 font-semibold">
                Vendor Compliance
              </span>
              <h3 className="font-headline-md text-2xl sm:text-3xl font-bold text-pure-black mb-3 sm:mb-4">
                Prequalification Requirements
              </h3>
              <p className="font-body-md text-surface-variant text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                All prospective suppliers and service providers must satisfy our stringent vendor assessment protocols to guarantee safety, operational integrity, and full compliance with the Nigerian Oil and Gas Industry Content Development (NOGICD) Act.
              </p>
              <ul className="space-y-3 font-label-technical text-xs text-pure-black">
                <li className="flex items-start sm:items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-sm mt-0.5 sm:mt-0 shrink-0">check_circle</span>
                  <span>NUPRC / NCDMB valid operating permits</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-sm mt-0.5 sm:mt-0 shrink-0">check_circle</span>
                  <span>Audited 3-year financial track record & anti-bribery certification</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-sm mt-0.5 sm:mt-0 shrink-0">check_circle</span>
                  <span>Documented HSE Management System and zero-LTI safety policies</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 p-5 sm:p-8 bg-pure-white border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none shadow-sm lg:shadow-none">
              <h4 className="font-headline-md text-lg sm:text-xl font-bold text-pure-black mb-1 sm:mb-2">
                Submit Vendor Pre-Qualification
              </h4>
              <p className="font-body-md text-surface-variant text-xs mb-4 sm:mb-6 leading-relaxed">
                Direct your corporate capability document and permits to our procurement desk.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3.5 sm:p-4 bg-neutral-50 border border-black/5 rounded-lg lg:rounded-none text-xs font-label-technical">
                  <strong className="text-pure-black block mb-1">Procurement Department</strong>
                  <span className="text-surface-variant break-all">procurement@tulcanepc.com</span>
                </div>
                <Link
                  href="/contact"
                  className="w-full text-center block bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider py-3.5 sm:py-4 border border-primary-container hover:scale-[1.02] transition-transform rounded-lg sm:rounded-xl lg:rounded-none shadow-sm lg:shadow-none"
                >
                  Contact Procurement Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
