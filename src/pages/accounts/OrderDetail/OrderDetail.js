import React, { useEffect, useState } from 'react'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { API_HOST } from './../../../config'
import { PRODUCT_PATH } from './../../../config'
import moment from 'moment'
import styles from './OrderDetail.module.scss'
import PhoneOrder from './PhoneOrder'

// 子頁面區域元件

function OrderDetail(props) {
  // console.log(props)
  const { setShowAvatar, user, setIsActive } = props
  const { id, order_id } = useParams()

  // const history = useHistory()
  // const orderDetail = window.location.search.replace('?order=', '')
  // console.log(orderDetail)
  let [data, setData] = useState({})
  let [eachProduct, setEachProduct] = useState([])
  const history = useHistory()

  const token = localStorage.getItem('token')
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        if (getMember(id)) {
          getOderDetail()
          setIsActive('歷史訂單')
        }
      })()
    } else {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  async function getOderDetail() {
    await fetch(API_HOST + `/admin/user/detail/${id}/${order_id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          setData(obj.result[0])

          setEachProduct(obj.result)
        } else {
          history.push('/')

          console.log(obj.error)
        }
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
          history.push('/')

          console.log(obj.error)
        }
      })
  }

  return (
    <>
      <div className={classnames(styles.detail_top, 'pb-4')}>訂單細節</div>
      <div className={styles.top_section}>
        {/* product detail */}
        {/* {console.log(eachProduct)} */}
        {eachProduct.map((el, i) => {
          return (
            <div key={i}>
              <div className={classnames(styles.product_list)}>
                <img
                  className={classnames(styles.product_detail_img)}
                  src={PRODUCT_PATH + el.colorImg}
                  alt=""
                />
                <div
                  className={classnames(
                    styles.product_detail,
                    'd-none',
                    'd-lg-block'
                  )}
                >
                  <p>{el.product_name}</p>
                  <p>{el.chinese}</p>
                  <br />
                </div>
                {/* 電腦版 */}
                <div
                  className={classnames(
                    styles.product_detail,
                    'text-center',
                    'd-none',
                    'd-lg-block'
                  )}
                >
                  尺寸：{el.product_size}
                </div>

                <div
                  className={classnames(
                    styles.product_detail,
                    'text-right',
                    'd-none',
                    'd-lg-block'
                  )}
                >
                  數量：{el.quantity}
                </div>
                <div
                  className={classnames(
                    styles.product_detail,
                    'text-right',
                    'd-none',
                    'd-lg-block'
                  )}
                >
                  {el.price}元
                </div>
                {/* 手機版 */}
                <div
                  className={classnames(
                    styles.order_detail_section,
                    'd-lg-none',
                    'mt-4'
                  )}
                >
                  <PhoneOrder
                    key={i}
                    product_name={el.product_name}
                    chinese={el.chinese}
                    product_size={el.product_size}
                    quantity={el.quantity}
                    price={el.price}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* 小計 */}
      <div className={classnames(styles.total)}>
        <div className={classnames('py-3', styles.countSection)}>
          <div className={classnames('d-flex', 'justify-content-between')}>
            <p className={classnames(styles.price, 'text-left')}>小計</p>
            <p className={classnames(styles.price, 'text-right', 'pr-2')}>
              {data.sub_total}元
            </p>
          </div>
          <div className={classnames('d-flex', 'justify-content-between')}>
            <p className={classnames(styles.price, 'text-left')}>運費</p>
            <p className={classnames(styles.price, 'text-right', 'pr-2')}>
              {data.shipping}元
            </p>
          </div>
          <div className={classnames('d-flex', 'justify-content-between')}>
            <p className={classnames(styles.price, 'text-left')}>折扣</p>
            <p className={classnames(styles.price, 'text-right', 'pr-2')}>
              {data.discount}元
            </p>
          </div>
        </div>
        <div
          className={classnames('d-flex', 'justify-content-between', 'py-3')}
        >
          <p className={classnames(styles.price, 'text-left')}>總計</p>
          <p className={classnames(styles.price, 'text-right', 'pr-2')}>
            {data.total}元
          </p>
        </div>
      </div>
      <div className={classnames(styles.order_detail_section)}>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>購買人姓名</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.user_name}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>訂單編號</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.order_id}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>配送方式</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.product_delivery}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>寄件地址</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.shipping_address}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>購買人信箱</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.email}</span>
          </p>
        </div>
        <div
          className={classnames(
            data.consignee == null ? 'd-none' : 'd-flex',
            // 'd-flex',
            'justify-content-between'
            // 'd-none'
          )}
        >
          <p className={classnames(styles.price)}>收件人姓名</p>

          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}></span>
            {data.consignee}
            {/* {console.log(data.consignee)} */}
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>購買日期</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>
              {moment(data.created_at).format('YYYY-MM-DD')}
            </span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>訂單狀態</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.order_status}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>配送狀態</p>

          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.delivery_status}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>購買人電話</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.user_phone}</span>
          </p>
        </div>
        <div className={classnames('d-flex', 'justify-content-between')}>
          <p className={classnames(styles.price)}>付款方式</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.payment}</span>
          </p>
        </div>
        <div
          className={classnames(
            data.consignee_phone == null ? 'd-none' : 'd-flex',
            'justify-content-between'
          )}
        >
          <p className={classnames(styles.price)}>收件人電話</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.consignee_phone}</span>
          </p>
        </div>
        <div
          className={classnames(
            data.remark == null ? 'd-none' : 'd-flex',
            'justify-content-between'
          )}
        >
          <p className={classnames(styles.price)}>備註</p>
          <p className={classnames(styles.order_detail)}>
            <span className={classnames('pl-2')}>{data.remark}</span>
          </p>
        </div>
      </div>
      <div className={classnames(styles.back)}>
        <button
          className={classnames('btn', 'btn-primary')}
          onClick={() => {
            //導向首頁
            history.push(`/admin/user/order/${id}`)
          }}
        >
          回到上一頁
        </button>
      </div>
    </>
  )
}

export default withRouter(OrderDetail)
