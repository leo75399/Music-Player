import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { API_HOST } from '../../config'
import BreadCrumb from './BreadCrumb'
import ProductsCard from './ProductsCard'
// import LiPage from './productCom/LiPage'
// import { useHistory } from 'react-router-dom'
import SpinnerInProducts from './SpinnerInProducts'

const ProductSearchList = (props) => {
  // const history = useHistory()
  const { user, setShowLogin } = props
  const [displayProducts, setDisplayProducts] = useState([])
  const [liData, setLiData] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/search`, {
        params: {
          keyword: props.location.search.split('=')[1],
          page: page,
        },
      })
      setLiData(r.data)
      setDisplayProducts(r.data.rows)
    })()
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.search])
  useEffect(() => {
    const timerFunc = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timerFunc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const path = [
    { name: 'home', url: '/', id: 1 },
    { name: '搜尋結果', url: '/products/search', id: 2 },
  ]
  return loading ? (
    <SpinnerInProducts loading={loading} name={'li_spinner'} />
  ) : (
    <div className="container-fluid li_maxWidth li_mb150 mt-4">
      <BreadCrumb path={path} />
      <h3 className="li_fwb mt-5">
        搜尋結果：{props.location.search.split('=')[1]}
      </h3>
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
        {/* <LiPage liData={liData} page={page} setPage={setPage} /> */}
        {liData.totalRows > page * 16 ? (
          <div className="py-5 li_center li_page">
            <div
              className="p-2 py-lg-3 px-lg-5 mx-3 li-show  li_showAll li_pointer"
              onClick={() => {
                setPage(liData.totalPages)
              }}
            >
              SHOW ALL ({liData.totalRows - page * 16})
            </div>
            <div
              className="p-2 py-lg-3 px-lg-5 mx-3 li-show li_showNext li_pointer "
              onClick={() => {
                setPage(page + 1)
                // history.push({
                //   pathname: '/products/search',
                //   search: `&page=${page}`,
                // })
              }}
            >
              SHOW MORE (16)
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default withRouter(ProductSearchList)
