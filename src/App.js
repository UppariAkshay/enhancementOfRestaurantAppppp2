import {Component} from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Login from './Components/Login'
import RestaurantAppContext from './Context/RestaurantAppContext'
import './App.css'

class App extends Component {
  state = {cartList: []}

  removeAllcartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = newProduct => {
    const {cartList} = this.state
    const isAlreadyThere = cartList.find(
      eachProduct => eachProduct.dish_id === newProduct.dish_id,
    )

    if (isAlreadyThere !== undefined) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct =>
          eachProduct.dish_id === newProduct.dish_id
            ? {...eachProduct, quantity: eachProduct.quantity + 1}
            : eachProduct,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newProduct],
      }))
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== productId,
    )
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = productId => {
    const {cartList} = this.state

    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct =>
        eachProduct.dish_id === productId
          ? {...eachProduct, quantity: eachProduct.quantity + 1}
          : {...eachProduct},
      ),
    }))
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const productInCart = cartList.filter(
      eachProduct => eachProduct.dish_id === productId,
    )

    if (productInCart[0].quantity === 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(
          eachProduct => eachProduct.dish_id !== productId,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct =>
          eachProduct.dish_id === productId
            ? {...eachProduct, quantity: eachProduct.quantity - 1}
            : {...eachProduct},
        ),
      }))
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state

    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachProduct => eachProduct.dish_id !== productId,
      ),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <RestaurantAppContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllcartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              exact
              path="/"
              component={Home}
              cartQuantity={cartList.length}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </RestaurantAppContext.Provider>
    )
  }
}

export default App
