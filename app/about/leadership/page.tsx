"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildApiUrl } from "@/lib/api-config";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "LEADERSHIP" | "BOARD" | "OPERATING_COMMITTEE";
  tag?: string;
  image: string;
  bio?: string;
  department?: string;
  orderIndex?: number;
}

const DEFAULT_EXECUTIVES: TeamMember[] = [
  {
    id: "EXEC_01",
    name: "Tayo Adiatu",
    role: "Managing Director / Chief Executive Officer",
    category: "LEADERSHIP",
    tag: "Board & Executive",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzBYHBTCq8czsWA_VIc4q-iR44fh5u55TyhgmtzVLZhbcmJoU-FL9h05QF3K3J4Jd6sbZ7aYP7gBZzd8HI8xFQqRpy1K8r4poQHN9jYTYiHxiriUnCO1aMEYYnqxkoN-QcSF7hdGFQgaUVeh3VgVA_DHwCrU8uATR24j_PVlKKCj-LZVFx-qR18JMSCaeQVfSWSotmAOs4Y077douvcG3Hs5J8QFZTZ_1uuorvxP6iHyxyIbBZvSeS",
    bio: "Visionary energy leader with over two decades of technical and commercial mastery across Nigerian upstream and downstream sectors. Spearheading Tulcan's strategic expansion into high-value offshore and onshore hydrocarbon assets.",
  },
  {
    id: "EXEC_02",
    name: "Engr. Nnamdi Okonkwo",
    role: "Executive Director / Chief Operating Officer",
    category: "LEADERSHIP",
    tag: "Board & Executive",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBS6ymxWTK2W6bZhEFhkcC9DuJXfQFDTcgHxYAj6pK1ORwEfAXzJ9y0_PrShitPCm0Hhh8NGyTdeIXaZ2DjJ0qrPA84yYQDZ8JDEikdLmgGqwtckwaKmlGaAC5vg18gRXR-eNmU4nHD3MTdpJsvIYI6xquXIxt57s2dpyaKk1-1de-QaCsmJiatRIOxk2RFaKwa03GBGftwMJPN-H84IlVWt7S0QmgOgP7dAC3F532B4Ufssmz46iSG",
    bio: "Distinguished petroleum engineer with extensive deepwater and swamp operations leadership. Oversees asset integrity, drilling execution, and production optimization regimes.",
  },
];

const DEFAULT_COMMITTEE: TeamMember[] = [
  {
    id: "COMM_01",
    name: "Engr. Robert Chen",
    role: "Head of Subsurface & Reservoir Engineering",
    category: "OPERATING_COMMITTEE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABY707BbfLwzK-bQ0lAOeV_RkfuCWRNW-E-DRHiwjHWTB2KV_AV75zyrYDCt4CUrCSYOCJwE0Qt-PnIsTa5GbYQlBj5xO9ZkBT9H99xEH2mj61rsnBlgNVxuX6X5Apw2ZpWIDRx7Ohd5tuQZVcVnxhDsggr60gjzz5Wrvuvit5nN7MMHDhUsBAcECrlTwGDBe4x_2Vu_K5xqs2fpIH5gfAx-NSev9K9uLM2xKabm2GpVO92tqhjamz",
    department: "Reservoir Management",
    bio: "Expert geoscientist specializing in deepwater seismic inversion, static reservoir modeling, and secondary recovery strategies.",
  },
  {
    id: "COMM_02",
    name: "Folashade Adeleke",
    role: "Chief Financial Officer",
    category: "OPERATING_COMMITTEE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUkx71CXls-oVVtpKiGayOY0xOR1LWGZ72q4ho0Ho_NpKNMLiT_dL9EwfmV2I2wCY8P7GOC-ItNT148wYz8yoJioapU7MysM0imq87k2B-iI1YbUx95Ez9aL990SuyQdNBXnGpHQf8MLfaKjuVVn-l2LiQUSJOlqZHR3t_LPlcUrlSKAWEfXNh_mkPRG__JgBYf_ognIpNzNyreBIUoX-6bReQVHV2l4ny_A1v4N5_pDcgMaTVzES2",
    department: "Finance & Capital Allocation",
    bio: "Chartered accountant and energy finance director with deep expertise in syndicated upstream debt structures and reserve-based lending.",
  },
  {
    id: "COMM_03",
    name: "David Okafor",
    role: "General Manager, Assets & Production Operations",
    category: "OPERATING_COMMITTEE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1N9WUisOy-VCnG-Ga-rhkUyYH9rKY8jOI8z8bCIPCM5Siht0GCCN7osCuLJMAKb3rISkepS7YtakLnrYu7oxNL1Dweog89riESl4y_h0-rqrjtmVIVmej835hBp7GwcByYtt5rDr4OY6JxZx-9slge2VT5_wCLovV_QLQrYUFQlmeXYK7TuuzpxW-x0vy2kq-PN0nlb0b53XvMky8TkN7bZEzQChKfrbAqepXrL1zEPG3zqSmPwx4",
    department: "Asset Integrity",
    bio: "Over 18 years of operations leadership across offshore platforms, subsea flowline networks, and onshore early production facilities.",
  },
  {
    id: "COMM_04",
    name: "Elena Rostova",
    role: "Vice President, Strategy, ESG & Regulatory Affairs",
    category: "OPERATING_COMMITTEE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB95N0keQ2usyNt9Os9GimSohS4i0TxpJXbXrg28jGspsRrDBpIrwWecAGYGWDeBhKmEfmrTBSjTy8H1MJaZCj6zYTUChSLRrNoMtLn8q267AR7T-pH2rsmnxqM2hyltt2eCoQjy-YtHZYERiac2RY3fJpBD9TYsG4A2IE0ulogOKiqEL4fEjanfykICMjAv_imsWZFVpE2gNycfvOCYhJPDaBsW1MvYImW1-ovgdbqh2NXWcMMSlge",
    department: "ESG & Compliance",
    bio: "Leading Tulcan's emissions reduction roadmap, stakeholder community relations under the PIA framework, and corporate compliance.",
  },
];

