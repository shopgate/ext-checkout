import {
  CHECKOUT_ENTER,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  CHECKOUT_PROCESS,
  CHECKOUT_TOTALS,
} from './action-types';

/**
 * @return {{type: string}}
 */
export const checkoutEnter = () => ({
  type: CHECKOUT_ENTER,
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
 * @param {{currency: string, totals: Object[]}} totals result from pipeline
 * @return {{type: string, currency: string, totals: Object[]}}
 */
export const checkoutTotals = totals => ({
  type: CHECKOUT_TOTALS,
  ...totals,
});
