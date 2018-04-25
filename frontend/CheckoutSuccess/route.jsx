import React from 'react'
import Route from '@shopgate/pwa-common/components/Router/components/Route'
import CheckoutSuccess from './index'

const CheckoutSuccessRoute = (props) => (
  <Route
    path='/checkout/success'
    component={CheckoutSuccess}
    {...props}
  />
)

export default CheckoutSuccessRoute
