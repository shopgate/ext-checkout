import React from 'react'
import Route from '@shopgate/pwa-common/components/Router/components/Route'
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes'
import Checkout from './index'

const CheckoutRoute = (props) => (
  <AuthRoutes to={'/login'}>
    <Route
      path={'/checkout2'}
      component={Checkout}
      {...props}
    />
  </AuthRoutes>
)

export default CheckoutRoute
