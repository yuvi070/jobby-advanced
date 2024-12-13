import {useState, useEffect} from 'react'

import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  porgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Jobs = props => {
  const a = 10

  const renderSuccess = () => <Header />
  return (
    <div className="jobs-main">
      <Header />
      <div className="jobs-bottom-main">
        <div className="jobs-bottom-body">
          <div className="jobs-bottom-div1">
            <div className="jobs-profile-div">
              <h1>Rahul</h1>
              <p>Lead Software Developer</p>
            </div>
            <hr className="jobs-horizontal-line" />
            <div className="jobs-div1-type-of-employment">
              <p>Type of Employment</p>
            </div>
          </div>
          <div className="jobs-bottom-div2">
            <h1>2</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
