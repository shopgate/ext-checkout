import {routeDidEnter} from '@shopgate/pwa-common/streams/history'
import resetHistory from '@shopgate/pwa-common/actions/history/resetHistory'
import {checkoutEnter} from './action-factory'
import {checkoutSuccess$} from './streams'

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidEnter('/checkoutNative')

  subscribe(checkoutRouteDidEnter$, ({ dispatch }) => {
    // fire custom event, when checkout is entered to accept checkout data from checkout actors
    dispatch(checkoutEnter())

    dispatch({type: 'SET_SEARCH_DISABLED'})
    dispatch({type: 'TOGGLE_NAVIGATOR_CART_ICON', active: false})
  })

  subscribe(checkoutSuccess$, ({ dispatch }) => {
    // User is redirected to homepage after success checkout
    dispatch(resetHistory('/'))
  })
}
