import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      {/* Hero Section */}
      <header className="relative w-full min-h-[720px] flex items-center pt-24 pb-16 overflow-hidden bg-surface text-pure-white">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full opacity-40 grayscale"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbdpCYbMXtxufo7SUUvMrWNEKwYGM7RdQjmh7iGPcCv_OSQO7uE2ixWd_wpDJ8Jm8dlIx5OP4d_fdrweB97E4DJJ8q0WCwRzd9WrLISipnIPmqItLYcVUTs8OIwXS23LrCLQ8MJxAI_jqzkx4GQvHLijqXJgbtgSSPTZPnppO1GhjTeRPh1i3p_mMLbX4yr7NzRRX7TQbcWhP1qopLh9TIIb5qbIrv6W946HyKvet-Mfio8UBNQ5Pe')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/40"></div>
          <div className="absolute inset-0 bg-grid opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-container-margin">
          <div className="max-w-2xl">
            <span className="font-label-technical text-xs text-primary uppercase tracking-widest block mb-4 font-semibold">
              Vendor Ecosystem & Supply Chain
            </span>
            <h1 className="font-headline-lg-mobile md:font-headline-xl text-4xl md:text-7xl font-extrabold text-pure-white mb-6 tracking-tight leading-tight">
              Collaborating for <span className="text-primary">Precision.</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant mb-10 text-lg leading-relaxed">
              Our technical partners and vendors are integral to our operational excellence. We build resilient, transparent supply chains founded on rigorous engineering standards and mutual technological capability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider px-8 py-4 border border-primary-container hover:scale-105 transition-transform"
              >
                Register as a Vendor
              </Link>
              <a
                href="#partners"
                className="bg-pure-white/10 backdrop-blur-md text-pure-white font-label-technical text-xs uppercase tracking-wider px-8 py-4 border border-white/20 hover:border-white transition-all inline-flex items-center gap-2"
              >
                <span>View Network</span>
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1: Our Partners */}
      <section id="partners" className="py-section-v-desktop bg-pure-white text-pure-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-container-margin relative z-10">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-8">
            <div>
              <span className="font-label-technical text-xs text-primary-container font-semibold uppercase tracking-widest block mb-2">
                Tier-One Network
              </span>
              <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-pure-black tracking-tight">
                Strategic Partnerships
              </h2>
              <p className="font-body-md text-surface-variant text-sm mt-2 max-w-2xl leading-relaxed">
                A world-class alliance of specialized engineering contractors, equipment manufacturers, and subsea infrastructure experts.
              </p>
            </div>
            <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider mt-4 md:mt-0">
              06 KEY CONTRACTORS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.code}
                className="border border-black/10 p-8 hover:border-primary-container transition-all duration-300 group relative bg-neutral-50/40"
              >
                <div className="absolute top-4 right-4 font-label-technical text-xs text-black/40 font-bold">
                  {partner.code}
                </div>
                <div className="h-14 w-14 mb-6 bg-pure-black flex items-center justify-center text-pure-white rounded-DEFAULT group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined text-2xl">{partner.icon}</span>
                </div>
                <span className="font-label-technical text-[11px] text-primary-container uppercase tracking-wider block mb-1 font-semibold">
                  {partner.category}
                </span>
                <h3 className="font-headline-md text-xl font-bold mb-3 text-pure-black group-hover:text-primary-container transition-colors">
                  {partner.name}
                </h3>
                <p className="font-body-md text-surface-variant text-sm mb-6 line-clamp-3 leading-relaxed">
                  {partner.desc}
                </p>
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
      <section className="py-20 bg-neutral-50 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-container-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6">
              <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container block mb-2 font-semibold">
                Vendor Compliance
              </span>
              <h3 className="font-headline-md text-3xl font-bold text-pure-black mb-4">
                Prequalification Requirements
              </h3>
              <p className="font-body-md text-surface-variant text-sm leading-relaxed mb-6">
                All prospective suppliers and service providers must satisfy our stringent vendor assessment protocols to guarantee safety, operational integrity, and full compliance with the Nigerian Oil and Gas Industry Content Development (NOGICD) Act.
              </p>
              <ul className="space-y-3 font-label-technical text-xs text-pure-black">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  <span>NUPRC / NCDMB valid operating permits</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  <span>Audited 3-year financial track record & anti-bribery certification</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                  <span>Documented HSE Management System and zero-LTI safety policies</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 p-8 bg-pure-white border border-black/10 shadow-sm">
              <h4 className="font-headline-md text-xl font-bold text-pure-black mb-2">
                Submit Vendor Pre-Qualification
              </h4>
              <p className="font-body-md text-surface-variant text-xs mb-6">
                Direct your corporate capability document and permits to our procurement desk.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 border border-black/5 text-xs font-label-technical">
                  <strong className="text-pure-black block mb-1">Procurement Department</strong>
                  <span className="text-surface-variant">procurement@tulcanepc.com</span>
                </div>
                <Link
                  href="/contact"
                  className="w-full text-center block bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider py-4 border border-primary-container hover:scale-[1.02] transition-transform"
                >
                  Contact Procurement Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
