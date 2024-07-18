import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MEETUP_IMG_PATH } from '../../../config'
import VanillaTilt from 'vanilla-tilt'
import moment from 'moment'
// {
//   "id": 1,
//   "members_id": 4,
//   "lat": "25.034472",
//   "lng": "121.499600",
//   "city": "臺北市",
//   "locality": "萬華區",
//   "activity_type": "健身",
//   "activity_content": "無聊的禮拜六一起去征服象山",
//   "activity_time": "2021-11-20T01:30:00.000Z",
//   "created_at": "2021-08-17T04:59:27.000Z",
//   "changed_at": "2021-10-19T05:21:44.000Z",
//   "valid": 1,
//   "activity_img": "workout.jpg",
//   "activity_people": 2,
//   "activity_title": "大家一起來運動吧"
// }

const MeetupCard = ({ card }) => {
  const {
    id,
    city,
    locality,
    activity_title,
    activity_type,
    activity_img,
    activity_time,
  } = card

  const targetCard = useRef()

  let typeIcon = ''
  // 根據類型不同給不同class
  switch (activity_type) {
    case '游泳':
      typeIcon = 'fas fa-swimmer'
      break
    case '跑步':
      typeIcon = 'fas fa-running'
      break
    case '爬山':
      typeIcon = 'fas fa-hiking'
      break
    case '健身':
      typeIcon = 'fas fa-dumbbell'
      break
    default:
      typeIcon = 'fas fa-child'
  }

  useEffect(() => {
    VanillaTilt.init(targetCard.current, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.8,
    })
  }, [])

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={`/meetup/list/${id}`} className="j-list-card" ref={targetCard}>
        {/* <!-- img box --> */}
        <div className="j-list-card__img-box">
          <img src={MEETUP_IMG_PATH + activity_img} alt="" />
        </div>
        {/* <!-- title --> */}
        <div className="j-list-card__info-box">
          <div className="j-list-card__title">{activity_title}</div>
          <div className="j-list-card__time">
            {moment(activity_time).format('ddd, MMM D, h:mm A')}
          </div>
          <div className="j-list-card__location">
            <i className="fas fa-map-marker-alt"></i>
            <div className="j-list-card__data">{`${city} ${locality}`}</div>
          </div>

          <div className="j-list-card__icon">
            <i className={typeIcon}></i>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MeetupCard
