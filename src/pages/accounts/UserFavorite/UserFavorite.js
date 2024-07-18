import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'
import { API_HOST } from './../../../config'
import classnames from 'classnames'
import styles from './../UserFavorite/UserFavorite.module.scss'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'

const Favorite = (props) => {
  // 這邊需要傳入user的狀態 !
  const { user, setShowAvatar, setIsActive } = props
  const [favoriteData, setFavoriteData] = useState([])
  const [isLiked, setIsLiked] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  let [color] = useState('#e88239')
  let [loading] = useState(true)
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const history = useHistory()
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        let r = await axios.post(
          `http://localhost:3000/products/membersFavorite`,
          {
            id: user.member_sid,
          }
        )
        // setTimeout(() => {
        setFavoriteData(r.data)
        getMember(id)
        setIsActive('追蹤清單')

        // console.log('hi')
        // }, 1000)
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
        return () => {
          clearTimeout()
          setIsLoading('')
          setIsActive('')
          setFavoriteData('')
        }
        // !user.login && history.push('/')
      })()
    } else {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  async function getMember(id) {
    await fetch(API_HOST + '/members/profile/edit/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          setShowAvatar({
            avatar: obj.result.avatar,
            nickname: obj.result.nickname,
          })
        } else {
          console.log(obj.error)
        }
      })
  }

  // -------spin樣式
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `

  const spinner = (
    <div
      className={classnames(
        styles.order_top,
        'd-flex',
        'justify-content-center',
        'pb-4',
        'border-bottom-0'
      )}
    >
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
  // ----------主體------------
  const display = (
    <>
      <h2 className={classnames(styles.order_top, 'pb-4')}>追蹤清單</h2>
      <div className={classnames(styles.order_top_inner, 'd-flex flex-wrap')}>
        {favoriteData.length > 0 ? (
          favoriteData.map((v, i) => {
            return (
              <div
                key={v.id}
                className="li_FCproductCard col-12 col-lg-4 my-3 my-lg-3 li_h500"
              >
                <Link
                  to={
                    '/products/productsDetail/' +
                    v.products_sid +
                    '/' +
                    v.default
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
          })
        ) : (
          <div className="text-center">
            <div className={classnames(styles.noOrder, 'mt-5')}>
              您沒有收藏清單！
            </div>
          </div>
        )}
      </div>
    </>
  )
  return <>{isLoading ? spinner : display}</>
}

export default Favorite
