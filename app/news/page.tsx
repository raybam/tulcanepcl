"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildApiUrl } from "@/lib/api-config";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  loc: string;
  image: string;
  summary: string;
  content: string;
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "news-01",
    slug: "phase-ii-expansion-tom-shot-bank",
    title: "Phase II Offshore Subsea Tie-Back Commences at Tom Shot Bank",
    category: "OPERATIONS",
    date: "OCT 24, 2024",
    loc: "LOC: PPL_244",
    image: getCloudinaryUrl("tulcan_energy/hero-1", "/images/hero-1.jpg"),
    summary:
      "Tulcan Energy announces the successful initiation of Phase II offshore operations, expanding subsea tie-backs and boosting sustained production capacity in the Akwa Ibom shallow water fairway.",
    content:
      "Tulcan Energy Exploration and Production Company Limited has officially commenced Phase II subsea infrastructure integration across its operated PPL 244 offshore block. The project entails laying 14 kilometers of insulated subsea flowlines and commissioning an automated wellhead manifold connected to our regional processing facilities. Speaking from Lagos corporate headquarters, executive management reaffirmed that the milestone was achieved with zero lost-time injuries (0 LTI) over 650,000 contractor man-hours, cementing Tulcan's position as a premier technical operator in the Gulf of Guinea.",
  },
  {
    id: "news-02",
    slug: "sustainable-esg-host-communities-empowerment",
    title: "New Sustainable Healthcare & Clean Water Facilities Inaugurated in Host Communities",
    category: "ESG",
    date: "SEP 18, 2024",
    loc: "LOC: DELTA_RIVERINE",
    image: getCloudinaryUrl("tulcan_energy/header-csr", "/images/header-csr.jpg"),
    summary:
      "Reinforcing our social license to operate, Tulcan has formally handed over two solar-powered reverse-osmosis potable water stations and upgraded rural health clinics in host communities.",
    content:
      "In alignment with our Global Memorandum of Understanding (GMoU) commitments, Tulcan Energy has completed and handed over critical civic infrastructure projects across several host communities in coastal Akwa Ibom and Delta states. The initiatives feature fully solarized clean water distribution points and donated diagnostic equipment for primary health clinics. Local traditional leaders and community youth executives commended Tulcan for delivering tangible, life-saving infrastructure ahead of schedule.",
  },
  {
    id: "news-03",
    slug: "ai-driven-seismic-interpretation-partnership",
    title: "Adoption of Deep Reservoir AI Inversion Tools for Subsurface Characterization",
    category: "TECHNOLOGY",
    date: "AUG 05, 2024",
    loc: "LOC: LAGOS_TECH_LAB",
    image: getCloudinaryUrl("tulcan_energy/hero-4", "/images/hero-4.jpg"),
    summary:
      "Tulcan integrates next-generation machine-learning algorithms to interpret complex 3D seismic volumes, accurately imaging bypassed hydrocarbon pay zones.",
    content:
      "By collaborating with leading international geoscience software developers, Tulcan's subsurface exploration team has deployed cutting-edge neural-network seismic inversion tools. The software automatically highlights stratigraphic pinch-outs and deep structural faults in the Agbada Formation, significantly shrinking reservoir appraisal lead times and de-risking prospective development well locations.",
  },
  {
    id: "news-04",
    slug: "strategic-commercial-alliances-upstream",
    title: "Tulcan Energy Consolidates Strategic Joint Venture for Upstream Field Development",
    category: "CORPORATE",
    date: "JUL 12, 2024",
    loc: "LOC: ABUJA_HQ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTBoIV7LaCYHoGeRfJAWBPiEN90qZXxFvXeArwzmbmLl7SPjgYE363BTSooY7VrGufuIitMgANWYgkyulyE2R6AfEh_tRAZqEqrAJr7fDB3NsNqT9MEyDrOzTceZRzzpMFGLqvMguXumVyK6JVcuTyX2x2Ss4KKHds-ytVMMiG-nXbgfFo2yQykMWx-btFGNp40p24j-flSfw21Iy79gyvkDvxBQ6iLYyEckUz9Nbp1hYST9HmJwjh",
    summary:
      "Strengthening operational alliances and infrastructure integration to accelerate production across key Niger Delta asset corridors.",
    content:
      "Tulcan Energy has finalized strategic joint venture agreements to accelerate field development, appraisal engineering, and facility integration across our operated assets. This milestone reinforces our commitment to maximizing domestic hydrocarbon recovery and operational excellence.",
  },
];

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(buildApiUrl("/api/admin/blogs"));
        if (!res.ok) return;
        const data = await res.json();
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          const mapped: Article[] = data.blogs.map((b: any, idx: number) => ({
            id: b.id || `blog-${idx + 1}`,
            slug: b.slug || b.id || `blog-${idx + 1}`,
            title: b.title || "Tulcan Corporate Dispatch",
            category: (b.categoryName || "OPERATIONS").toUpperCase(),
            date: b.createdAt
              ? new Date(b.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).toUpperCase()
              : "RECENT",
            loc: b.loc || "LOC: PPL_244",
            image: getCloudinaryUrl(b.featuredImage, "/images/hero-1.jpg"),
            summary: b.description || (b.content ? b.content.slice(0, 160) + "..." : "Tulcan official dispatch"),
            content: b.content || b.description || "",
          }));
          setArticles(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const filteredArticles =
    activeCategory === "ALL"
      ? articles
      : articles.filter((a) => a.category.toUpperCase() === activeCategory);

  const featured = articles[0] || DEFAULT_ARTICLES[0];

  return (
    <div className="bg-pure-white text-[#191614] antialiased min-h-screen">
      <Navbar />

      <main className="pt-[88px] pb-section-v-desktop px-container-margin max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <header className="py-20 border-b border-black/10 mb-16 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-12 gap-grid-gutter">
            <div className="col-span-12 md:col-span-8">
              <p className="font-label-technical text-xs text-primary-container mb-4 uppercase tracking-widest font-semibold">
                Corporate Intelligence & Dispatches
              </p>
              <h1 className="font-headline-xl text-4xl md:text-6xl lg:text-7xl text-pure-black mb-6 font-extrabold tracking-tight">
                News & Insights.
              </h1>
              <p className="font-body-lg text-surface-variant max-w-2xl text-base leading-relaxed">
                Authoritative updates on our offshore and onshore operations, technology deployments, and community stewardship across Nigeria.
              </p>
            </div>
          </div>
        </header>

        {/* Featured Story */}
        {featured && (
          <section className="mb-20">
            <div
              onClick={() => setSelectedArticle(featured)}
              className="grid grid-cols-12 gap-grid-gutter group cursor-pointer relative bg-neutral-50 border border-black/10 p-4 md:p-8 rounded"
            >
              <div className="col-span-12 md:col-span-7 h-[420px] md:h-[500px] relative overflow-hidden border border-black/10 rounded-sm">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter contrast-110"
                  style={{ backgroundImage: `url('${featured.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pure-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-6 right-6 flex flex-col items-end gap-1 font-label-technical text-xs text-pure-white z-10 bg-pure-black/70 px-3 py-1.5 border border-white/20">
                  <span>{featured.loc}</span>
                  <span className="text-green-400">STATUS: ACTIVE</span>
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 flex flex-col justify-center py-4 md:pl-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-label-technical text-xs text-primary-container px-3 py-1 border border-primary-container/30 bg-primary-container/5 font-bold uppercase">
                    {featured.category}
                  </span>
                  <span className="font-label-technical text-xs text-surface-variant">
                    {featured.date}
                  </span>
                </div>
                <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-pure-black mb-4 group-hover:text-primary-container transition-colors duration-300 leading-snug">
                  {featured.title}
                </h2>
                <p className="font-body-md text-surface-variant text-sm mb-6 leading-relaxed">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-2 text-primary-container font-label-technical text-xs uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                  <span>READ FULL DISPATCH</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter Tabs & Grid */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-black/10 pb-4 mb-10 gap-4">
            <h3 className="font-headline-md text-2xl font-bold text-pure-black">
              All Publications ({filteredArticles.length})
            </h3>
            <div className="flex gap-4 font-label-technical text-xs overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {["ALL", "OPERATIONS", "ESG", "TECHNOLOGY", "CORPORATE"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-1 font-semibold uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? "text-primary-container border-b-2 border-primary-container font-bold"
                      : "text-surface-variant hover:text-pure-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer border border-black/10 p-6 bg-pure-white hover:border-primary-container transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video bg-neutral-100 overflow-hidden mb-5 relative border border-black/10 rounded-sm">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-technical text-[11px] text-primary-container font-bold uppercase">
                      {article.category}
                    </span>
                    <span className="font-label-technical text-[11px] text-surface-variant">
                      {article.date}
                    </span>
                  </div>
                  <h4 className="font-headline-md text-xl font-bold text-pure-black mb-3 group-hover:text-primary-container transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="font-body-md text-surface-variant text-sm mb-4 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-black/5 flex items-center justify-between font-label-technical text-xs text-primary-container font-bold">
                  <span>EXPAND STORY</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-pure-white border border-black/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-sm shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-label-technical uppercase tracking-widest text-primary-container font-bold block mb-1">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-pure-black leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-neutral-500 hover:text-black p-2 text-xl ml-4"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full mb-6 overflow-hidden rounded border border-black/10 relative">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 font-label-technical border border-white/20">
                {selectedArticle.loc}
              </div>
            </div>

            <div className="prose max-w-none font-body-md text-surface-variant text-sm leading-relaxed whitespace-pre-line border-b border-black/10 pb-6 mb-6">
              {selectedArticle.content}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-label-technical text-xs text-surface-variant">
                Tulcan Energy Exploration & Production Company Limited
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-primary-container text-white text-xs font-label-technical uppercase tracking-wider rounded-sm hover:brightness-110"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
