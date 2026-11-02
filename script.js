/* ======================================================
   KisanSangam — Landing Page Scripts
   Smart Farming. Better Tomorrow.
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Language Dropdown Logic ---- */
  const langDropdown = document.getElementById('langDropdown');
  const langTrigger = document.getElementById('langTrigger');
  const langMenu = document.getElementById('langMenu');
  const langLabel = document.getElementById('langLabel');
  const langOptions = document.querySelectorAll('.lang-dropdown__option');
  let currentLang = localStorage.getItem('kisansangam_lang') || 'en';

  const langDisplayNames = {
    en: 'EN',
    hi: 'हिन्दी',
    gu: 'ગુજરાતી'
  };

  function applyTranslations(lang) {
    if (!translations || !translations[lang]) return;
    
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('kisansangam_lang', lang);
    
    // Update trigger label
    langLabel.textContent = langDisplayNames[lang] || lang.toUpperCase();

    // Update active state in dropdown options
    langOptions.forEach(opt => {
      if (opt.dataset.lang === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    applyTranslations(lang);
  }

  // Toggle dropdown
  langTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.toggle('open');
    langTrigger.setAttribute('aria-expanded', isOpen);
  });

  // Select language from dropdown
  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      if (lang !== currentLang) {
        setLanguage(lang);
      }
      langDropdown.classList.remove('open');
      langTrigger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target)) {
      langDropdown.classList.remove('open');
      langTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langDropdown.classList.contains('open')) {
      langDropdown.classList.remove('open');
      langTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Initialize Language
  setLanguage(currentLang);

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 40;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ---- Mobile Menu Toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close mobile menu when clicking outside (on overlay)
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }


  /* ---- Scroll Animations (IntersectionObserver) ---- */
  const animElements = document.querySelectorAll('.anim-fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Respect animation-delay set via inline style
            const delay = entry.target.style.animationDelay || '0s';
            const delayMs = parseFloat(delay) * 1000;

            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delayMs);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      }
    );

    animElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animElements.forEach(el => el.classList.add('visible'));
  }


  
  // Safety timeout: ensure all anim-fade-up elements become visible
  setTimeout(() => {
    document.querySelectorAll('.anim-fade-up').forEach(el => el.classList.add('visible'));
  }, 1800);

  /* ---- Centralized APK Configuration ---- */
  const APK_CONFIG = {
    url: 'https://github.com/meet25bar/kisansangam-landing-page-Initial-/releases/download/v0.9.0/KisanSangam.apk',
    filename: 'KisanSangam.apk',
    version: '0.9.0',
    versionName: 'v0.9.0',
    versionCode: 9,
    fileSize: '145 MB',
    fileSizeBytes: 152036070,
    minSdkVersion: 26,
    minAndroid: 'Android 8.0+ (Oreo)',
    sha256: '11616A58F16AD2F1DCC616888D2BFFE1EA7EB50D1DBF3666321B52A3B77BBE67'
  };

  // Wire download buttons to APK_CONFIG
  document.querySelectorAll('#downloadApkBtn, a[href$=".apk"]').forEach(btn => {
    btn.setAttribute('href', APK_CONFIG.url);
    btn.setAttribute('download', APK_CONFIG.filename);
  });

  /* ---- Hash Router ---- */
  const routes = {
    '': ['home', 'problems', 'practical-support'],
    '#/': ['home', 'problems', 'practical-support'],
    '#/home': ['home', 'problems', 'practical-support'],
    '#/about': ['about'],
    '#/features': ['features', 'highlights'],
    '#/how-it-works': ['how-it-works'],
    '#/why-kisansangam': ['why-kisansangam'],
    '#/download': ['download', 'app-preview', 'cta'],
    '#/launching-soon': ['download', 'app-preview', 'cta']
  };

  const allSections = [
    'home', 'problems', 'practical-support', 'about', 'features', 'highlights',
    'how-it-works', 'why-kisansangam', 'download', 'launching-soon', 'app-preview', 'cta'
  ];

  function handleRoute() {
    let hash = window.location.hash || '#/home';
    
    // Normalize and alias legacy launching-soon route
    let activeNavHash = hash;
    if (hash === '#/launching-soon') {
      activeNavHash = '#/download';
    }

    if (!routes[hash]) {
      hash = '#/home';
      activeNavHash = '#/home';
    }

    const activeSections = routes[hash];

    // Hide all sections first
    allSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = 'none';
      }
    });

    // Show active sections
    activeSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = 'block';
      }
    });

    // Update active nav link
    if (typeof navLinks !== 'undefined' && navLinks) {
      navLinks.querySelectorAll('a:not(.btn)').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeNavHash) {
          link.classList.add('active');
        }
      });
    }

    // Scroll cleanly to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Re-apply translations for the newly shown sections
    applyTranslations(currentLang);

    // Update carousel if active
    if (activeSections.includes('app-preview') && typeof updateCarousel === 'function') {
      setTimeout(() => updateCarousel(currentSlide), 50);
    }

    // Ensure elements in the active view are immediately visible (prevent blank areas)
    setTimeout(() => {
      activeSections.forEach(id => {
        const sec = document.getElementById(id);
        if (sec) {
          sec.querySelectorAll('.anim-fade-up').forEach(el => {
            el.classList.add('visible');
          });
        }
      });
    }, 60);
  }

  window.addEventListener('hashchange', handleRoute);
  // Initialize route on load
  handleRoute();


  /* ---- App Preview Carousel ---- */
  const previewTrack = document.getElementById('previewTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const previewDots = document.getElementById('previewDots');
  const slides = previewTrack.querySelectorAll('.preview-slide');
  const dots = previewDots.querySelectorAll('.preview-dot');
  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateCarousel(index) {
    currentSlide = index;

    // Update active slide
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    // Calculate transform to center the active slide
    const slideWidth = slides[0].offsetWidth + 32; // width + gap
    const trackWidth = previewTrack.parentElement.offsetWidth;
    const offset = (trackWidth / 2) - (slideWidth / 2) - (currentSlide * slideWidth);

    previewTrack.style.transform = `translateX(${offset}px)`;
    previewTrack.style.justifyContent = 'flex-start';
  }

  prevBtn.addEventListener('click', () => {
    const newIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    updateCarousel(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateCarousel(newIndex);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateCarousel(i));
  });

  // Initialize carousel
  updateCarousel(0);

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => updateCarousel(currentSlide), 200);
  });


  /* ---- Touch Swipe for Carousel ---- */
  let touchStartX = 0;
  let touchEndX = 0;

  previewTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  previewTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < totalSlides - 1) {
        updateCarousel(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        updateCarousel(currentSlide - 1);
      }
    }
  }, { passive: true });


  
  // Keyboard navigation for carousel (ArrowLeft / ArrowRight)
  document.addEventListener('keydown', (e) => {
    const previewSection = document.getElementById('app-preview');
    if (previewSection && previewSection.style.display !== 'none') {
      if (e.key === 'ArrowLeft') {
        const newIndex = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        updateCarousel(newIndex);
      } else if (e.key === 'ArrowRight') {
        const newIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel(newIndex);
      }
    }
  });

  /* ---- Auto-rotate Carousel ---- */
  let autoRotateInterval = setInterval(() => {
    const next = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    updateCarousel(next);
  }, 4000);

  // Pause auto-rotate on interaction
  [prevBtn, nextBtn, previewTrack].forEach(el => {
    el.addEventListener('pointerenter', () => clearInterval(autoRotateInterval));
    el.addEventListener('pointerleave', () => {
      autoRotateInterval = setInterval(() => {
        const next = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel(next);
      }, 4000);
    });
  });


  /* ---- Full Contact Form ---- */
  const earlyAccessForm = document.getElementById('earlyAccessForm');
  const earlyAccessBtn = document.getElementById('earlyAccessBtn');

  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fName = document.getElementById('firstName').value.trim();
      const lName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      
      let isValid = true;

      if (!fName || !lName) isValid = false;

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPhone = /^[6-9]\d{9}$/.test(phone.replace(/[\s\-\+]/g, '').replace(/^(\+91|91)/, ''));

      if (!isEmail || !isPhone) isValid = false;

      if (!isValid) {
        // Simple error state
        earlyAccessBtn.textContent = 'Please check fields';
        earlyAccessBtn.style.background = '#D9534F';
        earlyAccessBtn.style.borderColor = '#D9534F';
        
        setTimeout(() => {
          earlyAccessBtn.textContent = 'Get Early Access';
          earlyAccessBtn.style.background = '';
          earlyAccessBtn.style.borderColor = '';
        }, 3000);
        return;
      }

      // Loading state
      const originalText = earlyAccessBtn.textContent;
      earlyAccessBtn.textContent = 'Submitting...';
      const inputs = earlyAccessForm.querySelectorAll('input, textarea');
      inputs.forEach(input => input.disabled = true);
      earlyAccessBtn.disabled = true;

      // Submit via Web3Forms AJAX
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "7b1e9243-ed3f-4607-ba88-b0227a1d2b65",
          name: fName + ' ' + lName,
          email: email,
          phone: phone,
          message: document.getElementById('message').value.trim(),
          subject: "New KisanSangam Early Access Registration!"
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          earlyAccessBtn.textContent = '✓ Application Submitted!';
          earlyAccessBtn.style.background = 'var(--green-500)';
          earlyAccessBtn.style.borderColor = 'var(--green-500)';
          
          setTimeout(() => {
            earlyAccessBtn.textContent = originalText;
            earlyAccessBtn.style.background = '';
            earlyAccessBtn.style.borderColor = '';
            earlyAccessForm.reset();
            inputs.forEach(input => input.disabled = false);
            earlyAccessBtn.disabled = false;
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.warn("AJAX blocked by browser. Falling back to standard submission...", error);
        earlyAccessForm.submit();
      });
    });
  }


  /* ---- Active Nav Link Highlight Removed (Handled by Router) ---- */

  /* ---- Feature Modal Interactivity ---- */
  const featureData = {
  "f1": {
    "en": {
      "title": "Advanced Personalized Crop Recommendation",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Compare and select suitable crop options for your specific land, climate, season, and market context — reducing guesswork before purchasing seeds.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Farm location (district/taluka), plot size, soil type or known soil health parameters, season (Kharif/Rabi/Zaid), and available irrigation sources.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>A ranked list of crop recommendations with agronomic reasoning explaining why each option fits your soil, season, and market opportunities.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A farmer in Narmada choosing between Cotton, Wheat, and Groundnut receives recommendations ranking Groundnut first due to soil compatibility and favorable seasonal water fit.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> Initial agronomic models focus on Gujarat regional farming conditions.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "उन्नत व्यक्तिगत फसल अनुशंसा",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>बीज खरीदने से पहले अपनी भूमि, जलवायु, मौसम और बाजार की स्थिति के अनुसार सबसे उपयुक्त फसल विकल्पों की तुलना और चयन करें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>खेत का स्थान (जिला/तहसील), जमीन का आकार, मिट्टी का प्रकार या ज्ञात पैरामीटर, बुवाई का मौसम और सिंचाई के साधन।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>उपयुक्त फसलों की क्रमबद्ध सूची और हर विकल्प के पीछे का कृषि-वैज्ञानिक कारण, ताकि आप समझ सकें कि वह फसल आपके खेत के लिए क्यों उपयुक्त है।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">नर्मदा का एक किसान कपास, गेहूं और मूंगफली के बीच चुनाव करते समय मूंगफली को पहली प्राथमिकता पाता है क्योंकि उसकी मिट्टी और पानी की उपलब्धता इसके सबसे अनुकूल है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> प्रारंभिक कृषि मॉडल मुख्य रूप से गुजरात की क्षेत्रीय परिस्थितियों पर केंद्रित हैं।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "અદ્યતન વ્યક્તિગત પાક ભલામણ",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>બિયારણ ખરીદતા પહેલા તમારી જમીન, આબોહવા, ઋતુ અને બજાર પરિસ્થિતિઓ અનુસાર સૌથી યોગ્ય પાક વિકલ્પો પસંદ કરવામાં મદદ કરે છે.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>ખેતરનું સ્થાન (જિલ્લો/તાલુકો), જમીનનું કદ, માટીનો પ્રકાર કે જાણીતા મૂલ્યો, વાવણીની ઋતુ અને સિંચાઈના સ્ત્રોતો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>તમારા ખેતર માટે યોગ્ય પાકોની ક્રમબદ્ધ યાદી અને સ્પષ્ટ કારણો કે શા માટે તે પાક તમારી પરિસ્થિતિઓ સાથે મેળ ખાય છે.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">નર્મદાનો એક ખેડૂત કપાસ, ઘઉં અને મગફળી વચ્ચે વિચારતી વખતે મગફળી માટે સર્વોચ્ચ ભલામણ મેળવે છે કારણ કે જમીન અને પાણીની સ્થિતિ તેના સૌથી અનુકૂળ છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> પ્રારંભિક કૃષિ મૉડલ મુખ્યત્વે ગુજરાત પ્રદેશની સ્થાનિક પરિસ્થિતિઓ પર કેન્દ્રિત છે.\n        </div>\n      </div>"
    }
  },
  "f2": {
    "en": {
      "title": "Advanced Personalized Farm Guide",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Follow stage-by-stage cultivation guidance tailored to your chosen crop, organizing farming tasks from field preparation all the way to harvest.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Selected crop, target sowing date, acreage, and farm soil/irrigation type.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>A step-by-step activity timetable including land preparation, seed treatment, fertilizer/nutrient application windows, irrigation milestones, and harvesting tips.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A Wheat grower receives a 120-day plan highlighting the exact days for crown root initiation irrigation, first nitrogen top-dressing, and weed control windows.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> Timelines follow standard agronomic recommendations; adjust as needed for unexpected weather shifts.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "उन्नत व्यक्तिगत कृषि मार्गदर्शिका",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>अपनी चुनी हुई फसल के लिए बुवाई से लेकर कटाई तक हर चरण में समय पर कृषि कार्यों का प्रबंधन करने के लिए चरण-दर-चरण मार्गदर्शन का पालन करें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>चुनी गई फसल, बुवाई की तारीख, खेत का क्षेत्रफल और मिट्टी/सिंचाई का प्रकार।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>भूमि की तैयारी, बीज उपचार, खाद का समय, सिंचाई कार्यक्रम और कटाई प्रबंधन की पूरी समय-सारिणी।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">गेहूं की खेती करने वाले किसान को 120 दिनों का पूरा कार्यक्रम मिलता है, जिसमें पहली सिंचाई, खाद डालने और खरपतवार नियंत्रण के सही दिन बताए जाते हैं।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> कार्यक्रम मानक कृषि सलाह पर आधारित है; स्थानीय मौसम के अनुसार थोड़ा बदलाव करें।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "અદ્યતન વ્યક્તિગત ખેતી માર્ગદર્શિકા",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>પસંદ કરેલા પાક માટે જમીન તૈયારીથી લઈને લણણી સુધીના દરેક તબક્કાવાર ખેતી કાર્યોનું વ્યવસ્થિત માર્ગદર્શન મેળવો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>પસંદ કરેલો પાક, વાવણી તારીખ, જમીનનું ક્ષેત્રફળ અને સિંચાઈનો પ્રકાર.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>જમીન ખેડવાથી લઈને બીજ માવજત, ખાતર શેડ્યૂલ, પિયત સમય અને લણણી સુધીનું તબક્કાવાર ટાઈમટેબલ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">ઘઉંના ખેડૂતને વાવણી પછી પ્રથમ પિયત, પૂર્તિ ખાતર અને નિંદામણ નિયંત્રણ માટે દિવસ-વાર માર્ગદર્શન મળે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> માર્ગદર્શન માનક કૃષિ પ્રથાઓ પર આધારિત છે; સ્થાનિક હવામાન મુજબ જરૂરી ફેરફાર કરી શકાય છે.\n        </div>\n      </div>"
    }
  },
  "f3": {
    "en": {
      "title": "Soil Intelligence",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Understand your soil health summary, nutrient levels, and crop suitability without getting confused by technical lab numbers.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Existing soil test details (pH, texture, NPK, organic carbon) or known estimates from your soil health card.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>A plain-language soil health summary, nutrient availability assessment, and guidance on organic amendments to improve soil condition.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">Entering a pH of 7.8 indicates slightly alkaline soil, suggesting crops that tolerate medium alkalinity and recommending farmyard manure to balance soil structure.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Important Availability Note:</strong> Integrated Soil Testing is <strong>Coming Soon</strong>. Currently, you can enter your existing known soil details to receive tailored guidance.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "मिट्टी के स्वास्थ्य की जानकारी",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>तकनीकी रिपोर्ट में उलझे बिना अपनी मिट्टी के स्वास्थ्य, पोषक तत्वों के स्तर और उपयुक्त फसलों को सरल भाषा में समझें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>मृदा स्वास्थ्य कार्ड से पीएच, मिट्टी का प्रकार, एनपीके या जैविक कार्बन के आंकड़े।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>मिट्टी के स्वास्थ्य का आसान सारांश, पोषक तत्वों की स्थिति और मिट्टी सुधार के व्यावहारिक उपाय।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">7.8 पीएच दर्ज करने पर प्रणाली बताती है कि मिट्टी हल्की क्षारीय है और इसके लिए गोबर की खाद तथा अनुकूल फसलों की सिफारिश करती है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>महत्वपूर्ण उपलब्धता नोट:</strong> एकीकृत मृदा परीक्षण <strong>जल्द आ रहा है</strong>। वर्तमान में आप अपने ज्ञात मिट्टी डेटा को दर्ज करके मार्गदर्शन प्राप्त कर सकते हैं।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "જમીનની તંદુરસ્તીની માહિતી",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>ટેકનિકલ રિપોર્ટની ગૂંચવણ વગર તમારી જમીનનું સ્વાસ્થ્ય, પોષક તત્ત્વોનું પ્રમાણ અને પાકની અનુકૂળતા સરળ ભાષામાં સમજો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>સોઇલ હેલ્થ કાર્ડમાંથી pH, જમીનનો પ્રકાર, NPK કે ઓર્ગેનિક કાર્બનની વિગતો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>જમીન સ્વાસ્થ્યનો સરળ સારાંશ, પોષક તત્ત્વોની સ્થિતિ અને જમીન સુધારણા માટે દેશી ખાતરની સલાહ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">7.8 pH દાખલ કરવાથી જમીન હળવી ક્ષારીય હોવાનું જણાય છે અને છાણિયું ખાતર વાપરી જમીન સુધારવાની ભલામણ મળે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>મહત્વપૂર્ણ નોંધ:</strong> એકીકૃત સોઇલ ટેસ્ટિંગ <strong>ટૂંક સમયમાં આવી રહ્યું છે</strong>. હાલમાં તમે તમારી જાણીતી જમીન વિગતો દાખલ કરીને માર્ગદર્શન મેળવી શકો છો.\n        </div>\n      </div>"
    }
  },
  "f4": {
    "en": {
      "title": "Market Price Analysis",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Review the latest reported mandi rates across markets, compare price trends, and choose favorable times and locations to sell produce.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Commodity name and preferred APMC markets or nearby districts.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Latest available reported mandi prices (min, max, modal), multi-market comparisons, and recent trend direction.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A farmer compares Cotton modal rates between Rajkot and Bharuch APMCs to evaluate whether transportation costs justify selling at a higher-rate market.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> Data reflects the latest available reported mandi rates from official sources. Spot auction prices on the day may vary locally.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "मंडी भाव विश्लेषण",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>विभिन्न मंडियों के नवीनतम रिपोर्ट किए गए भाव देखें, कीमतों के रुझान की तुलना करें और अपनी उपज बेचने का सही समय और स्थान चुनें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>फसल का नाम और पसंदीदा एपीएमसी मंडी या नजदीकी जिले।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>नवीनतम उपलब्ध रिपोर्ट किए गए भाव (न्यूनतम, अधिकतम, मॉडल भाव) और आसपास की मंडियों के बीच तुलना।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">किसान कपास के भाव की तुलना राजकोट और भरूच मंडियों के बीच करता है ताकि यह तय कर सके कि परिवहन लागत के बाद कहां बेचना अधिक फायदेमंद रहेगा।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> यह जानकारी नवीनतम उपलब्ध रिपोर्ट किए गए मंडी डेटा पर आधारित है। नीलामी के दिन वास्तविक भाव में अंतर हो सकता है।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "બજાર ભાવ વિશ્લેષણ",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>વિવિધ મંડીઓના નવીનતમ નોંધાયેલા ભાવો જુઓ, ભાવના વલણો સરખાવો અને ઉપજ વેચવા માટે શ્રેષ્ઠ સમય અને સ્થળ પસંદ કરો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>પાકનું નામ અને તમારી નજીકની APMC મંડી કે જિલ્લાઓ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>નવીનતમ ઉપલબ્ધ નોંધાયેલા મંડી દરો (ન્યૂનતમ, મહત્તમ, મોડલ ભાવ) અને બજારો વચ્ચેની સરખામણી.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">ખેડૂત કપાસના ભાવની સરખામણી રાજકોટ અને ભરૂચ APMC વચ્ચે કરે છે જેથી જાણી શકાય કે કઈ મંડીમાં વેચાણ કરવું વધુ યોગ્ય રહેશે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> ભાવો સત્તાવાર સ્ત્રોતોમાંથી નવીનતમ ઉપલબ્ધ નોંધાયેલા દરો દર્શાવે છે. હરાજીના દિવસે સ્થળ પર ભાવ બદલાઈ શકે છે.\n        </div>\n      </div>"
    }
  },
  "f5": {
    "en": {
      "title": "Digital Land Leasing",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Discover agricultural land available for lease or list your own land for lease to connect directly with interested local farmers.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Location (village/taluka), plot size, soil type, irrigation facilities, and lease duration preferences.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Curated listings of available farm plots with owner contact information and key land specifications.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A farmer looking to expand cultivation by 4 acres of irrigated black soil connects directly with an owner in the neighboring village to discuss lease terms.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> KisanSangam provides a discovery listing service. Rental agreements, legal verification, and payments are handled directly between the parties.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "डिजिटल भूमि पट्टा",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>पट्टे (लीज) के लिए उपलब्ध कृषि भूमि खोजें या अपनी जमीन सूचीबद्ध करके इच्छुक किसानों से सीधे संपर्क करें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>स्थान (गांव/तहसील), जमीन का रकबा, मिट्टी का प्रकार, सिंचाई सुविधा और पट्टे की अवधि।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>उपलब्ध भूखंडों की सूची और सीधे जमीन मालिक से बातचीत करने के लिए संपर्क विवरण।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">4 एकड़ सिंचित जमीन की तलाश कर रहा किसान पास के गांव के जमीन मालिक से सीधे जुड़कर पट्टे की शर्तों पर बात करता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> किसानसंगम केवल सूची और संपर्क सुविधा प्रदान करता है। लीज का अनुबंध और भुगतान दोनों पक्षों के बीच सीधे तय होता है।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "ડિજિટલ જમીન ભાડા",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>ખેતી માટે ભાડે ઉપલબ્ધ જમીન શોધો અથવા તમારી જમીન ભાડે આપવા માટે મૂકીને સીધા સ્થાનિક ખેડૂતો સાથે સંપર્ક કરો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>સ્થળ (ગામ/તાલુકો), જમીનનું કદ, માટીનો પ્રકાર, સિંચાઈની સગવડ અને ભાડાની મુદત.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>ઉપલબ્ધ ખેત પ્લોટ્સની યાદી અને સીધા જમીન માલિક સાથે વાતચીત કરવા માટેની સંપર્ક વિગતો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">4 એકર પિયત જમીન શોધતો ખેડૂત બાજુના ગામના જમીન માલિક સાથે સીધો સંપર્ક કરી શરતો નક્કી કરે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> KisanSangam માત્ર લિસ્ટિંગ પ્લેટફોર્મ પૂરું પાડે છે. કરાર અને ચુકવણી બંને પક્ષો વચ્ચે સીધી રીતે થાય છે.\n        </div>\n      </div>"
    }
  },
  "f6": {
    "en": {
      "title": "Weather-Based Alerts",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Plan daily field operations and safeguard crops with timely, localized weather forecasts and farming advisories.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Farm location via GPS or selected district/taluka.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>7-day localized weather forecast (rainfall probability, temperature, wind, humidity) and actionable agricultural advisories.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">An alert for unseasonal rain in 48 hours helps a farmer postpone pesticide spraying and cover harvested groundnut bags in time.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> Weather forecasts are sourced from regional meteorological services.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "मौसम आधारित अलर्ट",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>समय पर स्थानीय मौसम पूर्वानुमान और कृषि सलाह के साथ खेत के दैनिक कार्यों की योजना बनाएं और फसलों की सुरक्षा करें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>खेत का स्थान या जिला/तहसील का चयन।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>7 दिनों का स्थानीय मौसम पूर्वानुमान (बारिश की संभावना, तापमान, हवा) और उससे जुड़ी खेती सलाह।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">48 घंटे में बारिश की चेतावनी मिलने पर किसान दवा का छिड़काव रोक देता है और खलिहान में रखी मूंगफली को सुरक्षित ढक देता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> मौसम पूर्वानुमान क्षेत्रीय मौसम विज्ञान सेवाओं पर आधारित हैं।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "હવામાન-આધારિત ચેતવણીઓ",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>સ્થાનિક હવામાન આગાહી અને ખેતી સલાહની મદદથી રોજિંદા ખેત કાર્યોનું આયોજન કરો અને પાકને નુકસાનથી બચાવો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>ખેતરનું સ્થાન અથવા જિલ્લો/તાલુકો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>7 દિવસની હવામાન આગાહી (વરસાદની શક્યતા, તાપમાન, પવન) અને સમયસર ખેતી સલાહ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">48 કલાકમાં કમોસમી વરસાદની ચેતવણી મળતાં ખેડૂત દવાનો છંટકાવ મુલતવી રાખે છે અને કાપેલો પાક તાડપત્રીથી ઢાંકી દે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> હવામાન આગાહી પ્રાદેશિક હવામાન સ્ત્રોતો પર આધારિત છે.\n        </div>\n      </div>"
    }
  },
  "f7": {
    "en": {
      "title": "Profit & Cost Calculator",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Plan seasonal farm expenses and estimate potential revenue before planting, helping you evaluate whether a crop is economically viable.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Planned acreage, estimated input costs (seeds, fertilizers, labor, irrigation), expected yield, and anticipated selling price.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Total estimated production costs, projected gross revenue, estimated net return, and cost-per-quintal calculations.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">Calculating costs for 2 acres of Cumin shows expected breakeven costs and estimates returns at different mandi price points.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> All figures are planning estimates based on your inputs and assumptions. Actual revenue depends on market fluctuations and weather.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "लागत और लाभ कैलकुलेटर",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>बुवाई से पहले खेती के खर्चों की योजना बनाएं और संभावित आय का अनुमान लगाएं ताकि आर्थिक रूप से सही फैसला ले सकें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>रकबा, अनुमानित इनपुट लागत (बीज, खाद, मजदूरी, जुताई), अपेक्षित पैदावार और संभावित बिक्री मूल्य।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>कुल अनुमानित खर्च, संभावित कुल आय और शुद्ध लाभ का साफ अनुमान।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">2 एकड़ जीरे की लागत गणना करने पर किसान को पता चलता है कि प्रति क्विंटल लागत कितनी आएगी और विभिन्न भावों पर कितना मुनाफा हो सकता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> सभी परिणाम आपके इनपुट पर आधारित अनुमान हैं। वास्तविक लाभ मौसम और बाजार भाव पर निर्भर करता है।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "નફો અને ખર્ચ કેલ્ક્યુલેટર",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>વાવેતર પહેલાં ખેતીના ખર્ચનું આયોજન કરો અને અપેક્ષિત આવકનો અંદાજ લગાવો જેથી આર્થિક રીતે ફાયદાકારક નિર્ણય લઈ શકાય.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>જમીનનું કદ, બિયારણ, ખાતર, મજૂરી ખર્ચ, અપેક્ષિત ઉત્પાદન અને વેચાણ ભાવ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>કુલ અંદાજિત ઉત્પાદન ખર્ચ, અંદાજિત આવક અને ચોખ્ખા નફાની ગણતરી.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">2 એકર જીરું માટે ગણતરી કરતાં ખેડૂતને પ્રતિ ક્વિન્ટલ પડતર ખર્ચ અને વિવિધ મંડી ભાવો પર નફાનો સ્પષ્ટ અંદાજ મળે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> આ આંકડા તમારા ઇનપુટ્સ પર આધારિત આયોજન અંદાજ છે. વાસ્તવિક આવક બજાર ભાવ અને ઉપજ પર નિર્ભર રહે છે.\n        </div>\n      </div>"
    }
  },
  "f8": {
    "en": {
      "title": "Digital Farm Management",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Maintain digital records of field operations, daily expenses, chemical applications, and harvest yields across seasons.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Date-wise activity logs, expense entries, labor records, and harvested quantities.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>A structured digital farm diary, categorized cost breakdown, and historical records to compare performance season-over-season.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">Logging fertilizer purchases and irrigation dates across two seasons reveals that micro-irrigation reduced operational water costs by 20%.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> Farm records remain private to your account and can be reviewed anytime from your phone.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "डिजिटल खेत प्रबंधन",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>अपने खेत की गतिविधियों, दैनिक खर्चों, खाद-दवा के उपयोग और फसल उत्पादन का डिजिटल रिकॉर्ड एक जगह रखें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>तारीखवार कार्य, खर्च का विवरण, मजदूरी और फसल कटाई का वजन।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>व्यवस्थित डिजिटल डायरी, खर्चों का वर्गीकरण और पिछले मौसमों के प्रदर्शन की तुलना।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">खाद और सिंचाई की तारीखें दर्ज रखने से किसान को पूरे सीजन में प्रति क्विंटल कुल लागत का सटीक हिसाब मिल जाता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> आपका डेटा आपके फोन और अकाउंट में सुरक्षित रहता है जिसे आप कभी भी देख सकते हैं।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "ડિજિટલ ખેત વ્યવસ્થાપન",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>ખેત કામગીરી, રોજીંદા ખર્ચ, દવા-ખાતરનો વપરાશ અને પાક ઉત્પાદનનો ડિજિટલ રેકોર્ડ એક જગ્યાએ સાચવો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>તારીખ-વાર પ્રવૃત્તિઓ, થયેલા ખર્ચ, મજૂરી અને લણણી કરેલ વજન.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>ડિજિટલ ફાર્મ ડાયરી, ખર્ચનું વર્ગીકરણ અને ગત વર્ષો સાથે સરખામણી માટેનો ઇતિહાસ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">ખાતર અને પિયતની તારીખો નોંધવાથી ખેડૂતને મોસમ પૂર્ણ થયા પછી પ્રતિ મણ ખર્ચનો ચોક્કસ હિસાબ મળે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> તમારી માહિતી સુરક્ષિત રહે છે અને ગમે ત્યારે ફોન પર જોઈ શકાય છે.\n        </div>\n      </div>"
    }
  },
  "f9": {
    "en": {
      "title": "AI Crop Doctor",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Explore possible causes of crop damage, diseases, or pest attacks by uploading a clear photo of the affected plant.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Photo of the damaged leaf, stem, or fruit, crop name, and symptoms observed in the field.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Potential identification of the pest or disease, explanation of likely causes, and practical management guidance.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A photo of curled Cotton leaves identifies early whitefly damage and suggests neem oil spray alongside balanced fertilization.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Important Guidance Note:</strong> AI guidance helps explore possible causes based on visual evidence. For widespread or severe crop loss situations, consult your local agricultural extension officer or Krishi Vigyan Kendra (KVK).\n        </div>\n      </div>"
    },
    "hi": {
      "title": "एआई फसल सहायक (क्रॉप डॉक्टर)",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>प्रभावित पौधे की फोटो खींचकर फसल में बीमारी या कीटों के संभावित कारणों को समझने और देखभाल की सलाह पाने में मदद करता है।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>प्रभावित पत्ती, तने या फल की साफ फोटो, फसल का नाम और दिखने वाले लक्षण।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>संभावित कीट या रोग की पहचान, कारण और नियंत्रण के व्यावहारिक सुझाव।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">कपास की मुड़ी हुई पत्तियों की तस्वीर डालने पर सफेद मक्खी (व्हाइटफ्लाई) के शुरुआती लक्षण पहचाने जाते हैं और नीम के तेल के छिड़काव की सलाह मिलती है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>महत्वपूर्ण नोट:</strong> एआई संभावित कारणों को समझने में सहायता करता है। गंभीर प्रकोप की स्थिति में नजदीकी कृषि विज्ञान केंद्र (KVK) के विशेषज्ञों से संपर्क करें।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "AI પાક સહાયક (ક્રોપ ડૉક્ટર)",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>છોડનો ફોટો પાડીને પાકના રોગો અને જીવાતના સંભવિત કારણો શોધવા અને યોગ્ય સંભાળ માર્ગદર્શન મેળવવામાં મદદ કરે છે.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>રોગગ્રસ્ત પાંદડા, થડ કે ફળનો સ્પષ્ટ ફોટો, પાકનું નામ અને દેખાતા લક્ષણો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>સંભવિત રોગ કે જીવાતની ઓળખ, તેનું કારણ અને નિયંત્રણ માટેના વ્યવહારુ ઉપાયો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">કપાસના કોકડાઈ ગયેલા પાંદડાના ફોટાથી સફેદ માખીના પ્રારંભિક લક્ષણ ઓળખાય છે અને લીમડાના તેલના છંટકાવની સલાહ મળે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>મહત્વપૂર્ણ નોંધ:</strong> AI સંભવિત કારણો સમજવામાં માર્ગદર્શન આપે છે. ગંભીર રોગની સ્થિતિમાં સ્થાનિક કૃષિ વિજ્ઞાન કેન્દ્ર (KVK) નો સંપર્ક કરવો.\n        </div>\n      </div>"
    }
  },
  "f10": {
    "en": {
      "title": "Resource & Equipment Sharing",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Find available agricultural machinery (tractors, rotavators, sprayers, harvesters) nearby and connect directly with machinery owners.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Equipment needed, required dates, farm location, or your own machinery details if offering for rent.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Local equipment listings with owner contact numbers and indicative rental rates.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A farmer needing a rotavator for 2 days connects directly with a tractor owner located 4 km away to agree on timing and rate.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> KisanSangam provides a direct discovery connection. Rental rates, machinery condition, and payments are settled directly between farmers.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "संसाधन और उपकरण साझाकरण",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>आवश्यकता पड़ने पर आसपास के किसानों से ट्रैक्टर, रोटावेटर, स्प्रेयर जैसे कृषि उपकरण किराए पर लेने या अपने उपकरण साझा करने के लिए सीधे जुड़ें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>आवश्यक उपकरण का प्रकार, तारीखें और खेत का स्थान।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>नजदीकी उपलब्ध उपकरणों की सूची और मालिक का संपर्क नंबर।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">2 दिन के लिए रोटावेटर की जरूरत वाला किसान 4 किमी दूर स्थित ट्रैक्टर मालिक से सीधे फोन पर बात करके किराया तय करता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> किसानसंगम सीधे संपर्क की सुविधा देता है। उपकरण की स्थिति और भुगतान दोनों किसानों के बीच सीधे तय होता है।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "સંસાધન અને સાધન વહેંચણી",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>જરૂર પડે ત્યારે નજીકના ખેડૂતો પાસેથી ટ્રેક્ટર, રોટાવેટર, સ્પ્રેયર જેવા સાધનો ભાડે મેળવવા અથવા પોતાના સાધનો ભાડે આપવા માટે સીધા જોડાઓ.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>જરૂરી સાધન, તારીખ અને ખેતરનું સ્થાન.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>સ્થાનિક સાધનોની યાદી અને માલિકનો સંપર્ક નંબર.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">2 દિવસ માટે રોટાવેટરની જરૂર ધરાવતો ખેડૂત 4 કિમી દૂર રહેતા ટ્રેક્ટર માલિક સાથે સીધો સંપર્ક કરી સમય અને ભાડું નક્કી કરે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> KisanSangam સીધો સંપર્ક પૂરો પાડે છે. સાધનની સ્થિતિ અને ભાડાની ચુકવણી ખેડૂતો વચ્ચે સીધી રીતે થાય છે.\n        </div>\n      </div>"
    }
  },
  "f11": {
    "en": {
      "title": "Government Scheme Finder",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Browse curated central and state agricultural schemes, review eligibility criteria, subsidy amounts, and official application links.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>State/district, farmer category (small/marginal/general), and areas of interest (irrigation, solar, mechanization, seeds).</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Summaries of relevant schemes, eligibility guidelines, required documents, and direct links to official government portals.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A smallholder farmer reviewing drip irrigation subsidies finds Gujarat Green Revolution Company (GGRC) guidelines, required documents, and the official portal link.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> KisanSangam provides curated informational listings and links. Scheme applications, scrutiny, and fund disbursements are handled solely through official government portals.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "सरकारी योजना खोजक",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>केंद्र और राज्य सरकार की कृषि योजनाओं की जानकारी देखें, पात्रता समझें और आधिकारिक आवेदन लिंक प्राप्त करें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>राज्य/जिला, किसान श्रेणी (लघु/सीमांत) और रुचि का क्षेत्र (सिंचाई, सोलर, उपकरण)।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>योजना का सारांश, पात्रता नियम, आवश्यक दस्तावेजों की सूची और आधिकारिक सरकारी पोर्टल लिंक।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">ड्रिप सिंचाई में रुचि रखने वाला किसान सब्सिडी के नियम, आवश्यक दस्तावेज और आवेदन करने के आधिकारिक लिंक की जानकारी प्राप्त करता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> किसानसंगम केवल सूचनात्मक मार्गदर्शन और लिंक प्रदान करता है। योजना के आवेदन और सब्सिडी का वितरण पूरी तरह संबंधित सरकारी विभागों द्वारा किया जाता है।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "સરકારી યોજના શોધક",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>કેન્દ્ર અને રાજ્ય સરકારની કૃષિ યોજનાઓ વિશે માહિતી મેળવો, પાત્રતા ચકાસો અને સત્તાવાર અરજી લિંક મેળવો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>રાજ્ય/જિલ્લો, ખેડૂત શ્રેણી (નાના/સીમાંત) અને રસનો વિષય (ટપક સિંચાઈ, સોલાર પંપ, સાધનો).</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>યોજનાનો સરળ સારાંશ, પાત્રતાના નિયમો, જરૂરી દસ્તાવેજો અને સત્તાવાર સરકારી પોર્ટલની લિંક.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">ટપક સિંચાઈ સબસિડી માટે ખેડૂત GGRC ની માર્ગદર્શિકા, જરૂરી કાગળો અને સત્તાવાર પોર્ટલ પર અરજી કરવાની માહિતી મેળવે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> KisanSangam માત્ર માહિતી અને સત્તાવાર લિંક પૂરી પાડે છે. યોજનાની મંજૂરી અને સહાય સરકારી વિભાગો દ્વારા જ આપવામાં આવે છે.\n        </div>\n      </div>"
    }
  },
  "f12": {
    "en": {
      "title": "Organic Farming Support",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>What It Helps You Do</h4>\n          <p>Explore crop guidance suited to natural and organic farming, emphasizing soil health, bio-inputs, and chemical-free cultivation methods.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Information You Provide</h4>\n          <p>Selected crop, farm acreage, soil condition, and availability of organic inputs (cow dung, urine, neem, compost).</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>What You Receive</h4>\n          <p>Organic nutrient application schedules (Jeevamrut, Ghanjeevamrut), botanical pest prevention formulas, and natural soil enrichment advice.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>Practical Example</h4>\n          <p class=\"fd-example\">A farmer cultivating organic Turmeric receives application timings for vermicompost and botanical sprays for natural leaf protection.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>Note:</strong> Provides practical agronomic advice for natural cultivation; does not confer official organic certification.\n        </div>\n      </div>"
    },
    "hi": {
      "title": "जैविक और प्राकृतिक खेती सहायता",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>यह क्या करने में मदद करता है</h4>\n          <p>रासायनिक मुक्त खेती के लिए मिट्टी के स्वास्थ्य, जैविक खाद और प्राकृतिक कीट नियंत्रण के तरीकों का मार्गदर्शन प्राप्त करें।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आप क्या जानकारी प्रदान करते हैं</h4>\n          <p>फसल का नाम, खेत का आकार और उपलब्ध जैविक संसाधन (गोबर, गौमूत्र, नीम, कम्पोस्ट)।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>आपको क्या प्राप्त होता है</h4>\n          <p>जीवामृत, घनजीवामृत और प्राकृतिक कीटनाशक तैयार करने और उपयोग करने का समयबद्ध कार्यक्रम।</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>व्यावहारिक उदाहरण</h4>\n          <p class=\"fd-example\">प्राकृतिक हल्दी उगाने वाले किसान को वर्मीकम्पोस्ट और पत्तियों के रोग से बचाव के लिए वनस्पति काढ़े के छिड़काव का समय मिलता है।</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>विशेष नोट:</strong> यह प्राकृतिक कृषि विधियों के लिए तकनीकी मार्गदर्शन है; यह कोई सरकारी जैविक प्रमाणीकरण प्रदान नहीं करता।\n        </div>\n      </div>"
    },
    "gu": {
      "title": "પ્રાકૃતિક અને ઓર્ગેનિક ખેતી સહાય",
      "detailedHtml": "<div class=\"feature-detail-content\">\n        <div class=\"fd-section\">\n          <h4>આ શું કરવામાં મદદ કરે છે</h4>\n          <p>રાસાયણિક ખાતરો અને દવાઓ વગર જમીનની તંદુરસ્તી અને કુદરતી પદ્ધતિઓથી પાક ઉગાડવાનું માર્ગદર્શન મેળવો.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમે શું માહિતી આપો છો</h4>\n          <p>પાકનું નામ, જમીનનું ક્ષેત્રફળ અને ઉપલબ્ધ દેશી સાધનો (ગોબર, ગૌમૂત્ર, લીમડો, અળસિયા ખાતર).</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>તમને શું પ્રાપ્ત થાય છે</h4>\n          <p>જીવામૃત, ઘનજીવામૃત અને દેશી ઉપાયોથી જીવાત નિયંત્રણ માટેનું સમયસર માર્ગદર્શન.</p>\n        </div>\n        <div class=\"fd-section\">\n          <h4>વ્યવહારુ ઉદાહરણ</h4>\n          <p class=\"fd-example\">પ્રાકૃતિક હળદર પકવતા ખેડૂતને જીવામૃત આપવાના દિવસો અને પાંદડાના રક્ષણ માટે દશપર્ણી અર્ક છાંટવાની સલાહ મળે છે.</p>\n        </div>\n        <div class=\"fd-note\">\n          <strong>વિશેષ નોંધ:</strong> આ વ્યવહારુ પ્રાકૃતિક ખેતી પદ્ધતિઓનું માર્ગદર્શન છે; આ સત્તાવાર ઓર્ગેનિક પ્રમાણપત્ર આપતું નથી.\n        </div>\n      </div>"
    }
  }
};

  const featureModal = document.getElementById('featureModal');
  const modalClose = document.getElementById('featureModalClose');
  const modalBackdrop = document.getElementById('featureModalBackdrop');
  
  if (featureModal) {
    const modalIcon = document.getElementById('featureModalIcon');
    const modalTitle = document.getElementById('featureModalTitle');
    const modalDetailed = document.getElementById('featureModalDetailed');
    let lastFocusedElement = null;

    featureModal.setAttribute('role', 'dialog');
    featureModal.setAttribute('aria-modal', 'true');
    featureModal.setAttribute('aria-labelledby', 'featureModalTitle');

    const openModal = (card) => {
      const id = card.getAttribute('data-feature-id');
      const data = featureData[id];
      if (!data) return;

      lastFocusedElement = document.activeElement;

      // Copy icon from card
      const iconEl = card.querySelector('.feature-card__icon');
      if (iconEl && modalIcon) {
        modalIcon.innerHTML = iconEl.innerHTML;
        const iconClass = iconEl.className;
        modalIcon.className = 'feature-modal__icon ' + iconClass.split(' ').filter(c => c.startsWith('feature-card__icon--')).join(' ');
      }

      const langData = data[currentLang] || data['en'] || data;
      if (modalTitle) modalTitle.textContent = langData.title || data.title;
      
      if (modalDetailed) {
        modalDetailed.innerHTML = langData.detailedHtml || data.detailedHtml;
      }

      featureModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus close button for accessibility
      setTimeout(() => {
        if (modalClose) modalClose.focus();
      }, 50);
    };

    const closeModal = () => {
      featureModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    };

    // Open modal on click or Enter/Space on feature cards
    document.querySelectorAll('.feature-card[data-feature-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        openModal(card);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Escape and Tab focus trap inside modal
    document.addEventListener('keydown', e => {
      if (!featureModal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'Tab') {
        const focusable = featureModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // --- Hash Navigation Handler ---
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash === '#') return;

    if (hash === '#launching-soon') {
      setTimeout(() => {
        const input = document.getElementById('firstName');
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 500); // Wait for smooth scroll
    } else if (['#crop-guidance', '#soil-intelligence', '#market-prices', '#ai-crop-doctor'].includes(hash)) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.style.transition = 'background-color 0.5s ease, transform 0.5s ease';
          const originalBg = el.style.backgroundColor;
          const originalTransform = el.style.transform;
          
          el.style.backgroundColor = 'rgba(116, 198, 157, 0.15)'; // --green-300 with opacity
          el.style.transform = 'scale(1.02)';
          
          setTimeout(() => {
            el.style.backgroundColor = originalBg;
            el.style.transform = originalTransform;
            setTimeout(() => {
              el.style.transition = '';
            }, 500);
          }, 800);
        }
      }, 500);
    }
  });

});
