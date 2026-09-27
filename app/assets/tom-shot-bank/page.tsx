import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Tom Shot Bank Asset (PPL 244) — Tulcan Energy",
  description: "Offshore marginal field asset in Akwa Ibom shallow marine waters operated by Tulcan Energy Exploration and Production Company Limited.",
};

export default function TomShotBankPage() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main className="pt-[88px]">
        {/* Asset Hero (Technical Type C) */}
        <section className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b border-technical-gray/30 pt-8 sm:pt-10 pb-10 sm:pb-12 bg-pure-black">
          <div className="absolute inset-0 z-0 opacity-40">
            <div
              className="w-full h-full bg-cover bg-center grayscale mix-blend-luminosity"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.heroSlide1.publicId, SECTION_ASSETS.heroSlide1.fallback)}')`,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-pure-black/90 via-pure-black/60 to-pure-black z-10"></div>
          <div className="absolute inset-0 bg-grid opacity-20 z-10"></div>

          <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-container-margin w-full flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-12 my-auto">
            <div className="w-full md:w-2/3">
              <div className="flex items-center space-x-2 sm:space-x-annotation-gap mb-2 sm:mb-3 opacity-85">
                <span className="w-6 sm:w-8 h-[1px] bg-primary block"></span>
                <span className="font-label-technical uppercase text-primary tracking-widest text-[10px] sm:text-xs font-semibold">
                  PPL 244 · AKWA IBOM OFFSHORE
                </span>
              </div>
              <h1 className="font-headline-xl text-3xl sm:text-5xl md:text-7xl font-extrabold text-pure-white uppercase tracking-tighter mb-3 sm:mb-4 leading-none">
                Tom Shot Bank
              </h1>
              <p className="font-body-lg text-xs sm:text-base md:text-lg text-pure-white/75 max-w-2xl border-l-2 border-primary pl-3 sm:pl-5 py-1 sm:py-1.5 leading-relaxed">
                A cornerstone offshore asset driving high-yield production capabilities. Engineered for scale, optimized for sustained output in dynamic subsea environments.
              </p>
            </div>

            <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col items-center md:items-end">
              <div className="p-5 sm:p-6 bg-white/10 backdrop-blur-md w-full max-w-sm rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl">
                <div className="flex justify-between items-center mb-3 sm:mb-4 border-b border-white/15 pb-2">
                  <span className="font-label-technical text-xs text-pure-white/60 uppercase tracking-wider">Coordinates</span>
                  <span className="font-label-metric text-xs sm:text-sm text-primary font-medium">LOC: 4.221° N, 8.310° E</span>
                </div>
                <div className="flex justify-between items-center mb-3 sm:mb-4 border-b border-white/15 pb-2">
                  <span className="font-label-technical text-xs text-pure-white/60 uppercase tracking-wider">Status</span>
                  <span className="font-label-technical text-xs text-pure-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse"></span>
                    Production Ready
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-technical text-xs text-pure-white/60 uppercase tracking-wider">Operator</span>
                  <span className="font-label-technical text-xs text-pure-white font-semibold">Tulcan Energy (100% WI)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Asset Snapshot */}
        <section className="py-12 sm:py-16 lg:py-section-v-desktop px-3 sm:px-6 lg:px-container-margin border-b border-technical-gray/20 bg-pure-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 sm:mb-16 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-annotation-gap">
                <span className="w-6 sm:w-8 h-[2px] bg-primary-container block"></span>
                <h2 className="font-headline-md text-2xl sm:text-3xl font-bold text-pure-black uppercase tracking-tight">
                  Asset Technical Snapshot
                </h2>
              </div>
              <p className="font-body-md text-surface-variant max-w-md text-xs sm:text-sm leading-relaxed">
                Comprehensive engineering review of PPL 244 field characteristics and production parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Metric Card 1 */}
              <div className="p-5 sm:p-6 lg:p-8 bg-neutral-50/70 border border-black/10 hover:border-primary-container rounded-xl sm:rounded-2xl lg:rounded-none hover:shadow-md transition-all duration-300 group relative">
                <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider block mb-2 sm:mb-4 font-semibold">
                  Areal Extent
                </span>
                <div className="font-headline-lg text-3xl sm:text-4xl font-bold text-pure-black mb-1 sm:mb-2">
                  21 <span className="text-xl sm:text-2xl text-surface-variant">km²</span>
                </div>
                <p className="font-label-metric text-xs text-surface-variant mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-black/10 leading-relaxed">
                  Total mapped structural closure across primary Miocene fault blocks.
                </p>
              </div>

              {/* Metric Card 2 */}
              <div className="p-5 sm:p-6 lg:p-8 bg-neutral-50/70 border border-black/10 hover:border-primary-container rounded-xl sm:rounded-2xl lg:rounded-none hover:shadow-md transition-all duration-300 group relative">
                <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider block mb-2 sm:mb-4 font-semibold">
                  Water Depth
                </span>
                <div className="font-headline-lg text-3xl sm:text-4xl font-bold text-pure-black mb-1 sm:mb-2">
                  30 <span className="text-xl sm:text-2xl text-surface-variant">ft</span>
                </div>
                <p className="font-label-metric text-xs text-surface-variant mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-black/10 leading-relaxed">
                  Shallow marine operational environment; conductor & jacket fixed platform suitable.
                </p>
              </div>

              {/* Metric Card 3 */}
              <div className="p-5 sm:p-6 lg:p-8 bg-neutral-50/70 border border-black/10 hover:border-primary-container rounded-xl sm:rounded-2xl lg:rounded-none hover:shadow-md transition-all duration-300 group relative">
                <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider block mb-2 sm:mb-4 font-semibold">
                  Seismic Coverage
                </span>
                <div className="font-headline-md text-2xl sm:text-3xl font-bold text-pure-black mb-1 sm:mb-2 leading-tight">
                  Full 3D <span className="text-primary-container text-lg sm:text-xl block">Coverage</span>
                </div>
                <p className="font-label-metric text-xs text-surface-variant mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-black/10 leading-relaxed">
                  High-resolution subsurface 3D mapping with complete AVO fluid anomaly identification.
                </p>
              </div>

              {/* Metric Card 4 */}
              <div className="p-5 sm:p-6 lg:p-8 bg-neutral-50/70 border border-black/10 hover:border-primary-container rounded-xl sm:rounded-2xl lg:rounded-none hover:shadow-md transition-all duration-300 group relative">
                <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider block mb-2 sm:mb-4 font-semibold">
                  Crude Specification
                </span>
                <div className="font-headline-lg text-3xl sm:text-4xl font-bold text-pure-black mb-1 sm:mb-2">
                  38° <span className="text-xl sm:text-2xl text-surface-variant">API</span>
                </div>
                <p className="font-label-metric text-xs text-surface-variant mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-black/10 leading-relaxed">
                  Premium Light Sweet Crude, minimal sulfur, commandable Brent premium.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Geological Context & Field Architecture */}
        <section className="py-12 sm:py-16 lg:py-section-v-desktop px-3 sm:px-6 lg:px-container-margin bg-pure-white border-b border-technical-gray/20">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="col-span-12 lg:col-span-6">
              <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container block mb-2 sm:mb-3 font-semibold">
                Reservoir Architecture
              </span>
              <h3 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold text-pure-black leading-tight mb-4 sm:mb-6">
                Fluvial-Deltaic Sandstone Reservoirs of High Porosity
              </h3>
              <p className="font-body-md text-surface-variant leading-relaxed text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                The Tom Shot Bank field is situated in the offshore depobelt of the Niger Delta Basin. The primary pay intervals comprise stacked Agbada Formation sandstones characterized by average porosities of 26% to 31% and permeabilities ranging from 800 to 2,500 millidarcies.
              </p>
              <ul className="space-y-3 font-label-technical text-xs text-pure-black mb-6 sm:mb-8">
                <li className="flex items-start sm:items-center gap-3">
                  <span className="w-2 h-2 bg-primary-container rounded-full block mt-1 sm:mt-0 shrink-0"></span>
                  <span>Primary Drive Mechanism: Combination gas-cap and strong water drive</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="w-2 h-2 bg-primary-container rounded-full block mt-1 sm:mt-0 shrink-0"></span>
                  <span>Well Trajectory: High-angle deviated wells for maximized reservoir contact</span>
                </li>
                <li className="flex items-start sm:items-center gap-3">
                  <span className="w-2 h-2 bg-primary-container rounded-full block mt-1 sm:mt-0 shrink-0"></span>
                  <span>Export Route: Dedicated flowline tie-back to proximate offshore terminal</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider px-6 py-3.5 border border-primary-container hover:scale-105 transition-transform rounded-lg sm:rounded-xl lg:rounded-none shadow-sm"
              >
                Inquire About Technical Data Room
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-6 relative aspect-[4/3] bg-neutral-900 border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none overflow-hidden group shadow-xl">
              <div
                className="w-full h-full bg-cover bg-center filter contrast-125 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBuQMnJMAdIbrZmS007PMt4W-QI4e6WmzDZFmk_5llQI2n1v1nP1J5zDpkessojyBydRnlB8h6wOdxYcta5LgRw-SjIdtZJGkxXFMlcfDuBIUNGLCoNJCtTd2JxD0CXNRWiM2iijpg7_gp6_N_fe-aEZPTnGxbhVgi2visejWoTtgjtm01LFyCq_qOyy2syV9aSfXR5bm4GEJuP4L8cBj_MV5nGsRaMJB5rV7H8ADutxBrQjFLN15G')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pure-black/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-end text-pure-white">
                <div>
                  <span className="font-label-technical text-[10px] text-primary uppercase tracking-widest block font-semibold">
                    FIELD SCHEMATIC
                  </span>
                  <span className="font-headline-md text-base sm:text-lg font-bold">Tom Shot Bank Offshore Conductor</span>
                </div>
                <span className="font-label-technical text-[10px] sm:text-xs bg-pure-black/70 px-2.5 sm:px-3 py-1 rounded border border-white/20">
                  WATER DEPTH: 9.1M
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
