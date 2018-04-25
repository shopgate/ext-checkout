import {
  CHECKOUT_ENTER,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL
} from './action-types';

export const checkoutEnter =  () => ({
  type: CHECKOUT_ENTER
});

export const checkoutSuccess = () => ({
  type: CHECKOUT_SUCCESS
});

export const checkoutFail = () => ({
  type: CHECKOUT_FAIL
});
