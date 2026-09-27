import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

const CUTOUT_HERO_SRC = '/images/khaja-suit-cutout.png';

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const Hero = ({ onPreloadComplete }) => {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const khajaRef = useRef(null);
  const shahzadRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);
  const heroSlotRef = useRef(null);
  const travelerRef = useRef(null);
  const travelerEntranceRef = useRef(null);
  const cutoutImgRef = useRef(null);
  const rimGlowRef = useRef(null);
  const circularFrameRef = useRef(null);
  const envBridgeRef = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    onPreloadComplete?.();

    const hero = heroRef.current;
    const heroSlot = heroSlotRef.current;
    const traveler = travelerRef.current;
    const travelerEntrance = travelerEntranceRef.current;
    const cutoutImg = cutoutImgRef.current;
    const rimGlow = rimGlowRef.current;
    const circularFrame = circularFrameRef.current;
    const aboutSlot = document.querySelector('[data-portrait-about-slot]');
    const logoEl = document.querySelector('[data-hero-logo]');

    if (!hero || !heroSlot) return;

    // 1. Subtle, fast 7-step Hero entrance
    let introCtx;
    if (!reducedMotion) {
      introCtx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        if (logoEl) {
          tl.fromTo(
            logoEl,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.45 },
            0.02
          );
        }

        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.08
        )
          .fromTo(
            khajaRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.58 },
            0.14
          )
          .fromTo(
            shahzadRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.58 },
            0.21
          )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.52 },
            0.28
          )
          .fromTo(
            actionsRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.48 },
            0.35
          );

        if (travelerEntrance) {
          tl.fromTo(
            travelerEntrance,
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.76, ease: 'power3.out' },
            0.22
          );
        }
      });
    }

    if (reducedMotion || !traveler || !aboutSlot) {
      return () => {
        introCtx?.revert();
      };
    }

    // 2. Cinematic Spatial Transition with Single Normalized Progress
    let metrics = null;
    let rafId = null;

    const measure = () => {
      const hRect = heroSlot.getBoundingClientRect();
      const aRect = aboutSlot.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // Invariant document-space coordinates
      const H_x = hRect.left + scrollX;
      const H_y = hRect.top + scrollY;
      const H_w = Math.max(220, hRect.width);

      const A_x = aRect.left + scrollX;
      const A_y = aRect.top + scrollY;
      const A_w = Math.max(180, aRect.width);

      // Uniform scale factor mapping Hero cutout down to About circle
      const startScale = H_w / A_w;

      // Scroll position where About portrait arrives in comfortable reading view
      const vh = window.innerHeight;
      const isMobile = window.innerWidth < 1024;
      const targetViewportCenterY = vh * (isMobile ? 0.44 : 0.48);
      const scrollEnd = Math.max(
        160,
        A_y + A_w * 0.5 - targetViewportCenterY
      );

      metrics = {
        H_x,
        H_y,
        A_x,
        A_y,
        A_w,
        startScale,
        scrollEnd,
      };

      // Base layout box matches the About circular dimensions (A_w x A_w)
      traveler.style.width = `${A_w}px`;
      traveler.style.height = `${A_w}px`;
    };

    const updateSpatialPosition = () => {
      if (!metrics) measure();
      const {
        H_x,
        H_y,
        A_x,
        A_y,
        startScale,
        scrollEnd,
      } = metrics;

      const scrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
      const rawP = scrollY / scrollEnd;
      const p = rawP <= 0 ? 0 : rawP >= 1 ? 1 : rawP;
      const e = easeInOutCubic(p);

      let currentX;
      let currentY;
      let currentScale;

      if (p <= 0) {
        currentX = H_x;
        currentY = H_y;
        currentScale = startScale;
      } else if (p >= 1) {
        currentX = A_x;
        currentY = A_y;
        currentScale = 1.0;
      } else {
        const startViewY = H_y;
        const endViewY = A_y - scrollEnd;

        currentX = H_x + (A_x - H_x) * e;
        const currentViewY = startViewY + (endViewY - startViewY) * e;
        currentY = currentViewY + scrollY;

        currentScale = startScale + (1.0 - startScale) * e;
      }

      // Smooth GPU spatial flight
      traveler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(${currentScale.toFixed(4)})`;

      // 3. Dynamic Soft Environmental Neon Rim Light (Moves WITH the portrait!)
      if (rimGlow) {
        // Light travels around contour and cleanly fades out before reaching About
        const glowOpacity = Math.max(0, (1 - e * 1.35) * 0.85);
        const lightShiftX = -35 * e;
        const lightShiftY = 65 * e;
        const lightScale = 1.0 - 0.28 * e;

        rimGlow.style.transform = `translate3d(${lightShiftX.toFixed(1)}px, ${lightShiftY.toFixed(1)}px, 0) scale(${lightScale.toFixed(3)})`;
        rimGlow.style.opacity = glowOpacity.toFixed(3);
      }

      // 4. Natural Cutout throughout Flight -> Optical Circular Iris Settling at Destination
      // From p = 0 to p = 0.72: 100% natural cutout with soft bottom fade to dark. Zero card/box!
      // From p = 0.72 to p = 1.0: Optical circular iris contracts smoothly from 110% to 50%
      // and light neutral circle background & border fade in. It is ALWAYS a circle, never a rectangle!
      const settleProgress = Math.max(0, Math.min(1, (p - 0.72) / 0.28));
      const c = easeInOutCubic(settleProgress);

      if (circularFrame) {
        if (settleProgress <= 0) {
          // Pure natural cutout
          circularFrame.style.clipPath = 'none';
          circularFrame.style.borderRadius = '0px';
          circularFrame.style.backgroundColor = 'transparent';
          circularFrame.style.border = 'none';
          circularFrame.style.boxShadow = 'none';
          circularFrame.style.overflow = 'visible';
          circularFrame.style.maskImage =
            'linear-gradient(to bottom, black 72%, transparent 98%)';
          circularFrame.style.webkitMaskImage =
            'linear-gradient(to bottom, black 72%, transparent 98%)';
        } else {
          // Pure optical circle at all times: zero square corners, zero rectangle morphing
          circularFrame.style.clipPath = 'circle(50% at 50% 50%)';
          circularFrame.style.borderRadius = '50%';
          circularFrame.style.overflow = 'hidden';

          // Clean neutral circular container fades in smoothly
          circularFrame.style.backgroundColor = `rgba(244, 244, 246, ${c.toFixed(3)})`;
          circularFrame.style.border = `1px solid rgba(0, 0, 0, ${(0.10 * c).toFixed(3)})`;
          circularFrame.style.boxShadow = `0 ${(20 * c).toFixed(0)}px ${(55 * c).toFixed(0)}px rgba(0, 0, 0, ${(0.12 * c).toFixed(3)})`;

          // Vertical gradient mask fades away cleanly as circle forms
          if (c < 0.60) {
            const fadeStop = 72 + 28 * (c / 0.60);
            circularFrame.style.maskImage = `linear-gradient(to bottom, black ${fadeStop.toFixed(1)}%, transparent 100%)`;
            circularFrame.style.webkitMaskImage = `linear-gradient(to bottom, black ${fadeStop.toFixed(1)}%, transparent 100%)`;
          } else {
            circularFrame.style.maskImage = 'none';
            circularFrame.style.webkitMaskImage = 'none';
          }
        }
      }

      // Controlled ambient environment horizon transition
      if (envBridgeRef.current) {
        const bridgeProgress = Math.max(0, Math.min(1, (p - 0.40) / 0.60));
        envBridgeRef.current.style.opacity = bridgeProgress.toFixed(3);
      }
    };

    measure();
    updateSpatialPosition();

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSpatialPosition);
    };

    const onResize = () => {
      measure();
      updateSpatialPosition();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const settleTimer = setTimeout(onResize, 180);

    return () => {
      introCtx?.revert();
      clearTimeout(settleTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [onPreloadComplete, reducedMotion]);

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen bg-[#050505] text-white px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
      >
        {/* Architectural Grid & Ambient Dark Horizon Lighting */}
        <div className="absolute inset-0 hero-grid opacity-45 pointer-events-none" />
        <div className="absolute w-[36rem] h-[36rem] rounded-full bg-[#ccff00]/[0.08] blur-[140px] -right-36 -top-28 pointer-events-none" />
        <div className="absolute w-[28rem] h-[28rem] rounded-full bg-slate-400/[0.05] blur-[120px] -left-36 bottom-12 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8">
          {/* Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-8 items-center my-auto py-2">
            {/* Left Content */}
            <div className="order-1 lg:col-span-7 z-10">
              <div
                ref={eyebrowRef}
                className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs tracking-[0.26em] uppercase text-gray-400 mb-5 sm:mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_14px_#ccff00]" />
                <span>Computer Science &amp; Software Development</span>
              </div>

              <h1 className="font-black tracking-[-0.075em] leading-[0.80] text-[clamp(3.4rem,14.5vw,6.4rem)] sm:text-[clamp(4.6rem,13vw,7.4rem)] lg:text-[clamp(5.8rem,8.6vw,9.0rem)] uppercase">
                <span ref={khajaRef} className="block text-white">
                  KHAJA
                </span>
                <span
                  ref={shahzadRef}
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600"
                >
                  SHAHZAD
                </span>
              </h1>

              <p
                ref={subRef}
                className="mt-6 sm:mt-8 max-w-[580px] text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed font-light"
              >
                I build practical software systems with{' '}
                <strong className="text-white font-medium">
                  Python, JavaScript and the MERN stack
                </strong>{' '}
                — from retail operations to secure web applications.
              </p>

              {/* CTA Buttons (Desktop) */}
              <div
                ref={actionsRef}
                className="hidden lg:flex flex-wrap items-center gap-4 pt-7"
              >
                <a
                  href="#project"
                  className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-[0.16em] inline-flex items-center justify-center hover:bg-[#d8ff33] active:scale-[0.99] transition-all shadow-[0_0_24px_rgba(204,255,0,0.25)]"
                >
                  Explore work ↗
                </a>

                <a
                  href="#contact"
                  className="min-h-[48px] px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/35 text-white font-medium text-xs uppercase tracking-[0.16em] inline-flex items-center justify-center active:scale-[0.99] transition-all"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Right: Large Cinematic Cutout Portrait Target Geometry Slot */}
            <div className="order-2 lg:col-span-5 lg:col-start-8 flex items-end justify-center lg:justify-end my-1 lg:my-0">
              <div
                ref={heroSlotRef}
                data-portrait-hero-slot
                className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[520px] aspect-square flex items-end justify-center pointer-events-none"
              >
                {/* Static cutout rendered ONLY when prefers-reduced-motion is active */}
                {reducedMotion && (
                  <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
                    <img
                      src={CUTOUT_HERO_SRC}
                      alt="Khaja Shahzad"
                      className="w-full h-full object-contain object-bottom select-none"
                      style={{
                        maskImage:
                          'linear-gradient(to bottom, black 72%, transparent 98%)',
                        WebkitMaskImage:
                          'linear-gradient(to bottom, black 72%, transparent 98%)',
                      }}
                      draggable="false"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="order-3 lg:hidden flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#project"
                className="flex-1 min-h-[48px] px-6 py-3.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center hover:bg-[#d8ff33] active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(204,255,0,0.22)]"
              >
                Explore work ↗
              </a>

              <a
                href="#contact"
                className="flex-1 min-h-[48px] px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.09] text-white font-medium text-xs uppercase tracking-[0.16em] flex items-center justify-center active:scale-[0.99] transition-all"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Bottom Metadata Bar */}
          <div className="pt-6 border-t border-white/[0.07] flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-gray-500">
            <span>Warangal / India</span>
            <span className="hidden sm:inline">Scroll to explore ↓</span>
            <span>Portfolio 2026</span>
          </div>
        </div>

        {/* Controlled Environment Transition Horizon into About */}
        <div
          ref={envBridgeRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-white/[0.03] to-white/[0.12] opacity-0 transition-opacity duration-150"
        />
      </section>

      {/* Exactly ONE Continuous Visual Portrait Traveler (Portaled to document.body) */}
      {!reducedMotion &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={travelerRef}
            className="portrait-traveler"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 35,
              pointerEvents: 'none',
              transformOrigin: '0 0',
              willChange: 'transform',
            }}
          >
            <div ref={travelerEntranceRef} className="relative w-full h-full flex items-end justify-center">
              {/* Soft Organic Neon-Lime Environmental Rim Glow (Unclipped by any container boundary!) */}
              <div
                ref={rimGlowRef}
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: '100%',
                  height: '90%',
                  right: '-12%',
                  top: '4%',
                  background:
                    'radial-gradient(circle at 75% 35%, rgba(204, 255, 0, 0.55) 0%, rgba(204, 255, 0, 0.18) 32%, rgba(204, 255, 0, 0.04) 55%, transparent 72%)',
                  filter: 'blur(48px)',
                  mixBlendMode: 'screen',
                  opacity: 0.85,
                  willChange: 'transform, opacity',
                }}
              />

              {/* Natural Cutout Stage -> Morphs to 100% Circle ONLY at final destination */}
              <div
                ref={circularFrameRef}
                className="relative w-full h-full flex items-end justify-center"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 72%, transparent 98%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 72%, transparent 98%)',
                }}
              >
                {/* Exactly ONE Visual Portrait Entity: Natural silhouette cutout that settles into circular About container */}
                <img
                  ref={cutoutImgRef}
                  src={CUTOUT_HERO_SRC}
                  alt="Khaja Shahzad"
                  className="w-full h-full object-contain object-bottom select-none"
                  draggable="false"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Hero;