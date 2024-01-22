import { loadStripe } from '@stripe/stripe-js';
import { env } from '~/env.mjs';
import { api } from '~/utils/api';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export function useBuyCredits() {
    const checkout = api.checkout.createCheckout.useMutation();

    return {
        buyCredits: async () => {
            const response = await checkout.mutateAsync();
            try {
                const stripe = await stripePromise;
                if (stripe) {
                    await stripe.redirectToCheckout({
                        sessionId: response.id,
                    });
                } else {
                    // Handle the case where stripe is not loaded
                }
            } catch (error) {
                console.error("Error with Stripe redirect:", error);
                // Handle the error appropriately
            }
            
        }
    }
}