import {main$} from '@shopgate/pwa-common/streams/main'

export const checkoutSuccess$ = main$.filter(({action}) => action.type === 'CHECKOUT_SUCCESS')
