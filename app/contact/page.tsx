"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildApiUrl } from "@/lib/api-config";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "Nigeria",
    inquiryType: "Business Development",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(buildApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: formData.inquiryType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "Nigeria",
        inquiryType: "Business Development",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-pure-white text-[#191614] antialiased min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col pt-[88px]">
        {/* Hero Section: Cinematic Offshore Platform */}
        <section className="relative w-full h-[620px] min-h-[520px] flex items-center px-container-margin border-b border-technical-gray/20 bg-pure-black">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{
                backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.headerCorporate.publicId, SECTION_ASSETS.headerCorporate.fallback)}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/70 to-pure-black/30 z-10"></div>
            <div className="absolute inset-0 bg-grid opacity-20 z-10 pointer-events-none"></div>
          </div>

          <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-grid-gutter">
            <div className="md:col-span-8 flex flex-col justify-end pb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-primary"></div>
                <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold">
                  Institutional Engagement
                </span>
              </div>
              <h1 className="font-headline-xl text-5xl md:text-8xl text-pure-white font-extrabold tracking-tight">
                Get in Touch
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-xl mt-4 text-base">
                Engage with our commercial, operations, investor relations, and executive teams across our Nigerian and international hubs.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid: Contact Details & Interactive Form */}
        <div className="bg-pure-white text-pure-black py-section-v-desktop relative z-30">
          <section className="px-container-margin max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Corporate Headquarters */}
              <div className="lg:col-span-5 flex flex-col gap-10 pr-0 lg:pr-8">
                <div>
                  <span className="font-label-technical text-xs text-primary-container font-semibold uppercase tracking-widest block mb-2">
                    Executive Offices
                  </span>
                  <h2 className="font-headline-md text-3xl font-bold text-pure-black mb-4">
                    Corporate Headquarters
                  </h2>
                  <p className="font-body-md text-surface-variant text-sm leading-relaxed">
                    Tulcan Energy Exploration and Production Company Limited operates from the heart of West Africa&apos;s financial and energy hub in Victoria Island, Lagos.
                  </p>
                </div>

                <div className="flex flex-col gap-6 border-t border-black/10 pt-8">
                  {/* Address */}
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary-container mt-1 text-2xl">
                      location_on
                    </span>
                    <div>
                      <h3 className="font-label-technical text-xs text-primary-container font-bold uppercase mb-1">
                        Head Office
                      </h3>
                      <p className="font-body-md text-pure-black text-sm leading-relaxed">
                        Plot 1673, Olakunle Bakare Close,<br />
                        Victoria Island, Lagos, Nigeria.
                      </p>
                    </div>
                  </div>

                  {/* Operational Bases */}
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-primary-container mt-1 text-2xl">
                      hub
                    </span>
                    <div>
                      <h3 className="font-label-technical text-xs text-primary-container font-bold uppercase mb-1">
                        Operational & Field Bases
                      </h3>
                      <p className="font-body-md text-pure-black text-sm leading-relaxed">
                        Port Harcourt Marine Supply Base, Rivers State.<br />
                        Warri Swamp Base & Logistics Yard, Delta State.
                      </p>
                    </div>
                  </div>

                  {/* Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/10">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-1 text-xl">
                        mail
                      </span>
                      <div>
                        <h4 className="font-label-technical text-xs uppercase text-surface-variant mb-1 font-semibold">
                          Inquiries
                        </h4>
                        <a
                          href="mailto:info@tulcanepc.com"
                          className="font-body-md text-sm text-pure-black hover:text-primary-container transition-colors font-medium"
                        >
                          info@tulcanepc.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-primary-container mt-1 text-xl">
                        phone
                      </span>
                      <div>
                        <h4 className="font-label-technical text-xs uppercase text-surface-variant mb-1 font-semibold">
                          Direct Line
                        </h4>
                        <a
                          href="tel:+23412345678"
                          className="font-body-md text-sm text-pure-black hover:text-primary-container transition-colors font-medium"
                        >
                          +234 1 234 5678
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form (FRM-01) */}
              <div className="lg:col-span-7">
                <div className="bg-surface-container-lowest border border-black/15 p-8 md:p-12 relative overflow-hidden text-pure-white rounded shadow-2xl">
                  {/* Technical Annotation Corner */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-[1px] bg-primary-container"></div>
                    <span className="font-label-technical text-xs text-on-surface-variant font-mono">
                      FRM-01 · TRANSMISSION DESK
                    </span>
                  </div>

                  <div className="mb-8">
                    <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold block mb-1">
                      Direct Communication
                    </span>
                    <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-pure-white mb-2">
                      Direct Technical Inquiry
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-sm">
                      For corporate partnerships, vendor prequalification, or asset data rooms, please submit the technical brief below.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="p-8 bg-neutral-900 border border-primary-container/40 rounded text-center">
                      <span className="material-symbols-outlined text-5xl text-primary mb-3 block">
                        task_alt
                      </span>
                      <h4 className="font-headline-md text-2xl font-bold text-pure-white mb-2">
                        Message Transmitted Successfully
                      </h4>
                      <p className="font-body-md text-on-surface-variant text-sm max-w-md mx-auto mb-6">
                        Your inquiry has been logged in our secure database. A designated officer from our corporate communications or commercial desk will review and reply.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider px-6 py-3 border border-primary-container hover:brightness-110"
                      >
                        Submit Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {errorMsg && (
                        <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs rounded">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label
                            className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider"
                            htmlFor="firstName"
                          >
                            First Name *
                          </label>
                          <input
                            required
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Enter first name"
                            className="bg-transparent border-b border-white/20 text-pure-white font-body-md py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label
                            className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider"
                            htmlFor="lastName"
                          >
                            Last Name *
                          </label>
                          <input
                            required
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Enter last name"
                            className="bg-transparent border-b border-white/20 text-pure-white font-body-md py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label
                            className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider"
                            htmlFor="email"
                          >
                            Corporate Email *
                          </label>
                          <input
                            required
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="corporate@domain.com"
                            className="bg-transparent border-b border-white/20 text-pure-white font-body-md py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label
                            className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider"
                            htmlFor="country"
                          >
                            Country / Jurisdiction
                          </label>
                          <input
                            type="text"
                            id="country"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="Nigeria / UK / US / etc."
                            className="bg-transparent border-b border-white/20 text-pure-white font-body-md py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 relative">
                        <label
                          className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider"
                          htmlFor="inquiryType"
                        >
                          Inquiry Subject / Domain
                        </label>
                        <select
                          id="inquiryType"
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="bg-surface-container-lowest border-b border-white/20 text-pure-white font-body-md py-3 text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                        >
                          <option value="Business Development">Upstream Joint Ventures & Business Development</option>
                          <option value="Asset Inquiries">Asset Operations & Field Data Room</option>
                          <option value="Vendor Prequalification">Vendor & Procurement Registration</option>
                          <option value="Investor Relations">Investor Relations & Capital Markets</option>
                          <option value="Media & Press">Corporate Communications & Media</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          className="font-label-technical text-xs text-on-surface-variant uppercase tracking-wider"
                          htmlFor="message"
                        >
                          Technical Brief / Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Provide details regarding your inquiry or technical requirement..."
                          className="bg-transparent border-b border-white/20 text-pure-white font-body-md py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-4 bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-widest py-4 px-8 border border-transparent hover:brightness-110 hover:scale-[1.02] transition-all flex items-center justify-between group w-full sm:w-auto self-start disabled:opacity-50"
                      >
                        <span>{submitting ? "Transmitting..." : "Transmit Message"}</span>
                        <span className="material-symbols-outlined ml-4 group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="mt-24 w-full h-[520px] border-y border-black/10 relative overflow-hidden bg-neutral-950">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale opacity-75 mix-blend-luminosity"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASXMBgwWxpdJZAAbPjnfAmUBrLybjrHU0LNPYbiX8R0jrRLFx8fMwQIcYQSOSaj272FkVMkjLCTVFs53nCYwywd1b0mjUKtRjpyWfAoXeVBPs6cl1zXpyqFhKDEYi088ppurHfarvrXJ84UbQpQPrhCbjEvrmB5BxkxZ3V8-5W35sKIlSPKqWeJ7NF9uJTY0NyHo0_1Jg_wef7KFtzpJx1s3o-ZGNyYUKao3Eg2NjvCKk6dMrA3Bjs')`,
              }}
            />
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-pure-black/90 via-transparent to-pure-black/60"></div>

            <div className="relative z-10 h-full max-w-7xl mx-auto px-container-margin flex flex-col justify-end pb-12">
              <div className="bg-pure-black/85 backdrop-blur-md p-6 border border-white/20 max-w-md text-pure-white rounded">
                <span className="font-label-technical text-[11px] text-primary uppercase tracking-widest block mb-1">
                  STRATEGIC GEOLOCATION
                </span>
                <h4 className="font-headline-md text-xl font-bold mb-1">
                  Lagos Executive Operations Base
                </h4>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-3">
                  Victoria Island, Lagos • Coordinates: LAT 6.4281° N, LON 3.4219° E
                </p>
                <div className="font-label-technical text-[10px] text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-ping"></span>
                  OPERATIONAL CONTROL HUB ONLINE
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
