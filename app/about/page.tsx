import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "About Us — Tulcan Energy",
  description: "Learn about the origins, vision, operational pillars, and strategic precision of Tulcan Energy Exploration and Production Company Limited.",
};

export default function AboutPage() {
  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[580px] pt-36 pb-20 px-container-margin bg-pure-black text-pure-white flex flex-col justify-end border-b border-technical-gray/20">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerCorporate.publicId, SECTION_ASSETS.headerCorporate.fallback)}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-grid opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-3 font-label-technical text-label-technical text-primary uppercase tracking-widest mb-4">
            <span>Corporate Profile</span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            <span>Engineering Excellence</span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-extrabold tracking-tight text-pure-white leading-tight mb-6">
            Precision Engineering.
            <br />
            Sustainable Energy Execution.
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed text-lg mb-6">
            Tulcan Energy Exploration and Production Company Limited operates at the forefront of Nigerian hydrocarbon extraction, delivering institutional value through rigorous geoscience and disciplined capital allocation.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={getCloudinaryUrl(SECTION_ASSETS.companyProfilePdf.publicId, SECTION_ASSETS.companyProfilePdf.fallback)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-widest px-6 py-3 border border-primary-container hover:brightness-110 transition-all shadow-lg"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Download Company Profile (.PDF)
            </a>
            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-pure-white font-label-technical text-xs uppercase tracking-widest px-6 py-3 border border-white/20 transition-all"
            >
              Meet Our Leadership
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/15">
          <div className="flex flex-col">
            <span className="font-headline-md text-3xl font-extrabold text-pure-white">
              2011<span className="text-primary text-xl">+</span>
            </span>
            <span className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider mt-1">
              Established Track Record
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-3xl font-extrabold text-pure-white">
              100<span className="text-primary text-xl">%</span>
            </span>
            <span className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider mt-1">
              Nigerian Indigenous Content
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-3xl font-extrabold text-pure-white">
              0<span className="text-primary text-xl">LTI</span>
            </span>
            <span className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider mt-1">
              Safety First Culture
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-3xl font-extrabold text-pure-white">
              2<span className="text-primary text-xl">+</span>
            </span>
            <span className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider mt-1">
              Key Strategic Asset Basins
            </span>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-section-v-desktop px-container-margin bg-pure-white">
        <div className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 md:col-span-4 border-t border-black/10 pt-6">
            <span className="font-label-technical text-label-technical text-primary-container uppercase tracking-widest block mb-2">
              The Genesis of Tulcan
            </span>
            <h2 className="font-headline-md text-3xl font-bold text-pure-black">Our Story</h2>
          </div>

          <div className="col-span-12 md:col-span-8 border-t border-black/10 pt-6">
            <p className="font-body-lg text-xl text-pure-black font-medium leading-relaxed mb-6">
              Tulcan Energy was forged to tackle complex upstream challenges with engineering precision. From our inception as an agile upstream operator, we recognized that the future of African energy demanded a fundamental shift toward technical rigor, environmental responsibility, and stakeholder collaboration.
            </p>

            <p className="font-body-md text-surface-variant leading-relaxed mb-8">
              Our growth trajectory is defined by strategic asset acquisition, disciplined reservoir appraisal, and deep local content integration. By deploying state-of-the-art seismic interpretation, dynamic reservoir modeling, and environmentally low-impact production facilities, we systematically derisk assets while maximizing yield across our upstream portfolio.
            </p>

            <div className="w-full h-96 relative border border-black/10 rounded-sm overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBuQMnJMAdIbrZmS007PMt4W-QI4e6WmzDZFmk_5llQI2n1v1nP1J5zDpkessojyBydRnlB8h6wOdxYcta5LgRw-SjIdtZJGkxXFMlcfDuBIUNGLCoNJCtTd2JxD0CXNRWiM2iijpg7_gp6_N_fe-aEZPTnGxbhVgi2visejWoTtgjtm01LFyCq_qOyy2syV9aSfXR5bm4GEJuP4L8cBj_MV5nGsRaMJB5rV7H8ADutxBrQjFLN15G')`,
                }}
              />
              <div className="absolute top-4 right-4 bg-pure-black/85 px-4 py-2 font-label-technical text-xs text-pure-white backdrop-blur-md border border-white/20 uppercase tracking-widest">
                ASSET SCHEMATIC: FLOWLINE INFRASTRUCTURE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-section-v-desktop px-container-margin bg-neutral-50/70 border-y border-black/10 relative">
        <div className="grid grid-cols-12 gap-grid-gutter relative z-10">
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center pr-0 md:pr-12 mb-8 md:mb-0">
            <span className="font-label-technical text-label-technical text-primary-container uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">visibility</span> Strategic Vision
            </span>
            <h3 className="font-headline-md md:font-headline-lg text-2xl md:text-4xl font-bold text-pure-black leading-tight">
              To redefine the architecture of African energy security through operational excellence and technical innovation.
            </h3>
          </div>

          <div className="col-span-12 md:col-span-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-black/10 pt-8 md:pt-0 md:pl-12">
            <span className="font-label-technical text-label-technical text-primary-container uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">flag</span> Corporate Mission
            </span>
            <p className="font-body-lg text-lg text-surface-variant leading-relaxed">
              To execute complex upstream operations with unparalleled precision. We deliver vital energy resources through rigorous engineering, uncompromising safety standards, and a strategic commitment to minimizing environmental impact while maximizing lasting value for Nigeria and host communities.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-section-v-desktop px-container-margin bg-pure-white">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-label-technical text-label-technical text-primary-container uppercase tracking-widest block mb-3">
            Operational Pillars
          </span>
          <h2 className="font-headline-md md:font-headline-lg text-3xl md:text-4xl font-bold text-pure-black">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-pure-white p-8 border border-black/10 group hover:border-primary-container transition-all duration-300">
            <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center mb-6 border border-black/10 group-hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-primary-container text-2xl">handshake</span>
            </div>
            <h4 className="font-headline-md text-2xl font-bold text-pure-black mb-3 group-hover:text-primary-container transition-colors">
              Respect
            </h4>
            <p className="font-body-md text-surface-variant text-sm leading-relaxed">
              We operate with profound respect for the ecosystems we navigate and the communities we partner with, ensuring enduring mutual trust.
            </p>
          </div>

          <div className="bg-pure-white p-8 border border-black/10 group hover:border-primary-container transition-all duration-300">
            <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center mb-6 border border-black/10 group-hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-primary-container text-2xl">shield</span>
            </div>
            <h4 className="font-headline-md text-2xl font-bold text-pure-black mb-3 group-hover:text-primary-container transition-colors">
              Responsibility
            </h4>
            <p className="font-body-md text-surface-variant text-sm leading-relaxed">
              Accountability is engineered into every field decision. We hold ourselves to world-class safety protocols and transparent corporate governance.
            </p>
          </div>

          <div className="bg-pure-white p-8 border border-black/10 group hover:border-primary-container transition-all duration-300">
            <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center mb-6 border border-black/10 group-hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-primary-container text-2xl">precision_manufacturing</span>
            </div>
            <h4 className="font-headline-md text-2xl font-bold text-pure-black mb-3 group-hover:text-primary-container transition-colors">
              Reliability
            </h4>
            <p className="font-body-md text-surface-variant text-sm leading-relaxed">
              Consistent execution is our baseline. Our infrastructure and maintenance regimens are designed for high-uptime, resilient production.
            </p>
          </div>

          <div className="bg-pure-white p-8 border border-black/10 group hover:border-primary-container transition-all duration-300">
            <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center mb-6 border border-black/10 group-hover:border-primary-container transition-colors">
              <span className="material-symbols-outlined text-primary-container text-2xl">architecture</span>
            </div>
            <h4 className="font-headline-md text-2xl font-bold text-pure-black mb-3 group-hover:text-primary-container transition-colors">
              Resilience
            </h4>
            <p className="font-body-md text-surface-variant text-sm leading-relaxed">
              Agility and adaptability guide our response to volatile global markets, turning complex subsea and swamp challenges into durable triumphs.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/about/leadership"
            className="inline-flex items-center gap-3 bg-primary-container text-pure-white font-label-technical text-label-technical px-8 py-4 border border-primary-container hover:scale-105 transition-transform uppercase tracking-wider"
          >
            <span>Explore Leadership & Governance</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
