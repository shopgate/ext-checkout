import connect from '@shopgate/pwa-common/components/Router/helpers/connect';
import resetHistory from '@shopgate/pwa-common/actions/history/resetHistory';

/**
 * @param {function} dispatch redux dispatch
 * @return {{continueShopping: continueShopping}}
 */
const mapDispatchToProps = dispatch => ({
  continueShopping: () => {
    dispatch(resetHistory('/'));
    dispatch({
      type: 'TOGGLE_NAVIGATOR_CART_ICON',
      active: true,
    });
  },
});

export default connect(null, mapDispatchToProps);
