/* 
   ==========================================================================
   CENTRAL ANALYTICS & CONVERSION MODULE - STATBRIDGE STUDIO
   ========================================================================== */

const TRACKING_CONFIG = {
  // Google Analytics & Google Ads Global IDs (Replace with your actual IDs)
  GOOGLE_TAG_ID: 'G-P8VKXTFZH8', 
  GA4_MEASUREMENT_ID: 'G-P8VKXTFZH8', 
  GOOGLE_ADS_CONVERSION_ID: 'AW-792175793', 
  
  // Google Ads Conversion Labels
  GOOGLE_ADS_LABEL_DATA_ANALYSIS_LEAD: 'iRdrCOLj0L8cELHJ3vkC', 

  // Future Hotmart Checkout URLs (Fill these once products are created)
  HOTMART_DATA_AUDIT_URL: '',
  HOTMART_SURVEY_THESIS_ANALYSIS_URL: '',
  HOTMART_FULL_RESEARCH_REPORT_URL: ''
};

/**
 * Validates whether the tracking ID is a real configured ID or a placeholder.
 * @param {string} id The tracking ID to check
 * @returns {boolean} True if it is a real ID, false if empty or a placeholder
 */
function isRealTrackingId(id) {
  return id && 
         id.trim() !== '' && 
         !id.includes('XXXX') && 
         !id.includes('XXXXXXXXXX') && 
         id !== 'G-XXXXXXXXXX' && 
         id !== 'AW-XXXXXXXXXX';
}

// Auto-initialize tracking upon script load
(function initTracking() {
  captureMarketingParameters();
  generateLeadId();
  
  const gaId = TRACKING_CONFIG.GA4_MEASUREMENT_ID;
  const adsId = TRACKING_CONFIG.GOOGLE_ADS_CONVERSION_ID;
  
  const hasRealGa = isRealTrackingId(gaId);
  const hasRealAds = isRealTrackingId(adsId);
  
  if (hasRealGa || hasRealAds) {
    const primaryId = hasRealGa ? gaId : adsId;
    console.log(`[Tracking] Real ID detected (${primaryId}). Dynamically loading gtag script.`);
    
    // Inject the gtag script tag dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
    document.head.appendChild(script);

    // Initialize the global dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
    
    gtag('js', new Date());
    
    if (hasRealGa) {
      gtag('config', gaId, { 'anonymize_ip': true });
    }
    if (hasRealAds) {
      gtag('config', adsId);
    }
  } else {
    console.log('[Tracking] No real GA4 Measurement ID or Google Ads Conversion ID detected. Skipping Google Tag load.');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDOMTracking);
  } else {
    setupDOMTracking();
  }
})();

/**
 * Capture UTM parameters and gclid from URL query string and store them in localStorage
 */
function captureMarketingParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const marketingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
  
  marketingKeys.forEach(key => {
    if (urlParams.has(key)) {
      const val = urlParams.get(key);
      localStorage.setItem(`tmp_${key}`, val);
    }
  });

  if (!localStorage.getItem('tmp_landing_page')) {
    localStorage.setItem('tmp_landing_page', window.location.pathname);
  }
  
  if (document.referrer && !document.referrer.includes(window.location.hostname)) {
    localStorage.setItem('tmp_referrer', document.referrer);
  }
}

/**
 * Generate a unique lead_id and persist it in localStorage
 */
function generateLeadId() {
  let leadId = localStorage.getItem('tmp_lead_id');
  if (!leadId) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    leadId = `lead_${timestamp}_${random}`;
    localStorage.setItem('tmp_lead_id', leadId);
  }
  return leadId;
}

/**
 * Initialize DOM tracking interceptors
 */
function setupDOMTracking() {
  autoFillHiddenFields();
}

/**
 * Auto-fill hidden marketing fields in forms
 */
