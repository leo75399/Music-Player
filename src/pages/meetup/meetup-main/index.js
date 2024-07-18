import { useState } from 'react'
import { Link } from 'react-router-dom'
import MeetupMainCarousel from './MeetupMainCarousel'

const MeetUpMain = ({ history }) => {
  const [type, setType] = useState('')
  const [place, setPlace] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const qs = new URLSearchParams()

    if (!type && !place) return history.push('/meetup/list')

    type && qs.append('type', type)
    place && qs.append('place', place)

    history.push('/meetup/list/?' + qs)
  }

  return (
    <>
      {/* <!-- start --> */}
      <div className="container-fluid">
        <div className="j-main-meetup">
          <div className="j-main-meetup__banner">DIVE IN!</div>
          <div className="j-main-meetup__banner">
            THERE IS SO MUCH FUN HERE ON
          </div>
          <h1 className="j-main-meetup__logo">MEETUP</h1>
        </div>
      </div>

      <MeetupMainCarousel />

      {/* <!-- center start --> */}
      {/* <!-- NOTE j-main-mb 控制最大margin bottom --> */}
      <div className="container j-main-mb j-main-mt">
        {/* <!-- banner --> */}
        <div className="j-main-banner">
          <h1 className="j-main-banner__title">WHAT'S MEET UP ?</h1>
          <div className="j-main-banner__sub">透過HERE.</div>
          <div className="j-main-banner__sub">
            在線上認識與你喜歡相同運動的好友吧！
          </div>
        </div>
        {/* <!-- act-box --> */}
        <div className="row">
          {/* <!-- 搜尋活動 --> */}
          <div className="col-12 col-sm-4">
            <Link to="/meetup/list" className="j-main-act-card">
              <div className="j-main-act-card__icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 4h5.5a6.85 6.85 0 0 0-.46 2H4v10h6v3.08L13.08 16H18v-2.77l2 2V16a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.19-.45.29-.7.29H9a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m11.5-2C18 2 20 4 20 6.5c0 .88-.25 1.7-.69 2.39l3.1 3.11L21 13.39l-3.11-3.08c-.69.44-1.51.69-2.39.69C13 11 11 9 11 6.5S13 2 15.5 2m0 2A2.5 2.5 0 0 0 13 6.5A2.5 2.5 0 0 0 15.5 9A2.5 2.5 0 0 0 18 6.5A2.5 2.5 0 0 0 15.5 4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="j-main-act-card__title">搜尋活動</div>
              <div className="j-main-act-card__content">
                透過搜尋喜歡的運動類別
              </div>
              <div className="j-main-act-card__content">
                找到志同道合的運動夥伴
              </div>
            </Link>
          </div>
          {/* <!-- 搜尋活動  end --> */}

          {/* <!-- 創建活動 --> */}
          <div className="col-12 col-sm-4">
            <Link to="/meetup/create" className="j-main-act-card">
              <div className="j-main-act-card__icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="j-main-act-card__title">創建活動</div>
              <div className="j-main-act-card__content">舉辦活動</div>
              <div className="j-main-act-card__content">邀請新朋友一起運動</div>
            </Link>
          </div>
          {/* <!-- 創建活動 end --> */}

          {/* <!-- 地圖活動 --> */}
          <div className="col-12 col-sm-4">
            <Link to="/meetup/join" className="j-main-act-card">
              <div className="j-main-act-card__icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2c3.31 0 6 2.66 6 5.95C18 12.41 12 19 12 19S6 12.41 6 7.95C6 4.66 8.69 2 12 2m0 4a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m8 13c0 2.21-3.58 4-8 4s-8-1.79-8-4c0-1.29 1.22-2.44 3.11-3.17l.64.91C6.67 17.19 6 17.81 6 18.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5c0-.69-.67-1.31-1.75-1.76l.64-.91C18.78 16.56 20 17.71 20 19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="j-main-act-card__title">地圖定位</div>
              <div className="j-main-act-card__content">
                透過地理位置看看附近
              </div>
              <div className="j-main-act-card__content">
                有哪些活動可以加入！
              </div>
            </Link>
          </div>
          {/* <!-- 地圖活動 end --> */}
        </div>

        {/* <!-- 加入 meetup btn --> */}
        <div className="d-flex justify-content-center ">
          <button
            className="btn team-btn j-main-btn j-main-btn--secondary"
            onClick={() => history.push('/meetup/list')}
          >
            加入 Meet Up
          </button>
        </div>
      </div>
      {/* <!-- center end end --> */}

      {/* <!-- search start --> */}
      {/* <!-- NOTE j-main-mb 控制最大margin bottom --> */}
      <div className="container j-main-mb">
        <div className="j-main-search-wrap">
          <form className="j-main-search" onSubmit={onSubmitHandler}>
            <h1 className="j-main-search__title">WHAT DO YOU WANT TO DO ?</h1>
            <div className="form-row j-main-search__input-row">
              <div className="col-12 col-md">
                <input
                  type="text"
                  className="form-control j-main-search__input"
                  placeholder="&#xf002;&nbsp;&nbsp;&nbsp;搜尋:健身"
                  value={type}
                  onChange={(e) => setType(e.target.value.trim())}
                />
              </div>
              <div className="col-12 col-md">
                <input
                  type="text"
                  className="form-control j-main-search__input"
                  placeholder="&#xf3c5;&nbsp;&nbsp;&nbsp;依據位置選擇"
                  value={place}
                  onChange={(e) => setPlace(e.target.value.trim())}
                />
              </div>
            </div>
            <div className="d-none d-lg-flex justify-content-center">
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list')}
              >
                認識新朋友
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list?type=健身')}
              >
                健身
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list?type=跑步')}
              >
                跑步
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list?type=爬山')}
              >
                爬山
              </button>
            </div>
            <div className="d-none d-lg-flex justify-content-center">
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/join')}
              >
                目前位置
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/join')}
              >
                附近活動
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list?type=游泳')}
              >
                游泳
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list?type=其他')}
              >
                線上聚會
              </button>
              <button
                type="button"
                className="btn j-main-tag-btn"
                onClick={() => history.push('/meetup/list?type=其他')}
              >
                在家運動
              </button>
            </div>
            <button className="btn team-btn j-main-btn">馬上搜尋</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default MeetUpMain
