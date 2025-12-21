// Web Push Notification Service using Firebase Cloud Messaging
// Handles:
// - New events available
// - Tickets purchased
// - Event reminders
// - Special offers

import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";
import { app } from './firebase-config.js';

class NotificationService {
    constructor() {
        this.messaging = null;
        this.token = null;
        this.isSupported = false;
        this.init();
    }

    async init() {
        // Check if notifications are supported
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return;
        }

        if (!('serviceWorker' in navigator)) {
            console.warn('Service Worker not supported');
            return;
        }

        this.isSupported = true;

        try {
            // Initialize Firebase Messaging
            this.messaging = getMessaging(app);

            // Check if already granted
            if (Notification.permission === 'granted') {
                await this.getNotificationToken();
            }

            // Listen for foreground messages
            this.setupForegroundListener();

        } catch (error) {
            console.error('Error initializing notifications:', error);
        }
    }

    /**
     * Request notification permission and get FCM token
     */
    async requestPermission() {
        if (!this.isSupported) {
            console.warn('Notifications not supported');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                console.log('✅ Notification permission granted');
                await this.getNotificationToken();
                return true;
            } else {
                console.log('❌ Notification permission denied');
                return false;
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
            return false;
        }
    }

    /**
     * Get FCM token for this device
     */
    async getNotificationToken() {
        try {
            // Get FCM token
            const currentToken = await getToken(this.messaging, {
                vapidKey: 'BCrZNmaxc9YXbCayeocLUp3HGDeP1Cr1sbzUVoQ7pH00HyreD-jkx0HLLydmXpXr1xRXwXoSPi7ZeBSfflPijRM'
            });

            if (currentToken) {
                this.token = currentToken;
                console.log('📱 FCM Token:', currentToken);

                // Save token to Firebase for this user
                await this.saveTokenToDatabase(currentToken);

                return currentToken;
            } else {
                console.log('No registration token available');
                return null;
            }
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    /**
     * Save FCM token to Firebase
     */
    async saveTokenToDatabase(token) {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.log('No user logged in, token not saved');
                return;
            }

            const { db } = await import('./firebase-config.js');
            const { doc, setDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

            await setDoc(doc(db, 'fcmTokens', userId), {
                token: token,
                userId: userId,
                createdAt: serverTimestamp(),
                platform: this.getPlatform(),
                browser: navigator.userAgent
            }, { merge: true });

            console.log('Token saved to database');
        } catch (error) {
            console.error('Error saving token:', error);
        }
    }

    /**
     * Setup listener for foreground messages
     */
    setupForegroundListener() {
        if (!this.messaging) return;

        onMessage(this.messaging, (payload) => {
            console.log('📬 Message received:', payload);

            const { notification, data } = payload;

            // Show custom notification
            this.showNotification(
                notification.title,
                notification.body,
                notification.image,
                data
            );

            // Trigger custom event for app to handle
            window.dispatchEvent(new CustomEvent('fcmMessage', {
                detail: payload
            }));
        });
    }

    /**
     * Show browser notification
     */
    showNotification(title, body, icon, data = {}) {
        if (!this.isSupported || Notification.permission !== 'granted') {
            return;
        }

        const options = {
            body: body,
            icon: icon || '/img/logo.png',
            badge: '/img/badge.png',
            vibrate: [200, 100, 200],
            tag: data.tag || 'tixbro-notification',
            requireInteraction: false,
            data: data
        };

        // Add action buttons based on notification type
        if (data.type === 'new_event') {
            options.actions = [
                { action: 'view', title: 'View Event', icon: '/img/icons/view.png' },
                { action: 'close', title: 'Close', icon: '/img/icons/close.png' }
            ];
        } else if (data.type === 'ticket_purchased') {
            options.actions = [
                { action: 'view_ticket', title: 'View Ticket', icon: '/img/icons/ticket.png' },
                { action: 'close', title: 'Close', icon: '/img/icons/close.png' }
            ];
        }

        const notification = new Notification(title, options);

        // Handle notification click
        notification.onclick = (event) => {
            event.preventDefault();
            window.focus();

            // Navigate based on notification type
            if (data.url) {
                window.location.href = data.url;
            } else if (data.type === 'new_event' && data.eventId) {
                window.location.href = `/event.html?id=${data.eventId}`;
            } else if (data.type === 'ticket_purchased' && data.ticketId) {
                window.location.href = `/ticket/view?id=${data.ticketId}`;
            }

            notification.close();
        };
    }

    /**
     * Send notification to specific user (server-side via Cloud Function)
     */
    async sendNotificationToUser(userId, title, body, data = {}) {
        try {
            // This would be called from a Cloud Function
            // Example implementation for client-side trigger
            const response = await fetch('/.netlify/functions/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    title,
                    body,
                    data
                })
            });

            const result = await response.json();
            console.log('Notification sent:', result);
            return result;
        } catch (error) {
            console.error('Error sending notification:', error);
            return null;
        }
    }

    /**
     * Get platform info
     */
    getPlatform() {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return 'Android';
        if (/iPad|iPhone|iPod/.test(ua)) return 'iOS';
        if (/Win/.test(ua)) return 'Windows';
        if (/Mac/.test(ua)) return 'MacOS';
        if (/Linux/.test(ua)) return 'Linux';
        return 'Unknown';
    }

    /**
     * Check if notifications are enabled
     */
    isEnabled() {
        return Notification.permission === 'granted';
    }

    /**
     * Unsubscribe from notifications
     */
    async unsubscribe() {
        if (this.token) {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const { db } = await import('./firebase-config.js');
                    const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

                    await deleteDoc(doc(db, 'fcmTokens', userId));
                    console.log('Unsubscribed from notifications');
                }

                this.token = null;
                return true;
            } catch (error) {
                console.error('Error unsubscribing:', error);
                return false;
            }
        }
    }
}

