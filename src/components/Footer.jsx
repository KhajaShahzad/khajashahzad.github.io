import React from 'react';

const Footer = () => (
  <footer className="bg-[#050505] text-white px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <a
            href="#home"
            className="font-black text-xl sm:text-2xl tracking-tight text-white"
          >
            KSMH<span className="text-[#ccff00]">.</span>
          </a>
          <p className="text-xs text-gray-500 mt-1.5">
            Software development / Warangal, India
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-gray-400"
        >
          <a href="#about" className="hover:text-white transition-colors py-1">
            About
          </a>
          <a href="#journey" className="hover:text-white transition-colors py-1">
            Journey
          </a>
          <a
            href="#capabilities"
            className="hover:text-white transition-colors py-1"
          >
            Capabilities
          </a>
          <a href="#project" className="hover:text-white transition-colors py-1">
            Work
          </a>
          <a href="#contact" className="hover:text-white transition-colors py-1">
            Contact
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccff00] hover:underline py-1"
          >
            Resume ↗
          </a>
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-gray-600">
        <span>Khaja Shahzad Mazhar Hussain</span>
        <span>© {new Date().getFullYear()} KSMH — All rights reserved</span>
      </div>
    </div>
  </footer>
);

export default Footer;
