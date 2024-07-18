import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import lozad from 'lozad'
import { useHistory } from 'react-router-dom'

const ProductsCard = (props) => {
  const {
    sid,
    price,
    name,
    imgName,
    brandsName,
    defaultURL,
    user,
    setShowLogin,
  } = props
  const observer = lozad() // lazy loads elements with default selector as '.lozad'
  observer.observe()
  const [favoriteData, setFavoriteData] = useState([])
  const [colorData, setColorData] = useState([])
  const [color, setColor] = useState(defaultURL)
  // const [img, setImg] = useState('')
  const [isLiked, setIsLiked] = useState(true)
  const [hover, setHover] = useState(false)
  const history = useHistory()
  const changeImg = useRef(null)
  useEffect(() => {
    ;(async () => {
      let r = await axios.post(
        `http://localhost:3000/products/list/membersFavorite`,
        {
          id: user.member_sid,
          sid: sid,
        }
      )
      setFavoriteData(r.data)
    })()
  }, [isLiked, user, sid])
  useEffect(() => {
    ;(async () => {
      let r = await axios.post(`http://localhost:3000/products/color/sid`, {
        sid: sid,
      })
      setColorData(r.data)
    })()
  }, [sid])

  const notLiked = async () => {
    await axios.delete(`http://localhost:3000/products/likeDel`, {
      data: {
        id: user.member_sid,
        products_sid: sid,
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
  const likeIt = async () => {
    await axios.post(`http://localhost:3000/products/likeAdd`, {
      id: user.member_sid,
      products_sid: sid,
    })
    setIsLiked(!isLiked)
    Swal.fire({
      icon: 'success',
      title: '已加入收藏',
      showConfirmButton: false,
      timer: 1000,
    })
  }
  return (
    <div className="li_productCard col-6 col-lg-3 my-5 li_h500">
      <div
        className="li_pointer"
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
      >
        <div className="position-relative">
          <img
            data-src={`http://localhost:3000/products_img/${imgName}`}
            alt=""
            className="w-100 lozad"
            onClick={() => {
              history.push(`/products/productsDetail/${sid}/${color}`)
            }}
            ref={changeImg}
          />
          {user.login ? (
            favoriteData.length > 0 ? (
              <Icon
                className="li_cardHeart li_pointer"
                onClick={(e) => {
                  e.preventDefault()
                  notLiked()
                }}
                icon="mdi:cards-heart"
                color="#e88239"
                width="24"
              />
            ) : (
              <Icon
                className="li_cardHeart li_pointer"
                onClick={(e) => {
                  e.preventDefault()
                  likeIt()
                }}
                icon="mdi:cards-heart-outline"
                color="#e88239"
                width="24"
              />
            )
          ) : (
            <button
              className="li_cardHeart"
              onClick={(e) => {
                e.preventDefault()
                setShowLogin(true)
              }}
            >
              <i className="li_cardHeart far fa-heart"></i>
            </button>
          )}
        </div>
        {hover ? (
          <div className="li_between">
            <div className="li_moreColor d-flex">
              {colorData.length > 0 &&
                colorData.map((v, i) => {
                  return (
                    <div className="li_chooseColor" key={i}>
                      <img
                        src={
                          'http://localhost:3000/products_img/colorSelect/' +
                          v.colorImg
                        }
                        className="w-100"
                        alt=""
                        onClick={() => {
                          history.push(
                            `/products/productsDetail/${v.products_sid}/${v.color}`
                          )
                        }}
                        onMouseEnter={() => {
                          changeImg.current.src = `http://localhost:3000/products_img/colorSelect/${v.colorImg}`
                          // setImg(v.colorImg)
                          setColor(v.color)
                        }}
                      />
                    </div>
                  )
                })}
            </div>
            <div className="li_price">${price}</div>
          </div>
        ) : (
          <div>
            <div className="li_brand"> {brandsName}</div>
            <div className="li_between">
              <div className="li_productName">{name}</div>
              <div className="li_price">${price}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsCard
