import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal'
import Button from '@shopgate/pwa-common/components/Button'
import * as portals from "./portals"
import connect from './connector';
import styles from './style';

class Checkout extends Component {
  static propTypes = {
    processCheckout: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checkout: PropTypes.shape()
  }

  static defaultProps = {
    processCheckout () {},
    disabled: true,
    checkout: {}
  }

  constructor(props) {
    super(props)
  }

  handleProcessCheckout = (event) => {
    event.preventDefault()
    this.props.processCheckout(this.props.checkout)
  }

  render() {
    const {View} = this.props
    return (
      <View>
        <section className={styles.container} data-test-id="CheckoutPage">
          <div className={styles.headline}>
            Checkout
          </div>
          <div className={styles.subline}>
            confirm your order
          </div>

          <div>
            <Portal name={portals.CHECKOUT_CART_BEFORE}/>
            <Portal name={portals.CHECKOUT_CART}>
              cart small view
            </Portal>
            <Portal name={portals.CHECKOUT_CART_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_SHIPPING_ADDRESS_BEFORE}/>
            <Portal name={portals.CHECKOUT_SHIPPING_ADDRESS}>
              select or assign shipping address
            </Portal>
            <Portal name={portals.CHECKOUT_SHIPPING_ADDRESS_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_BILLING_ADDRESS_BEFORE}/>
            <Portal name={portals.CHECKOUT_BILLING_ADDRESS}>
              select or assign billing address
            </Portal>
            <Portal name={portals.CHECKOUT_BILLING_ADDRESS_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_PAYMENT_METHOD_BEFORE}/>
            <Portal name={portals.CHECKOUT_PAYMENT_METHOD}>
              select or assign payment method
            </Portal>
            <Portal name={portals.CHECKOUT_PAYMENT_METHOD_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_SHIPPING_METHOD_BEFORE}/>
            <Portal name={portals.CHECKOUT_SHIPPING_METHOD}>
              select or assign shipping method
            </Portal>
            <Portal name={portals.CHECKOUT_SHIPPING_METHOD_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_CUSTOM_FIELDS_BEFORE}/>
            <Portal name={portals.CHECKOUT_CUSTOM_FIELDS}>
              select or assign custom fields
            </Portal>
            <Portal name={portals.CHECKOUT_CUSTOM_FIELDS_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_PROCESS_BEFORE}/>
            <Portal name={portals.CHECKOUT_PROCESS}>
              <div className={styles.buttonWrapper} data-test-id="CheckoutButton" onClick={this.handleProcessCheckout}>
                <Button className={styles.button} type="secondary" disabled={this.props.disabled} >
                  checkout.button
                </Button>
              </div>
            </Portal>
            <Portal name={portals.CHECKOUT_PROCESS_AFTER}/>
          </div>

        </section>
      </View>
    )
  }
}

export default connect(Checkout)
