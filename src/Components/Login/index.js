import {Component} from 'react'
import {Redirect} from 'react-router-dom'
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

  onSubmitLogin = async event => {
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

  displayLoginForm = () => {
    const {isError, errorMsg} = this.state

    return (
      <form onSubmit={this.onSubmitLogin}>
        <h1>Login</h1>
        <label htmlFor='username'>USERNAME</label>
        <input id='username' onChange={this.onChangeUserName} type='text' />
        <label htmlFor='password'>PASSWORD</label>
        <input id='password' onChange={this.onChangePassword} type='password' />
        <button type='submit'>Login</button>
        {isError ? <p>{errorMsg}</p> : null}
      </form>
    )
  }

  render() {
    const jwtToken = Cookie.get('jwt_token')

    return jwtToken !== undefined ? (
      <Redirect to='/' />
    ) : (
      this.displayLoginForm()
    )
  }
}

export default Login
