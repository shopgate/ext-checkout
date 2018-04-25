import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest'

export default (checkout) => (dispatch) => {
  new PipelineRequest('shopgate.checkout.processCheckout')
    .setInput(checkout)
    .dispatch()
    .then(({ checkoutId }) => {
      dispatch({
        type: 'CHECKOUT_SUCCESS',
        checkoutId
      })
    })
    .catch((error) => {
      dispatch({
        type: 'CHECKOUT_FAIL',
        error
      })
    })
}
