import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_HOST } from './../../../../config'
import { Link, withRouter } from 'react-router-dom'
import { Icon } from '@iconify/react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

const Like = (props) => {
  const { detail, setSid, setSelectColor } = props
  let [like, setLike] = useState([])
  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/like`)
      setLike(r.data)
    })()
  }, [])
  let count = 0
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <Icon
        icon="mdi:arrow-right-bold-circle"
        color="#ccc"
        className={className}
        onClick={onClick}
        style={{ ...style, width: '36px', height: '36px', right: '-15px' }}
      />
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <Icon
        icon="mdi:arrow-left-bold-circle"
        color="#ccc"
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: '36px',
          height: '36px',
          zIndex: 1,
          left: '-15px',
        }}
      />
    )
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className="li_like d-none d-lg-block">
      <div className="">
        <h5 className="mb-lg-5">你可能也會喜歡</h5>
        <Slider {...settings} className="">
          {like.length > 0 &&
            like.map((v, i) => {
              if (
                v.categories === detail.categories &&
                v.type === detail.type &&
                v.sid !== detail.sid
              ) {
                count++
              }
              if (count > 8) {
                return ''
              }
              return v.categories === detail.categories &&
                v.type === detail.type &&
                v.sid !== detail.sid ? (
                <div key={i} className="li_productCard li_h500">
                  <Link
                    to={{
                      pathname: `/products/productsDetail/${v.sid}/${v.default}`,
                    }}
                    onClick={() => {
                      setSid(v.sid)
                      setSelectColor(v.default)
                    }}
                  >
                    <img
                      src={'http://localhost:3000/products_img/' + v.imgName}
                      alt=""
                      className="w-100"
                    />
                    <div className="li_brand">{v.brandsName}</div>
                    <div className="li_productName">{v.name}</div>
                    <div className="li_price">${v.price}</div>
                  </Link>
                </div>
              ) : (
                ''
              )
            })}
        </Slider>
      </div>
    </div>
  )
}

export default withRouter(Like)
