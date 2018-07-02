import {
  CHECKOUT_DATA,
  CHECKOUT_FAIL,
  CHECKOUT_PROCESS,
  CHECKOUT_SUCCESS,
  CHECKOUT_TOTALS,
} from './action-types';
/** @type {{currency: string, requiredData: Array}} */
import config from './../config';

/**
 * Check if all required data is present
 * @param {Object} checkout checkout
 * @return {boolean}
 */
const isCheckoutAvailable = (checkout) => {
  const { requiredData } = config;
  const checkoutKeys = Object.keys(checkout);
  return requiredData.filter(r => !checkoutKeys.includes(r)).length > 0;
};

export default (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_PROCESS:
      // Disable checkout button
      return {
        ...state,
        checkoutDisabled: true,
      };

    case CHECKOUT_DATA: {
      const { data, ...actionRest } = action;
      let checkout;
      if (data === null) {
        // Unset data
        const { [action.id]: ignore, ...restCheckout } = state.checkout;
        checkout = restCheckout;
      } else {
        // Set data
        checkout = {
          ...state.checkout,
          [action.id]: data,
        };
      }
      return {
        ...state,
        checkout: {
          ...checkout,
        },
        logs: [...state.logs.slice(-10), {
          ...actionRest,
          time: new Date().toISOString(),
        }],
        checkoutDisabled: isCheckoutAvailable(checkout),
      };
    }

    case CHECKOUT_FAIL:
      return {
        ...state,
        checkout: {
          ...state.checkout,
        },
        logs: [...state.logs.slice(-10), {
          type: CHECKOUT_FAIL,
          time: new Date().toISOString(),
          error: action.error,
        }],
        checkoutDisabled: false,
      };

    case CHECKOUT_TOTALS:
      return {
        ...state,
        checkout: {
          ...state.checkout,
        },
        logs: [...state.logs.slice(-10), {
          type: CHECKOUT_TOTALS,
          time: new Date().toISOString(),
          totals: action.totals,
        }],
        totals: action.totals,
      };

    case CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout: {
          currency: config.currency,
        },
        logs: [],
        checkoutDisabled: true,
      };

    default:
      return {
        checkout: {
          currency: config.currency,
        },
        checkoutDisabled: true,
        logs: [],
        ...state,
      };
  }
};
