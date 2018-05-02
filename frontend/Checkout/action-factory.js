import {
  CHECKOUT_ENTER,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  CHECKOUT_PROCESS
} from './action-types'

export const checkoutEnter = () => ({
  type: CHECKOUT_ENTER
})

export const checkoutSuccess = (checkoutId) => ({
  type: CHECKOUT_SUCCESS,
  checkoutId
})

export const checkoutFail = (error) => ({
  type: CHECKOUT_FAIL,
  error
})

export const checkoutProcess = () => ({
  type: CHECKOUT_PROCESS
})
