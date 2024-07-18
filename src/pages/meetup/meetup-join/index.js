import { useState, useEffect, useRef } from 'react'

// import axios from 'axios'
import JoinGeoMap from './JoinGeoMap'

// 自定義
import joeyGeo from '../joeyGeo'
import joeyServer from '../joeyServer'

// 自定義 component
import MeetupSelection from './MeetupSelection' //條件設定
import MeetUpItem from './MeetUpItem' // 每個meetup活動

// TODO: 從URL抓初始值

const MeetUpJoin = ({ history, location }) => {
  const initQuery = new URLSearchParams(location.search)

  const [searchGeo, setSearchGeo] = useState({
    // lat: null, //從URL抓
    // lng: null, //從URL抓
    // type: '', //活動種類 預設不限制
    // time: 'unlimited', // 預設不限制
    // distance: 1500, //預設1.5公里
    // wayGetGeo: '',

    lat: initQuery.get('lat') || undefined, //從URL抓
    lng: initQuery.get('lng') || undefined, //從URL抓
    type: initQuery.get('type') || '', //活動種類 預設不限制
    time: initQuery.get('time') || 'unlimited', // 預設不限制
    distance: initQuery.get('distance') || '1500', //預設1.5公里
    wayGetGeo: initQuery.get('wayGetGeo') || 'byCurPlace',
  })
  const [meetup, setMeetup] = useState([])

  const [mobileShowSideBar, setMobileShowSideBar] = useState(true)

  // Ref
  const firstUpdate = useRef(true) //判斷是否為第一次
  const sideBar = useRef() // fix scrollToTop
  const firstUrl = useRef(true)
  const shouldPush = useRef(false)

  // render SideBar MeetupItem
  const renderSideBarMeetupItem = () => {
    if (!meetup.length)
      return (
        <div className="d-flex justify-content-center">
          <div>{`當前位置半徑${(searchGeo.distance / 1000).toFixed(
            1
          )}公里內並沒有活動呢`}</div>
        </div>
      )
    return meetup.map((v) => <MeetUpItem key={v.id} v={v} />)
  }

  useEffect(() => {
    // 第一次 didMount
    if (firstUpdate.current) {
      const getInitGeoAndMeetUp = async () => {
        firstUpdate.current = false

        const qs = new URLSearchParams()

        let searchLat
        let searchLng

        const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90

        const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180

        if (isLatitude(searchGeo.lat) && isLongitude(searchGeo.lng)) {
          searchLat = searchGeo.lat
          searchLng = searchGeo.lng
        } else {
          const { lat, lng } = await joeyGeo.getCurrentGeo()
          searchLat = lat
          searchLng = lng
        }

        qs.append('lat', searchLat)
        qs.append('lng', searchLng)
        qs.append('time', searchGeo.time)
        qs.append('distance', searchGeo.distance)

        const { data } = await joeyServer.get('/meetup/join?' + qs)

        setSearchGeo((prev) => ({
          ...prev,
          lat: searchLat,
          lng: searchLng,
          // wayGetGeo: 'byCurPlace',
        }))

        setMeetup(data.result)
      }
      getInitGeoAndMeetUp()
      return
    }

    // 第二次以後
    const getMeetUp = async () => {
      const qs = new URLSearchParams()
      qs.append('lat', searchGeo.lat)
      qs.append('lng', searchGeo.lng)
      qs.append('distance', searchGeo.distance)
      qs.append('time', searchGeo.time)
      qs.append('type', searchGeo.type)
      qs.append('wayGetGeo', searchGeo.wayGetGeo)
      const { data } = await joeyServer.get('/meetup/join?' + qs)

      if (firstUrl.current) {
        firstUrl.current = false
        // 第一次的直接取代 避免不符合標準的query
        history.replace('?' + qs)
        console.log('取代了一次')
      }

      if (!firstUrl.current && shouldPush.current) {
        history.push('?' + qs)
        console.log('push了一次')
      }
      shouldPush.current = true

      setMeetup(data.result)
    }

    getMeetUp()
    // 1015 更新時 side bar 重新捲回頂
    sideBar.current.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [searchGeo])

  useEffect(() => {
    if (firstUrl.current) return // 在第一次更新URL前 不往後處理 不然為空值

    // TODO: FIX 當用戶直接再次點的時候
    if (!location.search) {
      return console.log('沒有location search')
    }

    const initQuery = new URLSearchParams(location.search)
    const lat = initQuery.get('lat')
    const lng = initQuery.get('lng')
    const type = initQuery.get('type')
    const time = initQuery.get('time')
    const distance = initQuery.get('distance')
    const wayGetGeo = initQuery.get('wayGetGeo')

    if (
      +lat === searchGeo.lat &&
      +lng === searchGeo.lng &&
      type === searchGeo.type &&
      time === searchGeo.time &&
      distance === searchGeo.distance &&
      wayGetGeo === searchGeo.wayGetGeo
    )
      return
    shouldPush.current = false
    console.log('有進來')
    setSearchGeo({
      lat,
      lng,
      type,
      time,
      distance,
      wayGetGeo,
    })
    // eslint-disable-next-line
  }, [location.search])

  return (
    <div className="container-fluid">
      {/* <!-- NOTE 10/11 加入 overflow-hidden 讓 bar可以下滑 --> */}
      <div className="row position-relative overflow-hidden">
        {/* <!-- 手機板搜尋選單 --> */}
        <div className="w-100 d-flex d-lg-none j-join-select">
          <MeetupSelection searchGeo={searchGeo} setSearchGeo={setSearchGeo} />
        </div>
        {/* <!-- 手機板搜尋選單 end --> */}

        {/* <!-- sidebar start --> */}
        <div
          className={`col-lg-5 order-1 order-md-0 j-join-bar ${
            mobileShowSideBar ? '' : 'j-join-bar--mobile'
          }`}
        >
          {/* <!-- 內部 --> */}

          {/* <!-- 電腦版搜尋選單 --> */}
          <div className="w-100 j-join-select d-none d-lg-flex">
            <MeetupSelection
              searchGeo={searchGeo}
              setSearchGeo={setSearchGeo}
            />
          </div>
          {/* <!-- 搜尋選單 end--> */}

          {/* <!-- 開關 bar --> */}
          <div
            className="
              j-join-bar__toggle
              d-flex
              justify-content-center
              align-items-center
              d-lg-none
            "
            onClick={() => setMobileShowSideBar((prev) => !prev)}
          >
            <div></div>
          </div>
          {/* <!-- 資訊 box --> */}
          <div className="j-join-bar__info-wrap" ref={sideBar}>
            {/* MeetUp 開始 */}
            {/* FIX TODO: scrollToTop */}
            {renderSideBarMeetupItem()}
          </div>
          {/* <!-- 資訊 end --> */}
        </div>
        {/* <!-- sidebar end --> */}

        {/* <!-- map start --> */}
        {/* <!-- NOTE 10/11 有加入px-0 讓兩邊貼齊 --> */}

        <div className="col-12 col-lg order-0 order-md-1 j-join-map px-0 d-flex justify-content-center align-items-center">
          {!firstUpdate.current ? (
            <JoinGeoMap
              searchGeo={searchGeo}
              setSearchGeo={setSearchGeo}
              meetup={meetup}
              wayGetGeo={searchGeo.wayGetGeo}
              // individual
              lat={searchGeo.lat}
              lng={searchGeo.lng}
              distance={searchGeo.distance}
            />
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-border team-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
        {/* <!-- map end --> */}
      </div>
    </div>
  )
}

export default MeetUpJoin
