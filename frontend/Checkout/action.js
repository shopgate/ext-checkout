import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import {
  checkoutSuccess,
  checkoutFail,
  checkoutProcess,
} from './action-factory';
import { getCheckout, getCheckoutLogs } from './selectors';

export default () => (dispatch, getState) => {
  dispatch(checkoutProcess());

  const state = getState();
  const checkout = getCheckout(state);
  const logs = getCheckoutLogs(state);

  // Pack logs into checkout
  const request = {
    checkout: {
      ...checkout,
      logs,
    },
  };

  new PipelineRequest('shopgate.checkout.process')
    .setInput(request)
    .dispatch()
    .then(({ orderId }) => {
      dispatch(checkoutSuccess(orderId));
    })
    .catch((error) => {
      dispatch(checkoutFail(error));
    });
};
