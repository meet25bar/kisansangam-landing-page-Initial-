# KisanSangam: website review and Antigravity implementation prompt

Reviewed: 8 October 2026. Live site: https://www.kisansangam.in/

Latest owner direction, 9 October 2026: Present KisanSangam as live with **Download Now** and direct Android APK distribution. The owner will provide the APK to Antigravity. **Only Soil Testing is Coming Soon.** This replaces all earlier pre-launch instructions. This is a website implementation brief, not an independent certification of the app or APK.

## Review scope and findings

Inspected all six public navigation destinations: Home, About, Features, How It Works, Why Us, and Launching Soon. Inspected the shared footer, the crop recommendation detail popup, early-access form requirements, English/Gujarati switching, and rendered page metadata. Visually inspected desktop homepage and inner-page layouts. This is a public website/content review, not a source-code, mobile-device, security, APK, backend form-delivery, or performance certification. No form was submitted. The other ten feature popups were not individually audited.

| Priority | Observed issue | Required change |
|---|---|---|
| P0 | Navigation, hero and signup journey consistently advertise Launching Soon / Early Access. | Replace global Launching Soon / Early Access messaging with Download Now and a real APK download flow. Keep Coming Soon only for Soil Testing. |
| P0 | Visible copy promises live prices, predicted demand, profitability comparisons, instant diagnosis and profile-matched schemes. | Use direct product descriptions, qualify unsupported guarantees, and verify specific functional claims. Only Soil Testing should be described as upcoming. |
| P0 | No Privacy or Terms links appeared in the reviewed navigation/footer, despite collecting contact information. | Add accessible privacy, terms, support and data-request destinations with accurate operator details and reviewed content. |
| P0 | LinkedIn points to #. | Replace with a verified company profile or omit it. |
| P1 | Home consists chiefly of a hero and eight problem cards before the footer. | Build a complete business homepage: concise value proposition, product proof, key features, workflow, geography, team, partnerships, FAQs and conversion. |
| P1 | About explains the ecosystem, mission and vision, but not the people operating it. | Add founders, factual origin story, Gujarat/Narmada focus and real business contact information. |
| P1 | Features says 11 modules and has no dedicated organic-farming feature. | Use a consistent 12-feature marketing structure including organic crop recommendation and farm guidance, with status boundaries. |
| P1 | Feature details use a long A–J report inside a popup. | Replace with readable, linkable feature pages or concise accessible disclosures. Keep technical explanations out of the primary marketing flow. |
| P1 | Gujarati leaves first/last name, email, phone, message labels and preview overlays in English. | Complete translation coverage, including errors, accessibility labels, metadata, forms and dynamic states. |
| P1 | Signup requires first name, last name, email AND phone. | Reduce friction: one name and one required contact channel; collect other information only where justified. |
| P1 | Contact is only a Gmail mailto link; no dedicated contact page was exposed. | Add support and partnership paths. Keep the real existing address until a domain mailbox is provisioned. |
| P1 | Desktop hero uses an iPhone-style device shell while the current intended distribution is Android. | Use actual current Android screenshots in an appropriate device frame. Label illustrative data. |
| P2 | Inner pages repeat similarly sized white cards; the large floating navigation dominates their upper area. | Improve section variety, spacing, header offsets and visual hierarchy. Keep the brand recognizable. |
| P2 | Public routes use #/ paths; the pages inspected share the same English title. Launch-page canonical and OG URL point to the non-www root although browser navigation redirects to www. | Implement crawlable routes, unique metadata and one consistent preferred hostname. Preserve old inbound hash links. |
| P2 | Resource footer links all lead to the generic feature listing. | Link to the specific resource or feature destination. |

Useful elements to retain: recognizable logo, forest-green palette, clear hero typography, product screen assets, existing English/Hindi/Gujarati intent, and a coherent farming-lifecycle story. The redesign should build on these rather than discard the brand.

---

# COPY FROM HERE: MASTER PROMPT FOR ANTIGRAVITY / GEMINI

Act as a senior brand designer, UX strategist, business copywriter and frontend engineer. Redesign and implement the existing KisanSangam business information website in the repository open in this workspace. Inspect https://www.kisansangam.in/ and the existing project before editing. Deliver a complete, polished, responsive website with real content and working navigation, not just a design proposal or a landing-page mockup.

## 1. Goal and working method

