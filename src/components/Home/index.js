import Cookies from 'js-cookie'

const Home = props => {
  const {history} = props
  const removeCookie = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <button type="button" onClick={removeCookie}>
      Remove
    </button>
  )
}

export default Home
