import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoLocationSharp} from 'react-icons/io5'
import {GiSuitcase} from 'react-icons/gi'

import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [apiStatus, setApiStatus] = useState({
    apiStatus: apiConstants.initial,
    data: [],
  })
  const [retryJobDetails, setRetryJobDetails] = useState('')
  useEffect(() => {
    const getJobDetails = async () => {
      setApiStatus({
        apiStatus: apiConstants.progress,
        data: [],
      })
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        setApiStatus({
          apiStatus: apiConstants.success,
          data,
        })
      } else {
        setApiStatus({
          apiStatus: apiConstants.failure,
          data: [],
        })
      }
    }
    getJobDetails()
  }, [retryJobDetails])
  let JobDetails = null
  //   const Skills = apiStatus.data.job_details.skills
  let SimilarJobs = null
  let skills = null
  let lifeAtCompany = null

  if (apiStatus.apiStatus === 'SUCCESS') {
    JobDetails = apiStatus.data.job_details
    SimilarJobs = apiStatus.data.similar_jobs
    skills = apiStatus.data.job_details.skills
    lifeAtCompany = apiStatus.data.job_details.life_at_company
  }

  console.log(SimilarJobs)

  const SuccessView = () => (
    <>
      <div className="job-card-main mini-1">
        <div className="logo-container">
          <img
            src={JobDetails.company_logo_url}
            alt="job details company logo"
            className="job-card-logo"
          />
          <div className="job-card-logo-div1">
            <p className="job-card-title">{JobDetails.title}</p>
            <div className="job-card-logo-div2">
              <img
                width="21"
                height="21"
                src="https://img.icons8.com/fluency/48/star--v1.png"
                alt="star--v1"
              />
              <p className="job-card-rating">{JobDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-details-container">
          <div className="job-card-details-container-div1">
            <div className="job-card-details-container-div2">
              <IoLocationSharp className="job-card-react-icon" />
              <p>{JobDetails.location}</p>
            </div>
            <div className="job-card-details-container-div2">
              <GiSuitcase className="job-card-react-icon" />
              <p>{JobDetails.employment_type}</p>
            </div>
          </div>
          <p className="job-card-title">{JobDetails.package_per_annum}</p>
        </div>
        <hr className="job-card-horizontal-line" />
        <div className="description-container">
          <div className="mini-2">
            <p className="job-card-title">Description</p>
            <a className="job-card-link" href={JobDetails.company_website_url}>
              Visit
            </a>
          </div>
          <p>{JobDetails.job_description}</p>
        </div>
        <div className="skills-container">
          <p className="job-card-title">Skills</p>
          <ul className="skills-div">
            {skills.map(each => (
              <li className="skill-card">
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="skill-image"
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="job-card-title">Life At Company</p>
        <div className="life-at-company-div">
          <p className="life-at-company-para">{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.image_url}
            alt="life at company"
            className="life-at-company-image"
          />
        </div>
      </div>
      <div className="similar-jobs-container">
        <p className="job-card-title">Similar Jobs</p>
        <ul className="similar-jobs-div">
          {SimilarJobs.map(each => (
            <li className=" similar-job-card">
              <div className="similar-job-mini-1">
                <img
                  src={each.company_logo_url}
                  alt="similar job company logo"
                  className="job-card-logo"
                />
                <div className="job-card-logo-div1">
                  <p className="job-card-title">{each.title}</p>
                  <div className="job-card-logo-div2">
                    <img
                      width="21"
                      height="21"
                      src="https://img.icons8.com/fluency/48/star--v1.png"
                      alt="star--v1"
                    />
                    <p className="job-card-rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="similar-job-description-container">
                <p className="job-card-title">Description</p>
                <p>{each.job_description}</p>
              </div>
              <div className="similar-job-mini-2 job-card-details-container-div1">
                <div className="job-card-details-container-div2">
                  <IoLocationSharp className="job-card-react-icon" />
                  <p>{each.location}</p>
                </div>
                <div className="job-card-details-container-div2">
                  <GiSuitcase className="job-card-react-icon" />
                  <p>{each.employment_type}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
  const renderViews = () => {
    const retryJobDetail = () => {
      setRetryJobDetails('a')
    }
    switch (apiStatus.apiStatus) {
      case 'PROGRESS':
        return (
          <div className="loader-container-profile" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'SUCCESS':
        return <>{SuccessView()}</>
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
              onClick={retryJobDetail}
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
    <>
      <Header />
      <div className="job-details-main">{renderViews()}</div>
    </>
  )
}

export default JobItemDetails