Create a credible agriculture technology brand website that helps farmers understand the product, helps institutions and partners understand the initiative, and gives visitors a clear path to download the Android app or contact the team. It should feel contemporary, distinctive and visually impressive while remaining readable and fast on modest phones and slower connections.

First inspect repository instructions, framework, router, assets, language files, existing form integration, deployment configuration, screenshots and the owner-supplied APK. Preserve unrelated work and functioning integrations. Use the current stack unless there is a concrete reason to change it. Do not rewrite the backend, mobile app, admin portal or agronomy engine as part of this website task. Do not deploy automatically. Complete a local preview and report deployment requirements.

Work through implementation autonomously. Do not stop after producing a plan. If a business fact or integration is missing, implement the surrounding experience with truthful fallback behavior and record the missing item in an owner checklist. Never fill gaps with invented claims.

## 2. Product facts and claim boundaries

NON-NEGOTIABLE CURRENT DIRECTION: Build the website for a LIVE Android app, with Download Now as the primary CTA. The owner will supply the APK directly to you. Only Soil Testing is COMING SOON. Remove global Launching Soon, early-access, waitlist, development and future-tense product positioning. Describe the other features in confident present-tense language. Do not label them planned or coming soon. This instruction supersedes all earlier website prompts. Verify that the supplied APK is actually wired to the download flow; never fabricate a file or URL. If it has not yet been supplied, finish the design and download integration structure, then report the missing artifact as a concrete release blocker without reverting the whole website to pre-launch.

- Brand: KisanSangam.
- Brand line: Smart Farming. Better Tomorrow.
- Focus: agriculture decision support for Gujarat farmers, with Narmada as the initial focus for locally supported crop information. Wider coverage must be verified before advertising it as available.
- Founders: Manav Patel, Vivek Patel and Meet Barot. Present all three as co-founders; do not invent individual executive roles, degrees, biographies or achievements.
- Languages: English, Hindi and Gujarati; maintain full website translation coverage.
- The owner's stated model has no platform subscription or platform usage charge. Verify this remains accurate before publishing pricing language. Do not promise third-party testing, equipment rentals, land transactions or mobile data are free.
- Organic support means crop recommendation and farm guidance for farming without synthetic chemical fertilizers or synthetic pesticides. Do not imply organic certification or guaranteed organic premiums.
- Soil Testing is the sole upcoming feature. It is intended to use third-party testing equipment/services. Show Coming Soon consistently on its card, detail page and any related screenshots. Do not offer booking, payment, device connection or report-generation CTAs for this feature. Do not invent accuracy, lab accreditation, prices or turnaround times. Existing farm-profile soil inputs or imported soil-report support are distinct capabilities: mention them as available only if supported; never imply the upcoming testing service is required to use the app.
- AI supports understanding and decision-making. Avoid guaranteed diagnoses, yields, profits, weather outcomes, fertilizer savings or pesticide prescriptions.
- Government schemes should provide verified information and official application destinations. Do not claim government affiliation, guaranteed eligibility, in-app application submission or personalized matching unless actually supported.
- Market information needs source/date/unit/market context. Do not label a static screenshot or stale figure as a live price.
- Android distribution is through the owner-supplied APK on the website. Do not show Google Play or App Store badges without an actual published listing. Do not advertise a farmer web app merely because an admin portal exists.
- No invented user counts, testimonials, partner logos, government approvals, awards, certifications, percentage outcomes, press mentions or business registration numbers. Do not append LLP or Pvt Ltd unless verified.

Create a central content/config model shared by the header, homepage, feature pages, download page, translations and footer: appStatus=LIVE, primaryCTA='Download Now', soilTestingStatus=COMING_SOON. Use one release manifest for APK metadata. All other features use normal present-tense product descriptions. If inspection reveals a material contradiction between the requested copy and the supplied product, report the specific mismatch to the owner rather than silently fabricating functionality or changing every feature to coming soon.

## 3. Creative direction

Design concept: “Rooted in Gujarat. Built for better farming decisions.”

Use a premium agricultural editorial style: warm off-white surfaces, deep forest green, restrained leaf-green highlights, soil-toned accents, generous space, authentic farm photography, crisp typography and excellent product screenshots. Combine strong visual storytelling with useful information.

