import {Component} from 'react'
import RestaurantAppContext from '../../Context/RestaurantAppContext'
import Header from '../Header'
import './index.css'

class Cart extends Component {
  state = {}

  displayCartItems = () => (
    <RestaurantAppContext.Consumer>
      {value => {
        const {
          removeAllCartItems,
          cartList,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const CartItem = productDetails => {
          const {
            dish_name,
            dish_image,
            dish_price,
            quantity,
            dish_currency,
            dish_id,
          } = productDetails

          const onClickInceaseQuantity = () => {
            incrementCartItemQuantity(dish_id)
          }

          const onClickDecreaseQuantity = () => {
            decrementCartItemQuantity(dish_id)
          }

          const onClickRemove = () => {
            removeCartItem(dish_id)
          }

          return (
            <li className="cartItemLI">
              <img className="dishImageIMG" src={dish_image} />
              <p>{dish_name}</p>
              <button onClick={onClickInceaseQuantity}>+</button>
              <p>{quantity}</p>
              <button onClick={onClickDecreaseQuantity}>-</button>
              <p>
                {dish_currency} {dish_price * quantity}
              </p>
              <button onClick={onClickRemove}>Remove</button>
            </li>
          )
        }

        return (
          <>
            {cartList.length === 0 && (
              <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png" />
            )}
            {cartList.map(eachProduct => CartItem(eachProduct))}
            {cartList.length > 0 && <button onClick={removeAllCartItems}>Remove All</button>}
          </>
        )
      }}
    </RestaurantAppContext.Consumer>
  )

  render() {
    return (
      <div>
        <Header restaurantName="UNI Resto Cafe" />
        <h1>Cart Items</h1>
        <ul>{this.displayCartItems()}</ul>
      </div>
    )
  }
}

export default Cart
