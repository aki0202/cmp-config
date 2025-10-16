// ============================================================
// Klaro! CMP Loader + Google Consent Mode v2 Integration
// ============================================================

// Self-invoking async function to bootstrap Klaro
(async function() {
    // 1️⃣ Fetch the centralized Klaro configuration
    const res = await fetch('https://aki0202.github.io/cmp-config/cmp/klaro-config.json');
    const config = await res.json();
  
    // 2️⃣ Set global Klaro configuration
    window.klaroConfig = config;
  
    // 3️⃣ Initialize Klaro
    klaro.setup(config);
  
    // 4️⃣ Initialize Google Consent Mode defaults (denied by default)
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
  
  // --- Google Analytics (GA4) ---
  function loadGA() {
    // ⚠️ TEMPORARY PLACEHOLDER ID
    // Replace this once you have your real Measurement ID (e.g. G-XXXXXXX)
    const GA_ID = 'G-PLACEHOLDER1234';
  
    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  
    // Load GA script
    const s = document.createElement('script');
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
  
    console.log(`✅ Google Analytics loaded after consent (${GA_ID})`);
  }
  
  
  // --- Matomo Analytics (optional) ---
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
  