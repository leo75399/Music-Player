import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useHistory } from 'react-router-dom'

const RecommendLG = (props) => {
  const { featured } = props
  const [psid, setPsid] = useState(1)
  const [pURL, setPURL] = useState('gray')

  const changeImg = useRef(null)
  const history = useHistory()

  return (
    <div className="row mt-3 mt-lg-5 li_recommend">
      <div className="li_p_tl col-lg d-none d-lg-block">
        <div className="d-flex li_sticky">
          <div className="col-lg-4 li_spec d-flex align-items-center">
            {' '}
            <span>精選推薦</span>{' '}
          </div>
          <img
            src={'http://localhost:3000/products_img/sid001.jfif'}
            className="col-lg-8 li_specImg  li_changeImg w-100 li_pointer"
            alt=""
            ref={changeImg}
            onClick={() => {
              history.push(`/products/productsDetail/${psid}/${pURL}`)
            }}
          />
        </div>
      </div>
      <div className="li_p_tr d-none d-lg-block col-lg-auto ">
        {featured.map((v, i) => {
          return (
            <div key={i} className="py-3">
              <Link
                to={`/products/productsDetail/${psid}/${pURL}`}
                className="li_textDecoration"
              >
                <span
                  className="li_topName"
                  onMouseEnter={(e) => {
                    changeImg.current.src = `http://localhost:3000/products_img/${v.imgName}`
                    changeImg.current.style.transition = `1s`
                    setPsid(v.sid)
                    setPURL(v.default)
                  }}
                >
                  {v.name}
                </span>
                <Icon
                  icon="mdi:arrow-top-right-thin"
                  width="36px"
                  inline={true}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default RecommendLG
