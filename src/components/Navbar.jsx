import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  ['About', 'about'],
  ['Journey', 'journey'],
  ['Capabilities', 'capabilities'],
  ['Work', 'project'],
  ['Contact', 'contact'],
];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (open) {
        setShow(true);
      } else {
        setShow(y < lastY || y < 90);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 px-4 sm:px-6 md:px-12 py-3 md:py-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          show || open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-full border px-4 sm:px-6 py-2.5 transition-colors duration-300 ${
            scrolled || open
              ? 'border-white/15 bg-[#050505]/85 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]'
              : 'border-white/10 bg-[#050505]/55 backdrop-blur-md'
          }`}
        >
          <a
            href="#home"
            data-hero-logo
            onClick={() => setOpen(false)}
            className="font-black tracking-tight text-lg sm:text-xl text-white py-1 pr-2 focus:outline-none"
          >
            KSMH<span className="text-[#ccff00]">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-400 hover:text-white transition-colors py-1.5"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:border-[#ccff00]/70 hover:text-[#ccff00] text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile Menu Trigger — Large Comfortable Touch Target */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation-overlay"
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden min-h-[42px] px-4 rounded-full border border-white/15 bg-white/[0.04] active:bg-white/10 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-200 flex items-center gap-2 transition-colors"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                open ? 'bg-[#ccff00]' : 'bg-white/60'
              }`}
            />
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        id="mobile-navigation-overlay"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl lg:hidden transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col justify-between px-6 sm:px-10 pt-24 pb-10 overflow-y-auto">
          <div className="flex flex-col gap-2 my-auto">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-gray-500 mb-3">
              Navigation
            </p>
            {NAV_LINKS.map(([label, id], i) => (
              <a
                key={id}
                onClick={() => setOpen(false)}
                href={`#${id}`}
                className="group flex items-baseline gap-4 py-3 border-b border-white/10 text-3xl sm:text-4xl font-black tracking-tight uppercase text-white active:text-[#ccff00] transition-colors"
              >
                <span className="text-xs font-mono text-[#ccff00] tracking-widest">
                  0{i + 1}
                </span>
                <span>{label}</span>
              </a>
            ))}
          </div>

          <div className="pt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex-1 min-h-[48px] px-6 py-3.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center"
              >
                Resume ↗
              </a>
              <a
                href="mailto:khajashahzad90@gmail.com"
                onClick={() => setOpen(false)}
                className="flex-1 min-h-[48px] px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center"
              >
                Email ↗
              </a>
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-[0.22em] text-gray-600 pt-2">
              <span>Warangal, India</span>
              <span>KSMH — 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
