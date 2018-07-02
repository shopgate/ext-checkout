import { connect } from 'react-redux';
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
  processCheckout: () => dispatch(processCheckout()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true });
