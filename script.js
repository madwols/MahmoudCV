// Mobile-first smooth navigation scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open (if you add one later)
      document.body.classList.remove('menu-open');
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
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

// Observe cards and items
document.querySelectorAll('.exp-item, .skill-card, .cert-item, .lang-card, .info-block').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.6s ease';
  observer.observe(el);
});

// Prevent double-tap zoom on buttons and links
document.addEventListener('touchstart', function(e) {
  if (e.target.closest('a, button, .btn')) {
    e.preventDefault();
    e.target.closest('a, button, .btn').click();
  }
}, false);

// Add ripple effect for mobile touch
document.querySelectorAll('.btn, .badge, .exp-item, .skill-card, .cert-item, .lang-card').forEach(element => {
  element.addEventListener('touchend', function() {
    this.style.opacity = '0.8';
    setTimeout(() => {
      this.style.opacity = '1';
    }, 150);
  });
});

// Handle viewport changes
let lastWidth = window.innerWidth;
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    const currentWidth = window.innerWidth;
    if (lastWidth !== currentWidth) {
      lastWidth = currentWidth;
      // Recalculate layouts if needed
      window.dispatchEvent(new Event('resize'));
    }
  }, 100);
});

// Improve touch responsiveness
document.addEventListener('touchmove', function() {
  // Allow smooth scrolling
}, { passive: true });

// Add active state for mobile elements
const interactiveElements = document.querySelectorAll('a, button, .exp-item, .skill-card, .cert-item, .lang-card, .info-block, .badge');

interactiveElements.forEach(element => {
  element.addEventListener('touchstart', function() {
    this.classList.add('touch-active');
  });

  element.addEventListener('touchend', function() {
    this.classList.remove('touch-active');
  });
});

// Performance optimization - lazy load
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Smooth scroll behavior fallback for older browsers
function smoothScroll(target) {
  const targetPosition = target.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) / duration;
    window.scrollBy(0, distance * (progress < 1 ? 0.5 - 0.5 * Math.cos(progress * Math.PI) : 1));
    if (progress < 1) window.requestAnimationFrame(step);
  });
}
