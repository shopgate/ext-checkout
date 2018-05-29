import React from 'react';
import Route from '@shopgate/pwa-common/components/Router/components/Route';
import AuthRoutes from '@shopgate/pwa-common/components/Router/components/AuthRoutes';
import CheckoutSuccess from './index';

/**
 * @param {Object} props props
 * @return {*}
 * @constructor
 */
const CheckoutSuccessRoute = props => (
  <AuthRoutes to="/login">
    <Route
      path="/checkout/success"
      component={CheckoutSuccess}
      {...props}
    />
  </AuthRoutes>
);

export default CheckoutSuccessRoute;
