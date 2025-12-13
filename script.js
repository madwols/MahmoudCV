// Smooth navigation scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe timeline items and skill cards
document.querySelectorAll('.exp-item, .skill-card, .cert-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.6s ease';
  observer.observe(el);
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'linear-gradient(to bottom, rgba(5, 8, 18, 0.99), rgba(5, 8, 18, 0.9))';
  } else {
    navbar.style.background = 'linear-gradient(to bottom, rgba(5, 8, 18, 0.98), rgba(5, 8, 18, 0.8))';
  }
});