Suggested starting tokens, adjusted for accessibility:
- Forest: #123D2A; primary green: #286846; warm background: #F7F5EE.
- Main text: #18352A; secondary text: #55645C; borders: #DCE4D8.
- Pale green: #E8F0E2; harvest accent: #D4B15A, used sparingly and not as low-contrast body text.
- Content width around 1200px; comfortable fluid gutters; 16–18px body copy; 1.55–1.7 line height.
- Display headings with a clean expressive sans serif; readable body font. Use appropriate Noto Sans Gujarati and Devanagari fallbacks. Limit font weights and downloads.
- Cards around 16–24px radius, controls around 10–14px, restrained borders and shadows.

Preserve the actual logo and use a clean high-resolution asset. Do not redraw or distort it. Avoid excessive pills, floating badges, emoji icons, neon gradients, glass effects, animated counters, scroll hijacking and identical card grids across every section. Use one consistent SVG icon family.

Use different section compositions: a split hero, an editorial feature spotlight, a compact feature grid, a connected workflow, a geography panel, simple founder profiles and a purposeful closing CTA. Add subtle agricultural field-line motifs only as decorative background details.

Motion: short fades and small translations, gentle hover feedback and optional restrained screenshot transitions. Respect prefers-reduced-motion. No mandatory animation to reveal content; no autoplay video or endlessly moving carousel.

## 4. Information architecture

Primary navigation: Platform, How It Works, About, Contact, language selector, and a prominent Download Now CTA. Put organic guidance under Platform, and make it prominent on the homepage. Avoid overcrowding the desktop header.

Create these destinations using the existing framework:
- / — complete homepage.
- /features — all 12 capabilities, grouped by farmer task.
- /features/[slug] — substantive feature detail pages (only Soil Testing carries a Coming Soon badge); use a reusable template rather than twelve inconsistent layouts.
- /organic-farming — organic approach and supported availability.
- /how-it-works — actual download, onboarding and farming journey.
- /about — mission, founders, focus and approach.
- /contact — support and collaboration enquiries.
- /download — Android APK download, verified version information, installation help and support.
- /privacy, /terms and /data-request — real accessible destinations with accurate approved content and data-request contact flow.

Add a partnerships page only if it contains substantive content; otherwise make partnerships a strong About/Contact section. Do not add an empty blog or fake news archive. Consolidate “Why Us” into factual differentiation on Home/About. Preserve compatibility with all existing #/ navigation URLs; use a client compatibility handler because URL fragments are not sent to the server. Route the old #/launching-soon and /launching-soon destinations to /download; remove them from the public navigation and sitemap.

## 5. Homepage, in this order

A. Compact responsive header
Actual logo; clear links; visible language control; one main CTA; accessible mobile menu. Keep enough top spacing so fixed navigation never hides page headings or anchor targets.

B. Hero
Eyebrow: “Agriculture intelligence for Gujarat”.
Headline: “Better farming decisions. From the ground up.”
Supporting copy: “KisanSangam brings personalized crop recommendations, practical farm guidance, weather updates and market information into one connected platform for better farming decisions.”
Visible status: “Available for Android”.
Primary CTA: Download Now. Link to /download, where a clearly labelled Download APK button initiates the actual file download.
Secondary CTA: Explore the Platform.
Supporting line: “Designed for farmers. In English, Hindi and Gujarati.”
Visual: actual current Android app screenshot in an Android-appropriate frame, paired with authentic agricultural imagery. Do not use an iPhone Dynamic Island shell. If the screen is illustrative, visibly label it “Illustrative screen — sample data”. Do not fake current prices or recommendation results.

C. Compact context strip
Communicate Gujarat focus, language support and organic/conventional options where verified. No unsupported numerical trust badges.

D. Main product story
Headline: “One farm. Connected decisions.”
Explain how farm profile and soil information support crop selection, how the selected crop leads into a farm guide, and how weather, tasks and market information help during the season. Three concise visual steps with real screens should replace the current wall of eight problem cards. Avoid insulting traditional farming knowledge.

E. Two flagship feature spotlights
1. “Advanced Personalized Crop Recommendation”. Suggested copy: “Compare suitable crop options using your farm location, season, soil information and water availability, with clear reasons to support your choice.” Only mention profitability or market forecasts if supported.
2. “Advanced Personalized Farm Guide”. Suggested copy: “Turn your selected crop into a practical, stage-by-stage plan, with activities, reminders and guidance you can return to throughout the season.” Explain problem reporting or rescheduling only if available. AI help may explain context; do not imply chat can automatically change agronomy schedules.

