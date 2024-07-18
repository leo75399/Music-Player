import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom'
// import axios from 'axios'
import { Icon } from '@iconify/react'
// 子頁面區域元件
import UserProfile from './../UserProfile/UserProfile'
import UserRecipient from './../UserRecipient/UserRecipient'
import UserOrder from './../UserOrder/UserOrder'
import UserFavorite from './../UserFavorite/UserFavorite'
import UserMeetUp from './../UserMeetUp/UserMeetUp'
import UserMeetUpJoin from './../UserMeetUp/UserMeetUpJoin'
import UserRank from './../UserRank/UserRank'
import OrderDetail from './../OrderDetail/OrderDetail'
// import PhoneOrder from './../OrderDetail/PhoneOrder'

import { API_HOST } from './../../../config'
import { IMG_PATH } from './../../../config'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'

import styles from './UserAdminIndex.module.scss'
// import Avatar from './../images/IMG_0001.jpeg'
import classnames from 'classnames'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'

function UserAdminIndex(props) {
  const { id } = useParams()
  // console.log(props)
  const {
    user,
    setRefresh,
    isActive,
    setIsActive,
    setVertifyEmail,
    emailInVertify,
    setEmailInVertify,
    setNavAvatar,
  } = props
  let [imgSrc, setImgSrc] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  let [color] = useState('#e88239')
  let [loading] = useState(true)
  const [showAvatar, setShowAvatar] = useState('')
  // const [showNickname, setShowNicknam] = useState('')

  const history = useHistory()

  // const [isActive, setIsActive] = useState('個人資訊')
  const [showMoney, setShowMoney] = useState(0)
  const [showRank, setShowRank] = useState('')
  // const [pushPage, setPushPage] = useState({
  //   page: 1,
  // })
  // fetch大頭貼
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        // !user.login && history.push('/')
        getRank(id)
        // let r = await axios.post(API_HOST + '/admin/user/rank/' + id)
        // // console.log(r.data.count)
        // setShowMoney(r.data.count)
        // setTimeout(() => {
        getMember(id)
        // console.log('hi')
        // }, 1000)
      })()
      if (showMoney <= 2100) {
        setShowRank('一般會員')
      } else if (showMoney <= 4200) {
        setShowRank('白銀會員')
      } else if (showMoney <= 6600) {
        setShowRank('黃金會員')
      } else if (showMoney <= 15000) {
        setShowRank('鑽石會員')
      } else {
        setShowRank('至尊會員')
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => {
        clearTimeout()
        setIsLoading('')
        setShowRank('')
      }
    } else {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, showMoney, imgSrc, showAvatar])

  async function getRank(id) {
    await fetch(API_HOST + '/admin/user/rank/' + id, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          setShowMoney(obj.count)
        } else {
          history.push('/')
          console.log(obj.error)
        }
      })
  }

  async function getMember(id) {
    await fetch(API_HOST + '/members/profile/edit/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          setImgSrc(obj.result.avatar)
          // setNavAvatar({ ...showAvatar, avatar: obj.result.avatar })
        } else {
          history.push('/')
          console.log(obj.error)
        }
      })
  }

  // const id = (user.member_sid)
  // 假設使用 http://localhost:3000/admin/user/order/?order_id=3
  // const searchParams = new URLSearchParams(props.location.search)
  // const order_id = searchParams.get('order_id')
  // console.log(order_id)

  // 網址參數對應頁面區塊元件
  // 屬性 = 網址上的task參數 props.match.params.task
  const tasks = {
    profile: UserProfile,
    recipient: UserRecipient,
    order: UserOrder,
    favorite: UserFavorite,
    meetUp: UserMeetUp,
    rank: UserRank,
    detail: OrderDetail,
    MeetUpJoin: UserMeetUpJoin,
    // id: id,
  }

  // 自訂元件需要大寫
  // 動態元件jsx標記的語法
  // 預設出現的文字元件
  // () => <>會員管理區域</>
  const Component = props.match.params.task
    ? tasks[props.match.params.task]
    : () => <>會員管理區域</>

  const display = (
    <div className={classnames(styles.circle)}>
      <div className={classnames(styles.emmaDotOrange)}></div>
      <div className={classnames(styles.emmaDotGreen)}></div>

      <div
        className={classnames(
          'container',
          'd-flex',
          'justify-content-center',
          styles.containerSection,
          'team-min-height'
        )}
      >
        <div
          className={classnames(
            // 'd-none',
            // 'd-lg-block',
            'd-lg-flex',
            'row',
            styles.center_section
          )}
        >
          <div className={classnames(styles.slide_bar, 'd-none', 'd-lg-block')}>
            <h3 className="ml-3">我的帳戶</h3>
            <p className="ml-3">MY ACCOUNT</p>
            <div className="p-2">
              <img
                className={classnames(styles.avatar, 'rounded-circle', 'my-4')}
                src={
                  imgSrc
                    ? IMG_PATH + '/' + showAvatar.avatar
                    : IMG_PATH + '/default-avatar.jpg'
                }
                alt=""
              />
              <p className={classnames(styles.nickname, 'mx-3')}>
                您好
                <span className={classnames(styles.nickname, 'mx-2')}>
                  {showAvatar.nickname}
                </span>
              </p>
              {/* {showMoney} */}
              <p>
                {/* <Icon icon="bi:bookmark-heart" /> */}
                {/* <i className="fas fa-medal"></i> */}
                <span className={classnames(styles.metals, 'ml-3')}>
                  {showRank}
                </span>
              </p>
            </div>
            <ul
              className={classnames(
                'd-flex flex-column justify-content-around',
                styles.slide_bar_ul,
                'ml-3'
              )}
            >
              {/* <li className={classnames(styles.slide_bar_li)}>我的帳戶</li> */}
              <li className={classnames(styles.slide_bar_li)}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '個人資訊' && styles.active
                  )}
                  // to="/admin/user/profile"
                  to={'/admin/user/profile/' + user.member_sid}
                  onClick={() => setIsActive('個人資訊')}
                  // user={user}
                  // setUser={setUser}
                >
                  個人資訊
                </Link>
              </li>
              <li className={classnames(styles.slide_bar_li)}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '收件資訊' && styles.active
                  )}
                  to={'/admin/user/recipient/' + user.member_sid}
                  onClick={() => setIsActive('收件資訊')}
                >
                  訂購人資訊
                </Link>
              </li>
              <li className={classnames(styles.slide_bar_li)}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '歷史訂單' && styles.active
                  )}
                  to={'/admin/user/order/' + user.member_sid}
                  // to={'/admin/user/order/' + user.member_sid + `?page=${pushPage.page}`}

                  // to={'/admin/user/order/' + '34436' + '?page=1'}
                  onClick={() => setIsActive('歷史訂單')}
                >
                  歷史訂單
                </Link>
              </li>
              <li className={classnames(styles.slide_bar_li)}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '追蹤清單' && styles.active
                  )}
                  to={'/admin/user/favorite/' + user.member_sid}
                  onClick={() => setIsActive('追蹤清單')}
                >
                  追蹤清單
                </Link>
              </li>
              <li className={classnames(styles.slide_bar_li)}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '活動列表' && styles.active
                  )}
                  to={'/admin/user/meetUp/' + user.member_sid}
                  onClick={() => setIsActive('活動列表')}
                >
                  Meet Up 活動列表
                </Link>
              </li>
              {/* <li className={classnames(styles.slide_bar_li,'')}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '活動列表' && styles.active
                  )}
                  to={'/admin/user/meetUp/join/' + user.member_sid}
                  onClick={() => setIsActive('活動列表')}
                >
                  Meet Up 活動列表
                </Link>
              </li> */}
              <li className={classnames(styles.slide_bar_li)}>
                <Link
                  className={classnames(
                    styles.slide_bar_color,
                    isActive === '會員等級' && styles.active
                  )}
                  to={'/admin/user/rank/' + user.member_sid}
                  onClick={() => setIsActive('會員等級')}
                >
                  會員等級
                </Link>
              </li>
            </ul>
          </div>
          {/* 手機版 */}
          <div className={classnames(styles.phoneSection, 'd-lg-none')}>
            <div className="d-block d-lg-none d-flex justify-content-around align-items-center ">
              <img
                className={classnames(
                  styles.phoneAvatar,
                  'rounded-circle',
                  'my-4'
                )}
                src={
                  imgSrc
                    ? IMG_PATH + '/' + showAvatar.avatar
                    : IMG_PATH + '/default-avatar.jpg'
                }
                alt=""
              />
              <div className={classnames('ml-4')}>
                <p className={classnames(styles.nickname)}>
                  您好
                  <span className={classnames(styles.nickname, 'ml-2')}>
                    {showAvatar.nickname}
                  </span>
                </p>
                {/* {showMoney} */}
                <p>
                  {/* <i className="fas fa-medal"></i> */}
                  <span className={classnames(styles.metals)}>{showRank}</span>
                </p>
              </div>
            </div>
            {/* 控制板 */}
            <div className={classnames(styles.phone_slide_bar)}>
              <div className={classnames(styles.phone_slide_bar_left, 'col')}>
                <div
                  className={classnames(
                    'd-flex',
                    'flex-column',
                    'align-items-center',
                    'mt-3'
                  )}
                >
                  <Icon icon="gg:profile" />
                  {/* <p className={classnames('my-2')}>個人資訊</p> */}
                  <Link
                    className={classnames(
                      styles.slide_bar_color,
                      'my-2',
                      isActive === '個人資訊' && styles.active
                    )}
                    // to="/admin/user/profile"
                    to={'/admin/user/profile/' + user.member_sid}
                    onClick={() => setIsActive('個人資訊')}
                    // user={user}
                    // setUser={setUser}
                  >
                    個人資訊
                  </Link>
                </div>
                <div
                  className={classnames(
                    'd-flex',
                    'flex-column',
                    'align-items-center',
                    'mt-4'
                  )}
                >
                  <Icon icon="ci:heart-fill" />
                  {/* <p className={classnames('my-1')}>追蹤清單</p> */}
                  <Link
                    className={classnames(
                      styles.slide_bar_color,
                      'my-2',
                      isActive === '追蹤清單' && styles.active
                    )}
                    to={'/admin/user/favorite/' + user.member_sid}
                    onClick={() => setIsActive('追蹤清單')}
                  >
                    追蹤清單
                  </Link>
                </div>
              </div>
              <div className={classnames(styles.phone_slide_bar_center, 'col')}>
                <div
                  className={classnames(
                    'd-flex',
                    'flex-column',
                    'align-items-center',
                    'mt-3'
                  )}
                >
                  <Icon icon="icon-park-outline:transaction-order" />
                  {/* <p className={classnames('my-1')}>歷史訂單</p> */}
                  <Link
                    className={classnames(
                      styles.slide_bar_color,
                      'my-2',
                      isActive === '歷史訂單' && styles.active
                    )}
                    to={'/admin/user/order/' + user.member_sid}
                    // to={'/admin/user/order/' + '34436' + '?page=1'}

                    onClick={() => setIsActive('歷史訂單')}
                  >
                    歷史訂單
                  </Link>
                </div>
                <div
                  className={classnames(
                    'd-flex',
                    'flex-column',
                    'align-items-center',
                    'mt-4'
                  )}
                >
                  <Icon icon="carbon:user-profile" />
                  {/* <p className={classnames('my-1')}>訂購人資訊</p> */}
                  <Link
                    className={classnames(
                      styles.slide_bar_color,
                      'my-2',
                      isActive === '收件資訊' && styles.active
                    )}
                    to={'/admin/user/recipient/' + user.member_sid}
                    onClick={() => setIsActive('收件資訊')}
                  >
                    訂購人資訊
                  </Link>
                </div>
              </div>
              <div className={classnames(styles.phone_slide_bar_right, 'col')}>
                <div
                  className={classnames(
                    'd-flex',
                    'flex-column',
                    'align-items-center',
                    'mt-3'
                  )}
                >
                  <Icon icon="icon-park:play-basketball" />
                  {/* <p className={classnames('my-1')}>活動列表</p> */}
                  <Link
                    className={classnames(
                      styles.slide_bar_color,
                      'my-2',
                      isActive === '活動列表' && styles.active
                    )}
                    to={'/admin/user/meetUp/' + user.member_sid}
                    onClick={() => setIsActive('活動列表')}
                  >
                    活動列表
                  </Link>
                </div>
                <div
                  className={classnames(
                    'd-flex',
                    'flex-column',
                    'align-items-center',
                    'mt-4'
                  )}
                >
                  <Icon icon="akar-icons:star" />
                  {/* <p className={classnames('my-1')}>會員等級</p> */}
                  <Link
                    className={classnames(
                      styles.slide_bar_color,
                      'my-2',
                      isActive === '會員等級' && styles.active
                    )}
                    to={'/admin/user/rank/' + user.member_sid}
                    onClick={() => setIsActive('會員等級')}
                  >
                    會員等級
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* 子頁面 */}
          <div className="">
            <Component
              isActive={isActive}
              setIsActive={setIsActive}
              showAvatar={showAvatar}
              setShowAvatar={setShowAvatar}
              setRefresh={setRefresh}
              user={user}
              showMoney={showMoney}
              setShowMoney={setShowMoney}
              setVertifyEmail={setVertifyEmail}
              emailInVertify={emailInVertify}
              setEmailInVertify={setEmailInVertify}
              setNavAvatar={setNavAvatar}
              // pushPage={pushPage}
              // setPushPage={setPushPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `
  const spinner = (
    <div
      className={classnames(
        styles.profile_top,
        'd-flex',
        'justify-content-between',
        'pt-5',
        'team-min-height'
      )}
    >
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
  return <>{isLoading ? spinner : display}</>
}

export default withRouter(UserAdminIndex)
