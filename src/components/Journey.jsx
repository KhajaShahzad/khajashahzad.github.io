import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_MILESTONES = [
  {
    period: '2021–2024',
    degree: 'DIPLOMA',
    field: 'Computer Science Engineering',
    institution:
      'VMR Pradeep Kumar Institute of Engineering & Technology',
    shortInstitution: 'VMR Pradeep Kumar Institute of Engineering & Technology',
    status: 'Completed',
  },
  {
    period: '2024–2027',
    degree: 'B.TECH',
    field: 'Computer Science & Networks Engineering',
    institution:
      'Kakatiya Institute of Technology and Science, Warangal',
    shortInstitution: 'KITS Warangal',
    status: 'In Progress',
  },
];

import { CERTIFICATIONS_DATA } from '../data/certifications';

/**
 * Reusable Premium Credential Row Component
 */
export const CertificationRow = ({ item, onSelect }) => {
  const {
    name,
    issuer,
    issueDate,
    credentialId,
    credentialUrl,
    previewUrl,
    isSpecimen,
  } = item;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(item);
        }
      }}
      className="group w-full text-left border-b border-white/12 py-6 px-4 sm:px-6 rounded-xl hover:bg-white/[0.03] focus:outline-none focus:ring-1 focus:ring-[#ccff00]/60 transition-colors cursor-pointer"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            {isSpecimen && (
              <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-[0.2em] bg-white/10 text-gray-300 border border-white/15">
                UI Specimen Slot
              </span>
            )}
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#ccff00] transition-colors uppercase">
              {name}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-400">
            <span>{issuer}</span>
            {issueDate && (
              <>
                <span className="text-gray-600">•</span>
                <span className="font-mono text-xs text-gray-400">
                  {issueDate}
                </span>
              </>
            )}
            {credentialId && (
              <>
                <span className="text-gray-600">•</span>
                <span className="font-mono text-[11px] text-gray-500">
                  ID: {credentialId}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 md:pt-0">
          {(previewUrl || isSpecimen) && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/12 bg-white/[0.02] group-hover:border-white/25 text-[11px] font-mono uppercase tracking-[0.16em] text-gray-300 transition-colors">
              Inspect Credential
            </span>
          )}

          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 hover:bg-[#ccff00] hover:text-black text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ccff00] transition-colors"
            >
              VIEW CREDENTIAL ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable Physical-Credential Modal / Lightbox
 */
export const CertificateModal = ({ item, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!item) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0c0c0f] text-white shadow-[0_35px_100px_rgba(0,0,0,0.8)] overflow-hidden my-auto"
      >
        {/* Top Credential Header Bar */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#ccff00]">
              Credential Verification View
            </p>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-tight truncate mt-0.5">
              {item.name}
            </h4>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="min-h-[38px] px-3.5 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/10 text-[11px] font-mono uppercase tracking-[0.15em] text-gray-300 transition-colors"
            >
              {zoomed ? 'Fit View' : 'Zoom +'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close credential preview"
              className="min-h-[38px] px-4 rounded-lg bg-white/10 hover:bg-[#ccff00] hover:text-black text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>

        {/* Physical Credential Frame Stage */}
        <div className="p-5 sm:p-8 bg-[#08080a] max-h-[68vh] overflow-auto flex items-center justify-center">
          <div
            className={`w-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top ${
              zoomed ? 'scale-125 my-10' : 'scale-100'
            }`}
          >
            {item.previewUrl ? (
              item.previewType === 'pdf' ? (
                <iframe
                  src={item.previewUrl}
                  title={item.name}
                  className="w-full h-[52vh] rounded-xl border border-white/15 bg-white"
                />
              ) : (
                <img
                  src={item.previewUrl}
                  alt={item.name}
                  className="w-full max-h-[55vh] object-contain rounded-xl border border-white/15 shadow-2xl mx-auto"
                />
              )
            ) : (
              /* Physical Credential Specimen Sheet (when previewing the architecture slot) */
              <div className="relative rounded-xl border border-white/15 bg-gradient-to-br from-[#15161b] via-[#0e0f12] to-[#09090b] p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_25px_60px_rgba(0,0,0,0.65)]">
                <div className="flex justify-between items-start border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#ccff00]">
                      KSMH // CREDENTIAL ARCHITECTURE
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-2">
                      {item.name}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      {item.issuer}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00] font-mono text-xs font-bold">
                    ✓
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs font-mono">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Issue Date
                    </span>
                    <span className="text-gray-200 mt-1 block">
                      {item.issueDate || 'Pending Upload'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Credential ID
                    </span>
                    <span className="text-gray-200 mt-1 block">
                      {item.credentialId || 'Supported Field'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Document Format
                    </span>
                    <span className="text-gray-200 mt-1 block">
                      Image / PDF Ready
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Metadata & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 sm:px-7 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-xs text-gray-400">
            <span className="text-white font-medium">{item.issuer}</span>
            {item.issueDate ? ` • ${item.issueDate}` : ''}
            {item.credentialId ? ` • ID: ${item.credentialId}` : ''}
          </div>

          <div className="flex items-center gap-3">
            {item.credentialUrl && (
              <a
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-[0.16em] hover:bg-[#d8ff33] transition-colors"
              >
                VIEW CREDENTIAL ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SPECIMEN_CREDENTIAL_ITEM = {
  id: 'credential-slot-specimen',
  name: 'Verified Certification Slot',
  issuer: 'Reusable Credential Component — Ready for official certificate data',
  issueDate: 'Schema: Name / Issuer / Date / ID / Preview',
  credentialId: 'VERIFIED-SLOT',
  credentialUrl: '',
  previewUrl: '',
  isSpecimen: true,
};

const Journey = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !timeline || !progressLine) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(progressLine, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Subtle section reveal
      gsap.fromTo(
        section.querySelectorAll('[data-journey-reveal]'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
          },
        }
      );

      // Scroll-driven moving timeline indicator
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 72%',
            end: 'bottom 52%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-[#050505] text-white px-5 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-28 md:py-36 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          data-journey-reveal
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20"
        >
          <div>
            <p className="text-[#ccff00] text-xs font-mono uppercase tracking-[0.3em] mb-5">
              03 / JOURNEY
            </p>
            <h2 className="text-[clamp(3.1rem,13.5vw,5.8rem)] sm:text-[clamp(4.2rem,11vw,6.8rem)] lg:text-[7.4rem] font-black tracking-[-0.07em] leading-[0.82] uppercase">
              THE PATH
              <br />
              <span className="text-gray-600">BEHIND THE</span>
              <br />
              BUILDER.
            </h2>
          </div>
          <p className="max-w-sm text-sm sm:text-base text-gray-400 leading-relaxed">
            Academic progression in Computer Science &amp; Networks Engineering,
            focused on building strong systems foundations.
          </p>
        </div>

        {/* EDUCATION TIMELINE */}
        <div className="mb-24 sm:mb-28">
          <div
            data-journey-reveal
            className="flex items-center justify-between border-b border-white/12 pb-4 mb-10 sm:mb-12"
          >
            <h3 className="text-xs font-mono uppercase tracking-[0.28em] text-gray-400">
              EDUCATION
            </h3>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ccff00]">
              2021 — 2027
            </span>
          </div>

          <div
            ref={timelineRef}
            className="relative pl-7 sm:pl-10 md:pl-12 space-y-12 sm:space-y-14"
          >
            {/* Static Background Track */}
            <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-[2px] bg-white/12" />

            {/* Moving Neon-Lime Timeline Progress Indicator */}
            <div
              ref={progressLineRef}
              className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-[2px] bg-[#ccff00] origin-top shadow-[0_0_14px_#ccff00]"
              style={{ transform: 'scaleY(0)' }}
            />

            {EDUCATION_MILESTONES.map((item, idx) => (
              <div
                key={item.period}
                data-journey-reveal
                className="relative group"
              >
                {/* Timeline Node Dot */}
                <span
                  className={`absolute -left-7 sm:-left-10 md:-left-12 top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    idx === 1
                      ? 'border-[#ccff00] bg-[#050505] shadow-[0_0_16px_rgba(204,255,0,0.45)]'
                      : 'border-white/50 bg-[#050505] group-hover:border-[#ccff00]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      idx === 1 ? 'bg-[#ccff00]' : 'bg-white/80'
                    }`}
                  />
                </span>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.035] hover:border-white/20 p-6 sm:p-8 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-[#ccff00]">
                      {item.period}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono uppercase tracking-[0.18em] text-gray-400">
                      {item.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-12 gap-4 md:items-baseline">
                    <div className="md:col-span-4">
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-white">
                        {item.degree}
                      </h4>
                    </div>
                    <div className="md:col-span-8 space-y-1.5">
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-100">
                        {item.field}
                      </p>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS SUBSECTION */}
        <div data-journey-reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/12 pb-4 mb-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.28em] text-gray-400">
                CERTIFICATIONS
              </h3>
              <p className="text-xs text-gray-500 mt-1.5">
                Verified technical credentials &amp; examination records
              </p>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">
              {CERTIFICATIONS_DATA.length > 0
                ? `${String(CERTIFICATIONS_DATA.length).padStart(2, '0')} Published`
                : 'Registry Ready'}
            </span>
          </div>

          {CERTIFICATIONS_DATA.length > 0 ? (
            <div className="divide-y divide-white/10">
              {CERTIFICATIONS_DATA.map((cert) => (
                <CertificationRow
                  key={cert.id || cert.name}
                  item={cert}
                  onSelect={setSelectedCert}
                />
              ))}
            </div>
          ) : (
            <CertificationRow
              item={SPECIMEN_CREDENTIAL_ITEM}
              onSelect={setSelectedCert}
            />
          )}
        </div>
      </div>

      {/* Physical Credential Preview Modal */}
      <CertificateModal
        item={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

export default Journey;
