import './index.css'
import {Link, withRouter} from 'react-router-dom'
import RestaurantAppContext from '../../Context/RestaurantAppContext'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookie from 'js-cookie'

const Header = props => {
  const {restaurantName} = props
  console.log(restaurantName)

  const displayCartIconAndCount = () => (
    <RestaurantAppContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <>
            <button data-testid="cart" onClick={onClickCartIcon}>
              <span>
                <AiOutlineShoppingCart size={30} />
              </span>
            </button>
            <p className="cartCounter">{cartList.length}</p>
          </>
        )
      }}
    </RestaurantAppContext.Consumer>
  )

  const onClickLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCartIcon = () => {
    const {history} = props

    history.push('/cart')
  }

  return (
    <div className="header">
      <Link to="/">
        <h1>{restaurantName}</h1>
      </Link>

      <div>
        <h1>My orders</h1>
        {displayCartIconAndCount()}
        <button onClick={onClickLogout}>Logout</button>
      </div>
    </div>
  )
}

export default withRouter(Header)
