import connect from '@shopgate/pwa-common/components/Router/helpers/connect'
import processCheckout from './action'
import {getCheckout, getCheckoutDisabled} from './selectors'

const mapStateToProps = (state) => ({
  disabled: getCheckoutDisabled(state),
  checkout: getCheckout(state)
})

const mapDispatchToProps = (dispatch) => ({
  processCheckout: (checkout) => dispatch(processCheckout(checkout))
})

export default connect(mapStateToProps, mapDispatchToProps)