F. Organic farming spotlight
Headline: “A dedicated path for organic farming.”
Copy: “Explore crop recommendations and farm guidance for organic cultivation, with attention to soil health, organic nutrient sources and suitable crop-care practices.”
Clarifier: “Availability depends on the crop and locally supported guidance. Organic guidance does not certify a farm or its produce.”
Link to the organic page. Present organic support as a product feature, without a Coming Soon badge.

G. Capability overview
Show six readable feature cards and a View All Features link. Put the full 12-feature taxonomy on the features page. Avoid overwhelming homepage visitors with long technical descriptions.

H. Responsible input use
Headline: “Make every input a considered decision.”
Copy: “Soil-informed planning can help farmers understand nutrient needs and avoid unnecessary fertilizer use. Recommendations depend on reliable soil information, crop needs and local conditions.”
Do not promise a percentage reduction or a result for every farm.

I. Local focus
Headline: “Built with Gujarat's farming context in mind.”
Explain the initial Narmada focus and why soil, water, season and local crop evidence matter. A simple accessible geography illustration may be used, but do not shade all districts as supported. State that availability varies by crop, feature and location.

J. People and purpose
Show the three founders, a concise mission and a link to About. Use genuine portraits if supplied; otherwise use refined typographic name blocks, never generated founder faces.

K. Collaboration
Headline: “Work with us to support better farming decisions.”
Copy: “We welcome conversations with farmer groups, agricultural institutions, researchers and ecosystem partners interested in practical, locally relevant digital agriculture.”
CTA: Discuss a Collaboration. This is an invitation, not a claim that partnerships exist.

L. FAQs and closing CTA
Use the questions below and answer according to verified product state. End with the same Download Now CTA used in the header, plus Contact the Team.

## 6. Feature taxonomy and detail content

Use these 12 public-facing feature names consistently:
1. Advanced Personalized Crop Recommendation.
2. Advanced Personalized Farm Guide.
3. Soil Testing — Coming Soon.
4. Market Prices & Market Information.
5. Weather Forecasts & Alerts.
6. Farm Cost & Profit Estimation.
7. Farm Management & Reminders.
8. AI Farming Assistant & Crop Doctor.
9. Agricultural Land Leasing.
10. Equipment & Resource Sharing.
11. Government Scheme Information.
12. Organic Farming Support.

Group them under Plan Your Season, Manage Your Farm, and Access Information & Resources. Explain that organic support is a dedicated farming approach across recommendation and guidance, not a separate certification product. Notifications can be described inside management/reminders rather than inflating the feature count.

Feature pages use direct present-tense descriptions. The sole exception is Soil Testing, which uses future-oriented copy and a clearly visible Coming Soon badge. Do not claim 'all 12 features available now': present 12 features with Soil Testing explicitly upcoming. Each detail page should answer: What it helps with; What the farmer provides; What the farmer receives; How it works in three steps; A clearly labelled illustrative example; Relevant availability/limitations; A useful next action. Include one real screenshot where available. Replace the A–J report-style modal structure with concise reader-focused prose. No invented performance metrics or outcome stories.

Use careful wording:
- Market: latest available reported prices, with source/date, rather than universal real-time guarantees.
- Crop Doctor: possible causes and guidance, rather than definitive instant diagnosis.
- Profit: estimates based on stated inputs and assumptions, rather than assured returns.
- Schemes: programme information and official links, rather than promised eligibility.
- Land/equipment: facilitate discovery and contact, rather than guaranteeing verified ownership, contracts or payments.
- Farm Guide: supported crops/locations, rather than “every crop”.

## 7. About, contact and trust

About must include a concise origin/purpose narrative, the founders, Gujarat/Narmada focus, farmer-first design, language accessibility and transparent decision support. Suggested mission: “Make practical agricultural information easier to understand and use, so farmers can plan with greater confidence.” Keep this separate from claims of measured impact.

Contact must distinguish product support from collaboration. The currently visible address is manavpatel.cloud@gmail.com; retain it if it is still the correct monitored channel. Recommend a domain mailbox to the owner, but do not publish a fabricated support@ address. Add telephone, hours and address only when supplied and approved for public use.

Create a short contact form: name; enquiry type; one required reply channel; message. Do not require both phone and email or split first/last name unnecessarily. Provide labels, field validation, loading, success and error states, server-side validation, rate limiting and privacy notice. Preserve the existing form delivery integration if sound. Never show success without an actual successful submission. If delivery is not configured, provide an honest email link and identify the integration gap.

