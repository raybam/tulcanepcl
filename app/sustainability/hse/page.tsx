import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Health, Safety & Environment (HSE) — Tulcan Energy",
  description: "Our uncompromising culture of hazard elimination, Stop Work Authority, and the 6 Golden Safety Rules at Tulcan Energy.",
};

export default function HSEPage() {
  const goldenRules = [
    {
      number: "01",
      title: "Permit to Work (PTW)",
      desc: "Work will not commence without a valid permit confirming all hazards are identified, atmospheric gas levels tested, and isolation barriers formally certified.",
    },
    {
      number: "02",
      title: "Energy Isolation (LOTO)",
      desc: "Zero tolerance for unverified electrical, mechanical, or hydraulic isolations. Positive Lock-Out/Tag-Out and de-pressurization before intervention.",
    },
    {
      number: "03",
      title: "Confined Space Entry",
      desc: "Continuous multi-gas monitoring, qualified safety watch outside the hatch, and emergency escape breathing apparatus (EEBA) positioned before entry.",
    },
    {
      number: "04",
      title: "Working at Height",
      desc: "100% tie-off using certified double-lanyard harnesses and inspected fall arrest systems when working at 1.8 meters or above without certified guardrails.",
    },
    {
      number: "05",
      title: "Lifting & Rigging Operations",
      desc: "Certified rigging equipment, documented lift plans, and designated exclusion zones. No personnel allowed under a suspended load under any circumstance.",
    },
    {
      number: "06",
      title: "Line of Fire & Driving Safety",
      desc: "Positioning personnel away from stored energy vectors, moving machinery, high-pressure lines, and mandatory in-vehicle speed governing across logistics fleets.",
    },
  ];

  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative min-h-[580px] flex items-center pt-24 pb-16 bg-pure-black text-pure-white border-b border-black/10">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-40 grayscale"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerHse.publicId, SECTION_ASSETS.headerHse.fallback)}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-grid opacity-20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-container-margin w-full">
            <div className="max-w-3xl">
              <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold block mb-4">
                QHSE Policy & Operational Safety
              </span>
              <h1 className="font-headline-lg text-4xl md:text-7xl font-extrabold text-pure-white mb-6 leading-tight tracking-tight">
                Health, Safety & Environment
              </h1>
              <p className="font-body-lg text-on-surface-variant text-lg leading-relaxed mb-8">
                Operating with the belief that all incidents and environmental releases are preventable through systematic hazard identification and disciplined engineering controls.
              </p>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded">
                  <span className="font-headline-md text-3xl font-extrabold text-pure-white block">
                    0 LTI
                  </span>
                  <span className="font-label-technical text-[11px] text-primary uppercase tracking-wider">
                    Lost Time Injuries
                  </span>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded">
                  <span className="font-headline-md text-3xl font-extrabold text-pure-white block">
                    100%
                  </span>
                  <span className="font-label-technical text-[11px] text-primary uppercase tracking-wider">
                    Stop Work Authority
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: HSE Operational Framework */}
        <section className="py-24 bg-pure-white border-b border-black/10">
          <div className="max-w-7xl mx-auto px-container-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center space-x-2 text-primary-container text-xs font-bold uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span>Policy Architecture</span>
                </div>
                <h2 className="font-headline-md text-3xl lg:text-4xl font-bold tracking-tight text-pure-black leading-tight">
                  An Uncompromising Culture of Systematic Hazard Elimination
                </h2>
                <p className="mt-5 text-surface-variant text-sm leading-relaxed">
                  Our Health, Safety, and Environment Management System (HSE-MS) integrates directly into every phase of our upstream and downstream lifecycles—from seismic acquisition and deepwater drilling to pipeline logistics and facility decommissioning.
                </p>
                <div className="mt-8 p-6 bg-neutral-50 border-l-4 border-primary-container rounded-r">
                  <p className="text-sm font-semibold text-neutral-800 italic leading-relaxed">
                    &ldquo;Safety is never compromised for production speed or economic expediency. Every worker, contractor, and visitor holds unconditional Stop Work Authority.&rdquo;
                  </p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-primary-container">
                    — Tulcan Energy HSE Executive Committee
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-neutral-50 border border-black/10 rounded-sm hover:border-primary-container transition shadow-sm">
                  <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center rounded-sm text-primary-container mb-6">
                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-pure-black mb-2">
                    Occupational Health
                  </h3>
                  <p className="font-body-md text-xs text-surface-variant leading-relaxed">
                    Comprehensive pre-employment and routine medical surveillance, fully staffed offshore clinic facilities, and mental health support.
                  </p>
                </div>

                <div className="p-8 bg-neutral-50 border border-black/10 rounded-sm hover:border-primary-container transition shadow-sm">
                  <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center rounded-sm text-primary-container mb-6">
                    <span className="material-symbols-outlined text-2xl">warning</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-pure-black mb-2">
                    Process & Asset Safety
                  </h3>
                  <p className="font-body-md text-xs text-surface-variant leading-relaxed">
                    Real-time asset telemetry, acoustic leak detection, and computerized pipeline integrity monitoring to preempt structural failures.
                  </p>
                </div>

                <div className="p-8 bg-neutral-50 border border-black/10 rounded-sm hover:border-primary-container transition shadow-sm">
                  <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center rounded-sm text-primary-container mb-6">
                    <span className="material-symbols-outlined text-2xl">eco</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-pure-black mb-2">
                    Environmental Care
                  </h3>
                  <p className="font-body-md text-xs text-surface-variant leading-relaxed">
                    Zero discharge standards for marine exploration, closed-loop drilling waste management, and methane reduction protocols aligned with IOGP guidelines.
                  </p>
                </div>

                <div className="p-8 bg-neutral-50 border border-black/10 rounded-sm hover:border-primary-container transition shadow-sm">
                  <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center rounded-sm text-primary-container mb-6">
                    <span className="material-symbols-outlined text-2xl">emergency</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-pure-black mb-2">
                    Emergency Response
                  </h3>
                  <p className="font-body-md text-xs text-surface-variant leading-relaxed">
                    Tier 1, 2, and 3 incident response plans, subsea containment systems, and 24/7 incident command teams coordinated with maritime agencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tulcan's 6 Golden Safety Rules */}
        <section className="py-24 bg-neutral-50 border-b border-black/10">
          <div className="max-w-7xl mx-auto px-container-margin">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center space-x-2 text-primary-container text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span>Operational Directives</span>
              </div>
              <h2 className="font-headline-md text-3xl lg:text-4xl font-extrabold text-pure-black tracking-tight">
                The 6 Golden Safety Rules
              </h2>
              <p className="mt-4 text-surface-variant text-sm leading-relaxed">
                Mandatory operational protocols enforced across all offshore platforms, drillships, flowstations, supply vessels, and corporate bases. Zero exceptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goldenRules.map((rule) => (
                <div
                  key={rule.number}
                  className="bg-pure-white p-8 border border-black/10 rounded-sm hover:border-primary-container transition shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-headline-md text-3xl font-black text-neutral-300">
                      {rule.number}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 bg-red-50 text-primary-container font-bold uppercase tracking-wider rounded">
                      Mandatory
                    </span>
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-pure-black mb-3">
                    {rule.title}
                  </h3>
                  <p className="font-body-md text-xs text-surface-variant leading-relaxed">
                    {rule.desc}
                  </p>
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
