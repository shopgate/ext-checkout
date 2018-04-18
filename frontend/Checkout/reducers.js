import {CHECKOUT_SUCCESS, CHECKOUT_FAIL, CHECKOUT_DATA, CHECKOUT_ENTER} from './action-types'

export default (state = {}, action) => {
  switch (action.type) {

    case CHECKOUT_ENTER:
      return {
        checkout: {
          logs: []
        },
        ...state
      };

    case CHECKOUT_DATA:
      state.checkout[action.id] = action.data

      state.checkout.logs.push({
        type: action.type,
        time: new Date().toISOString()
      })
      return state

    case CHECKOUT_FAIL:
      // @TODO
      state.checkout.fails.push(action)
      return state

    case CHECKOUT_SUCCESS:
      // @TODO
      return {
        ...state,
        checkout: {}, // clean up a checkout
      };

    default:
      return state;
  }
}
