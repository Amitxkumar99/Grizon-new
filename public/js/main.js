/**
 * Grizon AI - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initPricingToggle();
  initFaqAccordion();
  initSmoothScroll();
});

/* -----------------------------------------
   1. Navbar Scroll Effect & Active Highlight
----------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('nav-scrolled');
      navbar.classList.remove('nav-transparent');
    } else {
      navbar.classList.add('nav-transparent');
      navbar.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Highlight active nav item on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill a[href^="#"]');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('text-white', 'bg-white/10');
              link.classList.remove('text-white/60');
            } else {
              link.classList.remove('text-white', 'bg-white/10');
              link.classList.add('text-white/60');
            }
          });
        }
      });
    }, { passive: true });
  }
}

/* -----------------------------------------
   2. Mobile Drawer Navigation
----------------------------------------- */
function initMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const openBtn = document.getElementById('menuOpenBtn');
  const closeBtn = document.getElementById('menuCloseBtn');

  if (!mobileMenu || !openBtn) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when clicking any link in mobile menu
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/* -----------------------------------------
   3. Interactive Pricing Switch (Monthly / Yearly)
----------------------------------------- */
function initPricingToggle() {
  const toggleBtn = document.getElementById('billingToggle');
  if (!toggleBtn) return;

  const toggleContainer = toggleBtn.parentElement;
  const monthlyLabel = toggleContainer.querySelector('span:first-child');
  const yearlyLabel = toggleContainer.querySelector('span:last-child');

  const pricingCards = document.querySelectorAll('.pricing-card-dark');
  if (!pricingCards.length) return;

  // Plan pricing data (INR)
  const plans = {
    'Free': { monthly: '0', yearly: '0' },
    'Basic': { monthly: '999', yearly: '833' },
    'Pro': { monthly: '1,999', yearly: '1,666' },
    'Elite': { monthly: '2,999', yearly: '2,499' }
  };

  let isYearly = false;

  toggleBtn.addEventListener('click', () => {
    isYearly = !isYearly;
    toggleBtn.setAttribute('aria-pressed', isYearly ? 'true' : 'false');
    
    if (isYearly) {
      toggleBtn.classList.add('active');
      monthlyLabel.classList.remove('text-white');
      monthlyLabel.classList.add('text-white/40');
      yearlyLabel.classList.remove('text-white/40');
      yearlyLabel.classList.add('text-white');
    } else {
      toggleBtn.classList.remove('active');
      monthlyLabel.classList.add('text-white');
      monthlyLabel.classList.remove('text-white/40');
      yearlyLabel.classList.add('text-white/40');
      yearlyLabel.classList.remove('text-white');
    }

    pricingCards.forEach(card => {
      const nameEl = card.querySelector('h3');
      const priceEl = card.querySelector('.text-4xl');
      if (!nameEl || !priceEl) return;

      const planName = nameEl.textContent.trim();
      const planData = plans[planName];
      if (planData) {
        // Animate price change
        priceEl.style.opacity = '0';
        priceEl.style.transform = 'translateY(-4px)';
        priceEl.style.transition = 'opacity 0.15s ease, transform 0.15s ease';

        setTimeout(() => {
          priceEl.textContent = isYearly ? planData.yearly : planData.monthly;
          priceEl.style.opacity = '1';
          priceEl.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });
}

/* -----------------------------------------
   4. Accordion for Frequently Asked Questions
----------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item, index) => {
    // Open first FAQ item by default for a polished feel
    if (index === 0) {
      item.classList.add('open');
    }

    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items for clean accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

/* -----------------------------------------
   5. Smooth Scroll with Header Offset
----------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
