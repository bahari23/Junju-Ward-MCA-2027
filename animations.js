/* ============================================================
   Animations — Scroll reveals, counters, sliders
   Donald Bahari Charo (Olise) Campaign Website
   ============================================================ */

// ── Intersection Observer: fade-in on scroll ──
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
}

// ── Counter animation ──
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString() + (el.dataset.suffix || ''); clearInterval(timer); }
    else { el.textContent = Math.floor(start).toLocaleString() + (el.dataset.suffix || ''); }
  }, 16);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

// ── Progress bars ──
function initProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '75';
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.progress-bar-fill, .agenda-progress-fill').forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// ── Testimonials slider ──
function initSlider() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dot');
  let current = 0;
  let autoTimer;

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); startAuto(); }));

  const prev = document.querySelector('.slider-prev');
  const next = document.querySelector('.slider-next');
  if (prev) prev.addEventListener('click', () => { clearInterval(autoTimer); goTo(current - 1); startAuto(); });
  if (next) next.addEventListener('click', () => { clearInterval(autoTimer); goTo(current + 1); startAuto(); });

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5000); }
  startAuto();
}

// ── Countdown timer ──
function initCountdown() {
  const elDays = document.getElementById('cd-days');
  const elHrs = document.getElementById('cd-hours');
  const elMin = document.getElementById('cd-mins');
  const elSec = document.getElementById('cd-secs');
  if (!elDays) return;

  // Election day — adjust as needed
  const electionDay = new Date('2027-08-10T06:00:00');

  function update() {
    const now = new Date();
    const diff = electionDay - now;
    if (diff <= 0) { elDays.textContent = '0'; elHrs.textContent = '00'; elMin.textContent = '00'; elSec.textContent = '00'; return; }
    elDays.textContent = Math.floor(diff / 86400000);
    elHrs.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    elMin.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    elSec.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// ── FAQ accordion ──
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Gallery filter & lightbox ──
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if (!lightbox) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      if (src) { lbImg.src = src; }
      lightbox.classList.add('open');
    });
  });

  document.getElementById('lb-close')?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
}

// ── Search (news page) ──
function initSearch() {
  const input = document.getElementById('news-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('.news-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ── Form submissions (demo) ──
function initForms() {
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Submitted!';
      btn.disabled = true;
      btn.style.background = '#28a745';
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; form.reset(); }, 3000);
    });
  });
}

// ── Init all ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCounters();
  initProgressBars();
  initSlider();
  initCountdown();
  initFaq();
  initGallery();
  initSearch();
  initForms();
});
