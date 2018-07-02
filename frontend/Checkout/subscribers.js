import { routeDidChange$ } from '@shopgate/pwa-common/streams/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import { checkoutEnter, checkoutState } from './action-factory';
import { checkoutSuccess$, checkoutState$, checkoutData$ } from './streams';
import fetchTotals from './components/Totals/action';
import { getCheckout } from './selectors';

export default (subscribe) => {
  const checkoutRouteDidEnter$ = routeDidChange$.filter(({ pathname }) => pathname === '/checkout');

  subscribe(checkoutRouteDidEnter$, ({ dispatch, getState }) => {
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
    dispatch(checkoutEnter(getCheckout(getState())));
  });

  subscribe(checkoutSuccess$, ({ dispatch }) => {
    // User is redirected to homepage after success checkout
    dispatch(replaceHistory({ pathname: '/checkout/success' }));
  });

  // Notify immediately, that checkout state is changed
  subscribe(checkoutData$, ({ dispatch, getState }) => {
    dispatch(checkoutState(getCheckout(getState())));
  });

  // Fetch totals with a little delay
  let checkoutFetchTotalsTimeout = null;
  subscribe(checkoutState$, ({ dispatch, action }) => {
    clearTimeout(checkoutFetchTotalsTimeout);
    checkoutFetchTotalsTimeout = setTimeout(
      dispatch,
      700,
      fetchTotals(action.checkout)
    );
  });
};
