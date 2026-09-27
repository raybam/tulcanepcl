"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import { buildApiUrl } from "@/lib/api-config";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

interface HomeLeader {
  name: string;
  role: string;
  image: string;
}

interface HomeArticle {
  title: string;
  category: string;
  summary: string;
  image: string;
}

interface HomePartner {
  id?: string;
  name?: string;
  logoUrl: string;
  website?: string;
  category?: string;
  orderIndex?: number;
}

const DEFAULT_PARTNERS: HomePartner[] = [
  {
    id: "partner-1",
    name: "Brightwaters Energy",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289700/brightwaters.png",
    category: "Technical Partner",
    orderIndex: 1,
  },
  {
    id: "partner-2",
    name: "POAA Adit",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289303/poaadit_logo.png",
    category: "Technical Partner",
    orderIndex: 2,
  },
  {
    id: "partner-3",
    name: "Shelf Drilling",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/shelf_drilling.jpg",
    category: "Technical Partner",
    orderIndex: 3,
  },
  {
    id: "partner-4",
    name: "Spectrum Diagnostics",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/spectrum.jpg",
    category: "Technical Partner",
    orderIndex: 4,
  },
  {
    id: "partner-5",
    name: "Parker Hannifin",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/panel_parker.png",
    category: "Technical Partner",
    orderIndex: 5,
  },
  {
    id: "partner-6",
    name: "Halliburton",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/Halliburton.png",
    category: "Technical Partner",
    orderIndex: 6,
  },
  {
    id: "partner-7",
    name: "SLB (Schlumberger)",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/slb.png",
    category: "Technical Partner",
    orderIndex: 7,
  },
  {
    id: "partner-8",
    name: "Baker Hughes",
    logoUrl: "https://res.cloudinary.com/xh7slab6/image/upload/v1790289302/Baker-Hughes-Logo-Symbol-PNG.png",
    category: "Technical Partner",
    orderIndex: 8,
  },
];

const DEFAULT_LEADERS: HomeLeader[] = [
  {
    name: "Tayo Adiatu",
    role: "Managing Director / Chief Executive Officer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAg5V1VshFb0LWdLNzlPT6E-ogaDJZMZ8Slyn2ztRQVS9VIJ0vxgVJH5QF3t8JIutoWFuhQor36gnQQGOEZgKwVTrvBqWHe_3u0rwEs_oeHA_xWZdKrrnb8Z8j_i4krlcW-kRAIcsmDElzUqBjtcy_tI0YHw94pQgZsDoFYFK7Zn7_h3gfrLV30wsgrFJQtA3r8rxY1jbP5WvGOtc08u1IqfpZO3gG6mUpo0VMe1s_c8SMioPY6fVl3",
  },
  {
    name: "Engr. Nnamdi Okonkwo",
    role: "Chief Operating Officer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdP5JKL7Z1MgjSipUt12RJ5hWK6d2QYM9dxnnROI4JSuKHFJ5vs1gPqe5XxbdSz6l3OC7U3u3zg4muIZw_4FFrRkQRMNE8Z4fM8d458BOgBILm-nURtA88K2dtSQ0DrmSvBeCIL5W5fO-ZMp-Ono-sJxfkKUMBxQ3KRSTP-vVfrWPEXELjx6wMOhnCzQcOBUfLfsrckjMSFsI7FUWCMPHgHDJblaDPy7fBdrq2-fQHN-rfUkcbXxLP",
  },
  {
    name: "Folashade Adeleke",
    role: "Chief Financial Officer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfOtwy3tMEk6Ks4WYMjXbmhiRMjxZMSbQIgmCnAt9d81GmZRzBgL0405frkdgu2uYtBI77tnGYZwKqMkeOXUMMRaNBk9XZA4ZWiJKYCtt6ipb2p0SUgGGq8by7GNs5VHXPJsOucj9bZgoHErXnoArE2s0bBYQYAttmzZv6-Hp97zxnl95jVOobNapYhsxMIqKFhz4w_SQENqFmAmD72i2A9TUel2AoEx5hNqLtdjaoxYRMCfNrVgRr",
  },
];

