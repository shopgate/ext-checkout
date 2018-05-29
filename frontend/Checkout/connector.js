import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import processCheckout from './action';
import { getCheckout, getCheckoutDisabled } from './selectors';

/**
 * @param {Object} state state
 * @return {{disabled: boolean, checkout: *}}
 */
const mapStateToProps = state => ({
  disabled: getCheckoutDisabled(state),
  checkout: getCheckout(state),
});

/**
 * @param {function} dispatch redux dispatch
 * @return {{processCheckout: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => ({
  processCheckout: checkout => dispatch(processCheckout(checkout)),
});

export default connect(mapStateToProps, mapDispatchToProps);
