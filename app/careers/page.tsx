"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildApiUrl } from "@/lib/api-config";
import { getCloudinaryUrl, SECTION_ASSETS } from "@/lib/cloudinary";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    linkedin: "",
    resumeUrl: "",
    personalSummary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const roles = [
    {
      id: "car-01",
      slug: "lead-reservoir-engineer",
      title: "Lead Reservoir Engineer",
      department: "Subsurface & Geosciences",
      location: "Lagos / Offshore Akwa Ibom",
      employmentType: "Full-Time",
      workType: "Hybrid / Offshore Rotation",
      desc: "Lead dynamic reservoir simulation (Eclipse/Petrel), material balance modeling, pressure transient analysis (PTA), and depletion planning for PPL 244 and PPL 227.",
      requirements: "Minimum 10 years experience in clastic offshore reservoirs, B.Sc./M.Sc. in Petroleum Engineering, deep proficiency in Petrel & Eclipse.",
    },
    {
      id: "car-02",
      slug: "senior-drilling-operations-specialist",
      title: "Senior Drilling & Well Operations Specialist",
      department: "Drilling & Well Completion",
      location: "Port Harcourt / Marine Base",
      employmentType: "Full-Time",
      workType: "Rotational (28/28)",
      desc: "Supervise offshore drilling contractor operations, casing seat design, high-angle directional drilling, mud logging verification, and well control integrity.",
      requirements: "IWCF Level 4 Supervisor certification required. 12+ years experience in shallow-water jack-up drilling campaigns.",
    },
    {
      id: "car-03",
      slug: "qhse-offshore-compliance-lead",
      title: "Lead QHSE & Regulatory Compliance Officer",
      department: "Health, Safety & Environment",
      location: "Offshore PPL 244 / Field Operations",
      employmentType: "Full-Time",
      workType: "Rotational (14/14)",
      desc: "Champion Zero-Harm culture across offshore installation. Conduct audits, maintain safety case documentation for NUPRC, and lead risk assessments.",
      requirements: "NEBOSH Diploma or equivalent, minimum 8 years in upstream oil and gas safety systems management.",
    },
    {
      id: "car-04",
      slug: "subsea-pipeline-integrity-engineer",
      title: "Subsea Pipeline Integrity Engineer",
      department: "Asset Integrity & Subsea",
      location: "Lagos / Site Visits",
      employmentType: "Full-Time",
      workType: "Hybrid",
      desc: "Manage pipeline CP surveys, inline inspection (ILI) data evaluation, riser integrity, and seabed survey analysis for shallow-water export lines.",
      requirements: "B.Sc. Mechanical or Marine Engineering, 7+ years in subsea piping and cathodic protection systems.",
    },
  ];

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const activeRole = roles.find((r) => r.id === selectedJob);
      const res = await fetch(buildApiUrl("/api/careers/apply"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerId: selectedJob,
          careerSlug: activeRole?.slug || "general-application",
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-surface text-pure-white pt-8 sm:pt-10 pb-10 sm:pb-12">
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity grayscale"
            style={{
              backgroundImage: `url('${getCloudinaryUrl(SECTION_ASSETS.heroSlide4.publicId, SECTION_ASSETS.heroSlide4.fallback)}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
          <div className="absolute inset-0 bg-grid opacity-20"></div>

          <div className="relative z-10 text-center px-3 sm:px-6 max-w-5xl mx-auto my-auto py-6 sm:py-8">
            <span className="font-label-technical text-xs text-primary uppercase tracking-widest font-semibold block mb-2 sm:mb-3">
              Join Our Upstream Mission
            </span>
            <h1 className="font-headline-xl text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-3 sm:mb-4 text-pure-white font-extrabold leading-tight">
              Shape the Future <br />
              of Energy.
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-5 sm:mb-6 text-xs sm:text-base md:text-lg leading-relaxed">
              Join a team driven by precision engineering, global scale, and the relentless pursuit of operational excellence in the Nigerian oil and gas sector.
            </p>
            <a
              href="#roles"
              className="bg-primary-container text-pure-white px-6 sm:px-7 py-3 sm:py-3.5 font-label-technical text-xs uppercase tracking-widest border border-primary-container inline-flex items-center gap-2 hover:scale-105 transition-transform rounded shadow-sm"
            >
              <span>View Open Roles</span>
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-6 lg:left-container-margin flex gap-2 sm:gap-annotation-gap items-center border border-white/20 px-2.5 sm:px-3 py-1 bg-surface-container-low/60 backdrop-blur-sm rounded">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="font-label-technical text-[10px] sm:text-xs text-on-surface-variant uppercase font-semibold">
              Active Upstream Recruitment
            </span>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-12 sm:py-16 lg:py-section-v-desktop px-3 sm:px-6 lg:px-container-margin max-w-7xl mx-auto border-b border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-grid-gutter items-center">
            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="h-[2px] w-6 sm:w-8 bg-primary-container"></span>
                <span className="font-label-technical text-xs text-primary-container uppercase tracking-wider font-semibold">
                  Life at Tulcan
                </span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-pure-black leading-tight">
                A Culture of Uncompromising Precision.
              </h2>
              <p className="font-body-md text-surface-variant text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                We operate at the intersection of immense physical scale and critical national infrastructure. Our work environment demands rigorous analytical thinking, flawless execution, and a commitment to safety that supersedes all else.
              </p>
              <p className="font-body-md text-surface-variant text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                At Tulcan, you are surrounded by geoscientists, drilling engineers, and commercial strategists who speak the language of metrics, tolerances, and yields.
              </p>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 border-t border-black/10 pt-4 sm:pt-6">
                <div>
                  <span className="block font-headline-md text-2xl sm:text-3xl font-extrabold text-pure-black mb-1">
                    100%
                  </span>
                  <span className="font-label-technical text-[11px] sm:text-xs text-surface-variant uppercase tracking-wider font-semibold">
                    Indigenous Talent
                  </span>
                </div>
                <div>
                  <span className="block font-headline-md text-2xl sm:text-3xl font-extrabold text-pure-black mb-1">
                    Global
                  </span>
                  <span className="font-label-technical text-[11px] sm:text-xs text-surface-variant uppercase tracking-wider font-semibold">
                    Training Programs
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 relative aspect-[4/3] rounded-xl sm:rounded-2xl lg:rounded-none overflow-hidden border border-black/10 shadow-xl group">
              <div
                className="w-full h-full bg-cover bg-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiqoSXm_MvcB88KOf61f4qgs6EVMm4OYptixsKlOPNYtwE3Sje9X3P7O2XfE1QzQzxWqeGgsyafwL9EWEJuJs3UXzF7LDr8GBRxBuzwur6bsJC-9JxNKKXOm56589WiuxNrmsQ_TlfGZ9G99mYm4pnAPtPzMq6kGaNfNCqQ9nwMkAGGLy8jo5lz6FJiYU_t8XqHU5g7XZ1udBP9gE4LAvzDtQfI1bHQcv-C0fyO3EVtbrceYMirpR8')`,
                }}
              />
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-pure-black/80 px-2.5 sm:px-3 py-1 rounded font-label-technical text-[10px] sm:text-xs text-pure-white backdrop-blur-sm border border-white/20">
                TEAM ENG_OPS_04
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Open Roles */}
        <section id="roles" className="py-12 sm:py-16 lg:py-section-v-desktop px-3 sm:px-6 lg:px-container-margin max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 border-b border-black/10 pb-4 sm:pb-6 gap-2 sm:gap-0">
            <div>
              <span className="font-label-technical text-xs text-primary-container font-semibold uppercase tracking-widest block mb-1 sm:mb-2">
                Opportunities
              </span>
              <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-bold text-pure-black">
                Current Vacancies
              </h2>
            </div>
            <span className="font-label-technical text-[11px] sm:text-xs text-surface-variant uppercase tracking-wider font-semibold">
              04 POSITIONS POSTED
            </span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className="p-5 sm:p-6 lg:p-8 border border-black/10 bg-neutral-50/50 hover:border-primary-container hover:shadow-md transition-all duration-300 rounded-xl sm:rounded-2xl lg:rounded-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 font-label-technical text-[11px] sm:text-xs">
                    <span className="text-primary-container font-bold uppercase">{role.department}</span>
                    <span>•</span>
                    <span className="text-surface-variant uppercase">{role.location}</span>
                    <span>•</span>
                    <span className="text-surface-variant uppercase">{role.employmentType}</span>
                  </div>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-pure-black mb-2 sm:mb-3">
                    {role.title}
                  </h3>
                  <p className="font-body-md text-surface-variant text-xs sm:text-sm mb-3 leading-relaxed">
                    {role.desc}
                  </p>
                  <p className="font-label-technical text-xs text-pure-black/70">
                    <strong className="text-pure-black">Requirements:</strong> {role.requirements}
                  </p>
                </div>

                <div className="flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedJob(role.id);
                      setSubmitSuccess(false);
                      setErrorMessage("");
                    }}
                    className="w-full sm:w-auto text-center bg-primary-container text-pure-white px-6 py-3 font-label-technical text-xs uppercase tracking-widest border border-primary-container hover:scale-105 transition-transform rounded-lg sm:rounded-xl lg:rounded-none shadow-sm"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-pure-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <div className="bg-pure-white w-full max-w-xl border border-black/10 shadow-2xl p-5 sm:p-8 rounded-xl sm:rounded-2xl relative animate-scaleUp">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-surface-variant hover:text-pure-black"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="mb-4 sm:mb-6">
                <span className="font-label-technical text-xs text-primary-container font-bold uppercase tracking-widest block mb-1">
                  Submit Career Application
                </span>
                <h3 className="font-headline-md text-lg sm:text-2xl font-bold text-pure-black">
                  {roles.find((r) => r.id === selectedJob)?.title}
                </h3>
              </div>

              {submitSuccess ? (
                <div className="p-5 sm:p-6 bg-green-50 border border-green-200 text-green-900 rounded-xl text-center">
                  <span className="material-symbols-outlined text-4xl text-green-600 block mb-2">
                    check_circle
                  </span>
                  <h4 className="font-bold text-lg mb-1">Application Received</h4>
                  <p className="text-xs text-green-800 mb-4">
                    Your profile has been logged in our recruitment system. Qualified applicants will be contacted by our HR department.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-primary-container text-pure-white px-6 py-2 text-xs font-label-technical uppercase tracking-wider rounded"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 text-xs rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                      Resume / CV Document URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/... or dropbox link"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label-technical uppercase mb-1 text-pure-black">
                      Personal Statement / Experience Summary
                    </label>
                    <textarea
                      rows={3}
                      value={formData.personalSummary}
                      onChange={(e) => setFormData({ ...formData, personalSummary: e.target.value })}
                      className="w-full border border-black/20 p-2.5 sm:p-3 text-sm rounded-lg outline-none focus:border-primary-container font-body-md"
                      placeholder="Briefly state your relevant oil & gas upstream experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-widest py-3.5 sm:py-4 border border-primary-container hover:scale-[1.01] transition-all disabled:opacity-50 rounded-lg shadow-sm"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
