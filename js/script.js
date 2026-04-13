// ===== STICKY NAVBAR =====
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== THEME TOGGLE (Light/Dark) =====
const getCurrentTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update icon
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
};

// Initialize theme
setTheme(getCurrentTheme());

themeToggle.addEventListener('click', () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// ===== SMOOTH SCROLLING (enhanced) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
    } else {
      document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', highlightNavLink);

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;
  
  revealElements.forEach(element => {
    const revealTop = element.getBoundingClientRect().top;
    
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would typically send to a server
    // For demo, show success message
    alert('Thank you for your message! We will get back to you shortly.');
    contactForm.reset();
  });
}

// ===== IMAGE GALLERY HOVER EFFECTS (already in CSS) =====
// Additional hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (hero.querySelector('.hero-overlay')) {
      hero.querySelector('.hero-overlay').style.transform = `translateY(${rate}px)`;
    }
  });
}

// ===== ANIMATED COUNTER FOR STATS =====
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = stat.textContent;
    const isNumber = /^\d+/.test(target);
    
    if (isNumber) {
      const value = parseInt(target);
      let current = 0;
      const increment = value / 50;
      const updateCounter = () => {
        if (current < value) {
          current += increment;
          stat.textContent = Math.ceil(current) + (target.includes('+') ? '+' : '');
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };
      
      // Start animation when element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(stat);
    }
  });
};

// Call stats animation
setTimeout(animateStats, 500);

// ===== LAZY LOADING FOR IMAGES =====
const images = document.querySelectorAll('img[loading="lazy"]');
if ('loading' in HTMLImageElement.prototype) {
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ===== SMOOTH APPEARANCE ON LOAD =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.5s ease';
});

// ===== ADDITIONAL UI ENHANCEMENTS =====
// Add blueprint-style corners to section headers
document.querySelectorAll('.section-header').forEach(header => {
  const title = header.querySelector('.section-title');
  if (title) {
    title.setAttribute('data-text', title.textContent);
  }
});

// Initialize any tooltips or additional features
console.log('JOWEL NIG. VENTURES - Website loaded successfully');