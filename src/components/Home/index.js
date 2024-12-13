import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props

  return (
    <div className="body-main">
      <Header />
      <div className="body-bottom-container">
        <h1 className="body-bottom-heading">
          Find the Jobs That <br /> Fits Your Life
        </h1>
        <p className="body-bottom-para">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential.{' '}
        </p>
        <button
          type="button"
          onClick={() => {
            history.replace('/jobs')
          }}
          className="body-bottom-button"
        >
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
