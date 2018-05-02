import connect from '@shopgate/pwa-common/components/Router/helpers/connect'
import resetHistory from '@shopgate/pwa-common/actions/history/resetHistory'
import {getUserData} from '@shopgate/pwa-common/selectors/user'

const mapStateToProps = (state) => ({
  user: getUserData(state)
})

const mapDispatchToProps = (dispatch) => ({
  continueShopping: () => {
    dispatch(resetHistory('/'))
    dispatch({type: 'TOGGLE_NAVIGATOR_CART_ICON', active: true})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)
