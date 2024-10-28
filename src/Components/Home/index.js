import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import DishCard from '../DishCard'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {tabSelected: '11', tabsAndDishes: [], isLoading: true}

  componentDidMount() {
    this.fetchMenuData()
  }

  fetchMenuData = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const responseData = await response.json()

    console.log(responseData)

    if (response.ok === true) {
      this.setState({
        tabsAndDishes: responseData[0],
        isLoading: false,
      })
    }
  }

  onClickTab = event => {
    this.setState({
      tabSelected: event.target.id,
    })
  }

  displayTabsAndDishes = () => (
    <div style={{width: '100%'}}>
      <div className="tabsContainerDIV">{this.displayTabs()}</div>

      <ul className="dishesContainerUL">{this.displayDishes()}</ul>
    </div>
  )

  displayLoading = () => <Loader />

  displayDishes = () => {
    const {tabSelected, tabsAndDishes} = this.state
    const selectedTabDetails = tabsAndDishes.table_menu_list.filter(
      eachTab => tabSelected === eachTab.menu_category_id,
    )

    const dishes = selectedTabDetails[0].category_dishes
    console.log(dishes)

    return dishes.map(eachDish => (
      <DishCard key={eachDish.dish_id} dishDetails={eachDish} />
    ))
  }

  displayTabs() {
    const {tabsAndDishes, tabSelected} = this.state

    return tabsAndDishes.table_menu_list.map(eachTab => (
      <button
        id={eachTab.menu_category_id}
        className={
          tabSelected === eachTab.menu_category_id
            ? 'removeDefaultBtnStyles tabSelected'
            : 'removeDefaultBtnStyles'
        }
        onClick={this.onClickTab}
      >
        {eachTab.menu_category}
      </button>
    ))
  }

  render() {
    const {tabSelected, isLoading, tabsAndDishes} = this.state
    const {cartQuantity} = this.props

    return (
      <div>
        <Header restaurantName={tabsAndDishes.restaurant_name} />
        <div className="tabsAndDishesContainerDIV">
          {isLoading === true
            ? this.displayLoading()
            : this.displayTabsAndDishes()}
        </div>
      </div>
    )
  }
}

export default Home
