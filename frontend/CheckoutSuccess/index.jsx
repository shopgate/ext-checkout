import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import Button from '@shopgate/pwa-common/components/Button';
import * as portals from './portals';
import connect from './connector';
import styles from './style';

/**
 * Checkout success component
 */
class CheckoutSuccess extends Component {
  static propTypes = {
    continueShopping: PropTypes.func.isRequired,
  }

  /**
   * @param {Object} event App event
   */
  handleContinueShopping = (event) => {
    event.preventDefault();
    this.props.continueShopping();
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View } = this.props;
    return (
      <View>
        <section className={styles.container} data-test-id="CheckoutSuccessPage">
          <div className={styles.headline}>
            Thank you for your oder
          </div>

          <div>
            <Portal name={portals.CHECKOUT_SUCCESS_BEFORE} />
            <Portal name={portals.CHECKOUT_SUCCESS}>
              <div className={styles.subline}>
                Your order is received.
              </div>
            </Portal>
            <Portal name={portals.CHECKOUT_SUCCESS_AFTER} />
          </div>

          <div>
            <Portal name={portals.CHECKOUT_SUCCESS_CONTINUE}>
              <div className={styles.buttonWrapper} data-test-id="CheckoutSuccessButton" onClick={this.handleContinueShopping}>
                <Button className={styles.button} type="secondary" >
                  Continue shopping
                </Button>
              </div>
            </Portal>
          </div>

        </section>
      </View>
    );
  }
}

export default connect(CheckoutSuccess);
