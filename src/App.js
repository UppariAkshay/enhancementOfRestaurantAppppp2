import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import DishCard from './Components/DishCard/index'
import './App.css'

class App extends Component {
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

  displayTabsAndDishes = () => {
    return (
      <div style={{width: '100%'}}>
        <div className="tabsContainerDIV">{this.displayTabs()}</div>

        <ul className="dishesContainerUL">{this.displayDishes()}</ul>
      </div>
    )
  }

  displayLoading = () => <Loader />

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

  render() {
    const {tabSelected, isLoading} = this.state

    return (
      <div>
        <div className="header">
          <h1>UNI Resto Cafe</h1>
          <div>
            <h1>
              My orders{' '}
              <div>
                <AiOutlineShoppingCart />
                <p className="cartCounter">0</p>
              </div>
            </h1>
          </div>
        </div>

        <div className="tabsAndDishesContainerDIV">
          {isLoading === true
            ? this.displayLoading()
            : this.displayTabsAndDishes()}
        </div>
      </div>
    )
  }
}

export default App
