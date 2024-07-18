import React, { useState, useEffect } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'
import { Cart } from '../../../src/config'

function FinishOrder(props) {
  const { user, setStore, setShowStore } = props
  const order_id = props.match.params.order_id
  const [orderData, setOrderData] = useState({
    user_name: '',
    created_at: '',
    order_id: '',
    order_status: '',
    product_delivery: '',
    delivery_status: '',
    shipping_address: '',
    user_phone: '',
    email: '',
    payment: '',
    consignee: '',
    consignee_phone: '',
    remark: '',
    sub_total: '',
    discount: '',
    shipping: '',
    total: '',
  })
  const [cartData, setCartData] = useState([])
  useEffect(() => {
    if (!user.login) {
      //沒登入直接轉首頁
      props.history.push('/')
    } else {
      ;(async () => {
        const res1 = await axios.get(
          Cart + `/order/${user.member_sid}/${order_id}`
        )
        if (res1.data.length < 1) {
          props.history.push('/')
          return
        }
        setOrderData(res1.data[0])
        const res2 = await axios.get(
          Cart + `/product/${user.member_sid}/${order_id}`
        )
        setCartData(res2.data) //購物車裡的商品資料
        setStore({ store: '', address: '' }) //清除選取的門市
        setShowStore(false)
      })()
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps
  const formatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
  })
  return (
    <>
      <div className="stepWrapMing fontMing">
        <div className="stepMing">
          <div className="ballMing ">01</div>
          <p className="gray4Ming mt-3">購物清單</p>
        </div>
        <div className="bottomLineMing"></div>
        <div className="stepMing">
          <div className="ballMing">02</div>
          <p className="gray4Ming mt-3">填寫資料</p>
        </div>
        <div className="bottomLineMing"></div>
        <div className="stepMing">
          <div className="ballMing activeMing">03</div>
          <p className="mt-3">完成訂單</p>
        </div>
      </div>
      <Accordion defaultActiveKey="1" className="my-3">
        <Accordion.Toggle
          eventKey="0"
          as={Card}
          border="none"
          className="bNoneMing"
        >
          <div className="container fontMing mt-5">
            <div className="row justify-content-center p-2 thankTitleMing">
              <div className="d-flex flex-column text-center">
                <h2 className="font-weight-bolder thankMing">感謝您的訂購</h2>
                <h4 className="orderNumberMing">
                  訂單編號 :{' '}
                  <span className="team-error">{orderData.order_id}</span>{' '}
                  <i className="fas fa-chevron-down goDownMing pl-2"></i>
                </h4>
              </div>
            </div>
          </div>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0" className="mt-3 fontMing">
          <Card.Body className="p-0">
            <div className="container mt-4">
              <div className="row text-center buyListTitleMing">
                <h4 className="widthLeftMing">品名</h4>
                <h4 className="width20Ming d-lg-block d-none">數量</h4>
                <h4 className="width20Ming d-lg-block d-none">單價</h4>
                <h4 className="widthRightMing">小計</h4>
              </div>
              {cartData.length > 0 &&
                cartData.map((v, i) => {
                  return (
                    <div className="row buyItemMing" key={i}>
                      <div className="d-flex align-items-center widthLeftMing">
                        <div className="productImgMing my-3">
                          <img
                            src={
                              'http://localhost:3000/products_img/colorSelect/' +
                              v.colorImg
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-2 d-flex flex-column">
                          <p className="productNameMing mb55Ming">
                            {v.product_name}
                          </p>
                          <p className="productCategoryMing mb55Ming">
                            {v.product_category}
                          </p>
                          <div className="d-flex">
                            <p className="productSizeMing mb-0">
                              尺寸&nbsp;&nbsp;{v.product_size}
                            </p>
                            <p className="productQuantity d-block d-lg-none pl-3 mb-0">
                              數量&nbsp;&nbsp;{v.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-lg-flex d-none align-items-center justify-content-center width20Ming">
                        <p className="">{v.quantity}</p>
                      </div>

                      <div className="d-lg-flex d-none align-items-center justify-content-center width20Ming">
                        <p className="">
                          {formatter.format(v.price).slice(0, 1) +
                            ' ' +
                            formatter.format(v.price).slice(1)}
                        </p>
                      </div>

                      <div className="d-flex align-items-center justify-content-center widthRightMing">
                        <p>
                          {formatter.format(v.quantity * v.price).slice(0, 1) +
                            ' ' +
                            formatter.format(v.quantity * v.price).slice(1)}
                        </p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
      <div className="container fontMing">
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <div className="d-flex justify-content-between calculate2Ming fz16Ming">
              <div className="calculateLeft">
                <p>小計</p>
                <p>預估運費及手續費</p>
                <p>滿額折扣</p>
              </div>

              <div className="text-right">
                <p>
                  {formatter.format(orderData.sub_total).slice(0, 1) +
                    ' ' +
                    formatter.format(orderData.sub_total).slice(1)}
                </p>
                <div className="mb16Ming">
                  <span className="team-success">
                    {formatter.format(orderData.shipping).slice(0, 1) +
                      ' ' +
                      formatter.format(orderData.shipping).slice(1)}
                  </span>
                </div>
                <div>
                  <span className="team-success">
                    -
                    {formatter.format(orderData.discount).slice(0, 1) +
                      ' ' +
                      formatter.format(orderData.discount).slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="separateLineMing"></div>
            <div
              className="
              d-flex
              justify-content-between
              calculate2Ming
              fz16Ming
            "
            >
              <div className="calculateLeft">
                <p>總計</p>
              </div>
              <p className="team-primary">
                NT{' '}
                {formatter.format(orderData.total).slice(0, 1) +
                  ' ' +
                  formatter.format(orderData.total).slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container fontMing mt-5">
        <h4 className="orderInfoMing">訂單資訊</h4>
        <div className="row justify-content-lg-between">
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex">
              <p className="infoTitleMing">購買人姓名</p>
              <p className="infoContentMing">{orderData.user_name}</p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex">
              <p className="infoTitleMing">購買日期</p>
              <p className="infoContentMing">
                {orderData.order_id.slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex">
              <p className="infoTitleMing">訂單編號</p>
              <p className="infoContentMing">{orderData.order_id}</p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">訂單狀態</p>
              <p className="infoContentMing ">{orderData.order_status}</p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">配送方式</p>
              <p className="infoContentMing ">{orderData.product_delivery}</p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">配送狀態</p>
              <p className="infoContentMing ">{orderData.delivery_status}</p>
            </div>
          </div>
          {orderData.product_delivery === '超商取貨' ? (
            <div className="col-lg-6 col-12 my-1">
              <div className="d-flex ">
                <p className="infoTitleMing">取貨門市</p>
                <p className="infoContentMing ">{orderData.store_name}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">寄件地址</p>
              <p className="infoContentMing ">
                {orderData.product_delivery === '超商取貨'
                  ? orderData.store_address
                  : orderData.shipping_address}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">購買人電話</p>
              <p className="infoContentMing ">{orderData.user_phone}</p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">購買人Email</p>
              <p className="infoContentMing ">{orderData.email}</p>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-1">
            <div className="d-flex ">
              <p className="infoTitleMing">付款方式</p>
              <p className="infoContentMing ">{orderData.payment}</p>
            </div>
          </div>
          {orderData.consignee ? (
            <div className="col-lg-6 col-12 my-1">
              <div className="d-flex ">
                <p className="infoTitleMing">收件人姓名</p>
                <p className="infoContentMing ">{orderData.consignee}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          {orderData.consignee_phone ? (
            <div className="col-lg-6 col-12 my-1">
              <div className="d-flex ">
                <p className="infoTitleMing">收件人電話</p>
                <p className="infoContentMing ">{orderData.consignee_phone}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          {orderData.remark ? (
            <div className="col-lg-6 col-12 my-1">
              <div className="d-flex ">
                <p className="infoTitleMing">備註</p>
                <p className="infoContentMing ">{orderData.remark}</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <Link className="text-decoration-none" to="/">
        <div className="btnToIndexMing mx-auto fontMing">回首頁</div>
      </Link>
    </>
  )
}

export default withRouter(FinishOrder)
