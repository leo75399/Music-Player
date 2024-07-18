import { Link } from 'react-router-dom'
import { MEETUP_IMG_PATH } from '../../../config'
import moment from 'moment'
import './MemberMeetupCard.scss'

const MemberMeetupCard = ({ meetup }) => {
  const { id, city, locality, activity_title, activity_img, activity_time } =
    meetup

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={`/meetup/list/${id}`} className="j-member-meetup">
        <div className="j-member-meetup__img-box">
          <img src={MEETUP_IMG_PATH + activity_img} alt="" />
        </div>
        <div className="j-member-meetup__info-box">
          <div className="j-member-meetup__title">{activity_title}</div>
          <div className="j-member-meetup__time">
            {moment(activity_time).format('ddd, MMM D, h:mm A')}
          </div>
          <div className="j-member-meetup__location">
            <i className="fas fa-map-marker-alt"></i>
            <div className="j-member-meetup__data">{`${city} ${locality}`}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MemberMeetupCard
