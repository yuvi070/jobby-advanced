import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const Jobs = () => {
  const jwtToken = Cookies.get('jwt_token')
  const [type, setType] = useState([])
  const [retryProfileState, setRetryProfile] = useState('')
  const [profileResponse, setProfileResponse] = useState({
    apiStatus: apiConstants.initial,
    showError: false,
    data: null,
  })
  const [retryJobs, setRetryJobs] = useState('')
  const [jobsResponse, setJobsResponse] = useState({
    apiStatus: apiConstants.initial,
    data: null,
  })

  // profile logic begins

  useEffect(() => {
    const profile = async () => {
      setProfileResponse({
        apiStatus: apiConstants.progress,
        showError: false,
        data: null,
      })
      const apiUrl = 'https://apis.ccbp.in/profile'
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        setProfileResponse({
          apiStatus: apiConstants.success,
          showError: false,
          data: data.profile_details,
        })
      } else {
        const data = await response.json()
        setProfileResponse({
          apiStatus: apiConstants.failure,
          showError: true,
          data: data.profile_details,
        })
      }
    }
    profile()
  }, [retryProfileState])
  const retryProfile = () => {
    setRetryProfile('a')
  }

  const renderProfileView = () => {
    switch (profileResponse.apiStatus) {
      case 'PROGRESS':
        return (
          <div className="loader-container-profile" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="jobs-profile-div">
            <img
              src={profileResponse.data.profile_image_url}
              alt=""
              className="profile-avatar"
            />
            <p>{profileResponse.data.name}</p>
            <p>{profileResponse.data.short_bio}</p>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="failure-profile">
            <button
              onClick={retryProfile}
              type="button"
              className="profile-failure-button"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  // employments type logic starts
  const employType = event => {
    if (type.includes(event.target.value)) {
      const filteredArray = type.filter(each => each !== event.target.value)
      setType(filteredArray)
    } else {
      setType(prev => [...prev, event.target.value])
    }
  }

  useEffect(() => {
    const jobs = async () => {
      setJobsResponse({
        apiStatus: apiConstants.progress,
        data: null,
      })
      const apiUrl = `https://apis.ccbp.in/jobs?${type.join()}&minimum_package=&search=`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        setJobsResponse({
          apiStatus: apiConstants.success,
          data: data.jobs,
        })
      } else {
        setJobsResponse({
          apiStatus: apiConstants.failure,
          data: null,
        })
      }
    }
    jobs()
  }, [retryJobs, type])
  // need to code the rendering views of jobs

  return (
    <div className="jobs-main">
      <Header />
      <div className="jobs-bottom-main">
        <div className="jobs-bottom-body">
          <div className="jobs-bottom-div1">
            {renderProfileView()}
            <hr className="jobs-horizontal-line" />
            <div className="jobs-div1-type-of-employment">
              <p>Type of Employment</p>
              {employmentTypesList.map(each => (
                <>
                  <input
                    onChange={employType}
                    type="checkbox"
                    value={each.employmentTypeId}
                    id={each.employmentTypeId}
                  />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  <br />
                </>
              ))}
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
