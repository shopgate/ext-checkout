import {
  CHECKOUT_DATA,
  CHECKOUT_ENTER,
  CHECKOUT_FAIL,
  CHECKOUT_PROCESS,
  CHECKOUT_SUCCESS,
  CHECKOUT_TOTALS,
} from './action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_ENTER:
      return {
        checkout: {
          logs: [],
        },
        checkoutDisabled: true,
        ...state,
      };

    case CHECKOUT_PROCESS:
      // Disable checkout button
      return {
        ...state,
        checkoutDisabled: true,
      };

    case CHECKOUT_DATA: {
      const { data, ...actionRest } = action;
      return {
        checkout: {
          ...state.checkout,
          [action.id]: data,
          logs: [...state.checkout.logs, {
            ...actionRest,
            time: new Date().toISOString(),
          }],
        },
      };
    }

    case CHECKOUT_FAIL:
      return {
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
        ...state,
        checkoutDisabled: false,
        currency: action.currency,
        totals: action.totals,
      };

    case CHECKOUT_SUCCESS:
      return {};

    default:
      return state;
  }
};
