import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const removeCookie = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="body-header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="login-website-logo login-website-logo-mb"
        onClick={() => {
          history.replace('/')
        }}
      />
      <div className="body-header-navigation-container">
        <Link to="/" className="body-header-navigation-container-text">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="body-header-navigation-container-text">
          <p>Jobs</p>
        </Link>
      </div>
      <button
        type="button"
        className="body-logout-button"
        onClick={removeCookie}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
