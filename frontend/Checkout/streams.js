import { main$ } from '@shopgate/pwa-common/streams/main';
import { CHECKOUT_SUCCESS, CHECKOUT_DATA, CHECKOUT_STATE } from './action-types';

export const checkoutSuccess$ = main$.filter(({ action }) => action.type === CHECKOUT_SUCCESS);
export const checkoutData$ = main$.filter(({ action }) => action.type === CHECKOUT_DATA);
export const checkoutState$ = main$.filter(({ action }) => action.type === CHECKOUT_STATE);
