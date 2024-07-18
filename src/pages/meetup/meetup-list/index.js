import { useEffect, useState, useRef } from 'react'

import MeetupCloud from './MeetupCloud'
import MeetupWord from './MeetupWord'
import MeetupCard from './MeetupCard'

import MeetupListNotFound from './MeetupListNotFound'
// spinner
import MeetupSpinnerModal from './MeetupSpinnerModal' // for query search
import MeetupLoadSpinner from './MeetupLoadSpinner' // for infinite scrolling

import CheckMore from './CheckMore'
import ScrollToTop from './ScrollToTop'

// 自定義
import joeyServer from '../joeyServer' //axios
import { joeyWait } from '../joeyHelper'

// TODO:
// 1. list 地圖 btn
// 2. list scroll to top
// 3. list spinner
// 4. list last page - done (kinda) should change to location core

const MeetUpList = ({ history, location }) => {
  const initQuery = new URLSearchParams(location.search)

  const [meetupList, setMeetupList] = useState([])
  const [listIndex, setListIndex] = useState(9)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showSearchSpinner, setShowSearchSpinner] = useState(true)

  const [type, setType] = useState(initQuery.get('type') || '')
  const [place, setPlace] = useState(initQuery.get('place') || '')

  // Ref
  const firstUpdate = useRef(true) //判斷是否為第一次
  const getMeetupList = useRef(false) //判斷是否成功取得資料

  const shouldPush = useRef(false)

  // const typeRef = useRef()
  // const placeRef = useRef()

  const observer = useRef() // IntersectionObserver
  const observerPointer = useRef() // target track DOM

  useEffect(() => {
    const getListData = async () => {
      // blur
      // typeRef.current.blur()
      // placeRef.current.blur()

      const qs = new URLSearchParams()
      type && qs.append('type', type)
      place && qs.append('place', place)

      const { data } = await joeyServer.get('/meetup/list?' + qs)

      // if (
      //   !(
      //     firstUpdate.current &&
      //     (initQuery.get('type') || initQuery.get('place'))
      //   )
      // ) {
      //   history.replace('?' + qs)
      // }

      !firstUpdate.current && shouldPush.current && history.push('?' + qs)
      !firstUpdate.current && shouldPush.current && console.log('push了一次')

      console.log(data)

      // TODO: 改成 location 為主 fetch 資料 不然現在這個只是剛好而已
      // fake loading start 且這樣可以讓location hook先執行
      setShowSearchSpinner(true)
      await joeyWait(1) // 1000ms
      setShowSearchSpinner(false)
      // fake loading end

      firstUpdate.current = false

      getMeetupList.current = data.success //是否為有效資料

      shouldPush.current = true

      console.log('中間')

      setMeetupList(data.result)
      setListIndex(9) // reset 並且只顯示前九筆
    }

    // Search Debouncing
    const timerId = setTimeout(() => {
      getListData()
    }, 1000)

    return () => clearTimeout(timerId)

    // eslint-disable-next-line
  }, [type, place])

  useEffect(() => {
    // 因為第一次跑spinner 所以追蹤不到
    if (!observerPointer.current) return

    console.log('listIndex', listIndex)
    console.log('meetupList.length', meetupList.length)

    // 如果有的話先取消追蹤 之後再重新追蹤
    // 不然一個閉包的資料未更新 同時確保只有 observer 一個在跑
    observer.current?.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        // console.log(entries)

        if (entries[0].isIntersecting && meetupList.length > listIndex) {
          setShowSpinner(true)
          setTimeout(() => {
            setShowSpinner(false)
            setListIndex((prev) => prev + 9)
          }, 500)
        }
      },
      { threshold: 0.6 }
    )

    // 建立連結
    observer.current.observe(observerPointer.current)
  }, [meetupList, listIndex])

  useEffect(() => {
    const initQuery = new URLSearchParams(location.search)

    // 有  Debouncing 因此不會連續fetch 不用擔心
    setType(initQuery.get('type') || '')
    setPlace(initQuery.get('place') || '')

    console.log('location change')

    shouldPush.current = false
  }, [location])

  const renderedMeetupList = () =>
    meetupList
      .slice(0, listIndex)
      .map((card) => <MeetupCard key={card.id} card={card} />)

  return (
    <>
      <div className="j-list-wrapper">
        {/* Effect start */}
        {/* 改成無結果時 避免太空 所以加上特效 */}
        {!firstUpdate.current && !getMeetupList.current && (
          <>
            <MeetupCloud />
            <MeetupWord />
          </>
        )}
        {/* Effect end */}

        {/* <!-- search start --> */}
        <div className="container">
          <div className="j-list-search">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <input
                  type="text"
                  className="form-control j-list-search__input"
                  placeholder="&#xf002;&nbsp;&nbsp;&nbsp;搜尋:健身"
                  value={type}
                  onChange={(e) => setType(e.target.value.trim())}
                  // ref={typeRef}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <input
                  type="text"
                  className="form-control j-list-search__input"
                  placeholder="&#xf3c5;&nbsp;&nbsp;&nbsp;依據位置選擇"
                  value={place}
                  onChange={(e) => setPlace(e.target.value.trim())}
                  // ref={placeRef}
                />
              </div>

              <div className="col-12  col-lg-4">
                <div className="j-list-map">
                  <button
                    className="btn team-btn w-50"
                    onClick={() => history.push('/meetup/join')}
                  >
                    <i className="fas fa-map-marked-alt"></i>
                    &nbsp;&nbsp;以地圖定位
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- search end --> */}

        {/* <!-- search result card start --> */}
        <div className="container">
          <div className="row">
            {/* query search spinner */}
            {showSearchSpinner && <MeetupSpinnerModal />}

            {/* Not Found */}
            {!firstUpdate.current && !getMeetupList.current && (
              <MeetupListNotFound />
            )}

            {/* Rendered List */}
            {!firstUpdate.current &&
              getMeetupList.current &&
              renderedMeetupList()}
          </div>

          {/* infinite scrolling */}
          {!firstUpdate.current && getMeetupList.current && (
            <div
              className="text-center"
              ref={observerPointer}
              style={{
                fontSize: '30px',
                fontWeight: '600',
                height: '300px',
                color: '#5B5B5B',
              }}
            >
              <div>
                {meetupList.length > listIndex ? <CheckMore /> : '到底啦~'}
              </div>
              {meetupList.length > listIndex && showSpinner && (
                <MeetupLoadSpinner />
              )}
            </div>
          )}
        </div>

        <ScrollToTop />
      </div>
    </>
  )
}

export default MeetUpList
