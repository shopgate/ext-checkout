import {routeDidEnter, routeDidLeave} from '@shopgate/pwa-common/streams/history'

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidEnter('/checkout');
  const checkoutRouteDidLeave$ = routeDidLeave('/checkout');

  subscribe(checkoutRouteDidEnter$, ({ dispatch }) => {
    // fire custom event, when checkout is entered
    dispatch({type: 'CHECKOUT_ENTER'})
  })

  subscribe(checkoutRouteDidLeave$, ({ dispatch }) => {
    dispatch({type: 'CHECKOUT_LEAVE'})
  })
}
