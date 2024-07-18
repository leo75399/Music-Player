import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_HOST } from '../../config'
import { Link } from 'react-router-dom'

const HenryLike = () => {
  let [like, setLike] = useState([])
  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/featured/henry`)
      setLike(r.data)
    })()
  }, [])

  return (
    <div className="li_like">
      <h5 className="mb-lg-5">為你專屬推薦</h5>
      <div className="d-flex overflow-hidden">
        {like.length > 0 &&
          like.map((v, i) => {
            return (
              <div
                key={i}
                className="li_productCard li_h500 col-6 col-lg-3 pl-0"
              >
                <Link
                  to={{
                    pathname: `/products/productsDetail/${v.sid}/${v.default}`,
                  }}
                >
                  <img
                    src={'http://localhost:3000/products_img/' + v.imgName}
                    alt=""
                    className="w-100"
                  />
                  <div className="li_brand">{v.brandsName}</div>
                  <div className="li_between">
                    <div className="li_productName">{v.name}</div>
                    <div className="li_price">${v.price}</div>
                  </div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default HenryLike
