import {Link} from 'react-router-dom'

import {IoLocationSharp} from 'react-icons/io5'
import {GiSuitcase} from 'react-icons/gi'

import './index.css'

const JobCard = props => {
  const {each} = props
  return (
    <Link to={`/jobs/${each.id}`} className="job-card-link">
      <li className="job-card-main">
        <div className="logo-container">
          <img src={each.company_logo_url} alt="" className="job-card-logo" />
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
        <div className="job-card-details-container">
          <div className="job-card-details-container-div1">
            <div className="job-card-details-container-div2">
              <IoLocationSharp className="job-card-react-icon" />
              <p>{each.location}</p>
            </div>
            <div className="job-card-details-container-div2">
              <GiSuitcase className="job-card-react-icon" />
              <p>{each.employment_type}</p>
            </div>
          </div>
          <p className="job-card-title">{each.package_per_annum}</p>
        </div>
        <hr className="job-card-horizontal-line" />
        <div className="description-container">
          <p className="job-card-title">Description</p>
          <p>{each.job_description}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
