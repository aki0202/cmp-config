// ============================================================
// Klaro! CMP Loader + Google Consent Mode v2 Integration
// ============================================================

(async function() {
    // Wait until Klaro is defined
    while (typeof klaro === 'undefined') {
      await new Promise(r => setTimeout(r, 100));
    }
  
    // Fetch the centralized Klaro configuration
    const res = await fetch('https://aki0202.github.io/cmp-config/cmp/klaro-config.json');
    const config = await res.json();
  
    window.klaroConfig = config;
  
    // Initialise Klaro only after the library is ready
    klaro.setup(config);
  
    // Listen for Klaro consent changes
    document.addEventListener('klaroConsentChanged', e => {
      console.log('🔔 Klaro consent changed event:', e.detail);
  
      if (e.detail['google-analytics']) {
        console.log('GA consent changed → true');
        loadGA();
      } else {
        console.log('GA consent changed → false');
      }
  
      if (e.detail['matomo']) {
        console.log('Matomo consent changed → true');
        loadMatomo();
      }
    });
  
    // Initialise default denied Consent Mode values
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });
  })();
  
  // ============================================================
  // Analytics Scripts (load only after consent)
  // ============================================================
  
  function loadGA() {
    const GA_ID = 'G-PLACEHOLDER1234';
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  
    const s = document.createElement('script');
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
  
    console.log(`✅ Google Analytics loaded after consent (${GA_ID})`);
  }
  
  function loadMatomo() {
    const _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    const u = "//matomo.example.com/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '1']);
    const d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = u + 'matomo.js'; s.parentNode.insertBefore(g, s);
  
    console.log("✅ Matomo loaded after consent");
  }
  