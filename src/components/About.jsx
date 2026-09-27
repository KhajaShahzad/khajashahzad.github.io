import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT_SRC = '/images/khaja-suit-straight.png';

const About = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);

  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
        0
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.08
        )
        .fromTo(
          bioRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.2
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.32
        );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-white text-black rounded-t-[28px] sm:rounded-t-[40px] shadow-[0_-24px_70px_rgba(0,0,0,0.65)] px-5 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-28 md:py-36 overflow-visible"
    >
      <div className="absolute inset-0 about-grid-subtle pointer-events-none rounded-t-[28px] sm:rounded-t-[40px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow Header */}
        <div
          ref={eyebrowRef}
          className="flex justify-between items-end mb-12 sm:mb-16 border-b border-black/10 pb-5"
        >
          <p className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-[0.28em] text-black">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] ring-2 ring-black/80" />
            <span>01 / About</span>
          </p>
          <span className="hidden md:block text-xs text-gray-500 uppercase tracking-[0.22em]">
            Built through hands-on work
          </span>
        </div>

        {/* 12-Column Responsive Layout:
            Mobile: Heading -> Portrait -> Bio -> Stats
            Desktop: Left 7 cols (Heading) | Right 5 cols (Portrait -> Bio -> Stats) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <h2
            ref={headingRef}
            className="lg:col-span-7 text-[clamp(3.4rem,14.5vw,6rem)] sm:text-[clamp(4.4rem,13vw,6.8rem)] lg:text-[clamp(5.4rem,7.8vw,8.4rem)] font-black tracking-[-0.07em] leading-[0.82] uppercase text-black"
          >
            I build
            <br />
            <span className="text-slate-500">useful</span>
            <br />
            systems.
          </h2>

          <div className="lg:col-span-5 pt-1 mt-6 lg:mt-0">
            {/* Target Destination Geometry Slot.
                NOTE: This container is visually transparent so the user NEVER sees an empty placeholder circle underneath.
                The single traveling portrait docks exactly into this geometry. */}
            <div
              data-portrait-about-slot
              className="relative w-[clamp(220px,62vw,270px)] sm:w-[270px] lg:w-[260px] aspect-square mx-auto pointer-events-none"
              aria-hidden="true"
            >
              {/* Static portrait rendered ONLY when prefers-reduced-motion is enabled */}
              {reducedMotion && (
                <div className="w-full h-full rounded-full border border-black/10 bg-[#f4f4f6] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.14)]">
                  <img
                    src={PORTRAIT_SRC}
                    alt="Khaja Shahzad"
                    className="w-full h-full object-cover object-center select-none"
                    draggable="false"
                  />
                </div>
              )}
            </div>

            <div ref={bioRef} className="mt-10 sm:mt-12">
              <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                I&apos;m{' '}
                <span className="text-black font-semibold">
                  Khaja Shahzad Mazhar Hussain
                </span>
                , a Computer Science and Networks Engineering student at KITS
                Warangal. My focus is software development, with practical
                experience building Python and MERN applications.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-5">
                I enjoy taking a real-world problem, breaking it into systems
                and workflows, and turning those ideas into working software.
                I&apos;m also strengthening my Java, Data Structures and
                Algorithms, and full-stack development fundamentals.
              </p>
            </div>

            {/* Statistics */}
            <div
              ref={statsRef}
              className="mt-8 sm:mt-10 grid grid-cols-2 gap-3.5"
            >
              <div className="border border-black/10 rounded-2xl p-5 bg-black/[0.02] hover:bg-black/[0.04] transition-colors">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-black">
                  02
                </div>
                <div className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.18em] mt-2">
                  Featured builds
                </div>
              </div>
              <div className="border border-black/10 rounded-2xl p-5 bg-black/[0.02] hover:bg-black/[0.04] transition-colors">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-black">
                  2027
                </div>
                <div className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.18em] mt-2">
                  B.Tech target
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
