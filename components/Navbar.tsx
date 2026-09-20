"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      title: "About",
      href: "/about",
      active: pathname.startsWith("/about"),
      sublinks: [
        { title: "Company Overview", href: "/about" },
        { title: "Leadership & Board", href: "/about/leadership" },
      ],
    },
    {
      title: "Our Business",
      href: "/business",
      active: pathname.startsWith("/business") || pathname.startsWith("/partners"),
      sublinks: [
        { title: "Achievements & EPC", href: "/business" },
        { title: "Partners & Vendors", href: "/partners" },
      ],
    },
    {
      title: "Assets & Operations",
      href: "/assets/tom-shot-bank",
      active: pathname.startsWith("/assets"),
      sublinks: [
        { title: "Tom Shot Bank (Offshore)", href: "/assets/tom-shot-bank" },
        { title: "Odimodi Asset (Onshore)", href: "/assets/odimodi" },
      ],
    },
    {
      title: "Sustainability",
      href: "/sustainability",
      active: pathname.startsWith("/sustainability"),
      sublinks: [
        { title: "ESG & Sustainability", href: "/sustainability" },
        { title: "HSE Framework", href: "/sustainability/hse" },
        { title: "CSR & Community", href: "/sustainability/csr" },
      ],
    },
    {
      title: "Careers",
      href: "/careers",
      active: pathname.startsWith("/careers"),
    },
    {
      title: "News",
      href: "/news",
      active: pathname.startsWith("/news"),
    },
  ];

  const searchItems = [
    { title: "Tom Shot Bank Offshore Asset", href: "/assets/tom-shot-bank", category: "Assets" },
    { title: "Odimodi Onshore Asset", href: "/assets/odimodi", category: "Assets" },
    { title: "Executive Leadership & Board", href: "/about/leadership", category: "About" },
    { title: "HSE Policy & Safety Records", href: "/sustainability/hse", category: "Sustainability" },
    { title: "CSR & Host Communities", href: "/sustainability/csr", category: "Sustainability" },
    { title: "Business Achievements & EPC", href: "/business", category: "Business" },
    { title: "Technical Partners & Vendors", href: "/partners", category: "Partners" },
    { title: "Career Opportunities & Trainees", href: "/careers", category: "Careers" },
    { title: "Press Releases & Updates", href: "/news", category: "News" },
    { title: "Contact Corporate Offices", href: "/contact", category: "Contact" },
  ];

  const filteredSearch = searchQuery
    ? searchItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchItems;

  return (
    <>
      <nav
        className={`fixed top-0 w-full h-[88px] z-50 transition-all duration-300 ${
          scrolled
            ? "bg-pure-white/95 backdrop-blur-2xl shadow-sm border-b border-black/10"
            : "bg-pure-white/90 backdrop-blur-xl border-b border-black/10"
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-8 xl:px-container-margin w-full h-full gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 hover:opacity-95 transition-opacity py-1"
          >
            <img
              src="/images/logo.png"
              alt="Tulcan Energy Exploration & Production"
              className="h-12 sm:h-14 md:h-[58px] max-h-[62px] w-auto object-contain shrink-0"
            />
          </Link>

          {/* Right Section: Desktop Nav Links + Contact Us shifted to the right */}
          <div className="flex items-center gap-6 xl:gap-8 2xl:gap-10">
            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8 font-label-technical text-xs tracking-wider shrink-0 whitespace-nowrap">
              {navLinks.map((link) => (
                <div key={link.title} className="relative group py-6">
                  <Link
                    href={link.href}
                    className={`uppercase transition-colors duration-200 flex items-center gap-1 ${
                      link.active
                        ? "text-primary-container font-bold border-b-2 border-primary-container pb-0.5"
                        : "text-surface-variant hover:text-primary-container"
                    }`}
                  >
                    {link.title}
                    {link.sublinks && (
                      <span className="material-symbols-outlined text-[14px] transition-transform group-hover:rotate-180">
                        expand_more
                      </span>
                    )}
                  </Link>

                  {link.sublinks && (
                    <div className="absolute top-full left-0 w-56 bg-pure-white border border-black/10 shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 py-2 rounded-sm z-50">
                      {link.sublinks.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className={`block px-5 py-2.5 text-xs uppercase tracking-wider font-label-technical transition-colors ${
                            pathname === sub.href
                              ? "bg-surface-container-low/10 text-primary-container font-bold"
                              : "text-surface-variant hover:bg-neutral-100 hover:text-primary-container"
                          }`}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 xl:gap-4 shrink-0 whitespace-nowrap">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 text-surface-variant hover:text-primary-container transition-colors duration-200"
              >
                <span className="material-symbols-outlined text-xl">search</span>
              </button>

              <Link
                href="/contact"
                className="hidden md:inline-block bg-primary-container text-pure-white font-label-technical text-xs px-6 py-3 border border-primary-container hover:scale-[1.02] hover:brightness-110 transition-transform duration-200 uppercase tracking-wider shadow-sm"
              >
                Contact Us
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="lg:hidden p-2 text-pure-black hover:text-primary-container focus:outline-none"
              >
                <span className="material-symbols-outlined text-2xl">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] bg-pure-white z-40 lg:hidden overflow-y-auto border-t border-black/10 flex flex-col p-6 animate-fadeIn">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <div key={link.title} className="border-b border-black/5 pb-3">
                <Link
                  href={link.href}
                  className={`block font-headline-md text-xl font-bold ${
                    link.active ? "text-primary-container" : "text-pure-black"
                  }`}
                >
                  {link.title}
                </Link>
                {link.sublinks && (
                  <div className="pl-4 mt-2 space-y-2 border-l border-primary-container/30">
                    {link.sublinks.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="block text-sm font-label-technical uppercase tracking-wider text-surface-variant hover:text-primary-container"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 flex flex-col gap-3">
            <Link
              href="/contact"
              className="w-full text-center bg-primary-container text-pure-white font-label-technical text-label-technical py-4 uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-pure-black/70 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="bg-pure-white w-full max-w-2xl border border-black/10 shadow-2xl rounded-sm overflow-hidden animate-scaleUp">
            <div className="flex items-center px-6 py-4 border-b border-black/10">
              <span className="material-symbols-outlined text-surface-variant mr-3">search</span>
              <input
                type="text"
                placeholder="Search assets, news, leadership, HSE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent outline-none font-body-md text-lg text-pure-black placeholder:text-surface-variant/60"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-surface-variant hover:text-pure-black ml-3"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 divide-y divide-black/5">
              {filteredSearch.length === 0 ? (
                <div className="p-8 text-center text-surface-variant font-label-technical text-sm">
                  No matching results found.
                </div>
              ) : (
                filteredSearch.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-3 hover:bg-neutral-50 transition-colors group"
                  >
                    <div>
                      <div className="font-headline-md text-base font-bold text-pure-black group-hover:text-primary-container transition-colors">
                        {item.title}
                      </div>
                      <div className="font-label-technical text-xs text-surface-variant uppercase tracking-wider">
                        {item.category}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-surface-variant text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
