// BoxClub NYC - Smooth scroll navigation
console.log('BoxClub NYC script starting...');

// Smooth scroll navigation functionality
function initNavigation() {
    console.log('Initializing navigation...');
    
    const homeRadio = document.getElementById('glass-boxclub');
    const coachesRadio = document.getElementById('glass-silver');
    const paymentRadio = document.getElementById('glass-gold');
    
    const homeSection = document.getElementById('home');
    const coachesSection = document.getElementById('coaches');
    const paymentSection = document.getElementById('payment');

    // Smooth scroll to section
    function scrollToSection(targetSection) {
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Update active navigation based on scroll position
    function updateActiveNavigation() {
        const sections = [homeSection, coachesSection, paymentSection];
        const radios = [homeRadio, coachesRadio, paymentRadio];
        
        let activeIndex = 0;
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            if (section && section.offsetTop <= scrollPosition) {
                activeIndex = index;
            }
        });
        
        // Update radio button selection
        radios.forEach((radio, index) => {
            if (radio) {
                radio.checked = index === activeIndex;
            }
        });
    }

    // Event listeners for navigation clicks
    if (homeRadio && homeSection) {
        homeRadio.addEventListener('change', () => {
            if (homeRadio.checked) {
                scrollToSection(homeSection);
            }
        });
    }

    if (coachesRadio && coachesSection) {
        coachesRadio.addEventListener('change', () => {
            if (coachesRadio.checked) {
                scrollToSection(coachesSection);
            }
        });
    }

    if (paymentRadio && paymentSection) {
        paymentRadio.addEventListener('change', () => {
            if (paymentRadio.checked) {
                scrollToSection(paymentSection);
            }
        });
    }

    // Listen for scroll to update navigation
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Initialize - set home as active
    if (homeRadio) homeRadio.checked = true;
    console.log('Navigation initialized successfully');
}

// Scroll animation system
function initScrollAnimations() {
    console.log('Initializing scroll animations...');
    
    // Add scroll listener with throttling for performance
    let isScrolling = false;
    
    function throttledScrollHandler() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScrollAnimations();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Initial check
    setTimeout(handleScrollAnimations, 500);
    
    console.log('Scroll animations initialized');
}

function handleScrollAnimations() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Reset all animations if we're at the very top
    if (scrollTop <= 50) {
        resetAnimations();
        return;
    }
    
    // Find all scroll-animate elements on the page
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    animateElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        
        // Element is in viewport (with some buffer)
        const isInViewport = elementTop < windowHeight * 0.8 && elementBottom > 0;
        
        if (isInViewport && !element.classList.contains('animate-in')) {
            // Add staggered delay for multiple elements
            setTimeout(() => {
                element.classList.add('animate-in');
                console.log('Animated:', element.className);
            }, index * 50); // Reduced delay for better flow
        }
    });
}

function resetAnimations() {
    console.log('Resetting all animations...');
    
    // Remove animate-in class from all elements
    const animatedElements = document.querySelectorAll('.scroll-animate.animate-in');
    animatedElements.forEach(element => {
        element.classList.remove('animate-in');
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing BoxClub NYC...');
    initNavigation();
    initScrollAnimations();
});

// Backup initialization
setTimeout(function() {
    console.log('Backup initialization...');
    initNavigation();
    initScrollAnimations();
}, 1000);

// Debug functions for testing
window.testAnimations = function() {
    console.log('Testing animations manually...');
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
            console.log('Animated:', element.className);
        }, index * 100);
    });
};

window.resetAnimations = resetAnimations;

console.log('BoxClub NYC script loaded - normal scroll navigation active!');


