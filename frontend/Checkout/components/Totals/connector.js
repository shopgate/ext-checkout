import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import { getCheckoutTotals } from './../../selectors';

/**
 * @param {Object} state redux
 * @return {{checkout: *}}
 */
const mapStateToProps = state => ({
  totals: getCheckoutTotals(state),
});

export default connect(mapStateToProps);
