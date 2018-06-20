import {
  CHECKOUT_DATA,
  CHECKOUT_ENTER,
  CHECKOUT_FAIL,
  CHECKOUT_PROCESS,
  CHECKOUT_SUCCESS,
  CHECKOUT_TOTALS,
  CHECKOUT_FETCH_TOTALS,
} from './action-types';
import config from './../config';

export default (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_ENTER:
      return {
        checkout: {
          currency: config.currency,
          logs: [],
        },
        checkoutDisabled: true,
        ...state,
      };

    case CHECKOUT_PROCESS:
    case CHECKOUT_FETCH_TOTALS:
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
          logs: [...state.checkout.logs, {
            ...actionRest,
            time: new Date().toISOString(),
          }],
        },
        checkoutDisabled: true,
      };
    }

    case CHECKOUT_FAIL:
      return {
        ...state,
        checkout: {
          ...state.checkout,
          logs: [...state.checkout.logs, {
            type: 'error',
            time: new Date().toISOString(),
            error: action.error,
          }],
        },
        checkoutDisabled: false,
      };

    case CHECKOUT_TOTALS:
      return {
        checkout: {
          ...state.checkout,
          logs: [...state.checkout.logs, {
            type: 'totals',
            time: new Date().toISOString(),
            totals: action.totals,
          }],
        },
        checkoutDisabled: false,
        totals: action.totals,
      };

    case CHECKOUT_SUCCESS:
      return {
        ...state,
        checkout: {
          currency: config.currency,
          logs: [],
        },
        checkoutDisabled: true,
      };

    default:
      return state;
  }
};
