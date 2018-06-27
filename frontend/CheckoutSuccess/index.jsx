import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import I18n from '@shopgate/pwa-common/components/I18n';
import * as portals from './portals';
import connect from './connector';
import styles from './style';

/* eslint-disable react/prefer-stateless-function */
/**
 * CheckoutSuccess component
 */
class CheckoutSuccess extends Component {
  static propTypes = {
    continueShopping: PropTypes.func.isRequired,
    View: PropTypes.func.isRequired,
  }

  /**
   * @return {Object} JSX-Object
   */
  render() {
    const { continueShopping, View } = this.props;
    return (
      <View>
        <section className={styles.container} data-test-id="CheckoutSuccessPage">
          <div className={styles.headline}>
            <I18n.Text string="checkout.success.title" />
          </div>

          <Portal name={portals.CHECKOUT_SUCCESS_BEFORE} />
          <Portal name={portals.CHECKOUT_SUCCESS}>
            <div className={styles.subLine}>
              <I18n.Text string="checkout.success.text" />
            </div>
          </Portal>
          <Portal name={portals.CHECKOUT_SUCCESS_AFTER} />

          <Portal name={portals.CHECKOUT_SUCCESS_CONTINUE}>
            <div className={styles.buttonWrapper}>
              <RippleButton
                type="secondary"
                onClick={continueShopping}
                data-test-id="CheckoutSuccessButton"
                className={styles.button}
              >
                <I18n.Text string="checkout.success.continueShopping" />
              </RippleButton>
            </div>
          </Portal>
        </section>
      </View>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

export default connect(CheckoutSuccess);
