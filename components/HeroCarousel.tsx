"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface Slide {
  id: number;
  badge: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  backgroundImage: string;
  telemetryLeft: string;
  telemetryRight: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "Nigeria · Exploration & Production",
    title: "Developing Energy.\nDelivering Value.",
    description:
      "A premium upstream energy enterprise committed to unlocking Nigeria's high-value hydrocarbon potential through technical precision and operational excellence.",
    primaryCtaText: "Explore Assets",
    primaryCtaHref: "/assets/tom-shot-bank",
    secondaryCtaText: "Company Profile",
    secondaryCtaHref: "/about",
    backgroundImage: getCloudinaryUrl("tulcan_energy/hero-1", "/images/hero-1.jpg"),
    telemetryLeft: "PPL 244 & PPL 227 OPERATOR",
    telemetryRight: "GULF OF GUINEA FAIRWAY",
  },
  {
    id: 2,
    badge: "Offshore Asset · Tom Shot Bank",
    title: "PPL 244 Offshore\nShallow Water Fairway.",
    description:
      "Advancing subsea tie-back engineering, appraisal drilling, and dynamic reservoir simulation across the prolific Akwa Ibom shallow-water basin.",
    primaryCtaText: "Offshore Telemetry",
    primaryCtaHref: "/assets/tom-shot-bank",
    secondaryCtaText: "Direct Inquiries",
    secondaryCtaHref: "/contact",
    backgroundImage: getCloudinaryUrl("tulcan_energy/hero-2", "/images/hero-2.jpg"),
    telemetryLeft: "WATER DEPTH: 18M - 24M",
    telemetryRight: "PROVEN DISCOVERED RESERVES",
  },
  {
    id: 3,
    badge: "Onshore & Swamp Asset · PPL 227",
    title: "Odimodi Asset &\nUpstream Development.",
    description:
      "Unlocking coastal and swamp hydrocarbon potential through modular early production facilities tied into established Niger Delta export trunklines.",
    primaryCtaText: "Explore Odimodi",
    primaryCtaHref: "/assets/odimodi",
    secondaryCtaText: "HSE Framework",
    secondaryCtaHref: "/sustainability/hse",
    backgroundImage: getCloudinaryUrl("tulcan_energy/hero-3", "/images/hero-3.jpg"),
    telemetryLeft: "DELTA STATE FAIRWAY",
    telemetryRight: "EARLY PRODUCTION INTEGRATION",
  },
  {
    id: 4,
    badge: "Subsurface Precision & Geosciences",
    title: "Engineering African\nEnergy Independence.",
    description:
      "World-class subsurface dynamic modeling, real-time telemetry monitoring, and unwavering commitment to indigenous technical mastery and host communities.",
    primaryCtaText: "Leadership & Team",
    primaryCtaHref: "/about/leadership",
    secondaryCtaText: "Partners & Vendors",
    secondaryCtaHref: "/partners",
    backgroundImage: getCloudinaryUrl(
      "https://res.cloudinary.com/xh7slab6/image/upload/v1789934090/tulcan_energy/hero-4.jpg",
      "/images/hero-4.jpg"
    ),
    telemetryLeft: "100% INDIGENOUS MASTERY",
    telemetryRight: "PIA & ESG COMPLIANT",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <header
      className="relative w-full h-screen min-h-[780px] flex items-end pb-section-v-tablet pt-24 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
              isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/60 to-pure-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-pure-black/90 via-pure-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-grid opacity-25"></div>
          </div>
        );
      })}

      {/* Foreground Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 xl:px-container-margin grid grid-cols-12 gap-grid-gutter">
        <div className="col-span-12 md:col-span-10 lg:col-span-8 flex flex-col gap-5">
          {/* Badge */}
          <div className="flex items-center gap-3 font-label-technical text-xs text-primary uppercase tracking-widest">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span>{slides[current].badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pure-white max-w-4xl leading-[1.08] font-extrabold tracking-tight whitespace-pre-line animate-fadeIn">
            {slides[current].title}
          </h1>

          {/* Description */}
          <p className="font-body-lg text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl mt-1 leading-relaxed">
            {slides[current].description}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap gap-4 items-center">
            <Link
              href={slides[current].primaryCtaHref}
              className="bg-primary-container text-pure-white font-label-technical text-xs sm:text-sm px-7 py-3.5 border border-primary-container hover:scale-[1.02] hover:brightness-110 transition-all duration-200 uppercase tracking-wider shadow-lg"
            >
              {slides[current].primaryCtaText}
            </Link>
            <Link
              href={slides[current].secondaryCtaHref}
              className="bg-pure-black/60 backdrop-blur-md text-pure-white font-label-technical text-xs sm:text-sm px-7 py-3.5 border border-white/20 hover:border-white transition-all uppercase tracking-wider"
            >
              {slides[current].secondaryCtaText}
            </Link>
          </div>

          {/* Slide Technical Telemetry Stamp */}
          <div className="mt-4 flex items-center gap-6 text-[11px] font-label-technical text-neutral-400 uppercase tracking-widest pt-4 border-t border-white/10 max-w-xl">
            <span>{slides[current].telemetryLeft}</span>
            <span className="text-primary">•</span>
            <span>{slides[current].telemetryRight}</span>
          </div>
        </div>

        {/* Right Controls & Indicators */}
        <div className="col-span-12 lg:col-span-4 flex lg:flex-col justify-between lg:justify-end items-end pb-2 gap-6 mt-6 lg:mt-0">
          {/* Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-sm bg-neutral-900/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-primary-container hover:border-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-sm bg-neutral-900/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-primary-container hover:border-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          {/* Indicator Progress Bars */}
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === current
                    ? "w-10 bg-primary-container"
                    : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
