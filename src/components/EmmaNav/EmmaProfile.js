import React, { useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AVATAR_PATH } from '../../config'
// import { useHistory } from 'react-router-dom'
import { Icon } from '@iconify/react'

const EmmaProfile = (props) => {
  const [showProfile, setShowProfile] = useState(false)
  const {
    user,
    setUser,
    setShowLogin,
    setShowSignUp,
    styleName,
    // isActive,
    setIsActive,
    navAvatar,
  } = props
  // const history = useHistory()
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
    // history.push('/')
  }
  return (
    <>
      {user.login ? (
        <>
          <NavDropdown
            title={
              <div className="emma-profile-img">
                <img
                  src={
                    navAvatar
                      ? AVATAR_PATH + navAvatar
                      : AVATAR_PATH + 'default-avatar.jpg'
                  }
                  alt=""
                />
              </div>
            }
            id="collasible-nav-dropdown"
            className={styleName}
            alignRight
            show={showProfile}
            onMouseEnter={() => {
              setShowProfile(true)
            }}
            onMouseLeave={() => {
              setShowProfile(false)
            }}
            onClick={() => {
              setShowProfile(false)
            }}
          >
            <NavDropdown.Item className="emma-remove-link-style">
              {user.nickname}
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={'/admin/user/profile/' + user.member_sid}
              onClick={() => setIsActive('個人資訊')}
            >
              個人資訊
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={'/admin/user/recipient/' + user.member_sid}
              onClick={() => setIsActive('收件資訊')}
            >
              訂購人資訊
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={'/admin/user/order/' + user.member_sid}
              onClick={() => setIsActive('歷史訂單')}
            >
              歷史訂單
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={'/admin/user/favorite/' + user.member_sid}
              onClick={() => setIsActive('追蹤清單')}
            >
              追蹤清單
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={'/admin/user/meetUp/' + user.member_sid}
              onClick={() => setIsActive('活動列表')}
            >
              Meet Up活動列表
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={'/admin/user/rank/' + user.member_sid}
              onClick={() => setIsActive('會員等級')}
            >
              會員等級
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item
              onClick={() => {
                SignOut()
              }}
            >
              會員登出
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          <NavDropdown
            title={<Icon icon="iconoir:profile-circled" width="23" />}
            id="collasible-nav-dropdown"
            className={styleName}
            alignRight
            show={showProfile}
            onMouseEnter={() => {
              setShowProfile(true)
            }}
            onMouseLeave={() => {
              setShowProfile(false)
            }}
          >
            <NavDropdown.Item onClick={() => setShowSignUp(true)}>
              會員註冊
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setShowLogin(true)}>
              會員登入
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </>
  )
}

export default EmmaProfile
