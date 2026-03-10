// ===================================
// Services Tabs Functionality
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    // Calculate and set indicator position
    function updateIndicator(button) {
        if (!tabIndicator || !button) return;
        
        const buttonRect = button.getBoundingClientRect();
        const navRect = button.parentElement.getBoundingClientRect();
        
        // Calculate position relative to nav container
        const left = buttonRect.left - navRect.left;
        const width = buttonRect.width;
        const top = buttonRect.top - navRect.top;
        const height = buttonRect.height;
        
        // Check if we're in mobile view (vertical layout)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            tabIndicator.style.left = '8px';
            tabIndicator.style.top = `${top}px`;
            tabIndicator.style.width = 'calc(100% - 16px)';
            tabIndicator.style.height = `${height}px`;
        } else {
            tabIndicator.style.left = `${left}px`;
            tabIndicator.style.top = '';
            tabIndicator.style.width = `${width}px`;
            tabIndicator.style.height = '';
        }
    }
    
    // Switch tab
    function switchTab(tabName) {
        // Update buttons
        tabButtons.forEach(btn => {
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
                updateIndicator(btn);
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update content with fade animation
        tabContents.forEach(content => {
            if (content.id === `${tabName}-tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // Add click event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Initialize indicator position on first active tab
    const activeButton = document.querySelector('.tab-button.active');
    if (activeButton && tabIndicator) {
        // Delay to ensure layout is ready
        setTimeout(() => {
            updateIndicator(activeButton);
        }, 100);
    }
    
    // Update indicator on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentActive = document.querySelector('.tab-button.active');
            if (currentActive) {
                updateIndicator(currentActive);
            }
        }, 100);
    });
    
    // Glowing button effect
    const glowButtons = document.querySelectorAll('.btn-glow');
    
    glowButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--glow-x', `${x}px`);
            this.style.setProperty('--glow-y', `${y}px`);
        });
    });
    
    // Smooth animations for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.tab-button, .btn-glow, .position-card-modern').forEach(el => {
            el.style.transition = 'all 0.2s ease';
        });
    }
});
