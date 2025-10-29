// === Portfolio Script ===

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const fadeElements = document.querySelectorAll('.fade-in');

  // Fade-in animation
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      const offset = navbar.offsetHeight;
      const top = target.offsetTop - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Active nav link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = navbar.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    // Navbar shadow
    navbar.style.boxShadow =
      window.scrollY > 50
        ? '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'
        : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
  });

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