const DEFAULT_ARTICLES: HomeArticle[] = [
  {
    category: "Press Release • Exploration",
    title: "Tulcan Energy Announces Strategic Partnership for Offshore Field Development",
    summary:
      "Accelerating production readiness through cutting-edge deepwater extraction technologies and reservoir simulation models.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTBoIV7LaCYHoGeRfJAWBPiEN90qZXxFvXeArwzmbmLl7SPjgYE363BTSooY7VrGufuIitMgANWYgkyulyE2R6AfEh_tRAZqEqrAJr7fDB3NsNqT9MEyDrOzTceZRzzpMFGLqvMguXumVyK6JVcuTyX2x2Ss4KKHds-ytVMMiG-nXbgfFo2yQykMWx-btFGNp40p24j-flSfw21Iy79gyvkDvxBQ6iLYyEckUz9Nbp1hYST9HmJwjh",
  },
  {
    category: "Sustainability • Host Communities",
    title: "New Community Development & Healthcare Initiative Launched in Host Communities",
    summary:
      "Reinforcing our social license to operate with comprehensive education, clean water, and hospital support programs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBPA-_hGwXQikYpYdWccffnL4hgmuMlrsuw5YkZDMC3eusSFShIUu_EzYqIEN0NMyKGDSxsLX8aRCwzZ11zBnN1Zwn2TVd8-FplH0smRIYLq5P9HJmD3S3ULTADlcEkj1LTfw50H_L7hGA6ynogLeM6gh99yrAen9exq8TWcISrAh6MtpU677VMgyCJwrrTaLfFSAxjXND2RnSmAplnHUJAxcBIS7pK5c2_XU31-zfACp1BZzG1Pq9D",
  },
  {
    category: "Technology • Seismic Interpretation",
    title: "Adoption of AI-Driven Seismic Analysis Tools Optimizes Hydrocarbon Recovery",
    summary:
      "Enhancing seismic resolution and subsurface modeling to de-risk reservoir development and maximize recovery factors.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA40jXGREUAycQqdwoX_qNPU39IqvzUPtNKBNAWK4CMN_zoC5D0N7vwLllwIVEDd2ivyC-xiiMKwFfd_ILeE4RDfhmjfJ2jb8abnxdF8uuAB9h-1f_CCfEe-dnRnXoQZPQyTugG6aqMzmhCHZO1JleeiOqoI1YBsFv5RJwCVw3eg3E8BGglnD3zWvbHM86hLc3UwieWsmeWqzLcovtRPxMwp3hFQDIuEXaIqV4_qeWE6achhuchd14s",
  },
];

