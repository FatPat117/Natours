import axios from 'axios';

import { showAlert } from './alerts';
const stripe = Stripe(
  ' pk_test_51RaH3APBwwmRlhpMfmf5s80OxN9OMAWM5Qn9rnmaJjNCsUoAiWKocPCvQa4bJefO6to5lr11FP6ejQfZ31A6V9Yc00Vg47FhDK',
);
export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
