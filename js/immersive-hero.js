// ===================================
// Immersive Hero Scroll Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('immersiveHero');
    const heroBackground = document.getElementById('heroBackground');
    const heroHeading = document.getElementById('heroHeading');
    const heroHeadingText = heroHeading?.querySelector('h1');
    
    let ticking = false;
    
    // Scroll handler for hero animations
    function updateHeroOnScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const heroHeight = heroSection?.offsetHeight || window.innerHeight;
                
                // Calculate scroll progress (0 to 1) through the hero section
                const scrollProgress = Math.min(scrollY / heroHeight, 1);
                
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
                
                // Font weight animation: 300 → 800
                if (heroHeadingText) {
                    const fontWeight = 300 + (scrollProgress * 500);
                    heroHeadingText.style.fontWeight = fontWeight.toString();
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Throttled scroll listener
    if (heroSection) {
        window.addEventListener('scroll', updateHeroOnScroll, { passive: true });
        updateHeroOnScroll(); // Initial call
    }
    
    
    // ===================================
    // Card Stacking with Glow Effects
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
    // Card Glow Effect on Mouse Move
    // ===================================
    
    stackingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate percentage position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            
            // Calculate distance from center (0 at center, 1 at edge)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            
            // Calculate angle for glow direction
            const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            
            // Set CSS variables
            card.style.setProperty('--pointer-x', `${percentX}%`);
            card.style.setProperty('--pointer-y', `${percentY}%`);
            card.style.setProperty('--pointer-deg', `${angle}deg`);
            card.style.setProperty('--pointer-d', normalizedDistance.toFixed(3));
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset glow
            card.style.setProperty('--pointer-d', '0');
        });
    });
    
    
    // ===================================
    // Navigation Active State
    // ===================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath.includes('index.html')) ||
            (currentPath.includes('index.html') && linkPath.includes('index.html'))) {
            link.classList.add('active');
        }
    });
    
    
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
        navToggle.addEventListener('click', function() {
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
            }
        });
    });
});
