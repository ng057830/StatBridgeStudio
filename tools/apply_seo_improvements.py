import os
import re

# List of HTML files and their configurations
service_files = {
    'survey-data-analysis.html': {
        'url': 'https://statbridgestudio.com/survey-data-analysis.html',
        'title': 'Survey Data Analysis Service | Questionnaire & Likert Scale Support',
        'desc': 'Professional survey data analysis for researchers & students. Expert analysis of questionnaires, Likert scales, survey data using SPSS, R, or Excel.',
        'image': 'survey-analysis-ill.png',
        'alt': 'Survey Analysis Illustration',
        'service_desc': 'Expert statistical analysis of questionnaire responses, scale reliability checks (Cronbach\'s alpha), and descriptive/inferential summaries.'
    },
    'spss-data-analysis.html': {
        'url': 'https://statbridgestudio.com/spss-data-analysis.html',
        'title': 'SPSS Data Analysis Service | Dissertation & Thesis SPSS Help',
        'desc': 'Get professional SPSS data analysis help for your thesis or research. Expert support with regression, ANOVA, descriptive statistics, and APA tables.',
        'image': 'spss-analysis-ill.png',
        'alt': 'SPSS Analysis Illustration',
        'service_desc': 'Expert statistical support for SPSS workflows, including independent/paired t-tests, ANOVA models, multiple regression, correlation analysis, and non-parametric testing.'
    },
    'thesis-statistical-analysis.html': {
        'url': 'https://statbridgestudio.com/thesis-statistical-analysis.html',
        'title': 'Thesis & Dissertation Statistical Analysis Help | Research Support',
        'desc': 'Expert statistical analysis help for master\'s and doctoral theses. Data cleaning, hypothesis testing, results interpretation, and clear reports.',
        'image': 'thesis-analysis-ill.png',
        'alt': 'Thesis Analysis Illustration',
        'service_desc': 'Comprehensive statistical assistance for master\'s theses and doctoral dissertations, including variable coding, test selection, hypothesis verification, and results compiling.'
    },
    'likert-scale-analysis.html': {
        'url': 'https://statbridgestudio.com/likert-scale-analysis.html',
        'title': 'Likert Scale Data Analysis Service | Statistical Questionnaire Help',
        'desc': 'Professional analysis of Likert scale survey responses. Get expert statistical coding, item analysis, descriptive statistics, and clear results.',
        'image': 'likert-analysis-ill.png',
        'alt': 'Likert Scale Analysis Illustration',
        'service_desc': 'Specialized scale statistics for Likert questionnaires, including reliability coefficients, scale aggregation, non-parametric Wilcoxon/Kruskal-Wallis testing, and median distributions.'
    },
    'r-python-statistical-analysis.html': {
        'url': 'https://statbridgestudio.com/r-python-statistical-analysis.html',
        'title': 'R and Python Statistical Analysis Service | RStudio & Jupyter Help',
        'desc': 'Professional R and Python statistical data analysis. Custom script workflows in RStudio and Jupyter Notebooks with reproducible results and charts.',
        'image': 'r-python-analysis-ill.png',
        'alt': 'R and Python Scripting Illustration',
        'service_desc': 'Custom script-based data workflows using R/RStudio and Python, offering data wrangling, advanced regression models, automated reporting, and high-resolution plots.'
    }
}

legal_files = {
    'legal-notice.html': {
        'url': 'https://statbridgestudio.com/legal-notice.html',
        'title': 'Legal Notice | StatBridge Studio',
        'desc': 'Legal Notice of StatBridge Studio. Information on ownership, terms of use, intellectual property, and academic integrity policies.'
    },
    'privacy-policy.html': {
        'url': 'https://statbridgestudio.com/privacy-policy.html',
        'title': 'Privacy Policy | StatBridge Studio',
        'desc': 'Read the Privacy Policy of StatBridge Studio. Learn how StatBridge Studio protects your dataset confidentiality and handle research inquiries.'
    },
    'terms-of-service.html': {
        'url': 'https://statbridgestudio.com/terms-of-service.html',
        'title': 'Terms of Service | StatBridge Studio',
        'desc': 'Terms of Service for StatBridge Studio. Information on project scoping, academic boundaries, delivery terms, and billing procedures.'
    },
    'cookie-policy.html': {
        'url': 'https://statbridgestudio.com/cookie-policy.html',
        'title': 'Cookie Policy | StatBridge Studio',
        'desc': 'Cookie Policy of StatBridge Studio. Information on the technical and analytical cookies used on this website.'
    }
}

