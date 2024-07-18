import { React, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import './EmmaCarousel.scss'
import { API_HOST } from '../../config'

function EmmaCarousel({ title, inputStyle, data }) {
  let imgWrap = useRef()
  let interval = useRef()
  let curMarginLeft = useRef()
  let acceleration = useRef()
  let damp = useRef(1)
  const [myStyle, setMyStyle] = useState({})

  function calcInitAcc(e) {
    //mouse position
    let mX = e.pageX
    //window inner width
    let wd = window.innerWidth
    let dist2Central = mX - wd / 2

    //normalize with 100
    acceleration.current = dist2Central / 100
  }

  function featureShoesEnter(e) {
    calcInitAcc(e)
    damp.current = 1.0
  }
  function featureShoesMove(e) {
    calcInitAcc(e)
    damp.current = 1.0
  }
  function featureShoesLeave(e) {
    calcInitAcc(e)
    damp.current = 0.97
  }

  useEffect(() => {
    curMarginLeft.current = 0
    acceleration.current = 0

    interval.current = setInterval(() => {
      if (!imgWrap.current) {
        return
      }

      //acc: px move left each 5ms
      curMarginLeft.current -= acceleration.current
      acceleration.current *= damp.current

      //max margin left is -imgWrap.current.offsetWidth + window.innerWidth
      if (
        curMarginLeft.current <
        -imgWrap.current.offsetWidth + window.innerWidth
      ) {
        curMarginLeft.current = -imgWrap.current.offsetWidth + window.innerWidth
      }

      //min margin left is 0
      if (curMarginLeft.current > 0) {
        curMarginLeft.current = 0
      }

      setMyStyle({
        marginLeft: curMarginLeft.current,
      })
    }, 5)
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  return (
    <div className="emma-carousel">
      <div
        className="emma-feature-shoes-box-wrap"
        onMouseEnter={featureShoesEnter}
        onMouseMove={featureShoesMove}
        onMouseLeave={featureShoesLeave}
      >
        <div
          className="emma-home-feature-cover-box d-flex align-items-end emma-cursor"
          style={inputStyle}
        >
          <div className="emma-home-feature-cover-txt">
            <h2>{title}</h2>
          </div>
        </div>

        <div
          className="emma-feature-shoes-img-wrap d-flex emma-cursor"
          ref={imgWrap}
          style={myStyle}
        >
          {data.length > 0 &&
            data.map((v, i) => {
              return (
                <Link
                  to={`/products/productsDetail/${v.sid}/${v.default}/`}
                  className="emma-feature-shoes-box emma-cursor"
                  key={v.sid}
                >
                  <img src={`${API_HOST}/products_img/${v.imgName}`} alt="" />
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default EmmaCarousel
