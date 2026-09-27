import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectVisual = ({ type }) =>
  type === 'ibms' ? (
    <div className="project-visual dashboard-visual">
      <div className="dash-top">
        <span>IBMS / LIVE</span>
        <span className="live-dot">● ONLINE</span>
      </div>
      <div className="dash-grid">
        <div className="dash-main">
          <div className="metric-row">
            <div>
              <small>Today&apos;s sales</small>
              <strong>₹48,920</strong>
            </div>
            <div>
              <small>Orders</small>
              <strong>184</strong>
            </div>
          </div>
          <div className="chart">
            <i style={{ height: '34%' }} />
            <i style={{ height: '58%' }} />
            <i style={{ height: '45%' }} />
            <i style={{ height: '72%' }} />
            <i style={{ height: '64%' }} />
            <i style={{ height: '91%' }} />
            <i style={{ height: '78%' }} />
            <i style={{ height: '100%' }} />
          </div>
        </div>
        <div className="dash-side">
          <div>
            <div>STOCK</div>
            <b>1,284</b>
            <span>items tracked</span>
          </div>
          <hr />
          <div>
            <div>SYNC</div>
            <b>99.9%</b>
            <span>workspace state</span>
          </div>
        </div>
      </div>
      <div className="scan">
        QR <span>PAIR SCANNER</span>
      </div>
    </div>
  ) : (
    <div className="project-visual atm-visual">
      <div className="atm-card">
        <span>BIOMETRIC ACCESS</span>
        <div className="finger">◉</div>
        <strong>FINGERPRINT</strong>
        <small>AUTHENTICATION SIMULATION</small>
      </div>
      <div className="atm-terminal">
        <div className="terminal-line">USER VERIFIED</div>
        <div className="terminal-line">BALANCE / ₹24,500</div>
        <div className="terminal-line">TRANSACTION / READY</div>
      </div>
    </div>
  );

const PROJECTS_DATA = [
  {
    id: '01',
    type: 'ibms',
    title: (
      <>
        INVENTORY &amp;
        <br />
        <span className="text-gray-400">BILLING</span>
      </>
    ),
    kicker: 'Retail operations / POS',
    desc: 'A full-stack retail Point of Sale, real-time inventory, and business workflow platform engineered for fast-paced retail counters.',
    problem:
      'Replaces fragmented spreadsheets, manual barcode hardware dependencies, and connectivity-fragile billing with a unified operational workspace that continues functioning offline.',
    tags: [
      'React / Node.js',
      'MongoDB',
      'WebSockets',
      'IndexedDB',
      'SQLite ETL',
    ],
    details: [
      'QR smartphone barcode scanning paired to the counter via WebSockets',
      'Offline-first checkout engine backed by browser IndexedDB storage',
      'Client-side PDF receipt generation with direct WhatsApp sharing',
      'Greedy stock-optimization decision support & role-based workspace',
      'ETL migration pipeline transforming legacy SQLite retail data into MongoDB',
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/KhajaShahzad',
  },
  {
    id: '02',
    type: 'atm',
    title: (
      <>
        BIOMETRIC
        <br />
        <span className="text-gray-400">ATM SYSTEM</span>
      </>
    ),
    kicker: 'Flask / MySQL / Security simulation',
    desc: 'A Flask-based biometric authentication simulation modeling fingerprint-assisted ATM access, account verification, and transactional banking workflows.',
    problem:
      'Demonstrates how multi-step authentication, byte-level fingerprint image comparison, and relational ACID-style account ledger updates interact in a full-stack Python web application.',
    tags: [
      'Python / Flask',
      'MySQL',
      'PyMySQL',
      'JavaScript',
      'HTML / CSS',
    ],
    details: [
      'Flask-based biometric authentication simulation using byte-level fingerprint image comparison',
      'Multi-stage verification and session-protected account operations',
      'Balance inquiry, cash deposit, and withdrawal transaction workflows',
      'MySQL persistence layer via PyMySQL for users and transaction logs',
      'Client-side and server-side input validation for transaction integrity',
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/KhajaShahzad',
  },
];

const Project = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.project-block'),
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.16,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative bg-[#050505] text-white px-5 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-28 md:py-36"
    >
      {/* Alias anchor so #work and #project both scroll here */}
      <div id="work" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 sm:mb-24">
          <div>
            <p className="text-[#ccff00] text-xs font-mono uppercase tracking-[0.3em] mb-5">
              04 / Selected work
            </p>
            <h2 className="text-[clamp(3.3rem,14vw,6rem)] sm:text-7xl md:text-[7.8rem] font-black tracking-[-0.075em] leading-[0.78] uppercase">
              BUILT
              <br />
              <span className="text-gray-600">FOR REAL.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-gray-400 leading-relaxed">
            Two projects that show how I approach actual workflows: model the
            problem, connect the pieces, and make the system usable.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-28 sm:space-y-36">
          {PROJECTS_DATA.map((p, i) => {
            const isOdd = i % 2 === 1;
            return (
              <article
                key={p.id}
                className="project-block grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-14 items-start"
              >
                {/* 1. Mobile Top / Desktop Text Header: Label -> Title -> Description & Problem -> Tech Tags */}
                <div
                  className={`order-1 lg:col-span-5 ${
                    isOdd
                      ? 'lg:col-start-1 lg:row-start-1'
                      : 'lg:col-start-8 lg:row-start-1'
                  }`}
                >
                  <div className="text-[#ccff00] text-xs font-mono uppercase tracking-[0.2em] mb-4">
                    {p.id} — {p.kicker}
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.06em] leading-[0.86] uppercase mb-6">
                    {p.title}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-normal">
                      {p.desc}
                    </p>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-[#ccff00] mb-1.5">
                        Problem Solved
                      </span>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {p.problem}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full border border-white/12 bg-white/[0.02] text-[10px] font-mono uppercase tracking-[0.16em] text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Mobile Middle / Desktop Visual Mockup */}
                <div
                  className={`order-2 lg:col-span-7 lg:row-span-2 ${
                    isOdd
                      ? 'lg:col-start-6 lg:row-start-1'
                      : 'lg:col-start-1 lg:row-start-1'
                  } self-center w-full`}
                >
                  <ProjectVisual type={p.type} />
                </div>

                {/* 3. Mobile Bottom / Desktop Text Footer: Key Features + Actions */}
                <div
                  className={`order-3 lg:col-span-5 ${
                    isOdd
                      ? 'lg:col-start-1 lg:row-start-2'
                      : 'lg:col-start-8 lg:row-start-2'
                  }`}
                >
                  <div className="border-t border-white/12 pt-6">
                    <span className="block text-[10px] font-mono uppercase tracking-[0.24em] text-gray-500 mb-4">
                      Engineering Features
                    </span>
                    <ul className="space-y-2.5">
                      {p.details.map((d) => (
                        <li
                          key={d}
                          className="text-sm text-gray-300 flex items-start gap-3 leading-relaxed"
                        >
                          <span className="text-[#ccff00] font-mono mt-0.5">
                            +
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(p.liveUrl || p.githubUrl) && (
                    <div className="flex flex-wrap items-center gap-3 mt-8 pt-2">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-[0.16em] inline-flex items-center justify-center hover:bg-[#d8ff33] transition-colors"
                        >
                          VIEW PROJECT ↗
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] hover:border-[#ccff00] hover:text-[#ccff00] text-white font-semibold text-xs uppercase tracking-[0.16em] inline-flex items-center justify-center transition-colors"
                        >
                          GITHUB ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Project;
