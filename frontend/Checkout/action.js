import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest'
import {
  checkoutSuccess,
  checkoutFail,
  checkoutProcess
} from './action-factory'

export default (checkout) => (dispatch) => {
  dispatch(checkoutProcess())

  new PipelineRequest('shopgate.checkout.process')
    .setInput(checkout)
    .dispatch()
    .then(({ checkoutId }) => {
      dispatch(checkoutSuccess(checkoutId))
    })
    .catch((error) => {
      dispatch(checkoutFail(error))
    })
}
