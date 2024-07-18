// import './MeetupOneModal.scss'
import { AVATAR_PATH } from '../../../config'
import { withRouter } from 'react-router-dom'

// 自定義
import joeyServer from '../joeyServer' //axios

const MeetupOneCancelModal = ({
  user,
  result,
  showCancelModal,
  setShowCancelModal,
  location, // 'react-router-dom'
  setMeetupInfo, // 主資料
}) => {
  const { nickname, avatar } = result[0]

  const onClickCancelHandler = async () => {
    await joeyServer.delete(location.pathname, {
      data: {
        members_id: user.member_sid,
      },
    })

    // NOTE 1022 改成有沒有成功都會更新成最新版本 避免用戶開多分頁
    // 已交由後端來判斷
    const { data } = await joeyServer.get(location.pathname)
    setMeetupInfo(data)
    setShowCancelModal(false)
  }

  return (
    <div
      className={`j-modal-background ${showCancelModal ? '' : 'd-none'}`}
      onClick={() => setShowCancelModal(false)}
    >
      <div className="j-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close j-modal__close"
          aria-label="Close"
          onClick={() => setShowCancelModal(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {/* 大頭貼 */}
        <div className="j-modal__img-wrap">
          <img src={AVATAR_PATH + avatar} alt="" />
        </div>
        <div className="j-modal__title">我是舉辦人 {nickname}</div>
        <div className="j-modal__greet j-modal__greet--main">
          請問是否取消加入活動?
        </div>

        <div className="j-modal__greet">您可以隨時取消加入活動</div>

        <div>
          <button
            className="btn team-btn j-modal__btn"
            // TODO: axios
            onClick={onClickCancelHandler}
          >
            確定取消
          </button>
          <button
            className="btn team-btn j-modal__btn j-modal__btn--no"
            onClick={() => setShowCancelModal(false)}
          >
            不做變更
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(MeetupOneCancelModal)
