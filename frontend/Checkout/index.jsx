import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from './connector.js'
import styles from './style.js'
import RippleButton from './../../../../themes/theme-gmd/components/RippleButton'

class Checkout extends Component {
  static propTypes = {
    processCheckout: PropTypes.func
  }

  static defaultProps = {
    processCheckout: () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      user: '',
      items: []
    }
  }

  handleSubmitForm = (event) => {
    event.preventDefault()
    this.props.processCheckout(this.state)
  }

  render() {
    const {View} = this.props
    return (
      <View>
        <section className={styles.container} data-test-id="RegisterPage">
          <div className={styles.headline}>
            Checkout
          </div>
          <div className={styles.subline}>
            confirm your order
          </div>
          <form onSubmit={this.handleSubmitForm}>
            <div className={styles.buttonWrapper} data-test-id="LoginButton">
              <RippleButton className={styles.button} type="secondary" disabled={this.props.isLoading}>
                buy now
              </RippleButton>
            </div>
          </form>
        </section>
      </View>
    )
  }
}

export default connect(Checkout)
