// ===================================
// Immersive Hero Scroll Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('immersiveHero');
    const heroBackground = document.getElementById('heroBackground');
    const heroHeading = document.getElementById('heroHeading');
    const heroLabel = document.querySelector('.hero-label');
    
    let ticking = false;
    
    // Scroll handler for hero animations
    function updateHeroOnScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
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
                        const shadowIntensity = Math.min(progress * 20, 20);
                        card.style.boxShadow = `0 -4px ${shadowIntensity}px rgba(0, 0, 0, 0.1)`;
                    } else {
                        card.style.boxShadow = 'none';
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
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
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
