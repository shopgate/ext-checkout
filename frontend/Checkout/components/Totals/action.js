import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { checkoutTotals } from './../../action-factory';

export default checkout => (dispatch) => {
  new PipelineRequest('shopgate.checkout.getTotals')
    .setInput({ checkout })
    .dispatch()
    .then((result) => {
      dispatch(checkoutTotals(result));
    });
};
