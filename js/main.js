/**
 * Tixbro - Main JavaScript File
 * Complete functionality including dark mode, mobile menu, smooth scrolling, etc.
 */

// ====== Dark Mode Toggle ======
const initDarkMode = () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    // Update icon based on current theme
    updateThemeIcon(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
};

const updateThemeIcon = (theme) => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');

    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

// ====== Mobile Menu Toggle ======
const initMobileMenu = () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-center');

    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
};

// ====== Navbar Scroll Effect ======
const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
};

// ====== Smooth Scrolling ======
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty hash or just '#'
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
};

// ====== FAQ Accordion ======
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
};

// ====== Back to Top Button ======
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ====== Newsletter Form Handler (WhatsApp) ======
const initNewsletterForm = () => {
    const form = document.getElementById('newsletterForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const phoneInput = document.getElementById('phoneNumber');
        const countryCode = document.getElementById('countryCode');
        const phoneNumber = phoneInput.value.trim();
        const fullNumber = countryCode.value + phoneNumber;

        // Basic phone number validation
        if (!isValidPhoneNumber(phoneNumber)) {
            showNotification('Bitte gib eine gültige Telefonnummer ein (10 Ziffern)', 'error');
            return;
        }

        // Simulate API call to save phone number for WhatsApp newsletter
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird abonniert...';
        submitBtn.disabled = true;

        // Here you would typically send the phone number to your backend
        // which would then add it to your WhatsApp newsletter list
        setTimeout(() => {
            showNotification('Erfolgreich angemeldet! Du erhältst bald WhatsApp Updates 🎉', 'success');
            phoneInput.value = '';
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;

            // Store in localStorage for demo purposes
            localStorage.setItem('whatsapp_subscribed', fullNumber);
        }, 1500);
    });
};

// Phone number validation
const isValidPhoneNumber = (phone) => {
    // Basic validation: 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

// ====== Contact Form Handler ======
const initContactForm = () => {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name')?.value.trim();
        const email = form.querySelector('#email')?.value.trim();
        const subject = form.querySelector('#subject')?.value.trim();
        const message = form.querySelector('#message')?.value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
};

// ====== Hero Search Handler ======
const initHeroSearch = () => {
    const searchInput = document.querySelector('.hero-search .search-input');
    const searchBtn = document.querySelector('.hero-search .search-btn');

    if (!searchInput || !searchBtn) return;

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            // Redirect to shop page with search query
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    };

    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
};

// ====== Category Chips Handler ======
const initCategoryChips = () => {
    const categoryChips = document.querySelectorAll('.category-chip');

    categoryChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            const text = chip.textContent.trim();

            // Map emoji categories to actual category values
            const categoryMap = {
                '🎬 Movies': 'movies',
                '🎵 Concerts': 'concerts',
                '⚽ Sports': 'sports',
                '🎭 Theatre': 'theatre',
                '🏟️ Turf Booking': 'turf',
                '🎓 College Fests': 'college-fest',
                '🚌 Bus Tickets': 'bus',
                '🎉 Events': 'events'
            };

            const category = categoryMap[text];
            if (category) {
                window.location.href = `shop.html?category=${category}`;
            }
        });
    });
};

// ====== Carousel Drag Functionality ======
const initCarouselDrag = () => {
    const carousels = document.querySelectorAll('.events-carousel');

    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor
        carousel.style.cursor = 'grab';
    });
};

// ====== Lazy Loading Images ======
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// ====== Animate on Scroll ======
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
};

// ====== Utility Functions ======
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px'
    });

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
};

// ====== Event Card Click Handlers ======
const initEventCardHandlers = () => {
    const eventCards = document.querySelectorAll('.event-card');

    eventCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a button inside the card
            if (e.target.closest('.btn')) return;

            // For demo purposes, just show a notification
            // In production, this would navigate to the event details page
            const eventTitle = card.querySelector('.event-title')?.textContent || 'Event';
            console.log(`Clicked on event: ${eventTitle}`);
        });
    });
};

// ====== City Card Handlers ======
const initCityCardHandlers = () => {
    const cityCards = document.querySelectorAll('.city-card');

    cityCards.forEach(card => {
        card.addEventListener('click', () => {
            const cityName = card.querySelector('.city-name')?.textContent || '';
            if (cityName) {
                window.location.href = `shop.html?city=${encodeURIComponent(cityName)}`;
            }
        });
    });
};

// ====== Service Card Handlers ======
const initServiceCardHandlers = () => {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const link = card.querySelector('.service-link');
        if (link) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on the link itself
                if (e.target === link || link.contains(e.target)) return;

                link.click();
            });
        }
    });
};

// ====== Trending Category Handlers ======
const initTrendingCategoryHandlers = () => {
    const categoryCards = document.querySelectorAll('.trending-category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.trending-category-title')?.textContent.toLowerCase();

            // Map category titles to shop categories
            const categoryMap = {
                'live music': 'concerts',
                'comedy': 'theatre',
                'college fests': 'college-fest',
                'turf booking': 'turf',
                'rock concerts': 'concerts',
                'cricket': 'sports',
                'workshops': 'events',
                'festivals': 'events'
            };

            const category = categoryMap[title] || 'events';
            window.location.href = `shop.html?category=${category}`;
        });
    });
};

// ====== Initialize All Functions ======
const init = () => {
    // Core functionality
    initDarkMode();
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initBackToTop();

    // Form handlers
    initNewsletterForm();
    initContactForm();
    initHeroSearch();

    // Interactive elements
    initFAQ();
    initCategoryChips();
    initCarouselDrag();

    // Card handlers
    initEventCardHandlers();
    initCityCardHandlers();
    initServiceCardHandlers();
    initTrendingCategoryHandlers();

    // Performance optimizations
    if ('IntersectionObserver' in window) {
        initLazyLoading();
        initScrollAnimations();
    }

    console.log('🚀 Tixbro initialized successfully!');
};

// ====== Run on DOM Content Loaded ======
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ====== Export functions for use in other scripts ======
window.TixbroApp = {
    showNotification,
    isValidEmail
};
