import React, { useState, useRef, useEffect } from 'react'
// import './MeetupCreate.scss'
import CreateFormMap from './CreateFormMap'
import MeetupCreateModal from './MeetupCreateModal'

import exifr from 'exifr'

// 自定義
import joeyGeo from '../joeyGeo'

// 後端
import joeyServer from '../joeyServer'

// 時間驗證與給預設值使用
const setTimeDefault = () => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset() + 120)
  return now.toISOString().slice(0, 16)
}

const MeetupCreate = ({ history, user, setShowLogin }) => {
  // 活動封面 FIX init state
  const [actImg, setActImg] = useState('')

  // 活動標題
  const [actTitle, setActTitle] = useState('')
  // 活動類別
  const [actType, setActType] = useState('')
  // 活動人數
  const [actPeople, setActPeople] = useState('0')
  // 活動時間 記得下面有handler
  const [actTime, setActTime] = useState(setTimeDefault)

  // 活動內容
  const [actContent, setActContent] = useState('')

  // 地圖用
  const [geo, setGeo] = useState({
    lat: 25.03382,
    lng: 121.5434,
    city: '',
    locality: '',
    wayGetGeo: '',
  })

  // 封面照座標用
  const [imgGeo, setImgGeo] = useState({ lat: null, lng: null })

  // 舉辦成功視窗彈出用 NOTE 開發或修改時 useState({ show: true, id: '109' })
  const [infoToModal, setInfoToModal] = useState({ show: false, id: '' })
  // Ref for exif & preview feature
  const imgRef = useRef()
  const imgUploaderRef = useRef()

  // Ref for validation
  const titleValid = useRef()
  const typeValid = useRef()
  const peopleValid = useRef()
  const timeValid = useRef()
  const contentValid = useRef()
  const mapValid = useRef() // 這個用在span內 要注意

  // exif 解析 helper
  const exifFinder = async (file) => {
    try {
      let { latitude, longitude } = await exifr.gps(file)

      setImgGeo({ lat: latitude, lng: longitude })
    } catch (err) {
      // 無資料時讓setImgGeo reset
      console.log('Cannot get GEO Info')
      setImgGeo({ lat: null, lng: null })
    }
  }

  // 設定時間表格的最小值
  const setActTimeValid = (e) => {
    if (new Date(e.target.value) >= new Date(e.target.min))
      setActTime(e.target.value)
  }

  // NOTE 取消紅字
  const onFormChangeHandler = (e) => {
    // const a = e.target.nextElementSibling
    e.target.parentNode.querySelector('small')?.classList.add('invisible')

    // 每次變化時確保時間至少都在兩小時後
    // NOTE 暫定submit時再判斷好了 不然一直更改 UX 會不好
    // setTimeDefault() > actTime && setActTime(setTimeDefault())
  }

  // NOTE invalid 因為有地圖DOM 驗證都改給submit 這邊取消泡泡訊息
  const onFormInvalidHandler = (e) => {
    // 擋住錯誤訊息預設呈現方式(跳出的訊息泡泡)
    e.preventDefault()

    if (setTimeDefault() > actTime) {
      setActTime(setTimeDefault())
      timeValid.current.focus()

      timeValid.current.parentNode
        .querySelector('small')
        .classList.remove('invisible')
    }
  }

  // NOTE 用 hook 更新解除地圖DOM錯誤提醒 (非表單)
  useEffect(() => {
    // 地圖驗證
    if (geo.lat !== 25.03382) {
      mapValid.current.classList.add('invisible')
    }
  }, [geo])

  // submit
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    // TODO: 表單驗證
    let isPass = true

    // 地圖驗證
    if (geo.lat === 25.03382) {
      mapValid.current.classList.remove('invisible')
      isPass = false
    }

    // 活動內文驗證
    if (actContent.length < 15 || actContent.length > 255) {
      contentValid.current.focus()

      contentValid.current.parentNode
        .querySelector('small')
        .classList.remove('invisible')

      isPass = false
    }

    // NOTE 為了讓最上面的有focus效果 把表單倒過來驗證
    // 活動時間驗證 如果沒有在兩小時內的話 設定回兩小 並跳出提醒用戶時間的更改
    if (setTimeDefault() > actTime) {
      setActTime(setTimeDefault())
      timeValid.current.focus()

      timeValid.current.parentNode
        .querySelector('small')
        .classList.remove('invisible')

      isPass = false
    }

    // 活動人數驗證
    if (actPeople === '0') {
      peopleValid.current.focus()

      peopleValid.current.parentNode
        .querySelector('small')
        .classList.remove('invisible')

      isPass = false
    }

    // 活動類別驗證
    if (!actType) {
      typeValid.current.focus()

      typeValid.current.parentNode
        .querySelector('small')
        .classList.remove('invisible')

      isPass = false
    }

    // 活動標題驗證
    // TODO: 活動標題字數 之後視切版情況調整 10/13 最高長度改為10
    if (actTitle.length < 5 || actTitle.length > 10) {
      titleValid.current.focus()

      titleValid.current.parentNode
        .querySelector('small')
        .classList.remove('invisible')

      isPass = false
    }

    // if (!isPass) return console.log('資料格式有誤 提早回傳')
    // // 1023 added. 未登入時 優先彈出登入確認
    // if (!user.member_sid) return setShowLogin(true)

    if (!isPass && !user.member_sid) {
      console.log('資料格式有誤 且未登入 提早回傳')
      return setShowLogin(true)
    }

    if (!user.member_sid) {
      console.log('未登入 提早回傳')
      return setShowLogin(true)
    }

    if (!isPass) return console.log('資料格式有誤 提早回傳')
    // 進入上傳
    console.log('進入上傳')

    const fd = new FormData()

    // NOTE 1023 change: connect with login system
    fd.append('members_id', user.member_sid)
    fd.append('lat', geo.lat)
    fd.append('lng', geo.lng)
    fd.append('city', geo.city)
    fd.append('locality', geo.locality)
    fd.append('activity_title', actTitle)
    fd.append('activity_type', actType)
    fd.append('activity_people', actPeople)
    fd.append('activity_time', actTime)
    fd.append('activity_content', actContent)

    // img並非一定要有 當有的時候再append 以利原先寫好的後端判斷 FIX 有空根據init state調整
    actImg && fd.append('activity_img', actImg)

    // TODO: 檔案上傳成功後的處理
    const { data } = await joeyServer.post('/meetup/create', fd)

    // history.push('/meetup/list/' + data.result.insertId)

    setInfoToModal({ show: true, id: data.result.insertId })
  }

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form
              className="j-create-form"
              onSubmit={onSubmitHandler}
              onChange={onFormChangeHandler}
              onInvalid={onFormInvalidHandler}
              autoComplete="off"
            >
              {/*  活動標題  */}
              <h2 className="j-create-form__title">創建活動</h2>

              {/*  活動封面  */}
              <div
                className="form-group j-create-form__upload"
                onClick={() => imgUploaderRef.current.click()}
              >
                {/* 這邊這個不要設label配對id 不然會開啟兩次 一次label觸發 一次bubble */}
                <label className="j-create-form__label">活動封面</label>
                <div className="form-control j-create-form__fake-btn">
                  上傳活動封面
                </div>

                {/* NOTE 隱藏  */}
                <input
                  type="file"
                  className="form-control d-none"
                  id="actImg"
                  accept="image/jpeg, image/png"
                  ref={imgUploaderRef}
                  onChange={(e) => {
                    const [userImg] = e.target.files
                    // guard 重新開啟卻沒有上傳
                    if (!userImg) return

                    // 拿到就先交給exif讀取資料
                    exifFinder(userImg)

                    const reader = new FileReader()
                    reader.onload = () => {
                      imgRef.current.src = reader.result
                      // 等圖片load完成後 再設定state 避免因為時間差顯示alt(img未load)
                      setActImg(userImg)
                    }
                    console.log('93', userImg)
                    reader.readAsDataURL(userImg)
                  }}
                />

                <div
                  className="
                j-create-form__img-box
                d-flex
                justify-content-center
                align-items-center
              "
                >
                  {/* 預設圖片 */}
                  <i
                    className={`fas fa-file-image ${actImg ? 'd-none' : ''}`}
                  ></i>

                  {/* 當有圖片在state的時候變更 */}
                  <img
                    src=""
                    alt="用戶上傳的圖片"
                    ref={imgRef}
                    className={actImg ? '' : 'd-none'}
                  />
                </div>
              </div>
              {/*  活動標題  */}
              <div className="form-group">
                <label htmlFor="actTitle" className="j-create-form__label">
                  活動標題 <span className="team-error">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="actTitle"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  ref={titleValid}
                  placeholder="請填寫活動標題 5~10字"
                />
                {/* TODO: 活動標題字數 之後視切版情況調整 */}
                <small className="form-text team-error invisible">
                  請填寫活動標題 5~10字
                </small>
              </div>
              {/*  活動類別  */}
              <div className="form-group">
                <label htmlFor="actType" className="j-create-form__label">
                  活動類別 <span className="team-error">*</span>
                </label>
                <select
                  className="form-control"
                  id="actType"
                  value={actType}
                  onChange={(e) => setActType(e.target.value)}
                  ref={typeValid}
                >
                  <option value="" disabled>
                    -- 請選擇活動類別 --
                  </option>
                  <option value="跑步">跑步</option>
                  <option value="爬山">爬山</option>
                  <option value="游泳">游泳</option>
                  <option value="健身">健身</option>
                  <option value="其他">其他</option>
                </select>
                <small className="form-text team-error invisible">
                  請選擇活動類別
                </small>
              </div>
              {/*  活動人數  */}
              <div className="form-group">
                <label htmlFor="actPeople" className="j-create-form__label">
                  活動人數 <span className="team-error">*</span>
                </label>
                <select
                  className="form-control"
                  id="actPeople"
                  value={actPeople}
                  onChange={(e) => setActPeople(e.target.value)}
                  ref={peopleValid}
                >
                  <option value="0" disabled>
                    -- 請選擇活動人數 --
                  </option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                  <option value="4">4人</option>
                  <option value="5">5人</option>
                  <option value="6">6人</option>
                  <option value="7">7人</option>
                  <option value="8">8人</option>
                </select>
                <small className="form-text team-error invisible">
                  請選擇活動人數
                </small>
              </div>

              {/*  開始時間  */}
              <div className="form-group">
                <label htmlFor="activity_time" className="j-create-form__label">
                  開始時間 <span className="team-error">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="activity_time"
                  className="form-control"
                  name="activity_time"
                  value={actTime}
                  onChange={setActTimeValid}
                  min={setTimeDefault()}
                  ref={timeValid}
                />
                <small className="form-text team-error">
                  提醒: 活動開始時間最早為兩小時後，不足時系統將會自動補足
                </small>
              </div>

              {/*  活動內容 */}
              <div className="form-group">
                <label htmlFor="actContent" className="j-create-form__label">
                  活動內容 <span className="team-error">*</span>
                </label>
                <textarea
                  placeholder="請輸入活動內容 15~255字"
                  id="actContent"
                  value={actContent}
                  onChange={(e) => setActContent(e.target.value)}
                  cols="70"
                  rows="10"
                  className="form-control"
                  style={{ resize: 'none' }}
                  ref={contentValid}
                />
                <small className="form-text team-error invisible">
                  請輸入活動內容 15~255字
                </small>
              </div>

              {/* 地圖控制btn */}
              <div className="form-group">
                <label className="j-create-form__label">
                  活動地點 <span className="team-error">*</span>
                  {/* NOTE 先加這邊好了 */}
                  <small
                    className="form-text team-error invisible"
                    ref={mapValid}
                  >
                    請於地圖上選擇活動地點
                  </small>
                </label>
                <div className="d-flex justify-content-between justify-content-lg-center">
                  {/* TODO:　WARN fix j-create-form__btn 還沒有hover效果  */}
                  <button
                    className="btn j-create-form__btn"
                    type="button"
                    onClick={async () => {
                      const { lat, lng } = await joeyGeo.getCurrentGeo()
                      const { city, locality } = await joeyGeo.getLocationName(
                        lat,
                        lng
                      )
                      setGeo({
                        lat,
                        lng,
                        city,
                        locality,
                        wayGetGeo: 'byCurPlace',
                      })
                    }}
                  >
                    目前位置
                  </button>
                  {/*  TODO:　WARN fix j-create-form__btn 還沒有hover效果  */}
                  <button
                    className="btn j-create-form__btn"
                    type="button"
                    disabled={!imgGeo.lat}
                    onClick={async () => {
                      const { city, locality } = await joeyGeo.getLocationName(
                        imgGeo.lat,
                        imgGeo.lng
                      )

                      setGeo({
                        ...imgGeo,
                        city,
                        locality,
                        wayGetGeo: 'byPhoto',
                      })
                    }}
                  >
                    封面照位置
                  </button>
                </div>
                {/* map */}
                <div className="j-create-form__map">
                  <CreateFormMap
                    lat={geo.lat}
                    lng={geo.lng}
                    city={geo.city}
                    locality={geo.locality}
                    wayGetGeo={geo.wayGetGeo}
                    setGeo={setGeo}
                  />
                </div>
              </div>
              {/* map end */}
              {/*  submit  */}
              <div className="form-group text-center">
                <button type="submit" className="btn team-btn j-create-margin">
                  發佈
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* container 結束 */}
      <MeetupCreateModal infoToModal={infoToModal} />
    </>
  )
}

export default MeetupCreate
