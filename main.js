/* ============================================================
   Main JS — Navbar, mobile menu, back-to-top, utils
   Donald Bahari Charo (Olise) Campaign Website
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky navbar scroll shadow ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ── Mobile hamburger menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Back to top ──
  const backTop = document.querySelector('.back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Newsletter demo ──
  const nlForm = document.querySelector('.newsletter-form-el');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = nlForm.querySelector('.newsletter-input');
      const btn = nlForm.querySelector('button');
      if (input.value) {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#28a745';
        input.value = '';
        setTimeout(() => { btn.textContent = ''; btn.setAttribute('data-i18n', 'newsletter_btn'); btn.style.background = ''; }, 3000);
      }
    });
  }

});