// Create singleton instance
const notificationService = new NotificationService();

// Export for use in other scripts
export default notificationService;

// Also attach to window for non-module scripts
window.notificationService = notificationService;

// Show notification permission prompt on page load (delayed)
setTimeout(() => {
    if (notificationService.isSupported && Notification.permission === 'default') {
        // Show custom prompt before native prompt
        showNotificationPrompt();
    }
}, 5000); // 5 seconds after page load

/**
 * Show custom notification permission prompt
 */
function showNotificationPrompt() {
    const promptHTML = `
        <div class="notification-prompt" id="notificationPrompt">
            <div class="prompt-content">
                <button class="prompt-close" onclick="document.getElementById('notificationPrompt').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="prompt-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <h3>Stay Updated!</h3>
                <p>Get notified about new events, ticket purchases, and special offers</p>
                <div class="prompt-actions">
                    <button class="btn btn-primary" onclick="handleNotificationPromptAllow()">
                        <i class="fas fa-check"></i> Allow Notifications
                    </button>
                    <button class="btn btn-outline" onclick="document.getElementById('notificationPrompt').remove()">
                        Not Now
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .notification-prompt {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 24px;
            max-width: 400px;
            z-index: 10000;
            animation: slideUp 0.3s ease-out;
        }

        [data-theme="dark"] .notification-prompt {
            background: #1e293b;
            color: #f1f5f9;
        }

        @keyframes slideUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .prompt-close {
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 18px;
        }

        .prompt-icon {
            font-size: 48px;
            color: #667eea;
            text-align: center;
            margin-bottom: 16px;
        }

        .prompt-content h3 {
            margin: 0 0 8px 0;
            font-size: 20px;
            text-align: center;
        }

        .prompt-content p {
            margin: 0 0 20px 0;
            color: #64748b;
            text-align: center;
        }

        .prompt-actions {
            display: flex;
            gap: 12px;
        }

        .prompt-actions button {
            flex: 1;
        }

        @media (max-width: 480px) {
            .notification-prompt {
                bottom: 0;
                right: 0;
                left: 0;
                max-width: none;
                border-radius: 16px 16px 0 0;
            }

            .prompt-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    // Add prompt to page
    document.body.insertAdjacentHTML('beforeend', promptHTML);
}

/**
 * Handle allow button click
 */
window.handleNotificationPromptAllow = async function() {
    const prompt = document.getElementById('notificationPrompt');
    const allowed = await notificationService.requestPermission();

    if (allowed) {
        prompt.innerHTML = `
            <div class="prompt-content" style="text-align: center;">
                <div class="prompt-icon" style="color: #10b981;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>All Set!</h3>
                <p>You'll receive notifications for new events and updates</p>
            </div>
        `;
        setTimeout(() => prompt.remove(), 2000);
    } else {
        prompt.remove();
    }
};
