/**
 * @param {Object} state redux
 * @return {*}
 */
export const getCheckout = state => state.extensions['@shopgate/checkout/CheckoutReducers'].checkout;
/**
 * @param {Object} state redux
 * @return {boolean}
 */
export const getCheckoutDisabled = state => state.extensions['@shopgate/checkout/CheckoutReducers'].checkoutDisabled;
/**
 * @param {Object} state state
 * @return {*}
 */
export const getCheckoutTotals = state => state.extensions['@shopgate/checkout/CheckoutReducers'].totals;