Do not submit real test enquiries without authorization. Validate delivery against a test sink or staging configuration. Keep secrets out of the browser and distinguish a provider's intended public form token from private credentials.

Footer: brand description; platform links; company/contact; download/help; privacy/terms/data requests; only verified social profiles; copyright. Remove the # LinkedIn placeholder. Make specific resource links land on specific content. Avoid empty social icons.

## 8. Live Android download experience and Soil Testing exception

Build /download as a professional direct-distribution page. Headline: “Download KisanSangam for Android.” Supporting copy: “Bring crop guidance, farm planning, weather updates and market information together on your phone.” Primary button: “Download APK”. The general header and promotional CTAs say “Download Now” and lead here. No signup or contact form should block downloading.

The owner will provide the APK directly to Antigravity. Use that exact artifact; do not substitute a debug build, generate an APK, re-sign it, or search unrelated directories for a replacement. Inspect its application ID, versionName, versionCode, minimum Android version, signing validity and debuggable flag using available Android tooling. Compute file size and SHA-256 from the real bytes. Inspect without executing the APK. If tools are missing, report what could not be checked. If the file is malformed, debug-only, unsigned or mismatched, report the specific release blocker instead of claiming a validated public build.

Host the supplied APK on the configured HTTPS website or approved asset storage, with a stable /download page and versioned asset path. Reuse the current hosting stack. Ensure the host serves the actual APK bytes rather than an HTML fallback, supports the correct APK MIME type and an appropriate attachment filename, and does not expose private project files. Never place the artifact inside a JavaScript bundle. Keep release metadata in one manifest consumed by the UI. Do not hardcode historical version numbers, dates, sizes or checksums.

Show verified version, size and minimum Android version; include a release date and changelog only if supplied or otherwise verified. A checksum can appear under Technical Details. On desktop provide a QR code for the canonical /download page; on mobile emphasize the download button. On iOS explain “Android only” and offer the QR/copy-link option without inventing an iOS release date.

Installation help: download the APK from this official site, open the file, allow installation from the specific browser only if Android requests it, follow Android's prompts, then revoke that browser permission if it is no longer needed. Never instruct visitors to disable Play Protect, ignore an authenticity warning or bypass device-wide protections. Include a support route for installation failure. Do not claim that a download started proves a successful installation. Do not promise automatic updates unless the app supports them.

If the APK has not yet been provided, complete the page and integration in the local preview with a clearly nonfunctional internal artifact-missing state. List the supplied APK as the remaining release dependency. Do not publish a fake working download or publicly claim the link is verified. Do not change the requested live-site design into a launch waitlist.

Soil Testing is the only Coming Soon feature:
- Card title: “Soil Testing”; badge: “Coming Soon”.
- Suggested copy: “Soil testing support is on the way to help farmers understand their soil and connect results with better farm planning.”
- Detail page explicitly states that this feature is not yet available.
- No Book Now, Test Your Soil, Pay Now, Connect Device or Generate Report action.
- Optional CTA: “Notify Me About Soil Testing”, only if a real notification-interest workflow is connected; otherwise use Contact the Team.
- Any signup here must explicitly concern Soil Testing alone, include privacy information and honest success/error states, and must not imply the whole app is unavailable.
- Keep this distinction in EN/HI/GU, FAQs, screenshots/captions, How It Works, footer links, metadata and social previews.
- Do not make soil testing a required onboarding step. Describe currently supported soil information inputs accurately.

## 9. FAQ content

Include concise, factual answers to:
- What is KisanSangam?
- Who is it designed for, and which locations/crops does it support?
- How do I get the app? Answer: “Download the Android APK from our official download page and follow the installation instructions.” Link to /download.
- Is Soil Testing available? Answer: “Soil Testing is coming soon. You can download and use KisanSangam's other features now.”
- When will Soil Testing launch? Answer: “We’ll share availability updates when it is ready.” Do not invent a date.
- Is the app on Google Play or iPhone? State the actual distribution: direct Android APK. Do not invent store listings.
- Is there a platform subscription or usage charge?
- Which languages are supported?
- Does KisanSangam support organic farming? Explain its organic crop recommendation and farm guidance features, with accurate supported crop/location boundaries.
- Do I need a soil test to use the platform? Explain actual required/optional inputs.
- Are crop suggestions, AI explanations and profit estimates guarantees? No.
- How recent are market prices and weather updates?
- Does KisanSangam approve government scheme applications? Do not imply this.
- How do I request support or deletion of my information?

