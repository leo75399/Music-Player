import moment from 'moment'
import { Link } from 'react-router-dom'
import { AVATAR_PATH } from '../../../config'

const RecommendCard = ({ result, history }) => {
  const {
    id,
    activity_title,
    activity_time,
    activity_type,
    city,
    locality,
    distance,
    recommendAttendee,
  } = result

  const distanceAdjust =
    distance >= 1000
      ? Math.round((distance / 1000) * 100) / 100 + ' 公里'
      : distance + ' 公尺'

  // 附近推薦活動內容判斷
  const renderedAttendeeAvatar = (recommendAttendee) => {
    const renderedUsed = recommendAttendee.slice(0, 3)
    const Avatar = renderedUsed.map((v) => (
      <img
        className="j-one-count__userImg"
        key={v.id}
        src={AVATAR_PATH + v.avatar}
        alt=""
      />
    ))

    const moreThanThreeCount =
      recommendAttendee.length > 3 ? `+${recommendAttendee.length - 3}` : ''

    return (
      <div className="j-one-count">
        <div className="j-one-count__users">{Avatar}</div>
        {/* <!-- NOTE 可有可無 根據情況判斷 --> */}
        <div className="j-one-count__plus">{moreThanThreeCount}</div>
      </div>
    )
  }

  // NOTE 注意 a > button 問題: 語意不合法
  // https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
  return (
    <div className="col-12 col-lg-4">
      {/* <!-- 卡片開始 --> */}
      <Link
        to={`/meetup/list/${id}`}
        className="j-one-recommend"
        // onClick={(e) => {
        //   console.log(e.target.dataset.action)
        //   if (e.target.dataset.action === 'attend') e.preventDefault()
        // }}
      >
        {/* <!-- time --> */}
        {/* <div className="j-one-recommend__time">TUE, SEP 7, 8:00 PM</div> */}
        <div className="j-one-recommend__time">
          {moment(activity_time).format('ddd, MMM D, h:mm A')}
        </div>

        {/* <!-- title --> */}
        <div className="j-one-recommend__title">{activity_title}</div>

        {/* <!-- location --> */}
        <div className="j-one-recommend__location">
          <i className="fas fa-map-marker-alt"></i>
          <div className="j-one-recommend__data">{city + ' ' + locality}</div>
        </div>

        {/* <!-- distance --> */}
        <div className="j-one-recommend__data">
          距離當前的活動: {distanceAdjust}
        </div>

        {/* <!-- type --> */}
        <div className="j-one-recommend__data">活動類別: {activity_type}</div>

        {/* <!-- userImg + btn --> */}
        <div className="j-one-recommend__count-wrap">
          {/* <!-- 計算人數 --> */}
          {renderedAttendeeAvatar(recommendAttendee)}
          {/* <!-- 結束計算人數 --> */}
          <div
            // data-action="attend"
            className="btn j-one-btn d-flex align-items-center"
          >
            加入活動
          </div>
        </div>
        {/* <!-- 卡片結束 --> */}
      </Link>
    </div>
  )
}

export default RecommendCard
