// Multi-Language Support for Tixbro
// English & Hindi Support with IP-based Auto-Detection

const translations = {
    en: {
        // Navigation
        'nav.events': 'Events',
        'nav.concerts': 'Concerts',
        'nav.sports': 'Sports',
        'nav.cities': 'Cities',
        'nav.about': 'About',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.signin': 'Sign In / Sign Up',

        // Hero Section
        'hero.city': 'Your City.',
        'hero.vibe': 'Your Vibe.',
        'hero.night': 'Your Night Out.',
        'hero.subtitle': 'Discover the best events, concerts, sports & experiences across India',
        'hero.search.placeholder': 'Search for events, artists, venues...',
        'hero.search.button': 'Search',
        'hero.scroll': 'Scroll Down',

        // Category Chips
        'category.movies': 'Movies',
        'category.concerts': 'Concerts',
        'category.sports': 'Sports',
        'category.theatre': 'Theatre',
        'category.turf': 'Turf Booking',
        'category.college': 'College Fests',
        'category.bus': 'Bus Tickets',
        'category.events': 'Events',

        // Trending Section
        'trending.title': 'Trending Events',
        'trending.subtitle': 'The hottest events happening right now',
        'trending.viewall': 'View All',
        'trending.booknow': 'Book Now',
        'trending.bookslot': 'Book Slot',
        'trending.onwards': 'onwards',
        'trending.hour': '/hour',
        'trending.badge.trending': 'Trending',
        'trending.badge.new': 'New',

        // Concert Section
        'concerts.title': 'Live Concerts & Music',
        'concerts.subtitle': 'Experience the best live performances',

        // Sports Section
        'sports.title': 'Sports & Games',
        'sports.subtitle': 'Catch the action live',

        // Cities Section
        'cities.title': 'Popular Cities',
        'cities.subtitle': 'Book tickets in your favorite cities',
        'cities.events': 'events',

        // Services Section
        'services.title': 'What We Offer',
        'services.subtitle': 'Your one-stop solution for all entertainment needs',
        'service.turf.title': 'Turf Booking',
        'service.turf.desc': 'Book premium sports turfs for football, cricket & more',
        'service.college.title': 'College Fests',
        'service.college.desc': 'Discover and attend exciting college festival events',
        'service.movies.title': 'Movie Tickets',
        'service.movies.desc': 'Book latest movie tickets at best prices',
        'service.concerts.title': 'Live Concerts',
        'service.concerts.desc': 'Experience unforgettable live music events',
        'service.sports.title': 'Sports Events',
        'service.sports.desc': 'Get tickets for cricket, football & more',
        'service.theatre.title': 'Theatre & Plays',
        'service.theatre.desc': 'Book tickets for amazing theatre performances',
        'service.bus.title': 'Bus Tickets',
        'service.bus.desc': 'Comfortable intercity bus travel bookings',
        'service.events.title': 'Events & More',
        'service.events.desc': 'Explore conferences, exhibitions & workshops',

        // Stats
        'stats.events': 'Events Hosted',
        'stats.users': 'Happy Users',
        'stats.bookings': 'Total Bookings',
        'stats.cities': 'Cities Covered',

        // Newsletter
        'newsletter.title': 'Get WhatsApp Updates',
        'newsletter.subtitle': 'Subscribe to receive event notifications and exclusive offers',
        'newsletter.phone.placeholder': 'Enter your phone number',
        'newsletter.button': 'Subscribe Now',
        'newsletter.privacy': 'We respect your privacy. Your number will only be used for event updates.',

        // Footer
        'footer.tagline': "India's Premier Ticket Booking Platform",
        'footer.quick.title': 'Quick Links',
        'footer.categories.title': 'Categories',
        'footer.company.title': 'Company',
        'footer.support.title': 'Support',
        'footer.copyright': '© 2024 Tixbro. All rights reserved.',

        // Common
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.success': 'Success!',
    },

    hi: {
        // Navigation
        'nav.events': 'इवेंट्स',
        'nav.concerts': 'कॉन्सर्ट',
        'nav.sports': 'खेल',
        'nav.cities': 'शहर',
        'nav.about': 'हमारे बारे में',
        'nav.blog': 'ब्लॉग',
        'nav.contact': 'संपर्क करें',
        'nav.signin': 'साइन इन / साइन अप',

        // Hero Section
        'hero.city': 'आपका शहर।',
        'hero.vibe': 'आपका वाइब।',
        'hero.night': 'आपकी रात बाहर।',
        'hero.subtitle': 'भारत भर में सर्वश्रेष्ठ इवेंट्स, कॉन्सर्ट, स्पोर्ट्स और अनुभव खोजें',
        'hero.search.placeholder': 'इवेंट्स, कलाकारों, स्थानों की खोज करें...',
        'hero.search.button': 'खोजें',
        'hero.scroll': 'नीचे स्क्रॉल करें',

        // Category Chips
        'category.movies': 'फिल्में',
        'category.concerts': 'कॉन्सर्ट',
        'category.sports': 'खेल',
        'category.theatre': 'थिएटर',
        'category.turf': 'टर्फ बुकिंग',
        'category.college': 'कॉलेज फेस्ट',
        'category.bus': 'बस टिकट',
        'category.events': 'इवेंट्स',

        // Trending Section
        'trending.title': 'ट्रेंडिंग इवेंट्स',
        'trending.subtitle': 'अभी सबसे हॉट इवेंट्स',
        'trending.viewall': 'सभी देखें',
        'trending.booknow': 'अभी बुक करें',
        'trending.bookslot': 'स्लॉट बुक करें',
        'trending.onwards': 'से शुरू',
        'trending.hour': '/घंटा',
        'trending.badge.trending': 'ट्रेंडिंग',
        'trending.badge.new': 'नया',

        // Concert Section
        'concerts.title': 'लाइव कॉन्सर्ट और संगीत',
        'concerts.subtitle': 'सर्वश्रेष्ठ लाइव प्रदर्शन का अनुभव करें',

        // Sports Section
        'sports.title': 'खेल और गेम्स',
        'sports.subtitle': 'लाइव एक्शन देखें',

        // Cities Section
        'cities.title': 'लोकप्रिय शहर',
        'cities.subtitle': 'अपने पसंदीदा शहरों में टिकट बुक करें',
        'cities.events': 'इवेंट्स',

        // Services Section
        'services.title': 'हम क्या पेश करते हैं',
        'services.subtitle': 'सभी मनोरंजन जरूरतों के लिए आपका वन-स्टॉप समाधान',
        'service.turf.title': 'टर्फ बुकिंग',
        'service.turf.desc': 'फुटबॉल, क्रिकेट और अधिक के लिए प्रीमियम स्पोर्ट्स टर्फ बुक करें',
        'service.college.title': 'कॉलेज फेस्ट',
        'service.college.desc': 'रोमांचक कॉलेज महोत्सव कार्यक्रमों की खोज करें और भाग लें',
        'service.movies.title': 'मूवी टिकट',
        'service.movies.desc': 'सर्वोत्तम कीमतों पर नवीनतम मूवी टिकट बुक करें',
        'service.concerts.title': 'लाइव कॉन्सर्ट',
        'service.concerts.desc': 'अविस्मरणीय लाइव संगीत कार्यक्रमों का अनुभव करें',
        'service.sports.title': 'स्पोर्ट्स इवेंट्स',
        'service.sports.desc': 'क्रिकेट, फुटबॉल और अधिक के लिए टिकट प्राप्त करें',
        'service.theatre.title': 'थिएटर और नाटक',
        'service.theatre.desc': 'अद्भुत थिएटर प्रदर्शन के लिए टिकट बुक करें',
        'service.bus.title': 'बस टिकट',
        'service.bus.desc': 'आरामदायक अंतरशहर बस यात्रा बुकिंग',
        'service.events.title': 'इवेंट्स और अधिक',
        'service.events.desc': 'सम्मेलनों, प्रदर्शनियों और कार्यशालाओं का अन्वेषण करें',

        // Stats
        'stats.events': 'आयोजित इवेंट्स',
        'stats.users': 'खुश उपयोगकर्ता',
        'stats.bookings': 'कुल बुकिंग',
        'stats.cities': 'कवर किए गए शहर',

        // Newsletter
        'newsletter.title': 'WhatsApp अपडेट प्राप्त करें',
        'newsletter.subtitle': 'इवेंट सूचनाएं और विशेष ऑफ़र प्राप्त करने के लिए सब्सक्राइब करें',
        'newsletter.phone.placeholder': 'अपना फ़ोन नंबर दर्ज करें',
        'newsletter.button': 'अभी सब्सक्राइब करें',
        'newsletter.privacy': 'हम आपकी गोपनीयता का सम्मान करते हैं। आपका नंबर केवल इवेंट अपडेट के लिए उपयोग किया जाएगा।',

        // Footer
        'footer.tagline': 'भारत का प्रमुख टिकट बुकिंग प्लेटफॉर्म',
        'footer.quick.title': 'त्वरित लिंक',
        'footer.categories.title': 'श्रेणियाँ',
        'footer.company.title': 'कंपनी',
        'footer.support.title': 'सहायता',
        'footer.copyright': '© 2024 Tixbro। सर्वाधिकार सुरक्षित।',

        // Common
        'common.loading': 'लोड हो रहा है...',
        'common.error': 'कुछ गलत हो गया',
        'common.success': 'सफलता!',
    }
};

