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

  // ── Campaign contact targets ──
  const campaignWhatsAppNumber = '254725178255';
  const campaignEmail = 'laventacharo@gmail.com';
  const campaignSubject = 'Campaign Website Form Submission';

  function getFieldLabel(field) {
    if (field.labels && field.labels.length) {
      return field.labels[0].textContent.trim();
    }
    const placeholder = field.getAttribute('placeholder');
    if (placeholder) {
      return placeholder;
    }
    const ariaLabel = field.getAttribute('aria-label');
    if (ariaLabel) {
      return ariaLabel;
    }
    return field.name || field.id || field.type || 'Field';
  }

  function buildFormBody(form) {
    const lines = [];
    const pageTitle = document.title || window.location.pathname.split('/').pop() || 'Campaign Website';
    lines.push(`Page: ${pageTitle}`);

    form.querySelectorAll('input, textarea, select').forEach(field => {
      if (field.disabled) return;
      const type = field.type ? field.type.toLowerCase() : '';
      if (['submit', 'button', 'reset', 'image'].includes(type)) return;
      if (field.tagName.toLowerCase() === 'select') {
        if (!field.value) return;
        const label = getFieldLabel(field);
        const text = field.options[field.selectedIndex]?.text || field.value;
        lines.push(`${label}: ${text}`);
        return;
      }
      if (type === 'checkbox' || type === 'radio') {
        if (!field.checked) return;
        const label = getFieldLabel(field);
        lines.push(`${label}: ${field.value || 'Yes'}`);
        return;
      }
      if (!field.value || !field.value.trim()) return;
      const label = getFieldLabel(field);
      lines.push(`${label}: ${field.value.trim()}`);
    });

    return lines.join('\n');
  }

  function handleWhatsAppEmailSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const body = buildFormBody(form);
    if (!body) return;
    const waUrl = `https://wa.me/${campaignWhatsAppNumber}?text=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${campaignEmail}?subject=${encodeURIComponent(campaignSubject)}&body=${encodeURIComponent(body)}`;
    window.open(waUrl, '_blank');
    window.location.href = mailtoUrl;
    const button = form.querySelector('[type="submit"]');
    if (button) {
      button.textContent = 'Opening WhatsApp…';
    }
  }

  document.querySelectorAll('form[data-demo="true"]').forEach(form => {
    form.addEventListener('submit', handleWhatsAppEmailSubmit);
  });

});
