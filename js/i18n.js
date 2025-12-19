// Multi-Language Support for Tixbro
// English & Hindi Support

const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.shop': 'Shop',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.signin': 'Sign In / Sign Up',

        // Hero Section
        'hero.title': 'Your Night Out.',
        'hero.subtitle': 'Discover the best events, concerts, sports & experiences across India',
        'hero.cta': 'Explore Events',

        // Services
        'services.title': 'What We Offer',
        'services.subtitle': 'Your one-stop solution for all entertainment needs',

        // Service Cards
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

        // Footer
        'footer.tagline': "India's Premier Ticket Booking Platform",
        'footer.copyright': '© 2024 Tixbro. All rights reserved.',

        // Common
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.success': 'Success!',
    },

    hi: {
        // Navigation
        'nav.home': 'होम',
        'nav.shop': 'शॉप',
        'nav.about': 'हमारे बारे में',
        'nav.contact': 'संपर्क करें',
        'nav.signin': 'साइन इन / साइन अप',

        // Hero Section
        'hero.title': 'आपकी रात बाहर।',
        'hero.subtitle': 'भारत भर में सर्वश्रेष्ठ इवेंट्स, कॉन्सर्ट, स्पोर्ट्स और अनुभव खोजें',
        'hero.cta': 'इवेंट्स एक्सप्लोर करें',

        // Services
        'services.title': 'हम क्या पेश करते हैं',
        'services.subtitle': 'सभी मनोरंजन जरूरतों के लिए आपका वन-स्टॉप समाधान',

        // Service Cards
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
        'stats.events': 'इवेंट्स आयोजित',
        'stats.users': 'खुश उपयोगकर्ता',
        'stats.bookings': 'कुल बुकिंग',
        'stats.cities': 'कवर किए गए शहर',

        // Newsletter
        'newsletter.title': 'WhatsApp अपडेट प्राप्त करें',
        'newsletter.subtitle': 'इवेंट सूचनाएं और विशेष ऑफ़र प्राप्त करने के लिए सब्सक्राइब करें',
        'newsletter.phone.placeholder': 'अपना फ़ोन नंबर दर्ज करें',
        'newsletter.button': 'अभी सब्सक्राइब करें',

        // Footer
        'footer.tagline': 'भारत का प्रमुख टिकट बुकिंग प्लेटफॉर्म',
        'footer.copyright': '© 2024 Tixbro। सर्वाधिकार सुरक्षित।',

        // Common
        'common.loading': 'लोड हो रहा है...',
        'common.error': 'कुछ गलत हो गया',
        'common.success': 'सफलता!',
    }
};

// Language Manager
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('tixbro_lang') || 'en';
        this.init();
    }

    init() {
        // Apply saved language on load
        this.applyLanguage(this.currentLang);

        // Add language switcher to all pages
        this.addLanguageSwitcher();
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
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('tixbro_lang', lang);

        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.classList.toggle('active', isActive);
        });

        // Apply translations
        this.applyLanguage(lang);
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
                    el.textContent = trans[key];
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
