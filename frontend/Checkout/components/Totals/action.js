import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { checkoutTotals, checkoutFetchTotals } from './../../action-factory';

export default checkout => (dispatch) => {
  dispatch(checkoutFetchTotals());

  new PipelineRequest('shopgate.checkout.getTotals')
    .setInput({ checkout })
    .dispatch()
    .then((result) => {
      dispatch(checkoutTotals(result));
    });
};
