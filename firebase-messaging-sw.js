// Firebase Cloud Messaging Service Worker
// Handles background notifications when the app is not in focus

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in service worker
firebase.initializeApp({
    apiKey: "AIzaSyCc8Ygn3-Zs2g9c1xrqTklVaBHCJMVyDxE",
    authDomain: "tixbro-website.firebaseapp.com",
    projectId: "tixbro-website",
    storageBucket: "tixbro-website.firebasestorage.app",
    messagingSenderId: "734536537308",
    appId: "1:734536537308:web:c2b4e8c742ceb7e5bf8ce9",
    measurementId: "G-0PNDDMM1K0"
});

// Initialize messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const { notification, data } = payload;

    const notificationTitle = notification.title || 'Tixbro Notification';
    const notificationOptions = {
        body: notification.body || '',
        icon: notification.icon || '/img/logo.png',
        badge: '/img/badge.png',
        image: notification.image,
        vibrate: [200, 100, 200],
        tag: data?.tag || 'tixbro-notification',
        requireInteraction: false,
        data: data || {},
        actions: []
    };

    // Add action buttons based on notification type
    if (data?.type === 'new_event') {
        notificationOptions.actions = [
            { action: 'view', title: 'View Event' },
            { action: 'close', title: 'Dismiss' }
        ];
    } else if (data?.type === 'ticket_purchased') {
        notificationOptions.actions = [
            { action: 'view_ticket', title: 'View Ticket' },
            { action: 'close', title: 'Dismiss' }
        ];
    }

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification click:', event);

    event.notification.close();

    const data = event.notification.data;
    let urlToOpen = '/';

    // Determine URL based on action and notification type
    if (event.action === 'view' && data.type === 'new_event' && data.eventId) {
        urlToOpen = `/event.html?id=${data.eventId}`;
    } else if (event.action === 'view_ticket' && data.type === 'ticket_purchased' && data.ticketId) {
        urlToOpen = `/ticket/view?id=${data.ticketId}`;
    } else if (event.action === 'close') {
        // Just close notification, don't navigate
        return;
    } else if (data.url) {
        urlToOpen = data.url;
    } else if (data.type === 'new_event' && data.eventId) {
        urlToOpen = `/event.html?id=${data.eventId}`;
    } else if (data.type === 'ticket_purchased' && data.ticketId) {
        urlToOpen = `/ticket/view?id=${data.ticketId}`;
    }

    // Open the URL
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if there's already a window/tab open
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url.includes(urlToOpen) && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not, open a new window/tab
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Service worker install event
self.addEventListener('install', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker installing.');
    self.skipWaiting();
});

// Service worker activate event
self.addEventListener('activate', (event) => {
    console.log('[firebase-messaging-sw.js] Service Worker activating.');
    event.waitUntil(clients.claim());
});
