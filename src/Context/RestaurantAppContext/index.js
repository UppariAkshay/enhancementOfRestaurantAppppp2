import React from 'react'

const RestaurantAppContext = () =>
  React.createContext({
    cartList: [],
    removeAllCartItems: () => {},
    addCartItem: () => {},
    removeCartItem: () => {},
    incrementCartItemQuantity: () => {},
    decrementCartItemQuantity: () => {},
  })

export default RestaurantAppContext