export default function HomePage() {
  const [leaders, setLeaders] = useState<HomeLeader[]>([]);
  const [loadingLeaders, setLoadingLeaders] = useState(true);
  const [newsArticles, setNewsArticles] = useState<HomeArticle[]>(DEFAULT_ARTICLES);
  const [partners, setPartners] = useState<HomePartner[]>(DEFAULT_PARTNERS);

  useEffect(() => {
    // Instantaneous hydration from sessionStorage on page load/refresh
    try {
      const cached = sessionStorage.getItem("tulcan_home_leaders_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeaders(parsed);
          setLoadingLeaders(false);
        }
      }
    } catch (_) { }

    // Dynamic fetch for leadership, news, and technical partners
    const fetchHomeData = async () => {
      try {
        const [teamsRes, blogsRes, partnersRes] = await Promise.all([
          fetch(buildApiUrl("/api/admin/teams")),
          fetch(buildApiUrl("/api/admin/blogs")),
          fetch(buildApiUrl("/api/admin/partners")),
        ]);

        if (teamsRes.ok) {
          const tData = await teamsRes.json();
          if (tData.staff && Array.isArray(tData.staff) && tData.staff.length > 0) {
            // Only include members categorized under Executive Leadership or Board
            const execStaff = tData.staff.filter((s: any) => {
              const cat = (s.category || "").toUpperCase().trim();
              return cat === "LEADERSHIP" || cat === "BOARD";
            });

            if (execStaff.length > 0) {
              const sortedStaff = [...execStaff].sort(
                (a: any, b: any) => (Number(a.orderIndex) || 0) - (Number(b.orderIndex) || 0)
              );
              // Limit strictly to the first 3 executive board members
              const mapped = sortedStaff.slice(0, 3).map((s: any) => ({
                name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
                role: s.position || "Executive Officer",
                image: getCloudinaryUrl(s.profileImage, DEFAULT_LEADERS[0].image),
              }));
              setLeaders(mapped);

              try {
                sessionStorage.setItem("tulcan_home_leaders_cache", JSON.stringify(mapped));
              } catch (_) { }
            } else {
              setLeaders(DEFAULT_LEADERS);
            }
          } else {
            setLeaders(DEFAULT_LEADERS);
          }
        } else {
          setLeaders((prev) => (prev.length > 0 ? prev : DEFAULT_LEADERS));
        }

        if (blogsRes.ok) {
          const bData = await blogsRes.json();
          if (bData.blogs && Array.isArray(bData.blogs) && bData.blogs.length > 0) {
            const mapped = bData.blogs.slice(0, 3).map((b: any) => ({
              category: `${b.categoryName || "OPERATIONS"} • ${new Date(b.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`,
              title: b.title,
              summary: b.description || (b.content ? b.content.slice(0, 120) + "..." : ""),
              image: getCloudinaryUrl(b.featuredImage, DEFAULT_ARTICLES[0].image),
            }));
            setNewsArticles(mapped);
          }
        }

        if (partnersRes.ok) {
          const pData = await partnersRes.json();
          if (pData.partners && Array.isArray(pData.partners) && pData.partners.length > 0) {
            setPartners(pData.partners);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic home data:", err);
        setLeaders((prev) => (prev.length > 0 ? prev : DEFAULT_LEADERS));
      } finally {
        setLoadingLeaders(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
      <Navbar />

      {/* 1. Cinematic Hero Carousel Slider */}
      <HeroCarousel />

      {/* 2. Introduction to Tulcan EPCL */}
      {/* 2. Introduction to Tulcan EPCL */}
      <section className="py-14 sm:py-20 md:py-24 bg-pure-white text-center border-b border-black/5">
        <div className="px-3 sm:px-6 lg:px-container-margin max-w-5xl mx-auto">
          <h2 className="font-headline-lg text-xl sm:text-2xl md:text-3xl lg:text-[36px] lg:leading-[1.25] font-extrabold text-primary-container max-w-4xl mx-auto tracking-tight mb-6 sm:mb-8">
            At Tulcan Energy EPCL, we leverage innovation, cutting-edge technology, and subsurface expertise to redefine excellence in the upstream energy sector.
          </h2>
          <p className="font-body-lg text-sm sm:text-base md:text-[17px] md:leading-[1.8] text-neutral-600 max-w-3xl mx-auto font-normal">
            With a proven track record in upstream exploration, appraisal, and field development across our operated concessions, we deliver integrated, value-driven operations tailored to maximize hydrocarbon recovery. Our unwavering commitment to sustainability, HSE excellence, and community partnership ensures we create exceptional value while driving regional energy progress.
          </p>
        </div>
      </section>

      {/* 3. Vision, Mission & Values */}
      <section className="py-14 sm:py-20 lg:py-24 bg-neutral-50/60 text-pure-black border-b border-black/5 overflow-hidden">
        <div className="px-3 sm:px-6 lg:px-container-margin max-w-7xl mx-auto space-y-16 sm:space-y-20">

          {/* DESKTOP VIEW (>= lg): Original 2-Column Alternating Layout */}
          <div className="hidden lg:block space-y-20">
            {/* Row 1: Our Vision (Image LEFT, Text RIGHT) */}
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image LEFT */}
              <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-neutral-900 overflow-hidden border border-black/10 shadow-lg group">
                  <div
                    className="w-full h-full bg-cover bg-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    style={{
                      backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerCorporate.publicId, SECTION_ASSETS.headerCorporate.fallback)}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pure-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-label-technical text-[11px] text-pure-white/90">
                    <span className="uppercase tracking-widest bg-pure-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                      STRATEGIC HORIZON
                    </span>
                    <span className="tracking-wider">TECHNICAL INNOVATION</span>
                  </div>
                </div>
              </div>

              {/* Text RIGHT */}
              <div className="col-span-12 lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center pl-0 lg:pl-4 text-left">
                <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-3 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Our Vision
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-snug mb-5">
                  To become the preferred energy resource partner, driving sustainable growth and technical innovation across Africa.
                </h3>
                <p className="font-body-md text-surface-variant text-base leading-relaxed mb-6">
                  We envision a resilient African energy landscape founded on indigenous operational sovereignty, cutting-edge reservoir telemetry, and capital discipline. Our forward strategy bridges technological mastery with host community trust to establish enduring benchmarks for energy independence.
                </p>
                <div className="flex items-center gap-3 font-label-technical text-xs text-primary-container uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  <span>Long-Term Energy Sovereignty</span>
                </div>
              </div>
            </div>

            {/* Row 2: Our Mission (Text LEFT, Image RIGHT) */}
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Text LEFT */}
              <div className="col-span-12 lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-4 text-left">
                <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-3 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">flag</span>
                  Our Mission
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-snug mb-5">
                  To meet energy needs by creating exceptional and sustainable value through operational excellence, strategic partnerships, and a commitment to our communities.
                </h3>
                <p className="font-body-md text-surface-variant text-base leading-relaxed mb-6">
                  Tulcan Energy transforms hydrocarbon potential into high-yielding, responsible production. Through proprietary technical capabilities, rigorous asset integrity management, and community-centered environmental governance, we deliver reliable energy yields with zero operational compromise.
                </p>
                <div className="flex items-center gap-3 font-label-technical text-xs text-primary-container uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  <span>Operational Integrity &amp; Stewardship</span>
                </div>
              </div>

              {/* Image RIGHT */}
              <div className="col-span-12 lg:col-span-6">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-neutral-900 overflow-hidden border border-black/10 shadow-lg group">
                  <div
                    className="w-full h-full bg-cover bg-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    style={{
                      backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.mission.publicId, SECTION_ASSETS.heroSlide2.fallback)}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pure-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-label-technical text-[11px] text-pure-white/90">
                    <span className="uppercase tracking-widest bg-pure-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                      OPERATIONAL MANDATE
                    </span>
                    <span className="tracking-wider">VALUE CREATION</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (< lg): Centralised, Image-First, Curved-Edge Layout */}
          <div className="block lg:hidden space-y-16">
            {/* Centralised: Our Vision */}
            <div className="max-w-4xl mx-auto text-center">
              {/* 1. Image Comes First with curve & screen-edge margin */}
              <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full max-w-4xl mx-auto bg-neutral-900 overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 shadow-lg group mb-6">
                <div
                  className="w-full h-full bg-cover bg-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  style={{
                    backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerCorporate.publicId, SECTION_ASSETS.headerCorporate.fallback)}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pure-black/75 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-label-technical text-[10px] sm:text-[11px] text-pure-white/90">
                  <span className="uppercase tracking-widest bg-pure-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-sm">
                    STRATEGIC HORIZON
                  </span>
                  <span className="tracking-wider">TECHNICAL INNOVATION</span>
                </div>
              </div>

              {/* 2. "Our Vision" Badge */}
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest inline-flex items-center gap-2 font-bold mb-3 px-3.5 py-1 bg-primary-container/5 rounded-full border border-primary-container/10">
                <span className="material-symbols-outlined text-sm">visibility</span>
                Our Vision
              </span>

              {/* 3. Text Write-up */}
              <h3 className="font-headline-md text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug mb-4 max-w-3xl mx-auto">
                To become the preferred energy resource partner, driving sustainable growth and technical innovation across Africa.
              </h3>
              <p className="font-body-md text-surface-variant text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
                We envision a resilient African energy landscape founded on indigenous operational sovereignty, cutting-edge reservoir telemetry, and capital discipline. Our forward strategy bridges technological mastery with host community trust to establish enduring benchmarks for energy independence.
              </p>
              <div className="inline-flex items-center gap-3 font-label-technical text-xs text-primary-container uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>Long-Term Energy Sovereignty</span>
              </div>
            </div>

            {/* Centralised: Our Mission */}
            <div className="max-w-4xl mx-auto text-center pt-14 border-t border-black/10">
              {/* 1. Image Comes First with curve & screen-edge margin */}
              <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full max-w-4xl mx-auto bg-neutral-900 overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 shadow-lg group mb-6">
                <div
                  className="w-full h-full bg-cover bg-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  style={{
                    backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.mission.publicId, SECTION_ASSETS.heroSlide2.fallback)}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pure-black/75 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-label-technical text-[10px] sm:text-[11px] text-pure-white/90">
                  <span className="uppercase tracking-widest bg-pure-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-sm">
                    OPERATIONAL RIGOR
                  </span>
                  <span className="tracking-wider">PRODUCTION EXCELLENCE</span>
                </div>
              </div>

              {/* 2. "Our Mission" Badge */}
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest inline-flex items-center gap-2 font-bold mb-3 px-3.5 py-1 bg-primary-container/5 rounded-full border border-primary-container/10">
                <span className="material-symbols-outlined text-sm">flag</span>
                Our Mission
              </span>

              {/* 3. Text Write-up */}
              <h3 className="font-headline-md text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug mb-4 max-w-3xl mx-auto">
                To meet energy needs by creating exceptional and sustainable value through operational excellence, strategic partnerships, and a commitment to our communities.
              </h3>
              <p className="font-body-md text-surface-variant text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
                Through disciplined field development, modular early production systems, and strict HSE governance, we systematically de-risk and monetize upstream assets. We execute with precision to supply vital hydrocarbons while safeguarding natural habitats and empowering regional workforces.
              </p>
              <div className="inline-flex items-center gap-3 font-label-technical text-xs text-primary-container uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>Execution Rigor &amp; Community Value</span>
              </div>
            </div>
          </div>

          {/* Core Values with Intro Write-up */}
          <div className="pt-12 sm:pt-16 border-t border-black/10">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-3 font-bold">
                OPERATIONAL PILLARS
              </span>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-4xl font-extrabold text-pure-black mb-4">
                Our Core Values
              </h3>
              <p className="font-body-md text-surface-variant text-sm sm:text-base leading-relaxed">
                At Tulcan Energy EPCL, our culture and operations are anchored by four non-negotiable principles: Respect, Responsibility, Reliability, and Resilience. These foundational values guide how we appraise reservoirs, manage environmental footprints, empower local communities, and govern every joint venture alliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="group border border-black/10 p-5 sm:p-6 lg:p-8 bg-pure-white rounded-xl sm:rounded-2xl lg:rounded-none hover:border-primary-container transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-md text-2xl sm:text-3xl font-extrabold text-primary-container">
                    01
                  </span>
                  <div className="w-10 h-10 rounded-sm lg:rounded-none bg-neutral-100 flex items-center justify-center border border-black/10 group-hover:border-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-xl">handshake</span>
                  </div>
                </div>
                <h4 className="font-headline-md text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-pure-black group-hover:text-primary-container transition-colors">
                  Respect
                </h4>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  We operate with profound respect for the ecosystems we navigate and the communities we partner with, ensuring enduring mutual trust.
                </p>
              </div>

              <div className="group border border-black/10 p-5 sm:p-6 lg:p-8 bg-pure-white rounded-xl sm:rounded-2xl lg:rounded-none hover:border-primary-container transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-md text-2xl sm:text-3xl font-extrabold text-primary-container">
                    02
                  </span>
                  <div className="w-10 h-10 rounded-sm lg:rounded-none bg-neutral-100 flex items-center justify-center border border-black/10 group-hover:border-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-xl">shield</span>
                  </div>
                </div>
                <h4 className="font-headline-md text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-pure-black group-hover:text-primary-container transition-colors">
                  Responsibility
                </h4>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Accountability is engineered into every field decision. We hold ourselves to world-class safety protocols and transparent corporate governance.
                </p>
              </div>

              <div className="group border border-black/10 p-5 sm:p-6 lg:p-8 bg-pure-white rounded-xl sm:rounded-2xl lg:rounded-none hover:border-primary-container transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-md text-2xl sm:text-3xl font-extrabold text-primary-container">
                    03
                  </span>
                  <div className="w-10 h-10 rounded-sm lg:rounded-none bg-neutral-100 flex items-center justify-center border border-black/10 group-hover:border-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-xl">precision_manufacturing</span>
                  </div>
                </div>
                <h4 className="font-headline-md text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-pure-black group-hover:text-primary-container transition-colors">
                  Reliability
                </h4>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Consistent execution is our baseline. Our infrastructure and maintenance regimens are designed for high-uptime, resilient production.
                </p>
              </div>

              <div className="group border border-black/10 p-5 sm:p-6 lg:p-8 bg-pure-white rounded-xl sm:rounded-2xl lg:rounded-none hover:border-primary-container transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-md text-2xl sm:text-3xl font-extrabold text-primary-container">
                    04
                  </span>
                  <div className="w-10 h-10 rounded-sm lg:rounded-none bg-neutral-100 flex items-center justify-center border border-black/10 group-hover:border-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-xl">architecture</span>
                  </div>
                </div>
                <h4 className="font-headline-md text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-pure-black group-hover:text-primary-container transition-colors">
                  Resilience
                </h4>
                <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                  Agility and adaptability guide our response to volatile global markets, turning complex subsea and swamp challenges into durable triumphs.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Assets Overview */}
      <section className="py-14 sm:py-20 lg:py-section-v-desktop bg-surface-container-low text-pure-white border-b border-white/10">
        <div className="px-3 sm:px-6 lg:px-container-margin grid grid-cols-12 gap-6 sm:gap-grid-gutter items-center max-w-7xl mx-auto">
          <div className="col-span-12 lg:col-span-5 space-y-5 sm:space-y-6">
            <span className="font-label-technical text-label-technical text-primary uppercase tracking-widest block">
              Hydrocarbon Concessions
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Strategic Asset Footprint in the Prolific Niger Delta
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed text-sm sm:text-base">
              Tulcan Energy holds operated working interests across high-yield offshore shallow water and onshore swamp concessions, combining proven discovered reserves with fast-track tie-back infrastructure.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
                <div>
                  <strong className="block text-pure-white font-headline-md text-sm sm:text-base">
                    PPL 244 (Tom Shot Bank)
                  </strong>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Shallow offshore fairway (18m–24m water depth) featuring 10+ hydrocarbon-bearing reservoirs and planned subsea manifold tie-backs.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 sm:gap-4">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
                <div>
                  <strong className="block text-pure-white font-headline-md text-sm sm:text-base">
                    PPL 227 (Odimodi Concession)
                  </strong>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Western Niger Delta asset connected to established export trunklines with high operational uptime.
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/assets/tom-shot-bank"
                className="inline-flex items-center gap-2 text-primary font-label-technical text-xs uppercase tracking-widest border-b-2 border-primary pb-1 hover:gap-3 transition-all"
              >
                View Offshore Asset <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/assets/odimodi"
                className="inline-flex items-center gap-2 text-surface-variant font-label-technical text-xs hover:text-primary transition-colors uppercase tracking-widest"
              >
                View Onshore Asset →
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-6 lg:mt-0 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] bg-neutral-900 border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none -mx-3 sm:mx-0 overflow-hidden flex items-center justify-center group shadow-xl">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url('${getCloudinaryUrl("tulcan_energy/hero-2", "/images/hero-2.jpg")}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pure-black/80 via-transparent to-pure-black/30"></div>

            {/* Interactive Map Markers Simulation */}
            <div className="absolute top-[42%] left-[32%] group/marker cursor-pointer">
              <div className="w-5 h-5 bg-primary rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-5 h-5 bg-primary-container rounded-full relative z-10 border-2 border-white flex items-center justify-center shadow-lg"></div>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-pure-white text-pure-black px-3 sm:px-4 py-1.5 sm:py-2 rounded shadow-2xl whitespace-nowrap opacity-90 group-hover/marker:opacity-100 transition-opacity border border-black/10">
                <span className="text-[11px] sm:text-xs font-bold font-label-technical block text-primary-container">
                  TOM SHOT BANK FIELD
                </span>
                <span className="text-[10px] sm:text-[11px] text-surface-variant font-label-technical">
                  Offshore Akwa Ibom • 18-24m Depth
                </span>
              </div>
            </div>

            <div className="absolute top-[58%] left-[58%] group/marker2 cursor-pointer">
              <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-4 h-4 bg-primary-container rounded-full relative z-10 border-2 border-white shadow-lg"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-pure-white text-pure-black px-3 py-1.5 rounded shadow-2xl whitespace-nowrap opacity-0 group-hover/marker2:opacity-100 transition-opacity border border-black/10">
                <span className="text-[11px] sm:text-xs font-bold font-label-technical block text-primary-container">
                  ODIMODI ASSET
                </span>
                <span className="text-[10px] sm:text-[11px] text-surface-variant font-label-technical">
                  Delta State Onshore / Swamp
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Leadership Preview */}
      <section className="py-14 sm:py-20 lg:py-section-v-desktop bg-pure-white text-pure-black border-b border-black/5">
        <div className="px-3 sm:px-6 lg:px-container-margin max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-8">
            <div>
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-2 sm:mb-4 font-semibold">
                Executive Leadership
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold">Guided by Experience</h2>
            </div>
            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-2 text-primary-container font-label-technical text-xs uppercase tracking-widest hover:gap-4 transition-all duration-300 border-b border-primary-container pb-1 font-semibold"
            >
              Meet the Full Team <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {loadingLeaders && leaders.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center w-full">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-full max-w-[400px] flex flex-col animate-pulse">
                  <div className="w-full max-w-[400px] h-[320px] sm:h-[400px] aspect-square bg-neutral-200/70 mb-4 sm:mb-6 border border-black/10 mx-auto rounded-xl sm:rounded-2xl lg:rounded-none" />
                  <div className="h-5 sm:h-6 bg-neutral-200 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-neutral-200/70 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {leaders.map((leader, idx) => (
                <Link
                  key={idx}
                  href="/about/leadership"
                  className="group cursor-pointer w-full max-w-[400px] flex flex-col"
                >
                  <div className="relative w-full max-w-[400px] h-[320px] sm:h-[400px] aspect-square bg-neutral-100 overflow-hidden mb-4 sm:mb-6 border border-black/10 mx-auto rounded-xl sm:rounded-2xl lg:rounded-none shadow-sm group-hover:shadow-md transition-all">
                    <div
                      className="w-full h-full bg-cover bg-center transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${leader.image}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-primary-container/0 group-hover:bg-primary-container/15 transition-colors duration-500 pointer-events-none mix-blend-color" />
                  </div>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold mb-1 group-hover:text-primary-container transition-colors">
                    {leader.name}
                  </h3>
                  <p className="font-label-technical text-surface-variant uppercase tracking-wider text-xs">
                    {leader.role}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Our Technical Partners */}
      <section className="py-14 sm:py-20 lg:py-24 bg-neutral-100/70 text-pure-black border-b border-black/5 overflow-hidden">
        <div className="px-3 sm:px-6 lg:px-container-margin max-w-7xl mx-auto mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
            <div className="max-w-3xl">
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-2 sm:mb-3 font-semibold">
                TIER-ONE ALLIANCES · GLOBAL SUPPLY CHAIN
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-extrabold text-pure-black leading-tight mb-3 sm:mb-4">
                Our Technical Partners
              </h2>
              <p className="font-body-md text-surface-variant text-sm sm:text-base leading-relaxed">
                Tulcan Energy EPCL collaborates with globally recognized engineering contractors, subsurface diagnostics specialists, and marine logistics providers. Our strategic partnerships ensure every offshore and onshore drilling campaign, pipeline tie-back, and facility integration meets the highest international standards of safety, metallurgical integrity, and operational uptime.
              </p>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-primary-container font-label-technical text-xs uppercase tracking-widest hover:gap-3 transition-all border-b border-primary-container pb-1 font-semibold shrink-0"
            >
              Explore Vendor Network <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Technical Partners Logo Carousel */}
        <div className="relative w-full overflow-hidden py-4 sm:py-6">
          <div className="animate-marquee flex items-center gap-4 sm:gap-8">
            {/* Double the list for infinite loop */}
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={`${partner.id || idx}-${idx}`}
                className="w-48 sm:w-64 md:w-72 h-28 sm:h-36 shrink-0 bg-pure-white border border-black/10 px-4 sm:px-6 py-3 sm:py-4 rounded-sm shadow-sm hover:shadow-md hover:border-primary-container transition-all duration-300 group flex items-center justify-center"
              >
                {partner.logoUrl ? (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name || "Technical Partner Logo"}
                      className="max-h-16 sm:max-h-24 max-w-[150px] sm:max-w-[210px] w-auto h-auto object-contain transition-all duration-300 filter grayscale contrast-110 opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-neutral-400">
                    <span className="material-symbols-outlined text-3xl text-primary-container">
                      corporate_fare
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest News */}
      <section className="pt-14 pb-14 sm:pb-20 lg:pb-section-v-desktop bg-pure-white text-pure-black border-b border-black/5">
        <div className="px-3 sm:px-6 lg:px-container-margin max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-8">
            <div>
              <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest block mb-2 sm:mb-4 font-semibold">
                News &amp; Updates
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold">Latest Insights</h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-primary-container font-label-technical text-xs uppercase tracking-widest hover:gap-4 transition-all duration-300 border-b border-primary-container pb-1 font-semibold"
            >
              View All News <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsArticles.map((article, idx) => (
              <Link key={idx} href="/news" className="group cursor-pointer">
                <div className="aspect-video bg-neutral-100 overflow-hidden mb-4 sm:mb-6 relative border border-black/10 rounded-xl sm:rounded-2xl lg:rounded-none shadow-sm group-hover:shadow-md transition-all">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url('${article.image}')`,
                    }}
                  />
                </div>
                <span className="font-label-technical text-[11px] sm:text-xs text-surface-variant uppercase tracking-wider mb-2 block">
                  {article.category}
                </span>
                <h3 className="font-headline-md text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary-container transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="font-body-md text-surface-variant text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="py-16 sm:py-24 bg-surface-container-low text-pure-white relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
        <div className="relative z-10 px-3 sm:px-6 lg:px-container-margin max-w-5xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6">
          <span className="font-label-technical text-xs text-primary uppercase tracking-widest">
            Partner With Us
          </span>
          <h2 className="font-headline-md md:font-headline-lg text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            Unlocking African Energy Potential Through Technical Rigor
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-sm sm:text-base leading-relaxed">
            Discover opportunities for joint ventures, technical collaboration, and supply chain partnerships with Tulcan Energy.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 sm:mt-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-container text-pure-white font-label-technical text-xs px-7 py-3.5 border border-primary-container hover:scale-[1.02] transition-transform uppercase tracking-wider shadow-lg"
            >
              Initiate Discussion
            </Link>
            <Link
              href="/partners"
              className="bg-pure-white/10 backdrop-blur-md text-pure-white font-label-technical text-xs px-7 py-3.5 border border-white/20 hover:border-white transition-all uppercase tracking-wider"
            >
              Vendor Prequalification
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
