import {routeDidEnter} from '@shopgate/pwa-common/streams/history'
import {checkoutEnter} from './action-factory'

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidEnter('/checkout')

  subscribe(checkoutRouteDidEnter$, ({ dispatch }) => {
    // fire custom event, when checkout is entered to accept checkout data from checkout actors
    dispatch(checkoutEnter())

    dispatch({type: 'SET_SEARCH_DISABLED'})
    dispatch({type: 'TOGGLE_NAVIGATOR_CART_ICON', active: false})
  })
}