export default function LeadershipPage() {
  const [executives, setExecutives] = useState<TeamMember[]>([]);
  const [committee, setCommittee] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    // Instantaneous hydration from sessionStorage on browser refresh
    try {
      const cached = sessionStorage.getItem("tulcan_leadership_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.executives && Array.isArray(parsed.executives) && parsed.executives.length > 0) {
          setExecutives(parsed.executives);
          setCommittee(parsed.committee || []);
          setLoading(false);
        }
      }
    } catch (_) {}

    const fetchStaff = async () => {
      try {
        const res = await fetch(buildApiUrl("/api/admin/teams"));
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.staff && Array.isArray(data.staff) && data.staff.length > 0) {
          const mapped: TeamMember[] = data.staff.map((s: any, idx: number) => {
            const rawCat = (s.category || "LEADERSHIP").toUpperCase().trim();
            const normalizedCategory =
              rawCat === "OPERATING_COMMITTEE" || rawCat === "TEAM"
                ? "OPERATING_COMMITTEE"
                : rawCat === "BOARD"
                ? "BOARD"
                : "LEADERSHIP";

            return {
              id: s.id || `MEMBER_${idx + 1}`,
              name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
              role: s.position || "Executive Officer",
              category: normalizedCategory,
              image: getCloudinaryUrl(s.profileImage, "/images/hero-1.jpg"),
              bio: s.bio || "",
              department: s.position,
              tag: normalizedCategory === "OPERATING_COMMITTEE" ? "Operating Committee" : "Board & Executive",
              orderIndex: s.orderIndex !== undefined && s.orderIndex !== null ? Number(s.orderIndex) : idx + 1,
            };
          });

          const execs = mapped
            .filter((m) => m.category === "LEADERSHIP" || m.category === "BOARD")
            .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

          const comm = mapped
            .filter((m) => m.category === "OPERATING_COMMITTEE")
            .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

          const finalExecs = execs.length > 0 ? execs : DEFAULT_EXECUTIVES;
          const finalComm = comm.length > 0 ? comm : DEFAULT_COMMITTEE;

          setExecutives(finalExecs);
          setCommittee(finalComm);

          try {
            sessionStorage.setItem(
              "tulcan_leadership_cache",
              JSON.stringify({ executives: finalExecs, committee: finalComm })
            );
          } catch (_) {}
        } else {
          setExecutives(DEFAULT_EXECUTIVES);
          setCommittee(DEFAULT_COMMITTEE);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic staff:", err);
        setExecutives((prev) => (prev.length > 0 ? prev : DEFAULT_EXECUTIVES));
        setCommittee((prev) => (prev.length > 0 ? prev : DEFAULT_COMMITTEE));
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="bg-pure-white text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Header Banner */}
      <header className="pt-36 pb-16 px-container-margin bg-pure-white border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 font-label-technical text-label-technical text-primary-container uppercase tracking-widest mb-3">
            <span>Corporate Governance</span>
            <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span>
            <span>Executive Team</span>
          </div>

          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-pure-black tracking-tight leading-tight mb-4">
            Leadership & Stewardship
          </h1>

          <p className="font-body-lg text-surface-variant max-w-3xl leading-relaxed">
            Our leadership team unites seasoned industry pioneers, technical reservoir specialists, and disciplined financial strategists to steer Tulcan Energy toward sustained operational dominance.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-container-margin py-section-v-tablet">
        {/* Executive Directors */}
        <section className="mb-24">
          <div className="border-b border-black/10 pb-4 mb-12 flex justify-between items-end">
            <div>
              <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container block mb-1">
                Executive Direction
              </span>
              <h2 className="font-headline-md text-3xl font-bold text-pure-black">Board & Executive Officers</h2>
            </div>
            <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider">
              {loading && executives.length === 0
                ? "..."
                : `${String(executives.length).padStart(2, "0")} PRINCIPALS`}
            </span>
          </div>

          {loading && executives.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-full max-w-[420px] bg-neutral-50/50 p-5 border border-black/10 animate-pulse"
                >
                  <div className="w-full max-w-[400px] h-[400px] aspect-square bg-neutral-200/70 mb-5 mx-auto" />
                  <div className="h-4 bg-neutral-200/80 rounded w-1/3 mb-2" />
                  <div className="h-6 bg-neutral-200 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-neutral-200/60 rounded w-full mb-1" />
                  <div className="h-3 bg-neutral-200/60 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {executives.map((exec) => (
                <article
                  key={exec.id}
                  onClick={() => setSelectedMember(exec)}
                  className="group cursor-pointer bg-neutral-50/50 p-5 border border-black/10 hover:border-primary-container transition-all duration-300 w-full max-w-[420px] flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full max-w-[400px] h-[400px] aspect-square bg-neutral-900 border border-black/10 mb-5 overflow-hidden mx-auto">
                      <div
                        className="w-full h-full bg-cover bg-center transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105"
                        style={{ backgroundImage: `url('${exec.image}')` }}
                      />
                      <div className="absolute inset-0 bg-primary-container/0 group-hover:bg-primary-container/15 transition-colors duration-500 pointer-events-none mix-blend-color" />
                      <div className="absolute top-4 right-4 bg-pure-white px-3 py-1 font-label-technical text-xs text-pure-black border border-black/10 shadow-sm">
                        {exec.tag || "Executive"}
                      </div>
                    </div>

                    <div>
                      <span className="font-label-technical text-xs text-primary-container uppercase tracking-widest font-semibold block mb-1">
                        {exec.role}
                      </span>
                      <h3 className="font-headline-md text-2xl font-bold text-pure-black mb-3 group-hover:text-primary-container transition-colors">
                        {exec.name}
                      </h3>
                      <p className="font-body-md text-surface-variant text-sm leading-relaxed line-clamp-3">
                        {exec.bio}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Operating Committee */}
        <section>
          <div className="border-b border-black/10 pb-4 mb-12 flex justify-between items-end">
            <div>
              <span className="font-label-technical text-xs uppercase tracking-widest text-primary-container block mb-1">
                Operational Governance
              </span>
              <h2 className="font-headline-md text-3xl font-bold text-pure-black">Operating Committee</h2>
            </div>
            <span className="font-label-technical text-xs text-surface-variant uppercase tracking-wider">
              {loading && committee.length === 0
                ? "..."
                : `${String(committee.length).padStart(2, "0")} MEMBERS`}
            </span>
          </div>

          {loading && committee.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-neutral-50/30 p-4 border border-black/10 animate-pulse">
                  <div className="w-full aspect-square bg-neutral-200/70 mb-4" />
                  <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-neutral-200/70 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {committee.map((member, idx) => (
                <article
                  key={member.id || member.name}
                  onClick={() => setSelectedMember(member)}
                  className={`group cursor-pointer bg-neutral-50/30 p-4 border border-black/10 hover:border-primary-container transition-all duration-300 ${
                    idx % 2 === 1 ? "lg:mt-6" : ""
                  }`}
                >
                  <div className="relative w-full aspect-square bg-neutral-900 border border-black/10 mb-4 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      style={{ backgroundImage: `url('${member.image}')` }}
                    />
                  </div>
                  <h4 className="font-headline-md text-lg font-bold text-pure-black mb-1 group-hover:text-primary-container transition-colors">
                    {member.name}
                  </h4>
                  <p className="font-label-technical text-xs text-primary-container font-medium uppercase tracking-wider mb-1">
                    {member.role}
                  </p>
                  {member.department && (
                    <p className="font-label-technical text-[11px] text-surface-variant uppercase">
                      {member.department}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-pure-white border border-black/20 w-full max-w-lg p-6 rounded-sm shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-16 h-16 object-cover rounded-full border border-black/10"
                />
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-pure-black">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs font-label-technical text-primary-container uppercase font-semibold">
                    {selectedMember.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-neutral-500 hover:text-black p-1 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 border-t border-b border-black/10 my-4">
              <span className="text-xs font-label-technical uppercase tracking-widest text-surface-variant block mb-2 font-bold">
                Executive Profile & Credentials
              </span>
              <p className="font-body-md text-surface-variant text-sm leading-relaxed whitespace-pre-line">
                {selectedMember.bio || "Key operational and strategic leader driving Tulcan Energy's growth and operational excellence across Nigerian upstream assets."}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-primary-container text-white text-xs font-label-technical uppercase tracking-wider rounded-sm hover:brightness-110"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
