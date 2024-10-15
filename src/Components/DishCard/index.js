import {Component} from 'react'

class DishCard extends Component {
  state = {}

  render() {
    const {dishDetails} = this.props
    return (
      <li>
        <p>{dishDetails.dish_name}</p>
        <p>
          {dishDetails.dish_currency} <span>{dishDetails.dish_price}</span>
        </p>
        <p>{dishDetails.dish_description}</p>
        {dishDetails.dish_Availability === true ? (
          this.quantityAddDelButton
        ) : (
          <p>Not available</p>
        )}
      </li>
    )
  }
}

export default DishCard
