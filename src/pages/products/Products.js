// eslint-disable-next-line
import React, { useEffect, useState, useRef } from 'react'
import BreadCrumb from './BreadCrumb'
import RecommendLG from './productCom/RecommendLG'
import RecommendS from './productCom/RecommendS'
import FilterLG from './productCom/FilterLG'
import FilterS from './productCom/FilterS'
import LiPage from './productCom/LiPage'
import SpinnerInProducts from './SpinnerInProducts'
import axios from 'axios'
import ProductsCard from './ProductsCard'
import { API_HOST } from './../../config'
// import 'animate.css'
// import { useLocation } from 'react-router-dom'

const Products = (props) => {
  const { user, setShowLogin } = props
  const [featured, setFeatured] = useState([])
  const [displayProducts, setDisplayProducts] = useState([])
  const [liData, setLiData] = useState({})
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const path = [
    { name: 'home', url: '/', id: 1 },
    { name: '精選推薦', url: '/products', id: 2 },
  ]
  const display = (
    <div className="container-fluid li_maxWidth li_mb150 mt-4">
      <BreadCrumb path={path} />
      <RecommendLG featured={featured} />
      <RecommendS featured={featured} />
      <h3 className="li_fwb" id="li_list">
        精選推薦
      </h3>
      <FilterS count={count} />
      <FilterLG
        setPage={setPage}
        page={page}
        setLiData={setLiData}
        setDisplayProducts={setDisplayProducts}
        count={count}
        setCount={setCount}
        // setInsideLoading={setInsideLoading}
        setLoading1={setLoading}
        loading1={loading}
      />
      <div>
        <p className="li_font24 mt-lg-5 mb-0">{liData.totalRows} PRODUCTS</p>
        <div className="row">
          {displayProducts.map((v, i) => {
            return (
              <ProductsCard
                key={v.sid}
                sid={v.sid}
                imgName={v.imgName}
                brandsName={v.brandsName}
                price={v.price}
                name={v.name}
                defaultURL={v.default}
                user={user}
                setShowLogin={setShowLogin}
              />
            )
          })}
        </div>
        <LiPage liData={liData} page={page} setPage={setPage} />
      </div>
    </div>
  )

  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/featured`)
      setFeatured(r.data)
    })()
    const timerFunc = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timerFunc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <SpinnerInProducts loading={loading} name={'li_spinner'} />
  ) : (
    display
  )
}

export default Products
