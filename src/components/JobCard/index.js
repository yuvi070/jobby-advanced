import {Link} from 'react-router-dom'

const JobCard = props => {
  const {each} = props
  return (
    <Link to="/">
      <li className="job-card-main">
        <div className="logo-container">
          <img src={each.company_logo_url} alt="" className="job-card-logo" />
          <div className="job-card-logo-div1">
            <h1>{each.title}</h1>
            <div className="job-card-logo-div2">
              <img src="" alt="star" />
              <p>{each.rating}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
