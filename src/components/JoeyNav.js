import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import meme from './../pages/accounts/images/nyan-cat.gif'
import { c } from 'react-router-dom'

const JoeyNav = ({
  setShowLogin,
  setShowSignUp,
  // setShowJoeyLogin,
  user,
  setUser,
}) => {
  const history = useHistory()
  // 登出
  const SignOut = () => {
    // 清掉localStorage 資料
    localStorage.removeItem('member')
    localStorage.removeItem('token')
    // 將會員資料state 清掉
    setUser({
      login: false,
      member_sid: '', //會員ID
      avatar: '', //大頭貼路徑
      nickname: '', //會員的暱稱
    })
    Swal.fire({
      title: '您已成功登出',
      width: 400,
      icon: 'success',
      padding: '2em',
      background: '#fff url(/images/trees.png)',
      showConfirmButton: false,
      timer: 1500,
      backdrop: `
  rgba(0, 0, 0, 0.356)
    url("${meme}")
    left top
    no-repeat
  `,
    })
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* 首頁 */}
        <Link to="/" className="navbar-brand">
          HERE &#923;
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* 左邊 */}
          <ul className="navbar-nav mr-auto">
            {/* New Releases */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                New Releases
              </Link>
            </li>
            {/* Men */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Men
              </Link>
            </li>
            {/* Women */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Women
              </Link>
            </li>
            {/* Audio */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Audio
              </Link>
            </li>
            {/* Meetup */}
            <li className="nav-item">
              <Link className="nav-link" to="/meetup">
                Meetup
              </Link>
            </li>
            {/* Meetup */}
            <li className="nav-item">
              <Link className="nav-link" to="/meetup/create">
                Meetup Create
              </Link>
            </li>
            {/* DEMO */}
            <li className="nav-item">
              <Link className="nav-link" to="/demo">
                DEMO
              </Link>
            </li>
          </ul>

          {/* 右邊 */}
          <ul className="navbar-nav">
            {/* 三元判斷登入登出 */}
            {user.login ? (
              <>
                <li className="nav-item active">
                  {/* <div className="nav-link">{user.nickname}</div> */}
                  {/* 登入後點名子連到會員中心 */}
                  <Link
                    className="nav-link"
                    to={'/admin/user/profile/' + user.member_sid}
                  >
                    {user.nickname}
                  </Link>
                </li>
                <li
                  className="nav-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    SignOut()
                  }}
                >
                  <div className="nav-link">登出</div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active" style={{ cursor: 'pointer' }}>
                  <div className="nav-link" onClick={() => setShowSignUp(true)}>
                    註冊
                  </div>
                </li>
                <li
                  className="nav-item active"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowLogin(true)}
                >
                  {/* <Link className="nav-link" to="/login">登入</Link> */}
                  <div className="nav-link">登入</div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default JoeyNav
