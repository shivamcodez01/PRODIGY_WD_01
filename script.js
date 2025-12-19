// Enhanced Landing Page - Mobile nav, scroll effects, active link highlighting, smooth animations
(() => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const OFFSET = 80;

  // Mobile navigation toggle with animation
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
    
    // Prevent body scroll when menu is open
    if (!expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navList.classList.contains('show')) {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Throttle function for better performance
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Scroll event handler with header background and active link highlighting
  function onScroll() {
    // Add scrolled class to header
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active navigation link based on scroll position
    const fromTop = window.scrollY + OFFSET;
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (!section) return;
      
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      
      if (fromTop >= top && fromTop < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Use throttled scroll handler for better performance
  window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
  window.addEventListener('load', onScroll);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

  // Add intersection observer for fade-in animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.card, .section-header, .skills-list, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Add parallax effect to hero visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.scrollY;
      const parallax = scrolled * 0.3;
      heroVisual.style.transform = `translateY(${parallax}px)`;
    }, 16), { passive: true });
  }

  // Form submission handler (demo)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = contactForm.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      
      // Show loading state
      button.innerHTML = '✓ Message Sent!';
      button.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // Add cursor trail effect on hero section (optional enhancement)
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', throttle((e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      
      const cardVisual = document.querySelector('.card-visual');
      if (cardVisual) {
        cardVisual.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    }, 16));

    hero.addEventListener('mouseleave', () => {
      const cardVisual = document.querySelector('.card-visual');
      if (cardVisual) {
        cardVisual.style.transform = '';
      }
    });
  }

  // Console message for developers
  console.log('%c👋 Welcome to Shivam\'s Portfolio!', 'color: #4facfe; font-size: 20px; font-weight: bold;');
  console.log('%cBuilt with ❤️ for Prodigy InfoTech Internship', 'color: #8b92a8; font-size: 12px;');
})();
