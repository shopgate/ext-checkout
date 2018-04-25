import React from 'react'
import Route from '@shopgate/pwa-common/components/Router/components/Route'
import Checkout from './index'

const CheckoutRoute = (props) => (
  <Route
    path='/checkoutNative'
    component={Checkout}
    {...props}
  />
)

export default CheckoutRoute
