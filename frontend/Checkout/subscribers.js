import {routeDidEnter} from '@shopgate/pwa-common/streams/history'
import {checkoutEnter} from "./action-factory"

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidEnter('/checkout2');

  subscribe(checkoutRouteDidEnter$, ({ dispatch }) => {
    // fire custom event, when checkout is entered to accept checkout data from checkout actors
    dispatch(checkoutEnter())
  })
}
