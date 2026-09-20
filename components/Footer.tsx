import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pure-black text-pure-white py-20 px-container-margin border-t border-white/10 relative overflow-hidden">
      {/* Background blueprint grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <img
                src="/images/logo-white.png"
                alt="Tulcan Energy Exploration & Production"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="font-body-md text-on-surface-variant max-w-sm text-sm leading-relaxed">
              Developing Energy. Delivering Value. A premier Nigerian upstream exploration and production company committed to operational excellence, environmental stewardship, and community empowerment.
            </p>
            <div className="font-label-technical text-xs text-primary/80 uppercase tracking-widest pt-2">
              LOC: NIGER DELTA BASIN • OML 113 / OFFSHORE ASSETS
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-label-technical text-xs uppercase tracking-widest text-primary font-bold mb-5">
              Company
            </h4>
            <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
              <li>
                <Link href="/about" className="hover:text-pure-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="hover:text-pure-white transition-colors">
                  Leadership & Board
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-pure-white transition-colors">
                  Achievements & EPC
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-pure-white transition-colors">
                  Careers & Culture
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-pure-white transition-colors">
                  News & Press
                </Link>
              </li>
              <li>
                <a
                  href="/docs/Tulcan_Energy_Company_Profile.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pure-white transition-colors flex items-center gap-1 text-primary/90"
                >
                  <span className="material-symbols-outlined text-xs">download</span>
                  Company Profile (.PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* Assets & Sustainability */}
          <div className="md:col-span-3">
            <h4 className="font-label-technical text-xs uppercase tracking-widest text-primary font-bold mb-5">
              Operations & ESG
            </h4>
            <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
              <li>
                <Link href="/assets/tom-shot-bank" className="hover:text-pure-white transition-colors">
                  Tom Shot Bank (Offshore)
                </Link>
              </li>
              <li>
                <Link href="/assets/odimodi" className="hover:text-pure-white transition-colors">
                  Odimodi Asset (Onshore)
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-pure-white transition-colors">
                  ESG Strategy
                </Link>
              </li>
              <li>
                <Link href="/sustainability/hse" className="hover:text-pure-white transition-colors">
                  HSE Management System
                </Link>
              </li>
              <li>
                <Link href="/sustainability/csr" className="hover:text-pure-white transition-colors">
                  CSR & Community Initiatives
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-pure-white transition-colors">
                  Technical Partners & Vendors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <h4 className="font-label-technical text-xs uppercase tracking-widest text-primary font-bold mb-5">
              Contact & HQ
            </h4>
            <div className="space-y-3 font-body-md text-sm text-on-surface-variant">
              <p>
                <strong className="text-pure-white block">Corporate Head Office:</strong>
                100 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigera.
              </p>
              <p>
                <strong className="text-pure-white block">Inquiries:</strong>
                info@tulcanepc.com
              </p>
              <p>
                <strong className="text-pure-white block">Phone:</strong>
                +234 1 234 5678 / +234 803 000 0000
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary-container text-pure-white font-label-technical text-xs uppercase tracking-wider px-5 py-2.5 border border-primary-container hover:scale-105 transition-transform"
                >
                  <span>Submit Inquiry</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label-technical text-on-surface-variant/70">
          <p>© {new Date().getFullYear()} Tulcan Energy Exploration and Production Company Limited. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-pure-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-pure-white transition-colors">
              Terms of Engagement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
