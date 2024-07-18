import './JoeyLogin.scss'
import { API_HOST } from '../../config'

const JoeyLogin = ({ showJoeyLogin, setShowJoeyLogin, setUser }) => {
  const closeJoeyLogin = () => setShowJoeyLogin(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const fd = new FormData(document.joeyLoginForm)

    fetch(API_HOST + '/members/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(fd).toString(),
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj)
        if (obj.success) {
          // NOTE 登入成功時 將初始畫面呈現需要的資料寫入localStorage 避免user refresh
          localStorage.setItem('token', obj.token)
          localStorage.setItem('member', JSON.stringify(obj.member)) // 儲存到 localStorage

          alert('登入成功')

          const { id, avatar, nickname } = obj.member

          // NOTE update user state
          setUser({
            login: true,
            member_sid: id, //會員ID
            avatar: avatar, //大頭貼路徑
            nickname: nickname, //會員的暱稱
          })
          console.log(obj)
          closeJoeyLogin()
        } else {
          alert('登入失敗\n' + (obj.error || ''))
        }
      })
  }

  return (
    <div
      className={`j-login ${showJoeyLogin ? '' : 'd-none'} `}
      onClick={closeJoeyLogin}
    >
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <div className="card-body">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeJoeyLogin}
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <h5 className="card-title">登入</h5>
          <form
            name="joeyLoginForm"
            onSubmit={onSubmitHandler}
            autoComplete="off"
          >
            <div className="form-group">
              <label htmlFor="account">帳號</label>
              <input
                type="text"
                className="form-control"
                id="account"
                name="account"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>

            <button type="submit" className="btn team-btn">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoeyLogin
