/* ==========================================================================
   KisanSangam — Core Application Scripts
   "Rooted in Gujarat. Built for better farming decisions."
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. FEATURE DATABASE (12 Capabilities)
     ========================================================================== */
  const featureDatabase = {
    'crop-recommendation': {
      slug: 'crop-recommendation',
      title: 'Advanced Personalized Crop Recommendation',
      category: 'Plan Your Season',
      isComingSoon: false,
      subtitle: 'Compare suitable crop options using your farm location, season, soil information and water availability, with clear reasons to support your choice.',
      helps: 'Selecting the most suitable crop for your farm based on agronomic logic rather than guesswork. Helps evaluate soil nutrients, season, and available irrigation to present ranked alternatives.',
      provides: [
        'Farm location and agro-climatic zone (Gujarat/Narmada focus)',
        'Farming season (Kharif, Rabi, Zaid)',
        'Known soil type and texture (Black, Alluvial, Loamy)',
        'Water availability and irrigation system (Borewell, Canal, Rainfed)',
        'Preference for organic or conventional cultivation'
      ],
      receives: [
        'Ranked list of suitable crops for your exact conditions',
        'Specific agronomic reasons supporting each crop choice',
        'Estimated crop duration and growth cycle',
        'Water requirement rating for each crop option'
      ],
      steps: [
        { title: 'Enter Farm Profile', desc: 'Select your Gujarat district/taluka, soil type, and primary irrigation source.' },
        { title: 'Compare Ranked Options', desc: 'Review top recommended crops with clear explanations for why each matches your land.' },
        { title: 'Select Your Crop', desc: 'Choose the crop that fits your seasonal goals and seamlessly activate a personalized farm guide.' }
      ],
      example: '<strong>Sample: Narmada District (Medium Black Soil, Tube-well irrigation, Kharif):</strong><br/>• Top recommendation: <em>Cotton (Bt / Desi)</em> — High soil compatibility, moderate water requirement.<br/>• Alternative 1: <em>Pigeon Pea (Tur)</em> — Excellent nitrogen-fixing crop for soil rejuvenation.<br/>• Alternative 2: <em>Soybean</em> — Shorter duration alternative.',
      limits: 'Crop suitability models are currently focused on Gujarat agro-climatic conditions, with Narmada as the initial focus. Recommendations are advisory decision-support tools and do not guarantee yield or financial outcome.',
      image: 'App Images/screen-16-top-5-crops (1)/screen-16-top-5-crops (1)-1.png',
      caption: 'In-app Crop Recommendation view showing ranked crop choices with suitability scores.'
    },

    'farm-guide': {
      slug: 'farm-guide',
      title: 'Advanced Personalized Farm Guide',
      category: 'Plan Your Season',
      isComingSoon: false,
      subtitle: 'Turn your selected crop into a practical, stage-by-stage plan, with activities, reminders and guidance you can return to throughout the season.',
      helps: 'Structuring your entire cultivation season into clear, sequential milestones — from seed preparation to final harvesting — so critical activities are never missed.',
      provides: [
        'Selected crop and targeted sowing date',
        'Farming approach (Organic or Conventional)',
        'Acreage and farm location'
      ],
      receives: [
        'Chronological stage-by-stage activity schedule',
        'Specific guidance for soil preparation, sowing depth, and seed treatment',
        'Timely nutrient and water application reminders',
        'Crop-stage specific pest and disease vigilance notes'
      ],
      steps: [
        { title: 'Choose Crop & Sowing Date', desc: 'Input your planned or completed sowing date to anchor the calendar.' },
        { title: 'Receive Stage-by-Stage Guide', desc: 'Access clear instructions broken down into vegetative, flowering, and maturity stages.' },
        { title: 'Track & Mark Activities', desc: 'Check off completed farm tasks and view upcoming scheduled interventions.' }
      ],
      example: '<strong>Sample: Cotton Guide (Vegetative Stage — Days 25–40):</strong><br/>• Critical task: Inter-cultivation and light weeding.<br/>• Nutrient application: Soil-based nitrogen split or Jeevamrut spray (if organic).<br/>• Scouting note: Check underside of leaves for early sucking pest presence.',
      limits: 'Stage timing is calculated based on standard regional growing degree days and weather conditions. Local weather fluctuations may require adjusting specific task dates.',
      image: 'App Images/farm-guide-screen/farm-guide-screen-1.png',
      caption: 'Farm Guide stage overview showing timeline, reminders, and activity cards.'
    },

    'soil-testing': {
      slug: 'soil-testing',
      title: 'Soil Testing',
      category: 'Plan Your Season',
      isComingSoon: true,
      subtitle: 'Soil testing support is on the way to help farmers understand their soil and connect results with better farm planning.',
      helps: 'Connecting farmers with reliable soil testing capabilities to measure N-P-K, micronutrients, pH, and organic carbon, feeding directly into personalized recommendations.',
      provides: [
        'Farm location and GPS boundary',
        'Soil sampling schedule preference (when launched)',
        'Existing historical soil card details (optional)'
      ],
      receives: [
        'Comprehensive nutrient report once service launches',
        'Automated soil health interpretation into plain farmer language',
        'Direct connection to fertilizer and organic nutrient plans'
      ],
      steps: [
        { title: 'Service In Development', desc: 'We are evaluating third-party testing equipment and lab integration protocols.' },
        { title: 'Sample Collection Protocol', desc: 'Guidance will be provided for standardized field soil sample collection.' },
        { title: 'Digital Soil Health Card', desc: 'Results will sync directly into your KisanSangam farm profile.' }
      ],
      example: '<strong>Upcoming Capability:</strong><br/>Farmers will be able to input third-party soil test values or arrange testing support to understand available nitrogen, phosphorus, potassium, and soil pH.',
      limits: 'Coming Soon. This feature is not yet available for live booking, device connection, payment, or report generation. KisanSangam\'s crop recommendations and farm guide function today with existing soil inputs.',
      image: 'App Images/book-soil-test/book-soil-test-1.png',
      caption: 'Illustrative preview of the upcoming Soil Testing module interface.'
    },

    'market-prices': {
      slug: 'market-prices',
      title: 'Market Prices & Market Information',
      category: 'Access Information & Resources',
      isComingSoon: false,
      subtitle: 'Check latest reported mandi prices with source and date context. Price information is reported from available market data.',
      helps: 'Monitoring regional APMC market rates across Gujarat mandis to help farmers decide when and where to sell their harvested produce.',
      provides: [
        'Commodity or crop of interest',
        'Preferred district or APMC market'
      ],
      receives: [
        'Latest reported modal, minimum, and maximum prices',
        'Reporting date and mandi source attribution',
        'Historical price trends where available'
      ],
      steps: [
        { title: 'Select Commodity', desc: 'Choose your crop from grains, pulses, oilseeds, or commercial crops.' },
        { title: 'Filter by Market', desc: 'View rates in nearby Gujarat APMCs or across the state.' },
        { title: 'Review Context', desc: 'See arrival volumes and reported dates to gauge market strength.' }
      ],
      example: '<strong>Sample Mandi Report:</strong><br/>• Commodity: Cotton (Shankar-6)<br/>• Mandi: Rajkot APMC (Reported Date: Stated on card)<br/>• Modal Price: ₹7,250 / Quintal | Min: ₹6,900 | Max: ₹7,520',
      limits: 'Prices reflect reported APMC data from official market disclosures with source dates. Prices are not universal real-time guarantees; actual transactions depend on quality inspection and local bidding.',
      image: 'App Images/market-price-overview/market-price-overview-1.png',
      caption: 'Market price overview displaying commodity rates with mandi context and date.'
    },

    'weather': {
      slug: 'weather',
      title: 'Weather Forecasts & Alerts',
      category: 'Access Information & Resources',
      isComingSoon: false,
      subtitle: 'Location-specific weather forecasts and farming-relevant weather alerts to help you plan outdoor activities.',
      helps: 'Planning irrigation, spraying, and harvesting around high-impact meteorological events like unseasonal rainfall, heatwaves, or high humidity.',
      provides: [
        'Farm location (district, taluka, or GPS pin)'
      ],
      receives: [
        '7-day localized temperature, rainfall probability, and wind forecast',
        'Timely alerts for rainfall, frost, or high wind conditions',
        'Farming advisory tags (e.g., favorable for spraying / postpone irrigation)'
      ],
      steps: [
        { title: 'Set Location', desc: 'Your farm profile automatically syncs hyper-local forecasts.' },
        { title: 'Check 7-Day Window', desc: 'Review daily rain probability and humidity before scheduling inputs.' },
        { title: 'Receive Timely Alerts', desc: 'Get notified of sudden weather shifts before they impact crops.' }
      ],
      example: '<strong>Sample Weather Advisory:</strong><br/>• Forecast: 70% chance of rain in 36 hours.<br/>• Advisory: Postpone foliar spray and chemical fertilizer application to prevent nutrient runoff.',
      limits: 'Forecasts are generated from meteorological data services. While regularly updated, atmospheric conditions can vary locally; forecasts should be combined with local observations.',
      image: 'App Images/weather-overview-v2 (1)/weather-overview-v2 (1)-1.png',
      caption: 'Weather overview screen showing 7-day outlook and actionable agricultural alerts.'
    },

    'profit-estimation': {
      slug: 'profit-estimation',
      title: 'Farm Cost & Profit Estimation',
      category: 'Plan Your Season',
      isComingSoon: false,
      subtitle: 'Estimate input costs and potential revenue per crop before planting. Results are estimates based on stated inputs and assumptions.',
      helps: 'Calculating projected production economics before buying seeds or leasing land, helping farmers manage cash flow and operational risk.',
      provides: [
        'Acreage under cultivation',
        'Expected input costs (seeds, fertilizers, labor, diesel)',
        'Assumed yield range and expected selling price'
      ],
      receives: [
        'Estimated total cost of cultivation',
        'Estimated gross and net revenue scenarios',
        'Break-even yield and price thresholds'
      ],
      steps: [
        { title: 'Choose Crop & Area', desc: 'Input your planned land size and crop choice.' },
        { title: 'Customize Input Costs', desc: 'Adjust seed, fertilizer, irrigation, and labor estimates to match your reality.' },
        { title: 'Review Scenarios', desc: 'Compare projected financial outcomes under conservative and normal conditions.' }
      ],
      example: '<strong>Sample Cost Model (1 Acre Wheat):</strong><br/>• Estimated cultivation cost: ₹18,500 (seed, land prep, inputs, harvest).<br/>• Estimated yield: 18 quintals at assumed ₹2,400/quintal.<br/>• Estimated gross revenue: ₹43,200 | Estimated net margin: ₹24,700.',
      limits: 'All calculations are mathematical estimates based on stated farmer inputs and assumptions. Actual market prices, yields, and weather outcomes cannot be guaranteed.',
      image: 'App Images/profit-report/profit-report-1.png',
      caption: 'Profit and cost analysis breakdown showing estimated input costs versus revenue.'
    },

    'farm-management': {
      slug: 'farm-management',
      title: 'Farm Management & Reminders',
      category: 'Manage Your Farm',
      isComingSoon: false,
      subtitle: 'Keep digital records of farm activities, costs, yields and crop history. Set reminders for key farming tasks.',
      helps: 'Eliminating reliance on scattered paper notes or memory. Gives farmers an organized operational journal of what was planted, applied, and spent.',
      provides: [
        'Farm field records and boundaries',
        'Daily or weekly activity logs (spray dates, weeding, water cycles)',
        'Expense entries for inputs and equipment'
      ],
      receives: [
        'Centralized seasonal record per farm plot',
        'Timely task alerts and reminder notifications',
        'Historical seasonal comparison for multi-year improvement'
      ],
      steps: [
        { title: 'Create Farm Plots', desc: 'Add one or multiple land parcels under your profile.' },
        { title: 'Log Tasks in Seconds', desc: 'Quickly record an activity or cost with date and amount.' },
        { title: 'Review Seasonal History', desc: 'Inspect what worked well at the end of the harvest cycle.' }
      ],
      example: '<strong>Sample Journal Log:</strong><br/>• 12 July: Sowing completed (Variety: G.Cot 16).<br/>• 28 July: Weeding completed, 3 labor days (₹1,200).<br/>• 05 August: Micro-nutrient spray applied as scheduled.',
      limits: 'Data storage is local to your authenticated user account. Farmers can export or request deletion of their records at any time.',
      image: 'App Images/screen-my-farms/screen-my-farms-1.png',
      caption: 'My Farms dashboard displaying active plots, crop status, and pending tasks.'
    },

    'ai-assistant': {
      slug: 'ai-assistant',
      title: 'AI Farming Assistant & Crop Doctor',
      category: 'Manage Your Farm',
      isComingSoon: false,
      subtitle: 'Get possible causes and guidance for crop problems. AI supports understanding and decision-making, not guaranteed diagnosis.',
      helps: 'Diagnosing visible plant symptoms, leaf spots, pest damage, and nutrient deficiencies through guided conversational AI.',
      provides: [
        'Description of visible symptoms or photo upload',
        'Crop type, age, and affected plant parts',
        'Recent weather or chemical applications'
      ],
      receives: [
        'List of most likely causes (fungal, pest, nutrient deficiency)',
        'Visual confirmation checklist to verify in the field',
        'Recommended biological and integrated management practices'
      ],
      steps: [
        { title: 'Describe or Photograph', desc: 'Describe leaf curling, discoloration, or pest presence.' },
        { title: 'Receive Possible Causes', desc: 'Review potential biological causes ranked by symptom match.' },
        { title: 'Explore Treatment Guidance', desc: 'Access non-chemical organic solutions and approved management protocols.' }
      ],
      example: '<strong>Sample Query: "Cotton leaves curling upward with yellow margins":</strong><br/>• AI Assessment: Symptoms consistent with early Jassid (Leafhopper) feeding or zinc deficiency.<br/>• Actionable advice: Inspect underside of leaf for greenish nymphs; if observed, apply 5% neem seed kernel extract (NSKE).',
      limits: 'AI assistance provides educational decision support. It does not replace professional physical agronomy inspection. Recommendations should be validated before applying heavy chemical interventions.',
      image: 'App Images/chatbot-screen/chatbot-screen-1.png',
      caption: 'AI Assistant interface providing contextual agronomic guidance and problem troubleshooting.'
    },

    'land-leasing': {
      slug: 'land-leasing',
      title: 'Agricultural Land Leasing',
      category: 'Access Information & Resources',
      isComingSoon: false,
      subtitle: 'Discover available agricultural land for lease or list your land. Facilitates discovery and contact — not guaranteed contracts.',
      helps: 'Connecting landowners who have uncultivated land with enterprising farmers seeking additional acreage for seasonal cultivation.',
      provides: [
        'Land listing details: district, acreage, soil quality, water source, terms',
        'Or farmer requirement: desired acreage and crop intention'
      ],
      receives: [
        'Direct connection between verified local farmers',
        'Transparent land parameters (irrigation availability, road access)',
        'Searchable regional listings'
      ],
      steps: [
        { title: 'Post or Browse', desc: 'Publish an available parcel or search listings in your taluka.' },
        { title: 'Review Soil & Water Details', desc: 'Evaluate parcel viability before making contact.' },
        { title: 'Connect Directly', desc: 'Reach out to the counterparty for mutual agreement and formal leasing.' }
      ],
      example: '<strong>Sample Listing:</strong><br/>• Location: Rajpipla, Narmada District (3.5 Acres).<br/>• Soil: Clay loam | Water: Operational borewell with solar pump.<br/>• Available for: 2-year lease for organic or vegetable farming.',
      limits: 'KisanSangam provides a discovery and contact marketplace. We do not verify legal land titles, handle financial lease payments, or act as legal escrow agents. Users must complete formal registered lease deeds.',
      image: 'App Images/land-options/land-options-1.png',
      caption: 'Agricultural land leasing marketplace displaying parcel sizes, locations, and water access.'
    },

    'equipment-sharing': {
      slug: 'equipment-sharing',
      title: 'Equipment & Resource Sharing',
      category: 'Access Information & Resources',
      isComingSoon: false,
      subtitle: 'Connect with nearby farmers to share or rent agricultural equipment. Facilitates discovery — not guaranteed ownership or payment.',
      helps: 'Accessing mechanized equipment (tractors, rotavators, seed drills, harvesters) on demand from nearby farmers without heavy capital investment.',
      provides: [
        'Machinery owner: equipment type, horsepower, hourly/daily rate, location',
        'Farmer seeking equipment: required machinery and dates'
      ],
      receives: [
        'Proximity-based list of available implements',
        'Owner contact details and stated rental terms',
        'Clear machinery specifications'
      ],
      steps: [
        { title: 'Search Equipment', desc: 'Filter by tractor, planter, sprayer, or harvester in your area.' },
        { title: 'Check Availability', desc: 'View equipment location and stated hourly/daily rental rates.' },
        { title: 'Contact Owner', desc: 'Call or message the owner directly to arrange timing and payment.' }
      ],
      example: '<strong>Sample Equipment Listing:</strong><br/>• Equipment: 45 HP Tractor with 7-tine Cultivator & Rotavator.<br/>• Location: Tilakwada, Narmada.<br/>• Rental model: ₹750/hour (inclusive of operator).',
      limits: 'Facilitates direct community discovery. KisanSangam does not inspect equipment mechanical condition, guarantee ownership, or enforce rental payments.',
      image: 'App Images/browse-rentals-mobile/browse-rentals-mobile-1.png',
      caption: 'Equipment sharing marketplace showing tractors and implements available for rent.'
    },

    'government-schemes': {
      slug: 'government-schemes',
      title: 'Government Scheme Information',
      category: 'Access Information & Resources',
      isComingSoon: false,
      subtitle: 'Information about relevant agricultural government schemes and official application destinations. Does not guarantee eligibility.',
      helps: 'Making complex central and Gujarat state agricultural subsidy programs understandable, with clear eligibility criteria and links to official portals (e.g., iKhedut).',
      provides: [
        'Farmer category (small/marginal, general, organic farmer)',
        'Farm infrastructure interest (solar pumps, drip irrigation, farm pond)'
      ],
      receives: [
        'Summarized eligibility criteria in simple regional language',
        'List of required documents (7/12, 8A, Aadhaar, bank details)',
        'Official application portal links and deadline notices'
      ],
      steps: [
        { title: 'Browse Schemes', desc: 'Explore subsidy schemes for irrigation, seeds, machinery, and organic inputs.' },
        { title: 'Verify Eligibility', desc: 'Read straightforward checklists before preparing paperwork.' },
        { title: 'Access Official Portals', desc: 'Follow direct links to state portals like iKhedut for official submission.' }
      ],
      example: '<strong>Sample Scheme Profile:</strong><br/>• Scheme: Gujarat Micro Irrigation Scheme (GGRC Subsidy).<br/>• Benefit: Up to 70% subsidy on drip/sprinkler installation.<br/>• Official Portal: Direct link provided to GGRC portal.',
      limits: 'KisanSangam is an independent private platform and is NOT affiliated with or endorsed by any government entity. We do not approve applications or collect official fees. All applications must be submitted on official government portals.',
      image: 'App Images/government-schemes-listing/government-schemes-listing-1.png',
      caption: 'Government scheme directory detailing eligibility criteria, benefits, and official links.'
    },

    'organic-farming': {
      slug: 'organic-farming',
      title: 'Organic Farming Support',
      category: 'Plan Your Season',
      isComingSoon: false,
      subtitle: 'Crop recommendations and guidance for organic farming without synthetic inputs. Available as a dedicated option across features.',
      helps: 'Transitioning to or managing fully organic agricultural systems with crop choices and agronomic practices built around biological soil nutrition and non-chemical pest management.',
      provides: [
        'Selection of "Organic" approach in your farm profile',
        'Available organic resources (cow dung, urine, compost, crop residues)',
        'Soil biological health status'
      ],
      receives: [
        'Crop recommendations optimized for organic systems',
        'Nutrient schedules using Jeevamrut, vermicompost, and green manures',
        'Preventive organic pest management recipes (Neemastra, Dashparni)'
      ],
      steps: [
        { title: 'Select Organic Mode', desc: 'Toggle the organic farming pathway in your farm profile.' },
        { title: 'Get Bio-Nutrient Guides', desc: 'Follow stage-wise feeding protocols utilizing on-farm natural inputs.' },
        { title: 'Practice Preventive Care', desc: 'Implement biological controls before pest populations cross economic thresholds.' }
      ],
      example: '<strong>Sample Organic Protocol:</strong><br/>• Nutrient strategy: Basal application of 2 tons well-decomposed FYM per acre + 200L Jeevamrut with irrigation every 15 days.<br/>• Crop health: Preventive spray of 5% Neem oil at 30 and 45 days after sowing.',
      limits: 'Organic support is an integrated decision-support feature. Using KisanSangam does not constitute statutory organic certification (such as NPOP / Jaivik Bharat) and does not guarantee price premiums.',
      image: 'App Images/farm-guide-screen/farm-guide-screen-1.png',
      caption: 'Organic farming guide showing bio-nutrient application stages and non-chemical management.'
    }
  };


  /* ==========================================================================
     2. MULTI-PAGE SPA HASH ROUTER
     ========================================================================== */
  const pageContainerIds = [
    'page-home',
    'page-features',
    'page-feature-detail',
    'page-about',
    'page-contact',
    'page-download',
    'page-organic',
    'page-how',
    'page-privacy',
    'page-terms',
    'page-data-request',
    'page-404'
  ];

  // Route metadata for SEO and browser titles
  const routeMeta = {
    'home': {
      title: 'KisanSangam — Smart Farming. Better Tomorrow.',
      desc: 'Agriculture intelligence for Gujarat farmers. Personalized crop recommendations, practical farm guides, weather alerts and mandi prices in one Android app.'
    },
    'features': {
      title: 'Platform Capabilities — KisanSangam',
      desc: '12 integrated agriculture decision support features for Gujarat farmers. Soil Testing coming soon; all other capabilities available now.'
    },
    'feature-detail': {
      title: 'Feature Details — KisanSangam',
      desc: 'In-depth agronomic decision support capabilities built for Gujarat farmers.'
    },
    'about': {
      title: 'About Us — Rooted in Gujarat | KisanSangam',
      desc: 'KisanSangam is built by three co-founders committed to making practical agriculture information accessible for Gujarat farmers.'
    },
    'contact': {
      title: 'Contact the Team — KisanSangam',
      desc: 'Get in touch with the KisanSangam team for product support, research collaboration, or ecosystem partnerships.'
    },
    'download': {
      title: 'Download KisanSangam APK for Android (Official)',
      desc: 'Download the verified official Android APK of KisanSangam. Version 0.9.0 available for direct installation.'
    },
    'organic': {
      title: 'Organic Farming Support — KisanSangam',
      desc: 'Practical crop recommendations and stage-by-stage guidance for cultivation without synthetic fertilizers or chemical pesticides.'
    },
    'how': {
      title: 'How It Works — KisanSangam',
      desc: 'From downloading the APK to harvesting: the step-by-step farming intelligence journey.'
    },
    'privacy': {
      title: 'Privacy Information — KisanSangam',
      desc: 'How KisanSangam collects, protects, and respects agricultural data for farmers.'
    },
    'terms': {
      title: 'Terms of Service — KisanSangam',
      desc: 'Informational terms of service and advisory decision-support disclaimers.'
    },
    'data-request': {
      title: 'Data Deletion Request — KisanSangam',
      desc: 'Submit a request to review or delete your personal account information.'
    },
    '404': {
      title: 'Page Not Found — KisanSangam',
      desc: 'The page you requested could not be found.'
    }
  };

  function renderFeatureDetail(slug) {
    const feat = featureDatabase[slug];
    if (!feat) {
      showPage('page-404');
      return;
    }

    const titleEl = document.getElementById('feat-detail-title');
    const badgeEl = document.getElementById('featDetailBadge');
    const catEl = document.getElementById('featDetailCategory');
    const subEl = document.getElementById('featDetailSubtitle');
    const helpsEl = document.getElementById('featDetailHelps');
    const provEl = document.getElementById('featDetailProvides');
    const recEl = document.getElementById('featDetailReceives');
    const stepsEl = document.getElementById('featDetailSteps');
    const exEl = document.getElementById('featDetailExample');
    const limEl = document.getElementById('featDetailLimits');
    const imgEl = document.getElementById('featDetailImg');
    const capEl = document.getElementById('featDetailCaption');
    const ctaBtn = document.getElementById('featDetailCtaBtn');

    if (titleEl) titleEl.textContent = feat.title;
    if (subEl) subEl.textContent = feat.subtitle;
    if (catEl) catEl.textContent = feat.category;
    if (helpsEl) helpsEl.textContent = feat.helps;

    if (badgeEl) {
      if (feat.isComingSoon) {
        badgeEl.hidden = false;
        badgeEl.textContent = 'Coming Soon';
      } else {
        badgeEl.hidden = true;
      }
    }

    if (provEl) {
      provEl.innerHTML = feat.provides.map(p => `<li>${p}</li>`).join('');
    }
    if (recEl) {
      recEl.innerHTML = feat.receives.map(r => `<li>${r}</li>`).join('');
    }

    if (stepsEl) {
      stepsEl.innerHTML = feat.steps.map((s, idx) => `
        <div class="feat-detail__step-item">
          <div class="feat-detail__step-num">${idx + 1}</div>
          <div class="feat-detail__step-content">
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        </div>
      `).join('');
    }

    if (exEl) exEl.innerHTML = `<p>${feat.example}</p>`;
    if (limEl) limEl.textContent = feat.limits;

    if (imgEl) {
      imgEl.src = feat.image;
      imgEl.alt = `${feat.title} in-app view — illustrative data`;
    }
    if (capEl) capEl.textContent = feat.caption;

    if (ctaBtn) {
      if (feat.isComingSoon) {
        ctaBtn.textContent = 'Contact the Team';
        ctaBtn.href = '#/contact';
      } else {
        ctaBtn.textContent = 'Download Now';
        ctaBtn.href = '#/download';
      }
    }

    // Set page title
    document.title = `${feat.title} — KisanSangam`;
  }

  function showPage(pageId) {
    pageContainerIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === pageId) {
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Trigger animation observer on new page elements
    const animElements = document.querySelectorAll(`#${pageId} .anim-fade-up`);
    animElements.forEach(el => el.classList.add('visible'));
  }

  function updateActiveNavLink(hash) {
    const navLinksEl = document.getElementById('navLinks');
    if (!navLinksEl) return;

    navLinksEl.querySelectorAll('a:not(.btn)').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === hash || (hash.startsWith(href) && href !== '#/home'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleRoute() {
    let hash = window.location.hash || '#/home';

    // Normalize empty or root hash
    if (hash === '' || hash === '#' || hash === '#/') {
      hash = '#/home';
    }

    // Legacy Route Compatibility Redirects
    if (hash === '#/launching-soon' || hash === '#launching-soon') {
      window.location.hash = '#/download';
      return;
    }
    if (hash === '#/why-kisansangam' || hash === '#why-kisansangam') {
      window.location.hash = '#/about';
      return;
    }
    if (hash === '#/highlights') {
      window.location.hash = '#/features';
      return;
    }

    // Check for query parameters inside hash (e.g. #/contact?type=collaboration)
    let path = hash;
    let queryParams = {};
    if (hash.includes('?')) {
      const parts = hash.split('?');
      path = parts[0];
      const queryStr = parts[1];
      queryStr.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) queryParams[k] = decodeURIComponent(v || '');
      });
    }

    updateActiveNavLink(path);

    // Route matching
    if (path === '#/home') {
      showPage('page-home');
      document.title = routeMeta.home.title;
    } else if (path === '#/features') {
      showPage('page-features');
      document.title = routeMeta.features.title;
    } else if (path.startsWith('#/features/')) {
      const slug = path.replace('#/features/', '');
      showPage('page-feature-detail');
      renderFeatureDetail(slug);
    } else if (path === '#/organic-farming') {
      showPage('page-organic');
      document.title = routeMeta.organic.title;
    } else if (path === '#/how-it-works') {
      showPage('page-how');
      document.title = routeMeta.how.title;
    } else if (path === '#/about') {
      showPage('page-about');
      document.title = routeMeta.about.title;
    } else if (path === '#/contact') {
      showPage('page-contact');
      document.title = routeMeta.contact.title;

      // Handle enquiry type pre-selection
      if (queryParams.type === 'collaboration') {
        const contactTypeSelect = document.getElementById('contactType');
        if (contactTypeSelect) {
          contactTypeSelect.value = 'collaboration';
        }
      }
    } else if (path === '#/download') {
      showPage('page-download');
      document.title = routeMeta.download.title;
    } else if (path === '#/privacy') {
      showPage('page-privacy');
      document.title = routeMeta.privacy.title;
    } else if (path === '#/terms') {
      showPage('page-terms');
      document.title = routeMeta.terms.title;
    } else if (path === '#/data-request') {
      showPage('page-data-request');
      document.title = routeMeta.data_request ? routeMeta.data_request.title : 'Data Request — KisanSangam';
    } else {
      showPage('page-404');
      document.title = routeMeta['404'].title;
    }
  }

  window.addEventListener('hashchange', handleRoute);


  /* ==========================================================================
     3. LANGUAGE SELECTOR & I18N SYSTEM
     ========================================================================== */
  const langDropdown = document.getElementById('langDropdown');
  const langTrigger = document.getElementById('langTrigger');
  const langLabel = document.getElementById('langLabel');
  const langOptions = document.querySelectorAll('.lang-dropdown__option');
  let currentLang = localStorage.getItem('kisansangam_lang') || 'en';

  const langDisplayNames = {
    en: 'EN',
    hi: 'हिन्दी',
    gu: 'ગુજરાતી'
  };

  function applyTranslations(lang) {
    if (typeof translations === 'undefined' || !translations[lang]) return;

    // Update innerHTML of [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    document.documentElement.lang = lang;
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('kisansangam_lang', lang);

    if (langLabel) {
      langLabel.textContent = langDisplayNames[lang] || lang.toUpperCase();
    }

    langOptions.forEach(opt => {
      if (opt.dataset.lang === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    applyTranslations(lang);
  }

  if (langTrigger && langDropdown) {
    langTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.toggle('open');
      langTrigger.setAttribute('aria-expanded', isOpen);
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        if (lang) {
          setLanguage(lang);
        }
        langDropdown.classList.remove('open');
        langTrigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove('open');
        langTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langDropdown.classList.contains('open')) {
        langDropdown.classList.remove('open');
        langTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ==========================================================================
     4. NAVBAR & MOBILE MENU
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  function closeMobileMenu() {
    if (navToggle) {
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const willBeActive = !navToggle.classList.contains('active');
      navToggle.classList.toggle('active', willBeActive);
      navToggle.setAttribute('aria-expanded', willBeActive);
      if (navLinks) navLinks.classList.toggle('active', willBeActive);
      if (navOverlay) navOverlay.classList.toggle('active', willBeActive);
      document.body.style.overflow = willBeActive ? 'hidden' : '';
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }


  /* ==========================================================================
     5. FAQ ACCORDION
     ========================================================================== */
  const faqList = document.getElementById('faqList');
  if (faqList) {
    const faqButtons = faqList.querySelectorAll('.faq-item__q');
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const answer = btn.nextElementSibling;

        // Close all other FAQs
        faqButtons.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherBtn.nextElementSibling) {
              otherBtn.nextElementSibling.hidden = true;
            }
          }
        });

        // Toggle current
        btn.setAttribute('aria-expanded', !isExpanded);
        if (answer) {
          answer.hidden = isExpanded;
        }
      });
    });
  }


  /* ==========================================================================
     6. CONTACT FORM HANDLING (Web3Forms Integration)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const typeSelect = document.getElementById('contactType');
      const emailInput = document.getElementById('contactEmail');
      const msgInput = document.getElementById('contactMessage');
      const submitBtn = document.getElementById('contactSubmitBtn');
      const statusDiv = document.getElementById('contactFormStatus');

      // Validation
      let isValid = true;
      const nameError = document.getElementById('nameError');
      const typeError = document.getElementById('typeError');
      const emailError = document.getElementById('emailError');
      const msgError = document.getElementById('messageError');

      [nameError, typeError, emailError, msgError].forEach(el => {
        if (el) {
          el.textContent = '';
          el.classList.remove('visible');
        }
      });

      if (!nameInput.value.trim()) {
        if (nameError) {
          nameError.textContent = 'Please enter your name.';
          nameError.classList.add('visible');
        }
        isValid = false;
      }

      if (!typeSelect.value) {
        if (typeError) {
          typeError.textContent = 'Please select an enquiry type.';
          typeError.classList.add('visible');
        }
        isValid = false;
      }

      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address.';
          emailError.classList.add('visible');
        }
        isValid = false;
      }

      if (!msgInput.value.trim()) {
        if (msgError) {
          msgError.textContent = 'Please write your message.';
          msgError.classList.add('visible');
        }
        isValid = false;
      }

      if (!isValid) return;

      // Submit State
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending Message...';
      statusDiv.className = 'form-status';
      statusDiv.style.display = 'none';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          statusDiv.className = 'form-status form-status--success';
          statusDiv.textContent = 'Thank you! Your message has been received. Our team will respond to your email shortly.';
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        statusDiv.className = 'form-status form-status--error';
        statusDiv.innerHTML = `Could not send message automatically. Please email us directly at <a href="mailto:manavpatel.cloud@gmail.com" style="text-decoration:underline; font-weight:600;">manavpatel.cloud@gmail.com</a>.`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }


  /* ==========================================================================
     7. DATA REQUEST FORM HANDLING
     ========================================================================== */
  const dataReqForm = document.getElementById('dataRequestForm');
  if (dataReqForm) {
    dataReqForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('drName');
      const emailInput = document.getElementById('drEmail');
      const submitBtn = document.getElementById('drSubmitBtn');
      const statusDiv = document.getElementById('dataRequestStatus');

      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert('Please fill out your name and the email address associated with your account.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Request...';

      const formData = new FormData(dataReqForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          statusDiv.className = 'form-status form-status--success';
          statusDiv.textContent = 'Your data request has been logged. We will verify and process your request within 7 business days.';
          dataReqForm.reset();
        } else {
          throw new Error(data.message || 'Submission error');
        }
      } catch (err) {
        statusDiv.className = 'form-status form-status--error';
        statusDiv.innerHTML = `Submission issue. Please email your request directly to <a href="mailto:manavpatel.cloud@gmail.com" style="text-decoration:underline;">manavpatel.cloud@gmail.com</a>.`;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Deletion Request';
      }
    });
  }


  /* ==========================================================================
     8. SCROLL ANIMATIONS (IntersectionObserver)
     ========================================================================== */
  const animElements = document.querySelectorAll('.anim-fade-up');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    animElements.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.style.animationDelay || '0s';
          const delayMs = parseFloat(delay) * 1000;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delayMs);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    animElements.forEach(el => observer.observe(el));
  }


  /* ==========================================================================
     9. INITIALIZATION
     ========================================================================== */
  setLanguage(currentLang);
  handleRoute();

});
