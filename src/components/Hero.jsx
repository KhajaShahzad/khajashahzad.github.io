import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SUIT_IMAGE = '/images/khaja-suit-cutout.png';
const SUIT_STRAIGHT_IMAGE = '/images/khaja-suit-straight.png';

const Hero = ({ onPreloadComplete }) => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const contentRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitImageRef = useRef(null);
  const straightPortraitRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const portrait = portraitRef.current;
    const portraitImage = portraitImageRef.current;
    const straightPortrait = straightPortraitRef.current;
    const target = document.querySelector('[data-portrait-target]');
    const about = document.querySelector('#about');
    if (!hero || !portrait || !portraitImage || !straightPortrait || !target) return;

    const ctx = gsap.context(() => {
      document.body.style.overflow = 'hidden';

      const intro = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          document.body.style.overflow = '';
          onPreloadComplete?.();
          ScrollTrigger.refresh();
        },
      });

      intro
        .fromTo(eyebrowRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' })
        .fromTo(titleRef.current, { y: 80, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'power4.out' }, '-=0.35')
        .fromTo(subRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.55')
        .fromTo(actionsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .fromTo(portrait, { y: '78vh', opacity: 0, scale: 0.82 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }, '-=0.9');

      const getLayout = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const desktop = vw >= 1024;
        const mobile = vw < 768;
        const startW = desktop
          ? Math.min(vw * 0.30, 470)
          : Math.min(vw * 0.42, 280);

        const startH = startW * 1.28;

        const startLeft = desktop
          ? Math.min(vw * 0.61, vw - startW - 40)
          : vw - startW - 18;

        const startTop = desktop
          ? Math.max(88, vh * 0.12)
          : mobile
            ? Math.max(320, vh * 0.46)
            : Math.max(105, vh * 0.20);

        const targetRect = target.getBoundingClientRect();
        const endLeft = targetRect.left;
        const endTop = targetRect.top;
        const endW = targetRect.width;
        const endH = targetRect.height;

        return { startW, startH, startLeft, startTop, endLeft, endTop, endW, endH };
      };

      const applyStart = () => {
        const m = getLayout();
        gsap.set(portrait, {
          position: 'fixed',
          left: m.startLeft,
          top: m.startTop,
          width: m.startW,
          height: m.startH,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          borderRadius: 0,
          opacity: 1,
        });
      };

      applyStart();
      gsap.set(straightPortraitRef.current, {
        opacity: 0,
      });
      const backgroundTransition = ScrollTrigger.create({
        trigger: hero,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const value = Math.round(5 + (255 - 5) * progress);

          gsap.set(hero, {
            backgroundColor: `rgb(${value}, ${value}, ${value})`,
          });
        },
      });
      const syncInitialScrollState = () => {
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
          ScrollTrigger.update();
        });
      };
      const flight = ScrollTrigger.create({

        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const m = getLayout();
          const t = gsap.utils.clamp(0, 1, self.progress);
          const eased = gsap.parseEase('power2.inOut')(t);
          gsap.set(portraitImageRef.current, {
            opacity: 1 - eased,
          });

          gsap.set(straightPortraitRef.current, {
            opacity: eased,
          });

          const left = gsap.utils.interpolate(m.startLeft, m.endLeft, eased);
          const top = gsap.utils.interpolate(m.startTop, m.endTop, eased);
          const width = gsap.utils.interpolate(m.startW, m.endW, eased);
          const height = gsap.utils.interpolate(m.startH, m.endH, eased);
          const radius = gsap.utils.interpolate(0, 50, eased);

          // Before the handoff the portrait is fixed to the viewport.
          // At the exact destination it becomes document-absolute, so it stays
          // in the About section instead of disappearing or continuing to drift.
          if (t < 0.999) {
            if (portrait.dataset.docked === 'true') portrait.dataset.docked = 'false';
            gsap.set(portrait, {
              position: 'fixed',
              left,
              top,
              width,
              height,
              scale: gsap.utils.interpolate(1, 0.92, eased),
              borderRadius: radius,
              opacity: 1,
            });
          } else {
            const heroRect = hero.getBoundingClientRect();
            const docLeft = m.endLeft - heroRect.left;
            const docTop = m.endTop - heroRect.top;
            portrait.dataset.docked = 'true';
            gsap.set(portrait, {
              position: 'absolute',
              left: docLeft,
              top: docTop,
              width: m.endW,
              height: m.endH,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              borderRadius: '50%',
              opacity: 1,
            });
          }
          gsap.set(straightPortrait, {
            opacity: t,
          });
        },
      });
      syncInitialScrollState();

      const handleResize = () => {
        ScrollTrigger.refresh();
        requestAnimationFrame(() => ScrollTrigger.update());
      };
      window.addEventListener('resize', handleResize);

      return () => {
        flight.kill();
        window.removeEventListener('resize', handleResize);
      };
    }, hero);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onPreloadComplete]);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen overflow-visible bg-[#050505] text-white px-6 md:px-12">
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
      <div className="absolute w-[42rem] h-[42rem] rounded-full bg-[#ccff00]/10 blur-[130px] -right-48 -top-40 pointer-events-none" />
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-cyan-400/5 blur-[120px] -left-40 bottom-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-screen flex items-center pt-24 pb-16">
        <div className="w-[55%] max-w-[760px] pr-8 md:pr-12">
          <div ref={eyebrowRef} className="flex items-center gap-3 text-xs md:text-sm tracking-[.28em] uppercase text-gray-400 mb-6 opacity-0">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_18px_#ccff00]" />
            Computer Science & Software Development
          </div>

          <h1 ref={titleRef} className="opacity-0 font-black tracking-[-.075em] leading-[.78] text-[13vw] md:text-[8rem] lg:text-[9.4rem] uppercase">
            KHAJA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">SHAHZAD</span>
          </h1>

          <div className="mt-8 md:mt-10">
            <p ref={subRef} className="opacity-0 max-w-[650px] text-gray-300 text-base md:text-xl leading-relaxed font-light">
              I build practical software systems with <strong className="text-white font-medium">Python, JavaScript and the MERN stack</strong> — from retail operations to secure web applications.
            </p>

            <div ref={actionsRef} className="opacity-0 flex items-center gap-3 mt-7">
              <a href="#project" className="px-6 py-3 rounded-full bg-[#ccff00] text-black font-semibold text-sm hover:scale-105 transition-transform">Explore work ↗</a>
              <a href="#contact" className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur text-sm hover:bg-white/10 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-6 right-6 md:left-12 md:right-12 max-w-7xl mx-auto flex justify-between text-[10px] uppercase tracking-[.25em] text-gray-600 z-20">
        <span>Warangal / India</span>
        <span>Scroll to explore ↓</span>
        <span>Portfolio 2026</span>
      </div>

      <div
        ref={portraitRef}
        className="portrait-flight fixed z-[15] pointer-events-none overflow-hidden will-change-[left,top,width,height,transform] hidden md:block"
      >
        <img
          ref={portraitImageRef}
          src={SUIT_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-bottom"
          draggable="false"
        />

        <img
          ref={straightPortraitRef}
          src={SUIT_STRAIGHT_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-bottom z-[2]"
          draggable="false"
        />
      </div>

    </section>
  );
};

export default Hero;