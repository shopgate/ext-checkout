import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '@shopgate/pwa-common/context';
import Portal from '@shopgate/pwa-common/components/Portal';
import I18n from '@shopgate/pwa-common/components/I18n';
import RippleButton from '@shopgate/pwa-ui-shared/RippleButton';
import * as portals from './portals';
import connect from './connector';
import * as style from './style';
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

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * Returns the translated view title.
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('checkout.title');
  }

  /**
   * @param {Object} event App event
   */
  handleProcessCheckout = (event) => {
    event.preventDefault();
    this.props.processCheckout(this.props.checkout);
  }

  /**
   * @return {*}
   */
  render() {
    // eslint-disable-next-line react/prop-types
    const { View, checkout } = this.props;
    return (
      <AppContext.Consumer>
        {context => (
          // eslint-disable-next-line extra-rules/no-single-line-objects
          <AppContext.Provider value={{ ...context, checkout }}>
            <View title={this.title}>
              <section className={style.container} data-test-id="CheckoutPage">
                <Fragment>
                  <Portal name={portals.CHECKOUT_BEFORE} />
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
                  <Portal name={portals.CHECKOUT_SHIPPING_METHOD_BEFORE} />
                  <Portal name={portals.CHECKOUT_SHIPPING_METHOD} />
                  <Portal name={portals.CHECKOUT_SHIPPING_METHOD_AFTER} />
                </Fragment>

                <Fragment>
                  <Portal name={portals.CHECKOUT_PAYMENT_METHOD_BEFORE} />
                  <Portal name={portals.CHECKOUT_PAYMENT_METHOD} />
                  <Portal name={portals.CHECKOUT_PAYMENT_METHOD_AFTER} />
                </Fragment>

                <Fragment>
                  <Portal name={portals.CHECKOUT_CART_BEFORE} />
                  <Portal name={portals.CHECKOUT_CART} />
                  <Portal name={portals.CHECKOUT_CART_AFTER} />
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
                    <div className={style.buttonWrapper}>
                      <RippleButton
                        type="secondary"
                        disabled={this.props.disabled}
                        onClick={this.handleProcessCheckout}
                        data-test-id="CheckoutButton"
                        className={style.button}
                      >
                        <I18n.Text string="checkout.button" />
                      </RippleButton>
                    </div>
                  </Portal>
                  <Portal name={portals.CHECKOUT_PROCESS_AFTER} />
                </Fragment>

                <Fragment>
                  <Portal name={portals.CHECKOUT_AFTER} />
                </Fragment>
              </section>
            </View>
          </AppContext.Provider>
        )}
      </AppContext.Consumer>
    );
  }
}

export default connect(Checkout);
