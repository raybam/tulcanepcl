import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Sustainability & ESG Framework — Tulcan Energy",
  description: "Creating sustainable value from energy. Explore Tulcan Energy's Environmental, Social, and Governance (ESG) commitments across Nigeria.",
};

export default function SustainabilityPage() {
  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative w-full min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center pt-8 sm:pt-10 pb-10 sm:pb-12 border-b border-black/10 bg-[#161311] text-pure-white">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-65"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerEsg.publicId, SECTION_ASSETS.headerEsg.fallback)}'), url('${SECTION_ASSETS.headerEsg.fallback}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-[#161311]/75 to-[#161311]/40"></div>
            <div className="absolute inset-0 bg-grid opacity-15"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin grid grid-cols-12 gap-grid-gutter my-auto items-center">
            <div className="col-span-12 md:col-span-8 lg:col-span-7">
              <div className="flex items-center space-x-2 sm:space-x-annotation-gap mb-2 sm:mb-3">
                <div className="w-6 sm:w-8 h-[2px] bg-primary"></div>
                <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold">
                  Sustainability Strategy
                </span>
              </div>
              <h1 className="font-headline-xl text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-pure-white mb-3 sm:mb-4 leading-tight font-extrabold tracking-tight">
                Creating sustainable value from energy.
              </h1>
              <p className="font-body-lg text-pure-white/80 max-w-xl text-xs sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6">
                We are committed to operating responsibly, minimizing our environmental footprint, and maximizing positive socio-economic value across our operational landscape.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/sustainability/hse"
                  className="bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider px-6 py-3 sm:py-3.5 border border-primary-container hover:scale-105 transition-transform rounded shadow-sm"
                >
                  HSE Management System
                </Link>
                <Link
                  href="/sustainability/csr"
                  className="bg-white/10 backdrop-blur-md text-pure-white font-label-technical text-xs uppercase tracking-wider px-6 py-3 sm:py-3.5 border border-white/20 hover:border-white transition-all rounded"
                >
                  Community &amp; CSR
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex col-span-12 lg:col-span-5 justify-end items-center">
              <div className="border border-white/20 p-6 bg-surface-container-low/80 backdrop-blur-md rounded-xl max-w-xs shadow-2xl">
                <span className="font-label-technical text-xs text-pure-white/70 block mb-2 uppercase tracking-wider font-semibold">
                  ESG FRAMEWORK ALIGNMENT
                </span>
                <div className="font-headline-md text-2xl text-pure-white mb-1 font-bold">
                  UN SDGs & NUPRC
                </div>
                <div className="font-label-metric text-xs text-primary font-medium">
                  Core Corporate Mandate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESG Interface Section */}
        <section className="py-12 sm:py-16 lg:py-section-v-desktop px-3 sm:px-6 lg:px-container-margin relative border-b border-black/10 bg-pure-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 sm:mb-16 max-w-3xl">
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest font-semibold block mb-1 sm:mb-2">
                Operational Governance
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-5xl font-bold text-pure-black mb-3 sm:mb-4">
                ESG Management Framework
              </h2>
              <p className="font-body-md text-surface-variant text-xs sm:text-sm leading-relaxed">
                Our comprehensive framework for integrating environmental stewardship, social prosperity, and corporate governance into every facet of our exploration and production operations.
              </p>
            </div>

            {/* Bento Grid for ESG */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-grid-gutter">
              {/* Environmental */}
              <div className="col-span-12 lg:col-span-7 bg-pure-white border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none overflow-hidden group hover:border-primary-container hover:shadow-md transition-all duration-300 flex flex-col shadow-sm">
                <div
                  className="h-48 sm:h-64 bg-cover bg-center border-b border-black/10 filter contrast-125 group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqJ7yIeWPsZUpqhrfinvy3PMaPdsDMMePHaOKS78fH8dRo0dI0KTBCoqZwKmMbqfI2VStH9lybcXXJWscIzZXDTdiORhX_RCI_cEZmTgGpuwAaNAjT1WLEscAV0hv6h9qtaDqx3czVJSsABE-N5i_T02ufORdGCIk7CtZfNeDT7hQy3IaYfuyAkrc_DlxthvL6VyJ-QtuIwBhOVW4G1VpTWWBziZC1FNWcDd82ebI9s8dFxQVopYK2')`,
                  }}
                />
                <div className="p-5 sm:p-6 lg:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pure-black">
                        Environmental Stewardship
                      </h3>
                      <span className="material-symbols-outlined text-primary-container text-2xl sm:text-3xl">
                        eco
                      </span>
                    </div>
                    <p className="font-body-md text-surface-variant text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                      Rigorous decarbonization regimens, gas monetization to eliminate routine flaring, and cutting-edge containment systems preserving mangrove and marine biomes.
                    </p>
                  </div>
                  <div className="flex space-x-6 sm:space-x-12 border-t border-black/10 pt-4 sm:pt-6">
                    <div>
                      <div className="font-headline-md text-2xl sm:text-3xl font-bold text-primary-container">
                        Zero
                      </div>
                      <div className="font-label-technical text-[10px] sm:text-xs text-surface-variant uppercase tracking-wider mt-1 font-semibold">
                        Routine Flaring Policy
                      </div>
                    </div>
                    <div>
                      <div className="font-headline-md text-2xl sm:text-3xl font-bold text-primary-container">
                        100%
                      </div>
                      <div className="font-label-technical text-[10px] sm:text-xs text-surface-variant uppercase tracking-wider mt-1 font-semibold">
                        Produced Water Treatment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-pure-white border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none overflow-hidden p-5 sm:p-6 lg:p-8 flex flex-col group hover:border-primary-container hover:shadow-md transition-all duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pure-black">
                    Social &amp; Community
                  </h3>
                  <span className="material-symbols-outlined text-primary-container text-2xl sm:text-3xl">
                    group
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="font-body-md text-surface-variant text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                    Building resilient coastal and riverine communities through long-term Global Memoranda of Understanding (GMoU), educational infrastructure, and healthcare intervention programs.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between border-b border-black/10 pb-2.5 sm:pb-3">
                      <span className="font-label-metric text-xs text-pure-black font-semibold">
                        Host Community Investment
                      </span>
                      <span className="font-label-technical text-xs text-primary-container font-bold">
                        Multi-Million Annual
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-black/10 pb-2.5 sm:pb-3">
                      <span className="font-label-metric text-xs text-pure-black font-semibold">
                        Local Vendor Procurement
                      </span>
                      <span className="font-label-technical text-xs text-primary-container font-bold">
                        &gt; 70% Target
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-1 sm:pb-2">
                      <span className="font-label-metric text-xs text-pure-black font-semibold">
                        Youth Apprenticeships
                      </span>
                      <span className="font-label-technical text-xs text-primary-container font-bold">
                        Annual Intake
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="col-span-12 bg-neutral-50 border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none overflow-hidden p-5 sm:p-6 lg:p-8 group hover:border-primary-container hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-12 gap-6 sm:gap-8 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <span className="material-symbols-outlined text-primary-container text-2xl sm:text-3xl">
                        gavel
                      </span>
                      <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pure-black">
                        Corporate Governance &amp; Anti-Corruption
                      </h3>
                    </div>
                    <p className="font-body-md text-surface-variant text-xs sm:text-sm leading-relaxed">
                      Ensuring transparent oversight, ethical conduct, and zero tolerance for non-compliance. Our board governance audit committee enforces rigorous financial and operational disclosures.
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="border border-black/10 p-4 sm:p-5 rounded-lg sm:rounded-xl lg:rounded-none bg-pure-white shadow-sm">
                      <span className="material-symbols-outlined text-primary-container mb-1 sm:mb-2">
                        policy
                      </span>
                      <div className="font-label-metric text-xs sm:text-sm font-bold text-pure-black">
                        Business Ethics &amp; Compliance
                      </div>
                      <div className="font-label-technical text-[10px] sm:text-[11px] text-surface-variant mt-1 font-semibold">
                        100% BOARD CERTIFIED
                      </div>
                    </div>
                    <div className="border border-black/10 p-4 sm:p-5 rounded-lg sm:rounded-xl lg:rounded-none bg-pure-white shadow-sm">
                      <span className="material-symbols-outlined text-primary-container mb-1 sm:mb-2">
                        verified_user
                      </span>
                      <div className="font-label-metric text-xs sm:text-sm font-bold text-pure-black">
                        Enterprise Risk Governance
                      </div>
                      <div className="font-label-technical text-[10px] sm:text-[11px] text-surface-variant mt-1 font-semibold">
                        NUPRC &amp; INTERNATIONAL AUDIT
                      </div>
                    </div>
                  </div>
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
