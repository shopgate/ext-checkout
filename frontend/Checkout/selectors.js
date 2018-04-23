export const getCheckout = (state) => {
  return state.extensions['@shopgate/checkout/CheckoutReducers'].checkout
}
export const getCheckoutDisabled = (state) => {
  return state.extensions['@shopgate/checkout/CheckoutReducers'].checkoutDisabled
}
