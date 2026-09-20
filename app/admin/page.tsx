"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buildApiUrl } from "@/lib/api-config";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "inquiries" | "applications" | "blogs" | "teams"
  >("overview");

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInquiries: 0,
    unreadInquiries: 0,
    totalApplications: 0,
    totalBlogs: 0,
    totalStaff: 0,
  });

  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  // Selected item modal view
  const [activeModal, setActiveModal] = useState<
    "addBlog" | "addTeam" | "editTeam" | "viewInquiry" | null
  >(null);
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  // Form states
  const [blogForm, setBlogForm] = useState({
    title: "",
    categoryName: "Operations",
    description: "",
    featuredImage: "",
    content: "",
    isPublished: true,
  });

  const [teamForm, setTeamForm] = useState({
    firstName: "",
    lastName: "",
    position: "",
    category: "LEADERSHIP",
    bio: "",
    profileImage: "",
    orderIndex: 1,
  });

  const [editTeamForm, setEditTeamForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    position: "",
    category: "LEADERSHIP",
    bio: "",
    profileImage: "",
    orderIndex: 1,
  });

  const [actionMessage, setActionMessage] = useState("");

  // Uploading state
  const [uploadingBlogImg, setUploadingBlogImg] = useState(false);
  const [uploadingTeamImg, setUploadingTeamImg] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [companyProfileUrl, setCompanyProfileUrl] = useState("/docs/Tulcan_Energy_Company_Profile.pdf");

  const handleFileUpload = async (
    file: File,
    type: "blog" | "team" | "doc"
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "folder",
      type === "doc"
        ? "tulcan_energy/docs"
        : type === "team"
        ? "tulcan_energy/team"
        : "tulcan_energy/blogs"
    );

    if (type === "blog") setUploadingBlogImg(true);
    if (type === "team") setUploadingTeamImg(true);
    if (type === "doc") setUploadingDoc(true);

    try {
      const res = await fetch(buildApiUrl("/api/upload"), {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (type === "blog") {
          setBlogForm((prev) => ({ ...prev, featuredImage: data.url }));
          setActionMessage(`Article image uploaded successfully via ${data.provider}.`);
        } else if (type === "team") {
          if (activeModal === "editTeam") {
            setEditTeamForm((prev) => ({ ...prev, profileImage: data.url }));
          } else {
            setTeamForm((prev) => ({ ...prev, profileImage: data.url }));
          }
          setActionMessage(`Profile photo uploaded successfully via ${data.provider}.`);
        } else if (type === "doc") {
          setCompanyProfileUrl(data.url);
          setActionMessage(`Company profile document updated successfully via ${data.provider}.`);
        }
      } else {
        alert(data.error || "Failed to upload file");
      }
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      if (type === "blog") setUploadingBlogImg(false);
      if (type === "team") setUploadingTeamImg(false);
      if (type === "doc") setUploadingDoc(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ovRes, inqRes, appRes, blogRes, teamRes] = await Promise.all([
        fetch(buildApiUrl("/api/admin/overview")),
        fetch(buildApiUrl("/api/admin/inquiries")),
        fetch(buildApiUrl("/api/admin/applications")),
        fetch(buildApiUrl("/api/admin/blogs")),
        fetch(buildApiUrl("/api/admin/teams")),
      ]);

      const [ovData, inqData, appData, blogData, teamData] = await Promise.all([
        ovRes.json(),
        inqRes.json(),
        appRes.json(),
        blogRes.json(),
        teamRes.json(),
      ]);

      if (ovData.stats) setStats(ovData.stats);
      if (inqData.inquiries) setInquiries(inqData.inquiries);
      if (appData.applications) setApplications(appData.applications);
      if (blogData.blogs) setBlogs(blogData.blogs);
      if (teamData.staff) setTeams(teamData.staff);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminUser, setAdminUser] = useState<{ id: string; email: string; name: string; role: string } | null>(null);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("admin@tulcanenergy.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check existing session on load
  const checkSession = async () => {
    setCheckingAuth(true);
    try {
      const res = await fetch(buildApiUrl("/api/auth/session"));
      const data = await res.json();
      if (data.authenticated && data.user) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        fetchData();
      } else {
        setIsAuthenticated(false);
        setAdminUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setAdminUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch(buildApiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        setLoginPassword("");
        fetchData();
      } else {
        setLoginError(data.error || "Authentication failed. Please verify your email and password.");
      }
    } catch (err: any) {
      setLoginError("Connection failed: " + (err.message || "Server unreachable"));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(buildApiUrl("/api/auth/logout"), { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    setAdminUser(null);
    setLoginPassword("");
  };

  const handleToggleRead = async (id: string, current: boolean) => {
    await fetch(buildApiUrl("/api/admin/inquiries"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: !current }),
    });
    fetchData();
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    await fetch(buildApiUrl(`/api/admin/inquiries?id=${id}`), { method: "DELETE" });
    fetchData();
  };

  const handleUpdateAppStatus = async (id: string, status: string) => {
    await fetch(buildApiUrl("/api/admin/applications"), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(buildApiUrl("/api/admin/blogs"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm),
      });
      if (res.ok) {
        setActiveModal(null);
        setBlogForm({
          title: "",
          categoryName: "Operations",
          description: "",
          featuredImage: "",
          content: "",
          isPublished: true,
        });
        setActionMessage("Blog post created successfully.");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(buildApiUrl(`/api/admin/blogs?id=${id}`), { method: "DELETE" });
    fetchData();
  };

  const handleCreateTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(buildApiUrl("/api/admin/teams"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...teamForm,
          orderIndex: parseInt(String(teamForm.orderIndex)) || 1,
        }),
      });
      if (res.ok) {
        setActiveModal(null);
        setTeamForm({
          firstName: "",
          lastName: "",
          position: "",
          category: "LEADERSHIP",
          bio: "",
          profileImage: "",
          orderIndex: (teams.length || 0) + 1,
        });
        setActionMessage("Team member added successfully.");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditTeam = (member: any) => {
    setEditTeamForm({
      id: member.id,
      firstName: member.firstName || "",
      lastName: member.lastName || "",
      position: member.position || "",
      category: (member.category || "LEADERSHIP").toUpperCase(),
      bio: member.bio || "",
      profileImage: member.profileImage || "",
      orderIndex: member.orderIndex !== undefined && member.orderIndex !== null ? Number(member.orderIndex) : 1,
    });
    setActiveModal("editTeam");
  };

  const handleUpdateTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(buildApiUrl("/api/admin/teams"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editTeamForm,
          orderIndex: parseInt(String(editTeamForm.orderIndex)) || 1,
        }),
      });
      if (res.ok) {
        setActiveModal(null);
        setActionMessage("Team member updated successfully.");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickReorder = async (member: any, direction: "up" | "down") => {
    const currentOrder = member.orderIndex !== undefined && member.orderIndex !== null ? Number(member.orderIndex) : 1;
    const newOrder = direction === "up" ? Math.max(1, currentOrder - 1) : currentOrder + 1;
    if (newOrder === currentOrder) return;

    try {
      const res = await fetch(buildApiUrl("/api/admin/teams"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id, orderIndex: newOrder }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(buildApiUrl(`/api/admin/teams?id=${id}`), { method: "DELETE" });
    fetchData();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0e0c0b] text-neutral-100 flex flex-col items-center justify-center font-body-md antialiased p-6">
        <div className="flex flex-col items-center gap-5">
          <img
            src="/images/logo-white.png"
            alt="Tulcan Energy"
            className="h-10 w-auto object-contain animate-pulse"
          />
          <div className="flex items-center gap-2.5 text-xs font-label-technical uppercase tracking-widest text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Verifying Admin Authorization...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0e0c0b] text-neutral-100 flex flex-col justify-between font-body-md antialiased relative overflow-hidden selection:bg-primary-container selection:text-white">
        {/* Background glow and technical grid */}
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Header */}
        <header className="h-16 border-b border-neutral-800/80 px-8 flex items-center justify-between z-10">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <img
              src="/images/logo-white.png"
              alt="Tulcan Energy"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-xs font-label-technical text-neutral-400 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Public Site
          </Link>
        </header>

        {/* Center Login Box */}
        <main className="flex-1 flex items-center justify-center p-6 z-10">
          <div className="w-full max-w-md bg-neutral-950/90 border border-neutral-800/90 backdrop-blur-xl p-8 rounded-sm shadow-2xl animate-scaleUp relative">
            <div className="border-b border-neutral-800 pb-6 mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-800/40 rounded text-[11px] font-label-technical uppercase tracking-widest text-red-400 font-bold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Restricted Access
              </div>
              <h1 className="font-headline-md text-2xl font-bold text-white tracking-tight">
                Admin CMS Portal
              </h1>
              <p className="text-xs text-neutral-400 mt-1.5">
                Sign in with authorized corporate credentials to manage upstream dispatches, assets, and personnel.
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 bg-red-950/50 border border-red-800/60 rounded text-xs text-red-300 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-base shrink-0 text-red-400">error</span>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-neutral-300 font-label-technical uppercase text-xs tracking-wider mb-2">
                  Corporate Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@tulcanenergy.com"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 pl-10 rounded text-white text-xs outline-none focus:border-primary-container focus:bg-neutral-900/80 transition-colors"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-neutral-500 text-lg">
                    mail
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-neutral-300 font-label-technical uppercase text-xs tracking-wider">
                    Password *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 pl-10 pr-10 rounded text-white text-xs outline-none focus:border-primary-container focus:bg-neutral-900/80 transition-colors font-mono"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-neutral-500 text-lg">
                    lock
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 text-lg transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-400">
                  <input type="checkbox" defaultChecked className="accent-primary-container rounded" />
                  <span>Remember this session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-primary-container hover:brightness-110 text-white py-3.5 rounded text-xs font-label-technical uppercase tracking-widest font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate &amp; Enter CMS</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
              <span className="text-[11px] font-label-technical text-neutral-500 uppercase tracking-widest block">
                Authorized Access Only • Tulcan Energy E&amp;P
              </span>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="h-14 border-t border-neutral-800/60 px-8 flex items-center justify-between text-neutral-500 text-xs font-label-technical z-10">
          <span>Tulcan Energy E&amp;P • Centralized Operations Control</span>
          <span>Security Protocol v2.4 (Encrypted)</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col font-body-md antialiased">
      {/* Admin Top Header */}
      <header className="h-16 bg-black border-b border-neutral-800 px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img
              src="/images/logo-white.png"
              alt="Tulcan Energy"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="text-xs bg-primary-container/20 text-primary border border-primary-container/40 px-2 py-0.5 rounded font-label-technical uppercase tracking-wider">
            Admin CMS
          </span>
        </div>

        <div className="flex items-center gap-4">
          {adminUser && (
            <div className="hidden sm:flex items-center gap-2 text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-neutral-200 font-semibold">{adminUser.name}</span>
              <span className="text-neutral-500 text-[11px]">({adminUser.email})</span>
            </div>
          )}

          <button
            onClick={fetchData}
            title="Refresh Data"
            className="text-neutral-400 hover:text-white text-xs font-label-technical flex items-center gap-1.5 p-2 rounded hover:bg-neutral-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Refresh
          </button>
          <Link
            href="/"
            className="text-xs font-label-technical text-neutral-300 hover:text-white uppercase tracking-wider border border-neutral-700 px-3 py-1.5 rounded hover:border-neutral-500 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            Public Site
          </Link>
          <button
            onClick={handleLogout}
            title="Sign Out of Admin CMS"
            className="text-xs font-label-technical text-red-400 hover:text-red-300 uppercase tracking-wider border border-red-900/50 hover:border-red-500 bg-red-950/20 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-neutral-950 border-r border-neutral-800 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-label-technical uppercase tracking-widest text-neutral-500 font-bold">
              Management Portal
            </div>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-label-technical uppercase tracking-wider transition-colors ${
                activeTab === "overview"
                  ? "bg-primary-container text-white font-bold"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              Overview
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-label-technical uppercase tracking-wider transition-colors ${
                activeTab === "inquiries"
                  ? "bg-primary-container text-white font-bold"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">mail</span>
                Inquiries
              </div>
              {stats.unreadInquiries > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {stats.unreadInquiries}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-label-technical uppercase tracking-wider transition-colors ${
                activeTab === "applications"
                  ? "bg-primary-container text-white font-bold"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">badge</span>
                Careers & CVs
              </div>
              <span className="text-neutral-500 text-[10px]">{stats.totalApplications}</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-label-technical uppercase tracking-wider transition-colors ${
                activeTab === "blogs"
                  ? "bg-primary-container text-white font-bold"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">article</span>
                Blog Posts & News
              </div>
              <span className="text-neutral-500 text-[10px]">{stats.totalBlogs}</span>
            </button>

            <button
              onClick={() => setActiveTab("teams")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-label-technical uppercase tracking-wider transition-colors ${
                activeTab === "teams"
                  ? "bg-primary-container text-white font-bold"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">groups</span>
                Our Teams
              </div>
              <span className="text-neutral-500 text-[10px]">{stats.totalStaff}</span>
            </button>
          </div>

          <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded text-xs text-neutral-400">
            <span className="text-green-400 flex items-center gap-1.5 font-label-technical uppercase tracking-wider text-[10px] mb-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
              Neon DB Connected
            </span>
            <p className="text-[11px] text-neutral-500">PostgreSQL (ancient-sun)</p>
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 p-8 overflow-y-auto">
          {actionMessage && (
            <div className="mb-6 p-4 bg-primary-container/20 border border-primary-container text-primary text-xs rounded flex justify-between items-center">
              <span>{actionMessage}</span>
              <button onClick={() => setActionMessage("")} className="text-white hover:opacity-75">
                ✕
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h1 className="font-headline-md text-3xl font-bold text-white mb-2">
                  System Overview
                </h1>
                <p className="text-sm text-neutral-400">
                  Real-time activity and content telemetry from Tulcan Energy web platform.
                </p>
              </div>

              {/* Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  onClick={() => setActiveTab("inquiries")}
                  className="bg-neutral-950 p-6 border border-neutral-800 rounded-sm cursor-pointer hover:border-primary-container transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-technical text-xs text-neutral-400 uppercase">
                      Contact Inquiries
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-xl">
                      mail
                    </span>
                  </div>
                  <div className="font-headline-md text-4xl font-extrabold text-white">
                    {stats.totalInquiries}
                  </div>
                  <div className="text-xs text-amber-400 mt-2 font-label-technical">
                    {stats.unreadInquiries} pending review
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("applications")}
                  className="bg-neutral-950 p-6 border border-neutral-800 rounded-sm cursor-pointer hover:border-primary-container transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-technical text-xs text-neutral-400 uppercase">
                      Candidate CVs
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-xl">
                      badge
                    </span>
                  </div>
                  <div className="font-headline-md text-4xl font-extrabold text-white">
                    {stats.totalApplications}
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-label-technical">
                    Submissions received
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("blogs")}
                  className="bg-neutral-950 p-6 border border-neutral-800 rounded-sm cursor-pointer hover:border-primary-container transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-technical text-xs text-neutral-400 uppercase">
                      News & Blog Posts
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-xl">
                      article
                    </span>
                  </div>
                  <div className="font-headline-md text-4xl font-extrabold text-white">
                    {stats.totalBlogs}
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-label-technical">
                    Published Dispatches
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab("teams")}
                  className="bg-neutral-950 p-6 border border-neutral-800 rounded-sm cursor-pointer hover:border-primary-container transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-technical text-xs text-neutral-400 uppercase">
                      Our Teams
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-xl">
                      groups
                    </span>
                  </div>
                  <div className="font-headline-md text-4xl font-extrabold text-white">
                    {stats.totalStaff}
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 font-label-technical">
                    Leadership & Operating Comm.
                  </div>
                </div>
              </div>

              {/* Cloudinary Media & Corporate Documents Manager */}
              <div className="bg-neutral-950 p-6 border border-neutral-800 rounded-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-label-technical uppercase tracking-widest text-primary font-bold block mb-1">
                      Cloudinary Media & Asset Storage
                    </span>
                    <h3 className="font-headline-md text-xl font-bold text-white">
                      Digital Media & Corporate Profile
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs font-label-technical text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      Cloudinary CDN Enabled
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Storage Info */}
                  <div className="space-y-3 bg-neutral-900/50 p-4 border border-neutral-800 rounded">
                    <div className="text-xs text-neutral-400">
                      All static hero slides, section headers, and company profile documents are served via high-speed Cloudinary CDN. Staff photos and news articles are uploaded dynamically through the admin modals.
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => setActiveModal("addBlog")}
                        className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors font-label-technical uppercase"
                      >
                        <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                        New Article with Photo
                      </button>
                      <button
                        onClick={() => setActiveModal("addTeam")}
                        className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors font-label-technical uppercase"
                      >
                        <span className="material-symbols-outlined text-sm">person_add</span>
                        New Staff with Photo
                      </button>
                    </div>
                  </div>

                  {/* Right: Company Profile Document Uploader */}
                  <div className="bg-neutral-900/50 p-4 border border-neutral-800 rounded flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-label-technical uppercase text-neutral-300 font-bold">
                          Company Profile Document
                        </span>
                        <a
                          href={companyProfileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">download</span>
                          Preview / Download
                        </a>
                      </div>
                      <p className="text-xs text-neutral-400 mb-3 truncate">
                        Active document: <span className="text-neutral-200 font-mono">{companyProfileUrl}</span>
                      </p>
                    </div>

                    <div>
                      <input
                        type="file"
                        id="profile-doc-upload"
                        accept=".pdf,.doc,.docx,.pptx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "doc");
                        }}
                      />
                      <label
                        htmlFor="profile-doc-upload"
                        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded text-xs font-label-technical uppercase tracking-wider cursor-pointer transition-colors ${
                          uploadingDoc
                            ? "bg-neutral-800 text-neutral-400 cursor-not-allowed"
                            : "bg-primary-container text-white hover:brightness-110"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {uploadingDoc ? "hourglass_top" : "upload_file"}
                        </span>
                        {uploadingDoc ? "Uploading to Cloudinary..." : "Upload Updated Company Profile (.pdf)"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Inquiries and Applications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Inquiries */}
                <div className="bg-neutral-950 p-6 border border-neutral-800 rounded">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-headline-md text-lg font-bold text-white">
                      Recent Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab("inquiries")}
                      className="text-xs font-label-technical text-primary hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  {inquiries.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-6 text-center">
                      No inquiries received yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-neutral-800">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setActiveModal("viewInquiry");
                          }}
                          className="py-3 flex justify-between items-center cursor-pointer hover:bg-neutral-900/50 px-2 rounded transition-colors"
                        >
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {inq.firstName} {inq.lastName}
                            </div>
                            <div className="text-xs text-neutral-400">{inq.subject}</div>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-label-technical ${
                              inq.isRead
                                ? "bg-neutral-800 text-neutral-400"
                                : "bg-primary-container text-white"
                            }`}
                          >
                            {inq.isRead ? "Read" : "New"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Applications */}
                <div className="bg-neutral-950 p-6 border border-neutral-800 rounded">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-headline-md text-lg font-bold text-white">
                      Recent Job Applicants
                    </h3>
                    <button
                      onClick={() => setActiveTab("applications")}
                      className="text-xs font-label-technical text-primary hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  {applications.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-6 text-center">
                      No career applications received yet.
                    </p>
                  ) : (
                    <div className="divide-y divide-neutral-800">
                      {applications.slice(0, 5).map((app) => (
                        <div key={app.id} className="py-3 flex justify-between items-center">
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {app.firstName} {app.lastName}
                            </div>
                            <div className="text-xs text-neutral-400">
                              {app.career?.title || app.careerSlug}
                            </div>
                          </div>
                          <span className="text-[10px] font-label-technical uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                            {app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-headline-md text-3xl font-bold text-white">
                    Contact Inquiries
                  </h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Inbox of messages transmitted via the public website contact portal.
                  </p>
                </div>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 font-label-technical uppercase tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Sender</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Received</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-neutral-500">
                          No inquiries found.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="p-4 font-semibold text-white">
                            {inq.firstName} {inq.lastName}
                          </td>
                          <td className="p-4 text-neutral-300">{inq.email}</td>
                          <td className="p-4 text-neutral-300">{inq.subject}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-label-technical ${
                                inq.isRead
                                  ? "bg-neutral-800 text-neutral-400"
                                  : "bg-primary-container text-white font-bold"
                              }`}
                            >
                              {inq.isRead ? "READ" : "UNREAD"}
                            </span>
                          </td>
                          <td className="p-4 text-neutral-500">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setActiveModal("viewInquiry");
                              }}
                              className="text-primary hover:underline"
                            >
                              Read
                            </button>
                            <button
                              onClick={() => handleToggleRead(inq.id, inq.isRead)}
                              className="text-neutral-400 hover:text-white"
                            >
                              {inq.isRead ? "Mark Unread" : "Mark Read"}
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="font-headline-md text-3xl font-bold text-white">
                  Job Applications
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Candidate resumes and applicant profiles submitted via the Careers portal.
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 font-label-technical uppercase tracking-wider border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Position</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Resume</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-neutral-500">
                          No candidate applications found.
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="p-4">
                            <div className="font-semibold text-white">
                              {app.firstName} {app.lastName}
                            </div>
                            {app.linkedin && (
                              <a
                                href={app.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-primary hover:underline"
                              >
                                LinkedIn Profile
                              </a>
                            )}
                          </td>
                          <td className="p-4 text-neutral-300">
                            {app.career?.title || app.careerSlug}
                          </td>
                          <td className="p-4">
                            <div>{app.email}</div>
                            <div className="text-neutral-500">{app.phoneNumber}</div>
                          </td>
                          <td className="p-4">
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 font-label-technical"
                            >
                              <span className="material-symbols-outlined text-sm">attachment</span>
                              View CV
                            </a>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-label-technical uppercase ${
                                app.status === "SHORTLISTED"
                                  ? "bg-green-950 text-green-300 border border-green-700"
                                  : app.status === "REJECTED"
                                  ? "bg-red-950 text-red-300 border border-red-700"
                                  : "bg-neutral-800 text-neutral-300"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                              className="bg-neutral-900 border border-neutral-700 text-white text-xs px-2 py-1 rounded"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="REVIEWED">REVIEWED</option>
                              <option value="SHORTLISTED">SHORTLISTED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BLOGS / NEWS CMS */}
          {activeTab === "blogs" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-headline-md text-3xl font-bold text-white">
                    Blog Posts & Press Releases
                  </h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage corporate news, technical dispatches, and public insights.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal("addBlog")}
                  className="bg-primary-container text-white px-4 py-2 text-xs font-label-technical uppercase tracking-wider rounded flex items-center gap-1.5 hover:brightness-110"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Create Article
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    className="bg-neutral-950 border border-neutral-800 p-5 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      {b.featuredImage && (
                        <div className="aspect-video w-full bg-neutral-900 mb-4 overflow-hidden rounded">
                          <img
                            src={b.featuredImage}
                            alt={b.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-center text-[10px] font-label-technical uppercase text-neutral-400 mb-2">
                        <span className="text-primary">{b.category?.name || "Operations"}</span>
                        <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="font-headline-md text-base font-bold text-white mb-2 line-clamp-2">
                        {b.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-3 mb-4">{b.content}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
                      <span
                        className={`text-[10px] font-label-technical uppercase px-2 py-0.5 rounded ${
                          b.isPublished
                            ? "bg-green-950 text-green-400 border border-green-800"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {b.isPublished ? "PUBLISHED" : "DRAFT"}
                      </span>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: OUR TEAMS (Leadership & Operating Committee) */}
          {activeTab === "teams" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-headline-md text-3xl font-bold text-white">Our Teams</h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage Board Members, Executive Leadership, and Operating Committee.
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal("addTeam")}
                  className="bg-primary-container text-white px-4 py-2 text-xs font-label-technical uppercase tracking-wider rounded flex items-center gap-1.5 hover:brightness-110"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Add Team Member
                </button>
              </div>

              {/* Categorized Teams view */}
              <div className="space-y-8">
                {/* Leadership / Board */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-neutral-800 pb-2 gap-2">
                    <h3 className="font-headline-md text-lg font-bold text-white">
                      Board of Directors & Executive Leadership
                    </h3>
                    <span className="text-[11px] font-label-technical text-neutral-400">
                      Arranged in display order (Pos 1 appears first). Use ▲/▼ or Edit to rearrange.
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teams
                      .filter((m) => {
                        const cat = (m.category || "").toUpperCase();
                        return cat === "LEADERSHIP" || cat === "BOARD";
                      })
                      .sort((a, b) => (Number(a.orderIndex) || 0) - (Number(b.orderIndex) || 0))
                      .map((m) => (
                        <div
                          key={m.id}
                          className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm flex flex-col justify-between hover:border-neutral-700 transition-colors"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="px-2 py-0.5 rounded text-[11px] font-label-technical font-bold bg-primary/20 text-primary border border-primary/40 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">tag</span>
                                Pos #{m.orderIndex ?? 1}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  title="Move Up (Appear Earlier)"
                                  onClick={() => handleQuickReorder(m, "up")}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs transition-colors"
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  title="Move Down (Appear Later)"
                                  onClick={() => handleQuickReorder(m, "down")}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs transition-colors"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                            <div className="aspect-square bg-neutral-900 mb-3 overflow-hidden rounded">
                              {m.profileImage ? (
                                <img
                                  src={m.profileImage}
                                  alt={m.firstName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                  <span className="material-symbols-outlined text-4xl">person</span>
                                </div>
                              )}
                            </div>
                            <h4 className="font-headline-md text-base font-bold text-white">
                              {m.firstName} {m.lastName}
                            </h4>
                            <p className="font-label-technical text-xs text-primary mb-2">
                              {m.position}
                            </p>
                            {m.bio && (
                              <p className="text-xs text-neutral-400 line-clamp-3 mb-3">{m.bio}</p>
                            )}
                          </div>
                          <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
                            <button
                              type="button"
                              onClick={() => handleOpenEditTeam(m)}
                              className="text-primary hover:underline flex items-center gap-1 font-label-technical uppercase tracking-wider text-[11px]"
                            >
                              <span className="material-symbols-outlined text-xs">edit</span>
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTeamMember(m.id)}
                              className="text-red-400 hover:underline font-label-technical uppercase tracking-wider text-[11px]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Operating Committee */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-neutral-800 pb-2 gap-2">
                    <h3 className="font-headline-md text-lg font-bold text-white">
                      Operating Committee
                    </h3>
                    <span className="text-[11px] font-label-technical text-neutral-400">
                      Arranged in display order (Pos 1 appears first). Use ▲/▼ or Edit to rearrange.
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teams
                      .filter((m) => {
                        const cat = (m.category || "").toUpperCase();
                        return cat === "OPERATING_COMMITTEE" || cat === "TEAM";
                      })
                      .sort((a, b) => (Number(a.orderIndex) || 0) - (Number(b.orderIndex) || 0))
                      .map((m) => (
                        <div
                          key={m.id}
                          className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm flex flex-col justify-between hover:border-neutral-700 transition-colors"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="px-2 py-0.5 rounded text-[11px] font-label-technical font-bold bg-primary/20 text-primary border border-primary/40 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">tag</span>
                                Pos #{m.orderIndex ?? 1}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  title="Move Up (Appear Earlier)"
                                  onClick={() => handleQuickReorder(m, "up")}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs transition-colors"
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  title="Move Down (Appear Later)"
                                  onClick={() => handleQuickReorder(m, "down")}
                                  className="w-6 h-6 flex items-center justify-center rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs transition-colors"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                            <div className="aspect-square bg-neutral-900 mb-3 overflow-hidden rounded">
                              {m.profileImage ? (
                                <img
                                  src={m.profileImage}
                                  alt={m.firstName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                  <span className="material-symbols-outlined text-4xl">person</span>
                                </div>
                              )}
                            </div>
                            <h4 className="font-headline-md text-base font-bold text-white">
                              {m.firstName} {m.lastName}
                            </h4>
                            <p className="font-label-technical text-xs text-primary mb-2">
                              {m.position}
                            </p>
                            {m.bio && (
                              <p className="text-xs text-neutral-400 line-clamp-3 mb-3">{m.bio}</p>
                            )}
                          </div>
                          <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
                            <button
                              type="button"
                              onClick={() => handleOpenEditTeam(m)}
                              className="text-primary hover:underline flex items-center gap-1 font-label-technical uppercase tracking-wider text-[11px]"
                            >
                              <span className="material-symbols-outlined text-xs">edit</span>
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTeamMember(m.id)}
                              className="text-red-400 hover:underline font-label-technical uppercase tracking-wider text-[11px]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD BLOG POST */}
      {activeModal === "addBlog" && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 w-full max-w-xl p-6 rounded shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-xl font-bold text-white">Create Blog Article</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Phase II Drilling Commences at Tom Shot Bank"
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={blogForm.categoryName}
                    onChange={(e) => setBlogForm({ ...blogForm, categoryName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  >
                    <option value="Operations">Operations</option>
                    <option value="ESG">ESG & Sustainability</option>
                    <option value="Technology">Technology</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Featured Image (Upload to Cloudinary or URL)
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="file"
                      id="blog-image-file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, "blog");
                      }}
                    />
                    <label
                      htmlFor="blog-image-file"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-label-technical uppercase tracking-wider cursor-pointer border ${
                        uploadingBlogImg
                          ? "bg-neutral-800 text-neutral-400 border-neutral-700 cursor-not-allowed"
                          : "bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-600"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {uploadingBlogImg ? "hourglass_top" : "cloud_upload"}
                      </span>
                      {uploadingBlogImg ? "Uploading..." : "Upload Image File"}
                    </label>
                    {blogForm.featuredImage && (
                      <div className="flex items-center gap-2">
                        <img
                          src={blogForm.featuredImage}
                          alt="Preview"
                          className="w-8 h-8 object-cover rounded border border-neutral-700"
                        />
                        <button
                          type="button"
                          onClick={() => setBlogForm({ ...blogForm, featuredImage: "" })}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="Or enter image URL (https://...)"
                    value={blogForm.featuredImage}
                    onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Excerpt Summary
                </label>
                <input
                  type="text"
                  value={blogForm.description}
                  onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                  placeholder="Short 1-2 sentence preview"
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Article Content *
                </label>
                <textarea
                  required
                  rows={6}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Full text of the dispatch..."
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={blogForm.isPublished}
                  onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                />
                <label htmlFor="pub" className="text-neutral-300 font-label-technical uppercase">
                  Publish Immediately
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-container text-white py-3 rounded font-label-technical uppercase tracking-wider hover:brightness-110"
              >
                Save Article
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TEAM MEMBER */}
      {activeModal === "addTeam" && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 w-full max-w-lg p-6 rounded shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-xl font-bold text-white">Add Team Member</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTeamMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamForm.firstName}
                    onChange={(e) => setTeamForm({ ...teamForm, firstName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamForm.lastName}
                    onChange={(e) => setTeamForm({ ...teamForm, lastName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Designation / Role Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Operating Officer"
                  value={teamForm.position}
                  onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Team Category *
                  </label>
                  <select
                    value={teamForm.category}
                    onChange={(e) => setTeamForm({ ...teamForm, category: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  >
                    <option value="LEADERSHIP">Executive Leadership / Board</option>
                    <option value="OPERATING_COMMITTEE">Operating Committee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Display Position Rank *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={teamForm.orderIndex}
                    onChange={(e) => setTeamForm({ ...teamForm, orderIndex: parseInt(e.target.value) || 1 })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 -mt-2">
                Order rank on the page (1 = appears first, 2 = appears second, etc.)
              </p>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Profile Photo (Upload to Cloudinary or URL)
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="file"
                    id="team-photo-file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "team");
                    }}
                  />
                  <label
                    htmlFor="team-photo-file"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-label-technical uppercase tracking-wider cursor-pointer border ${
                      uploadingTeamImg
                        ? "bg-neutral-800 text-neutral-400 border-neutral-700 cursor-not-allowed"
                        : "bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-600"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {uploadingTeamImg ? "hourglass_top" : "cloud_upload"}
                    </span>
                    {uploadingTeamImg ? "Uploading..." : "Upload Photo File"}
                  </label>
                  {teamForm.profileImage && (
                    <div className="flex items-center gap-2">
                      <img
                        src={teamForm.profileImage}
                        alt="Preview"
                        className="w-8 h-8 object-cover rounded-full border border-neutral-700"
                      />
                      <button
                        type="button"
                        onClick={() => setTeamForm({ ...teamForm, profileImage: "" })}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="Or enter photo URL (https://...)"
                  value={teamForm.profileImage}
                  onChange={(e) => setTeamForm({ ...teamForm, profileImage: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Biography
                </label>
                <textarea
                  rows={3}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  placeholder="Executive background & credentials..."
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-container text-white py-3 rounded font-label-technical uppercase tracking-wider hover:brightness-110"
              >
                Save Member
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TEAM MEMBER */}
      {activeModal === "editTeam" && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 w-full max-w-lg p-6 rounded shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-label-technical uppercase bg-primary-container/40 text-primary border border-primary/30">
                  Position #{editTeamForm.orderIndex}
                </span>
                <h3 className="font-headline-md text-xl font-bold text-white">Edit Team Member</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateTeamMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTeamForm.firstName}
                    onChange={(e) => setEditTeamForm({ ...editTeamForm, firstName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTeamForm.lastName}
                    onChange={(e) => setEditTeamForm({ ...editTeamForm, lastName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Designation / Role Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Operating Officer"
                  value={editTeamForm.position}
                  onChange={(e) => setEditTeamForm({ ...editTeamForm, position: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Team Category *
                  </label>
                  <select
                    value={editTeamForm.category}
                    onChange={(e) => setEditTeamForm({ ...editTeamForm, category: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  >
                    <option value="LEADERSHIP">Executive Leadership / Board</option>
                    <option value="OPERATING_COMMITTEE">Operating Committee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                    Display Position Rank *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editTeamForm.orderIndex}
                    onChange={(e) => setEditTeamForm({ ...editTeamForm, orderIndex: parseInt(e.target.value) || 1 })}
                    className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                  />
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 -mt-2">
                Order rank on the page (1 = appears first, 2 = appears second, etc.)
              </p>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Profile Photo (Upload to Cloudinary or URL)
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="file"
                    id="edit-team-photo-file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "team");
                    }}
                  />
                  <label
                    htmlFor="edit-team-photo-file"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-label-technical uppercase tracking-wider cursor-pointer border ${
                      uploadingTeamImg
                        ? "bg-neutral-800 text-neutral-400 border-neutral-700 cursor-not-allowed"
                        : "bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-600"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {uploadingTeamImg ? "hourglass_top" : "cloud_upload"}
                    </span>
                    {uploadingTeamImg ? "Uploading..." : "Upload Photo File"}
                  </label>
                  {editTeamForm.profileImage && (
                    <div className="flex items-center gap-2">
                      <img
                        src={editTeamForm.profileImage}
                        alt="Preview"
                        className="w-8 h-8 object-cover rounded-full border border-neutral-700"
                      />
                      <button
                        type="button"
                        onClick={() => setEditTeamForm({ ...editTeamForm, profileImage: "" })}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="Or enter photo URL (https://...)"
                  value={editTeamForm.profileImage}
                  onChange={(e) => setEditTeamForm({ ...editTeamForm, profileImage: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-label-technical uppercase mb-1">
                  Biography
                </label>
                <textarea
                  rows={3}
                  value={editTeamForm.bio}
                  onChange={(e) => setEditTeamForm({ ...editTeamForm, bio: e.target.value })}
                  placeholder="Executive background & credentials..."
                  className="w-full bg-neutral-950 border border-neutral-700 p-2.5 rounded text-white outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2.5 border border-neutral-700 text-neutral-300 rounded font-label-technical uppercase tracking-wider hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-container text-white px-6 py-2.5 rounded font-label-technical uppercase tracking-wider hover:brightness-110"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW INQUIRY */}
      {activeModal === "viewInquiry" && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 w-full max-w-lg p-6 rounded shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-label-technical uppercase text-primary font-bold">
                Inquiry Detail
              </span>
              <button
                onClick={() => setActiveModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <span className="text-neutral-500 uppercase block font-label-technical">From</span>
                <span className="text-white font-semibold text-sm">
                  {selectedInquiry.firstName} {selectedInquiry.lastName}
                </span>{" "}
                ({selectedInquiry.email})
              </div>
              <div>
                <span className="text-neutral-500 uppercase block font-label-technical">Subject</span>
                <span className="text-neutral-200">{selectedInquiry.subject}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase block font-label-technical">
                  Country / Region
                </span>
                <span className="text-neutral-200">{selectedInquiry.country || "Nigeria"}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <span className="text-neutral-500 uppercase block font-label-technical mb-1">
                  Message Content
                </span>
                <p className="p-3 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 leading-relaxed">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-neutral-800">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                  selectedInquiry.subject
                )}`}
                className="bg-primary-container text-white text-xs font-label-technical uppercase px-4 py-2 rounded"
              >
                Reply via Email
              </a>
              <button
                onClick={() => setActiveModal(null)}
                className="border border-neutral-700 text-neutral-300 text-xs px-4 py-2 rounded hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
