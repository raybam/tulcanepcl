import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Odimodi Asset (PPL 227) — Tulcan Energy",
  description: "Coastal on-shore and swamp gas-rich condensate opportunity in Delta State operated by Tulcan Energy Exploration and Production Company Limited.",
};

export default function OdimodiPage() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative min-h-[820px] flex flex-col justify-end pb-section-v-desktop px-container-margin border-b border-white/10 overflow-hidden bg-pure-black">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-45 grayscale mix-blend-luminosity"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.heroSlide3.publicId, SECTION_ASSETS.heroSlide3.fallback)}')`,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/60 to-pure-black/30 z-0"></div>
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>

          <div className="max-w-4xl z-10 relative pt-24">
            <span className="inline-block border border-white/20 bg-pure-white/10 backdrop-blur-md px-3.5 py-1 font-label-technical text-xs text-primary mb-6 uppercase tracking-widest">
              PPL 227 · WESTERN NIGER DELTA (DELTA STATE)
            </span>
            <h1 className="font-headline-xl text-5xl md:text-8xl lg:text-[110px] lg:leading-[105px] text-pure-white font-extrabold tracking-tighter mb-6 uppercase">
              Odimodi
            </h1>
            <p className="font-body-lg text-body-lg text-pure-white/80 max-w-2xl border-l-2 border-primary-container pl-6 py-2 leading-relaxed">
              A gas-rich condensate asset within Nigeria&apos;s coastal energy landscape, representing a strategic node in our upstream portfolio optimization strategy.
            </p>
          </div>
        </section>

        {/* Technical Snapshot (Bento Grid) */}
        <section className="py-section-v-desktop px-container-margin border-b border-black/10 bg-pure-white">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-grid-gutter">
            <div className="col-span-12 md:col-span-4 flex flex-col justify-between mb-8 md:mb-0">
              <div>
                <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container block mb-2 font-semibold">
                  Field Parameters
                </span>
                <h2 className="font-headline-md text-3xl font-bold text-pure-black mb-4">
                  Technical Snapshot
                </h2>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Key operational metrics and asset parameters for PPL 227 development program.
                </p>
              </div>
              <div className="hidden md:block pt-6">
                <Link
                  href="/contact"
                  className="text-primary-container font-label-technical text-xs uppercase tracking-wider hover:underline flex items-center gap-1 font-semibold"
                >
                  Request Technical Presentation <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Metric Card 1 */}
              <div className="p-8 bg-neutral-50 border border-black/10 hover:border-primary-container transition-colors duration-300 relative group">
                <span className="absolute top-4 right-4 font-label-technical text-xs text-surface-variant/60 group-hover:text-primary-container transition-colors uppercase">
                  AREA
                </span>
                <div className="mt-6">
                  <span className="font-headline-lg text-4xl font-bold text-pure-black block">94</span>
                  <span className="font-label-metric text-xs text-surface-variant uppercase tracking-widest mt-2 block">
                    Sq. Kilometers
                  </span>
                </div>
                <p className="text-xs text-surface-variant mt-4 pt-4 border-t border-black/10">
                  Comprehensive acreage encompassing onshore and mangrove swamp terrains.
                </p>
              </div>

              {/* Metric Card 2 */}
              <div className="p-8 bg-neutral-50 border border-black/10 hover:border-primary-container transition-colors duration-300 relative group">
                <span className="absolute top-4 right-4 font-label-technical text-xs text-surface-variant/60 group-hover:text-primary-container transition-colors uppercase">
                  DEPTH
                </span>
                <div className="mt-6">
                  <span className="font-headline-lg text-4xl font-bold text-pure-black block">12.9k</span>
                  <span className="font-label-metric text-xs text-surface-variant uppercase tracking-widest mt-2 block">
                    Feet TD
                  </span>
                </div>
                <p className="text-xs text-surface-variant mt-4 pt-4 border-t border-black/10">
                  Deep prospectivity targeting multiple productive Agbada sand packages.
                </p>
              </div>

              {/* Metric Card 3 */}
              <div className="p-8 bg-neutral-50 border border-black/10 hover:border-primary-container transition-colors duration-300 relative group">
                <span className="absolute top-4 right-4 font-label-technical text-xs text-surface-variant/60 group-hover:text-primary-container transition-colors uppercase">
                  DATA
                </span>
                <div className="mt-6">
                  <span className="font-headline-lg text-4xl font-bold text-pure-black block">2D/3D</span>
                  <span className="font-label-metric text-xs text-surface-variant uppercase tracking-widest mt-2 block">
                    Seismic Coverage
                  </span>
                </div>
                <p className="text-xs text-surface-variant mt-4 pt-4 border-t border-black/10">
                  Re-processed merged seismic dataset identifying key fault-bounded hydrocarbon traps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Development Strategy & Subsurface Studies */}
        <section className="py-section-v-desktop px-container-margin bg-pure-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-grid-gutter relative z-10">
            {/* Development Strategy */}
            <div className="col-span-12 md:col-span-6 pr-0 md:pr-12">
              <div className="flex items-center space-x-3 mb-6">
                <span className="material-symbols-outlined text-primary-container text-3xl">
                  account_tree
                </span>
                <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-pure-black">
                  Development Strategy
                </h3>
              </div>
              <div className="p-8 bg-neutral-50/80 border border-black/10">
                <p className="font-body-md text-surface-variant mb-6 leading-relaxed text-sm">
                  Our primary objective is to fast-track the development of discovered hydrocarbon and condensate reserves. This involves a phased development approach, prioritizing early production while conducting step-out delineation drilling to define ultimate EUR.
                </p>
                <ul className="space-y-4 font-label-technical text-xs text-pure-black">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-primary-container rounded-full block"></span>
                    <span>Phase 1: Early Production Facility (EPF) Deployment & Test Production</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-primary-container rounded-full block"></span>
                    <span>Phase 2: Full Field Development Plan (FDP) & Pipeline Interconnect</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-primary-container rounded-full block"></span>
                    <span>Phase 3: Production Optimization & Regulatory Compliance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Subsurface Studies */}
            <div className="col-span-12 md:col-span-6 mt-10 md:mt-0 pl-0 md:pl-12 border-t md:border-t-0 md:border-l border-black/10 pt-10 md:pt-0">
              <div className="flex items-center space-x-3 mb-6">
                <span className="material-symbols-outlined text-primary-container text-3xl">
                  layers
                </span>
                <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-pure-black">
                  Subsurface Studies
                </h3>
              </div>
              <div className="p-8 bg-neutral-50/80 border border-black/10 relative">
                <span className="absolute -top-3 right-6 bg-pure-white px-3 py-0.5 font-label-technical text-[10px] text-primary-container font-semibold border border-black/10">
                  ONGOING ANALYSIS
                </span>
                <p className="font-body-md text-surface-variant mb-6 leading-relaxed text-sm">
                  Comprehensive subsurface evaluations are underway, leveraging re-processed 3D seismic inversion to identify bypassed pay zones and optimize future well trajectories. High-fidelity dynamic simulation models mitigate development risk.
                </p>
                <div className="h-2 w-full bg-neutral-200 mt-6 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[85%] transition-all duration-1000"></div>
                </div>
                <p className="font-label-technical text-xs text-primary-container mt-3 text-right font-semibold">
                  RESERVOIR SIMULATION PROGRESS: 85%
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
