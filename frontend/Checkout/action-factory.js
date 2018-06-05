import {
  CHECKOUT_ENTER,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  CHECKOUT_PROCESS,
  CHECKOUT_TOTALS,
  CHECKOUT_FETCH_TOTALS,
  CHECKOUT_STATE,
} from './action-types';

/**
 * @return {{type: string}}
 */
export const checkoutEnter = () => ({
  type: CHECKOUT_ENTER,
});

/**
 * @param {Object} checkout checkout
 * @return {{type: string, checkout: *}}
 */
export const checkoutState = checkout => ({
  type: CHECKOUT_STATE,
  checkout,
});

/**
 * @param {string} orderId created order id
 * @return {{type: string, checkoutId: *}}
 */
export const checkoutSuccess = orderId => ({
  type: CHECKOUT_SUCCESS,
  orderId,
});

/**
 * @param {Error} error error
 * @return {{type: string, error: *}}
 */
export const checkoutFail = error => ({
  type: CHECKOUT_FAIL,
  error,
});

/**
 * @return {{type: string}}
 */
export const checkoutProcess = () => ({
  type: CHECKOUT_PROCESS,
});

/**
 * @return {{type: string}}
 */
export const checkoutFetchTotals = () => ({
  type: CHECKOUT_FETCH_TOTALS,
});

/**
 * @param {{currency: string, totals: Object[]}} totals result from pipeline
 * @return {{type: string, currency: string, totals: Object[]}}
 */
export const checkoutTotals = totals => ({
  type: CHECKOUT_TOTALS,
  ...totals,
});
