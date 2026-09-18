import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const links = [['About', 'about'], ['Capabilities', 'service'], ['Projects', 'project'], ['Contact', 'contact']];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y < lastScrollY || y < 80);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : 'auto'; return () => { document.body.style.overflow = 'auto'; }; }, [open]);

  return <>
    <nav className={`fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-5 transition-transform duration-500 ${show ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between rounded-full border border-white/10 bg-black/45 backdrop-blur-xl px-5 py-3">
        <a href="#home" className="font-black tracking-tight text-lg">KSMH<span className="text-[#ccff00]">.</span></a>
        <div className="hidden md:flex items-center gap-7">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{label}</a>)}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-xs uppercase tracking-widest text-gray-300">{open ? 'Close' : 'Menu'}</button>
      </div>
    </nav>
    <div className={`fixed inset-0 z-40 bg-[#050505] md:hidden transition-all duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="h-full flex flex-col justify-center px-8 gap-5">
        {links.map(([label, id], i) => <a key={id} onClick={() => setOpen(false)} href={`#${id}`} className="text-5xl font-black tracking-tighter uppercase">0{i + 1} <span className="text-gray-600">/</span> {label}</a>)}
      </div>
    </div>
  </>;
};
export default Navbar;