function autoFillHiddenFields() {
  const fieldsMap = {
    'utm_source': 'tmp_utm_source',
    'utm_medium': 'tmp_utm_medium',
    'utm_campaign': 'tmp_utm_campaign',
    'utm_term': 'tmp_utm_term',
    'utm_content': 'tmp_utm_content',
    'gclid': 'tmp_gclid',
    'lead_id': 'tmp_lead_id',
    'selected_plan': 'tmp_selected_da_package',
    'landing_page': 'tmp_landing_page',
    'referrer': 'tmp_referrer'
  };

  document.querySelectorAll('form').forEach(form => {
    for (const [fieldName, storageName] of Object.entries(fieldsMap)) {
      let input = form.querySelector(`input[name="${fieldName}"]`);
      
      // Auto-create inputs if missing in the data request form
      if (!input && form.id === 'data-analysis-form') {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = fieldName;
        form.appendChild(input);
      }
      
      if (input) {
        let value = localStorage.getItem(storageName) || '';
        
        if (fieldName === 'timestamp') {
          value = new Date().toISOString();
        } else if (fieldName === 'landing_page' && !value) {
          value = window.location.pathname;
        } else if (fieldName === 'referrer' && !value) {
          value = document.referrer;
        }
        
        input.value = value;
      }
    }
  });
}

/**
 * Central event tracking function
 * @param {string} eventName Analytics event name
 * @param {Object} params Extra metadata parameters
 */
function trackEvent(eventName, params = {}) {
  const consent = localStorage.getItem('cookies-consent');
  const isAccepted = (consent === 'accepted');

  console.log(`[Tracking Event] ${eventName}:`, params, `(Consent status: ${consent})`);

  const gaId = TRACKING_CONFIG.GA4_MEASUREMENT_ID;
  if (!isAccepted || !isRealTrackingId(gaId) || typeof gtag !== 'function') {
    return;
  }

  const commonParams = {
    lead_id: localStorage.getItem('tmp_lead_id') || '',
    gclid: localStorage.getItem('tmp_gclid') || '',
    utm_source: localStorage.getItem('tmp_utm_source') || '',
    utm_medium: localStorage.getItem('tmp_utm_medium') || '',
    utm_campaign: localStorage.getItem('tmp_utm_campaign') || '',
    send_to: gaId
  };

  const eventData = { ...commonParams, ...params };

  switch (eventName) {
    case 'page_view':
      gtag('event', 'page_view', eventData);
      break;

    case 'lead_data_analysis_quote':
      // CRITICAL DEDUPLICATION: Verify if this lead_id was already processed
      const daLeadId = eventData.lead_id;
      const daAlreadySent = localStorage.getItem(`tmp_sent_da_lead_${daLeadId}`);
      
      if (!daAlreadySent) {
        gtag('event', 'lead_data_analysis_quote', eventData);
        localStorage.setItem(`tmp_sent_da_lead_${daLeadId}`, 'true');
        
        const adsId = TRACKING_CONFIG.GOOGLE_ADS_CONVERSION_ID;
        const adsLabel = TRACKING_CONFIG.GOOGLE_ADS_LABEL_DATA_ANALYSIS_LEAD;
        if (isRealTrackingId(adsId) && adsLabel && adsLabel.trim() !== '') {
          gtag('event', 'conversion', {
            'send_to': `${adsId}/${adsLabel}`,
            'value': 1.0,
            'currency': 'USD'
          });
        }
        console.log(`[Tracking] Conversion lead_data_analysis_quote fired for ${daLeadId}`);
      } else {
        console.warn(`[Tracking] Event lead_data_analysis_quote skipped (duplicate) for lead_id: ${daLeadId}`);
      }
      break;

    default:
      gtag('event', eventName, eventData);
  }
}

/**
 * Handle package selection clicks.
 * Redirects to Hotmart if a checkout URL is defined, otherwise smooth-scrolls to the contact form.
 * @param {string} packageId Package key ('audit', 'analysis', 'report')
 */
function handleDataAnalysisPlanSelection(packageId) {
  localStorage.setItem('tmp_selected_da_package', packageId);
  trackEvent('click_solicitar_da_package', { package: packageId });

  const configKeys = {
    'audit': 'HOTMART_DATA_AUDIT_URL',
    'analysis': 'HOTMART_SURVEY_THESIS_ANALYSIS_URL',
    'report': 'HOTMART_FULL_RESEARCH_REPORT_URL'
  };

  const configKey = configKeys[packageId];
  const checkoutUrl = TRACKING_CONFIG[configKey];

  if (checkoutUrl && checkoutUrl.trim() !== '') {
    trackEvent('checkout_start_data_analysis', { package: packageId, provider: 'hotmart' });
    window.location.href = checkoutUrl;
  } else {
    const formSection = document.getElementById('quote-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      const hiddenPlanInput = document.getElementById('selected_plan');
      if (hiddenPlanInput) {
        hiddenPlanInput.value = packageId;
      }
    } else {
      window.location.href = `index.html?package=${packageId}#quote-form-section`;
    }
  }
}
