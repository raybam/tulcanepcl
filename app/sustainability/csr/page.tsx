import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export const metadata = {
  title: "Corporate Social Responsibility (CSR) — Tulcan Energy",
  description: "Impact Beyond Energy. Discover Tulcan Energy's community development, educational infrastructure, healthcare access, and environmental stewardship programs.",
};

export default function CSRPage() {
  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-[88px]">
        {/* Hero Section */}
        <header className="relative min-h-[720px] flex items-end pb-section-v-desktop pt-24 px-container-margin bg-pure-black text-pure-white">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center opacity-40 grayscale"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerCsr.publicId, SECTION_ASSETS.headerCsr.fallback)}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-grid opacity-20"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-12 gap-grid-gutter pb-12">
            <div className="col-span-12 md:col-span-10 lg:col-span-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-primary"></span>
                <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold">
                  Corporate Social Responsibility
                </span>
              </div>
              <h1 className="font-headline-lg-mobile md:font-headline-xl text-4xl md:text-7xl lg:text-8xl text-pure-white mb-6 uppercase font-extrabold tracking-tight">
                Impact <br />
                <span className="text-on-surface-variant">Beyond Energy.</span>
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                Engineering sustainable futures through strategic investments in host community infrastructure, human capital development, and marine environmental stewardship.
              </p>
            </div>

            <div className="hidden md:flex col-span-12 lg:col-span-4 flex-col justify-end items-end">
              <div className="border border-white/20 bg-white/5 backdrop-blur-md p-6 relative rounded max-w-xs">
                <span className="font-label-technical text-xs text-primary uppercase block mb-1">
                  HOST COMMUNITY GOVERNANCE
                </span>
                <div className="font-headline-md text-2xl text-pure-white mb-1 font-bold">
                  GMoU Framework
                </div>
                <div className="text-xs text-on-surface-variant">
                  Long-term bilateral development pacts with Akwa Ibom & Delta State communities.
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Section 1: Community Development */}
        <section className="py-section-v-desktop px-container-margin relative border-b border-black/10 bg-pure-white">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-grid-gutter relative z-10">
            <div className="col-span-12 md:col-span-4 mb-12 md:mb-0">
              <div className="sticky top-32">
                <span className="font-label-technical text-xs text-primary-container font-semibold uppercase tracking-widest block mb-2">
                  Social Impact
                </span>
                <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-pure-black mb-4">
                  Community Development
                </h2>
                <div className="w-16 h-1 bg-primary-container mb-6"></div>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Strategic investments in foundational infrastructure, focusing on modern educational facilities, potable water treatment, and specialized healthcare delivery in our operational host regions.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Initiative 1 */}
              <div className="border border-black/10 bg-neutral-50/50 p-8 hover:border-primary-container transition-all duration-300 group">
                <div className="w-full h-48 mb-6 overflow-hidden relative border border-black/10 rounded-sm">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLsKQg88p7oqfRq6gYcv6tEtEFTSeU8rT9HiaKR2wS0NnmxEoQHaVMCOTDRRDIo_UKZ_ZdLGs2YaVZS8v9iXgD0gMa_6rbnbTMr6lDPbPcaUyz005ZcA_n2WN45cNCNGZckuk4r-9OrLpge82FrUbPxmZ4Veyo9KXQxJL3bBkHI-PiO9x4BwV_FtANsy23FariTP_NaJHQRWJ4Csl6UDJtmGx1rFk7AO5uRY0kNlH0dL9L2gJXzEi1')`,
                    }}
                  />
                </div>
                <div className="font-label-technical text-xs text-primary-container uppercase tracking-widest mb-2 font-bold">
                  Initiative 01
                </div>
                <h3 className="font-headline-md text-xl font-bold text-pure-black mb-3">
                  Educational Infrastructure & STEM Scholarships
                </h3>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Constructing and equipping modern science laboratories and ICT centers in public secondary schools, backed by annual full-tuition university scholarships for host community students in engineering and geosciences.
                </p>
              </div>

              {/* Initiative 2 */}
              <div className="border border-black/10 bg-neutral-50/50 p-8 hover:border-primary-container transition-all duration-300 group">
                <div className="w-full h-48 mb-6 overflow-hidden relative border border-black/10 rounded-sm">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMXJ7824aaoOobdfWEQ-EhxseWfzocF1QMvVALAG3YarrwEHX4-sDYZg4JftBTHVAk7-LK8V9Z2jxLoLfTDJ5zUO2aQr0PhRhUcTp31DwUjbw2w41NLJxHlXWpASN6XbBkdRvW8jO1_R7VDUl9kE-1ASOJ8tQRY6icKnc3cxlo2EA7gqfh1FUx1h072C3GUvlQGESX0wnV9rWzvKSLpEEZbsR_Q4PtD5tEI91zddrsPMIXNM59UTTt')`,
                    }}
                  />
                </div>
                <div className="font-label-technical text-xs text-primary-container uppercase tracking-widest mb-2 font-bold">
                  Initiative 02
                </div>
                <h3 className="font-headline-md text-xl font-bold text-pure-black mb-3">
                  Healthcare Outreach & Medical Equipment
                </h3>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Deploying primary healthcare center revamps, providing solar electrification for rural maternity clinics, and funding quarterly free medical outreach programs benefiting thousands of coastal residents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Economic Empowerment & Apprenticeships */}
        <section className="py-20 bg-surface-container-low text-pure-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-container-margin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 border border-white/10 bg-black/40">
                <span className="font-label-technical text-xs text-primary uppercase tracking-wider block mb-2">
                  Capacity Building
                </span>
                <h4 className="font-headline-md text-2xl font-bold mb-3">
                  Vocational Technical Skills
                </h4>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Training youth in specialized welding (6G standard), non-destructive testing (NDT), electrical maintenance, and maritime logistics.
                </p>
              </div>

              <div className="p-8 border border-white/10 bg-black/40">
                <span className="font-label-technical text-xs text-primary uppercase tracking-wider block mb-2">
                  Micro-Enterprise
                </span>
                <h4 className="font-headline-md text-2xl font-bold mb-3">
                  Women in Business Grants
                </h4>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Providing seed capital, modern financial literacy training, and cooperative support for female entrepreneurs in fishing and agro-processing.
                </p>
              </div>

              <div className="p-8 border border-white/10 bg-black/40">
                <span className="font-label-technical text-xs text-primary uppercase tracking-wider block mb-2">
                  Ecological Care
                </span>
                <h4 className="font-headline-md text-2xl font-bold mb-3">
                  Mangrove Conservation
                </h4>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Community-led replanting of indigenous coastal mangrove buffers, restoring marine nurseries and combating shoreline tidal erosion.
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
