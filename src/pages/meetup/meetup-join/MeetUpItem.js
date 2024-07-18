import { Link } from 'react-router-dom'
import { MEETUP_IMG_PATH } from '../../../config'
import moment from 'moment'
// https://momentjs.com/
// https://momentjs.com/docs/#/displaying/calendar-time/

const MeetUpItem = ({ v }) => {
  const {
    id,
    city,
    locality,
    activity_title,
    activity_type,
    activity_img,
    activity_time,
    distance,
  } = v

  // 避免用中文當key可能會出錯 因此這邊用switch 因為activity_type的值是中文
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

  const meetupDistance =
    distance >= 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance}m`

  return (
    <Link to={`/meetup/list/${id}`} className="j-join-meetup">
      {/* <!-- 上方圖片 --> */}
      <div className="j-join-meetup__img-box">
        <img src={MEETUP_IMG_PATH + activity_img} alt="" />
      </div>
      {/* <!-- 下方資訊欄 --> */}
      <div className="j-join-meetup__info">
        {/* <!-- 時間 --> */}
        <div className="d-flex justify-content-between">
          <div>{moment(activity_time).format('ddd, MMM D, h:mm A')}</div>
          <div className="j-join-meetup__distance">{meetupDistance}</div>
        </div>
        {/* <!-- 標題 --> */}
        <div className="j-join-meetup__info--title">{activity_title}</div>
        {/* <!-- 地址 + 活動類別 --> */}
        <div className="d-flex justify-content-between">
          {/* <!-- 地址 --> */}
          <div>
            <i className="fas fa-map-marker-alt"></i> {`${city} ${locality}`}
          </div>
          {/* <!-- 活動類別 --> */}
          <div>
            <i className={`${typeIcon} j-join-meetup__info--title`}></i>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MeetUpItem
