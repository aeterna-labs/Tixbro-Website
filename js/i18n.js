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
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.view': 'View',
        'common.close': 'Close',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.submit': 'Submit',
        'common.confirm': 'Confirm',

        // Login Page
        'login.title': 'Sign In to Tixbro',
        'login.subtitle': 'Access your account to book events and manage bookings',
        'login.email': 'Email Address',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot Password?',
        'login.signin': 'Sign In',
        'login.signup': 'Sign Up',
        'login.or': 'Or continue with',
        'login.google': 'Continue with Google',
        'login.noaccount': "Don't have an account?",
        'login.hasaccount': 'Already have an account?',

        // Checkout Page
        'checkout.title': 'Checkout',
        'checkout.summary': 'Order Summary',
        'checkout.event': 'Event',
        'checkout.date': 'Date',
        'checkout.time': 'Time',
        'checkout.venue': 'Venue',
        'checkout.quantity': 'Quantity',
        'checkout.price': 'Price',
        'checkout.subtotal': 'Subtotal',
        'checkout.fees': 'Booking Fees',
        'checkout.total': 'Total',
        'checkout.customer': 'Customer Details',
        'checkout.name': 'Full Name',
        'checkout.email': 'Email',
        'checkout.phone': 'Phone Number',
        'checkout.payment': 'Payment Method',
        'checkout.card': 'Credit/Debit Card',
        'checkout.upi': 'UPI',
        'checkout.wallet': 'Wallet',
        'checkout.paynow': 'Pay Now',
        'checkout.terms': 'I agree to the terms and conditions',

        // Event Details Page
        'event.booknow': 'Book Now',
        'event.booktickets': 'Book Tickets',
        'event.about': 'About Event',
        'event.venue': 'Venue',
        'event.date': 'Date & Time',
        'event.category': 'Category',
        'event.organizer': 'Organizer',
        'event.tickets': 'Tickets',
        'event.available': 'Available',
        'event.soldout': 'Sold Out',
        'event.share': 'Share Event',
        'event.save': 'Save Event',
        'event.location': 'Location',
        'event.directions': 'Get Directions',
        'event.similar': 'Similar Events',

        // Success Page
        'success.title': 'Booking Successful!',
        'success.message': 'Your booking has been confirmed',
        'success.email': 'A confirmation email has been sent to',
        'success.order': 'Order ID',
        'success.download': 'Download Ticket',
        'success.view': 'View Ticket',
        'success.home': 'Back to Home',
        'success.events': 'Browse More Events',

        // Cancel Page
        'cancel.title': 'Payment Cancelled',
        'cancel.message': 'Your payment was cancelled',
        'cancel.retry': 'Try Again',
        'cancel.home': 'Back to Home',

        // Ticket View Page
        'ticket.title': 'Your Ticket',
        'ticket.event': 'Event',
        'ticket.customer': 'Customer',
        'ticket.order': 'Order ID',
        'ticket.status': 'Status',
        'ticket.valid': 'Valid',
        'ticket.used': 'Used',
        'ticket.download': 'Download PDF',
        'ticket.print': 'Print Ticket',
        'ticket.qr': 'Scan QR Code at Venue',
        'ticket.instructions': 'Entry Instructions',

        // About Page
        'about.title': 'About Tixbro',
        'about.mission': 'Our Mission',
        'about.vision': 'Our Vision',
        'about.team': 'Our Team',
        'about.values': 'Our Values',

        // Contact Page
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Get in touch with us',
        'contact.name': 'Your Name',
        'contact.email': 'Your Email',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.send': 'Send Message',
        'contact.info': 'Contact Information',
        'contact.address': 'Address',
        'contact.phone': 'Phone',
        'contact.hours': 'Business Hours',

        // Homepage Additional Sections
        'home.services.intro': 'Choose from our wide range of entertainment options',
        'home.explore': 'Explore',

        // Why Choose Section
        'why.title': 'Why Choose Tixbro?',
        'why.subtitle': "India's most trusted ticket booking platform",
        'why.instant.title': 'Instant Booking',
        'why.instant.desc': 'Book tickets in seconds with our lightning-fast platform',
        'why.secure.title': '100% Secure',
        'why.secure.desc': 'Bank-grade encryption for all transactions',
        'why.price.title': 'Best Prices',
        'why.price.desc': 'Lowest prices guaranteed with exclusive deals',
        'why.support.title': '24/7 Support',
        'why.support.desc': 'Round-the-clock customer support for assistance',
        'why.mobile.title': 'Mobile Tickets',
        'why.mobile.desc': 'Digital tickets on your phone, no printing needed',
        'why.refund.title': 'Easy Refunds',
        'why.refund.desc': 'Hassle-free cancellation and instant refunds',
        'why.alerts.title': 'Event Alerts',
        'why.alerts.desc': 'Never miss your favorite artists and events',
        'why.reviews.title': 'Verified Reviews',
        'why.reviews.desc': 'Authentic reviews from real attendees',

        // Artists Section
        'artists.title': 'Popular Artists',
        'artists.subtitle': 'Follow your favorite artists and never miss their events',

        // Categories Section
        'categories.title': 'Trending Categories',
        'categories.subtitle': "What's hot right now",

        // How It Works
        'how.title': 'How It Works',
        'how.subtitle': 'Book tickets in 3 easy steps',
        'how.step1.title': 'Browse Events',
        'how.step1.desc': 'Explore thousands of events across categories and cities',
        'how.step2.title': 'Select & Book',
        'how.step2.desc': 'Choose your preferred date, time and seats',
        'how.step3.title': 'Enjoy Event',
        'how.step3.desc': 'Get instant tickets on your mobile and enjoy!',

        // Testimonials
        'testimonials.title': 'What Our Customers Say',
        'testimonials.subtitle': 'Join millions of happy customers',

        // Blog
        'blog.title': 'From Our Blog',
        'blog.subtitle': 'Latest news and insights from the entertainment world',
        'blog.readmore': 'min read',

        // FAQ
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Got questions? We\'ve got answers',
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
        'common.cancel': 'रद्द करें',
        'common.save': 'सहेजें',
        'common.delete': 'हटाएं',
        'common.edit': 'संपादित करें',
        'common.view': 'देखें',
        'common.close': 'बंद करें',
        'common.back': 'वापस',
        'common.next': 'अगला',
        'common.submit': 'जमा करें',
        'common.confirm': 'पुष्टि करें',

        // Login Page
        'login.title': 'Tixbro में साइन इन करें',
        'login.subtitle': 'इवेंट बुक करने और बुकिंग प्रबंधित करने के लिए अपने खाते में पहुंचें',
        'login.email': 'ईमेल पता',
        'login.password': 'पासवर्ड',
        'login.remember': 'मुझे याद रखें',
        'login.forgot': 'पासवर्ड भूल गए?',
        'login.signin': 'साइन इन करें',
        'login.signup': 'साइन अप करें',
        'login.or': 'या जारी रखें',
        'login.google': 'Google से जारी रखें',
        'login.noaccount': 'खाता नहीं है?',
        'login.hasaccount': 'पहले से ही खाता है?',

        // Checkout Page
        'checkout.title': 'चेकआउट',
        'checkout.summary': 'ऑर्डर सारांश',
        'checkout.event': 'इवेंट',
        'checkout.date': 'तारीख',
        'checkout.time': 'समय',
        'checkout.venue': 'स्थान',
        'checkout.quantity': 'मात्रा',
        'checkout.price': 'मूल्य',
        'checkout.subtotal': 'उपकुल',
        'checkout.fees': 'बुकिंग शुल्क',
        'checkout.total': 'कुल',
        'checkout.customer': 'ग्राहक विवरण',
        'checkout.name': 'पूरा नाम',
        'checkout.email': 'ईमेल',
        'checkout.phone': 'फ़ोन नंबर',
        'checkout.payment': 'भुगतान विधि',
        'checkout.card': 'क्रेडिट/डेबिट कार्ड',
        'checkout.upi': 'UPI',
        'checkout.wallet': 'वॉलेट',
        'checkout.paynow': 'अभी भुगतान करें',
        'checkout.terms': 'मैं नियम और शर्तों से सहमत हूं',

        // Event Details Page
        'event.booknow': 'अभी बुक करें',
        'event.booktickets': 'टिकट बुक करें',
        'event.about': 'इवेंट के बारे में',
        'event.venue': 'स्थान',
        'event.date': 'तारीख और समय',
        'event.category': 'श्रेणी',
        'event.organizer': 'आयोजक',
        'event.tickets': 'टिकट',
        'event.available': 'उपलब्ध',
        'event.soldout': 'बिक गया',
        'event.share': 'इवेंट शेयर करें',
        'event.save': 'इवेंट सहेजें',
        'event.location': 'स्थान',
        'event.directions': 'दिशा-निर्देश प्राप्त करें',
        'event.similar': 'समान इवेंट्स',

        // Success Page
        'success.title': 'बुकिंग सफल!',
        'success.message': 'आपकी बुकिंग की पुष्टि हो गई है',
        'success.email': 'पुष्टिकरण ईमेल भेजा गया है',
        'success.order': 'ऑर्डर ID',
        'success.download': 'टिकट डाउनलोड करें',
        'success.view': 'टिकट देखें',
        'success.home': 'होम पर वापस',
        'success.events': 'अधिक इवेंट्स ब्राउज़ करें',

        // Cancel Page
        'cancel.title': 'भुगतान रद्द किया गया',
        'cancel.message': 'आपका भुगतान रद्द कर दिया गया था',
        'cancel.retry': 'पुनः प्रयास करें',
        'cancel.home': 'होम पर वापस',

        // Ticket View Page
        'ticket.title': 'आपका टिकट',
        'ticket.event': 'इवेंट',
        'ticket.customer': 'ग्राहक',
        'ticket.order': 'ऑर्डर ID',
        'ticket.status': 'स्थिति',
        'ticket.valid': 'मान्य',
        'ticket.used': 'उपयोग किया गया',
        'ticket.download': 'PDF डाउनलोड करें',
        'ticket.print': 'टिकट प्रिंट करें',
        'ticket.qr': 'स्थान पर QR कोड स्कैन करें',
        'ticket.instructions': 'प्रवेश निर्देश',

        // About Page
        'about.title': 'Tixbro के बारे में',
        'about.mission': 'हमारा मिशन',
        'about.vision': 'हमारी दृष्टि',
        'about.team': 'हमारी टीम',
        'about.values': 'हमारे मूल्य',

        // Contact Page
        'contact.title': 'हमसे संपर्क करें',
        'contact.subtitle': 'हमसे संपर्क में रहें',
        'contact.name': 'आपका नाम',
        'contact.email': 'आपका ईमेल',
        'contact.subject': 'विषय',
        'contact.message': 'संदेश',
        'contact.send': 'संदेश भेजें',
        'contact.info': 'संपर्क जानकारी',
        'contact.address': 'पता',
        'contact.phone': 'फ़ोन',
        'contact.hours': 'कार्य समय',

        // Homepage Additional Sections
        'home.services.intro': 'मनोरंजन विकल्पों की हमारी विस्तृत श्रृंखला से चुनें',
        'home.explore': 'एक्सप्लोर करें',

        // Why Choose Section
        'why.title': 'Tixbro क्यों चुनें?',
        'why.subtitle': 'भारत का सबसे विश्वसनीय टिकट बुकिंग प्लेटफॉर्म',
        'why.instant.title': 'तत्काल बुकिंग',
        'why.instant.desc': 'हमारे बिजली-तेज़ प्लेटफॉर्म के साथ सेकंड में टिकट बुक करें',
        'why.secure.title': '100% सुरक्षित',
        'why.secure.desc': 'सभी लेनदेन के लिए बैंक-ग्रेड एन्क्रिप्शन',
        'why.price.title': 'सर्वोत्तम कीमतें',
        'why.price.desc': 'विशेष सौदों के साथ न्यूनतम कीमतों की गारंटी',
        'why.support.title': '24/7 सहायता',
        'why.support.desc': 'सहायता के लिए चौबीसों घंटे ग्राहक सहायता',
        'why.mobile.title': 'मोबाइल टिकट',
        'why.mobile.desc': 'आपके फोन पर डिजिटल टिकट, कोई प्रिंटिंग की जरूरत नहीं',
        'why.refund.title': 'आसान रिफंड',
        'why.refund.desc': 'परेशानी मुक्त रद्दीकरण और तत्काल रिफंड',
        'why.alerts.title': 'इवेंट अलर्ट',
        'why.alerts.desc': 'अपने पसंदीदा कलाकारों और इवेंट्स को कभी न चूकें',
        'why.reviews.title': 'सत्यापित समीक्षाएं',
        'why.reviews.desc': 'वास्तविक उपस्थित लोगों की प्रामाणिक समीक्षाएं',

        // Artists Section
        'artists.title': 'लोकप्रिय कलाकार',
        'artists.subtitle': 'अपने पसंदीदा कलाकारों को फॉलो करें और उनके इवेंट्स न चूकें',

        // Categories Section
        'categories.title': 'ट्रेंडिंग श्रेणियाँ',
        'categories.subtitle': 'अभी क्या हॉट है',

        // How It Works
        'how.title': 'यह कैसे काम करता है',
        'how.subtitle': '3 आसान चरणों में टिकट बुक करें',
        'how.step1.title': 'इवेंट्स ब्राउज़ करें',
        'how.step1.desc': 'श्रेणियों और शहरों में हजारों इवेंट्स एक्सप्लोर करें',
        'how.step2.title': 'चयन करें और बुक करें',
        'how.step2.desc': 'अपनी पसंदीदा तारीख, समय और सीटें चुनें',
        'how.step3.title': 'इवेंट का आनंद लें',
        'how.step3.desc': 'अपने मोबाइल पर तत्काल टिकट प्राप्त करें और आनंद लें!',

        // Testimonials
        'testimonials.title': 'हमारे ग्राहक क्या कहते हैं',
        'testimonials.subtitle': 'लाखों खुश ग्राहकों में शामिल हों',

        // Blog
        'blog.title': 'हमारे ब्लॉग से',
        'blog.subtitle': 'मनोरंजन जगत से नवीनतम समाचार और जानकारी',
        'blog.readmore': 'मिनट पढ़ें',

        // FAQ
        'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
        'faq.subtitle': 'प्रश्न हैं? हमारे पास उत्तर हैं',
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

        // Translate all elements with data-i18n attribute (text content)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (trans[key]) {
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
        });

        // Translate all placeholders with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (trans[key]) {
                el.placeholder = trans[key];
            }
        });

        // Translate all titles with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            if (trans[key]) {
                el.title = trans[key];
            }
        });

        // Translate all aria-labels with data-i18n-aria attribute
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            if (trans[key]) {
                el.setAttribute('aria-label', trans[key]);
            }
        });

        // Translate all values with data-i18n-value attribute (for buttons, options)
        document.querySelectorAll('[data-i18n-value]').forEach(el => {
            const key = el.dataset.i18nValue;
            if (trans[key]) {
                el.value = trans[key];
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';

        // Trigger custom event for other scripts to react to language change
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
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
