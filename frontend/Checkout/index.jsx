import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import Button from '@shopgate/pwa-common/components/Button';
import * as portals from './portals';
import connect from './connector';
import styles from './style';
import Totals from './components/Totals';

/**
 * Checkout component
 */
class Checkout extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    processCheckout: PropTypes.func.isRequired,
    checkout: PropTypes.shape(),
  }

  static defaultProps = {
    checkout: {},
  }

  /**
   * @param {Object} event App event
   */
  handleProcessCheckout = (event) => {
    event.preventDefault();
    this.props.processCheckout(this.props.checkout);
  }

  render() {
    const { View } = this.props;
    return (
      <View>
        <section className={styles.container} data-test-id="CheckoutPage">
          <Fragment>
            <Portal name={portals.CHECKOUT_CART_BEFORE} />
            <Portal name={portals.CHECKOUT_CART} />
            <Portal name={portals.CHECKOUT_CART_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_SHIPPING_ADDRESS_BEFORE} />
            <Portal name={portals.CHECKOUT_SHIPPING_ADDRESS} />
            <Portal name={portals.CHECKOUT_SHIPPING_ADDRESS_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_BILLING_ADDRESS_BEFORE} />
            <Portal name={portals.CHECKOUT_BILLING_ADDRESS} />
            <Portal name={portals.CHECKOUT_BILLING_ADDRESS_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_PAYMENT_METHOD_BEFORE} />
            <Portal name={portals.CHECKOUT_PAYMENT_METHOD} />
            <Portal name={portals.CHECKOUT_PAYMENT_METHOD_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_SHIPPING_METHOD_BEFORE} />
            <Portal name={portals.CHECKOUT_SHIPPING_METHOD} />
            <Portal name={portals.CHECKOUT_SHIPPING_METHOD_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_CUSTOM_FIELDS_BEFORE} />
            <Portal name={portals.CHECKOUT_CUSTOM_FIELDS} />
            <Portal name={portals.CHECKOUT_CUSTOM_FIELDS_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_TOTALS_BEFORE} />
            <Portal name={portals.CHECKOUT_TOTALS}>
              <Totals />
            </Portal>
            <Portal name={portals.CHECKOUT_TOTALS_AFTER} />
          </Fragment>

          <Fragment>
            <Portal name={portals.CHECKOUT_PROCESS_BEFORE} />
            <Portal name={portals.CHECKOUT_PROCESS}>
              <div className={styles.buttonWrapper} data-test-id="CheckoutButton" onClick={this.handleProcessCheckout}>
                <Button className={styles.button} type="secondary" disabled={this.props.disabled} >
                  checkout.button
                </Button>
              </div>
            </Portal>
            <Portal name={portals.CHECKOUT_PROCESS_AFTER} />
          </Fragment>

        </section>
      </View>
    );
  }
}

export default connect(Checkout);
