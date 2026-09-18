import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const skills = ['Python', 'Java', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Flask', 'MySQL', 'MongoDB', 'REST APIs', 'WebSockets', 'IndexedDB', 'Git'];

const About = () => {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current?.querySelectorAll('.reveal'), { y: 70, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return <section id="about" ref={ref} className="relative z-10 bg-white text-black px-6 md:px-16 py-28 md:py-40 overflow-visible">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-16 reveal">
        <p className="text-[#ccff00] text-xs uppercase tracking-[.3em]">01 / About</p>
        <span className="hidden md:block text-xs text-gray-600 uppercase tracking-widest">Built through hands-on work</span>
      </div>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <h2 className="reveal lg:col-span-7 text-[clamp(4.5rem,16vw,6.5rem)] lg:text-[9rem] font-black tracking-[-.07em] leading-[.78] uppercase">I build<br/><span className="text-gray-700">useful</span><br/>systems.</h2>
        <div className="lg:col-span-5 pt-3 reveal">
         <div
  data-portrait-target
  className="about-photo-frame relative overflow-hidden rounded-full border border-black/10 w-[clamp(220px,65vw,300px)] h-[clamp(220px,65vw,300px)] lg:w-[250px] lg:h-[250px] mx-auto bg-white"
>
  <div className="portrait-smoke" />


</div>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light mt-10">I'm <span className="text-black font-medium">Khaja Shahzad Mazhar Hussain</span>, a Computer Science and Networks Engineering student at KITS Warangal. My focus is software development, with practical experience building Python and MERN applications.</p>
          <p className="text-gray-600 leading-relaxed mt-7">I enjoy taking a real-world problem, breaking it into systems and workflows, and turning those ideas into working software. I'm also strengthening my Java, Data Structures and Algorithms, and full-stack development fundamentals.</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            <div className="border border-white/10 rounded-2xl p-5 bg-white/[.025]"><div className="text-3xl font-black">02</div><div className="text-xs text-gray-500 uppercase tracking-widest mt-2">Featured builds</div></div>
            <div className="border border-white/10 rounded-2xl p-5 bg-white/[.025]"><div className="text-3xl font-black">2027</div><div className="text-xs text-gray-500 uppercase tracking-widest mt-2">B.Tech target</div></div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-28 border-y border-white/10 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-5 w-max">{[...skills, ...skills].map((s, i) => <span key={i} className="text-sm md:text-base text-gray-400 uppercase tracking-[.2em] px-6">{s} <b className="text-[#ccff00]">•</b></span>)}</div>
    </div>
  </section>;
};
export default About;
