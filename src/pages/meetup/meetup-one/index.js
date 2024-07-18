import { useState, useEffect, useRef } from 'react'
import moment from 'moment'

// 自定義
import joeyServer from '../joeyServer' //axios
import AttendeeCard from './AttendeeCard'
import RecommendCard from './RecommendCard'
import StickyBottomAttendBar from './StickyBottomAttendBar'
import MeetupOneSpinner from './MeetupOneSpinner'
import MeetupOneNotFound from './MeetupOneNotFound'
import MeetupOneMap from './MeetupOneMap'
import { AVATAR_PATH, MEETUP_IMG_PATH } from '../../../config'

// attend modal
import MeetupOneJoinModal from './MeetupOneJoinModal'
import MeetupOneCancelModal from './MeetupOneCancelModal'

const MeetUpOne = ({ location, user, setShowLogin }) => {
  const [meetupInfo, setMeetupInfo] = useState({})
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  // Ref
  const firstUpdate = useRef(true) //判斷是否為第一次
  const getMeetupDate = useRef(false) //判斷是否成功取得資料

  useEffect(() => {
    const getMeetupInfo = async () => {
      const { data } = await joeyServer.get(location.pathname)
      console.log(data)
      firstUpdate.current = false
      if (data.success) {
        getMeetupDate.current = true //是否為有效資料
      }
      setMeetupInfo(data)
    }
    getMeetupInfo()
  }, [location])

  const renderedMeetupOne = () => {
    const { result, recommendResult } = meetupInfo
    return (
      <>
        {/*  title banner */}
        <div className="container mt-4 mt-md-5">
          <div className="row">
            <div className="col-12">
              <div className="j-one-banner">
                <div className="j-one-banner__time">
                  {moment(result[0].activity_time).format(
                    'dddd, MMMM Do, YYYY'
                  )}
                </div>
                <div className="j-one-banner__title">
                  {result[0].activity_title}
                </div>
                <div className="j-one-user d-none d-lg-flex">
                  <div className="j-one-user__img-box">
                    <img src={AVATAR_PATH + result[0].avatar} alt="" />
                  </div>
                  <div className="j-one-user__username">
                    Host by {result[0].nickname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row">
            {/* <!-- NOTE 左邊詳細資料 --> */}
            <div className="order-1 order-lg-0 col-12 col-lg-8">
              {/* <!-- 詳細資料 --> */}
              <div className="j-one-meetup-wrap">
                {/* <!-- 活動照片 --> */}
                <div className="j-one-meetup-wrap__img-box">
                  <img src={MEETUP_IMG_PATH + result[0].activity_img} alt="" />
                </div>

                {/* <!-- 活動內容 --> */}
                <div className="j-one-section">
                  {/* <!-- 活動內容 標題+類別 --> */}
                  <div className="j-one-section__title-wrap">
                    <div className="j-one-section__content">活動內容</div>
                    <div className="j-one-section__type">
                      類別: {result[0].activity_type}
                    </div>
                  </div>

                  {/* <!-- 活動內容 --> */}
                  <p className="j-one-section__paragraph">
                    {result[0].activity_content}
                  </p>
                </div>

                {/* <!-- 參加者 --> */}
                <div className="j-one-section">
                  {/* <!-- 活動內容 標題 --> */}
                  <div className="j-one-section__title-wrap">
                    <div className="j-one-section__content">
                      參加者 ({result[0].mainAttendee.length}/
                      {result[0].activity_people})
                    </div>
                  </div>

                  {/* <!-- 參加者外框 --> */}
                  {/* <!-- px-3 稍微壓一點進去 比較好看 --> */}
                  <div className="row j-one-section__attendee-wrap">
                    {/* NOTE  AttendeeCard start */}

                    {result[0].mainAttendee.map((attendee) => (
                      <AttendeeCard
                        key={attendee.id}
                        nickname={attendee.nickname}
                        avatar={AVATAR_PATH + attendee.avatar}
                        hosted={attendee.hosted}
                      />
                    ))}
                    {/* NOTE  AttendeeCard end */}
                  </div>
                </div>
                {/* <!-- meetup end --> */}
              </div>
            </div>

            {/* <!-- NOTE 右邊 side bar --> */}
            <div
              className="
            order-0 order-lg-1
            col-12 col-lg-4
            position-relative
          "
            >
              <div className="j-one-side position-sticky">
                {/* <!-- 使用者照片 + 名字 --> */}
                <div className="j-one-user">
                  <div className="j-one-user__img-box">
                    <img src={AVATAR_PATH + result[0].avatar} alt="" />
                  </div>
                  <div className="j-one-user__username">
                    Host by {result[0].nickname}
                  </div>
                </div>

                <div className="j-one-side__info-wrap">
                  {/* <!-- 舉辦日期 --> */}
                  <div className="j-one-side__data-box">
                    <i className="far fa-calendar"></i>
                    <div>
                      {moment(result[0].activity_time).format('dddd, MMMM Do')}
                    </div>
                  </div>
                  {/* <!-- 舉辦時間 --> */}
                  <div className="j-one-side__data-box">
                    <i className="far fa-clock"></i>
                    <div>
                      {moment(result[0].activity_time).format('h:mm A')}
                    </div>
                  </div>
                  {/* <!-- 活動地點 --> */}
                  <div className="j-one-side__data-box">
                    <i className="fas fa-map-marker-alt fix-2"></i>
                    <div>{result[0].city + ' ' + result[0].locality}</div>
                  </div>
                </div>
                {/* <!-- 地圖 --> */}
                <div className="j-one-side__map">
                  {/* <div className="bg-danger w-100 h-100">map</div> */}
                  <MeetupOneMap lat={result[0].lat} lng={result[0].lng} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // <!-- 更多推薦內容  --> */}
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="j-one-section">
                {/* <!-- 活動內容 標題+類別 --> */}
                <div className="j-one-section__title-wrap">
                  <div className="j-one-section__content">更多附近推薦活動</div>
                </div>

                {/* <!-- 推薦活動外框 --> */}
                <div className="row">
                  {/* NOTE RecommendCard start*/}
                  {recommendResult.map((result) => (
                    <RecommendCard key={result.id} result={result} />
                  ))}
                  {/*RecommendCard end */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!--sticky attend bar --> */}
        <StickyBottomAttendBar
          user={user}
          setShowLogin={setShowLogin}
          result={result}
          setShowJoinModal={setShowJoinModal}
          setShowCancelModal={setShowCancelModal}
          setMeetupInfo={setMeetupInfo} //主資料
        />
        {/* <!--sticky attend bar end --> */}

        {/* test modal*/}
        <MeetupOneJoinModal
          result={result}
          showJoinModal={showJoinModal}
          setShowJoinModal={setShowJoinModal}
        />
        <MeetupOneCancelModal
          user={user}
          result={result}
          showCancelModal={showCancelModal}
          setShowCancelModal={setShowCancelModal}
          setMeetupInfo={setMeetupInfo} //主資料
        />
        {/* test modal end */}
      </>
    )
  }
  return (
    <>
      {firstUpdate.current && <MeetupOneSpinner />}
      {!firstUpdate.current && !getMeetupDate.current && <MeetupOneNotFound />}
      {!firstUpdate.current && getMeetupDate.current && renderedMeetupOne()}
    </>
  )
}

export default MeetUpOne
