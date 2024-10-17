import {Component} from 'react'
import './index.css'

class DishCard extends Component {
  state = {quantityCount: 0}

  displayAddonCatButton() {
    const {quantityCount} = this.state

    return (
      <div className="quantityIncDecElementDIV">
        <button className="incDecBtn" onClick={this.decreaseQuantity}>
          -
        </button>
        <p>{quantityCount}</p>
        <button className="incDecBtn" onClick={this.increaseQuantity}>
          +
        </button>
      </div>
    )
  }

  decreaseQuantity = () => {
    this.setState(prevState => ({
      quantityCount: prevState.quantityCount - 1,
    }))
  }

  increaseQuantity = () => {
    this.setState(prevState => ({
      quantityCount: prevState.quantityCount + 1,
    }))
  }

  render() {
    const {dishDetails} = this.props

    console.log(dishDetails)

    return (
      <li className="dishCard">
        <div>
          <div className={dishDetails.dish_Type === 2 ? 'veg' : 'nonVeg'}></div>
          <h1>{dishDetails.dish_name}</h1>
          <p>
            {dishDetails.dish_currency} {dishDetails.dish_price}
          </p>
          <p>{dishDetails.dish_description}</p>

          {dishDetails.dish_Availability === true ? (
            this.displayAddonCatButton()
          ) : (
            <p className="notAvailableP">Not available</p>
          )}

          <p className="customizationAvailable">
            {dishDetails.addonCat.length > 0 ? 'Customization available' : ''}
          </p>
        </div>

        <p className="dishCalories">{dishDetails.dish_calories} Calories</p>

        <img className="dishImage" src={`${dishDetails.dish_image}`} />
      </li>
    )
  }
}

export default DishCard
