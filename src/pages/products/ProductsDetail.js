import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Top from './ProductsDetail/Top'
// import Down from './productsDetail/Down'
import BreadCrumb from './BreadCrumb'
import SpinnerInProducts from './SpinnerInProducts'
import Like from './ProductsDetail/Like'
import LikeS from './ProductsDetail/Like/LikeS'
import axios from 'axios'
import { API_HOST } from './../../config'

const ProductsDetail = (props) => {
  const { user, setUser, showLogin, setShowLogin, itemNumber, setItemNumber } =
    props
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState({})
  const [color, setColor] = useState([])
  const [size, setSize] = useState({})
  const [selectColor, setSelectColor] = useState(props.match.params.color)
  const [detailImg, setDetailImg] = useState({})
  const [stock, setStock] = useState(0)
  const [stockID, setStockID] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [like, setLike] = useState([])
  const [colorId, setColorId] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [sid, setSid] = useState(props.match.params.sid)
  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/productsDetail/${sid}`)
      setDetail(r.data[0])
    })()
    ;(async () => {
      let c = await axios.get(`${API_HOST}/products/color/${sid}`)
      setColor([c.data][0])
    })()
    ;(async () => {
      let sizeData = await axios.get(
        `${API_HOST}/products/stock/${sid}/${selectColor}`
      )
      setSize(sizeData.data)
    })()
    ;(async () => {
      let detailImg = await axios.get(
        `${API_HOST}/products/detailImg/${sid}/${selectColor}`
      )
      setDetailImg([detailImg.data][0])
    })()
    ;(async () => {
      let likeData = await axios.post(
        `http://localhost:3000/products/like/${sid}`,
        {
          id: user.member_sid,
        }
      )
      setLike(likeData.data)
    })()
    setStock(0)
    setStockID(0)
    setSelectedSize('')
  }, [selectColor, sid, user])
  useEffect(() => {
    if (user.login && like.length > 0) {
      setIsLiked(true)
    } else {
      return setIsLiked(false)
    }
  }, [like, user])
  useEffect(() => {
    const timerFunc = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timerFunc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const path = [
    { name: 'home', url: '/', id: 1 },
    { name: '精選推薦', url: '/products', id: 2 },
    {
      name: `${detail.name}`,
      url: `/products/productsDetail/${detail.sid}/${detail.default}`,
      id: 3,
    },
  ]

  return loading ? (
    <SpinnerInProducts loading={loading} name={'li_spinner'} />
  ) : (
    <div className="container-fluid mt-4 li_top li_maxWidth li_mb300">
      <BreadCrumb path={path} />
      <Top
        sid={sid}
        detail={detail}
        color={color}
        size={size}
        setSelectColor={setSelectColor}
        detailImg={detailImg}
        selectColor={selectColor}
        setColorId={setColorId}
        colorId={colorId}
        stock={stock}
        setStock={setStock}
        stockID={stockID}
        setStockID={setStockID}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        like={like}
        setLike={setLike}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        user={user}
        setUser={setUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        itemNumber={itemNumber}
        setItemNumber={setItemNumber}
      />
      {/* <Down /> */}
      <Like
        detail={detail}
        sid={sid}
        setSid={setSid}
        setSelectColor={setSelectColor}
        selectColor={selectColor}
        user={user}
        setShowLogin={setShowLogin}
      />
      <LikeS
        detail={detail}
        sid={sid}
        setSid={setSid}
        setSelectColor={setSelectColor}
        selectColor={selectColor}
      />
    </div>
  )
}

export default withRouter(ProductsDetail)
