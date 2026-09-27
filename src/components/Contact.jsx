import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus('');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('Message sent. I’ll get back to you.');
      formRef.current.reset();
    } catch {
      setStatus(
        'Email service is not configured yet. Please use the email address directly.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080808] text-white px-5 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-28 md:py-36 border-t border-white/10"
    >
      <div className="absolute inset-0 contact-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        {/* LEFT SIDE */}
        <div>
          <p className="text-[#ccff00] text-xs font-mono uppercase tracking-[0.3em] mb-6">
            05 / Contact
          </p>

          <h2 className="text-[clamp(3.6rem,15vw,6.5rem)] sm:text-7xl md:text-[8.6rem] font-black tracking-[-0.08em] leading-[0.76] uppercase">
            LET&apos;S
            <br />
            <span className="text-gray-600">BUILD.</span>
          </h2>

          <p className="mt-8 sm:mt-10 max-w-md text-sm sm:text-base text-gray-400 leading-relaxed">
            Have a project, internship opportunity, collaboration, or just want
            to talk software? Send a message.
          </p>

          {/* DIRECT EMAIL */}
          <a
            className="inline-block mt-7 sm:mt-8 text-lg sm:text-xl md:text-2xl font-medium hover:text-[#ccff00] transition-colors break-all"
            href="mailto:khajashahzad90@gmail.com"
          >
            khajashahzad90@gmail.com ↗
          </a>

          {/* SOCIAL & RESUME LINKS */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-7 sm:mt-8">
            <a
              href="https://www.linkedin.com/in/khaja-shahzad-mazhar-hussain-557b76265/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.02] hover:border-[#ccff00] hover:text-[#ccff00] text-xs sm:text-sm font-medium inline-flex items-center justify-center transition-colors"
            >
              LinkedIn ↗
            </a>

            <a
              href="https://github.com/KhajaShahzad"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.02] hover:border-[#ccff00] hover:text-[#ccff00] text-xs sm:text-sm font-medium inline-flex items-center justify-center transition-colors"
            >
              GitHub ↗
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-full border border-[#ccff00]/45 bg-[#ccff00]/10 hover:bg-[#ccff00] hover:text-black text-[#ccff00] text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-colors"
            >
              Resume ↗
            </a>

            <a
              href="https://youtube.com/@thebeast121w"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.02] hover:border-[#ccff00] hover:text-[#ccff00] text-xs sm:text-sm font-medium inline-flex items-center justify-center transition-colors"
            >
              YouTube ↗
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=khajashahzad90@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.02] hover:border-[#ccff00] hover:text-[#ccff00] text-xs sm:text-sm font-medium inline-flex items-center justify-center transition-colors"
            >
              Email ↗
            </a>
          </div>

          <p className="mt-6 text-xs font-mono uppercase tracking-[0.22em] text-gray-500">
            Warangal, Telangana — India
          </p>
        </div>

        {/* CONTACT FORM */}
        <form
          ref={formRef}
          onSubmit={send}
          className="space-y-4 sm:space-y-5 lg:pt-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className="field"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="field"
            />
          </div>

          <input
            name="subject"
            placeholder="Subject"
            className="field"
          />

          <textarea
            name="message"
            required
            rows="6"
            placeholder="Tell me what you're building..."
            className="field resize-none"
          />

          {status && (
            <p className="text-sm text-gray-300 border border-white/10 rounded-xl p-4 bg-white/[0.02]">
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full min-h-[52px] py-4 rounded-xl bg-[#ccff00] text-black font-bold text-sm uppercase tracking-[0.16em] hover:bg-[#d8ff33] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
          >
            {busy ? 'Sending…' : 'Send message ↗'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;