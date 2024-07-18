import moment from 'moment'
import { withRouter } from 'react-router-dom'

// 自定義
import joeyServer from '../joeyServer' //axios

const StickyBottomAttendBar = ({
  user,
  setShowLogin,
  result,
  setShowJoinModal,
  setShowCancelModal,
  location, // 'react-router-dom'
  setMeetupInfo, // 主資料
}) => {
  const {
    members_id,
    activity_type,
    activity_title,
    activity_time,
    activity_people,
    mainAttendee,
  } = result[0]

  const defCurVisitor = () => {
    // 1. 自己舉辦的活動
    if (user.member_sid === members_id) return '您的活動'

    // 2. 自己已參加 ps 參加判斷 必須優先於 已額滿
    if (mainAttendee.some((v) => v.id === user.member_sid)) return '已加入'

    // NOTE 1022 新增 已額滿 或 未登入
    if (mainAttendee.length === activity_people) return '已額滿'
    // 3. 自己未參加 或 未登入
    // return 'Attend'
    return '加入活動'
  }

  const onClickHandler = async () => {
    // NOTE 1022新增 當未登入 且已額滿時  取消跳出登入視窗
    if (!user.member_sid && mainAttendee.length === activity_people) return
    // 0. 未登入
    if (!user.member_sid) return setShowLogin(true)

    // 1. 自己舉辦的活動
    if (user.member_sid === members_id) return

    // 2. 自己已參加
    if (mainAttendee.some((v) => v.id === user.member_sid))
      return setShowCancelModal(true)

    // NOTE 1022 新增 已額滿 且並非自己舉辦 也尚未參加
    if (mainAttendee.length === activity_people) return

    // 3. 自己未參加: 新增資料庫
    await joeyServer.post(location.pathname, {
      members_id: user.member_sid,
    })

    // NOTE 1022 改成有沒有成功都會更新成最新版本 避免用戶開多分頁
    // 已交由後端來判斷
    const { data } = await joeyServer.get(location.pathname)
    setMeetupInfo(data)
    setShowJoinModal(true)
  }

  return (
    <div className="container-fluid position-sticky j-one-attend">
      <div className="container j-one-attend__wrap">
        <div className="j-one-attend__left">
          <div className="j-one-attend__time">
            {moment(activity_time).format('dddd, MMMM Do, YYYY')}
          </div>
          <div className="j-one-attend__info">
            <div>
              {activity_title}
              <span className="d-none d-md-inline">&nbsp;/&nbsp;</span>
            </div>
            <div>活動類別: {activity_type}</div>
          </div>
        </div>
        <button
          className="btn j-one-btn j-one-btn--bottom"
          onClick={onClickHandler}
        >
          {defCurVisitor()}
        </button>
      </div>
    </div>
  )
}

export default withRouter(StickyBottomAttendBar)
