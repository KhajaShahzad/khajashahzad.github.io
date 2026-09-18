import React, { useState } from 'react';

const data = [
  ['01', 'Full-stack applications', 'React interfaces, Node/Express APIs and database-backed workflows for practical web applications.'],
  ['02', 'Python & Flask systems', 'Backend applications using Flask, MySQL and PyMySQL with authentication, transactions and validation.'],
  ['03', 'Real-time & offline workflows', 'WebSockets for live communication and IndexedDB for essential browser-side operation when connectivity is unreliable.'],
  ['04', 'Data & business workflows', 'Inventory, billing, role-based operations, stock optimization and ETL-style migration of legacy retail data.'],
];

const Services = () => {
  const [active, setActive] = useState(0);
  return <section id="service" className="bg-[#050505] text-white px-6 md:px-16 py-24 md:py-36">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-16">
        <div><p className="text-[#ccff00] text-xs uppercase tracking-[.3em] mb-5">02 / Capabilities</p><h2 className="text-6xl md:text-8xl font-black tracking-[-.07em] leading-[.8]">HOW I<br/><span className="text-gray-700">BUILD</span></h2></div>
        <p className="hidden md:block max-w-xs text-sm text-gray-500 leading-relaxed">The technologies and engineering patterns I have actually used in my projects.</p>
      </div>
      <div className="border-t border-white/15">
        {data.map(([num, title, desc], i) => <div key={num} className={`border-b border-white/15 transition-colors ${active === i ? 'bg-[#ccff00] text-black' : ''}`}>
          <button className="w-full text-left p-6 md:p-8 flex items-start gap-5 md:gap-12" onClick={() => setActive(active === i ? -1 : i)}>
            <span className={`text-sm md:text-lg font-mono ${active === i ? 'text-black/60' : 'text-[#ccff00]'}`}>{num}</span>
            <div className="flex-1"><h3 className="text-xl md:text-3xl font-black uppercase tracking-tight">{title}</h3><div className={`grid transition-all duration-500 ${active === i ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0'}`}><p className="overflow-hidden max-w-2xl text-sm md:text-base leading-relaxed">{desc}</p></div></div>
            <span className="text-2xl font-light">{active === i ? '−' : '+'}</span>
          </button>
        </div>)}
      </div>
    </div>
  </section>;
};
export default Services;
