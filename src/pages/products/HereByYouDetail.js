import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_HOST } from '../../config'
// import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import BreadCrumb from './BreadCrumb'
import SpinnerInProducts from './SpinnerInProducts'
import 'animate.css'
import { useHistory } from 'react-router-dom'

const HereByYouDetail = (props) => {
  const { user, itemNumber, setItemNumber } = props
  const [detailImg, setDetailImg] = useState([])
  const [show, setShow] = useState(false)
  const [imgPathAll, setImgPathAll] = useState('')
  const [color, setColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [sizeID, setSizeID] = useState(0)
  const [loading, setLoading] = useState(true)
  const number = [1, 2, 3, 4, 5]
  const size = [
    22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5,
  ]
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!user.login) {
      history.push('/')
    } else {
      ;(async () => {
        let detailImg = await axios.post(`${API_HOST}/products/customized`, {
          id: user.member_sid,
        })
        setDetailImg(detailImg.data[0])
        setColor(detailImg.data[0].imgPath.split('detail/')[1])
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  const path = [
    { name: 'home', url: '/', id: 1 },
    { name: '製作你的專屬鞋子', url: '/customized', id: 2 },
    { name: 'Here By you', url: '/customized/productsDetail', id: 3 },
  ]
  const customizedAddToCart = () => {
    if (!sizeID) {
      Swal.fire({
        icon: 'error',
        title: '請先選擇尺寸',
        showConfirmButton: false,
        timer: 1000,
      })
    } else {
      setItemNumber(itemNumber + 1)
      ;(async () => {
        await axios.post(
          `http://localhost:3000/products/customized/addToCart`,
          {
            id: user.member_sid,
            size: selectedSize,
            color: color,
            sizeID: sizeID,
          }
        )
      })()
      Swal.fire({
        icon: 'success',
        title: '已加入購物車',
        showConfirmButton: false,
        timer: 1000,
      })
    }
  }
  return loading ? (
    <SpinnerInProducts loading={loading} name={'li_spinner'} />
  ) : (
    <div className="container-fluid mt-4 li_top li_maxWidth li_mb150">
      <BreadCrumb path={path} />
      <div className="row mt-5">
        <div className="col-12 col-lg li_left">
          <div className="d-flex flex-wrap">
            {number.map((v) => {
              return (
                <div className="d-none d-lg-block col-lg-6 mb-4 " key={v}>
                  <img
                    src={`${detailImg.imgPath}-${v}.jfif`}
                    className="w-100 li_zoomIn"
                    alt=""
                    onClick={() => {
                      setShow(true)
                      setImgPathAll(`${detailImg.imgPath}-${v}.jfif`)
                    }}
                  />{' '}
                </div>
              )
            })}
          </div>
        </div>
        {show ? (
          <div
            className="li_popup li_center li_fadeIn"
            onClick={(e) => {
              setShow(false)
            }}
          >
            <img
              className="li_detailImg "
              src={imgPathAll}
              alt=""
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
          </div>
        ) : (
          ''
        )}
        <div className="col-12 col-lg-4 mt-3 li_right">
          <div className="li_gender">{`${user.nickname}  的專屬鞋子`}</div>
          <h2>{`Here By You`}</h2>
          <div className="d-flex justify-content-between">
            <p>$6660</p>
          </div>
          <div className="li_size mt-5">
            <div className="li_sizeText">
              <p>選取尺寸</p>
            </div>
            <div className="li_chooseSize">
              {size.map((v, i) => {
                return selectedSize === v ? (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedSize(v)
                      setSizeID(i + 830)
                    }}
                    className="li_inStock"
                  >
                    {v}
                  </button>
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedSize(v)
                      setSizeID(i + 830)
                    }}
                    className=""
                  >
                    {v}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="li_button">
            <div className="li_addToCart">
              <button className="btn team-btn " onClick={customizedAddToCart}>
                加入購物車
              </button>
            </div>
          </div>
          <div className="li_intro my-5 ">
            <p>
              了解清楚專屬你的鞋子到底是一種怎麼樣的存在，是解決一切問題的關鍵。我們要從本質思考，從根本解決問題。專屬你的鞋子的存在，令我無法停止對他的思考。儘管專屬你的鞋子看似不顯眼，卻佔據了我的腦海。專屬你的鞋子對我來說，已經成為了我生活的一部分。
              <br />
            </p>
            <p className="mt-3 team-primary">
              注意！商品顏色會因電腦或手機顯示不同而有些許誤差，請依實際商品為主
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HereByYouDetail
