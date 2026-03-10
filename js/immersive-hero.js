// ===================================
// Immersive Hero Scroll Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('immersiveHero');
    const heroBackground = document.getElementById('heroBackground');
    const heroHeading = document.getElementById('heroHeading');
    const heroLabel = document.querySelector('.hero-label');
    const navbar = document.querySelector('.navbar-immersive');
    
    let ticking = false;
    
    // Scroll handler for hero animations
    function updateHeroOnScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                
                // Navbar background on scroll
                if (navbar && !navbar.classList.contains('scrolled')) {
                    if (scrollY > 50) {
                        navbar.classList.add('scrolled');
                    }
                } else if (navbar && scrollY <= 50) {
                    navbar.classList.remove('scrolled');
                }
                
                // Only run hero animations if hero section exists
                if (heroSection) {
                    const heroHeight = heroSection.offsetHeight;
                    
                    // Calculate scroll progress (0 to 1) for the first 30% of viewport scroll
                    const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.3), 1);
                    
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
                    
                    // Label fade out
                    if (heroLabel) {
                        const labelOpacity = 1 - scrollProgress;
                        heroLabel.style.opacity = labelOpacity;
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Throttled scroll listener
    window.addEventListener('scroll', updateHeroOnScroll, { passive: true });
    
    // Initial call
    updateHeroOnScroll();
    
    
    // ===================================
    // Card Stacking Scroll Effects
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
                        const shadowIntensity = Math.min(progress * 30, 30);
                        card.style.boxShadow = `0 -8px ${shadowIntensity}px rgba(0, 0, 0, 0.15)`;
                    } else {
                        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                    }
                    
                    // Optional: slight scale effect when card is active
                    if (progress >= 0 && progress <= 1) {
                        const scale = 1 - (progress * 0.02);
                        card.style.transform = `scale(${scale})`;
                    } else if (progress > 1) {
                        card.style.transform = 'scale(0.98)';
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
    // Mobile Navigation Toggle
    // ===================================
    
    const navToggle = document.getElementById('navToggleImmersive');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
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
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const offsetTop = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ===================================
    // Fade on Scroll Animation
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
