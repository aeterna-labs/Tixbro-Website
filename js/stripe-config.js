// Stripe Configuration for Tixbro
// Replace with your actual Stripe keys from https://dashboard.stripe.com/test/apikeys

// IMPORTANT: Replace these with your actual keys!
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_PUBLISHABLE_KEY_HERE';

// Note: Secret key should NEVER be exposed on client-side
// It should only be used in backend/server-side code
// For now, we'll use Stripe Checkout which handles everything securely

// Initialize Stripe
let stripeInstance = null;

export function initStripe() {
    if (!stripeInstance && window.Stripe) {
        stripeInstance = window.Stripe(STRIPE_PUBLISHABLE_KEY);
    }
    return stripeInstance;
}

export function getStripe() {
    return stripeInstance || initStripe();
}
