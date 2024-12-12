import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'

import './index.css'

const Login = props => {
  const {history} = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorDetails, setErrorDetails] = useState({
    errorMsg: null,
    showError: false,
  })

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }
  const onChangePassword = event => {
    setPassword(event.target.value)
  }
  const onSubmitForm = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      setErrorDetails({
        errorMsg: null,
        showError: false,
      })
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      history.replace('/')
    } else {
      const data = await response.json()
      setErrorDetails({
        errorMsg: data.error_msg,
        showError: true,
      })
      setPassword('')
      setUsername('')
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-main">
      <div className="login-body">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="login-website-logo"
        />
        <form className="form-container" onSubmit={onSubmitForm}>
          <div className="input-div">
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              value={username}
              onChange={onChangeUsername}
              type="text"
              placeholder="USERNAME"
              className="login-input"
            />
          </div>
          <div className="input-div">
            <label className="login-label" htmlFor="username">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder="PASSWORD"
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {errorDetails.showError && <p>{errorDetails.errorMsg}</p>}
      </div>
    </div>
  )
}

export default Login