// Language Manager with IP-based Auto-Detection
class LanguageManager {
    constructor() {
        this.currentLang = null;
        this.init();
    }

    async init() {
        // Check if language was manually set before
        const manuallySet = localStorage.getItem('tixbro_lang_manual');

        if (manuallySet) {
            // User has manually chosen a language before, use that
            this.currentLang = localStorage.getItem('tixbro_lang') || 'en';
        } else {
            // First visit - detect based on IP
            this.currentLang = await this.detectLanguageFromIP();
            localStorage.setItem('tixbro_lang', this.currentLang);
        }

        // Apply the language
        this.applyLanguage(this.currentLang);

        // Setup language switcher buttons
        this.addLanguageSwitcher();
    }

    async detectLanguageFromIP() {
        try {
            // Try ipapi.co first (free, no API key required)
            const response = await fetch('https://ipapi.co/json/', {
                timeout: 3000
            });

            if (response.ok) {
                const data = await response.json();
                const countryCode = data.country_code;

                // If user is from India, set Hindi as default
                if (countryCode === 'IN') {
                    console.log('🇮🇳 Indian IP detected - Setting Hindi as default language');
                    return 'hi';
                }
            }
        } catch (error) {
            console.log('IP detection failed, defaulting to English', error);
        }

        // Default to English for all other countries or if detection fails
        return 'en';
    }

