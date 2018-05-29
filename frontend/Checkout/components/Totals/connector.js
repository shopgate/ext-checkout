import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import { getCheckoutCurrency, getCheckoutTotals } from './../../selectors';

/**
 * @param {Object} state redux
 * @return {{checkout: *}}
 */
const mapStateToProps = state => ({
  currency: getCheckoutCurrency(state),
  totals: getCheckoutTotals(state),
});

export default connect(mapStateToProps);
