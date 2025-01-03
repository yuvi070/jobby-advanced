import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoSearchOutline} from 'react-icons/io5'

import Header from '../Header'
import JobCard from '../JobCard'
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

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  const jwtToken = Cookies.get('jwt_token')
  const [type, setType] = useState([])
  const [salary, setSalary] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchButton, setSearchButton] = useState(null)
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
              alt="profile"
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

  const salaryRange = event => {
    setSalary(event.target.value)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearchButton = event => {
    event.preventDefault()
    setSearchButton('')
  }

  useEffect(() => {
    const jobs = async () => {
      setJobsResponse({
        apiStatus: apiConstants.progress,
        data: null,
      })
      const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${type.join()}&minimum_package=${salary}&search=${searchInput}`
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
        setSearchInput('')
      } else {
        setJobsResponse({
          apiStatus: apiConstants.failure,
          data: null,
        })
      }
    }
    jobs()
  }, [retryJobs, type, salary, searchButton])
  const retryJobsPage = () => {
    setRetryJobs('a')
  }
  // need to code the rendering views of jobs
  let isValid = null
  if (jobsResponse.apiStatus === 'SUCCESS') {
    isValid = jobsResponse.data.length === 0
  }
  const renderJobViews = () => {
    switch (jobsResponse.apiStatus) {
      case 'PROGRESS':
        return (
          <div className="loader-container-profile" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'SUCCESS':
        return (
          <>
            {isValid ? (
              <div className="jobs-failure-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="jobs-failure-image"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters.</p>
              </div>
            ) : (
              <ul className="job-card-ul-container">
                {jobsResponse.data.map(each => (
                  <JobCard key={each.id} each={each} />
                ))}
              </ul>
            )}
          </>
        )
      case 'FAILURE':
        return (
          <div className="jobs-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="jobs-failure-image"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button
              onClick={retryJobsPage}
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
            <hr className="jobs-horizontal-line" />
            <div className="jobs-div1-salary-range">
              <p>Salary Range</p>
              {salaryRangesList.map(each => (
                <>
                  <input
                    type="radio"
                    name="salary"
                    value={each.salaryRangeId}
                    id={each.salaryRangeId}
                    onChange={salaryRange}
                  />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                  <br />
                </>
              ))}
            </div>
          </div>
          <div className="jobs-bottom-div2">
            <>
              <form
                onSubmit={onClickSearchButton}
                className="jobs-bottom-div2-input-container"
              >
                <input
                  type="text"
                  className="job-search-input"
                  placeholder="search"
                  onChange={onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="submit"
                  data-testid="searchButton"
                  className="job-search-button"
                >
                  <IoSearchOutline />
                </button>
              </form>
              {renderJobViews()}
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
