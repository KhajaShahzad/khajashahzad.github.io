import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ProjectVisual = ({ type }) => type === 'ibms' ? <div className="project-visual dashboard-visual"><div className="dash-top"><span>IBMS / LIVE</span><span className="live-dot">● ONLINE</span></div><div className="dash-grid"><div className="dash-main"><div className="metric-row"><div><small>Today's sales</small><strong>₹48,920</strong></div><div><small>Orders</small><strong>184</strong></div></div><div className="chart"><i style={{height:'34%'}}/><i style={{height:'58%'}}/><i style={{height:'45%'}}/><i style={{height:'72%'}}/><i style={{height:'64%'}}/><i style={{height:'91%'}}/><i style={{height:'78%'}}/><i style={{height:'100%'}}/></div></div><div className="dash-side"><div>STOCK</div><b>1,284</b><span>items tracked</span><hr/><div>SYNC</div><b>99.9%</b><span>workspace state</span></div></div><div className="scan">QR <span>PAIR SCANNER</span></div></div> : <div className="project-visual atm-visual"><div className="atm-card"><span>BIOMETRIC ACCESS</span><div className="finger">◉</div><strong>FINGERPRINT</strong><small>AUTHENTICATION MODULE</small></div><div className="atm-terminal"><div className="terminal-line">USER VERIFIED</div><div className="terminal-line">BALANCE / ₹24,500</div><div className="terminal-line">TRANSACTION / READY</div></div></div>;

const projects = [
  { id:'01', type:'ibms', title:<>INVENTORY &<br/><span> BILLING</span></>, kicker:'Retail operations / POS', desc:'A retail Point of Sale, real-time inventory and business intelligence platform designed for fast-paced counters. The system connects checkout, stock, scanning and business workflows into one operational workspace.', tags:['React / Node.js','MongoDB','WebSockets','IndexedDB','ETL'], details:['Smartphone barcode scanning through QR pairing + WebSockets','Offline-first checkout with IndexedDB','Client-side PDF receipts with WhatsApp sharing','Greedy stock-optimization decision support','Role-based multi-user workspace management'] },
  { id:'02', type:'atm', title:<>BIOMETRIC<br/><span>ATM SYSTEM</span></>, kicker:'Flask / MySQL / Security simulation', desc:'A Flask-based ATM simulation built around fingerprint-based authentication, account operations and transaction workflows, with MySQL persistence and client-side validation.', tags:['Python / Flask','MySQL','PyMySQL','JavaScript','HTML / CSS'], details:['Fingerprint registration and byte-level image comparison','Secure login flow and account operations','Balance inquiry, deposits and withdrawals','MySQL transaction and user data management','Client-side form validation'] }
];

const Project = () => {
  const ref = useRef(null);
  useEffect(() => { gsap.fromTo(ref.current?.querySelectorAll('.project-block'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: .2, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start:'top 78%' } }); }, []);
  return <section id="project" ref={ref} className="bg-[#050505] text-white px-6 md:px-16 py-24 md:py-36">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"><div><p className="text-[#ccff00] text-xs uppercase tracking-[.3em] mb-5">03 / Selected work</p><h2 className="text-6xl md:text-[8rem] font-black tracking-[-.08em] leading-[.75]">BUILT<br/><span className="text-gray-700">FOR REAL.</span></h2></div><p className="max-w-md text-gray-400 leading-relaxed">Two projects that show how I approach actual workflows: model the problem, connect the pieces, and make the system usable.</p></div>
      <div className="space-y-36">
        {projects.map((p, i) => <article key={p.id} className={`project-block grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i ? '' : ''}`}>
          <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}><ProjectVisual type={p.type}/></div>
          <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}><div className="text-[#ccff00] text-xs font-mono mb-5">{p.id} — {p.kicker}</div><h3 className="text-5xl md:text-6xl font-black tracking-[-.06em] leading-[.85] uppercase mb-7">{p.title}</h3><p className="text-gray-400 leading-relaxed mb-7">{p.desc}</p><div className="flex flex-wrap gap-2 mb-8">{p.tags.map(t=><span key={t} className="px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-gray-400">{t}</span>)}</div><ul className="space-y-3 border-t border-white/10 pt-6">{p.details.map(d=><li key={d} className="text-sm text-gray-300 flex gap-3"><span className="text-[#ccff00]">+</span>{d}</li>)}</ul></div>
        </article>)}
      </div>
    </div>
  </section>;
};
export default Project;
