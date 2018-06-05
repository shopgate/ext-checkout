import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import { checkoutEnter, checkoutState } from './action-factory';
import { checkoutSuccess$, checkoutState$, checkoutData$ } from './streams';
import fetchTotals from './components/Totals/action';
import { getCheckout } from './selectors';

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidEnter('/checkout');

  subscribe(checkoutRouteDidEnter$, ({ dispatch }) => {
    dispatch({
      type: 'SET_VIEW_TITLE',
      title: 'Checkout',
    });
    dispatch({ type: 'SET_SEARCH_DISABLED' });
    dispatch({
      type: 'TOGGLE_NAVIGATOR_CART_ICON',
      active: false,
    });

    // Fire custom event, when checkout is entered to accept checkout data from checkout actors
    dispatch(checkoutEnter());
  });

  subscribe(checkoutSuccess$, ({ dispatch }) => {
    // User is redirected to homepage after success checkout
    dispatch(replaceHistory({ pathname: '/checkout/success' }));
  });

  subscribe(checkoutData$, ({ dispatch, getState }) => {
    setTimeout(() => {
      dispatch(checkoutState(getCheckout(getState())));
    }, 100);
  });

  subscribe(checkoutState$, ({ dispatch, action }) => {
    fetchTotals(action.checkout)(dispatch);
  });
};
