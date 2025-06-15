const stripe = Stripe(
  ' pk_test_51RaH3APBwwmRlhpMfmf5s80OxN9OMAWM5Qn9rnmaJjNCsUoAiWKocPCvQa4bJefO6to5lr11FP6ejQfZ31A6V9Yc00Vg47FhDK',
);
const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
