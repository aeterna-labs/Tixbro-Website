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
        'contact.hero.title': 'Get in Touch',
        'contact.hero.subtitle': "We're here to help you with all your ticket booking needs",
        'contact.info.title': 'Contact Information',
        'contact.info.desc': 'Have questions or need support? Our team is here to help you. Reach out through any of the channels below.',
        'contact.email.title': 'Email Us',
        'contact.email.support': 'support@tixbro.com',
        'contact.email.business': 'business@tixbro.com',
        'contact.phone.title': 'Call Us',
        'contact.phone.hours': 'Mon-Sun, 9 AM - 9 PM IST',
        'contact.address.title': 'Visit Us',
        'contact.address.line1': 'Tixbro Technologies Pvt. Ltd.',
        'contact.address.line2': 'Mumbai, Maharashtra',
        'contact.address.line3': 'India',
        'contact.social.title': 'Follow Us',
        'contact.social.desc': 'Stay connected on social media',
        'contact.form.title': 'Send Us a Message',
        'contact.form.desc': 'Fill out the form below and we\'ll get back to you within 24 hours.',
        'contact.form.name': 'Your Name',
        'contact.form.name.placeholder': 'Enter your full name',
        'contact.form.email': 'Email Address',
        'contact.form.email.placeholder': 'Enter your email',
        'contact.form.phone': 'Phone Number',
        'contact.form.phone.placeholder': 'Enter your phone number',
        'contact.form.subject': 'Subject',
        'contact.form.subject.placeholder': 'What is this regarding?',
        'contact.form.message': 'Message',
        'contact.form.message.placeholder': 'Tell us how we can help you...',
        'contact.form.submit': 'Send Message',
        'contact.form.success': 'Thank you! Your message has been sent successfully.',
        'contact.faq.title': 'Frequently Asked Questions',
        'contact.faq.subtitle': 'Quick answers to common questions',
        'contact.faq.q1': 'What are your customer support hours?',
        'contact.faq.a1': 'Our customer support team is available 7 days a week, from 9 AM to 9 PM IST. For urgent queries, you can call our helpline numbers.',
        'contact.faq.q2': 'How quickly can I expect a response?',
        'contact.faq.a2': 'We typically respond to all email inquiries within 2-4 hours during business hours. Phone support provides immediate assistance.',
        'contact.faq.q3': 'Can I get a refund for my tickets?',
        'contact.faq.a3': 'Refund policies vary by event type. Please check our Refund Policy page or contact support for specific refund requests.',
        'contact.faq.q4': 'How do I report a technical issue?',
        'contact.faq.a4': 'For technical issues, please email support@tixbro.com with screenshots and detailed information. Our technical team will resolve it promptly.',

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
        'testimonial1.text': 'Best ticket booking platform! Booked Sunburn Festival tickets in seconds. The mobile ticket feature is so convenient!',
        'testimonial1.name': 'Priya Sharma',
        'testimonial1.location': 'Mumbai',
        'testimonial2.text': 'Finally found a reliable platform for college fest tickets! Booked tickets for IIT Mood Indigo hassle-free.',
        'testimonial2.name': 'Rahul Verma',
        'testimonial2.location': 'Delhi',
        'testimonial3.text': 'The turf booking feature is amazing! Booked a slot for weekend cricket with friends instantly.',
        'testimonial3.name': 'Amit Patel',
        'testimonial3.location': 'Bangalore',
        'testimonial4.text': 'Got IPL finals tickets at great prices! Customer support was super helpful throughout.',
        'testimonial4.name': 'Sneha Reddy',
        'testimonial4.location': 'Hyderabad',
        'testimonial5.text': 'Love the dark mode! Makes browsing events at night so much better. Great design overall.',
        'testimonial5.name': 'Arjun Mehta',
        'testimonial5.location': 'Pune',
        'testimonial6.text': 'Refund process was smooth when I had to cancel. Very transparent and quick. Highly recommend!',
        'testimonial6.name': 'Kavya Iyer',
        'testimonial6.location': 'Chennai',

        // Blog
        'blog.title': 'From Our Blog',
        'blog.subtitle': 'Latest news and insights from the entertainment world',
        'blog.readmore': 'min read',

        // FAQ
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Got questions? We\'ve got answers',
        'faq.q1': 'How do I book tickets on Tixbro?',
        'faq.a1': 'Booking tickets is simple! Browse events, select your preferred date and seats, proceed to checkout, make payment, and receive instant tickets on your mobile.',
        'faq.q2': 'Is my payment information secure?',
        'faq.a2': 'Absolutely! We use bank-grade encryption for all transactions. Your payment information is completely secure with us.',
        'faq.q3': 'Can I cancel my booking and get a refund?',
        'faq.a3': 'Yes, you can cancel your booking as per the event\'s cancellation policy. Refunds are processed within 5-7 business days.',
        'faq.q4': 'How will I receive my tickets?',
        'faq.a4': 'Tickets are sent instantly to your email and mobile number. You can also access them from your Tixbro account dashboard.',
        'faq.q5': 'What payment methods do you accept?',
        'faq.a5': 'We accept credit/debit cards, UPI, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay.',
        'faq.q6': 'How do I book a turf?',
        'faq.a6': 'Select your city, choose a turf, pick your preferred date and time slot, make payment, and receive instant booking confirmation.',
        'faq.q7': 'Can I book tickets for college fests?',
        'faq.a7': 'Yes! We have a dedicated section for college fests. Browse upcoming fests at top colleges and book passes online.',
        'faq.q8': 'Do you have customer support?',
        'faq.a8': 'Yes, we offer 24/7 customer support via email, phone, and chat. Our team is always ready to help!',

        // Footer Links
        'footer.about': 'About Us',
        'footer.careers': 'Careers',
        'footer.blog': 'Blog',
        'footer.contact': 'Contact Us',
        'footer.press': 'Press',
        'footer.partnership': 'Partnership',
        'footer.help': 'Help Center',
        'footer.faqs': 'FAQs',
        'footer.terms': 'Terms & Conditions',
        'footer.privacy': 'Privacy Policy',
        'footer.refund': 'Refund Policy',
        'footer.sitemap': 'Sitemap',

        // FAQ Page
        'faq.hero.title': 'Frequently Asked Questions',
        'faq.hero.subtitle': 'Find answers to common questions about Tixbro',
        'faq.search': 'Search for answers...',

        // General Questions
        'faq.general.title': 'General Questions',
        'faq.general.q1': 'What is Tixbro?',
        'faq.general.a1': 'Tixbro is India\'s premier online ticket booking platform for events, concerts, sports, theatre shows, turf bookings, college fests, and more. We connect event-goers with organizers, making ticket booking seamless, secure, and convenient.',
        'faq.general.q2': 'In which cities is Tixbro available?',
        'faq.general.a2': 'Tixbro is currently available across major cities in India including Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Goa, Kochi, and Chandigarh. We\'re constantly expanding to new cities!',
        'faq.general.q3': 'Do I need to create an account to book tickets?',
        'faq.general.a3': 'Yes, you need to create a free Tixbro account to book tickets. This helps us manage your bookings, send you tickets, and provide better customer service. Registration is quick and only takes a minute!',
        'faq.general.q4': 'Is Tixbro safe and secure?',
        'faq.general.a4': 'Absolutely! Tixbro uses bank-grade encryption and secure payment gateways to protect your personal and financial information. All transactions are processed through trusted payment partners, and we never store your complete card details.',

        // Booking & Payment
        'faq.booking.title': 'Booking & Payment',
        'faq.booking.q1': 'How do I book tickets on Tixbro?',
        'faq.booking.a1': 'Booking is simple: 1) Browse or search for your event, 2) Select the date and number of tickets, 3) Fill in your details, 4) Make payment, 5) Receive instant confirmation via email and SMS with your e-ticket!',
        'faq.booking.q2': 'What payment methods do you accept?',
        'faq.booking.a2': 'We accept all major payment methods including Credit Cards (Visa, Mastercard, Amex), Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Digital Wallets. All payments are processed securely.',
        'faq.booking.q3': 'What are the service fees?',
        'faq.booking.a3': 'Tixbro charges a small service fee (typically 10%) to cover platform maintenance, customer support, and secure payment processing. The exact fee is clearly displayed before you complete your purchase.',
        'faq.booking.q4': 'Can I book multiple tickets in one transaction?',
        'faq.booking.a4': 'Yes! You can book multiple tickets in a single transaction. However, some events may have a maximum ticket limit per booking to prevent scalping and ensure fair access for everyone.',
        'faq.booking.q5': 'Why did my payment fail?',
        'faq.booking.a5': 'Payment failures can occur due to insufficient funds, incorrect card details, bank server issues, or transaction limits. If money was deducted but you didn\'t receive tickets, don\'t worry! It will be automatically refunded within 5-7 business days. Contact support if you need assistance.',

        // Tickets & Entry
        'faq.tickets.title': 'Tickets & Entry',
        'faq.tickets.q1': 'How will I receive my tickets?',
        'faq.tickets.a1': 'You will receive your e-tickets instantly via email and SMS after successful payment. You can also view and download tickets from your Tixbro account under "My Bookings".',
        'faq.tickets.q2': 'Do I need to print my ticket?',
        'faq.tickets.a2': 'No printing required! Simply show the e-ticket on your mobile phone at the venue. Make sure your phone has sufficient battery and screen brightness. However, some organizers may prefer printed tickets, so check event details.',
        'faq.tickets.q3': 'What is the QR code on my ticket?',
        'faq.tickets.a3': 'The QR code is your unique ticket identifier. It will be scanned at the venue entrance for verification. Each QR code can only be used once, so don\'t share screenshots of your ticket with others!',
        'faq.tickets.q4': 'Can I transfer my ticket to someone else?',
        'faq.tickets.a4': 'Ticket transfer policies vary by event. Some events allow transfers through your Tixbro account, while others require the original ticket holder to attend. Check the specific event\'s terms or contact support.',
        'faq.tickets.q5': 'What if I lose my ticket or can\'t access my email?',
        'faq.tickets.a5': 'No worries! Simply log in to your Tixbro account and go to "My Bookings" to download your ticket again. You can also contact our customer support with your booking ID for assistance.',
        'faq.tickets.q6': 'Do I need ID proof at the venue?',
        'faq.tickets.a6': 'Some events require valid photo ID (Aadhaar, PAN, Passport, Driving License) matching the name on the ticket. This is especially common for high-demand events to prevent scalping. Check your event details for specific requirements.',

        // Refunds & Cancellations
        'faq.refunds.title': 'Refunds & Cancellations',
        'faq.refunds.q1': 'Can I cancel my ticket and get a refund?',
        'faq.refunds.a1': 'Most tickets are non-refundable unless the event is cancelled by the organizer. However, specific refund policies vary by event type. For turf bookings, cancellations 24+ hours in advance get 75% refund. Check our detailed Refund Policy page.',
        'faq.refunds.q2': 'What happens if an event is cancelled?',
        'faq.refunds.a2': 'If an event is cancelled by the organizer, you will receive a full refund including service fees within 7-10 business days. You\'ll be notified via email and SMS about the cancellation and refund status.',
        'faq.refunds.q3': 'How long does a refund take?',
        'faq.refunds.a3': 'Refunds are processed within 7-10 business days from approval. Depending on your payment method, it may take additional 5-7 days to reflect in your account. Credit/Debit cards: 7-14 days, UPI/Net Banking: 5-10 days, Wallets: 3-7 days.',
        'faq.refunds.q4': 'Are service fees refundable?',
        'faq.refunds.a4': 'Service fees are generally non-refundable for user-initiated cancellations. However, if the event is cancelled by the organizer, you\'ll receive a full refund including service fees.',

        // Account & Security
        'faq.account.title': 'Account & Security',
        'faq.account.q1': 'How do I create a Tixbro account?',
        'faq.account.a1': 'Click on "Sign Up" on our website or app, provide your email/phone number, create a password, and verify your account. You can also sign up quickly using Google or Facebook login.',
        'faq.account.q2': 'I forgot my password. How do I reset it?',
        'faq.account.a2': 'Click on "Forgot Password" on the login page, enter your registered email/phone number, and you\'ll receive a password reset link. Follow the instructions to create a new password.',
        'faq.account.q3': 'How do I update my profile information?',
        'faq.account.a3': 'Log in to your account, go to "My Profile" or "Settings", and update your personal information such as name, email, phone number, or address. Make sure to save changes.',
        'faq.account.q4': 'Is my payment information stored?',
        'faq.account.a4': 'No, Tixbro does not store your complete card details. All payment information is securely processed through our payment gateway partners. We never have access to your full card number or CVV.',
        'faq.account.q5': 'Can I delete my account?',
        'faq.account.a5': 'Yes, you can request account deletion by contacting our support team at support@tixbro.com. Please note that you cannot delete your account if you have upcoming event bookings.',

        // For Event Organizers
        'faq.organizers.title': 'For Event Organizers',
        'faq.organizers.q1': 'How can I list my event on Tixbro?',
        'faq.organizers.a1': 'Create an organizer account, click "Create Event", fill in event details (title, description, date, venue, pricing), upload images, and submit for approval. Our team will review and list your event within 24-48 hours.',
        'faq.organizers.q2': 'What commission does Tixbro charge?',
        'faq.organizers.a2': 'Tixbro charges a 10% commission on ticket sales. This covers platform usage, payment processing, customer support, and marketing. You receive 90% of the ticket price directly to your account.',
        'faq.organizers.q3': 'When do I receive payment for ticket sales?',
        'faq.organizers.a3': 'Payments are transferred to your registered bank account within 7 days after the event concludes. This ensures smooth refund processing if the event is cancelled or postponed.',
        'faq.organizers.q4': 'Can I track ticket sales in real-time?',
        'faq.organizers.a4': 'Yes! Your organizer dashboard provides real-time analytics including tickets sold, revenue, customer demographics, and booking trends. You can export reports anytime.',
        'faq.organizers.q5': 'What if I need to cancel or reschedule my event?',
        'faq.organizers.a5': 'Contact Tixbro support immediately. For cancellations, you\'re responsible for full refunds. For rescheduling, update the event date in your dashboard, and all ticket holders will be automatically notified.',

        // Technical Issues
        'faq.technical.title': 'Technical Issues',
        'faq.technical.q1': 'The website is not loading. What should I do?',
        'faq.technical.a1': 'Try clearing your browser cache and cookies, or use a different browser. Make sure you have a stable internet connection. If the problem persists, try accessing from the mobile app or contact support.',
        'faq.technical.q2': 'I\'m not receiving booking confirmation emails',
        'faq.technical.a2': 'Check your spam/junk folder. Add support@tixbro.com to your contacts. Verify that the email address in your profile is correct. You can also access tickets from "My Bookings" in your account.',
        'faq.technical.q3': 'The mobile app is crashing. How do I fix it?',
        'faq.technical.a3': 'Update to the latest app version from Play Store/App Store. Clear app cache from your phone settings. If issues continue, uninstall and reinstall the app. Your bookings and account data will remain safe.',
        'faq.technical.q4': 'I received a duplicate charge. What now?',
        'faq.technical.a4': 'Contact our support team immediately at support@tixbro.com with proof of duplicate charges (bank statement/transaction screenshot). Duplicate amounts will be refunded within 5-7 business days after verification.',

        // Contact
        'faq.contact.title': 'Still have questions?',
        'faq.contact.subtitle': 'Our support team is here to help!',
        'faq.contact.email': 'Email:',
        'faq.contact.phone': 'Phone:',
        'faq.contact.hours': 'Hours: Mon-Sat, 9 AM - 9 PM IST',
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
        'contact.hero.title': 'संपर्क करें',
        'contact.hero.subtitle': 'हम आपकी सभी टिकट बुकिंग आवश्यकताओं में मदद के लिए यहां हैं',
        'contact.info.title': 'संपर्क जानकारी',
        'contact.info.desc': 'प्रश्न हैं या सहायता चाहिए? हमारी टीम आपकी मदद के लिए यहां है। नीचे दिए गए किसी भी माध्यम से संपर्क करें।',
        'contact.email.title': 'ईमेल करें',
        'contact.email.support': 'support@tixbro.com',
        'contact.email.business': 'business@tixbro.com',
        'contact.phone.title': 'कॉल करें',
        'contact.phone.hours': 'सोमवार-रविवार, सुबह 9 - रात 9 IST',
        'contact.address.title': 'हमसे मिलें',
        'contact.address.line1': 'Tixbro Technologies Pvt. Ltd.',
        'contact.address.line2': 'मुंबई, महाराष्ट्र',
        'contact.address.line3': 'भारत',
        'contact.social.title': 'फॉलो करें',
        'contact.social.desc': 'सोशल मीडिया पर जुड़े रहें',
        'contact.form.title': 'हमें संदेश भेजें',
        'contact.form.desc': 'नीचे दिया गया फॉर्म भरें और हम 24 घंटे के भीतर आपसे संपर्क करेंगे।',
        'contact.form.name': 'आपका नाम',
        'contact.form.name.placeholder': 'अपना पूरा नाम दर्ज करें',
        'contact.form.email': 'ईमेल पता',
        'contact.form.email.placeholder': 'अपना ईमेल दर्ज करें',
        'contact.form.phone': 'फोन नंबर',
        'contact.form.phone.placeholder': 'अपना फोन नंबर दर्ज करें',
        'contact.form.subject': 'विषय',
        'contact.form.subject.placeholder': 'यह किस बारे में है?',
        'contact.form.message': 'संदेश',
        'contact.form.message.placeholder': 'बताएं कि हम आपकी कैसे मदद कर सकते हैं...',
        'contact.form.submit': 'संदेश भेजें',
        'contact.form.success': 'धन्यवाद! आपका संदेश सफलतापूर्वक भेजा गया है।',
        'contact.faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
        'contact.faq.subtitle': 'सामान्य प्रश्नों के त्वरित उत्तर',
        'contact.faq.q1': 'आपके ग्राहक सहायता के घंटे क्या हैं?',
        'contact.faq.a1': 'हमारी ग्राहक सहायता टीम सप्ताह में 7 दिन, सुबह 9 बजे से रात 9 बजे IST तक उपलब्ध है। तत्काल प्रश्नों के लिए, आप हमारे हेल्पलाइन नंबरों पर कॉल कर सकते हैं।',
        'contact.faq.q2': 'मुझे कितनी जल्दी प्रतिक्रिया की उम्मीद करनी चाहिए?',
        'contact.faq.a2': 'हम आमतौर पर कार्य घंटों के दौरान 2-4 घंटे के भीतर सभी ईमेल पूछताछ का जवाब देते हैं। फोन सहायता तत्काल सहायता प्रदान करती है।',
        'contact.faq.q3': 'क्या मुझे अपने टिकटों के लिए रिफंड मिल सकता है?',
        'contact.faq.a3': 'रिफंड नीतियां इवेंट प्रकार के अनुसार भिन्न होती हैं। कृपया हमारे रिफंड पॉलिसी पेज देखें या विशिष्ट रिफंड अनुरोधों के लिए सहायता से संपर्क करें।',
        'contact.faq.q4': 'मैं तकनीकी समस्या की रिपोर्ट कैसे करूं?',
        'contact.faq.a4': 'तकनीकी समस्याओं के लिए, कृपया स्क्रीनशॉट और विस्तृत जानकारी के साथ support@tixbro.com पर ईमेल करें। हमारी तकनीकी टीम इसे तुरंत हल करेगी।',

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
        'faq.q1': 'Tixbro पर टिकट कैसे बुक करें?',
        'faq.a1': 'टिकट बुक करना सरल है! इवेंट्स ब्राउज़ करें, अपनी पसंदीदा तारीख और सीटें चुनें, चेकआउट पर जाएं, भुगतान करें, और अपने मोबाइल पर तत्काल टिकट प्राप्त करें।',
        'faq.q2': 'क्या मेरी भुगतान जानकारी सुरक्षित है?',
        'faq.a2': 'बिल्कुल! हम सभी लेनदेन के लिए बैंक-ग्रेड एन्क्रिप्शन का उपयोग करते हैं। आपकी भुगतान जानकारी हमारे साथ पूरी तरह से सुरक्षित है।',
        'faq.q3': 'क्या मैं अपनी बुकिंग रद्द कर सकता हूं और रिफंड प्राप्त कर सकता हूं?',
        'faq.a3': 'हां, आप इवेंट की रद्दीकरण नीति के अनुसार अपनी बुकिंग रद्द कर सकते हैं। रिफंड 5-7 व्यावसायिक दिनों में संसाधित किए जाते हैं।',
        'faq.q4': 'मुझे अपने टिकट कैसे प्राप्त होंगे?',
        'faq.a4': 'टिकट तुरंत आपके ईमेल और मोबाइल नंबर पर भेजे जाते हैं। आप उन्हें अपने Tixbro खाता डैशबोर्ड से भी एक्सेस कर सकते हैं।',
        'faq.q5': 'आप कौन से भुगतान तरीके स्वीकार करते हैं?',
        'faq.a5': 'हम क्रेडिट/डेबिट कार्ड, UPI, नेट बैंकिंग और Paytm, PhonePe और Google Pay जैसे लोकप्रिय डिजिटल वॉलेट स्वीकार करते हैं।',
        'faq.q6': 'मैं टर्फ कैसे बुक करूं?',
        'faq.a6': 'अपना शहर चुनें, एक टर्फ चुनें, अपनी पसंदीदा तारीख और समय स्लॉट चुनें, भुगतान करें, और तत्काल बुकिंग पुष्टि प्राप्त करें।',
        'faq.q7': 'क्या मैं कॉलेज फेस्ट के लिए टिकट बुक कर सकता हूं?',
        'faq.a7': 'हां! हमारे पास कॉलेज फेस्ट के लिए एक समर्पित अनुभाग है। शीर्ष कॉलेजों में आगामी फेस्ट ब्राउज़ करें और ऑनलाइन पास बुक करें।',
        'faq.q8': 'क्या आपके पास ग्राहक सहायता है?',
        'faq.a8': 'हां, हम ईमेल, फोन और चैट के माध्यम से 24/7 ग्राहक सहायता प्रदान करते हैं। हमारी टीम हमेशा मदद के लिए तैयार है!',

        // Testimonials
        'testimonial1.text': 'सर्वश्रेष्ठ टिकट बुकिंग प्लेटफॉर्म! सेकंड में Sunburn Festival टिकट बुक किए। मोबाइल टिकट सुविधा बहुत सुविधाजनक है!',
        'testimonial1.name': 'प्रिया शर्मा',
        'testimonial1.location': 'मुंबई',
        'testimonial2.text': 'आखिरकार कॉलेज फेस्ट टिकट के लिए एक विश्वसनीय प्लेटफॉर्म मिला! IIT Mood Indigo के टिकट आसानी से बुक किए।',
        'testimonial2.name': 'राहुल वर्मा',
        'testimonial2.location': 'दिल्ली',
        'testimonial3.text': 'टर्फ बुकिंग सुविधा अद्भुत है! दोस्तों के साथ वीकेंड क्रिकेट के लिए तुरंत स्लॉट बुक किया।',
        'testimonial3.name': 'अमित पटेल',
        'testimonial3.location': 'बेंगलुरु',
        'testimonial4.text': 'शानदार कीमतों पर IPL फाइनल टिकट मिले! ग्राहक सहायता पूरे समय बहुत मददगार रही।',
        'testimonial4.name': 'स्नेहा रेड्डी',
        'testimonial4.location': 'हैदराबाद',
        'testimonial5.text': 'डार्क मोड बहुत पसंद है! रात में इवेंट ब्राउज़ करना बहुत बेहतर हो गया। समग्र डिज़ाइन शानदार है।',
        'testimonial5.name': 'अर्जुन मेहता',
        'testimonial5.location': 'पुणे',
        'testimonial6.text': 'रिफंड प्रक्रिया सुचारू थी जब मुझे रद्द करना पड़ा। बहुत पारदर्शी और त्वरित। अत्यधिक अनुशंसित!',
        'testimonial6.name': 'काव्या अय्यर',
        'testimonial6.location': 'चेन्नई',

        // Footer Links
        'footer.about': 'हमारे बारे में',
        'footer.careers': 'करियर',
        'footer.blog': 'ब्लॉग',
        'footer.contact': 'संपर्क करें',
        'footer.press': 'प्रेस',
        'footer.partnership': 'साझेदारी',
        'footer.help': 'सहायता केंद्र',
        'footer.faqs': 'पूछे जाने वाले प्रश्न',
        'footer.terms': 'नियम और शर्तें',
        'footer.privacy': 'गोपनीयता नीति',
        'footer.refund': 'रिफंड नीति',
        'footer.sitemap': 'साइटमैप',

        // FAQ Page
        'faq.hero.title': 'अक्सर पूछे जाने वाले प्रश्न',
        'faq.hero.subtitle': 'Tixbro के बारे में सामान्य प्रश्नों के उत्तर खोजें',
        'faq.search': 'उत्तर खोजें...',

        // General Questions
        'faq.general.title': 'सामान्य प्रश्न',
        'faq.general.q1': 'Tixbro क्या है?',
        'faq.general.a1': 'Tixbro भारत का प्रमुख ऑनलाइन टिकट बुकिंग प्लेटफॉर्म है जो इवेंट्स, कॉन्सर्ट, खेल, थिएटर शो, टर्फ बुकिंग, कॉलेज फेस्ट आदि के लिए है। हम इवेंट प्रेमियों को आयोजकों से जोड़ते हैं, टिकट बुकिंग को सहज, सुरक्षित और सुविधाजनक बनाते हैं।',
        'faq.general.q2': 'Tixbro किन शहरों में उपलब्ध है?',
        'faq.general.a2': 'Tixbro वर्तमान में भारत के प्रमुख शहरों में उपलब्ध है जिनमें मुंबई, दिल्ली, बेंगलुरु, पुणे, हैदराबाद, चेन्नई, कोलकाता, अहमदाबाद, जयपुर, गोवा, कोच्चि और चंडीगढ़ शामिल हैं। हम लगातार नए शहरों में विस्तार कर रहे हैं!',
        'faq.general.q3': 'क्या मुझे टिकट बुक करने के लिए खाता बनाना होगा?',
        'faq.general.a3': 'हां, टिकट बुक करने के लिए आपको एक मुफ्त Tixbro खाता बनाना होगा। यह हमें आपकी बुकिंग प्रबंधित करने, टिकट भेजने और बेहतर ग्राहक सेवा प्रदान करने में मदद करता है। पंजीकरण त्वरित है और केवल एक मिनट लगता है!',
        'faq.general.q4': 'क्या Tixbro सुरक्षित है?',
        'faq.general.a4': 'बिल्कुल! Tixbro आपकी व्यक्तिगत और वित्तीय जानकारी की सुरक्षा के लिए बैंक-ग्रेड एन्क्रिप्शन और सुरक्षित भुगतान गेटवे का उपयोग करता है। सभी लेनदेन विश्वसनीय भुगतान भागीदारों के माध्यम से संसाधित किए जाते हैं, और हम आपके पूर्ण कार्ड विवरण कभी संग्रहीत नहीं करते हैं।',

        // Booking & Payment
        'faq.booking.title': 'बुकिंग और भुगतान',
        'faq.booking.q1': 'मैं Tixbro पर टिकट कैसे बुक करूं?',
        'faq.booking.a1': 'बुकिंग सरल है: 1) अपना इवेंट ब्राउज़ करें या खोजें, 2) तारीख और टिकट की संख्या चुनें, 3) अपना विवरण भरें, 4) भुगतान करें, 5) अपनी ई-टिकट के साथ ईमेल और SMS के माध्यम से तत्काल पुष्टि प्राप्त करें!',
        'faq.booking.q2': 'आप कौन से भुगतान विधियां स्वीकार करते हैं?',
        'faq.booking.a2': 'हम सभी प्रमुख भुगतान विधियों को स्वीकार करते हैं जिनमें क्रेडिट कार्ड (Visa, Mastercard, Amex), डेबिट कार्ड, UPI (Google Pay, PhonePe, Paytm), नेट बैंकिंग और डिजिटल वॉलेट शामिल हैं। सभी भुगतान सुरक्षित रूप से संसाधित किए जाते हैं।',
        'faq.booking.q3': 'सेवा शुल्क क्या हैं?',
        'faq.booking.a3': 'Tixbro प्लेटफॉर्म रखरखाव, ग्राहक सहायता और सुरक्षित भुगतान प्रसंस्करण को कवर करने के लिए एक छोटा सेवा शुल्क (आमतौर पर 10%) लेता है। सटीक शुल्क आपकी खरीदारी पूरी करने से पहले स्पष्ट रूप से प्रदर्शित किया जाता है।',
        'faq.booking.q4': 'क्या मैं एक लेनदेन में कई टिकट बुक कर सकता हूं?',
        'faq.booking.a4': 'हां! आप एक ही लेनदेन में कई टिकट बुक कर सकते हैं। हालांकि, कुछ इवेंट्स में स्कैल्पिंग को रोकने और सभी के लिए उचित पहुंच सुनिश्चित करने के लिए प्रति बुकिंग अधिकतम टिकट सीमा हो सकती है।',
        'faq.booking.q5': 'मेरा भुगतान क्यों विफल हुआ?',
        'faq.booking.a5': 'भुगतान विफलता अपर्याप्त धन, गलत कार्ड विवरण, बैंक सर्वर समस्याओं या लेनदेन सीमा के कारण हो सकती है। यदि पैसा काटा गया लेकिन आपको टिकट नहीं मिले, तो चिंता न करें! यह 5-7 व्यावसायिक दिनों के भीतर स्वचालित रूप से वापस कर दिया जाएगा। यदि आपको सहायता की आवश्यकता है तो सपोर्ट से संपर्क करें।',

        // Tickets & Entry
        'faq.tickets.title': 'टिकट और प्रवेश',
        'faq.tickets.q1': 'मुझे अपने टिकट कैसे मिलेंगे?',
        'faq.tickets.a1': 'सफल भुगतान के बाद आपको ईमेल और SMS के माध्यम से तुरंत अपनी ई-टिकट प्राप्त होंगी। आप "My Bookings" के तहत अपने Tixbro खाते से टिकट देख और डाउनलोड भी कर सकते हैं।',
        'faq.tickets.q2': 'क्या मुझे अपना टिकट प्रिंट करना होगा?',
        'faq.tickets.a2': 'प्रिंटिंग की कोई आवश्यकता नहीं! बस स्थल पर अपने मोबाइल फोन पर ई-टिकट दिखाएं। सुनिश्चित करें कि आपके फोन में पर्याप्त बैटरी और स्क्रीन ब्राइटनेस है। हालांकि, कुछ आयोजक प्रिंटेड टिकट पसंद कर सकते हैं, इसलिए इवेंट विवरण जांचें।',
        'faq.tickets.q3': 'मेरे टिकट पर QR कोड क्या है?',
        'faq.tickets.a3': 'QR कोड आपका अद्वितीय टिकट पहचानकर्ता है। सत्यापन के लिए स्थल के प्रवेश द्वार पर इसे स्कैन किया जाएगा। प्रत्येक QR कोड का उपयोग केवल एक बार किया जा सकता है, इसलिए अपने टिकट के स्क्रीनशॉट दूसरों के साथ साझा न करें!',
        'faq.tickets.q4': 'क्या मैं अपना टिकट किसी और को ट्रांसफर कर सकता हूं?',
        'faq.tickets.a4': 'टिकट ट्रांसफर नीतियां इवेंट के अनुसार भिन्न होती हैं। कुछ इवेंट्स आपके Tixbro खाते के माध्यम से ट्रांसफर की अनुमति देते हैं, जबकि अन्य को मूल टिकट धारक की उपस्थिति की आवश्यकता होती है। विशिष्ट इवेंट की शर्तें जांचें या सहायता से संपर्क करें।',
        'faq.tickets.q5': 'यदि मैं अपना टिकट खो दूं या अपनी ईमेल तक पहुंच नहीं कर सकता तो क्या होगा?',
        'faq.tickets.a5': 'कोई चिंता नहीं! बस अपने Tixbro खाते में लॉग इन करें और अपना टिकट फिर से डाउनलोड करने के लिए "My Bookings" पर जाएं। आप सहायता के लिए अपनी बुकिंग ID के साथ हमारी ग्राहक सहायता से भी संपर्क कर सकते हैं।',
        'faq.tickets.q6': 'क्या मुझे स्थल पर ID प्रूफ की आवश्यकता है?',
        'faq.tickets.a6': 'कुछ इवेंट्स में टिकट पर नाम से मेल खाने वाले वैध फोटो ID (आधार, पैन, पासपोर्ट, ड्राइविंग लाइसेंस) की आवश्यकता होती है। यह विशेष रूप से उच्च मांग वाले इवेंट्स के लिए स्कैल्पिंग को रोकने के लिए आम है। विशिष्ट आवश्यकताओं के लिए अपने इवेंट विवरण की जांच करें।',

        // Refunds & Cancellations
        'faq.refunds.title': 'रिफंड और रद्दीकरण',
        'faq.refunds.q1': 'क्या मैं अपना टिकट रद्द करके रिफंड प्राप्त कर सकता हूं?',
        'faq.refunds.a1': 'अधिकांश टिकट गैर-वापसी योग्य हैं जब तक कि आयोजक द्वारा इवेंट रद्द नहीं किया जाता है। हालांकि, विशिष्ट रिफंड नीतियां इवेंट प्रकार के अनुसार भिन्न होती हैं। टर्फ बुकिंग के लिए, 24+ घंटे पहले रद्द करने पर 75% रिफंड मिलता है। हमारे विस्तृत रिफंड पॉलिसी पेज को देखें।',
        'faq.refunds.q2': 'यदि कोई इवेंट रद्द हो जाता है तो क्या होगा?',
        'faq.refunds.a2': 'यदि आयोजक द्वारा इवेंट रद्द किया जाता है, तो आपको 7-10 व्यावसायिक दिनों के भीतर सेवा शुल्क सहित पूर्ण रिफंड प्राप्त होगा। रद्दीकरण और रिफंड स्थिति के बारे में आपको ईमेल और SMS के माध्यम से सूचित किया जाएगा।',
        'faq.refunds.q3': 'रिफंड में कितना समय लगता है?',
        'faq.refunds.a3': 'रिफंड स्वीकृति से 7-10 व्यावसायिक दिनों के भीतर संसाधित किए जाते हैं। आपकी भुगतान विधि के आधार पर, आपके खाते में प्रतिबिंबित होने में अतिरिक्त 5-7 दिन लग सकते हैं। क्रेडिट/डेबिट कार्ड: 7-14 दिन, UPI/नेट बैंकिंग: 5-10 दिन, वॉलेट: 3-7 दिन।',
        'faq.refunds.q4': 'क्या सेवा शुल्क वापसी योग्य हैं?',
        'faq.refunds.a4': 'उपयोगकर्ता द्वारा शुरू किए गए रद्दीकरण के लिए सेवा शुल्क आमतौर पर गैर-वापसी योग्य होते हैं। हालांकि, यदि आयोजक द्वारा इवेंट रद्द किया जाता है, तो आपको सेवा शुल्क सहित पूर्ण रिफंड प्राप्त होगा।',

        // Account & Security
        'faq.account.title': 'खाता और सुरक्षा',
        'faq.account.q1': 'मैं Tixbro खाता कैसे बनाऊं?',
        'faq.account.a1': 'हमारी वेबसाइट या ऐप पर "Sign Up" पर क्लिक करें, अपना ईमेल/फोन नंबर प्रदान करें, एक पासवर्ड बनाएं और अपने खाते को सत्यापित करें। आप Google या Facebook लॉगिन का उपयोग करके भी जल्दी से साइन अप कर सकते हैं।',
        'faq.account.q2': 'मैं अपना पासवर्ड भूल गया। मैं इसे कैसे रीसेट करूं?',
        'faq.account.a2': 'लॉगिन पेज पर "Forgot Password" पर क्लिक करें, अपना पंजीकृत ईमेल/फोन नंबर दर्ज करें, और आपको एक पासवर्ड रीसेट लिंक प्राप्त होगा। एक नया पासवर्ड बनाने के लिए निर्देशों का पालन करें।',
        'faq.account.q3': 'मैं अपनी प्रोफ़ाइल जानकारी कैसे अपडेट करूं?',
        'faq.account.a3': 'अपने खाते में लॉग इन करें, "My Profile" या "Settings" पर जाएं, और अपनी व्यक्तिगत जानकारी जैसे नाम, ईमेल, फोन नंबर या पता अपडेट करें। परिवर्तन सहेजना सुनिश्चित करें।',
        'faq.account.q4': 'क्या मेरी भुगतान जानकारी संग्रहीत है?',
        'faq.account.a4': 'नहीं, Tixbro आपके पूर्ण कार्ड विवरण संग्रहीत नहीं करता है। सभी भुगतान जानकारी हमारे भुगतान गेटवे भागीदारों के माध्यम से सुरक्षित रूप से संसाधित की जाती है। हमारे पास आपके पूर्ण कार्ड नंबर या CVV तक कभी पहुंच नहीं होती है।',
        'faq.account.q5': 'क्या मैं अपना खाता हटा सकता हूं?',
        'faq.account.a5': 'हां, आप support@tixbro.com पर हमारी सहायता टीम से संपर्क करके खाता हटाने का अनुरोध कर सकते हैं। कृपया ध्यान दें कि यदि आपके पास आगामी इवेंट बुकिंग हैं तो आप अपना खाता हटा नहीं सकते हैं।',

        // For Event Organizers
        'faq.organizers.title': 'इवेंट आयोजकों के लिए',
        'faq.organizers.q1': 'मैं Tixbro पर अपना इवेंट कैसे सूचीबद्ध कर सकता हूं?',
        'faq.organizers.a1': 'एक आयोजक खाता बनाएं, "Create Event" पर क्लिक करें, इवेंट विवरण (शीर्षक, विवरण, तारीख, स्थान, मूल्य निर्धारण) भरें, छवियां अपलोड करें और अनुमोदन के लिए सबमिट करें। हमारी टीम 24-48 घंटों के भीतर आपके इवेंट की समीक्षा करके सूचीबद्ध करेगी।',
        'faq.organizers.q2': 'Tixbro कितना कमीशन लेता है?',
        'faq.organizers.a2': 'Tixbro टिकट बिक्री पर 10% कमीशन लेता है। यह प्लेटफॉर्म उपयोग, भुगतान प्रसंस्करण, ग्राहक सहायता और मार्केटिंग को कवर करता है। आपको टिकट मूल्य का 90% सीधे अपने खाते में प्राप्त होता है।',
        'faq.organizers.q3': 'मुझे टिकट बिक्री के लिए भुगतान कब प्राप्त होगा?',
        'faq.organizers.a3': 'इवेंट समाप्त होने के 7 दिनों के भीतर भुगतान आपके पंजीकृत बैंक खाते में स्थानांतरित कर दिया जाता है। यह सुनिश्चित करता है कि यदि इवेंट रद्द या स्थगित किया जाता है तो सुचारू रिफंड प्रसंस्करण हो।',
        'faq.organizers.q4': 'क्या मैं टिकट बिक्री को वास्तविक समय में ट्रैक कर सकता हूं?',
        'faq.organizers.a4': 'हां! आपका आयोजक डैशबोर्ड वास्तविक समय विश्लेषण प्रदान करता है जिसमें बेचे गए टिकट, राजस्व, ग्राहक जनसांख्यिकी और बुकिंग रुझान शामिल हैं। आप किसी भी समय रिपोर्ट निर्यात कर सकते हैं।',
        'faq.organizers.q5': 'यदि मुझे अपना इवेंट रद्द या पुनर्निर्धारित करना है तो क्या होगा?',
        'faq.organizers.a5': 'तुरंत Tixbro सपोर्ट से संपर्क करें। रद्दीकरण के लिए, आप पूर्ण रिफंड के लिए जिम्मेदार हैं। पुनर्निर्धारण के लिए, अपने डैशबोर्ड में इवेंट तारीख अपडेट करें, और सभी टिकट धारकों को स्वचालित रूप से सूचित किया जाएगा।',

        // Technical Issues
        'faq.technical.title': 'तकनीकी समस्याएं',
        'faq.technical.q1': 'वेबसाइट लोड नहीं हो रही है। मुझे क्या करना चाहिए?',
        'faq.technical.a1': 'अपने ब्राउज़र कैश और कुकीज़ साफ करने का प्रयास करें, या एक अलग ब्राउज़र का उपयोग करें। सुनिश्चित करें कि आपके पास स्थिर इंटरनेट कनेक्शन है। यदि समस्या बनी रहती है, तो मोबाइल ऐप से एक्सेस करने या सपोर्ट से संपर्क करने का प्रयास करें।',
        'faq.technical.q2': 'मुझे बुकिंग पुष्टि ईमेल नहीं मिल रहे हैं',
        'faq.technical.a2': 'अपने स्पैम/जंक फ़ोल्डर की जांच करें। अपने संपर्कों में support@tixbro.com जोड़ें। सत्यापित करें कि आपकी प्रोफ़ाइल में ईमेल पता सही है। आप अपने खाते में "My Bookings" से भी टिकट एक्सेस कर सकते हैं।',
        'faq.technical.q3': 'मोबाइल ऐप क्रैश हो रहा है। मैं इसे कैसे ठीक करूं?',
        'faq.technical.a3': 'Play Store/App Store से नवीनतम ऐप संस्करण में अपडेट करें। अपने फोन सेटिंग्स से ऐप कैश साफ करें। यदि समस्याएं जारी रहती हैं, तो ऐप को अनइंस्टॉल और फिर से इंस्टॉल करें। आपकी बुकिंग और खाता डेटा सुरक्षित रहेगा।',
        'faq.technical.q4': 'मुझे एक डुप्लिकेट चार्ज मिला। अब क्या?',
        'faq.technical.a4': 'डुप्लिकेट चार्ज के प्रमाण (बैंक स्टेटमेंट/लेनदेन स्क्रीनशॉट) के साथ तुरंत support@tixbro.com पर हमारी सहायता टीम से संपर्क करें। सत्यापन के बाद डुप्लिकेट राशि 5-7 व्यावसायिक दिनों के भीतर वापस कर दी जाएगी।',

        // Contact
        'faq.contact.title': 'अभी भी प्रश्न हैं?',
        'faq.contact.subtitle': 'हमारी सहायता टीम मदद के लिए यहां है!',
        'faq.contact.email': 'ईमेल:',
        'faq.contact.phone': 'फोन:',
        'faq.contact.hours': 'समय: सोमवार-शनिवार, सुबह 9 - रात 9 IST',
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
