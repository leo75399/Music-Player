// HENRY佔了 2 個部分
import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import Review from './Review'
import { Carousel } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'
// 以下HENRY用
import { API_HOST } from './../../../../config'

const Top = (props) => {
  const {
    detail,
    color,
    size,
    setSelectColor,
    detailImg,
    selectColor,
    sid,
    colorId,
    setColorId,
    setStock,
    stock,
    setStockID,
    stockID,
    setSelectedSize,
    selectedSize,
    user,
    isLiked,
    setIsLiked,
    // setUser,
    // showLogin,
    setShowLogin,
    itemNumber,
    setItemNumber,
  } = props
  const [show, setShow] = useState(false)
  const [imgPath, setImgPath] = useState('')

  // henry START-----------------------------------------------------
  //設定購買上限不得超過庫存
  const [tempStock, setTempStock] = useState({})
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        const r = await axios.get(API_HOST + `/cart/${user.member_sid}`)
        const newTempStock = { ...tempStock }
        for (let i = 0; i < r.data.length; i++) {
          const id = r.data[i]['stock_id']
          newTempStock[id] = r.data[i].quantity
        }
        setTempStock(newTempStock)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const addToCart = async (e) => {
    setItemNumber(itemNumber + 1)
    await axios.post(API_HOST + '/cart', {
      product_id: +sid,
      category: detail.categories,
      product_name: detail.name,
      product_color: selectColor,
      quantity: 1,
      product_size: selectedSize,
      color_id: colorId,
      stock_id: stockID,
      member_id: user.member_sid,
      order_id: 'pending',
    })
    Swal.fire({
      icon: 'success',
      title: '已加入購物車',
      showConfirmButton: false,
      timer: 1000,
    })
  }
  // henry END---------------------------------------------------------

  const notLiked = async () => {
    await axios.delete(`http://localhost:3000/products/likeDel`, {
      data: {
        id: user.member_sid,
        products_sid: detail.sid,
      },
    })
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
      products_sid: detail.sid,
    })

    Swal.fire({
      icon: 'success',
      title: '已加入收藏',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  return (
    <div className="row mt-5">
      <div className="col-12 col-lg li_left">
        <div className="d-flex flex-wrap">
          <Carousel className="d-lg-none" wrap={false}>
            {detailImg.length > 0 &&
              detailImg.map((v, i) => {
                return (
                  <Carousel.Item key={i}>
                    <img
                      src={
                        'http://localhost:3000/products_img/productsDetail/' +
                        v.detailImg
                      }
                      className="w-100"
                      alt=""
                    />
                  </Carousel.Item>
                )
              })}
          </Carousel>
          {detailImg.length > 0 &&
            detailImg.map((v, i) => {
              return (
                <div className="d-none d-lg-block col-lg-6 mb-4 " key={i}>
                  <img
                    src={
                      'http://localhost:3000/products_img/productsDetail/' +
                      v.detailImg
                    }
                    className="w-100 li_zoomIn"
                    alt=""
                    onClick={() => {
                      setShow(true)
                      setImgPath(
                        `http://localhost:3000/products_img/productsDetail/${v.detailImg}`
                      )
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
          onClick={() => {
            setShow(false)
          }}
        >
          <img
            className="li_detailImg"
            src={imgPath}
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
        <div className="li_gender">{`${detail.categories}  ${detail.brandsName}`}</div>
        <h2>{detail.name}</h2>
        <div className="d-flex justify-content-between">
          <p>${detail.price}</p>
          <div
            onClick={() => {
              if (user.login) {
                setIsLiked(!isLiked)
              } else {
                setShowLogin(true)
              }
            }}
          >
            {isLiked ? (
              <Icon
                className="li_iconHeart li_pointer"
                onClick={() => {
                  if (user.login) {
                    notLiked()
                  }
                }}
                icon="mdi:cards-heart"
                color="#e88239"
                width="24"
              />
            ) : (
              <Icon
                onClick={() => {
                  if (user.login) {
                    likeIt()
                  }
                }}
                className="li_iconHeart li_pointer"
                icon="mdi:cards-heart-outline"
                color="#e88239"
                width="24"
              />
            )}
          </div>
        </div>
        <div className="li_moreColor d-flex">
          {color.length > 0 &&
            color.map((v, i) => {
              return (
                <div className="li_chooseColor" key={i}>
                  <Link
                    to={
                      '/products/productsDetail/' +
                      v.products_sid +
                      '/' +
                      v.color
                    }
                    className="w-100"
                  >
                    <img
                      src={
                        'http://localhost:3000/products_img/colorSelect/' +
                        v.colorImg
                      }
                      className="w-100"
                      alt=""
                      onClick={() => {
                        setSelectColor(v.color)
                        setColorId(v.id)
                      }}
                    />
                  </Link>
                </div>
              )
            })}
        </div>
        <div className="li_size mt-5">
          <div className="li_sizeText">
            <p>選取尺寸</p>
          </div>
          <div className="li_chooseSize">
            {size.length > 0 &&
              size.map((v, i) => {
                return v.stock === 0 ? (
                  <button disabled className="li_noStock" key={i}>
                    {v.size}
                  </button>
                ) : selectedSize === v.size ? (
                  <button
                    key={i}
                    onClick={() => {
                      setStock(v.stock)
                      setSelectedSize(v.size)
                      setStockID(v.id)
                      setColorId(v.color_id)
                    }}
                    className="li_inStock"
                  >
                    {v.size}
                  </button>
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      setStock(v.stock)
                      setSelectedSize(v.size)
                      setStockID(v.id)
                      setColorId(v.color_id)
                    }}
                    className=""
                  >
                    {v.size}
                  </button>
                )
              })}
          </div>
          {stock >= 10 || stock <= 0 ? (
            <p className="invisible mb-0 my-1">
              庫存僅剩 <span className="li_showStock">{stock} </span>
              件，要買要快！
            </p>
          ) : (
            <p className="mb-0 my-1">
              庫存僅剩 <span className="li_showStock">{stock} </span>
              件，要買要快！
            </p>
          )}
        </div>
        <div className="li_button">
          <div className="li_addToCart">
            <button
              className="btn team-btn "
              onClick={() => {
                if (selectedSize) {
                  // henry START------------------------------
                  if (user.login) {
                    const newTempStock = { ...tempStock }
                    const id = stockID
                    if (newTempStock[id]) {
                      //購物車已經有一樣的東西
                      if (newTempStock[id] >= stock) {
                        //超過庫存上限就不能再加入
                        Swal.fire({
                          icon: 'error',
                          title: `抱歉本商品最多買${stock}件`,
                          // timer: 1500,
                          showConfirmButton: true,
                          focusConfirm: false,
                        })
                      } else {
                        //已經有一樣的東西→增加一個
                        newTempStock[id] += 1
                        setTempStock(newTempStock)
                        addToCart()
                      }
                    } else {
                      //所選商品(規格要相同)第一次放入
                      newTempStock[id] = 1
                      setTempStock(newTempStock)
                      addToCart()
                    }
                  } else {
                    setShowLogin(true)
                  }
                  // henry END -----------------------------------------
                  // console.log('-------------我是分隔線----------------')
                  // console.log('選取尺寸:', selectedSize)
                  // console.log('剩餘庫存', stock)
                  // console.log('商品名稱', detail.name)
                  // console.log('商品品牌', detail.brandsName)
                  // console.log('商品顏色', selectColor)
                  // console.log('商品價格', detail.price)
                  // console.log('products_sid', sid)
                  // console.log('color_id', colorId)
                  // console.log('stock_id', stockID)
                  // console.log('-------------我是分隔線----------------')
                  // console.log('user', user)
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: '請先選擇尺寸！！',
                    showConfirmButton: false,
                    timer: 1000,
                  })
                }
              }}
            >
              加入購物車
            </button>
          </div>
          <div
            onClick={() => {
              if (user.login) {
                setIsLiked(!isLiked)
              } else {
                setShowLogin(true)
              }
            }}
          >
            {isLiked ? (
              <button
                className="li_favorite "
                onClick={() => {
                  if (user.login) {
                    notLiked()
                  }
                }}
              >
                取消收藏
              </button>
            ) : (
              <button
                className="li_favorite "
                onClick={() => {
                  if (user.login) {
                    likeIt()
                  }
                }}
              >
                加入收藏
              </button>
            )}
          </div>
        </div>
        <div className="li_intro my-5 ">
          <p>{detail.detail}</p>
        </div>
        <div className="li_review">
          <Review user={user} setShowLogin={setShowLogin} sid={detail.sid} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Top)
