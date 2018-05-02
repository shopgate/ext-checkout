import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal'
import Button from '@shopgate/pwa-common/components/Button'
import * as portals from './portals'
import connect from './connector';
import styles from './style';

class CheckoutSuccess extends Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    continueShopping: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: {},
    continueShopping: () => {}
  }

  constructor(props) {
    super(props)
  }

  handleContinueShopping = (event) => {
    event.preventDefault()
    this.props.continueShopping()
  }

  render() {
    const {View} = this.props
    return (
      <View>
        <section className={styles.container} data-test-id="CheckoutSuccessPage">
          <div className={styles.headline}>
            Thank you for your oder
          </div>

          <div>
            <Portal name={portals.CHECKOUT_SUCCESS_BEFORE}/>
            <Portal name={portals.CHECKOUT_SUCCESS}>
              <div className={styles.subline}>
                Your order is received.
              </div>
            </Portal>
            <Portal name={portals.CHECKOUT_SUCCESS_AFTER}/>
          </div>

          <div>
            <Portal name={portals.CHECKOUT_SUCCESS_CONTINUE}>
              <div className={styles.buttonWrapper} data-test-id="CheckoutSuccessButton" onClick={this.handleContinueShopping}>
                <Button className={styles.button} type="secondary" disabled={this.props.disabled} >
                  Continue shopping
                </Button>
              </div>
            </Portal>
          </div>

        </section>
      </View>
    )
  }
}

export default connect(CheckoutSuccess)
