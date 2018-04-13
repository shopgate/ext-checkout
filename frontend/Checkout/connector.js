import connect from '@shopgate/pwa-common/components/Router/helpers/connect'
import processCheckout from './action'

const mapDispatchToProps = (dispatch) => ({
  processCheckout: (checkout) => dispatch(processCheckout(checkout))
})

export default connect(null, mapDispatchToProps)
