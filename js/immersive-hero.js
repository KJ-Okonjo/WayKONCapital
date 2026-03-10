// ===================================
// Immersive Hero Scroll Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('immersiveHero');
    const heroBackground = document.getElementById('heroBackground');
    const heroHeading = document.getElementById('heroHeading');
    const heroHeadingText = heroHeading?.querySelector('h1');
    
    let ticking = false;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let currentFontWeight = 200;
    let targetFontWeight = 200;
    const maxFontWeight = 900;
    const minFontWeight = 200;
    const scrollResistanceFactor = 3; // Triple resistance
    
    // Smoothing factor for interpolation
    const smoothingFactor = 0.15;
    
    // Enhanced scroll handler with resistance and smoothing
    function updateHeroOnScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const heroHeight = heroSection?.offsetHeight || window.innerHeight;
                
                // Calculate target scroll progress (0 to 1) through the hero section
                // Using 0.5x hero height for faster progression
                targetScrollProgress = Math.min(scrollY / (heroHeight * 0.5), 1);
                
                // Smooth interpolation for scroll progress
                scrollProgress += (targetScrollProgress - scrollProgress) * smoothingFactor;
                
                // Background scale: 1.0 → 1.27
                const bgScale = 1 + (scrollProgress * 0.27);
                if (heroBackground) {
                    heroBackground.style.transform = `scale(${bgScale})`;
                }
                
                // Heading scale: 1.0 → 0.89 (inverse)
                const headingScale = 1 - (scrollProgress * 0.11);
                if (heroHeading) {
                    heroHeading.style.transform = `scale(${headingScale})`;
                }
                
                // Calculate target font weight with easing
                const fontWeightRange = maxFontWeight - minFontWeight;
                
                // Exponential easing for more dramatic effect
                const easedProgress = Math.pow(scrollProgress, 0.7);
                targetFontWeight = minFontWeight + (easedProgress * fontWeightRange);
                
                // Smooth interpolation for font weight
                currentFontWeight += (targetFontWeight - currentFontWeight) * smoothingFactor;
                
                // Apply font weight
                if (heroHeadingText) {
                    const roundedWeight = Math.round(currentFontWeight);
                    heroHeadingText.style.fontWeight = roundedWeight.toString();
                    heroHeadingText.style.fontVariationSettings = `'wght' ${roundedWeight}`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Throttled scroll listener with resistance
    if (heroSection) {
        let lastScrollTop = 0;
        let scrollVelocity = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            scrollVelocity = scrollTop - lastScrollTop;
            lastScrollTop = scrollTop;
            
            // Apply resistance when font weight hasn't reached max
            if (currentFontWeight < maxFontWeight - 50) {
                // Reduce scroll speed effect
                const resistedScroll = scrollTop / scrollResistanceFactor;
                // This creates a "heavy" feeling when scrolling
            }
            
            updateHeroOnScroll();
        }, { passive: true });
        
        updateHeroOnScroll(); // Initial call
    }
    
    
    // ===================================
    // Count-Up Animation for Stats
    // ===================================
    
    function animateCountUp(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const statNumbers = entry.target.querySelectorAll('.stat-card-modern h3');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const hasPrefix = text.includes('£');
                    const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    if (!isNaN(numericValue)) {
                        stat.textContent = hasPrefix ? '£0' : '0';
                        
                        setTimeout(() => {
                            const increment = numericValue / 100;
                            let current = 0;
                            
                            const counter = setInterval(() => {
                                current += increment;
                                if (current >= numericValue) {
                                    stat.textContent = hasPrefix ? `£${numericValue}K` : numericValue;
                                    clearInterval(counter);
                                } else {
                                    const displayValue = Math.floor(current);
                                    stat.textContent = hasPrefix ? `£${displayValue}K` : displayValue;
                                }
                            }, 20);
                        }, 200);
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    const aboutStats = document.querySelector('.about-stats-modern');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
    
    
    // ===================================
    // Card Stacking with Enhanced Glow
    // ===================================
    
    const stackingCards = document.querySelectorAll('.stacking-card');
    
    function updateCardStacking() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                
                stackingCards.forEach((card, index) => {
                    const cardTop = card.offsetTop;
                    const cardHeight = card.offsetHeight;
                    const progress = (scrollY - cardTop) / cardHeight;
                    
                    // Add subtle shadow between stacked cards
                    if (progress > 0 && progress < 1) {
                        const shadowIntensity = Math.min(progress * 15, 15);
                        card.style.boxShadow = `0 -3px ${shadowIntensity}px rgba(0, 0, 0, 0.1)`;
                    } else {
                        card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                    }
                    
                    // Slight scale effect when card is active
                    if (progress >= 0 && progress <= 1) {
                        const scale = 1 - (progress * 0.015);
                        card.style.transform = `scale(${scale})`;
                    } else if (progress > 1) {
                        card.style.transform = 'scale(0.985)';
                    } else {
                        card.style.transform = 'scale(1)';
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateCardStacking, { passive: true });
    
    
    // ===================================
    // Enhanced Card Glow Effect on Mouse Move
    // ===================================
    
    stackingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            
            // Calculate distance from center (0 at center, 100 at edge)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const normalizedDistance = Math.min((distance / maxDistance) * 100, 100);
            
            // Calculate angle for glow direction
            const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            
            // Set CSS variables for glowing edge effect
            card.style.setProperty('--pointer-x', `${percentX}%`);
            card.style.setProperty('--pointer-y', `${percentY}%`);
            card.style.setProperty('--pointer-deg', `${angle}deg`);
            card.style.setProperty('--pointer-d', normalizedDistance.toFixed(1));
        });
        
        card.addEventListener('mouseleave', function() {
            // Smoothly fade out glow
            card.style.setProperty('--pointer-d', '0');
        });
    });
    
    
    // ===================================
    // Navigation Active State (Fixed)
    // ===================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    function updateActiveNav() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = new URL(link.href).pathname;
            const linkHash = new URL(link.href).hash;
            
            // Check if we're on index page
            const isIndexPage = currentPath === '/' || currentPath.includes('index.html');
            
            // Highlight only the current section
            if (linkHash && isIndexPage) {
                // If link has hash and we're on index page
                if (linkHash === currentHash || (linkHash === '' && currentHash === '')) {
                    link.classList.add('active');
                }
            } else if (!linkHash && currentPath === linkPath) {
                // For non-hash links, match exact path
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNav();
    
    // Update active state on hash change
    window.addEventListener('hashchange', updateActiveNav);
    
    
    // ===================================
    // Brand Logo as Home Button
    // ===================================
    
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    
    // ===================================
    // Navbar Scroll Effect
    // ===================================
    
    const navbar = document.querySelector('.navbar-immersive');
    
    function updateNavbar() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar(); // Initial call
    
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    
    const navToggle = document.getElementById('navToggleImmersive');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinksContainer.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
                navLinksContainer.classList.remove('active');
            }
        });
    }
    
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, href);
                updateActiveNav();
            }
        });
    });
});
