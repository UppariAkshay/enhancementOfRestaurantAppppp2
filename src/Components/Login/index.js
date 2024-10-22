import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', password: '', isError: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {userName, password} = this.state
    const userDetails = {username: userName, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch('https://apis.ccbp.in/login', options)
    const responseData = await response.json()

    console.log(responseData)

    if (response.ok === true) {
      const {history} = this.props
      Cookie.set('jwt_token', responseData.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({isError: true, errorMsg: responseData.error_msg})
    }
  }

  render() {
    const {isError, errorMsg} = this.state

    return (
      <form>
        <h1>Login</h1>
        <input onChange={this.onChangeUserName} type="text" />
        <input onChange={this.onChangePassword} type="password" />
        <button onClick={this.onClickLogin}>Login</button>
        {isError ? <p>{errorMsg}</p> : null}
      </form>
    )
  }
}

export default Login