Use approved existing policy text where available. Do not invent a legal entity, retention period, data processor list or jurisdiction. Missing policy facts belong in an owner review checklist; incomplete legal copy must not be labelled legally certified or production-approved.

## 10. Languages, accessibility and responsive behavior

Finish English, Gujarati and Hindi across navigation, forms, placeholders, validation, feature text, FAQs, footer, download instructions, Soil Testing notifications, alternative text and accessibility labels. Use plain natural phrasing and flag translations for native-speaker review. Set html lang correctly, preserve selected language across routes, and use suitable script fonts and spacing. Never leave untranslated keys visible.

Use semantic navigation/main/footer, one H1 per page, logical headings, real links/buttons, visible keyboard focus, skip link and meaningful alternative text. Ensure contrast and comfortable minimum 44px touch areas. Menus, FAQs and any dialogs must work by keyboard; dialogs need focus trapping, Escape dismissal and focus restoration. Avoid clickable divs as feature links. Screen-reader announcements should cover form success/errors.

Test at 360, 390, 768, 1024 and 1440px, including long Gujarati/Hindi labels, landscape and 200% zoom. No horizontal overflow. Mobile navigation must not obscure the page or trap scrolling after closing. Any sticky mobile CTA must not cover forms, legal content or device safe areas.

## 11. Search, speed and engineering quality

Use crawlable clean routes and static rendering/prerendering or server rendering suited to the existing stack. Support direct route refresh, browser history, a useful 404 page and old hash-route migration. Standardize www/non-www redirects and canonical URLs. Give every indexable page a unique meaningful title, description, canonical and social preview. Generate sitemap and robots configuration. Use language-specific URLs and hreflang only if implemented correctly; do not emit duplicate misleading language metadata.

Use accurate Organization/WebSite structured data from verified facts. Do not fabricate ratings, reviews, legal identifiers or rich-result eligibility. Validate existing social-preview assets instead of assuming they load.

Optimize real assets as AVIF/WebP where appropriate; use responsive sizes and explicit dimensions. Prioritize the hero image, lazy-load below-the-fold media, subset fonts where feasible, and keep JavaScript/dependencies lean. Avoid a heavy animation framework for simple fades. Target LCP <=2.5s, CLS <=0.1 and INP <=200ms under appropriate field conditions; treat Lighthouse as lab evidence, not proof of field performance. Report actual measured results and the test environment. Never invent a score.

Keep content in structured maintainable data with shared feature records, translation dictionaries, APK release metadata and feature-status configuration. Do not hardcode contradictory availability messages across components. Preserve forms and analytics only when configured appropriately; avoid collecting personal information in analytics events or URLs. Contact-form content must not be logged unnecessarily.

## 12. Validation and delivery

Implement, run the project and inspect rendered pages. Fix visible spacing, typography, clipping, missing assets and mobile menu issues before finishing. Test all navigation, feature destinations, language switching, FAQs, form validation, APK download and Soil Testing states, keyboard use, direct route loads and old links. Test failed form responses, missing APK handling, correct download bytes, file size/checksum, headers, QR destination, all Download Now links and legacy launching-soon redirects. Search EN/HI/GU text and metadata for residual global Launching Soon, early-access, waitlist and in-development wording; upcoming messaging must belong only to Soil Testing. Verify Soil Testing has no booking action. Do not claim APK installation, backend functionality, server delivery or security certification when those checks were not performed.

Provide:
1. Complete implemented website and local preview instructions.
2. A concise file/change summary.
3. Desktop and mobile screenshots of Home, Features, About, Contact, Download and the Soil Testing Coming Soon state.
4. A completed checks table distinguishing PASS, FAIL and NOT TESTED.
5. A claim/availability register showing what evidence supports each public promise.
6. An owner checklist for missing genuine portraits, support mailbox, policies/operator details, supplied APK integration/verification and any specific unsupported functional claims.

The result should feel like a credible, carefully designed agriculture technology business: compelling visuals, concise useful copy, authentic identity, clear product boundaries and reliable visitor journeys. Complete the work before returning; do not finish with a plan alone.