    addLanguageSwitcher() {
        // Find existing language buttons (already in HTML)
        const langButtons = document.querySelectorAll('.lang-btn');
        if (langButtons.length === 0) return;

        // Set initial active state based on current language
        langButtons.forEach(btn => {
            const isActive = btn.dataset.lang === this.currentLang;
            btn.classList.toggle('active', isActive);
        });

        // Add click handlers
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang, true); // true = manually set
            });
        });
    }

    switchLanguage(lang, isManual = false) {
        this.currentLang = lang;
        localStorage.setItem('tixbro_lang', lang);

        // Mark as manually set if user clicked the button
        if (isManual) {
            localStorage.setItem('tixbro_lang_manual', 'true');
        }

        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
        });

        // Apply translations
        this.applyLanguage(lang);

        console.log(`🌐 Language switched to: ${lang === 'hi' ? 'Hindi' : 'English'}`);
    }

    applyLanguage(lang) {
        const trans = translations[lang];
        if (!trans) return;

        // Translate all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (trans[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = trans[key];
                } else {
                    // Handle HTML content preservation
                    const hasHTML = el.querySelector('i, span, br');
                    if (hasHTML) {
                        // Preserve icons and other HTML elements
                        const icons = Array.from(el.querySelectorAll('i')).map(i => i.outerHTML);
                        let text = trans[key];

                        // Re-insert icons if they exist
                        if (icons.length > 0) {
                            text = icons[0] + ' ' + text;
                        }

                        el.innerHTML = text;
                    } else {
                        el.textContent = trans[key];
                    }
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    }

    t(key) {
        return translations[this.currentLang][key] || key;
    }
}

// Initialize on DOM load
let i18n;
document.addEventListener('DOMContentLoaded', () => {
    i18n = new LanguageManager();
});

// Export for use in other scripts
window.i18n = i18n;
