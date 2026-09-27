import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Business Achievements & EPC Capabilities — Tulcan Energy",
  description: "Track record of operational milestones, high-uptime production, EPC project delivery, and certifications at Tulcan Energy.",
};

export default function BusinessPage() {
  const milestones = [
    {
      quarter: "Q3 2023",
      title: "First Oil Milestone at Tom Shot Bank",
      desc: "Successful extraction initiation and test production at the TSB offshore facility, marking a critical transition into high-yield upstream production in the Niger Delta Basin.",
      capacity: "120K BPD",
      depth: "4,200M",
      status: "Operational",
    },
    {
      quarter: "Q1 2023",
      title: "Offshore Production Hub Integration",
      desc: "Completion and rigorous pre-commissioning of the shallow-water flowline tie-back and processing manifold, unlocking accelerated production capabilities.",
      capacity: "50 MMSCFD",
      depth: "Subsea",
      status: "Completed",
    },
    {
      quarter: "Q4 2022",
      title: "Strategic Pipeline Integrity & Telemetry Modernization",
      desc: "Complete refurbishment and automated telemetry deployment across 500km of transmission infrastructure, integrating fiber-optic real-time leak detection.",
      capacity: "99.4% Uptime",
      depth: "Transmission",
      status: "Deployed",
    },
    {
      quarter: "Q2 2021",
      title: "Asset Commercialization & PPL Licensing",
      desc: "Formal award and regulatory confirmation of PPL 244 and PPL 227 by the Nigerian Upstream Petroleum Regulatory Commission (NUPRC).",
      capacity: "100% WI",
      depth: "Basin Wide",
      status: "Ratified",
    },
  ];

  const awards = [
    {
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      desc: "Certified for rigorous quality control, asset design governance, and end-to-end operational traceability.",
      issuer: "International Organization for Standardization",
    },
    {
      title: "ISO 45001:2018",
      subtitle: "Occupational Health & Safety",
      desc: "Zero Lost Time Injuries (LTI) standard achieved across all operated facilities, drilling assets, and contractor yards.",
      issuer: "Global QHSE Auditing Board",
    },
    {
      title: "NCDMB Category A",
      subtitle: "Nigerian Content Excellence",
      desc: "Accredited Tier-1 indigenous upstream exploration and production operating partner with 100% domestic technical leadership.",
      issuer: "Nigerian Content Development & Monitoring Board",
    },
  ];

  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 bg-pure-black text-pure-white border-b border-white/10">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-pure-black/70 z-10"></div>
            <div
              className="w-full h-full bg-cover bg-center opacity-75"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.heroSlide4.publicId, SECTION_ASSETS.heroSlide4.fallback)}')`,
              }}
            />
          </div>

          <div className="relative z-20 w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-container-margin text-center my-auto">
            <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold block mb-2 sm:mb-3">
              Commercial &amp; Operational Capability
            </span>
            <h1 className="font-headline-lg-mobile md:font-headline-xl text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-pure-white font-extrabold tracking-tight mb-3 sm:mb-4 leading-tight">
              A Record of Excellence.
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed">
              Executing complex energy solutions with engineering precision. Delivering monumental infrastructure projects across Nigeria with unyielding technical standards.
            </p>
          </div>

          <div className="absolute bottom-6 right-3 sm:right-6 lg:right-container-margin z-20 hidden sm:flex items-center gap-2 sm:gap-annotation-gap">
            <div className="w-8 h-[1px] bg-pure-white/30"></div>
            <span className="font-label-technical text-xs text-pure-white/80 uppercase tracking-wider font-semibold">
              OPERATIONAL BENCHMARK: 99.4% UPTIME
            </span>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="bg-pure-white text-pure-black py-12 sm:py-16 lg:py-section-v-desktop relative border-b border-black/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-grid-gutter">
            <div className="col-span-1 md:col-span-4 border-l-2 border-primary-container pl-4 sm:pl-8 relative">
              <div className="md:sticky md:top-32">
                <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container font-semibold block mb-2">
                  Chronological Track Record
                </span>
                <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold text-pure-black mb-3 sm:mb-4">
                  Operational Milestones
                </h2>
                <p className="font-body-md text-surface-variant text-xs sm:text-sm leading-relaxed">
                  A disciplined record of reservoir appraisal, infrastructure commissioning, and production milestones across Nigerian hydrocarbon basins.
                </p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-7 md:col-start-6 flex flex-col gap-8 sm:gap-12 relative">
              {milestones.map((m, index) => (
                <div key={m.title} className="relative border-l-2 border-black/10 pl-6 sm:pl-8 pb-3 sm:pb-4">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-pure-white border-4 border-primary-container"></div>
                  <span className="font-label-technical text-xs text-primary-container font-bold uppercase tracking-wider block mb-1">
                    {m.quarter} • {m.status}
                  </span>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pure-black mb-2 sm:mb-3">
                    {m.title}
                  </h3>
                  <p className="font-body-md text-surface-variant text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    {m.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm">
                    <div className="border border-black/10 p-3 bg-neutral-50 rounded-lg sm:rounded-xl lg:rounded-none">
                      <span className="font-label-technical text-[10px] text-surface-variant block uppercase font-semibold">
                        SCALE / CAPACITY
                      </span>
                      <span className="font-headline-md text-base sm:text-lg font-bold text-pure-black">
                        {m.capacity}
                      </span>
                    </div>
                    <div className="border border-black/10 p-3 bg-neutral-50 rounded-lg sm:rounded-xl lg:rounded-none">
                      <span className="font-label-technical text-[10px] text-surface-variant block uppercase font-semibold">
                        TARGET DOMAIN
                      </span>
                      <span className="font-headline-md text-base sm:text-lg font-bold text-pure-black">
                        {m.depth}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Footprint Gallery */}
        <section className="bg-surface text-on-surface py-12 sm:py-16 lg:py-section-v-desktop relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin mb-8 sm:mb-12">
            <span className="font-label-technical text-xs text-primary uppercase tracking-widest block mb-2 font-semibold">
              Infrastructure & Operations
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl sm:text-3xl md:text-5xl font-bold text-pure-white">
              Operational Footprint
            </h2>
            <div className="w-full h-[1px] bg-white/15 mt-4 sm:mt-6"></div>
          </div>

          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-grid-gutter">
            {/* Large Feature */}
            <div className="col-span-1 md:col-span-8 relative group cursor-pointer border border-white/10 bg-neutral-950 h-[320px] sm:h-[400px] md:h-[550px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-none shadow-lg">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-75 group-hover:opacity-100 group-hover:scale-105 group-hover:mix-blend-normal transition-all duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAE7nru3YGV76Wn6VOxHQ7aCiW-PN88ljSvx-fIV2z1fgli7xFVUjXcftqh_1_ZefdDdWDlHw9wY9foVL3SOTJK6rlgemwTgOhCWs1P1DWdb1hN7SQJEzHoj0_GIRogDl_s2dM_SFUSojlLW9z3UtEVsxFmXwjN82mTdSzhBV_0_XlhLb8Sx9H3CpezxIQlvB_MKW6XcOTiKyqA4dvIo7tlp6cIhu_3mjyLLP7BTDubkp5SdbLgb_kE')`,
                }}
              />
              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 bg-gradient-to-t from-pure-black via-pure-black/80 to-transparent">
                <span className="font-label-technical text-[10px] sm:text-xs text-primary uppercase tracking-widest mb-1 sm:mb-2 block font-semibold">
                  SITE ALPHA-01 · COASTAL TERMINAL
                </span>
                <h3 className="font-headline-md text-lg sm:text-2xl font-bold text-pure-white">
                  Primary Flowstation & Storage Facility
                </h3>
              </div>
            </div>

            {/* Vertical Stack */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-4 sm:gap-grid-gutter">
              <div className="relative group cursor-pointer border border-white/10 bg-neutral-950 h-[220px] sm:h-[260px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-none shadow-md">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-75 group-hover:opacity-100 group-hover:scale-105 group-hover:mix-blend-normal transition-all duration-700"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7vz2Vwd3DyFqUXV3D4-5RZTsudQIFHfvx8yWe4ZCzJwxfQdKXf-hLqmiq0nMTBHiuMnUhfgv39GCNSayyiMdg8ANZ1_1rifIWSB2gPD6wjztKP1fyrwRefbEpzrfkWEtL18IYVxLuyRRF9uuNc-FNA6bsf2LxNta_Ycjm_pOw9nY0vNYBNANGovPQWDrmfao92uRslQ0i3t9s75lCRJ8LdWzNwqdFXZQXtFl5WOjf6KxPQc8dlcmG')`,
                  }}
                />
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-pure-black via-pure-black/80 to-transparent">
                  <span className="font-label-technical text-[10px] text-primary uppercase tracking-wider block font-semibold">
                    SCADA SYSTEM
                  </span>
                  <h3 className="font-headline-md text-base sm:text-lg font-bold text-pure-white">
                    Central Telemetry & Process Diagnostics
                  </h3>
                </div>
              </div>

              <div className="relative group cursor-pointer border border-white/10 bg-neutral-950 h-[220px] sm:h-[260px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-none shadow-md">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-75 group-hover:opacity-100 group-hover:scale-105 group-hover:mix-blend-normal transition-all duration-700"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyP0qBbqpDoz3S2xWvQ_SqC26y4Ru__62Mlx00FYMxHDVF-bi3Oe1chK4YbxmTH6_-5gcGIKCcFmBzSYl-4oiJPwQiqU2wllUU5g5aQpITM3QS_FULUKHBy7qEyrWg_8Yi8qfEIbiTeUNtJUcaSK8YIhRjxF80sO9n4MVytBX6rbjfYuipP17-_E42fbK0dpk1omySo8oUsUbCu33J7CYT3Zj4P0bWBjfaAnIHFps0otiZGlH9kwD6')`,
                  }}
                />
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 bg-gradient-to-t from-pure-black via-pure-black/80 to-transparent">
                  <span className="font-label-technical text-[10px] text-primary uppercase tracking-wider block font-semibold">
                    SUBSEA MANIFOLD
                  </span>
                  <h3 className="font-headline-md text-base sm:text-lg font-bold text-pure-white">
                    Wellhead & High-Pressure Conductor Infrastructure
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recognition & Certification */}
        <section className="bg-pure-white text-pure-black py-12 sm:py-16 lg:py-section-v-desktop">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin">
            <div className="text-center mb-10 sm:mb-16">
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-2 font-semibold">
                Governance & Compliance
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold text-pure-black mb-3 sm:mb-4">
                Recognition & Industry Accreditations
              </h2>
              <p className="font-body-md text-surface-variant max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
                Independent validation of our adherence to international QHSE standards, local content compliance, and operational integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {awards.map((award) => (
                <div
                  key={award.title}
                  className="p-5 sm:p-6 lg:p-8 border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none hover:border-primary-container hover:shadow-md transition-all duration-300 relative group bg-neutral-50/50"
                >
                  <span className="font-label-technical text-xs text-primary-container font-bold uppercase tracking-wider block mb-2">
                    {award.subtitle}
                  </span>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pure-black mb-2 sm:mb-3">
                    {award.title}
                  </h3>
                  <p className="font-body-md text-surface-variant text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {award.desc}
                  </p>
                  <div className="pt-3 sm:pt-4 border-t border-black/10 text-[10px] sm:text-[11px] font-label-technical text-surface-variant/80 uppercase font-semibold">
                    ISSUER: {award.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