# 1. Update index.html
if os.path.exists('index.html'):
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Defer tracking script
    content = content.replace('<script src="./tracking.js"></script>', '<script src="./tracking.js" defer></script>')

    # Semantic Heading Fix
    content = content.replace('<h3>Stuck on your statistical results?</h3>', '<h2>Stuck on your statistical results?</h2>')

    # CLS Prevention (problem section image)
    old_img_tag = '<img src="./assets/images/thesis-analysis-ill.png" alt="Research data analysis support" style="width: 100%; height: auto; display: block;">'
    new_img_tag = '<img src="./assets/images/thesis-analysis-ill.png" alt="Research data analysis support" style="width: 100%; height: auto; display: block;" width="1024" height="1024" loading="lazy" decoding="async">'
    content = content.replace(old_img_tag, new_img_tag)

    # Insert Open Graph & Twitter Cards + JSON-LD
    og_meta = """
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://statbridgestudio.com/">
  <meta property="og:title" content="Statistical Analysis for Thesis & Research | StatBridge Studio">
  <meta property="og:description" content="Professional statistical data analysis for thesis, surveys, and academic research. Support for SPSS, R, Python, regression, ANOVA, and Likert scales.">
  <meta property="og:image" content="https://statbridgestudio.com/assets/images/favicon-logo.png">
  <meta property="og:site_name" content="StatBridge Studio">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://statbridgestudio.com/">
  <meta property="twitter:title" content="Statistical Analysis for Thesis & Research | StatBridge Studio">
  <meta property="twitter:description" content="Professional statistical data analysis for thesis, surveys, and academic research. Support for SPSS, R, Python, regression, ANOVA, and Likert scales.">
  <meta property="twitter:image" content="https://statbridgestudio.com/assets/images/favicon-logo.png">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://statbridgestudio.com/#organization",
        "name": "StatBridge Studio",
        "url": "https://statbridgestudio.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://statbridgestudio.com/assets/images/favicon-logo.png",
          "caption": "StatBridge Studio Logo"
        },
        "image": "https://statbridgestudio.com/assets/images/favicon-logo.png",
        "description": "Professional statistical data analysis for thesis, surveys, and academic research.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "priceRange": "$$",
        "areaServed": ["US", "CA", "GB", "AU"],
        "serviceType": ["Statistical Consultation", "Data Analysis", "Survey Analysis", "SPSS Consulting"]
      },
      {
        "@type": "WebSite",
        "@id": "https://statbridgestudio.com/#website",
        "url": "https://statbridgestudio.com/",
        "name": "StatBridge Studio",
        "publisher": {
          "@id": "https://statbridgestudio.com/#organization"
        }
      }
    ]
  }
  </script>
"""
    content = content.replace('</head>', og_meta + '</head>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully audited and optimized index.html")

# 2. Update service subpages
for filename, config in service_files.items():
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Defer tracking script
        content = content.replace('<script src="./tracking.js"></script>', '<script src="./tracking.js" defer></script>')

        # CLS Prevention (hero illustration)
        old_ill_tag = f'<img src="./assets/images/{config["image"]}" alt="{config["alt"]}" style="max-width: 100%; height: auto; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); border: 1px solid rgba(255,255,255,0.1);">'
        new_ill_tag = f'<img src="./assets/images/{config["image"]}" alt="{config["alt"]}" style="max-width: 100%; height: auto; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); border: 1px solid rgba(255,255,255,0.1);" width="1024" height="1024" decoding="async">'
        content = content.replace(old_ill_tag, new_ill_tag)

        # Meta tags and JSON-LD
        og_meta = f"""
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{config["url"]}">
  <meta property="og:title" content="{config["title"]}">
  <meta property="og:description" content="{config["desc"]}">
  <meta property="og:image" content="https://statbridgestudio.com/assets/images/{config["image"]}">
  <meta property="og:site_name" content="StatBridge Studio">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{config["url"]}">
  <meta property="twitter:title" content="{config["title"]}">
  <meta property="twitter:description" content="{config["desc"]}">
  <meta property="twitter:image" content="https://statbridgestudio.com/assets/images/{config["image"]}">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": "WebPage",
        "@id": "{config["url"]}#webpage",
        "url": "{config["url"]}",
        "name": "{config["title"]}",
        "description": "{config["desc"]}",
        "breadcrumb": {{
          "@id": "{config["url"]}#breadcrumb"
        }}
      }},
      {{
        "@type": "BreadcrumbList",
        "@id": "{config["url"]}#breadcrumb",
        "itemListElement": [
          {{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://statbridgestudio.com/"
          }},
          {{
            "@type": "ListItem",
            "position": 2,
            "name": "{config["title"].split('|')[0].strip()}"
          }}
        ]
      }},
      {{
        "@type": "Service",
        "name": "{config["title"].split('|')[0].strip()}",
        "provider": {{
          "@type": "LocalBusiness",
          "name": "StatBridge Studio",
          "url": "https://statbridgestudio.com/"
        }},
        "description": "{config["service_desc"]}",
        "serviceType": "Statistical Consulting"
      }}
    ]
  }}
  </script>
"""
        content = content.replace('</head>', og_meta + '</head>')
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully audited and optimized {filename}")

# 3. Update thank-you.html
if os.path.exists('thank-you.html'):
    with open('thank-you.html', 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('<script src="./tracking.js"></script>', '<script src="./tracking.js" defer></script>')

    og_meta = """
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://statbridgestudio.com/thank-you.html">
  <meta property="og:title" content="Request Received | StatBridge Studio">
  <meta property="og:description" content="Thank you for your data analysis quote request. I will review your details and get back to you shortly.">
  <meta property="og:image" content="https://statbridgestudio.com/assets/images/favicon-logo.png">
  <meta property="og:site_name" content="StatBridge Studio">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://statbridgestudio.com/thank-you.html">
  <meta property="twitter:title" content="Request Received | StatBridge Studio">
  <meta property="twitter:description" content="Thank you for your data analysis quote request. I will review your details and get back to you shortly.">
  <meta property="twitter:image" content="https://statbridgestudio.com/assets/images/favicon-logo.png">
"""
    content = content.replace('</head>', og_meta + '</head>')
    with open('thank-you.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully audited and optimized thank-you.html")

# 4. Update legal pages
for filename, config in legal_files.items():
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace('<script src="./tracking.js"></script>', '<script src="./tracking.js" defer></script>')

        og_meta = f"""
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{config["url"]}">
  <meta property="og:title" content="{config["title"]}">
  <meta property="og:description" content="{config["desc"]}">
  <meta property="og:image" content="https://statbridgestudio.com/assets/images/favicon-logo.png">
  <meta property="og:site_name" content="StatBridge Studio">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{config["url"]}">
  <meta property="twitter:title" content="{config["title"]}">
  <meta property="twitter:description" content="{config["desc"]}">
  <meta property="twitter:image" content="https://statbridgestudio.com/assets/images/favicon-logo.png">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "{config["url"]}",
    "name": "{config["title"]}",
    "description": "{config["desc"]}"
  }}
  </script>
"""
        content = content.replace('</head>', og_meta + '</head>')
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully audited and optimized {filename}")
