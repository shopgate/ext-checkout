import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import { checkoutEnter } from './action-factory';
import { checkoutSuccess$, checkoutData$ } from './streams';
import { getCheckout } from './selectors';
import fetchTotals from './components/Totals/action';

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidEnter('/checkout');

  subscribe(checkoutRouteDidEnter$, ({ dispatch }) => {
    // Fire custom event, when checkout is entered to accept checkout data from checkout actors
    dispatch(checkoutEnter());

    dispatch({
      type: 'SET_VIEW_TITLE',
      title: 'Checkout',
    });
    dispatch({ type: 'SET_SEARCH_DISABLED' });
    dispatch({
      type: 'TOGGLE_NAVIGATOR_CART_ICON',
      active: false,
    });
  });

  subscribe(checkoutSuccess$, ({ dispatch }) => {
    // User is redirected to homepage after success checkout
    dispatch(replaceHistory({ pathname: '/checkout/success' }));
  });

  /**
   * Every time when checkout form changes, we need to fetch checkout totals
   */
  subscribe(checkoutData$, ({ dispatch, getState }) => {
    setTimeout(() => {
      const checkout = getCheckout(getState());
      fetchTotals(checkout)(dispatch);
    }, 500);
  });
};
