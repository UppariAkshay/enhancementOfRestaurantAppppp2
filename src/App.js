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
    this.setState(prevState => ({
      cartList: [...prevState.cartList, newProduct],
    }))
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachProduct => eachProduct.id !== productId,
    )
    this.setState({cartList: updatedCartList})
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
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </RestaurantAppContext.Provider>
    )
  }
}

export default App
