# StatBridge Studio

**StatBridge Studio** is a professional, high-converting static website offering statistical data analysis and research support services for students, researchers, graduate students, and small research teams.

Website URL: [https://statbridgestudio.com](https://statbridgestudio.com)

---

## File Structure

```text
├── index.html                           # Main landing page (English)
├── thank-you.html                       # Conversion/Thank You page with tracking deduplication
├── survey-data-analysis.html            # SEO Cluster: Survey & Scale Reliability Analysis
├── spss-data-analysis.html              # SEO Cluster: SPSS Statistical Services
├── thesis-statistical-analysis.html     # SEO Cluster: Master's & Doctoral Thesis Statistics
├── likert-scale-analysis.html           # SEO Cluster: Likert scale & non-parametric testing
├── r-python-statistical-analysis.html   # SEO Cluster: RStudio and Jupyter Notebook workflows
├── legal-notice.html                    # Legal notice & Academic Integrity disclaimer
├── privacy-policy.html                  # GDPR-compliant Privacy Policy
├── cookie-policy.html                   # Cookie consent guidelines
├── terms-of-service.html                # Booking terms, scoping, and payment policies
├── styles.css                           # Main styling system (Teal/Blue palette, modern typography)
├── script.js                            # UI interactions, FAQ toggles, and cookie consent banner
├── tracking.js                          # Central analytics, UTM parameters capture, and deduplication
├── sitemap.xml                          # Independent XML sitemap for search engines
├── robots.txt                           # Search engine crawling rules
├── assets/
│   └── favicon/                         # Custom SBS favicons (SVG vector, manifest, apple icons)
└── tools/
    └── build-check.js                   # Local SEO and build quality audit validator
```

---

## Local Development & Testing

1. Open `index.html` directly in any web browser or use a local development server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (live-server or similar)
   npx live-server
   ```
2. Navigate to `http://localhost:8000`.

### Validating SEO & Links
You can audit the project for broken references, metadata issues, and canonical tag structures by running the quality checker script:
```bash
node tools/build-check.js
```
The output should report `[SUCCESS] All checks passed successfully!`.

---

## Tracking & Analytics Setup

All tracking and conversion codes are managed inside `tracking.js`.

### 1. Google Analytics & Google Ads
Locate the `TRACKING_CONFIG` block in `tracking.js` (lines 5-18):
```javascript
const TRACKING_CONFIG = {
  GOOGLE_TAG_ID: 'G-XXXXXXXXXX', 
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', 
  GOOGLE_ADS_CONVERSION_ID: 'AW-XXXXXXXXXX', 
  GOOGLE_ADS_LABEL_DATA_ANALYSIS_LEAD: '',
  ...
```
Replace the placeholders with your live IDs. 
* **Safe Validation**: If the values are kept as placeholders (e.g., `'G-XXXXXXXXXX'`), the module will automatically block Gtag loading and skip execution to prevent console script errors.

### 2. Marketing Parameters (UTM & gclid)
The website automatically captures parameters in the query string (`?utm_source=...&gclid=...`) upon entry and saves them to browser `localStorage` with a `tmp_` prefix. 
* Hidden form fields are automatically generated and pre-filled with these parameters before submission.
* Open the browser console (`F12`) -> **Application** -> **Local Storage** to inspect captured parameters.

### 3. Lead Event & Deduplication
When a user submits the request form, a `lead_data_analysis_quote` event is queued. Upon loading `thank-you.html`, this event is fired to GA4 and Google Ads.
* **Deduplication**: The script saves `tmp_sent_da_lead_[lead_id] = true` to `localStorage`. If the user refreshes the page, the event is skipped to prevent duplicate conversion tracking.

---

## Contact Form & Spam Protection

* **Honeypot Protection**: The form contains a hidden text field (`id="form-website"`). If filled out (which automated spam bots do), the form submission is immediately blocked.
* **hCaptcha Preparedness**: To activate hCaptcha in Web3Forms, uncomment the hCaptcha div and script tag in `index.html` (lines 645-649) and configure your sitekey.
* **REST API Submission**: Form data is sent asynchronously to Web3Forms and then redirects to `thank-you.html`.

---

## Hotmart Integration

Locate the Hotmart section in `tracking.js`:
```javascript
  HOTMART_DATA_AUDIT_URL: '',
  HOTMART_SURVEY_THESIS_ANALYSIS_URL: '',
  HOTMART_FULL_RESEARCH_REPORT_URL: ''
```
* **Inactive (Default)**: While empty, clicking pricing buttons smooth-scrolls users to the request form.
* **Active**: Paste your checkout links here, and pricing buttons will take users directly to Hotmart.

---

## Publication Steps

1. Purchase your domain `statbridgestudio.com`.
2. Configure static hosting (e.g., Netlify, Vercel, Firebase Hosting, or GitHub Pages).
3. Upload all project files and the `assets` folder to the root of your host.
4. Point DNS records (`A` and `CNAME`) to your hosting provider.
5. Enable SSL/HTTPS on your hosting panel.
