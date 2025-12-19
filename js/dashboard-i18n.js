// Dashboard-specific translations extension for i18n.js
// Add these translations to the main translations object

const dashboardTranslations = {
    en: {
        // Dashboard Navigation
        'dash.overview': 'Overview',
        'dash.events': 'My Events',
        'dash.analytics': 'Analytics',
        'dash.create': 'Create Event',
        'dash.bookings': 'Bookings',
        'dash.turf': 'Turf Slots',
        'dash.tickets': 'Tickets',
        'dash.revenue': 'Revenue',
        'dash.settings': 'Settings',

        // Dashboard Header
        'dash.search': 'Search events...',
        'dash.notifications': 'Notifications',

        // Overview Stats
        'dash.stat.revenue': 'Total Revenue',
        'dash.stat.events': 'Active Events',
        'dash.stat.tickets': 'Tickets Sold',
        'dash.stat.views': 'Total Views',

        // Quick Actions
        'dash.quick.create': 'Create Event',
        'dash.quick.upload': 'Upload Image',
        'dash.quick.view': 'View Analytics',

        // Events
        'dash.events.title': 'My Events',
        'dash.events.filter': 'Filter by status',
        'dash.events.all': 'All Events',
        'dash.events.active': 'Active',
        'dash.events.upcoming': 'Upcoming',
        'dash.events.past': 'Past',
        'dash.events.draft': 'Draft',

        // Create Event Form
        'dash.create.title': 'Create New Event',
        'dash.create.step1': 'Basic Info',
        'dash.create.step2': 'Details',
        'dash.create.step3': 'Tickets',
        'dash.create.step4': 'Review',

        // Form Fields
        'dash.form.title': 'Event Title',
        'dash.form.category': 'Category',
        'dash.form.city': 'City',
        'dash.form.date': 'Event Date',
        'dash.form.time': 'Start Time',
        'dash.form.image': 'Event Image',
        'dash.form.description': 'Event Description',
        'dash.form.venue': 'Venue Name',
        'dash.form.address': 'Full Address',
        'dash.form.duration': 'Duration (hours)',
        'dash.form.age': 'Age Limit',
        'dash.form.price': 'Ticket Price',
        'dash.form.quantity': 'Total Tickets',
        'dash.form.early': 'Enable Early Bird Discount',

        // Buttons
        'dash.btn.next': 'Next',
        'dash.btn.prev': 'Previous',
        'dash.btn.submit': 'Publish Event',
        'dash.btn.save': 'Save',
        'dash.btn.cancel': 'Cancel',
        'dash.btn.delete': 'Delete',
        'dash.btn.edit': 'Edit',
        'dash.btn.view': 'View',

        // Bookings
        'dash.bookings.title': 'Bookings & Orders',
        'dash.bookings.pending': 'Pending',
        'dash.bookings.completed': 'Completed',
        'dash.bookings.today': 'Today',
        'dash.bookings.revenue': 'Revenue',

        // Turf Slots
        'dash.turf.title': 'Turf Slot Management',
        'dash.turf.morning': 'Morning Slots',
        'dash.turf.afternoon': 'Afternoon Slots',
        'dash.turf.evening': 'Evening Slots',
        'dash.turf.available': 'Available',
        'dash.turf.booked': 'Booked',

        // Common
        'dash.loading': 'Loading...',
        'dash.success': 'Success!',
        'dash.error': 'Error occurred',
        'dash.confirm': 'Are you sure?',
    },

    hi: {
        // Dashboard Navigation
        'dash.overview': 'अवलोकन',
        'dash.events': 'मेरे इवेंट्स',
        'dash.analytics': 'विश्लेषण',
        'dash.create': 'इवेंट बनाएं',
        'dash.bookings': 'बुकिंग',
        'dash.turf': 'टर्फ स्लॉट',
        'dash.tickets': 'टिकट',
        'dash.revenue': 'राजस्व',
        'dash.settings': 'सेटिंग्स',

        // Dashboard Header
        'dash.search': 'इवेंट्स खोजें...',
        'dash.notifications': 'सूचनाएं',

        // Overview Stats
        'dash.stat.revenue': 'कुल राजस्व',
        'dash.stat.events': 'सक्रिय इवेंट्स',
        'dash.stat.tickets': 'बिके टिकट',
        'dash.stat.views': 'कुल व्यूज',

        // Quick Actions
        'dash.quick.create': 'इवेंट बनाएं',
        'dash.quick.upload': 'छवि अपलोड करें',
        'dash.quick.view': 'विश्लेषण देखें',

        // Events
        'dash.events.title': 'मेरे इवेंट्स',
        'dash.events.filter': 'स्थिति के अनुसार फ़िल्टर करें',
        'dash.events.all': 'सभी इवेंट्स',
        'dash.events.active': 'सक्रिय',
        'dash.events.upcoming': 'आगामी',
        'dash.events.past': 'बीता हुआ',
        'dash.events.draft': 'ड्राफ्ट',

        // Create Event Form
        'dash.create.title': 'नया इवेंट बनाएं',
        'dash.create.step1': 'बुनियादी जानकारी',
        'dash.create.step2': 'विवरण',
        'dash.create.step3': 'टिकट',
        'dash.create.step4': 'समीक्षा',

        // Form Fields
        'dash.form.title': 'इवेंट शीर्षक',
        'dash.form.category': 'श्रेणी',
        'dash.form.city': 'शहर',
        'dash.form.date': 'इवेंट तारीख',
        'dash.form.time': 'शुरुआती समय',
        'dash.form.image': 'इवेंट छवि',
        'dash.form.description': 'इवेंट विवरण',
        'dash.form.venue': 'स्थान का नाम',
        'dash.form.address': 'पूरा पता',
        'dash.form.duration': 'अवधि (घंटे)',
        'dash.form.age': 'आयु सीमा',
        'dash.form.price': 'टिकट मूल्य',
        'dash.form.quantity': 'कुल टिकट',
        'dash.form.early': 'अर्ली बर्ड डिस्काउंट सक्षम करें',

        // Buttons
        'dash.btn.next': 'अगला',
        'dash.btn.prev': 'पिछला',
        'dash.btn.submit': 'इवेंट प्रकाशित करें',
        'dash.btn.save': 'सहेजें',
        'dash.btn.cancel': 'रद्द करें',
        'dash.btn.delete': 'हटाएं',
        'dash.btn.edit': 'संपादित करें',
        'dash.btn.view': 'देखें',

        // Bookings
        'dash.bookings.title': 'बुकिंग और ऑर्डर',
        'dash.bookings.pending': 'लंबित',
        'dash.bookings.completed': 'पूर्ण',
        'dash.bookings.today': 'आज',
        'dash.bookings.revenue': 'राजस्व',

        // Turf Slots
        'dash.turf.title': 'टर्फ स्लॉट प्रबंधन',
        'dash.turf.morning': 'सुबह के स्लॉट',
        'dash.turf.afternoon': 'दोपहर के स्लॉट',
        'dash.turf.evening': 'शाम के स्लॉट',
        'dash.turf.available': 'उपलब्ध',
        'dash.turf.booked': 'बुक किया गया',

        // Common
        'dash.loading': 'लोड हो रहा है...',
        'dash.success': 'सफलता!',
        'dash.error': 'त्रुटि हुई',
        'dash.confirm': 'क्या आप सुनिश्चित हैं?',
    }
};

// Merge dashboard translations into main translations
if (typeof translations !== 'undefined') {
    Object.keys(dashboardTranslations).forEach(lang => {
        if (translations[lang]) {
            Object.assign(translations[lang], dashboardTranslations[lang]);
        }
    });
}
