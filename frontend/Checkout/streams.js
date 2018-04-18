import {main$} from '@shopgate/pwa-common/streams/main'

export const checkoutDidEnter$ = main$.filter(({action}) => action.type === 'CHECKOUT_ENTER')
export const checkoutDidLeave$ = main$.filter(({action}) => action.type === 'CHECKOUT_LEAVE')

export const checkoutSuccess$ = main$.filter(({action}) => action.type === 'CHECKOUT_SUCCESS')
export const checkoutFail$ = main$.filter(({action}) => action.type === 'CHECKOUT_FAIL')
