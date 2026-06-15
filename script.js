/* 
   ==========================================================================
   MAIN JS SCRIPT - INTERACTIVITY & CONSENT - DATA ANALYSIS STUDIO
   ========================================================================== */

const siteConfig = {
  brandName: "StatBridge Studio",
  email: "hello@statbridgestudio.com",
  analyticsId: 'G-XXXXXXXXXX' // Analytics ID placeholder
};

// Auto-run Google Analytics consent mode check
(function() {
  const consent = localStorage.getItem('cookies-consent');
  if (consent !== 'accepted') {
    window[`ga-disable-${siteConfig.analyticsId}`] = true;
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  initCookieConsent();
  initMobileMenu();
  initFaqAccordion();
  initScrollReveal();
});

/* 1. Scroll Reveal Animations */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach((el) => observer.observe(el));
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      const isOpen = mobileMenu.classList.contains("open");
      hamburger.innerHTML = isOpen 
        ? `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`
        : `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>`;
    });
  }
}

/* 3. FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-btn");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains("open");

      // Close all accordion panels
      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.classList.remove("open");
        const answer = faq.querySelector(".faq-answer");
        if (answer) answer.style.maxHeight = null;
      });

      // Toggle current panel
      if (!isOpen) {
        item.classList.add("open");
        const answer = item.querySelector(".faq-answer");
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      }
    });
  });
}

/* 4. Cookie Consent (GDPR Compliance) */
function initCookieConsent() {
  const consent = localStorage.getItem('cookies-consent');
  
  if (consent === 'accepted') {
    enableAnalytics();
  } else if (consent === 'rejected') {
    disableAnalytics();
  } else {
    disableAnalytics();
    showCookieBanner();
  }
}

function enableAnalytics() {
  window[`ga-disable-${siteConfig.analyticsId}`] = false;
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });
    gtag('config', siteConfig.analyticsId);
  }
}

function disableAnalytics() {
  window[`ga-disable-${siteConfig.analyticsId}`] = true;
  if (typeof gtag === 'function') {
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });
  }
}

function showCookieBanner() {
  const style = document.createElement('style');
  style.innerHTML = `
    .cookie-banner {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      width: 90%;
      max-width: 600px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.9);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      padding: 1.5rem;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
      opacity: 0;
    }
    .cookie-banner.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    .cookie-banner-text h3 {
      font-size: 1.05rem;
      font-family: var(--font-title), sans-serif;
      font-weight: 700;
      color: var(--clr-primary, #002B66);
      margin: 0 0 0.5rem 0;
    }
    .cookie-banner-text p {
      font-size: 0.82rem;
      color: var(--clr-text-muted, #4a5568);
      line-height: 1.5;
      margin: 0;
    }
    .cookie-banner-btns {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
    }
    .cookie-banner-btns button {
      padding: 0.55rem 1.25rem;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .cookie-accept {
      background-color: var(--clr-primary, #0b1120);
      color: white;
      border: none;
    }
    .cookie-accept:hover {
      background-color: var(--clr-primary-light, #1a2744);
    }
    .cookie-reject {
      background-color: transparent;
      color: var(--clr-text-light, #718096);
      border: 1px solid var(--clr-border, #E2E8F0);
    }
    .cookie-reject:hover {
      background-color: var(--clr-bg, #f7fafc);
      color: var(--clr-primary, #0b1120);
    }
    .cookie-info {
      background-color: transparent;
      color: var(--clr-accent, #0d9488);
      border: none;
      text-decoration: underline;
      padding: 0;
      margin-right: auto;
    }
    @media (max-width: 480px) {
      .cookie-banner-btns {
        flex-direction: column;
        align-items: stretch;
      }
      .cookie-info {
        text-align: center;
        margin-bottom: 0.5rem;
      }
    }
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  
  const cookiesPath = 'cookie-policy.html';

  banner.innerHTML = `
    <div class="cookie-banner-text">
      <h3>Your Privacy Matters</h3>
      <p>I use analytical cookies via Google Analytics to measure site visits and performance anonymously. You can accept or decline the use of these cookies.</p>
    </div>
    <div class="cookie-banner-btns">
      <button class="cookie-info" id="btn-cookie-info">Cookie Policy</button>
      <button class="cookie-reject" id="btn-cookie-reject">Decline Analytics</button>
      <button class="cookie-accept" id="btn-cookie-accept">Accept Cookie Policy</button>
    </div>
  `;
  document.body.appendChild(banner);

  setTimeout(() => {
    banner.classList.add('show');
  }, 100);

  document.getElementById('btn-cookie-info').addEventListener('click', () => {
    window.open(cookiesPath, '_blank');
  });

  document.getElementById('btn-cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookies-consent', 'accepted');
    banner.classList.remove('show');
    enableAnalytics();
    setTimeout(() => banner.remove(), 400);
  });

  document.getElementById('btn-cookie-reject').addEventListener('click', () => {
    localStorage.setItem('cookies-consent', 'rejected');
    banner.classList.remove('show');
    disableAnalytics();
    setTimeout(() => banner.remove(), 400);
  });
}

// Track generic click events
document.addEventListener('click', function(event) {
  const target = event.target.closest('[data-analytics-event]');
  if (!target || typeof gtag !== 'function') return;

  const consent = localStorage.getItem('cookies-consent');
  if (consent === 'accepted') {
    gtag('event', target.dataset.analyticsEvent, {
      event_category: 'engagement',
      event_label: target.dataset.analyticsLabel || target.textContent.trim(),
      link_url: target.href || ''
    });
  }
});
