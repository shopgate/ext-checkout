import {CHECKOUT_SUCCESS, CHECKOUT_FAIL, CHECKOUT_DATA, CHECKOUT_ENTER, CHECKOUT_PROCESS} from './action-types'

export default (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_ENTER:
      if (!state.checkout) {
        state.checkout = {
          logs: []
        }
        state.checkoutDisabled = true
      }
      return state

    case CHECKOUT_PROCESS:
      return {
        ...state,
        checkoutDisabled: true
      }

    // Push checkout data parts from checkout actors
    case CHECKOUT_DATA:
      // required data comes in. Unlock checkout
      if (['items'].includes(action.id)) {
        state.checkoutDisabled = false
      }

      state.checkout[action.id] = action.data
      state.checkout.logs.push({
        type: action.type,
        id: action.id,
        time: new Date().toISOString()
      })
      return state

    case CHECKOUT_FAIL:
      state.checkout.logs.push({
        type: 'error',
        time: new Date().toISOString(),
        error: action.error
      })
      return {
        ...state,
        checkoutDisabled: false
      }

    case CHECKOUT_SUCCESS:
      return {}

    default:
      return state
  }
}
