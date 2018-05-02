import {CHECKOUT_SUCCESS, CHECKOUT_FAIL, CHECKOUT_DATA, CHECKOUT_ENTER, CHECKOUT_PROCESS} from './action-types'

const requiredItems = ['items']

export default (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_ENTER:
      return {
        checkout: {
          logs: []
        },
        checkoutDisabled: true,
        ...state
      }

    case CHECKOUT_PROCESS:
      // Disable checkout button
      return {
        ...state,
        checkoutDisabled: true
      }

    // Push checkout data parts from checkout actors
    case CHECKOUT_DATA:
      const {data, ...actionRest} = action
      return {
        checkout: {
          ...state.checkout,
          [action.id]: data,
          logs: [...state.checkout.logs, {...actionRest, time: new Date().toISOString()}]
        },
        checkoutDisabled: !requiredItems.includes(action.id) // required data comes in. Unlock checkout
      }

    case CHECKOUT_FAIL:
      return {
        checkout: {
          ...state.checkout,
          logs: [...state.checkout.logs, {type: 'error', time: new Date().toISOString(), error: action.error}]
        },
        checkoutDisabled: false
      }

    case CHECKOUT_SUCCESS:
      return {}

    default:
      return state
  }
}
