// import './MeetupOneModal.scss'
import { AVATAR_PATH } from '../../../config'
// NOTE 無功能 加入功能寫在Attend按鈕上
const MeetupOneJoinModal = ({ result, showJoinModal, setShowJoinModal }) => {
  const { nickname, avatar } = result[0]

  return (
    <div
      className={`j-modal-background ${showJoinModal ? '' : 'd-none'}`}
      onClick={() => setShowJoinModal(false)}
    >
      <div className="j-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close j-modal__close"
          aria-label="Close"
          onClick={() => setShowJoinModal(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {/* 大頭貼 */}
        <div className="j-modal__img-wrap">
          <img src={AVATAR_PATH + avatar} alt="" />
        </div>
        <div className="j-modal__title">我是舉辦人 {nickname}</div>
        <div className="j-modal__greet j-modal__greet--main">感謝您的加入</div>

        <div className="j-modal__greet">您可以隨時取消加入活動</div>

        <div>
          <button
            className="btn team-btn j-modal__btn"
            onClick={() => setShowJoinModal(false)}
          >
            確定
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetupOneJoinModal
