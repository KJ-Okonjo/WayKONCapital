# WayKon Capital - Corporate Website

A fully functional, multi-page website for WayKon Capital, a premier holding company.

## 📁 Project Structure

```
waykon-capital/
├── index.html          # Homepage
├── companies.html      # Portfolio/Companies page
├── services.html       # Services page
├── contact.html        # Contact page
├── faq.html           # FAQ page
├── careers.html       # Careers page
├── css/
│   └── style.css      # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
└── README.md          # This file
```

## 🎨 Design Features

### Color Palette
- **Background:** Very light beige-white (#faf9f7)
- **Primary:** Grey (#6b6b6b), Black (#1a1a1a)
- **Accent:** Very dark brown (#3d3128, #2a211a)
- **White:** #ffffff

### Typography
- **Body:** Modern sans-serif (Inter, Segoe UI, Roboto)
- **Headings:** Georgia serif for elegant, professional look

### Key Features
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Smooth scroll animations and fade-in effects
- ✅ Interactive hover effects on buttons and cards
- ✅ Dropdown navigation menus
- ✅ FAQ accordion functionality
- ✅ Contact and application forms (placeholder functionality)
- ✅ Professional, minimalist design
- ✅ SEO-optimized meta tags
- ✅ Cross-browser compatible

## 📄 Pages Overview

### Homepage (index.html)
- Hero section with tagline
- About section with company stats
- Investment focus areas (6 sectors)
- Call-to-action sections

### Companies (companies.html)
- Portfolio grid with 9 company cards
- Company tags by sector
- Recent investments timeline
- Hover effects on portfolio cards

### Services (services.html)
- Three main service offerings:
  1. Strategic Advisory
  2. Operational Management
  3. Growth Strategy
- Detailed service descriptions with icons
- Approach philosophy section

### Contact (contact.html)
- Contact information display
- Contact form with validation
- Office location map placeholder
- Office hours

### FAQ (faq.html)
- Accordion-style FAQ items
- Organized by category:
  - Investment Approach
  - Partnership & Services
  - Process & Timeline
  - About WayKon Capital

### Careers (careers.html)
- Company values grid
- Open positions listings
- Benefits & perks section
- Application modal with form

## 🚀 Deployment

### Local Testing

1. **Open directly in browser:**
   ```bash
   # Navigate to the project folder
   cd waykon-capital
   
   # Open index.html in your default browser
   open index.html  # Mac
   start index.html # Windows
   xdg-open index.html # Linux
   ```

2. **Using a local server (recommended):**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have it)
   npx serve
   ```
   
   Then visit: `http://localhost:8000`

### Production Deployment

#### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd waykon-capital
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd waykon-capital
vercel --prod
```

**GitHub Pages:**
1. Create a GitHub repository
2. Push the `waykon-capital` folder
3. Go to Settings → Pages
4. Select branch and root folder
5. Save and wait for deployment

#### Option 2: Traditional Web Hosting (cPanel, FTP)

1. Connect via FTP to your web host
2. Upload all files to `public_html` or `www` directory
3. Ensure folder structure is maintained
4. Visit your domain

#### Option 3: Cloud Hosting (AWS S3, Google Cloud Storage, Azure)

**AWS S3:**
```bash
# Create bucket
aws s3 mb s3://waykoncapital.com

# Upload files
aws s3 sync . s3://waykoncapital.com --acl public-read

# Enable static website hosting in AWS Console
```

## 🔧 Customization

### Update Company Information

1. **Logo:** Replace "WayKon Capital" text in `.nav-brand` with `<img>` tag
2. **Images:** Replace placeholder URLs in HTML with your actual images
3. **Content:** Edit text directly in HTML files
4. **Colors:** Modify CSS variables in `style.css` (`:root` section)

### Example: Change Primary Color

```css
/* In css/style.css */
:root {
    --color-brown: #your-new-color;
    --color-brown-dark: #your-darker-shade;
}
```

### Example: Add Real Logo

```html
<!-- In all HTML files, replace: -->
<div class="nav-brand">
    <a href="index.html">WayKon Capital</a>
</div>

<!-- With: -->
<div class="nav-brand">
    <a href="index.html">
        <img src="images/logo.png" alt="WayKon Capital" style="height: 40px;">
    </a>
</div>
```

## 📱 Responsive Breakpoints

- **Desktop:** 1024px and above
- **Tablet:** 768px - 1024px
- **Mobile:** Below 768px
- **Small Mobile:** Below 480px

## 🎯 Interactive Features

### Navigation
- Fixed navbar with scroll effect
- Mobile hamburger menu
- Dropdown menus for Services and Companies
- Smooth scroll to anchor links

### Animations
- Fade-in on scroll for content sections
- Hover effects on buttons (scale, shadow)
- Hover lift on cards
- Image zoom on portfolio items

### Forms
- Contact form with validation
- Career application form with file upload
- Modal for job applications
- Success notifications

### FAQ Accordion
- Click to expand/collapse answers
- Smooth height transitions
- Only one item open at a time

## 🔍 SEO

Each page includes:
- Unique `<title>` tags
- Meta descriptions
- Keyword meta tags
- Semantic HTML5 structure
- Proper heading hierarchy

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Forms Notice

**Important:** The contact and application forms currently use placeholder functionality (console.log). To make them functional, you need to:

1. Set up a backend API endpoint
2. Use a form service (Formspree, Netlify Forms, etc.)
3. Connect to your email service

Example with Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- form fields -->
</form>
```

## 🖼️ Image Placeholders

All images currently use placeholder.com URLs. Replace with:
- Company logo
- Hero background images
- Portfolio company images
- Service section images
- Office location map

Recommended image sizes:
- Hero: 1920x1080px
- Portfolio cards: 400x250px
- Service images: 600x400px
- Map: 1920x400px

## 📞 Support

For questions or customization requests, contact your development team.

## 📜 License

© 2026 WayKon Capital. All rights reserved.

---

**Built with:** HTML5, CSS3, Vanilla JavaScript
**Design Inspiration:** Modern corporate minimalism
**Status:** Production-ready
