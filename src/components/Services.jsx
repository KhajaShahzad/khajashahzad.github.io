import React, { useState } from 'react';

const CAPABILITIES_DATA = [
  [
    '01',
    'Full-stack applications',
    'React interfaces, Node/Express APIs and database-backed workflows for practical web applications.',
  ],
  [
    '02',
    'Python & Flask systems',
    'Backend applications using Flask, MySQL and PyMySQL with authentication, transactions and validation.',
  ],
  [
    '03',
    'Real-time & offline workflows',
    'WebSockets for live communication and IndexedDB for essential browser-side operation when connectivity is unreliable.',
  ],
  [
    '04',
    'Data & business workflows',
    'Inventory, billing, role-based operations, stock optimization and ETL-style migration of legacy retail data.',
  ],
];

const SKILLS_GROUPS = [
  {
    category: 'PROGRAMMING',
    items: ['Java', 'Python', 'JavaScript'],
  },
  {
    category: 'FOUNDATIONS',
    items: ['Object-Oriented Programming', 'Data Structures & Algorithms'],
  },
  {
    category: 'FULL STACK',
    items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'DATABASES',
    items: ['MySQL', 'MongoDB', 'IndexedDB'],
  },
  {
    category: 'SYSTEMS & TOOLS',
    items: ['Flask', 'WebSockets', 'Git'],
  },
];

const Services = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="capabilities"
      className="relative bg-[#050505] text-white px-5 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-28 md:py-36 border-b border-white/10"
    >
      {/* Anchor alias so both #capabilities and #service links resolve here */}
      <div id="service" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto">
        {/* Capabilities Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <p className="text-[#ccff00] text-xs font-mono uppercase tracking-[0.3em] mb-5">
              02 / Capabilities
            </p>
            <h2 className="text-[clamp(3.2rem,14vw,5.5rem)] sm:text-6xl md:text-8xl font-black tracking-[-0.07em] leading-[0.82] uppercase">
              HOW I
              <br />
              <span className="text-gray-600">BUILD</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm sm:text-base text-gray-400 leading-relaxed">
            The technologies and engineering patterns I have actually used in my
            projects.
          </p>
        </div>

        {/* Premium Restrained Accordion (Lime as precision accent, not dominant panel flood) */}
        <div className="border-t border-white/15">
          {CAPABILITIES_DATA.map(([num, title, desc], i) => {
            const isOpen = active === i;
            return (
              <div
                key={num}
                className={`relative border-b border-white/15 transition-colors duration-300 ${
                  isOpen
                    ? 'bg-white/[0.035]'
                    : 'bg-transparent hover:bg-white/[0.015]'
                }`}
              >
                {/* Left Accent Bar */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-[#ccff00] transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-7 md:p-8 flex items-start gap-4 sm:gap-6 md:gap-10 focus:outline-none"
                  onClick={() => setActive(isOpen ? -1 : i)}
                >
                  <span
                    className={`text-sm sm:text-base md:text-lg font-mono pt-1 transition-colors ${
                      isOpen ? 'text-[#ccff00] font-semibold' : 'text-gray-500'
                    }`}
                  >
                    {num}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors ${
                        isOpen ? 'text-white' : 'text-gray-200'
                      }`}
                    >
                      {title}
                    </h3>

                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 mt-4'
                          : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <p className="overflow-hidden max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-lg font-mono shrink-0 transition-colors ${
                      isOpen
                        ? 'border-[#ccff00]/60 bg-[#ccff00]/15 text-[#ccff00]'
                        : 'border-white/15 bg-white/[0.02] text-gray-400'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Minimal Structured Skills Matrix (Section 9) */}
        <div className="mt-20 sm:mt-24 pt-12 border-t border-white/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#ccff00]">
                Technical Stack
              </p>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1.5">
                Core Skills &amp; Foundations
              </h3>
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
              Organized by domain
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {SKILLS_GROUPS.map((group) => (
              <div
                key={group.category}
                className="border-t border-white/15 pt-5 space-y-3"
              >
                <h4 className="text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-[#ccff00]">
                  {group.category}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm sm:text-[15px] text-gray-300 leading-snug"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
