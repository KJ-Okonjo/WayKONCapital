# WayKon Capital - Quick Deployment Guide

## Instant Local Preview

### Option 1: Direct Browser Open
```bash
cd /data/.openclaw/workspace/waykon-capital
open index.html  # Mac
# or
start index.html # Windows
# or
xdg-open index.html # Linux
```

### Option 2: Local Server (Recommended)
```bash
cd /data/.openclaw/workspace/waykon-capital

# Python 3 (most common)
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## Production Deployment (5 minutes)

### Fastest: Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag the entire `waykon-capital` folder
3. Done! Your site is live with a URL like `https://random-name.netlify.app`

### Best for Custom Domain: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /data/.openclaw/workspace/waykon-capital
vercel --prod

# Follow prompts to connect domain
```

### Traditional Hosting (cPanel/FTP)

1. **Connect via FTP:**
   - Host: your-domain.com
   - Username: your-username
   - Password: your-password

2. **Upload Files:**
   - Upload all files to `public_html` or `www`
   - Keep folder structure intact

3. **Visit:** https://your-domain.com

### AWS S3 Static Hosting

```bash
# Create S3 bucket
aws s3 mb s3://waykoncapital.com

# Upload files
cd /data/.openclaw/workspace/waykon-capital
aws s3 sync . s3://waykoncapital.com --acl public-read

# Enable static website hosting
aws s3 website s3://waykoncapital.com --index-document index.html

# Done! Access via S3 URL
```

## Pre-Launch Checklist

### Content
- [ ] Replace all placeholder text with actual company information
- [ ] Update contact email addresses
- [ ] Add real phone numbers and office address
- [ ] Replace portfolio company descriptions

### Images
- [ ] Replace hero background image
- [ ] Add real portfolio company logos/images
- [ ] Add service section images
- [ ] Add office location map (Google Maps embed or image)
- [ ] Add company logo to navigation

### Forms
- [ ] Connect contact form to email service (see below)
- [ ] Connect careers form to applicant tracking system
- [ ] Test form submissions

### SEO
- [ ] Update meta descriptions with real company info
- [ ] Add Google Analytics tracking code
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console

### Legal
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Add cookie consent banner (if required)
- [ ] Ensure GDPR compliance (if serving EU users)

## Form Integration Options

### Option 1: Formspree (Easiest - Free tier available)

```html
<!-- In contact.html, update form tag: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
    <!-- Keep existing fields -->
</form>
```

1. Sign up at https://formspree.io
2. Create a form
3. Get your form ID
4. Replace `YOUR_FORM_ID` in the action URL

### Option 2: Netlify Forms (Free with Netlify hosting)

```html
<!-- Add netlify attribute to form: -->
<form name="contact" method="POST" data-netlify="true" class="contact-form">
    <!-- Keep existing fields -->
</form>
```

Deploy to Netlify and forms work automatically!

### Option 3: Google Forms Embed

1. Create form in Google Forms
2. Get embed code
3. Replace form section with iframe

### Option 4: Custom Backend

Build API endpoint with:
- Node.js + Express + Nodemailer
- PHP mail() function
- Python Flask + SMTP
- Email service API (SendGrid, Mailgun, etc.)

## Custom Domain Setup

### Netlify
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### Vercel
```bash
vercel domains add your-domain.com
# Follow prompts
```

### Cloudflare (Recommended for any hosting)
1. Add site to Cloudflare
2. Update nameservers at domain registrar
3. Enable HTTPS, caching, and security features

## Performance Optimization

### Image Optimization
```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize images
imagemin images/*.jpg --out-dir=images/optimized
```

### Enable Caching
Add to `.htaccess` (Apache) or `netlify.toml`:

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### Enable Gzip Compression
Most hosting platforms enable this by default. If not, add to `.htaccess`:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

## Post-Deployment Testing

### Functionality Checklist
- [ ] All navigation links work
- [ ] Mobile menu opens/closes properly
- [ ] Forms submit successfully
- [ ] FAQ accordion expands/collapses
- [ ] Application modal opens/closes
- [ ] All images load
- [ ] Animations trigger on scroll
- [ ] Hover effects work on cards/buttons

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing
- Run Lighthouse audit in Chrome DevTools
- Target scores: 90+ for all categories

### Responsive Testing
- Test on actual devices or use browser DevTools
- Check breakpoints: 1920px, 1024px, 768px, 375px

## Monitoring & Analytics

### Google Analytics
Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

## Troubleshooting

### Images Not Loading
- Check file paths are correct
- Ensure images folder is uploaded
- Verify image file names match HTML references

### Forms Not Working
- Check form action URL
- Verify method="POST"
- Test with form service dashboard

### Styles Not Applied
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check CSS file path in HTML
- Verify CSS file was uploaded

### Mobile Menu Not Working
- Check JavaScript file is loaded
- Look for console errors
- Verify nav-toggle ID matches JavaScript

## Support Resources

- **HTML/CSS Issues:** https://stackoverflow.com
- **Hosting Help:** Provider documentation
- **Performance:** https://web.dev/measure
- **SEO:** https://search.google.com/search-console

---

**Need help?** Refer to README.md for detailed documentation.
