/* ─── CANVAS PARTICLES ─── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 1.2 + 0.2;
    this.vx    = (Math.random() - .5) * 0.3;
    this.vy    = (Math.random() - .5) * 0.3;
    this.alpha = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > .5 ? '0,245,255' : '0,102,255';
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor(W * H / 8000);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,245,255,${0.04 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* ─── FLOATING SHAPES ─── */
const shapes = [
  { size: 60, left: 10,  dur: 18, delay: 0,  type: 'triangle' },
  { size: 30, left: 25,  dur: 22, delay: 4,  type: 'circle'   },
  { size: 80, left: 60,  dur: 26, delay: 8,  type: 'square'   },
  { size: 20, left: 75,  dur: 15, delay: 2,  type: 'circle'   },
  { size: 50, left: 85,  dur: 20, delay: 12, type: 'triangle' },
  { size: 35, left: 45,  dur: 30, delay: 6,  type: 'square'   },
];

shapes.forEach(s => {
  const el = document.createElement('div');
  el.className = 'float-shape';
  el.style.cssText = `
    left: ${s.left}%;
    width: ${s.size}px;
    height: ${s.size}px;
    animation-duration: ${s.dur}s;
    animation-delay: ${s.delay}s;
    border: 1px solid rgba(0,245,255,0.4);
    border-radius: ${s.type === 'circle' ? '50%' : s.type === 'square' ? '4px' : '0'};
    clip-path: ${s.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'};
  `;
  document.body.appendChild(el);
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .glow-divider, .about-para, .about-stats, .contact-tagline, .contact-links, .skill-card, .project-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('vis');

    // Animate skill bar
    if (entry.target.classList.contains('skill-card')) {
      const level = entry.target.dataset.level;
      const bar   = entry.target.querySelector('.skill-bar');
      setTimeout(() => bar.style.width = level + '%', 200);
    }

    // Animate counters inside revealed elements
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.count));
    });
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

/* Separately observe each stat-box so counters fire reliably */
document.querySelectorAll('.stat-box').forEach(box => {
  const numEl = box.querySelector('[data-count]');
  if (!numEl) return;
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateCounter(numEl, parseInt(numEl.dataset.count));
      statObs.disconnect();
    });
  }, { threshold: 0.5 });
  statObs.observe(box);
});

function animateCounter(el, target) {
  let start = null;
  const duration = 1400;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

/* ─── STAGGER DELAYS ─── */
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--cyan)'
      : '';
  });
});

/* ─── PARALLAX HERO ─── */
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroSection) heroSection.style.backgroundPositionY = y * 0.3 + 'px';
  canvas.style.transform = `translateY(${y * 0.1}px)`;
});