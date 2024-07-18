import React from 'react'
import { withRouter } from 'react-router-dom'

class MeetupCreateModal extends React.Component {
  countRef = React.createRef()

  onClickHandler = () => {
    const { history, infoToModal } = this.props
    history.push('/meetup/list/' + infoToModal.id)
  }

  // NOTE 開發時搭配用
  // componentDidMount() {
  //   const { history, infoToModal } = this.props
  //   this.timer = setInterval(() => {
  //     const count = parseInt(this.countRef.current.innerText)

  //     if (count === 1) return history.push('/meetup/list/' + infoToModal.id)

  //     this.countRef.current.innerText = count - 1
  //   }, 1000)
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // 如果沒有ID就不需要刷新
    // 這樣就能確保唯一更新時 以創建好活動
    if (!nextProps.infoToModal.id) return false

    return true
  }

  componentDidUpdate() {
    const { history, infoToModal } = this.props
    this.timer = setInterval(() => {
      const count = parseInt(this.countRef.current.innerText)

      if (count === 1) return history.push('/meetup/list/' + infoToModal.id)

      this.countRef.current.innerText = count - 1
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    console.log('componentWillUnmount觸發 Modal資料重置')
  }

  render() {
    const { infoToModal } = this.props
    return (
      <div className={`j-modal-background ${infoToModal.show ? '' : 'd-none'}`}>
        <div
          className="j-modal j-modal--create"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="j-modal__title">活動舉辦成功</div>
          <div className="j-modal__greet j-modal__greet--main">
            預祝活動順利
          </div>

          <div className="j-modal__greet">
            {/* NOTE 想要幾秒就設幾秒 */}
            <span className="j-modal__count" ref={this.countRef}>
              5
            </span>
            秒後將跳轉至活動頁面
          </div>

          <div>
            <button
              className="btn team-btn j-modal__btn j-modal__btn--create"
              onClick={this.onClickHandler}
            >
              立即跳轉
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MeetupCreateModal)
