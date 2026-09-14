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

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });


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


  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


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


  /* ---- Active Nav Link Highlight ---- */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.querySelectorAll('a:not(.btn)').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ---- Feature Modal Interactivity ---- */
  const featureData = {
  "f1": {
    "en": {
      "title": "AI-Based Crop Recommendation",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam recommends suitable crops for a farmer's land by analyzing multiple factors together — soil characteristics, soil type, nutrient values, location, season, climate, and market conditions — instead of relying on any single factor in isolation. The objective is to help farmers select crops with better agronomic suitability and stronger potential returns.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers often choose crops based on traditional knowledge, past experience, or informal advice from people around them.</li><li>Multiple relevant factors — soil, location, season, climate, market opportunity, and potential returns — are rarely considered together in a structured way.</li><li>There is no easy way for an individual farmer to compare how well different crops would actually perform on their specific land.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>The farmer provides relevant farm information to KisanSangam — such as location, soil details, and the season in which they intend to grow a crop. The system analyzes this information together and recommends the crop or crops best suited to the farmer's specific conditions, along with the reasoning behind each recommendation.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Input (Soil + Location + Season) → System Processing → Multi-Factor Suitability Analysis → Ranked Crop Recommendation with Reasoning → Farmer Selects Crop</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Soil parameters (pH, nitrogen, phosphorus, potassium, organic carbon, or other available values)</li><li>Soil type</li><li>Farm location</li><li>Current or intended growing season</li><li>Prevailing climate conditions for the location</li><li>Available market/price context, where relevant</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam evaluates the combination of soil suitability, seasonal compatibility, climatic fit, and market context for a range of candidate crops, rather than scoring each factor independently. Crops that are agronomically appropriate for the farmer's soil and season, and that also show reasonable market opportunity, are ranked ahead of options that satisfy only some of these conditions. This multi-factor approach is what distinguishes a personalized recommendation from generic, one-size-fits-all crop advice.</p></ul><h4>G. Output</h4><ul><li>A ranked list or single top recommendation of suitable crops</li><li>An explanation of why each recommended crop is suitable, referencing the specific factors considered</li><li>Where relevant, a note on crops that are less suitable and why</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer is confused between Cotton, Wheat, and Groundnut for his land. He enters his farm information into KisanSangam. The system analyzes the information and recommends Groundnut as the most suitable option, along with an explanation of the reasons — for example, soil compatibility and favourable seasonal fit.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Reduces reliance on guesswork or generic advice</li><li>Considers multiple relevant factors together rather than in isolation</li><li>Provides transparent reasoning so the farmer understands why a crop is recommended, not just what to grow</li><li>Supports more confident, informed crop-selection decisions</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Incorporation of additional data sources (e.g., historical yield data) as they become available</li><li>Refinement of recommendation logic based on farmer feedback over multiple seasons</li></ul></div>"
    },
    "hi": {
      "title": "एआई-आधारित फसल अनुशंसा",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम अलग-अलग किसी एक कारक पर निर्भर रहने के बजाय कई कारकों - मिट्टी की विशेषताएं, मिट्टी के प्रकार, पोषक तत्व, स्थान, मौसम, जलवायु और बाजार की स्थितियों - का एक साथ विश्लेषण करके किसान की भूमि के लिए उपयुक्त फसलों की सिफारिश करता है। इसका उद्देश्य किसानों को बेहतर कृषि संबंधी उपयुक्तता और मजबूत संभावित रिटर्न वाली फसलों का चयन करने में मदद करना है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>किसान अक्सर पारंपरिक ज्ञान, पिछले अनुभव या अपने आसपास के लोगों की अनौपचारिक सलाह के आधार पर फसल चुनते हैं।</li><li>कई प्रासंगिक कारक - मिट्टी, स्थान, मौसम, जलवायु, बाजार अवसर और संभावित रिटर्न - शायद ही कभी एक संरचित तरीके से एक साथ विचार किए जाते हैं।</li><li>किसी भी किसान के लिए यह तुलना करने का कोई आसान तरीका नहीं है कि उनकी विशिष्ट भूमि पर विभिन्न फसलें वास्तव में कितना अच्छा प्रदर्शन करेंगी।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसान किसानसंगम को प्रासंगिक कृषि जानकारी प्रदान करता है - जैसे स्थान, मिट्टी का विवरण और वह मौसम जिसमें वे फसल उगाने का इरादा रखते हैं। सिस्टम इस जानकारी का एक साथ विश्लेषण करता है और प्रत्येक सिफारिश के पीछे के तर्क के साथ, किसान की विशिष्ट परिस्थितियों के लिए सबसे उपयुक्त फसल या फसलों की सिफारिश करता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान इनपुट (मिट्टी + स्थान + मौसम) → सिस्टम प्रोसेसिंग → बहु-कारक उपयुक्तता विश्लेषण → तर्क के साथ रैंक की गई फसल की सिफारिश → किसान फसल का चयन करता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>मृदा पैरामीटर (पीएच, नाइट्रोजन, फास्फोरस, पोटेशियम, कार्बनिक कार्बन, या अन्य उपलब्ध मान)</li><li>मिट्टी का प्रकार</li><li>खेत का स्थान</li><li>वर्तमान या इच्छित वनस्पति मौसम</li><li>स्थान के लिए प्रचलित जलवायु परिस्थितियाँ</li><li>उपलब्ध बाज़ार/मूल्य संदर्भ, जहां प्रासंगिक हो</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम प्रत्येक कारक को स्वतंत्र रूप से स्कोर करने के बजाय, उम्मीदवार फसलों की एक श्रृंखला के लिए मिट्टी की उपयुक्तता, मौसमी अनुकूलता, जलवायु फिट और बाजार के संदर्भ के संयोजन का मूल्यांकन करता है। जो फसलें किसान की मिट्टी और मौसम के लिए कृषि संबंधी रूप से उपयुक्त हैं, और जो उचित बाजार अवसर भी दिखाती हैं, उन्हें उन विकल्पों से आगे रखा जाता है जो इनमें से केवल कुछ शर्तों को पूरा करते हैं। यह बहु-कारक दृष्टिकोण एक व्यक्तिगत अनुशंसा को सामान्य, एक-आकार-सभी के लिए उपयुक्त फसल सलाह से अलग करता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>उपयुक्त फसलों की एक रैंक सूची या एकल शीर्ष अनुशंसा</li><li>प्रत्येक अनुशंसित फसल उपयुक्त क्यों है, इसका स्पष्टीकरण, विचार किए गए विशिष्ट कारकों का संदर्भ देते हुए</li><li>जहां प्रासंगिक हो, उन फसलों पर एक नोट जो कम उपयुक्त हैं और क्यों</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान अपनी जमीन के लिए कपास, गेहूं और मूंगफली के बीच भ्रमित है। वह अपने खेत की जानकारी किसानसंगम में दर्ज करता है। सिस्टम जानकारी का विश्लेषण करता है और मूंगफली को सबसे उपयुक्त विकल्प के रूप में सुझाता है, साथ ही कारणों की व्याख्या भी करता है - उदाहरण के लिए, मिट्टी की अनुकूलता और अनुकूल मौसमी फिट।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>अनुमान या सामान्य सलाह पर निर्भरता कम करता है</li><li>कई प्रासंगिक कारकों पर अलग-अलग विचार करने के बजाय एक साथ विचार करता है</li><li>पारदर्शी तर्क प्रदान करता है ताकि किसान समझ सके कि फसल की सिफारिश क्यों की जाती है, न कि केवल क्या उगाना है</li><li>अधिक आत्मविश्वासपूर्ण, सूचित फसल-चयन निर्णयों का समर्थन करता है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>अतिरिक्त डेटा स्रोतों (उदाहरण के लिए, ऐतिहासिक उपज डेटा) के उपलब्ध होते ही उन्हें शामिल करना</li><li>कई मौसमों में किसानों की प्रतिक्रिया के आधार पर अनुशंसा तर्क का परिशोधन</li></ul></div>"
    },
    "gu": {
      "title": "AI-આધારિત પાકની ભલામણ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ વિવિધ પરિબળો - જમીનની લાક્ષણિકતાઓ, જમીનનો પ્રકાર, પોષક મૂલ્યો, સ્થાન, મોસમ, આબોહવા અને બજારની સ્થિતિઓનું એકસાથે પૃથ્થકરણ કરીને ખેડૂતની જમીન માટે યોગ્ય પાકની ભલામણ કરે છે - એકલતામાં કોઈપણ એક પરિબળ પર આધાર રાખવાને બદલે. ઉદ્દેશ્ય ખેડૂતોને વધુ સારી કૃષિ અનુકુળતા અને મજબૂત સંભવિત વળતર સાથે પાક પસંદ કરવામાં મદદ કરવાનો છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ખેડૂતો ઘણીવાર પરંપરાગત જ્ઞાન, ભૂતકાળના અનુભવ અથવા આસપાસના લોકોની અનૌપચારિક સલાહના આધારે પાક પસંદ કરે છે.</li><li>બહુવિધ સંબંધિત પરિબળો — માટી, સ્થાન, મોસમ, આબોહવા, બજારની તકો અને સંભવિત વળતર — ભાગ્યે જ સંરચિત રીતે એકસાથે ગણવામાં આવે છે.</li><li>વ્યક્તિગત ખેડૂત માટે તેમની ચોક્કસ જમીન પર વિવિધ પાક ખરેખર કેટલું સારું પ્રદર્શન કરશે તેની તુલના કરવાનો કોઈ સરળ રસ્તો નથી.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>ખેડૂત કિસાનસંગમને સંબંધિત ખેતીની માહિતી પૂરી પાડે છે - જેમ કે સ્થાન, જમીનની વિગતો અને તેઓ જે સિઝનમાં પાક ઉગાડવાનો ઇરાદો ધરાવે છે. સિસ્ટમ આ માહિતીનું એકસાથે પૃથ્થકરણ કરે છે અને દરેક ભલામણ પાછળના તર્ક સાથે, ખેડૂતની ચોક્કસ પરિસ્થિતિઓને અનુરૂપ પાક અથવા પાકની ભલામણ કરે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત ઇનપુટ (માટી + સ્થાન + મોસમ) → સિસ્ટમ પ્રોસેસિંગ → બહુ-પરિબળ યોગ્યતા વિશ્લેષણ → ક્રમાંકિત પાકની ભલામણ તર્ક સાથે → ખેડૂત પાક પસંદ કરે છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>માટીના પરિમાણો (pH, નાઇટ્રોજન, ફોસ્ફરસ, પોટેશિયમ, કાર્બનિક કાર્બન અથવા અન્ય ઉપલબ્ધ મૂલ્યો)</li><li>માટીનો પ્રકાર</li><li>ફાર્મ સ્થાન</li><li>વર્તમાન અથવા ઇચ્છિત વૃદ્ધિની મોસમ</li><li>સ્થાન માટે પ્રવર્તમાન આબોહવાની પરિસ્થિતિઓ</li><li>ઉપલબ્ધ બજાર/કિંમત સંદર્ભ, જ્યાં સંબંધિત હોય</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ દરેક પરિબળને સ્વતંત્ર રીતે સ્કોર કરવાને બદલે, ઉમેદવારોના પાકની શ્રેણી માટે જમીનની અનુકૂળતા, મોસમી સુસંગતતા, આબોહવા યોગ્યતા અને બજાર સંદર્ભના સંયોજનનું મૂલ્યાંકન કરે છે. ખેડુતની જમીન અને મોસમ માટે કૃષિ વિજ્ઞાનની દૃષ્ટિએ યોગ્ય હોય તેવા પાકો અને જે બજારની વાજબી તકો પણ દર્શાવે છે, તે આમાંની કેટલીક શરતોને સંતોષે તેવા વિકલ્પો કરતાં આગળ ક્રમે છે. આ બહુ-પરિબળ અભિગમ એ છે જે વ્યક્તિગત ભલામણને સામાન્ય, એક-કદ-ફીટ-બધી પાક સલાહથી અલગ પાડે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>ક્રમાંકિત સૂચિ અથવા યોગ્ય પાકોની સિંગલ ટોચની ભલામણ</li><li>દરેક ભલામણ કરેલ પાક શા માટે યોગ્ય છે તેની સમજૂતી, ધ્યાનમાં લેવાયેલા ચોક્કસ પરિબળોનો સંદર્ભ આપીને</li><li>જ્યાં સંબંધિત હોય, એવા પાકો પરની નોંધ જે ઓછા યોગ્ય છે અને શા માટે</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂત તેની જમીન માટે કપાસ, ઘઉં અને મગફળી વચ્ચે મૂંઝવણમાં છે. તે કિસાનસંગમમાં તેના ખેતરની માહિતી દાખલ કરે છે. સિસ્ટમ માહિતીનું પૃથ્થકરણ કરે છે અને કારણોની સમજૂતી સાથે સૌથી યોગ્ય વિકલ્પ તરીકે મગફળીની ભલામણ કરે છે - ઉદાહરણ તરીકે, જમીનની સુસંગતતા અને અનુકૂળ મોસમી યોગ્યતા.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>અનુમાન અથવા સામાન્ય સલાહ પર નિર્ભરતા ઘટાડે છે</li><li>અલગતામાં રહેવાને બદલે એકસાથે બહુવિધ સંબંધિત પરિબળોને ધ્યાનમાં લે છે</li><li>પારદર્શક તર્ક પૂરો પાડે છે જેથી ખેડૂત સમજી શકે કે શા માટે પાકની ભલામણ કરવામાં આવે છે, માત્ર શું ઉગાડવું તે જ નહીં</li><li>વધુ આત્મવિશ્વાસપૂર્ણ, જાણકાર પાક-પસંદગીના નિર્ણયોને સમર્થન આપે છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>વધારાના ડેટા સ્ત્રોતોનો સમાવેશ (દા.ત., ઐતિહાસિક ઉપજ ડેટા) જેમ જેમ તેઓ ઉપલબ્ધ થાય છે</li><li>બહુવિધ સિઝનમાં ખેડૂતોના પ્રતિસાદના આધારે ભલામણના તર્કનું શુદ્ધીકરણ</li></ul></div>"
    }
  },
  "f2": {
    "en": {
      "title": "Crop-Specific Farming Guidance",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>Once a crop is selected, KisanSangam provides detailed, step-by-step cultivation guidance covering the entire growth cycle — from sowing to harvesting. This includes crop duration, cultivation stages, fertilizer requirements and application schedule, irrigation schedule and water requirements, harvesting method and timing, recommended agricultural inputs, and guidance on where to purchase those inputs.</p></ul><h4>B. Current System Problem</h4><ul><li>After selecting a crop, farmers often lack access to a complete and reliable step-by-step cultivation guide.</li><li>Farmers may be unsure when to sow, how much fertilizer to use and when to apply it, how frequently to irrigate, what happens at each growth stage, and when to harvest.</li><li>Guidance, where available, is often incomplete or spread across multiple disconnected sources.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>Once a farmer selects a crop, KisanSangam generates a crop-specific farming guide that consolidates the entire cultivation process into one structured reference, organized by growth stage.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Selects Crop → System Retrieves Crop-Specific Guidance → Structured Stage-Wise Plan Generated → Farmer Follows Guide Through the Season</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Selected crop</li><li>Sowing date or intended sowing window</li><li>Location/region (to account for regional variation where applicable)</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam organizes cultivation knowledge for the selected crop into a structured sequence of stages, mapping fertilizer application, irrigation, and crop-care activities to the appropriate point in the crop's growth cycle. This structured, stage-wise organization is what allows the farmer to follow one coherent guide rather than piecing information together from multiple sources.</p></ul><h4>G. Output</h4><ul><li>A complete crop-specific guide covering sowing, growth stages, fertilization schedule, irrigation schedule, crop care, and harvesting</li><li>Timing guidance for each major activity</li><li>Recommended inputs and, where available, guidance on where to source them</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer selects Tomato as his crop. Instead of searching multiple sources, KisanSangam provides one structured guide covering Sowing → Growth Stages → Fertilization → Irrigation → Crop Care → Harvesting, so the farmer always knows what to do next and when.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Creates a single, organized reference for the entire cultivation cycle</li><li>Reduces uncertainty about timing of key activities</li><li>Helps farmers apply inputs more efficiently and at the correct growth stage</li><li>Supports more consistent cultivation practices season over season</li></ul></div>"
    },
    "hi": {
      "title": "फसल-विशिष्ट खेती संबंधी मार्गदर्शन",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>एक बार फसल का चयन हो जाने के बाद, किसानसंगम पूरे विकास चक्र को कवर करते हुए विस्तृत, चरण-दर-चरण खेती मार्गदर्शन प्रदान करता है - बुआई से लेकर कटाई तक। इसमें फसल की अवधि, खेती के चरण, उर्वरक आवश्यकताएं और आवेदन अनुसूची, सिंचाई अनुसूची और पानी की आवश्यकताएं, कटाई की विधि और समय, अनुशंसित कृषि इनपुट और उन इनपुटों को कहां से खरीदना है, इस पर मार्गदर्शन शामिल है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>किसी फसल का चयन करने के बाद, किसानों को अक्सर संपूर्ण और विश्वसनीय चरण-दर-चरण खेती मार्गदर्शिका तक पहुंच की कमी होती है।</li><li>किसान अनिश्चित हो सकते हैं कि कब बुआई करें, कितना उर्वरक उपयोग करें और कब डालें, कितनी बार सिंचाई करें, प्रत्येक विकास चरण पर क्या होता है और कब कटाई करें।</li><li>मार्गदर्शन, जहां उपलब्ध है, अक्सर अधूरा होता है या कई अलग-अलग स्रोतों में फैला हुआ होता है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>एक बार जब कोई किसान किसी फसल का चयन करता है, तो किसानसंगम एक फसल-विशिष्ट खेती गाइड तैयार करता है जो विकास चरण द्वारा आयोजित पूरी खेती प्रक्रिया को एक संरचित संदर्भ में समेकित करता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान फसल का चयन करता है → सिस्टम फसल-विशिष्ट मार्गदर्शन प्राप्त करता है → संरचित चरण-वार योजना तैयार की जाती है → किसान पूरे मौसम में मार्गदर्शन का पालन करता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>चयनित फसल</li><li>बुआई की तारीख या इच्छित बुआई विंडो</li><li>स्थान/क्षेत्र (जहां लागू हो क्षेत्रीय भिन्नता को ध्यान में रखते हुए)</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम चयनित फसल के लिए खेती के ज्ञान को चरणों के एक संरचित अनुक्रम में व्यवस्थित करता है, फसल के विकास चक्र में उचित बिंदु पर उर्वरक आवेदन, सिंचाई और फसल देखभाल गतिविधियों का मानचित्रण करता है। यह संरचित, चरण-वार संगठन वह है जो किसान को कई स्रोतों से जानकारी को एक साथ जोड़ने के बजाय एक सुसंगत मार्गदर्शिका का पालन करने की अनुमति देता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>बुआई, विकास चरण, उर्वरक कार्यक्रम, सिंचाई कार्यक्रम, फसल देखभाल और कटाई को कवर करने वाली एक संपूर्ण फसल-विशिष्ट मार्गदर्शिका</li><li>प्रत्येक प्रमुख गतिविधि के लिए समय मार्गदर्शन</li><li>अनुशंसित इनपुट और, जहां उपलब्ध हो, उन्हें कहां से प्राप्त करें, इस पर मार्गदर्शन</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान टमाटर को अपनी फसल के रूप में चुनता है। कई स्रोतों की खोज करने के बजाय, किसानसंगम एक संरचित मार्गदर्शिका प्रदान करता है जिसमें बुआई → विकास चरण → उर्वरक → सिंचाई → फसल देखभाल → कटाई शामिल है, इसलिए किसान को हमेशा पता होता है कि आगे क्या करना है और कब करना है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>संपूर्ण खेती चक्र के लिए एक एकल, संगठित संदर्भ बनाता है</li><li>प्रमुख गतिविधियों के समय के बारे में अनिश्चितता कम हो जाती है</li><li>किसानों को इनपुट को अधिक कुशलतापूर्वक और सही विकास चरण में लागू करने में मदद करता है</li><li>सीज़न दर सीज़न अधिक सुसंगत खेती प्रथाओं का समर्थन करता है</li></ul></div>"
    },
    "gu": {
      "title": "પાક-વિશિષ્ટ ખેતી માર્ગદર્શન",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>એકવાર પાક પસંદ થઈ જાય, કિસાનસંગમ સમગ્ર વૃદ્ધિ ચક્રને આવરી લેતું વિગતવાર, પગલું-દર-પગલાંનું માર્ગદર્શન પૂરું પાડે છે - વાવણીથી લણણી સુધી. આમાં પાકનો સમયગાળો, ખેતીના તબક્કાઓ, ખાતરની જરૂરિયાતો અને એપ્લિકેશન શેડ્યૂલ, સિંચાઈનું સમયપત્રક અને પાણીની જરૂરિયાતો, લણણીની પદ્ધતિ અને સમય, ભલામણ કરેલ કૃષિ ઈનપુટ્સ અને તે ઈનપુટ્સ ક્યાંથી ખરીદવા તે અંગે માર્ગદર્શનનો સમાવેશ થાય છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>પાક પસંદ કર્યા પછી, ખેડૂતોને ઘણી વાર સંપૂર્ણ અને વિશ્વસનીય પગલું-દર-પગલા ખેતી માર્ગદર્શિકાનો અભાવ હોય છે.</li><li>ખેડૂતોને ક્યારે વાવણી કરવી, કેટલું ખાતર વાપરવું અને ક્યારે લાગુ કરવું, કેટલી વાર સિંચાઈ કરવી, દરેક વૃદ્ધિના તબક્કે શું થાય છે અને ક્યારે લણણી કરવી તે અંગે અચોક્કસ હોઈ શકે છે.</li><li>માર્ગદર્શન, જ્યાં ઉપલબ્ધ હોય, તે ઘણીવાર અધૂરું હોય છે અથવા બહુવિધ ડિસ્કનેક્ટ થયેલા સ્ત્રોતોમાં ફેલાયેલું હોય છે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>એકવાર ખેડૂત પાક પસંદ કરે, કિસાનસંગમ પાક-વિશિષ્ટ ખેતી માર્ગદર્શિકા બનાવે છે જે સમગ્ર ખેતી પ્રક્રિયાને એક માળખાગત સંદર્ભમાં એકીકૃત કરે છે, જે વૃદ્ધિના તબક્કા દ્વારા આયોજિત થાય છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત પાક પસંદ કરે છે → સિસ્ટમ પાક-વિશિષ્ટ માર્ગદર્શન મેળવે છે → સ્ટ્રક્ચર્ડ સ્ટેજ-વાઈઝ પ્લાન જનરેટ કરે છે → ખેડૂત સીઝન દરમિયાન માર્ગદર્શિકાને અનુસરે છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>પસંદ કરેલ પાક</li><li>વાવણી તારીખ અથવા ઇચ્છિત વાવણી વિન્ડો</li><li>સ્થાન/પ્રદેશ (જ્યાં લાગુ પડતું હોય ત્યાં પ્રાદેશિક ભિન્નતા માટે એકાઉન્ટ)</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ પસંદગીના પાક માટે ખેતીના જ્ઞાનને તબક્કાઓના માળખાગત ક્રમમાં ગોઠવે છે, ખાતરનો ઉપયોગ, સિંચાઈ અને પાક-સંભાળ પ્રવૃત્તિઓને પાકના વિકાસ ચક્રમાં યોગ્ય બિંદુ સુધી ગોઠવે છે. આ સંરચિત, સ્ટેજ મુજબનું સંગઠન છે જે ખેડૂતને બહુવિધ સ્ત્રોતોમાંથી માહિતીને એકસાથે જોડવાને બદલે એક સુસંગત માર્ગદર્શિકાને અનુસરવાની મંજૂરી આપે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>વાવણી, વૃદ્ધિના તબક્કા, ગર્ભાધાન શેડ્યૂલ, સિંચાઈ સમયપત્રક, પાકની સંભાળ અને લણણીને આવરી લેતી સંપૂર્ણ પાક-વિશિષ્ટ માર્ગદર્શિકા</li><li>દરેક મુખ્ય પ્રવૃત્તિ માટે સમય માર્ગદર્શન</li><li>ભલામણ કરેલ ઇનપુટ્સ અને, જ્યાં ઉપલબ્ધ હોય, તે ક્યાંથી મેળવવું તે અંગે માર્ગદર્શન</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂત તેના પાક તરીકે ટામેટા પસંદ કરે છે. બહુવિધ સ્ત્રોતો શોધવાને બદલે, કિસાનસંગમ વાવણી → વૃદ્ધિના તબક્કા → ફળદ્રુપતા → સિંચાઈ → પાકની સંભાળ → લણણીને આવરી લેતી એક સંરચિત માર્ગદર્શિકા પ્રદાન કરે છે, જેથી ખેડૂત હંમેશા જાણે છે કે આગળ શું કરવું અને ક્યારે કરવું.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>સમગ્ર ખેતી ચક્ર માટે એકલ, સંગઠિત સંદર્ભ બનાવે છે</li><li>મુખ્ય પ્રવૃત્તિઓના સમય વિશે અનિશ્ચિતતા ઘટાડે છે</li><li>ખેડૂતોને વધુ કાર્યક્ષમ રીતે અને યોગ્ય વૃદ્ધિના તબક્કે ઇનપુટ્સ લાગુ કરવામાં મદદ કરે છે</li><li>સિઝનમાં વધુ સુસંગત ખેતી પ્રથાને સમર્થન આપે છે</li></ul></div>"
    }
  },
  "f3": {
    "en": {
      "title": "Soil Intelligence & Soil Testing",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam supports two methods of obtaining soil information: manual entry of soil values, and device-based soil testing through an 8-parameter soil-testing device that can automatically collect and send soil data to the platform. In both cases, the system analyzes the soil information and provides soil health insights, nutrient deficiency information, crop suitability insights, and fertilizer guidance.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers may have soil test reports but not understand what the values mean or whether they are good or poor.</li><li>It is often unclear which nutrients are deficient and which crops are actually suitable for a given soil profile.</li><li>Soil information and crop selection frequently remain disconnected — a farmer may have a soil report and, separately, a crop preference, with no system linking the two.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>A farmer can either manually enter soil values (pH, nitrogen, phosphorus, potassium, organic carbon, and other available parameters) or obtain the same information directly from the 8-parameter soil-testing device, which sends readings to the platform automatically. KisanSangam then interprets these values in plain terms and connects them directly to crop suitability and nutrient guidance.</p></ul><h4>D. How It Works</h4><ul><p>Soil Data (Manual Entry or Device) → Soil Analysis → Soil Health Insights → Crop Suitability Assessment → Nutrient & Fertilizer Guidance</p></ul><h4>E. Inputs / Data Required</h4><ul><li>pH</li><li>Nitrogen (N)</li><li>Phosphorus (P)</li><li>Potassium (K)</li><li>Organic Carbon</li><li>Other available soil parameters (from manual entry or the 8-parameter device)</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam interprets each soil parameter against known healthy ranges to identify deficiencies or imbalances, then cross-references the overall soil profile against the requirements of candidate crops to determine relative suitability. Where a deficiency is identified, the system links it to specific, actionable nutrient or fertilizer guidance rather than leaving the farmer with raw numbers alone.</p></ul><h4>G. Output</h4><ul><li>Plain-language soil health summary</li><li>Identification of nutrient deficiencies, if any</li><li>Crop suitability comparison based on soil profile</li><li>Actionable nutrient and fertilizer guidance</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer enters his pH, Nitrogen, Phosphorus, and Potassium values. KisanSangam analyzes the values and determines that Groundnut is more suitable than Wheat for this soil profile. It also identifies a nutrient deficiency and provides suitable nutrient guidance. The same result can be obtained directly from the 8-parameter soil-testing device without manual entry.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Makes soil-test values understandable in plain terms</li><li>Directly connects soil condition to crop choice, closing a gap that currently exists between the two</li><li>Provides two flexible pathways for obtaining soil data — manual or device-based</li><li>Supports more targeted, efficient fertilizer use</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Expansion of supported soil parameters as device capabilities grow</li><li>Trend tracking of soil health across multiple seasons for the same field</li></ul></div>"
    },
    "hi": {
      "title": "मृदा बुद्धि एवं मृदा परीक्षण",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम मिट्टी की जानकारी प्राप्त करने के दो तरीकों का समर्थन करता है: मिट्टी के मूल्यों की मैन्युअल प्रविष्टि, और 8-पैरामीटर मिट्टी-परीक्षण उपकरण के माध्यम से डिवाइस-आधारित मिट्टी परीक्षण जो स्वचालित रूप से मिट्टी डेटा एकत्र कर सकता है और प्लेटफ़ॉर्म पर भेज सकता है। दोनों मामलों में, सिस्टम मिट्टी की जानकारी का विश्लेषण करता है और मिट्टी के स्वास्थ्य संबंधी अंतर्दृष्टि, पोषक तत्वों की कमी की जानकारी, फसल उपयुक्तता संबंधी अंतर्दृष्टि और उर्वरक मार्गदर्शन प्रदान करता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>किसानों के पास मिट्टी परीक्षण रिपोर्ट हो सकती है लेकिन वे समझ नहीं पाते कि मूल्यों का क्या मतलब है या वे अच्छे हैं या खराब।</li><li>यह अक्सर अस्पष्ट होता है कि किन पोषक तत्वों की कमी है और कौन सी फसलें वास्तव में किसी दिए गए मिट्टी प्रोफ़ाइल के लिए उपयुक्त हैं।</li><li>मिट्टी की जानकारी और फसल का चयन अक्सर असंबद्ध रहता है - एक किसान के पास मिट्टी की रिपोर्ट और, अलग से, फसल की प्राथमिकता हो सकती है, दोनों को जोड़ने वाली कोई प्रणाली नहीं है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>एक किसान या तो मैन्युअल रूप से मिट्टी के मूल्य (पीएच, नाइट्रोजन, फास्फोरस, पोटेशियम, कार्बनिक कार्बन और अन्य उपलब्ध पैरामीटर) दर्ज कर सकता है या 8-पैरामीटर मिट्टी-परीक्षण उपकरण से सीधे वही जानकारी प्राप्त कर सकता है, जो स्वचालित रूप से प्लेटफ़ॉर्म पर रीडिंग भेजता है। फिर किसानसंगम इन मूल्यों की स्पष्ट शब्दों में व्याख्या करता है और उन्हें सीधे फसल उपयुक्तता और पोषक तत्व मार्गदर्शन से जोड़ता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>मृदा डेटा (मैन्युअल प्रविष्टि या उपकरण) → मृदा विश्लेषण → मृदा स्वास्थ्य अंतर्दृष्टि → फसल उपयुक्तता मूल्यांकन → पोषक तत्व और उर्वरक मार्गदर्शन</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>पीएच</li><li>नाइट्रोजन (एन)</li><li>फास्फोरस (पी)</li><li>पोटेशियम (K)</li><li>जैविक कार्बन</li><li>अन्य उपलब्ध मिट्टी पैरामीटर (मैन्युअल प्रविष्टि या 8-पैरामीटर डिवाइस से)</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम कमियों या असंतुलन की पहचान करने के लिए ज्ञात स्वस्थ सीमाओं के विरुद्ध प्रत्येक मिट्टी पैरामीटर की व्याख्या करता है, फिर सापेक्ष उपयुक्तता निर्धारित करने के लिए उम्मीदवार फसलों की आवश्यकताओं के विरुद्ध समग्र मिट्टी प्रोफ़ाइल को क्रॉस-रेफ़र करता है। जहां कमी की पहचान की जाती है, सिस्टम किसान को केवल कच्चे नंबरों के साथ छोड़ने के बजाय इसे विशिष्ट, कार्रवाई योग्य पोषक तत्व या उर्वरक मार्गदर्शन से जोड़ता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>सरल भाषा में मृदा स्वास्थ्य सारांश</li><li>पोषक तत्वों की कमी की पहचान, यदि कोई हो</li><li>मृदा प्रोफ़ाइल के आधार पर फसल उपयुक्तता की तुलना</li><li>क्रियाशील पोषक तत्व एवं उर्वरक मार्गदर्शन</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान अपने पीएच, नाइट्रोजन, फास्फोरस और पोटेशियम मान दर्ज करता है। किसानसंगम मूल्यों का विश्लेषण करता है और निर्धारित करता है कि इस मिट्टी की स्थिति के लिए मूंगफली गेहूं की तुलना में अधिक उपयुक्त है। यह पोषक तत्वों की कमी की भी पहचान करता है और उपयुक्त पोषक तत्व मार्गदर्शन प्रदान करता है। वही परिणाम मैन्युअल प्रविष्टि के बिना सीधे 8-पैरामीटर मिट्टी-परीक्षण उ���करण से प्राप्त किया जा सकता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>मृदा-परीक्षण मूल्यों को स्पष्ट शब्दों में समझने योग्य बनाता है</li><li>मिट्टी की स्थिति को सीधे फसल की पसंद से जोड़ता है, जिससे दोनों के बीच वर्तमान में मौजूद अंतर समाप्त हो जाता है</li><li>मृदा डेटा प्राप्त करने के लिए दो लचीले रास्ते प्रदान करता है - मैनुअल या डिवाइस-आधारित</li><li>अधिक लक्षित, कुशल उर्वरक उपयोग का समर्थन करता है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>जैसे-जैसे डिवाइस की क्षमताएं बढ़ती हैं, समर्थित मिट्टी मापदंडों का विस्तार होता है</li><li>एक ही क्षेत्र के लिए कई मौसमों में मिट्टी के स्वास्थ्य की प्रवृत्ति पर नज़र रखना</li></ul></div>"
    },
    "gu": {
      "title": "સોઇલ ઇન્ટેલિજન્સ અને સોઇલ ટેસ્ટિંગ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ જમીનની માહિતી મેળવવાની બે પદ્ધતિઓનું સમર્થન કરે છે: માટીના મૂલ્યોની મેન્યુઅલ એન્ટ્રી, અને 8-પેરામીટર માટી-પરીક્ષણ ઉપકરણ દ્વારા ઉપકરણ-આધારિત માટી પરીક્ષણ જે આપમેળે પ્લેટફોર્મ પર માટીનો ડેટા એકત્રિત અને મોકલી શકે છે. બંને કિસ્સાઓમાં, સિસ્ટમ જમીનની માહિતીનું પૃથ્થકરણ કરે છે અને જમીનના આરોગ્યની જાણકારી, પોષક તત્ત્વોની ઉણપની માહિતી, પાકની યોગ્યતાની જાણકારી અને ખાતરનું માર્ગદર્શન પૂરું પાડે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ખેડૂતો પાસે માટી પરીક્ષણના અહેવાલો હોઈ શકે છે પરંતુ મૂલ્યોનો અર્થ શું છે અથવા તેઓ સારા છે કે નબળા છે તે સમજી શકતા નથી.</li><li>તે ઘણીવાર અસ્પષ્ટ હોય છે કે કયા પોષક તત્વોની ઉણપ છે અને કયા પાક ખરેખર આપેલ માટી પ્રોફાઇલ માટે યોગ્ય છે.</li><li>જમીનની માહિતી અને પાકની પસંદગી વારંવાર ડિસ્કનેક્ટ રહે છે - એક ખેડૂત પાસે માટીનો અહેવાલ અને અલગથી, પાકની પસંદગી હોઈ શકે છે, જેમાં કોઈ સિસ્ટમ બેને જોડતી નથી.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>ખેડૂત કાં તો માટીના મૂલ્યો (pH, નાઇટ્રોજન, ફોસ્ફરસ, પોટેશિયમ, કાર્બનિક કાર્બન અને અન્ય ઉપલબ્ધ પરિમાણો) મેન્યુઅલી દાખલ કરી શકે છે અથવા 8-પેરામીટર માટી-પરીક્ષણ ઉપકરણમાંથી સીધી જ માહિતી મેળવી શકે છે, જે પ્લેટફોર્મ પર આપમેળે રીડિંગ્સ મોકલે છે. કિસાનસંગમ પછી આ મૂલ્યોનું સાદા શબ્દોમાં અર્થઘટન કરે છે અને તેને પાકની યોગ્યતા અને પોષક તત્ત્વોના માર્ગદર્શન સાથે સીધું જોડે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>જમીનનો ડેટા (મેન્યુઅલ એન્ટ્રી અથવા ડિવાઇસ) → સોઇલ એનાલિસિસ → સોઇલ હેલ્થ ઇન્સાઇટ્સ → પાકની યોગ્યતાનું મૂલ્યાંકન → પોષક તત્વો અને ખાતર માર્ગદર્શન</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>pH</li><li>નાઇટ્રોજન (N)</li><li>ફોસ્ફરસ (P)</li><li>પોટેશિયમ (K)</li><li>ઓર્ગેનિક કાર્બન</li><li>અન્ય ઉપલબ્ધ માટી પરિમાણો (મેન્યુઅલ એન્ટ્રી અથવા 8-પેરામીટર ઉપકરણમાંથી)</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ ખામીઓ અથવા અસંતુલનને ઓળખવા માટે જાણીતી તંદુરસ્ત શ્રેણીઓ સામે દરેક માટી પરિમાણનું અર્થઘટન કરે છે, પછી સંબંધિત યોગ્યતા નક્કી કરવા માટે ઉમેદવાર પાકોની જરૂરિયાતો સામે એકંદર જમીનની રૂપરેખાને ક્રોસ-રેફરન્સ કરે છે. જ્યાં ઉણપની ઓળખ કરવામાં આવે છે, ત્યારે સિસ્ટમ તેને ચોક્કસ, કાર્યક્ષમ પોષક તત્ત્વો અથવા ખાતર માર્ગદર્શન સાથે જોડે છે, તેના બદલે ખેડૂતને કાચા નંબરો સાથે એકલા છોડી દે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>સાદી-ભાષા માટી આરોગ્ય સારાંશ</li><li>પોષક તત્ત્વોની ખામીઓની ઓળખ, જો કોઈ હોય તો</li><li>જમીનની રૂપરેખાના આધારે પાકની યોગ્યતાની સરખામણી</li><li>કાર્યક્ષમ પોષક તત્વો અને ખાતર માર્ગદર્શન</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>ખેડૂત તેના pH, નાઇટ્રોજન, ફોસ્ફરસ અને પોટેશિયમ મૂલ્યો દાખલ કરે છે. કિસાનસંગમ મૂલ્યોનું પૃથ્થકરણ કરે છે અને નક્કી કરે છે કે આ માટીના રૂપરેખા માટે ઘઉં કરતાં મગફળી વધુ યોગ્ય છે. તે પોષક તત્ત્વોની ઉણપને પણ ઓળખે છે અને યોગ્ય પોષક તત્ત્વોનું માર્ગદર્શન પૂરું પાડે છે. આ જ પરિણામ મેન્યુઅલ એન્ટ્રી વિના સીધા જ 8-પેરામીટર માટી-પરીક્ષણ ઉપકરણમાંથી મેળવી શકાય છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>માટી-પરીક્ષણ મૂલ્યોને સાદા શબ્દોમાં સમજી શકાય તેવું બનાવે છે</li><li>જમીનની સ્થિતિને પાકની પસંદગી સાથે સીધી રીતે જોડે છે, હાલમાં બંને વચ્ચેના અંતરને બંધ કરે છે</li><li>માટી ડેટા મેળવવા માટે બે લવચીક માર્ગો પૂરા પાડે છે - મેન્યુઅલ અથવા ઉપકરણ-આધારિત</li><li>વધુ લક્ષિત, કાર્યક્ષમ ખાતરના ઉપયોગને સમર્થન આપે છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>જેમ જેમ ઉપકરણની ક્ષમતાઓ વધે છે તેમ સપોર્ટેડ માટીના પરિમાણોનું વિસ્તરણ</li><li>એક જ ક્ષેત્ર માટે બહુવિધ ઋતુઓમાં જમીનના સ્વાસ્થ્યનું વલણ ટ્રેકિંગ</li></ul></div>"
    }
  },
  "f4": {
    "en": {
      "title": "Market Price Analysis — Live Mandi Rates",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam provides real-time market price analysis, showing nearby live mandi (market) prices based on the farmer's location. It considers live mandi rates, daily price fluctuations, current crop-wise selling prices, and proximity to the farmer.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers may sell their crops without knowing current market prices.</li><li>It is often unclear which nearby mandi is offering a better price for a given crop on a given day.</li><li>Price information, where available, is often not organized by proximity or presented in a way that supports a quick selling decision.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>Based on the farmer's location, KisanSangam retrieves live prices from nearby mandis for the relevant crop and presents them side by side, allowing the farmer to compare options before deciding where to sell.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Location → Nearby Mandis Identified → Live Prices Retrieved → Price Comparison Presented → Farmer Makes an Informed Selling Decision</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Farmer's location</li><li>Crop to be sold</li><li>Live mandi price data for nearby markets</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam identifies mandis within a reasonable distance of the farmer's location, retrieves current crop-wise prices for each, and organizes them for direct comparison, factoring in both price and proximity so the farmer can weigh a better price against the practical cost or effort of reaching a more distant market.</p></ul><h4>G. Output</h4><ul><li>A comparative list of nearby mandi prices for the relevant crop</li><li>Price fluctuation context (e.g., how prices are trending)</li><li>Proximity information for each listed mandi</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer has harvested tomatoes. KisanSangam checks nearby mandi prices and shows Mandi A at ₹22/kg and Mandi B at ₹17/kg. The farmer compares the two and makes a better-informed selling decision.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Removes guesswork from the selling decision</li><li>Helps farmers identify better-priced markets within practical reach</li><li>Supports timing decisions around daily price fluctuations</li><li>Increases transparency in an otherwise opaque part of the farming process</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Historical price trend charts for longer-term selling strategy</li><li>Predictive price movement indicators</li></ul></div>"
    },
    "hi": {
      "title": "बाज़ार मूल्य विश्लेषण - लाइव मंडी दरें",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम वास्तविक समय बाजार मूल्य विश्लेषण प्रदान करता है, जो किसान के स्थान के आधार पर आस-पास की लाइव मंडी (बाजार) कीमतें दिखाता है। यह लाइव मंडी दरों, दैनिक मूल्य में उतार-चढ़ाव, वर्तमान फसल-वार बिक्री मूल्य और किसान से निकटता पर विचार करता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>किसान मौजूदा बाजार कीमतों को जाने बिना अपनी फसल बेच सकते हैं।</li><li>यह अक्सर अस्पष्ट होता है कि कौन सी नजदीकी मंडी किसी निश्चित दिन किसी फसल के लिए बेहतर कीमत दे रही है।</li><li>मूल्य की जानकारी, जहां उपलब्ध हो, अक्सर निकटता के आधार पर व्यवस्थित नहीं की जाती है या इस तरह से प्रस्तुत नहीं की जाती है जो त्वरित बिक्री निर्णय का समर्थन करती हो।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसान के स्थान के आधार पर, किसानसंगम संबंधित फसल के लिए आस-पास की मंडियों से लाइव कीमतें प्राप्त करता है और उन्हें एक साथ प्रस्तुत करता है, जिससे किसान को यह तय करने से पहले विकल्पों की तुलना करने की अनुमति मिलती है कि कहां बेचना है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान का स्थान → आसपास की मंडियों की पहचान → लाइव कीमतें पुनर्प्राप्त → मूल्य तुलना प्रस्तुत → किसान बिक्री का सोच-समझकर निर्णय लेता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>किसान का स्थान</li><li>फसल बिकनी है</li><li>आस-पास के बाज़ारों के लिए लाइव मंडी मूल्य डेटा</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम किसान के स्थान से उचित दूरी के भीतर मंडियों की पहचान करता है, प्रत्येक के लिए वर्तमान फसल-वार कीमतें प्राप्त करता है, और उन्हें प्रत्यक्ष तुलना के लिए व्यवस्थित करता है, कीमत और निकटता दोनों को ध्यान में रखता है ताकि किसान अधिक दूर के बाजार तक पहुंचने की व्यावहारिक लागत या प्रयास के मुकाबले बेहतर कीमत का आकलन कर सके।</p></ul><h4>जी. आउटपुट</h4><ul><li>संबंधित फसल के लिए नजदीकी मंडी कीमतों की तुलनात्मक सूची</li><li>मूल्य में उतार-चढ़ाव का संदर्भ (उदाहरण के लिए, कीमतें कैसे चलन में हैं)</li><li>प्रत्येक सूचीबद्ध मंडी के लिए निकटता की जानकारी</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान ने टमाटर की फसल काट ली है. किसानसंगम नजदीकी मंडी कीमतों की जांच करता है और मंडी ए को ₹22/किग्रा और मंडी बी को ₹17/किग्रा दिखाता है। किसान दोनों की तुलना करता है और बेहतर जानकारी के साथ बिक्री का निर्णय लेता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>विक्रय निर्णय से अनुमान हटा देता है</li><li>किसानों को व्यावहारिक पहुंच के भीतर बेहतर कीमत वाले बाजारों की पहचान करने में मदद करता है</li><li>दैनिक मूल्य में उतार-चढ़ाव के आसपास समय संबंधी निर्णयों का समर्थन करता है</li><li>खेती की प्रक्रिया के अन्यथा अपारदर्शी हिस्से में पारदर्शिता बढ़ती है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>लंबी अवधि की बिक्री रणनीति के लिए ऐतिहासिक मूल्य प्रवृत्ति चार्ट</li><li>पूर्वानुमानित मूल्य आंदोलन संकेतक</li></ul></div>"
    },
    "gu": {
      "title": "બજાર કિંમત વિશ્લેષણ - જીવંત મંડી દરો",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ વાસ્તવિક સમયના બજાર ભાવ વિશ્લેષણ પ્રદાન કરે છે, જે ખેડૂતના સ્થાનના આધારે નજીકના જીવંત મંડી (બજાર) ભાવ દર્શાવે છે. તે જીવંત મંડી દરો, દૈનિક ભાવની વધઘટ, વર્તમાન પાક મુજબના વેચાણ ભાવો અને ખેડૂતની નિકટતાને ધ્યાનમાં લે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ખેડૂતો વર્તમાન બજાર કિંમતો જાણ્યા વિના તેમનો પાક વેચી શકે છે.</li><li>તે ઘણીવાર અસ્પષ્ટ હોય છે કે નજીકની કઈ મંડી આપેલ દિવસે આપેલ પાક માટે વધુ સારી કિંમત ઓફર કરે છે.</li><li>કિંમતની માહિતી, જ્યાં ઉપલબ્ધ હોય, તે ઘણીવાર નિકટતા દ્વારા ગોઠવવામાં આવતી નથી અથવા તે રીતે રજૂ કરવામાં આવતી નથી કે જે ઝડપી વેચાણના નિર્ણયને સમર્થન આપે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>ખેડૂતના સ્થાનના આધારે, કિસાનસંગમ સંબંધિત પાક માટે નજીકની મંડીઓમાંથી લાઇવ ભાવો મેળવે છે અને તેમને સાથે-સાથે રજૂ કરે છે, જેનાથી ખેડૂત ક્યાં વેચવું તે નક્કી કરતા પહેલા વિકલ્પોની તુલના કરી શકે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત સ્થાન → નજીકની મંડીઓ ઓળખાઈ → જીવંત કિંમતો પુનઃપ્રાપ્ત થઈ</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>ખેડૂતનું સ્થાન</li><li>વેચવાનો પાક</li><li>નજીકના બજારો માટે લાઇવ મંડી કિંમત ડેટા</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ ખેડૂતના સ્થાનના વાજબી અંતરની અંદર મંડીઓને ઓળખે છે, દરેક માટે વર્તમાન પાક મુજબના ભાવો પુનઃપ્રાપ્ત કરે છે, અને ભાવ અને નિકટતા બંનેને ધ્યાનમાં રાખીને સીધી સરખામણી માટે તેમને ગોઠવે છે જેથી ખેડૂત વધુ દૂરના બજાર સુધી પહોંચવાના વ્યવહારિક ખર્ચ અથવા પ્રયત્નો સામે વધુ સારી કિંમતનું વજન કરી શકે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>સંબંધિત પાક માટે નજીકની મંડીમાં કિંમતોની તુલનાત્મક સૂચિ</li><li>ભાવની વધઘટ સંદર્ભ (દા.ત., કિંમતો કેવી રીતે વલણમાં છે)</li><li>દરેક સૂચિબદ્ધ મંડી માટે નિકટતા માહિતી</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂતે ટામેટાંની કાપણી કરી છે. કિસાનસંગમ નજીકની મંડીની કિંમતો તપાસે છે અને મંડી A ₹22/kg અને મંડી B ₹17/kg બતાવે છે. ખેડૂત બંનેની તુલના કરે છે અને વધુ સારી રીતે જાણકાર વેચાણનો નિર્ણય લે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>વેચાણના નિર્ણયમાંથી અનુમાનને દૂર કરે છે</li><li>વ્યાવહારિક પહોંચમાં ખેડૂતોને વધુ સારી કિંમતના બજારો ઓળખવામાં મદદ કરે છે</li><li>દૈનિક ભાવની વધઘટની આસપાસ સમયના નિર્ણયોને સમર્થન આપે છે</li><li>ખેતી પ્રક્રિયાના અન્યથા અપારદર્શક ભાગમાં પારદર્શિતા વધારે છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>લાંબા ગાળાની વેચાણ વ્યૂહરચના માટે ઐતિહાસિક ભાવ વલણ ચાર્ટ</li><li>અનુમાનિત ભાવ ચળવળ સૂચકાંકો</li></ul></div>"
    }
  },
  "f5": {
    "en": {
      "title": "Digital Land Leasing",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam provides a digital platform connecting landowners and farmers for agricultural land leasing. Landowners can list agricultural land available for lease, and farmers can search for suitable land based on details such as location, area, soil type, agricultural suitability, lease details, and landowner information.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers who want additional agricultural land often depend on local contacts, word of mouth, or personal networks.</li><li>Landowners with unused or underused land often struggle to find suitable farmers to lease it to.</li><li>There is no organized, searchable way to match agricultural land supply with farmer demand.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>KisanSangam allows landowners to list their land with relevant details, and allows farmers to search and filter listings based on their specific requirements, then connect directly with the landowner.</p></ul><h4>D. How It Works</h4><ul><p>Landowner Lists Land (Location, Area, Soil Type, Terms) → Farmer Searches by Requirement → Farmer Reviews Listing Details → Farmer Connects with Landowner</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Land location</li><li>Land area</li><li>Soil type</li><li>Lease terms</li><li>Landowner contact/listing information</li><li>Farmer's search criteria (location, area required, crop intent)</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam matches a farmer's search criteria against available land listings, surfacing land that fits the farmer's location, area, and soil requirements, and presenting the relevant listing and landowner details needed to initiate contact.</p></ul><h4>G. Output</h4><ul><li>Searchable listings of available agricultural land</li><li>Land details: location, area, soil type, agricultural suitability, lease terms</li><li>A direct connection pathway to the landowner</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer needs 3 acres of additional agricultural land. He searches KisanSangam, finds suitable land, checks its details and soil type, and connects with the landowner directly through the platform.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Creates an organized, searchable alternative to informal land-finding networks</li><li>Helps landowners find suitable farmers for otherwise idle land</li><li>Surfaces relevant land details (soil type, suitability) upfront, before contact is made</li></ul></div>"
    },
    "hi": {
      "title": "डिजिटल भूमि पट्टे",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम कृषि भूमि पट्टे के लिए भूमि मालिकों और किसानों को जोड़ने वाला एक डिजिटल मंच प्रदान करता है। भूमि मालिक पट्टे के लिए उपलब्ध कृषि भूमि की सूची बना सकते हैं, और किसान स्थान, क्षेत्र, मिट्टी के प्रकार, कृषि उपयुक्तता, पट्टे के विवरण और भूमि मालिक की जानकारी जैसे विवरणों के आधार पर उपयुक्त भूमि की खोज कर सकते हैं।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>जो किसान अतिरिक्त कृषि भूमि चाहते हैं वे अक्सर स्थानीय संपर्कों, मौखिक चर्चा या व्यक्तिगत नेटवर्क पर निर्भर रहते हैं।</li><li>जिन भूस्वामियों के पास अप्रयुक्त या कम उपयोग की गई भूमि है, उन्हें अक्सर इसे पट्टे पर देने के लिए उपयुक्त किसानों को ढूंढने में कठिनाई होती है।</li><li>कृषि भूमि की आपूर्ति को किसान की मांग से मिलाने का कोई संगठित, खोजने योग्य तरीका नहीं है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसानसंगम भूमि मालिकों को प्रासंगिक विवरण के साथ अपनी भूमि सूचीबद्ध करने की अनुमति देता है, और किसानों को उनकी विशिष्ट आवश्यकताओं के आधार पर लिस्टिंग खोजने और फ़िल्टर करने की अनुमति देता है, फिर सीधे भूमि मालिक से जुड़ता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>भूस्वामी भूमि की सूची (स्थान, क्षेत्र, मिट्टी का प्रकार, शर्तें) → आवश्यकता के अनुसार किसान खोजें → किसान समीक्षा सूची विवरण → किसान भूस्वामी से जुड़ता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>भूमि स्थान</li><li>भूमि क्षेत्र</li><li>मिट्टी का प्रकार</li><li>लीज़ की शर्तें</li><li>भूस्वामी संपर्क/सूचीकरण जानकारी</li><li>किसान खोज मानदंड (स्थान, आवश्यक क्षेत्र, फसल का इरादा)</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम उपलब्ध भूमि सूची के आधार पर किसान के खोज मानदंड से मेल खाता है, किसान के स्थान, क्षेत्र और मिट्टी की आवश्यकताओं के अनुरूप भूमि का पता लगाता है, और संपर्क शुरू करने के लिए आवश्यक प्रासंगिक सूची और भूमि मालिक का विवरण प्रस्तुत करता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>उपलब्ध कृषि भूमि की खोजने योग्य सूची</li><li>भूमि विवरण: स्थान, क्षेत्रफल, मिट्टी का प्रकार, कृषि उपयुक्तता, पट्टे की शर्तें</li><li>ज़मीन मालिक से सीधा संपर्क मार्ग</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान को 3 एकड़ अतिरिक्त कृषि भूमि की आवश्यकता होती है। वह किसानसंगम की खोज करते हैं, उपयुक्त भूमि ढूंढते हैं, उसके विवरण और मिट्टी के प्रकार की जांच करते हैं, और मंच के माध्यम से सीधे भूमि मालिक से जुड़ते हैं।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>अनौपचारिक भूमि-खोज नेटवर्क के लिए एक संगठित, खोजने योग्य विकल्प बनाता है</li><li>भूमि मालिकों को बेकार पड़ी भूमि के लिए उपयुक्त किसान ढूंढने में मदद करता है</li><li>संपर्क करने से पहले, प्रासंगिक भूमि विवरण (मिट्टी का प्रकार, उपयुक्तता) सामने रखें</li></ul></div>"
    },
    "gu": {
      "title": "ડિજિટલ જમીન લીઝિંગ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ ખેતીની જમીન ભાડે આપવા માટે જમીનમાલિકો અને ખેડૂતોને જોડતું ડિજિટલ પ્લેટફોર્મ પૂરું પાડે છે. જમીનમાલિકો લીઝ માટે ઉપલબ્ધ ખેતીની જમીનની યાદી બનાવી શકે છે અને ખેડૂતો સ્થાન, વિસ્તાર, જમીનનો પ્રકાર, કૃષિ યોગ્યતા, લીઝની વિગતો અને જમીનમાલિકની માહિતી જેવી વિગતોના આધારે યોગ્ય જમીન શોધી શકે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>જે ખેડૂતોને વધારાની ખેતીની જમીન જોઈએ છે તેઓ મોટાભાગે સ્થાનિક સંપર્કો, મૌખિક શબ્દો અથવા વ્યક્તિગત નેટવર્ક પર આધાર રાખે છે.</li><li>બિનઉપયોગી અથવા બિનઉપયોગી જમીન ધરાવતા જમીનમાલિકો વારંવાર તેને ભાડે આપવા માટે યોગ્ય ખેડૂતો શોધવા માટે સંઘર્ષ કરે છે.</li><li>ખેડૂતોની માંગ સાથે કૃષિ જમીનના પુરવઠાને મેચ કરવા માટે કોઈ સંગઠિત, શોધી શકાય તેવી રીત નથી.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>કિસાનસંગમ જમીનમાલિકોને તેમની જમીનને સંબંધિત વિગતો સાથે સૂચિબદ્ધ કરવાની મંજૂરી આપે છે, અને ખેડૂતોને તેમની ચોક્કસ જરૂરિયાતોના આધારે સૂચિઓ શોધવા અને ફિલ્ટર કરવાની મંજૂરી આપે છે, પછી જમીનમાલિક સાથે સીધા જ જોડાય છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>જમીનમાલિક જમીનની યાદી આપે છે (સ્થાન, વિસ્તાર, જમીનનો પ્રકાર, શરતો) → ખેડૂત જરૂરિયાત મુજબ શોધ કરે છે → ખેડૂત સમીક્ષાઓ યાદીની વિગતો → ખેડૂત જમીન માલિક સાથે જોડાય છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>જમીન સ્થાન</li><li>જમીન વિસ્તાર</li><li>માટીનો પ્રકાર</li><li>લીઝ શરતો</li><li>જમીનમાલિક સંપર્ક/સૂચિની માહિતી</li><li>ખેડૂત શોધ માપદંડ (સ્થાન, જરૂરી વિસ્તાર, પાકનો હેતુ)</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ ઉપલબ્ધ જમીન સૂચિઓ સામે ખેડૂતના શોધ માપદંડ સાથે મેળ ખાય છે, જમીનની સપાટી કે જે ખેડૂતના સ્થાન, વિસ્તાર અને માટીની જરૂરિયાતોને અનુરૂપ હોય છે, અને સંપર્ક શરૂ કરવા માટે જરૂરી સંબંધિત સૂચિ અને જમીન માલિકની વિગતો રજૂ કરે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>ઉપલબ્ધ ખેતીની જમીનની શોધી શકાય તેવી સૂચિઓ</li><li>જમીનની વિગતો: સ્થાન, વિસ્તાર, જમીનનો પ્રકાર, કૃષિ યોગ્યતા, લીઝની શરતો</li><li>જમીનમાલિક માટે સીધો જોડાણ માર્ગ</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂતને 3 એકર વધારાની ખેતીની જમીનની જરૂર છે. તે કિસાનસંગમની શોધ કરે છે, યોગ્ય જમીન શોધે છે, તેની વિગતો અને જમીનનો પ્રકાર તપાસે છે, અને પ્લેટફોર્મ દ્વારા સીધા જ જમીન માલિક સાથે જોડાય છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>અનૌપચારિક જમીન-શોધ નેટવર્ક માટે સંગઠિત, શોધી શકાય તેવા વિકલ્પ બનાવે છે</li><li>જમીનમાલિકોને અન્યથા નિષ્ક્રિય જમીન માટે યોગ્ય ખેડૂતો શોધવામાં મદદ કરે છે</li><li>સંપર્ક કરવામાં આવે તે પહેલાં, સંબંધિત જમીનની વિગતો (માટીનો પ્રકાર, અનુકુળતા) ઉપર સપાટી કરો</li></ul></div>"
    }
  },
  "f6": {
    "en": {
      "title": "Weather-Based Farming Alerts",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam provides location-based weather information and alerts, including warnings for heavy rainfall, extreme heat, storms, and other adverse weather conditions. The system also provides farming suggestions based on upcoming weather, turning weather data into an actionable farming decision.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers may not receive timely, location-specific weather information needed to decide when to irrigate, spray, sow, or protect their crops.</li><li>General weather forecasts are often not connected to specific farming actions, leaving the farmer to interpret the implications themselves.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>KisanSangam monitors weather conditions for the farmer's location and issues alerts ahead of adverse conditions, along with a specific recommended action rather than raw weather data alone.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Location → Weather Monitoring → Adverse Condition Detected → Alert with Recommended Action → Farmer Adjusts Farming Activity</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Farmer's location</li><li>Planned farming activity (e.g., spraying, irrigation), where provided</li><li>Weather forecast data for the location</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam continuously checks forecast data for the farmer's location against thresholds for adverse conditions (heavy rainfall, extreme heat, storms). When a relevant condition is detected, the system translates it into a specific, actionable suggestion tied to common farming activities, rather than simply displaying a forecast.</p></ul><h4>G. Output</h4><ul><li>Location-specific weather alerts</li><li>Actionable farming suggestions tied to the alert (e.g., postpone spraying, prepare drainage)</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer plans to spray pesticides tomorrow. KisanSangam detects heavy rainfall expected in his area and alerts him: \"Postpone spraying because heavy rain is expected.\" The farmer adjusts his plan accordingly.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Converts weather forecasts into direct, actionable farming decisions</li><li>Helps prevent wasted inputs (e.g., pesticide washed away by rain)</li><li>Supports better timing of time-sensitive activities</li><li>Reduces weather-related crop risk</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>More granular, hyperlocal forecasting as data sources expand</li><li>Expanded alert categories based on additional crop-specific risk factors</li></ul></div>"
    },
    "hi": {
      "title": "मौसम आधारित खेती संबंधी चेतावनियाँ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम स्थान-आधारित मौसम की जानकारी और अलर्ट प्रदान करता है, जिसमें भारी वर्षा, अत्यधिक गर्मी, तूफान और अन्य प्रतिकूल मौसम स्थितियों की चेतावनी शामिल है। यह प्रणाली आगामी मौसम के आधार पर खेती के सुझाव भी प्रदान करती है, जिससे मौसम के आंकड़ों को कार्रवाई योग्य कृषि निर्णय में बदल दिया जाता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>किसानों को अपनी फसलों की सिंचाई, स्प्रे, बुआई या सुरक्षा कब करनी है, यह तय करने के लिए आवश्यक समय पर, स्थान-विशिष्ट मौसम की जानकारी नहीं मिल पाती है।</li><li>सामान्य मौसम पूर्वानुमान अक्सर विशिष्ट कृषि कार्यों से जुड़े नहीं होते हैं, जिससे किसान को स्वयं ही इसके निहितार्थ की व्याख्या करनी पड़ती है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसानसंगम किसान के स्थान के लिए मौसम की स्थिति की निगरानी करता है और प्रतिकूल परिस्थितियों से पहले अलर्ट जारी करता है, साथ ही केवल कच्चे मौसम डेटा के बजाय एक विशिष्ट अनुशंसित कार्रवाई भी करता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान का स्थान → मौसम की निगरानी → प्रतिकूल स्थिति का पता चला → अनुशंसित कार्रवाई के साथ अलर्ट → किसान खेती की गतिविधि को समायोजित करता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>किसान का स्थान</li><li>नियोजित कृषि गतिविधि (जैसे, छिड़काव, सिंचाई), जहां प्रदान की गई हो</li><li>स्थान के लिए मौसम पूर्वानुमान डेटा</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम प्रतिकूल परिस्थितियों (भारी वर्षा, अत्यधिक गर्मी, तूफान) के लिए किसान के स्थान के पूर्वानुमान डेटा की लगातार जांच करता है। जब एक प्रासंगिक स्थिति का पता चलता है, तो सिस्टम केवल पूर्वानुमान प्रदर्शित करने के बजाय इसे सामान्य कृषि गतिविधियों से जुड़े एक विशिष्ट, कार्रवाई योग्य सुझाव में बदल देता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>स्थान-विशिष्ट मौसम अलर्ट</li><li>चेतावनी से जुड़े कार्रवाई योग्य खेती के सुझाव (उदाहरण के लिए, छिड़काव स्थगित करें, जल निकासी तैयार करें)</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान कल कीटनाशकों का छिड़काव करने की योजना बना रहा है। किसानसंगम को पता चलता है कि उसके क्षेत्र में भारी बारिश होने की संभावना है और वह उसे सचेत करता है: \"छिड़काव स्थगित कर दें क्योंकि भारी बारिश की आशंका है।\" किसान अपनी योजना को तदनुसार समायोजित करता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>मौसम के पूर्वानुमानों को प्रत्यक्ष, कार्रवाई योग्य कृषि निर्णयों में परिवर्तित करता है</li><li>इनपुट की बर्बादी को रोकने में मदद करता है (उदाहरण के लिए, बारिश से कीटनाशक बह जाते हैं)</li><li>समय-संवेदनशील गतिविधियों के बेहतर समय का समर्थन करता है</li><li>मौसम संबंधी फसल जोखिम को कम करता है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>डेटा स्रोतों के विस्तार के साथ अधिक विस्तृत, हाइपरलोकल पूर्वानुमान</li><li>अतिरिक्त फसल-विशिष्ट जोखिम कारकों के आधार पर विस्तारित चेतावनी श्रेणियां</li></ul></div>"
    },
    "gu": {
      "title": "હવામાન-આધારિત ખેતી ચેતવણીઓ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ સ્થાન-આધારિત હવામાન માહિતી અને ચેતવણીઓ પ્રદાન કરે છે, જેમાં ભારે વરસાદ, ભારે ગરમી, તોફાન અને અન્ય પ્રતિકૂળ હવામાન પરિસ્થિતિઓ માટેની ચેતવણીઓનો સમાવેશ થાય છે. આ સિસ્ટમ આગામી હવામાનના આધારે ખેતીના સૂચનો પણ પ્રદાન કરે છે, જે હવામાનના ડેટાને એક કાર્યક્ષમ ખેતી નિર્ણયમાં ફેરવે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ખેડૂતોને તેમના પાકને સિંચાઈ, છંટકાવ, વાવણી અથવા રક્ષણ ક્યારે કરવું તે નક્કી કરવા માટે જરૂરી સમયસર, સ્થાન-વિશિષ્ટ હવામાન માહિતી પ્રાપ્ત થઈ શકશે નહીં.</li><li>સામાન્ય હવામાનની આગાહીઓ ઘણીવાર ચોક્કસ ખેતીની ક્રિયાઓ સાથે જોડાયેલી હોતી નથી, જેના કારણે ખેડૂત પોતે જ અસરોનું અર્થઘટન કરે છે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>કિસાનસંગમ ખેડૂતના સ્થાન માટે હવામાનની સ્થિતિનું નિરીક્ષણ કરે છે અને પ્રતિકૂળ પરિસ્થિતિઓથી પહેલા ચેતવણીઓ જારી કરે છે, સાથે જ કાચા હવામાનના ડેટાને બદલે ચોક્કસ ભલામણ કરેલ પગલાં સાથે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત સ્થાન → હવામાન દેખરેખ → પ્રતિકૂળ સ્થિતિ મળી → ભલામણ કરેલ કાર્યવાહી સાથે ચેતવણી → ખેડૂત ખેતી પ્રવૃત્તિને સમાયોજિત કરે છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>ખેડૂતનું સ્થાન</li><li>આયોજિત ખેતી પ્રવૃત્તિ (દા.ત., છંટકાવ, સિંચાઈ), જ્યાં પૂરી પાડવામાં આવે છે</li><li>સ્થાન માટે હવામાન આગાહી ડેટા</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ પ્રતિકૂળ પરિસ્થિતિઓ (ભારે વરસાદ, ભારે ગરમી, વાવાઝોડા) માટે થ્રેશોલ્ડ સામે ખેડૂતના સ્થાન માટે અનુમાન ડેટાની સતત તપાસ કરે છે. જ્યારે કોઈ સંબંધિત સ્થિતિ શોધી કાઢવામાં આવે છે, ત્યારે સિસ્ટમ ફક્ત આગાહી દર્શાવવાને બદલે, સામાન્ય ખેતી પ્રવૃત્તિઓ સાથે જોડાયેલ ચોક્કસ, કાર્યક્ષમ સૂચનમાં અનુવાદ કરે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>સ્થાન-વિશિષ્ટ હવામાન ચેતવણીઓ</li><li>ચેતવણી સાથે જોડાયેલા કાર્યક્ષમ ખેતી સૂચનો (દા.ત., છંટકાવ મુલતવી રાખો, ડ્રેનેજ તૈયાર કરો)</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂત આવતીકાલે જંતુનાશકોનો છંટકાવ કરવાની યોજના ધરાવે છે. કિસાનસંગમ તેના વિસ્તારમાં ભારે વરસાદની અપેક્ષા રાખે છે અને તેને ચેતવણી આપે છે: \"ભારે વરસાદની અપેક્ષા હોવાથી છંટકાવ મોકૂફ રાખો.\" ખેડૂત તેની યોજના અનુસાર ગોઠવણ કરે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>હવામાનની આગાહીઓને સીધા, કાર્યક્ષમ ખેતીના નિર્ણયોમાં રૂપાંતરિત કરે છે</li><li>વેસ્ટ ઇનપુટ્સને રોકવામાં મદદ કરે છે (દા.ત., વરસાદથી જંતુનાશક ધોવાઇ જાય છે)</li><li>સમય-સંવેદનશીલ પ્રવૃત્તિઓના વધુ સારા સમયને સમર્થન આપે છે</li><li>હવામાન સંબંધિત પાક જોખમ ઘટાડે છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>વધુ દાણાદાર, હાઇપરલોકલ આગાહી જેમ જેમ ડેટા સ્ત્રોતો વિસ્તરે છે</li><li>વધારાના પાક-વિશિષ્ટ જોખમ પરિબળોના આધારે વિસ્તૃત ચેતવણી શ્રેણીઓ</li></ul></div>"
    }
  },
  "f7": {
    "en": {
      "title": "Farm Profit & Cost Calculator",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam helps farmers estimate the financial outcome of different crops by calculating cultivation cost, input costs, expected production, expected revenue, estimated profit, and cost per acre/hectare. It also allows direct comparison between crops.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers may not clearly know how much a crop will cost to grow, how much production to expect, what revenue it might generate, or what profit is likely.</li><li>Without this information, crop decisions are often made without a clear financial basis.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>KisanSangam calculates the expected cost, production, revenue, and profit for a given crop based on farm-specific inputs, and allows the farmer to compare these figures across multiple candidate crops before committing to one.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Selects Crop(s) to Compare → Farm & Input Data Entered → Cost, Production, Revenue and Profit Calculated → Side-by-Side Comparison → Farmer Makes Financial Decision</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Selected crop(s)</li><li>Land area</li><li>Expected input costs (seed, fertilizer, labour, irrigation, etc.)</li><li>Expected yield/production estimates</li><li>Prevailing or expected market price</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam aggregates estimated input costs against expected production and prevailing market prices to compute expected revenue and profit for each crop, standardized on a per-acre or per-hectare basis so that crops of different scales can be compared fairly.</p></ul><h4>G. Output</h4><ul><li>Estimated cultivation cost</li><li>Expected production</li><li>Expected revenue</li><li>Estimated profit</li><li>Cost and profit per acre/hectare</li><li>Side-by-side comparison across crops</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer is choosing between Tomato and Wheat. KisanSangam estimates the cost, production, revenue, and profit for each. The farmer compares both options and makes a more informed decision about which crop to grow.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Brings financial planning into the crop-selection process before cultivation begins</li><li>Allows direct, structured comparison between crop options</li><li>Reduces the risk of committing to a crop without understanding its likely financial outcome</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Integration of actual recorded costs from Digital Farm Management to refine future estimates</li></ul></div>"
    },
    "hi": {
      "title": "कृषि लाभ और लागत कैलकुलेटर",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम किसानों को खेती की लागत, इनपुट लागत, अपेक्षित उत्पादन, अपेक्षित राजस्व, अनुमानित लाभ और प्रति एकड़/हेक्टेयर लागत की गणना करके विभिन्न फसलों के वित्तीय परिणाम का अनुमान लगाने में मदद करता है। यह फसलों के बीच सीधी तुलना की भी अनुमति देता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>किसानों को स्पष्ट रूप से पता नहीं हो सकता है कि किसी फसल को उगाने में कितनी लागत आएगी, कितना उत्पादन होने की उम्मीद है, कितना राजस्व उत्पन्न हो सकता है, या कितना लाभ होने की संभावना है।</li><li>इस जानकारी के बिना, फसल संबंधी निर्णय अक्सर स्पष्ट वित्तीय आधार के बिना किए जाते हैं।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसानसंगम खेत-विशिष्ट इनपुट के आधार पर किसी दी गई फसल के लिए अपेक्षित लागत, उत्पादन, राजस्व और लाभ की गणना करता है, और किसान को किसी एक फसल के लिए प्रतिबद्ध होने से पहले कई उम्मीदवार फसलों में इन आंकड़ों की तुलना करने की अनुमति देता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान तुलना करने के लिए फसल का चयन करता है → दर्ज किया गया खेत और इनपुट डेटा → लागत, उत्पादन, राजस्व और लाभ की गणना → साथ-साथ तुलना → किसान वित्तीय निर्णय लेता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>चयनित फसल</li><li>भूमि क्षेत्र</li><li>अपेक्षित इनपुट लागत (बीज, उर्वरक, श्रम, सिंचाई, आदि)</li><li>अपेक्षित उपज/उत्पादन अनुमान</li><li>प्रचलित या अपेक्षित बाज़ार मूल्य</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम प्रत्येक फसल के लिए अपेक्षित राजस्व और लाभ की गणना करने के लिए अपेक्षित उत्पादन और प्रचलित बाजार कीमतों के मुकाबले अनुमानित इनपुट लागत को प्रति एकड़ या प्रति हेक्टेयर के आधार पर मानकीकृत करता है ताकि विभिन्न पैमाने की फसलों की तुलना निष्पक्ष रूप से की जा सके।</p></ul><h4>जी. आउटपुट</h4><ul><li>अनुमानित खेती लागत</li><li>अपेक्षित उत्पादन</li><li>अपेक्षित राजस्व</li><li>अनुमानित लाभ</li><li>प्रति एकड़/हेक्टेयर लागत और लाभ</li><li>सभी फसलों की एक साथ तुलना</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान टमाटर और गेहूं के बीच चयन कर रहा है। किसानसंगम प्रत्येक के लिए लागत, उत्पादन, राजस्व और लाभ का अनुमान लगाता है। किसान दोनों विकल्पों की तुलना करता है और कौन सी फसल उगानी है इसके बारे में अधिक जानकारीपूर्ण निर्णय लेता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>खेती शुरू होने से पहले फसल-चयन प्रक्रिया में वित्तीय नियोजन लाता है</li><li>फसल विकल्पों के बीच प्रत्यक्ष, संरचित तुलना की अनुमति देता है</li><li>किसी फसल के संभावित वित्तीय परिणाम को समझे बिना उस पर काम करने का जोखिम कम हो जाता है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>भविष्य के अनुमानों को परिष्कृत करने के लिए डिजिटल फार्म प्रबंधन से वास्तविक दर्ज लागतों का एकीकरण</li></ul></div>"
    },
    "gu": {
      "title": "ફાર્મ નફો અને ખર્ચ કેલ્ક્યુલેટર",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ ખેડૂતોને ખેતી ખર્ચ, ઇનપુટ ખર્ચ, અપેક્ષિત ઉત્પાદન, અપેક્ષિત આવક, અંદાજિત નફો અને પ્રતિ એકર/હેક્ટર ખર્ચની ગણતરી કરીને વિવિધ પાકોના નાણાકીય પરિણામોનો અંદાજ કાઢવામાં મદદ કરે છે. તે પાક વચ્ચે સીધી સરખામણી કરવાની પણ પરવાનગી આપે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ખેડૂતો સ્પષ્ટપણે જાણતા નથી કે પાક ઉગાડવામાં કેટલો ખર્ચ થશે, કેટલું ઉત્પાદન અપેક્ષિત છે, તેનાથી કઈ આવક થઈ શકે છે અથવા નફો કેટલો છે.</li><li>આ માહિતી વિના, પાકના નિર્ણયો ઘણીવાર સ્પષ્ટ નાણાકીય આધાર વિના લેવામાં આવે છે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>કિસાનસંગમ ખેત-વિશિષ્ટ ઇનપુટ્સના આધારે આપેલ પાક માટે અપેક્ષિત ખર્ચ, ઉત્પાદન, આવક અને નફાની ગણતરી કરે છે, અને ખેડૂતને એક કરતાં પહેલાં એકથી વધુ ઉમેદવાર પાકોમાં આ આંકડાઓની તુલના કરવાની મંજૂરી આપે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત સરખામણી કરવા માટે પાક પસંદ કરે છે → ફાર્મ અને ઇનપુટ ડેટા દાખલ કર્યો → ખર્ચ, ઉત્પાદન, આવક અને નફાની ગણતરી</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>પસંદ કરેલ પાક(ઓ)</li><li>જમીન વિસ્તાર</li><li>અપેક્ષિત ઇનપુટ ખર્ચ (બિયારણ, ખાતર, મજૂરી, સિંચાઈ, વગેરે)</li><li>અપેક્ષિત ઉપજ/ઉત્પાદન અંદાજ</li><li>પ્રવર્તમાન અથવા અપેક્ષિત બજાર કિંમત</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ દરેક પાક માટે અપેક્ષિત આવક અને નફાની ગણતરી કરવા માટે અપેક્ષિત ઉત્પાદન અને પ્રવર્તમાન બજાર કિંમતો સામે અંદાજિત ઈનપુટ ખર્ચને એકત્ર કરે છે, જે પ્રતિ એકર અથવા પ્રતિ હેક્ટર ધોરણે પ્રમાણિત કરવામાં આવે છે જેથી વિવિધ સ્કેલના પાકની તુલના યોગ્ય રીતે કરી શકાય.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>અંદાજિત ખેતી ખર્ચ</li><li>અપેક્ષિત ઉત્પાદન</li><li>અપેક્ષિત આવક</li><li>અંદાજિત નફો</li><li>પ્રતિ એકર/હેક્ટર ખર્ચ અને નફો</li><li>સમગ્ર પાકની સાથે-સાથે સરખામણી</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂત ટામેટા અને ઘઉં વચ્ચે પસંદગી કરી રહ્યો છે. કિસાનસંગમ દરેક માટે ખર્ચ, ઉત્પાદન, આવક અને નફાનો અંદાજ કાઢે છે. ખેડૂત બંને વિકલ્પોની તુલના કરે છે અને કયો પાક ઉગાડવો તે અંગે વધુ માહિતગાર નિર્ણય લે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>ખેતી શરૂ થાય તે પહેલાં પાક-પસંદગી પ્રક્રિયામાં નાણાકીય આયોજન લાવે છે</li><li>પાક વિકલ્પો વચ્ચે સીધી, સંરચિત સરખામણી કરવાની મંજૂરી આપે છે</li><li>તેના સંભવિત નાણાકીય પરિણામને સમજ્યા વિના પાકને પ્રતિબદ્ધ કરવાનું જોખમ ઘટાડે છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>ભવિષ્યના અંદાજોને શુદ્ધ કરવા માટે ડિજિટલ ફાર્મ મેનેજમેન્ટમાંથી વાસ્તવિક રેકોર્ડ કરેલ ખર્ચનું એકીકરણ</li></ul></div>"
    }
  },
  "f8": {
    "en": {
      "title": "Digital Farm Management",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam allows farmers to maintain digital farm records, tracking current crops, sowing dates, fertilizer applications, irrigation activities, pesticide/input usage, and expected harvest dates — creating a centralized digital farm history.</p></ul><h4>B. Current System Problem</h4><ul><li>Farmers often rely on paper records, notebooks, or memory to track farming activities.</li><li>This makes it difficult to maintain long-term, accurate, and easily retrievable farm records.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>KisanSangam provides a structured digital record-keeping system where farmers log activities as they happen, building an organized, retrievable history of each field and crop cycle over time.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Logs Activity (e.g., Sowing, Fertilizer, Irrigation) → System Records Entry with Date → Structured Farm History Maintained → Farmer Reviews Records Anytime</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Crop and field identification</li><li>Sowing date</li><li>Fertilizer application details and dates</li><li>Irrigation activity records</li><li>Pesticide/input usage records</li><li>Expected harvest date</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam organizes each logged activity under the relevant crop and field, maintaining a chronological record that the farmer can review at any point in the season or in future seasons for reference and comparison.</p></ul><h4>G. Output</h4><ul><li>A centralized, chronological digital farm record</li><li>Activity history by crop and field</li><li>Easy retrieval of past sowing, fertilization, irrigation, and input-usage data</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer sows tomatoes on 1 September and records the activity in KisanSangam. The platform then maintains associated information related to fertilizer, irrigation, pesticides, and expected harvesting as the season progresses, all in one place.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Replaces unreliable paper or memory-based record keeping</li><li>Creates a retrievable, long-term farm history</li><li>Supports better planning in future seasons based on past records</li><li>Provides a factual basis that can support the Profit & Cost Calculator and other features over time</li></ul></div>"
    },
    "hi": {
      "title": "डिजिटल फार्म प्रबंधन",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम किसानों को डिजिटल फार्म रिकॉर्ड बनाए रखने, वर्तमान फसलों, बुआई की तारीखों, उर्वरक अनुप्रयोगों, सिंचाई गतिविधियों, कीटनाशक/इनपुट उपयोग और अपेक्षित फसल की तारीखों पर नज़र रखने की अनुमति देता है - एक केंद्रीकृत डिजिटल फार्म इतिहास बनाता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>खेती की गतिविधियों पर नज़र रखने के लिए किसान अक्सर कागजी रिकॉर्ड, नोटबुक या मेमोरी पर निर्भर रहते हैं।</li><li>इससे दीर्घकालिक, सटीक और आसानी से पुनर्प्राप्त करने योग्य कृषि रिकॉर्ड बनाए रखना मुश्किल हो जाता है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसानसंगम एक संरचित डिजिटल रिकॉर्ड-कीपिंग प्रणाली प्रदान करता है जहां किसान गतिविधियों को लॉग करते हैं, समय के साथ प्रत्येक क्षेत्र और फसल चक्र का एक संगठित, पुनर्प्राप्ति योग्य इतिहास बनाते हैं।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान गतिविधि लॉग करता है (उदाहरण के लिए, बुआई, उर्वरक, सिंचाई) → दिनांक के साथ सिस्टम रिकॉर्ड प्रविष्टि → संरचित फार्म इतिहास बनाए रखा → किसान किसी भी समय रिकॉर्ड की समीक्षा करता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>फसल एवं खेत की पहचान</li><li>बुआई की तारीख</li><li>उर्वरक आवेदन विवरण और तारीखें</li><li>सिंचाई गतिविधि रिकॉर्ड</li><li>कीटनाशक/इनपुट उपयोग रिकॉर्ड</li><li>अपेक्षित फसल की तारीख</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम प्रासंगिक फसल और क्षेत्र के तहत प्रत्येक लॉग की गई गतिविधि का आयोजन करता है, एक कालानुक्रमिक रिकॉर्ड बनाए रखता है जिसे किसान संदर्भ और तुलना के लिए सीज़न में या भविष्य के सीज़न में किसी भी समय समीक्षा कर सकता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>एक केंद्रीकृत, कालानुक्रमिक डिजिटल फ़ार्म रिकॉर्ड</li><li>फसल और खेत के अनुसार गतिविधि इतिहास</li><li>पिछली बुआई, उर्वरक, सिंचाई और इनपुट-उपयोग डेटा की आसान पुनर्प्राप्ति</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान 1 सितंबर को टमाटर बोता है और किसानसंगम में गतिविधि रिकॉर्ड करता है। इसके बाद प्लेटफ़ॉर्म उर्वरक, सिंचाई, कीटनाशकों और मौसम बढ़ने के साथ अपेक्षित कटाई से संबंधित जानकारी एक ही स्थान पर रखता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>अविश्वसनीय कागज़ या मेमोरी-आधारित रिकॉर्ड कीपिंग को प्रतिस्थापित करता है</li><li>एक पुनर्प्राप्ति योग्य, दीर्घकालिक कृषि इतिहास बनाता है</li><li>पिछले रिकॉर्ड के आधार पर भविष्य के सीज़न में बेहतर योजना का समर्थन करता है</li><li>एक तथ्यात्मक आधार प्रदान करता है जो समय के साथ लाभ और लागत कैलकुलेटर और अन्य सुविधाओं का समर्थन कर सकता है</li></ul></div>"
    },
    "gu": {
      "title": "ડિજિટલ ફાર્મ મેનેજમેન્ટ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ ખેડૂતોને ડિજિટલ ફાર્મ રેકોર્ડ જાળવવા, વર્તમાન પાકો, વાવણીની તારીખો, ખાતરની અરજીઓ, સિંચાઈ પ્રવૃત્તિઓ, જંતુનાશક/ઇનપુટ વપરાશ અને લણણીની અપેક્ષિત તારીખો - એક કેન્દ્રિય ડિજિટલ ફાર્મ ઇતિહાસ બનાવવાની મંજૂરી આપે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ખેતીની પ્રવૃત્તિઓને ટ્રેક કરવા માટે ખેડૂતો વારંવાર કાગળના રેકોર્ડ, નોટબુક અથવા મેમરી પર આધાર રાખે છે.</li><li>આ લાંબા ગાળાના, સચોટ અને સરળતાથી પુનઃપ્રાપ્ત કરી શકાય તેવા ફાર્મ રેકોર્ડ્સને જાળવવાનું મુશ્કેલ બનાવે છે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>કિસાનસંગમ એક સંરચિત ડિજિટલ રેકોર્ડ-કીપિંગ સિસ્ટમ પ્રદાન કરે છે જ્યાં ખેડૂતો પ્રવૃત્તિઓ થાય તે પ્રમાણે લોગ કરે છે, દરેક ક્ષેત્રનો સંગઠિત, પુનઃપ્રાપ્ત કરી શકાય તેવો ઇતિહાસ અને સમય જતાં પાક ચક્રનું નિર્માણ કરે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત લૉગ પ્રવૃત્તિ (દા.ત., વાવણી, ખાતર, સિંચાઈ) → તારીખ સાથે સિસ્ટમ રેકોર્ડ એન્ટ્રી → સ્ટ્રક્ચર્ડ ફાર્મ ઇતિહાસ જાળવવામાં આવે છે → ખેડૂત સમીક્ષાઓ રેકોર્ડ્સ ગમે ત્યારે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>પાક અને ક્ષેત્રની ઓળખ</li><li>વાવણી તારીખ</li><li>ખાતર અરજી વિગતો અને તારીખો</li><li>સિંચાઈ પ્રવૃત્તિ રેકોર્ડ</li><li>જંતુનાશક/ઇનપુટ વપરાશ રેકોર્ડ</li><li>લણણીની અપેક્ષિત તારીખ</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ દરેક લૉગ કરેલી પ્રવૃત્તિને સંબંધિત પાક અને ક્ષેત્ર હેઠળ ગોઠવે છે, એક કાલક્રમિક રેકોર્ડ જાળવી રાખે છે કે ખેડૂત સંદર્ભ અને સરખામણી માટે સિઝનના કોઈપણ સમયે અથવા ભવિષ્યની સિઝનમાં સમીક્ષા કરી શકે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>એક કેન્દ્રિય, કાલક્રમિક ડિજિટલ ફાર્મ રેકોર્ડ</li><li>પાક અને ક્ષેત્ર દ્વારા પ્રવૃત્તિ ઇતિહાસ</li><li>ભૂતકાળની વાવણી, ગર્ભાધાન, સિંચાઈ અને ઇનપુટ-ઉપયોગ ડેટાની સરળ પુનઃપ્રાપ્તિ</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂત 1 સપ્ટેમ્બરના રોજ ટામેટાં વાવે છે અને કિસાનસંગમમાં પ્રવૃત્તિ રેકોર્ડ કરે છે. પ્લેટફોર્મ પછી ખાતર, સિંચાઈ, જંતુનાશકો અને સીઝન આગળ વધવાની સાથે અપેક્ષિત લણણી સંબંધિત માહિતીને એક જ જગ્યાએ જાળવી રાખે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>અવિશ્વસનીય કાગળ અથવા મેમરી-આધારિત રેકોર્ડ રાખવાને બદલે છે</li><li>પુનઃપ્રાપ્ત કરી શકાય તેવા, લાંબા ગાળાના ફાર્મ ઇતિહાસ બનાવે છે</li><li>ભૂતકાળના રેકોર્ડના આધારે ભવિષ્યની સિઝનમાં બહેતર આયોજનને સમર્થન આપે છે</li><li>એક વાસ્તવિક આધાર પૂરો પાડે છે જે સમયાંતરે નફો અને ખર્ચ કેલ્ક્યુલેટર અને અન્ય સુવિધાઓને સમર્થન આપી શકે છે</li></ul></div>"
    }
  },
  "f9": {
    "en": {
      "title": "AI Farmer Assistant & Crop Doctor",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam provides an AI-powered chatbot through which farmers can communicate with the system in their preferred language, ask text-based questions, and upload live crop photos for analysis. The assistant analyzes crop, leaf, or fruit images to identify possible crop diseases, pest attacks, nutrient deficiencies, or crop damage, provides actionable solutions, and supports follow-up questions.</p></ul><h4>B. Current System Problem</h4><ul><li>When crops develop symptoms such as yellow leaves, black spots, pest attacks, unusual growth, or other damage, farmers often do not know the cause.</li><li>Farmers may have to contact experts, visit agricultural officers, search online, or ask other farmers, all of which take time and may not be readily accessible.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>A farmer can photograph the affected crop and upload it to the KisanSangam AI chatbot. The assistant analyzes the image, identifies a possible issue, explains likely causes, and provides recommended corrective steps, while remaining available for follow-up questions in the farmer's preferred language.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Uploads Crop Photo or Asks a Question → AI Image/Text Analysis → Possible Issue Identified → Explanation & Recommended Action Provided → Farmer Asks Follow-Up Questions as Needed</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Photograph of the affected crop, leaf, or fruit</li><li>Text-based question or description from the farmer</li><li>Preferred language</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam's AI assistant analyzes the uploaded image to identify visual patterns associated with common diseases, pest damage, nutrient deficiencies, or physical crop damage, and combines this with any accompanying text description from the farmer. It then generates an explanation of the likely issue and a set of recommended corrective steps, and remains available to answer follow-up questions on the same case.</p></ul><h4>G. Output</h4><ul><li>A possible identification of the crop issue (disease, pest, deficiency, or damage)</li><li>An explanation of likely causes</li><li>Recommended corrective steps</li><li>Ongoing conversational support for follow-up questions</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer notices black spots on his tomato leaves. He photographs the leaves and uploads the image to the KisanSangam AI chatbot. The AI analyzes the image and identifies a possible crop problem, explains the possible issue and its causes, and provides recommended corrective steps. The farmer then asks a follow-up question — \"How often should I apply the treatment?\" — and the chatbot continues the conversation.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Provides immediate, accessible first-line guidance for crop problems</li><li>Reduces dependence on the availability of local experts for an initial assessment</li><li>Supports natural, conversational follow-up rather than a single static answer</li><li>Available in the farmer's preferred language</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Continued improvement of image-based identification accuracy over time</li><li>Expansion of supported crops and issue types</li></ul></div>"
    },
    "hi": {
      "title": "एआई किसान सहायक एवं फसल चिकित्सक",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम एक एआई-संचालित चैटबॉट प्रदान करता है जिसके माध्यम से किसान अपनी पसंदीदा भाषा में सिस्टम के साथ संवाद कर सकते हैं, पाठ-आधारित प्रश्न पूछ सकते हैं और विश्लेषण के लिए लाइव फसल तस्वीरें अपलोड कर सकते हैं। सहायक संभावित फसल रोगों, कीटों के हमलों, पोषक तत्वों की कमी या फसल क्षति की पहचान करने के लिए फसल, पत्ती या फल की छवियों का विश्लेषण करता है, कार्रवाई योग्य समाधान प्रदान करता है, और अनुवर्ती प्रश्नों का समर्थन करता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>जब फसलों में पीले पत्ते, काले धब्बे, कीटों के हमले, असामान्य वृद्धि या अन्य क्षति जैसे लक्षण विकसित होते हैं, तो किसानों को अक्सर इसका कारण पता नहीं चलता है।</li><li>किसानों को विशेषज्ञों से संपर्क करना होगा, कृषि अधिकारियों के पास जाना होगा, ऑनलाइन खोजना होगा, या अन्य किसानों से पूछना होगा, इन सभी में समय लगेगा और आसानी से पहुंच योग्य नहीं हो सकता है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>एक किसान प्रभावित फसल की तस्वीर खींच सकता है और उसे किसानसंगम एआई चैटबॉट पर अपलोड कर सकता है। सहायक छवि का विश्लेषण करता है, संभावित समस्या की पहचान करता है, संभावित कारणों की व्याख्या करता है, और अनुशंसित सुधारात्मक कदम प्रदान करता है, जबकि किसान की पसंदीदा भाषा में अनुवर्ती प्रश्नों के लिए उपलब्ध रहता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान फसल की फोटो अपलोड करता है या प्रश्न पूछता है → एआई छवि/पाठ विश्लेषण → संभावित समस्या की पहचान → स्पष्टीकरण और अनुशंसित कार्रवाई प्रदान की गई → किसान आवश्यकतानुसार अनुवर्ती प्रश्न पूछता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>प्रभावित फसल, पत्ती या फल की तस्वीर</li><li>किसान से पाठ-आधारित प्रश्न या विवरण</li><li>पसंदीदा भाषा</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम का एआई सहायक सामान्य बीमारियों, कीट क्षति, पोषक तत्वों की कमी, या भौतिक फसल क्षति से जुड़े दृश्य पैटर्न की पहचान करने के लिए अपलोड की गई छवि का विश्लेषण करता है, और इसे किसान के किसी भी पाठ विवरण के साथ जोड़ता है। इसके बाद यह संभावित समस्या का स्पष्टीकरण और अनुशंसित सुधारात्मक कदमों का एक सेट तैयार करता है, और उसी मामले पर अनुवर्ती प्रश्नों के उत्तर देने के लिए उपलब्ध रहता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>फसल के मुद्दे की संभावित पहचान (बीमारी, कीट, कमी या क्षति)</li><li>संभावित कारणों का स्पष्टीकरण</li><li>अनुशंसित सुधारात्मक कदम</li><li>अनुवर्ती प्रश्नों के लिए निरंतर संवादात्मक समर्थन</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान ने अपने टमाटर के पत्तों पर काले धब्बे देखे। वह पत्तियों की तस्वीरें लेता है और छवि को किसानसंगम एआई चैटबॉट पर अपलोड करता है। एआई छवि का विश्लेषण करता है और संभावित फसल समस्या की पहचान करता है, संभावित समस्या और उसके कारणों की व्याख्या करता है, और अनुशंसित सुधारात्मक कदम प्रदान करता है। किसान फिर एक अनुवर्ती प्रश्न पूछता है - \"मुझे कितनी बार उपचार ल��गू करना चाहिए?\" - और चैटबॉट बातचीत जारी रखता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>फसल संबंधी समस्याओं के लिए तत्काल, सुलभ प्रथम-पंक्ति मार्गदर्शन प्रदान करता है</li><li>प्रारंभिक मूल्यांकन के लिए स्थानीय विशेषज्ञों की उपलब्धता पर निर्भरता कम हो जाती है</li><li>एकल स्थिर उत्तर के बजाय प्राकृतिक, संवादात्मक अनुवर्ती का समर्थन करता है</li><li>किसान की पसंदीदा भाषा में उपलब्ध है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>समय के साथ छवि-आधारित पहचान सटीकता में निरंतर सुधार</li><li>समर्थित फसलों और मुद्दे के प्रकारों का विस्तार</li></ul></div>"
    },
    "gu": {
      "title": "AI ખેડૂત સહાયક અને પાક ડૉક્ટર",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ એઆઈ-સંચાલિત ચેટબોટ પ્રદાન કરે છે જેના દ્વારા ખેડૂતો તેમની પસંદગીની ભાષામાં સિસ્ટમ સાથે વાતચીત કરી શકે છે, ટેક્સ્ટ-આધારિત પ્રશ્નો પૂછી શકે છે અને વિશ્લેષણ માટે લાઈવ પાકના ફોટા અપલોડ કરી શકે છે. સહાયક પાકના સંભવિત રોગો, જીવાતોના હુમલા, પોષક તત્ત્વોની ઉણપ અથવા પાકના નુકસાનને ઓળખવા માટે પાક, પાંદડા અથવા ફળની છબીઓનું વિશ્લેષણ કરે છે, પગલાં લેવા યોગ્ય ઉકેલો પૂરા પાડે છે અને ફોલો-અપ પ્રશ્નોને સમર્થન આપે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>જ્યારે પાકમાં પીળા પાંદડા, કાળા ડાઘ, જંતુના હુમલા, અસામાન્ય વૃદ્ધિ અથવા અન્ય નુકસાન જેવા લક્ષણો દેખાય છે, ત્યારે ખેડૂતો ઘણીવાર તેનું કારણ જાણતા નથી.</li><li>ખેડૂતોએ નિષ્ણાતોનો સંપર્ક કરવો પડશે, કૃષિ અધિકારીઓની મુલાકાત લેવી પડશે, ઓનલાઈન શોધ કરવી પડશે અથવા અન્ય ખેડૂતોને પૂછવું પડશે, આ બધામાં સમય લાગે છે અને તે સરળતાથી સુલભ ન હોઈ શકે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>ખેડૂત અસરગ્રસ્ત પાકનો ફોટોગ્રાફ લઈ શકે છે અને તેને કિસાનસંગમ એઆઈ ચેટબોટ પર અપલોડ કરી શકે છે. સહાયક ઇમેજનું પૃથ્થકરણ કરે છે, સંભવિત સમસ્યાને ઓળખે છે, સંભવિત કારણો સમજાવે છે અને ભલામણ કરેલ સુધારાત્મક પગલાં પૂરા પાડે છે, જ્યારે ખેડૂતોની પસંદગીની ભાષામાં ફોલો-અપ પ્રશ્નો માટે ઉપલબ્ધ રહે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત પાકનો ફોટો અપલોડ કરે છે અથવા પ્રશ્ન પૂછે છે → AI છબી/ટેક્સ્ટ વિશ્લેષણ → સંભવિત સમસ્યા ઓળખવામાં આવે છે → સમજૂતી અને ભલામણ કરેલ કાર્યવાહી પૂરી પાડવામાં આવે છે → ખેડૂત જરૂરિયાત મુજબ ફોલો-અપ પ્રશ્નો પૂછે છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>અસરગ્રસ્ત પાક, પાન અથવા ફળનો ફોટોગ્રાફ</li><li>ખેડૂત તરફથી ટેક્સ્ટ-આધારિત પ્રશ્ન અથવા વર્ણન</li><li>પસંદગીની ભાષા</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમના AI સહાયક સામાન્ય રોગો, જંતુના નુકસાન, પોષક તત્ત્વોની ઉણપ અથવા ભૌતિક પાકના નુકસાન સાથે સંકળાયેલ દ્રશ્ય પેટર્નને ઓળખવા માટે અપલોડ કરેલી છબીનું વિશ્લેષણ કરે છે અને આને ખેડૂતના કોઈપણ સાથેના ટેક્સ્ટ વર્ણન સાથે જોડે છે. તે પછી સંભવિત મુદ્દાની સમજૂતી અને ભલામણ કરેલ સુધારાત્મક પગલાઓનો સમૂહ જનરેટ કરે છે અને તે જ કેસ પર ફોલો-અપ પ્રશ્નોના જવાબ આપવા માટે ઉપલબ્ધ રહે છે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>પાકની સમસ્યાની સંભવિત ઓળખ (રોગ, જીવાત, ઉણપ અથવા નુકસાન)</li><li>સંભવિત કારણોની સમજૂતી</li><li>ભલામણ કરેલ સુધારાત્મક પગલાં</li><li>ફોલો-અપ પ્રશ્નો માટે ચાલુ વાતચીત સપોર્ટ</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>એક ખેડૂતને તેના ટામેટાના પાંદડા પર કાળા ડાઘ દેખાય છે. તે પાંદડાઓનો ફોટોગ્રાફ લે છે અને કિસાનસંગમ એઆઈ ચેટબોટ પર છબી અપલોડ કરે છે. AI છબીનું વિશ્લેષણ કરે છે અને સંભવિત પાક સમસ્યાને ઓળખે છે, સંભવિત સમસ્યા અને તેના કારણો સમજાવે છે અને ભલામણ કરેલ સુધારાત્મક પગલાં પૂરા પાડે છે. ખેડૂત પછી ફોલો-અપ પ્રશ્ન પૂછે છે - \"મારે કેટલી વાર સારવાર લાગુ કરવી જોઈએ?\" - અને ચેટબોટ વાતચીત ચાલુ રાખે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>પાકની સમસ્યાઓ માટે તાત્કાલિક, સુલભ પ્રથમ લાઇન માર્ગદર્શન પૂરું પાડે છે</li><li>પ્રારંભિક મૂલ્યાંકન માટે સ્થાનિક નિષ્ણાતોની ઉપલબ્ધતા પર નિર્ભરતા ઘટાડે છે</li><li>એક સ્થિર જવાબને બદલે કુદરતી, વાર્તાલાપ અનુવર્તી સપોર્ટ કરે છે</li><li>ખેડૂતની પસંદગીની ભાષામાં ઉપલબ્ધ છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>સમય જતાં ઇમેજ-આધારિત ઓળખની ચોકસાઈમાં સતત સુધારો</li><li>સપોર્ટેડ પાક અને મુદ્દાના પ્રકારોનું વિસ્તરણ</li></ul></div>"
    }
  },
  "f10": {
    "en": {
      "title": "Resource & Farm Equipment Sharing",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam allows farmers to rent agricultural equipment through the platform. Equipment owners can list machinery such as tractors, harvesters, rotavators, seeders, and sprayers, and farmers can search by equipment type, location, availability, and rental price.</p></ul><h4>B. Current System Problem</h4><ul><li>Small and economically weaker farmers may not be able to afford expensive agricultural machinery.</li><li>At the same time, equipment owned by nearby farmers often remains unused for long periods, representing an underutilized local resource.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>KisanSangam connects equipment owners with farmers who need machinery for a limited period, allowing farmers to search, compare, and rent nearby equipment directly through the platform instead of purchasing it outright.</p></ul><h4>D. How It Works</h4><ul><p>Owner Lists Equipment (Type, Location, Price, Availability) → Farmer Searches by Requirement → Farmer Compares Options → Farmer Rents Equipment Through the Platform</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Equipment type</li><li>Location</li><li>Availability window</li><li>Rental price</li><li>Farmer's requirement (equipment type, dates, location)</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam matches a farmer's equipment requirement against nearby listings, filtering by type, availability, and price so the farmer can quickly identify a suitable option without manually contacting multiple equipment owners.</p></ul><h4>G. Output</h4><ul><li>Searchable listings of available nearby equipment</li><li>Equipment details: type, location, availability, rental price</li><li>A direct booking/connection pathway to the equipment owner</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer needs a tractor for one day. Instead of purchasing one, he opens KisanSangam, finds a nearby tractor available for rental, checks its location, availability, and rental price, and rents it through the platform.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Improves access to expensive machinery without requiring ownership</li><li>Creates a local resource-sharing ecosystem that benefits both equipment owners and renting farmers</li><li>Reduces idle time for machinery already owned by farmers in the area</li><li>Lowers the capital barrier to using modern agricultural equipment</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Expansion of the equipment marketplace to a wider range of machinery and service types</li></ul></div>"
    },
    "hi": {
      "title": "संसाधन एवं कृषि उपकरण साझा करना",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम मंच के माध्यम से किसानों को कृषि उपकरण किराए पर लेने की अनुमति देता है। उपकरण मालिक ट्रैक्टर, हार्वेस्टर, रोटावेटर, सीडर्स और स्प्रेयर जैसी मशीनरी सूचीबद्ध कर सकते हैं, और किसान उपकरण प्रकार, स्थान, उपलब्धता और किराये की कीमत के आधार पर खोज सकते हैं।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>छोटे और आर्थिक रूप से कमजोर किसान महंगी कृषि मशीनरी खरीदने में सक्षम नहीं हो सकते हैं।</li><li>साथ ही, आस-पास के किसानों के स्वामित्व वाले उपकरण अक्सर लंबे समय तक अप्रयुक्त रहते हैं, जो कम उपयोग किए गए स्थानीय संसाधन का प्रतिनिधित्व करता है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>किसानसंगम उपकरण मालिकों को उन किसानों से जोड़ता है, जिन्हें सीमित अवधि के लिए मशीनरी की आवश्यकता होती है, जिससे किसानों को पास के उपकरणों को सीधे खरीदने के बजाय सीधे प्लेटफॉर्म के माध्यम से खोजने, तुलना करने और किराए पर लेने की सुविधा मिलती है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>मालिक उपकरण सूचीबद्ध करता है (प्रकार, स्थान, मूल्य, उपलब्धता) → किसान आवश्यकता के अनुसार खोजता है → किसान विकल्पों की तुलना करता है → किसान मंच के माध्यम से उपकरण किराए पर लेता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>उपकरण का प्रकार</li><li>जगह</li><li>उपलब्धता विंडो</li><li>किराये की कीमत</li><li>किसान की आवश्यकता (उपकरण प्रकार, दिनांक, स्थान)</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम किसान के उपकरण की आवश्यकता को आस-पास की सूची से मेल खाता है, प्रकार, उपलब्धता और कीमत के आधार पर फ़िल्टर करता है ताकि किसान कई उपकरण मालिकों से मैन्युअल रूप से संपर्क किए बिना एक उपयुक्त विकल्प की पहचान कर सके।</p></ul><h4>जी. आउटपुट</h4><ul><li>आस-पास उपलब्ध उपकरणों की खोजने योग्य सूची</li><li>उपकरण विवरण: प्रकार, स्थान, उपलब्धता, किराये की कीमत</li><li>उपकरण मालिक के लिए सीधा बुकिंग/कनेक्शन मार्ग</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>एक किसान को एक दिन के लिए ट्रैक्टर की जरूरत होती है. एक खरीदने के बजाय, वह किसानसंगम खोलता है, किराये के लिए पास में उपलब्ध ट्रैक्टर ढूंढता है, उसके स्थान, उपलब्धता और किराये की कीमत की जांच करता है, और उसे मंच के माध्यम से किराए पर लेता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>स्वामित्व की आवश्यकता के बिना महंगी मशीनरी तक पहुंच में सुधार करता है</li><li>एक स्थानीय संसाधन-साझाकरण पारिस्थितिकी तंत्र बनाता है जो उपकरण मालिकों और किराए पर लेने वाले किसानों दोनों को लाभान्वित करता है</li><li>क्षेत्र में पहले से ही किसानों के स्वामित्व वाली मशीनरी के निष्क्रिय समय को कम करता है</li><li>आधुनिक कृषि उपकरणों के उपयोग में पूंजी बाधा को कम करता है</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>उपकरण बाज़ार का मशीनरी और सेवा प्रकारों की विस्तृत श्रृंखला तक विस्तार</li></ul></div>"
    },
    "gu": {
      "title": "રિસોર્સ અને ફાર્મ ઇક્વિપમેન્ટ શેરિંગ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ ખેડૂતોને પ્લેટફોર્મ દ્વારા કૃષિ સાધનો ભાડે લેવાની મંજૂરી આપે છે. સાધનોના માલિકો ટ્રેક્ટર, હાર્વેસ્ટર, રોટાવેટર, સીડર અને સ્પ્રેયર જેવી મશીનરીની યાદી બનાવી શકે છે અને ખેડૂતો સાધનોના પ્રકાર, સ્થાન, ઉપલબ્ધતા અને ભાડાની કિંમત દ્વારા શોધી શકે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>નાના અને આર્થિક રીતે નબળા ખેડૂતો મોંઘી કૃષિ મશીનરી પરવડી શકે તેમ નથી.</li><li>તે જ સમયે, નજીકના ખેડૂતોની માલિકીના સાધનો લાંબા સમય સુધી બિનઉપયોગી રહે છે, જે ઓછા ઉપયોગમાં લેવાયેલા સ્થાનિક સંસાધનનું પ્રતિનિધિત્વ કરે છે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>કિસાનસંગમ એવા ખેડૂતો સાથે સાધનસામગ્રીના માલિકોને જોડે છે જેમને મર્યાદિત સમયગાળા માટે મશીનરીની જરૂર હોય છે, જે ખેડૂતોને સીધા જ પ્લેટફોર્મ દ્વારા નજીકના સાધનોને શોધવા, સરખામણી કરવા અને ભાડે લેવાની મંજૂરી આપે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>માલિક સાધનોની યાદી આપે છે (પ્રકાર, સ્થાન, કિંમત, ઉપલબ્ધતા) → ખેડૂત જરૂરિયાત મુજબ શોધ કરે છે → ખેડૂત વિકલ્પોની તુલના કરે છે → ખેડૂત પ્લેટફોર્મ દ્વારા સાધનો ભાડે આપે છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>સાધનોનો પ્રકાર</li><li>સ્થાન</li><li>ઉપલબ્ધતા વિન્ડો</li><li>ભાડાની કિંમત</li><li>ખેડૂતની જરૂરિયાત (સાધનોનો પ્રકાર, તારીખો, સ્થાન)</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ નજીકની સૂચિઓ, પ્રકાર, ઉપલબ્ધતા અને કિંમત દ્વારા ફિલ્ટરિંગ સામે ખેડૂતની સાધનસામગ્રીની જરૂરિયાત સાથે મેળ ખાય છે જેથી ખેડૂત બહુવિધ સાધનો માલિકોનો જાતે સંપર્ક કર્યા વિના ઝડપથી યોગ્ય વિકલ્પ ઓળખી શકે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>ઉપલબ્ધ નજીકના સાધનોની શોધી શકાય તેવી સૂચિઓ</li><li>સાધનોની વિગતો: પ્રકાર, સ્થાન, ઉપલબ્ધતા, ભાડાની કિંમત</li><li>સાધનસામગ્રીના માલિક માટે સીધો બુકિંગ/કનેક્શનનો માર્ગ</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>ખેડૂતને એક દિવસ માટે ટ્રેક્ટરની જરૂર હોય છે. એક ખરીદવાને બદલે, તે કિસાનસંગમ ખોલે છે, નજીકમાં ભાડા માટે ઉપલબ્ધ ટ્રેક્ટર શોધે છે, તેનું સ્થાન, ઉપલબ્ધતા અને ભાડાની કિંમત તપાસે છે અને પ્લેટફોર્મ દ્વારા તેને ભાડે આપે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>માલિકીની જરૂરિયાત વિના ખર્ચાળ મશીનરીની ઍક્સેસને સુધારે છે</li><li>સ્થાનિક સંસાધન-શેરિંગ ઇકોસિસ્ટમ બનાવે છે જે સાધનસામગ્રીના માલિકો અને ભાડે આપતા ખેડૂતો બંનેને લાભ આપે છે</li><li>આ વિસ્તારના ખેડૂતોની માલિકીની મશીનરી માટેનો નિષ્ક્રિય સમય ઘટાડે છે</li><li>આધુનિક કૃષિ સાધનોનો ઉપયોગ કરવા માટે મૂડી અવરોધ ઘટાડે છે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>મશીનરી અને સેવાના પ્રકારોની વિશાળ શ્રેણીમાં સાધનોના બજારનું વિસ્તરણ</li></ul></div>"
    }
  },
  "f11": {
    "en": {
      "title": "AI-Based Government Scheme Recommendation",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. Feature Overview</h4><ul><p>KisanSangam recommends relevant government agricultural schemes based on the farmer's individual profile, considering farm size, location, crop, income range, farming activities, and eligibility requirements. The system identifies relevant schemes, explains why each may be relevant, outlines eligibility and benefits, and alerts farmers about important deadlines.</p></ul><h4>B. Current System Problem</h4><ul><li>There are many agricultural government schemes, but farmers may not know which ones they qualify for, what benefits they can receive, what eligibility requirements apply, or when applications open and deadlines approach.</li></ul><h4>C. KisanSangam Solution</h4><ul><p>A farmer enters relevant profile details, and KisanSangam analyzes this profile against scheme eligibility criteria to surface the schemes most likely to be relevant, along with a clear explanation of eligibility, benefits, and deadlines.</p></ul><h4>D. How It Works</h4><ul><p>Farmer Enters Profile Details → System Matches Profile Against Scheme Criteria → Relevant Schemes Identified → Eligibility, Benefits & Deadlines Explained → Farmer Takes Next Step</p></ul><h4>E. Inputs / Data Required</h4><ul><li>Farm size</li><li>Location</li><li>Crop grown</li><li>Income range</li><li>Farming activities</li></ul><h4>F. Processing / Intelligence</h4><ul><p>KisanSangam compares the farmer's profile against the eligibility criteria of available government schemes, identifying schemes where the farmer's profile is a reasonable match and generating a plain-language explanation of why each scheme is relevant, along with its eligibility conditions, benefits, and any known deadlines.</p></ul><h4>G. Output</h4><ul><li>A list of potentially relevant government schemes</li><li>An explanation of why each scheme may be relevant to the farmer</li><li>Eligibility requirements and available benefits</li><li>Alerts about important application deadlines</li></ul><h4>H. Practical Farmer Example</h4><ul><p>A farmer with 2 acres of land, a specific income range, and a particular crop enters his details. KisanSangam analyzes his profile and identifies relevant schemes, explaining why the scheme is relevant, its eligibility, its benefits, and the important deadline. The farmer can then take the next step toward applying.</p></ul><h4>I. Benefits to Farmers</h4><ul><li>Increases awareness of government schemes a farmer may actually qualify for</li><li>Saves time compared to manually researching scheme eligibility</li><li>Surfaces deadlines that might otherwise be missed</li></ul><h4>J. Future Enhancement Possibilities</h4><ul><li>Expansion of the scheme database to cover more state- and district-level programs</li></ul></div>"
    },
    "hi": {
      "title": "एआई-आधारित सरकारी योजना की सिफारिश",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>ए. फ़ीचर अवलोकन</h4><ul><p>किसानसंगम खेत के आकार, स्थान, फसल, आय सीमा, कृषि गतिविधियों और पात्रता आवश्यकताओं पर विचार करते हुए किसान की व्यक्तिगत प्रोफ़ाइल के आधार पर प्रासंगिक सरकारी कृषि योजनाओं की सिफारिश करता है। सिस्टम प्रासंगिक योजनाओं की पहचान करता है, बताता है कि प्रत्येक प्रासंगिक क्यों हो सकता है, पात्रता और लाभों की रूपरेखा तैयार करता है, और किसानों को महत्वपूर्ण समय सीमा के बारे में सचेत करता है।</p></ul><h4>बी. वर्तमान प्रणाली समस्या</h4><ul><li>कई कृषि सरकारी योजनाएं हैं, लेकिन किसानों को यह नहीं पता होगा कि वे किसके लिए पात्र हैं, उन्हें क्या लाभ मिल सकता है, कौन सी पात्रता आवश्यकताएं लागू होती हैं, या आवेदन कब खुलते हैं और समय सीमा नजदीक आती है।</li></ul><h4>सी. किसानसंगम समाधान</h4><ul><p>एक किसान प्रासंगिक प्रोफ़ाइल विवरण दर्ज करता है, और किसानसंगम पात्रता, लाभ और समय सीमा की स्पष्ट व्याख्या के साथ-साथ सबसे अधिक प्रासंगिक होने वाली योजनाओं को सामने लाने के लिए योजना पात्रता मानदंडों के अनुसार इस प्रोफ़ाइल का विश्लेषण करता है।</p></ul><h4>डी. यह कैसे काम करता है</h4><ul><p>किसान प्रोफ़ाइल विवरण दर्ज करता है → सिस्टम योजना मानदंड के विरुद्ध प्रोफ़ाइल से मेल खाता है → प्रासंगिक योजनाओं की पहचान की गई → पात्रता, लाभ और समय सीमा बताई गई → किसान अगला कदम उठाता है</p></ul><h4>ई. इनपुट/डेटा आवश्यक</h4><ul><li>खेत का आकार</li><li>जगह</li><li>फसल उगाई</li><li>आय सीमा</li><li>खेती की गतिविधियाँ</li></ul><h4>एफ. प्रोसेसिंग/इंटेलिजेंस</h4><ul><p>किसानसंगम उपलब्ध सरकारी योजनाओं के पात्रता मानदंडों के साथ किसान की प्रोफ़ाइल की तुलना करता है, उन योजनाओं की पहचान करता है जहां किसान की प्रोफ़ाइल उचित रूप से मेल खाती है और इसकी पात्रता शर्तों, लाभों और किसी भी ज्ञात समय सीमा के साथ प्रत्येक योजना क्यों प्रासंगिक है, इसकी स्पष्ट भाषा में व्याख्या तैयार करता है।</p></ul><h4>जी. आउटपुट</h4><ul><li>संभावित रूप से प्रासंगिक सरकारी योजनाओं की सूची</li><li>प्रत्येक योजना किसान के लिए प्रासंगिक क्यों हो सकती है, इसका स्पष्टीकरण</li><li>पात्रता आवश्यकताएँ और उपलब्ध लाभ</li><li>महत्वपूर्ण आवेदन की अंतिम तिथियों के बारे में अलर्ट</li></ul><h4>एच. व्यावहारिक किसान उदाहरण</h4><ul><p>2 एकड़ भूमि, एक विशिष्ट आय सीमा और एक विशेष फसल वाला किसान अपना विवरण दर्ज करता है। किसानसंगम उनकी प्रोफ़ाइल का विश्लेषण करता है और प्रासंगिक योजनाओं की पहचान करता है, यह बताता है कि योजना प्रासंगिक क्यों है, इसकी पात्रता, इसके लाभ और महत्वपूर्ण समय सीमा। इसके बाद किसान आवेदन करने की दिशा में अगला कदम उठा सकता है।</p></ul><h4>I. किसानों को लाभ</h4><ul><li>सरकारी योजनाओं के बारे में जागरूकता बढ़ती है जिसके लिए किसान वास्तव में योग्य हो सकता है</li><li>योजना पात्रता पर मैन्युअल रूप से शोध करने की तुलना में समय की बचत होती है</li><li>ऐसी समय-सीमाएँ सामने आती हैं जो अन्यथा छूट सकती हैं</li></ul><h4>जे. भविष्य में वृद्धि की संभावनाएँ</h4><ul><li>अधिक राज्य और जिला-स्तरीय कार्यक्रमों को कवर करने के लिए योजना डेटाबेस का विस्तार</li></ul></div>"
    },
    "gu": {
      "title": "AI-આધારિત સરકારી યોજનાની ભલામણ",
      "detailedHtml": "<div class=\"feature-detail-content\"><h4>A. લક્ષણ વિહંગાવલોકન</h4><ul><p>કિસાનસંગમ ખેડૂતની વ્યક્તિગત રૂપરેખાના આધારે સંબંધિત સરકારી કૃષિ યોજનાઓની ભલામણ કરે છે, જેમાં ખેતરનું કદ, સ્થાન, પાક, આવકની શ્રેણી, ખેતીની પ્રવૃત્તિઓ અને પાત્રતાની આવશ્યકતાઓ ધ્યાનમાં લેવામાં આવે છે. સિસ્ટમ સંબંધિત યોજનાઓને ઓળખે છે, દરેક શા માટે સુસંગત હોઈ શકે છે તે સમજાવે છે, પાત્રતા અને લાભોની રૂપરેખા આપે છે અને ખેડૂતોને મહત્વપૂર્ણ સમયમર્યાદા વિશે ચેતવણી આપે છે.</p></ul><h4>B. વર્તમાન સિસ્ટમ સમસ્યા</h4><ul><li>ઘણી બધી કૃષિ સરકારી યોજનાઓ છે, પરંતુ ખેડૂતો કદાચ જાણતા નથી કે તેઓ કઈ યોજનાઓ માટે લાયક છે, તેઓ કયા લાભો મેળવી શકે છે, કઈ પાત્રતા આવશ્યકતાઓ લાગુ પડે છે અથવા જ્યારે અરજીઓ ખુલે છે અને સમયમર્યાદા નજીક આવે છે.</li></ul><h4>C. કિસાનસંગમ સોલ્યુશન</h4><ul><p>ખેડૂત સંબંધિત પ્રોફાઇલ વિગતો દાખલ કરે છે, અને કિસાનસંગમ લાયકાત, લાભો અને સમયમર્યાદાની સ્પષ્ટ સમજૂતી સાથે, સંભવતઃ સંબંધિત હોઈ શકે તેવી યોજનાઓને સપાટી પર લાવવા માટે આ પ્રોફાઇલનું સ્કીમ પાત્રતા માપદંડો સામે વિશ્લેષણ કરે છે.</p></ul><h4>D. તે કેવી રીતે કામ કરે છે</h4><ul><p>ખેડૂત પ્રોફાઇલ વિગતો દાખલ કરે છે → યોજનાના માપદંડો સામે સિસ્ટમ મેળ ખાય છે → સંબંધિત યોજનાઓ ઓળખાય છે → પાત્રતા, લાભો અને સમયમર્યાદા સમજાવી છે → ખેડૂત આગળનું પગલું લે છે</p></ul><h4>E. ઇનપુટ્સ / ડેટા જરૂરી</h4><ul><li>ફાર્મનું કદ</li><li>સ્થાન</li><li>પાક ઉગાડ્યો</li><li>આવક શ્રેણી</li><li>ખેતી પ્રવૃત્તિઓ</li></ul><h4>F. પ્રોસેસિંગ / ઇન્ટેલિજન્સ</h4><ul><p>કિસાનસંગમ ઉપલબ્ધ સરકારી યોજનાઓના પાત્રતાના માપદંડો સાથે ખેડૂતની પ્રોફાઇલની તુલના કરે છે, એવી યોજનાઓ ઓળખે છે જ્યાં ખેડૂતની પ્રોફાઇલ વાજબી મેચ હોય અને દરેક યોજના શા માટે સુસંગત છે તેની સાદી ભાષામાં સમજૂતી બનાવે છે, તેની યોગ્યતાની શરતો, લાભો અને કોઈપણ જાણીતી સમયમર્યાદા સાથે.</p></ul><h4>જી. આઉટપુટ</h4><ul><li>સંભવિત રૂપે સંબંધિત સરકારી યોજનાઓની સૂચિ</li><li>દરેક યોજના શા માટે ખેડૂત માટે સુસંગત હોઈ શકે છે તેની સમજૂતી</li><li>પાત્રતા જરૂરિયાતો અને ઉપલબ્ધ લાભો</li><li>મહત્વપૂર્ણ એપ્લિકેશન સમયમર્યાદા વિશે ચેતવણીઓ</li></ul><h4>H. વ્યવહારુ ખેડૂત ઉદાહરણ</h4><ul><p>2 એકર જમીન, ચોક્કસ આવક શ્રેણી અને ચોક્કસ પાક ધરાવતો ખેડૂત તેની વિગતો દાખલ કરે છે. કિસાનસંગમ તેની પ્રોફાઇલનું પૃથ્થકરણ કરે છે અને સંબંધિત યોજનાઓને ઓળખે છે, આ યોજના શા માટે સુસંગત છે, તેની પાત્રતા, તેના લાભો અને મહત્વની સમયમર્યાદા સમજાવે છે. ત્યારબાદ ખેડૂત અરજી કરવા માટે આગળનું પગલું લઈ શકે છે.</p></ul><h4>I. ખેડૂતોને લાભ</h4><ul><li>સરકારી યોજનાઓની જાગૃતિ વધે છે જેના માટે ખેડૂત ખરેખર લાયક બની શકે છે</li><li>મેન્યુઅલી સંશોધન સ્કીમ યોગ્યતાની સરખામણીમાં સમય બચાવે છે</li><li>સરફેસ ડેડલાઇન કે જે અન્યથા ચૂકી જશે</li></ul><h4>J. ભાવિ ઉન્નતીકરણની શક્યતાઓ</h4><ul><li>વધુ રાજ્ય- અને જિલ્લા-સ્તરના કાર્યક્રમોને આવરી લેવા માટે યોજના ડેટાબેઝનું વિસ્તરણ</li></ul></div>"
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

    document.querySelectorAll('.feature-card[data-feature-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-feature-id');
        const data = featureData[id];
        if (!data) return;

        // Copy icon from card
        const iconHtml = card.querySelector('.feature-card__icon').innerHTML;
        const iconClass = card.querySelector('.feature-card__icon').className;
        modalIcon.innerHTML = iconHtml;
        modalIcon.className = 'feature-modal__icon ' + iconClass.split(' ').filter(c => c.startsWith('feature-card__icon--')).join(' ');

        const langData = data[currentLang] || data['en'] || data;
        modalTitle.textContent = langData.title || data.title;
        
        if (modalDetailed) {
          modalDetailed.innerHTML = langData.detailedHtml || data.detailedHtml;
        }

        featureModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      featureModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && featureModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});
