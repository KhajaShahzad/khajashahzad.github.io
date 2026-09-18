import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
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
      className="relative overflow-hidden bg-[#080808] text-white px-6 md:px-16 py-24 md:py-36"
    >
      <div className="absolute inset-0 contact-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28">

        {/* LEFT SIDE */}
        <div>
          <p className="text-[#ccff00] text-xs uppercase tracking-[.3em] mb-6">
            04 / Contact
          </p>

          <h2 className="text-7xl md:text-[9rem] font-black tracking-[-.08em] leading-[.72]">
            LET'S
            <br />
            <span className="text-gray-700">BUILD.</span>
          </h2>

          <p className="mt-10 max-w-md text-gray-400 leading-relaxed">
            Have a project, internship opportunity, collaboration, or just want
            to talk software? Send a message.
          </p>

          {/* EMAIL */}
          <a
            className="inline-block mt-8 text-xl md:text-2xl hover:text-[#ccff00] transition-colors"
            href="mailto:khajashahzad90@gmail.com"
          >
            khajashahzad90@gmail.com ↗
          </a>

          {/* SOCIAL LINKS */}
          <div className="flex flex-wrap gap-3 mt-8">

            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/khaja-shahzad-mazhar-hussain-557b76265/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-white/15 bg-white/[.02] hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
            >
              LinkedIn ↗
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/KhajaShahzad"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-white/15 bg-white/[.02] hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
            >
              GitHub ↗
            </a>

            {/* YOUTUBE */}
            <a
              href="https://youtube.com/@thebeast121w"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-white/15 bg-white/[.02] hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
            >
              YouTube ↗
            </a>

            {/* EMAIL */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=khajashahzad90@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-white/15 bg-white/[.02] hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
            >
             Email ↗
          </a>

          </div>

          <p className="mt-5 text-sm text-gray-600">
            Telangana, India
          </p>
        </div>

        {/* CONTACT FORM */}
        <form
          ref={formRef}
          onSubmit={send}
          className="space-y-5 lg:pt-16"
        >
          <div className="grid md:grid-cols-2 gap-4">

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
            rows="7"
            placeholder="Tell me what you're building..."
            className="field resize-none"
          />

          {status && (
            <p className="text-sm text-gray-300 border border-white/10 rounded-xl p-4">
              {status}
            </p>
          )}

          <button
            disabled={busy}
            className="w-full py-4 rounded-xl bg-[#ccff00] text-black font-bold hover:scale-[1.01] transition-transform disabled:opacity-60"
          >
            {busy ? 'Sending…' : 'Send message ↗'}
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact;