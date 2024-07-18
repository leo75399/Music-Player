import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'

const FavoriteCard = (props) => {
  // 這邊需要傳入user的狀態 !
  const { user } = props
  const [favoriteData, setFavoriteData] = useState([])
  const [isLiked, setIsLiked] = useState(true)

  useEffect(() => {
    ;(async () => {
      let r = await axios.post(
        `http://localhost:3000/products/membersFavorite`,
        {
          id: user.member_sid,
        }
      )
      setFavoriteData(r.data)
    })()
  }, [isLiked, user])

  const notLiked = async (products_sid) => {
    await axios.delete(`http://localhost:3000/products/likeDel`, {
      data: {
        id: user.member_sid,
        products_sid: products_sid,
      },
    })
    setIsLiked(!isLiked)
    Swal.fire({
      icon: 'error',
      title: '已移除收藏',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  return (
    <div className="d-flex flex-wrap">
      {favoriteData.length > 0 &&
        favoriteData.map((v, i) => {
          return (
            <div
              key={v.id}
              className="li_FCproductCard col-6 col-lg-3 my-3 my-lg-5 li_h500"
            >
              <Link
                to={
                  '/products/productsDetail/' + v.products_sid + '/' + v.default
                }
              >
                <div className="position-relative">
                  <img
                    src={'http://localhost:3000/products_img/' + v.imgName}
                    alt=""
                    className="w-100"
                  />

                  <Icon
                    className="li_cardHeart li_pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      notLiked(v.products_sid)
                    }}
                    icon="mdi:cards-heart"
                    color="#e88239"
                    width="20"
                  />
                </div>

                <div className="li_FCbrand">{v.brandsName}</div>

                <div className="li_FCproductName">{v.name}</div>
                <div className="li_FCprice">${v.price}</div>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default FavoriteCard
