// Stripe Configuration for Tixbro
// Publishable key is safe to expose on client-side

// LIVE Stripe Publishable Key
export const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SZfIaH0R2wVgZXuDYP3R0GpVrbDE1fTyepLvSMmLNU84PSfKR0E3Y1dgO3Y1vfMFYao3hI2plsGqcm04XICy4e000EOvEB2Ay';

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
