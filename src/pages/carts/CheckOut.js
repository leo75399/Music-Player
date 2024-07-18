/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Cart } from '../../../src/config'
import ReactTooltip from 'react-tooltip'
import { API_HOST } from '../../config'
import CreditCard from './CreditCard'
import Swal from 'sweetalert2'
import ChooseStore from './ChooseStore'
import Spinner from './Spinner'
//------------------------------------------------------------------------
function CheckOut(props) {
  const { user, store, setStore, showStore, setShowStore, setItemNumber } =
    props
  const [price, setPrice] = useState({
    sub_total: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  })
  const [fields, setFields] = useState({
    member_id: user.member_sid,
    order_id: '',
    user_name: '',
    user_phone: '',
    email: '',
    order_status: '',
    shipping_address: '',
    product_delivery: '',
    store_name: '',
    store_address: '',
    payment: '',
    consignee: '',
    consignee_phone: '',
    remark: '',
  })
  const [cartData, setCartData] = useState([])
  const [check, setCheck] = useState(false)
  const [showCC, setShowCC] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [memberData, setMemberDate] = useState({
    user_name: '',
    user_phone: '',
    email: '',
    shipping_address: '',
  })
  const [stock_id_and_price, setStock_id_and_price] = useState([])
  const [stock_id_and_buyAmount, setStock_id_and_buyAmount] = useState([])
  const [isLoading, setIsLoading] = useState(true) //spinner
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        let quantity
        const r = await axios.get(Cart + `/${user.member_sid}`)
        quantity = r.data.reduce((a, b) => a + b.quantity, 0)
        if (quantity === 0) {
          //有登入，但購物車沒東西轉首頁
          setItemNumber(0)
          props.history.push('/')
        } else {
          const res1 = await axios.get(Cart + `/${user.member_sid}`)
          setCartData(res1.data)
          const newStock_id_and_price = []
          const newStock_id_and_buyAmount = []
          for (let i = 0; i < res1.data.length; i++) {
            newStock_id_and_price.push({
              stock_id: res1.data[i].stock_id,
              price: res1.data[i].price,
            })
            newStock_id_and_buyAmount.push({
              stock_id: res1.data[i].stock_id,
              quantity: res1.data[i].quantity,
            })
          }
          setStock_id_and_price(newStock_id_and_price)
          setStock_id_and_buyAmount(newStock_id_and_buyAmount)
          const newSub_total = res1.data.reduce(
            (a, b) => a + b.quantity * b.price,
            0
          )
          const newShipping = newSub_total >= 4500 ? 0 : 300
          const newDiscount = newSub_total >= 6000 ? newSub_total * 0.1 : 0
          const newTotal = newSub_total + newShipping - newDiscount
          const newPrice = {
            ...price,
            sub_total: newSub_total,
            shipping: newShipping,
            discount: newDiscount,
            total: newTotal,
          }
          setPrice(newPrice)

          if (res1.data.length !== 0) {
            const newFields = {
              ...fields,
              sub_total: newSub_total,
              discount: newDiscount,
              shipping: newShipping,
              total: newTotal,
            }
            setFields(newFields)
          }
          const res2 = await axios.get(Cart + `/member/${user.member_sid}`)
          if (res2.data) {
            const newMemberData = {
              ...memberData,
              user_name: res2.data.name,
              user_phone: res2.data.mobile,
              email: res2.data.email,
              shipping_address: res2.data.address,
            }
            const newFields = {
              ...fields,
              user_name: res2.data.name,
              user_phone: res2.data.mobile,
              email: res2.data.email,
              shipping_address: res2.data.address,
            }
            setMemberDate(newMemberData)
            setFields(newFields)
          }
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        }
      })()
    } else {
      //沒登入直接轉首頁
      props.history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const formatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
  })
  //產生隨機訂單編號
  function makeOrderId(length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    const today = new Date()
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return (
      //toLocaleString:1~9號沒辦法得到01~09
      today.toISOString().substring(0, 10).replaceAll('/', '-') + '-' + result
    )
  }
  //產生訂單時間，寄信要用的
  function order_time() {
    const today = new Date()
    const date =
      today.toISOString().substring(0, 10).replaceAll('/', '-') +
      '  ' +
      today.toLocaleString().substring(10)
    return date
  }
  const handleMemberDataChange = (e) => {
    const newMemberData = {
      ...memberData,
    }
    setMemberDate({ ...newMemberData, [e.target.name]: e.target.value })
    const newFields = { ...fields, [e.target.name]: e.target.value }
    setFields(newFields)
  }
  const handleFieldChange = (e) => {
    const value = e.target.value
    let updatedFields = { ...fields }
    if (value === '超商取貨') {
      setShowStore(true)
    } else if (value === '宅配到府') {
      setShowStore(false)
    }
    if (value === '貨到付款') {
      updatedFields['order_status'] = '尚未付款'
      updatedFields['payment'] = '貨到付款'
      setFields(updatedFields)
      return
    } else if (value === '信用卡付款') {
      updatedFields['order_status'] = '已付款'
      updatedFields['payment'] = '信用卡付款'
      setFields(updatedFields)
      return
    }
    setFields({ ...updatedFields, [e.target.name]: e.target.value })
  }
  // ---------------------------------↓ 欄位檢查 ↓---------------------------------
  const [fieldErrors, setFieldErrors] = useState({
    user_name: '',
    user_phone: '',
    email: '',
    shipping_address: '',
    consignee: '',
    consignee_phone: '',
  })
  const [showHint, setShowHint] = useState({
    user_name: false,
    user_phone: false,
    email: false,
    shipping_address: false,
    consignee: false,
    consignee_phone: false,
  })
  const inputCheck = (e) => {
    const target = e.target.name
    let value = e.target.value
    const phoneReg = /^09\d{2}-?\d{3}-?\d{3}$/
    const emailReg =
      /^\w{1,63}@[a-zA-Z0-9]{2,63}\.[a-zA-Z]{2,63}(\.[a-zA-Z]{2,63})?$/
    switch (target) {
      case 'user_name':
        value = value.replace(/ /g, '')
        if (!value) {
          setFieldErrors({
            ...fieldErrors,
            user_name: '請輸入您的大名',
          })
          setShowHint({
            ...showHint,
            user_name: true,
          })
        } else {
          const updatedFieldErrors = { ...fieldErrors, user_name: '' }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            user_name: false,
          })
        }
        break
      case 'user_phone':
        if (!value || !phoneReg.test(value)) {
          setFieldErrors({
            ...fieldErrors,
            user_phone: '請輸入正確的手機格式',
          })
          setShowHint({
            ...showHint,
            user_phone: true,
          })
        } else {
          const updatedFieldErrors = { ...fieldErrors, user_phone: '' }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            user_phone: false,
          })
        }
        break
      case 'email':
        if (!value || !emailReg.test(value)) {
          setFieldErrors({
            ...fieldErrors,
            email: '請輸入正確的email格式',
          })
          setShowHint({
            ...showHint,
            email: true,
          })
        } else {
          const updatedFieldErrors = { ...fieldErrors, email: '' }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            email: false,
          })
        }
        break
      case 'shipping_address':
        if (!value) {
          setFieldErrors({
            ...fieldErrors,
            shipping_address: '請輸入欲收件的地址',
          })
          setShowHint({
            ...showHint,
            shipping_address: true,
          })
        } else {
          const updatedFieldErrors = { ...fieldErrors, shipping_address: '' }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            shipping_address: false,
          })
        }
        break
      case 'consignee':
        if (!value) {
          setFieldErrors({
            ...fieldErrors,
            consignee: '請輸入收件人姓名',
          })
          setShowHint({
            ...showHint,
            consignee: true,
          })
        } else {
          const updatedFieldErrors = { ...fieldErrors, consignee: '' }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            consignee: false,
          })
        }
        break
      case 'consignee_phone':
        if (!value || !phoneReg.test(value)) {
          setFieldErrors({
            ...fieldErrors,
            consignee_phone: '請輸入正確的手機格式',
          })
          setShowHint({
            ...showHint,
            consignee_phone: true,
          })
        } else {
          const updatedFieldErrors = { ...fieldErrors, consignee_phone: '' }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            consignee_phone: false,
          })
        }
        break
      case 'checkbox':
        //新增聯絡人取消後關閉提示字
        if (check) {
          const updatedFieldErrors = {
            ...fieldErrors,
            consignee: '',
            consignee_phone: '',
          }
          setFieldErrors(updatedFieldErrors)
          setShowHint({
            ...showHint,
            consignee: false,
            consignee_phone: false,
          })
          handleCheckBox()
        }
        break
      default:
    }
  }
  //新增聯絡人取消後清除欄位內容
  const handleCheckBox = () => {
    const updatedFields = {
      ...fields,
      consignee: '',
      consignee_phone: '',
      remark: '',
    }
    setFields(updatedFields)
    setTimeout(() => {
      //直接clearConsignee()，無法清除欄位
      // clearConsignee()
    }, 100)
  }
  // ---------------------------------↑ 欄位檢查 ↑---------------------------------

  //送出訂單
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errorArray = Object.values(fieldErrors)
    for (let i = 0; i < errorArray.length; i++) {
      if (errorArray[i] !== '') {
        const inputList = [
          'user_name',
          'user_phone',
          'email',
          'shipping_address',
        ]
        document.querySelector(`#${inputList[i]}`).focus()
        return
      }
    }
    const r1 = await axios.get(Cart + `/${user.member_sid}`)
    const order_id = makeOrderId(10) //建立訂單編號
    fields.order_id = order_id
    const newSub_total = r1.data.reduce((a, b) => a + b.quantity * b.price, 0)
    const newShipping = newSub_total >= 4500 ? 0 : 300
    const newDiscount = newSub_total >= 6000 ? newSub_total * 0.1 : 0
    const newTotal = newSub_total + newShipping - newDiscount

    const newFields = {
      ...fields,
      store_name: store.store,
      store_address: store.address,
      sub_total: newSub_total,
      discount: newDiscount,
      shipping: newShipping,
      total: newTotal,
    }
    if (newFields.consignee === '') {
      //新增聯絡人取消後清除fields物件裡的新增聯絡人kv
      delete newFields.consignee
      delete newFields.consignee_phone
      delete newFields.remark
    }
    const date = order_time()
    const data1 = r1.data
    const quantity = data1.map((v) => v.quantity)
    const product_name = data1.map((v) => v.product_name)
    const price = data1.map((v) => v.price)
    const mailData = { ...newFields, date, quantity, product_name, price }

    const r2 = await axios.post(Cart + '/order', newFields) //在資料庫建立訂單
    const data2 = r2.data
    if (data2 === '購買人手機格式錯誤') {
      Swal.fire({
        icon: 'warning',
        title: '訂單成立失敗',
        text: '購買人手機格式錯誤!',
        confirmButtonColor: '#d43212',
      })
      return
    } else if (data2 === '收件人手機格式錯誤') {
      Swal.fire({
        icon: 'warning',
        title: '訂單成立失敗',
        text: '收件人手機格式錯誤!',
        confirmButtonColor: '#d43212',
      })
      return
    } else if (data2 === 'email格式錯誤') {
      Swal.fire({
        icon: 'warning',
        title: '訂單成立失敗',
        text: 'email格式錯誤!',
        confirmButtonColor: '#d43212',
      })
      return
    } else if (data2 === '請確認是否有未填寫之欄位') {
      Swal.fire({
        icon: 'warning',
        title: '訂單成立失敗',
        text: '請確認是否有未填寫之欄位!',
        confirmButtonColor: '#d43212',
      })
      return
    } else if (data2 === '請選取取貨門市') {
      Swal.fire({
        icon: 'warning',
        title: '訂單成立失敗',
        text: '請選取取貨門市!',
        confirmButtonColor: '#d43212',
      })
      return
    }
    if (data2.affectedRows > 0) {
      setIsLoading(true)
      await axios.put(Cart + '/stock', stock_id_and_buyAmount) //清除庫存
      await axios.put(Cart, {
        member_id: user.member_sid,
        order_id,
        stock_id_and_price,
      }) //建立訂單id與下單時的商品價格
      await axios.put(Cart + `/member/${user.member_sid}`, memberData) //更新購買人資料
      setTimeout(() => {
        setIsLoading(false)
        setItemNumber(0)
        props.history.push(`/finishOrder/${order_id}`) //連結到感謝訂購頁面
      }, 2500)
      await axios.post(API_HOST + '/mail', mailData) //寄信給買家
    } else {
      Swal.fire({
        icon: 'warning',
        title: '訂單成立失敗',
        confirmButtonColor: '#d43212',
      })
      return
    }
  }
  //---------------------------------------------------------------

  return (
    <>
      <div className="stepWrapMing fontMing">
        <div className="stepMing">
          <div className="ballMing">01</div>
          <p className="gray4Ming mt-3">購物清單</p>
        </div>
        <div className="bottomLineMing"></div>
        <div className="stepMing">
          <div className="ballMing activeMing">02</div>
          <p className="mt-3">填寫資料</p>
        </div>
        <div className="bottomLineMing"></div>
        <div className="stepMing">
          <div className="ballMing">03</div>
          <p className="gray4Ming mt-3">完成訂單</p>
        </div>
      </div>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <Accordion defaultActiveKey="1" className="my-3 fontMing">
            <div className="d-block d-lg-none ">
              <div className="d-flex justify-content-center ">
                <Accordion.Toggle eventKey="0" as={Card} border="none">
                  <div className="unfoldBtnMing btn btn-primary">
                    展開明細 <i className="fas fa-plus"></i>
                  </div>
                </Accordion.Toggle>
              </div>
            </div>

            <Accordion.Collapse eventKey="0" className="mt-3 fontMing">
              <div className="d-block d-lg-none">
                <div className="container ">
                  {cartData.length > 0 &&
                    cartData.map((v, i) => {
                      return (
                        <div
                          className="d-flex justify-content-between fz16Ming borderMing"
                          key={i}
                        >
                          <div className="d-flex pb-2">
                            <div className="productImgMing ">
                              <img
                                src={
                                  'http://localhost:3000/products_img/colorSelect/' +
                                  v.colorImg
                                }
                                alt=""
                              />
                            </div>
                            <div className="productDetailMing ml-4">
                              <div className="d-flex flex-column justify-content-between">
                                <p className="productNameMing mb-0">
                                  {v.product_name}
                                </p>
                                <p className="productCategoryMing my-2">
                                  {v.product_category}
                                </p>
                                <div className="d-flex">
                                  <p className="mb-0 ">尺寸 {v.product_size}</p>
                                  <p className="ml-3 mb-0 ">
                                    數量 {v.quantity}
                                  </p>
                                </div>
                              </div>

                              <p className="d-lg-block d-none">
                                {formatter
                                  .format(v.price * v.quantity)
                                  .slice(0, 1) +
                                  ' ' +
                                  formatter
                                    .format(v.price * v.quantity)
                                    .slice(1)}
                              </p>
                            </div>
                          </div>
                          <p className="">
                            {formatter
                              .format(v.price * v.quantity)
                              .slice(0, 1) +
                              ' ' +
                              formatter.format(v.price * v.quantity).slice(1)}
                          </p>
                        </div>
                      )
                    })}
                </div>
              </div>
            </Accordion.Collapse>
          </Accordion>
          <div className="container fontMing mb100Ming">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <h4 className="formTitleMing">訂購人資料</h4>
                <form
                  className="d-flex flex-column formLiu"
                  onSubmit={handleSubmit}
                  name="form1"
                >
                  <label htmlFor="user_name" className="formLabelMing">
                    姓名 <span className="starMing"> *</span>
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    value={memberData.user_name ? memberData.user_name : ''}
                    onChange={handleMemberDataChange}
                    required
                    className="form-control formInputMing"
                    onBlur={(event) => inputCheck(event)}
                  />
                  {/* {fieldErrors.user_name !== '' && (
                <div className="team-error">{fieldErrors.user_name}</div>
              )} */}
                  <div
                    className={
                      showHint.user_name
                        ? 'formInputMing team-error'
                        : 'formInputMing team-error invisible'
                    }
                  >
                    請輸入您的姓名
                  </div>
                  <label htmlFor="user_phone" className="formLabelMing">
                    手機 <span className="starMing"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control formInputMing"
                    name="user_phone"
                    id="user_phone"
                    value={memberData.user_phone ? memberData.user_phone : ''}
                    onChange={handleMemberDataChange}
                    required
                    onBlur={(event) => inputCheck(event)}
                  />
                  <div
                    className={
                      showHint.user_phone
                        ? 'formInputMing team-error'
                        : 'formInputMing team-error invisible'
                    }
                  >
                    請輸入正確的手機格式
                  </div>
                  {/* {fieldErrors.user_phone !== '' && (
                <div className="team-error">{fieldErrors.user_phone}</div>
              )} */}
                  <label htmlFor="email" className="formLabelMing">
                    電子郵件 <span className="starMing"> *</span>
                  </label>
                  <input
                    type="email"
                    className="form-control formInputMing"
                    name="email"
                    id="email"
                    value={memberData.email ? memberData.email : ''}
                    onChange={handleMemberDataChange}
                    required
                    onBlur={(event) => inputCheck(event)}
                  />
                  <div
                    className={
                      showHint.email
                        ? 'formInputMing team-error'
                        : 'formInputMing team-error invisible'
                    }
                  >
                    請輸入正確的email格式
                  </div>
                  {/* {fieldErrors.email !== '' && (
                <div className="team-error">{fieldErrors.email}</div>
              )} */}
                  <label htmlFor="shipping_address" className="formLabelMing">
                    聯絡地址 <span className="starMing"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control formInputMing"
                    name="shipping_address"
                    id="shipping_address"
                    value={
                      memberData.shipping_address
                        ? memberData.shipping_address
                        : ''
                    }
                    onChange={handleMemberDataChange}
                    required
                    onBlur={(event) => inputCheck(event)}
                  />
                  <div
                    className={
                      showHint.shipping_address
                        ? 'formInputMing team-error'
                        : 'formInputMing team-error invisible'
                    }
                  >
                    請輸入欲收件的地址
                  </div>
                  {/* {fieldErrors.shipping_address !== '' && (
                <div className="team-error">{fieldErrors.shipping_address}</div>
              )} */}
                  <ChooseStore
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setStore={setStore}
                  />
                  <label className="formLabelMing">
                    配送方式 <span className="starMing"> *</span>
                  </label>
                  <select
                    name="product_delivery"
                    className="form-control formInputMing pretty-select-Ming"
                    // style={{ height: '55px' }}
                    value={fields.product_delivery}
                    onChange={(e) => {
                      handleFieldChange(e)
                      if (e.target.value === '超商取貨') {
                        setShowModal(true)
                      } else if (e.target.value === '宅配到府') {
                        setStore({ store: '', address: '' })
                      }
                    }}
                    required
                  >
                    <option value="" disabled defaultValue>
                      - - 請選擇 - -
                    </option>
                    <option value="超商取貨">超商取貨</option>
                    <option value="宅配到府">宅配到府</option>
                  </select>

                  {showStore ? (
                    <>
                      <label className="formLabelMing mt-3">
                        取貨門市 <span className="starMing"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control formInputMing"
                        name="store"
                        id="store"
                        value={
                          store.store === ''
                            ? ''
                            : `${store.store}門市, ${store.address}`
                        }
                        readOnly
                        required
                      />
                    </>
                  ) : null}
                  <div className="formInputMing team-error invisible">
                    墊高用
                  </div>
                  <label className="formLabelMing">
                    付款方式 <span className="starMing"> *</span>
                  </label>

                  <CreditCard showCC={showCC} setShowCC={setShowCC} />
                  <select
                    name="payment"
                    id="choosePayMing"
                    className="form-control formInputMing pretty-select-Ming"
                    // style={{ height: '55px' }}
                    value={fields.payment}
                    required
                    onChange={(e) => {
                      handleFieldChange(e)
                      if (e.target.value === '信用卡付款') {
                        setShowCC(true)
                      }
                    }}
                  >
                    <option value="" disabled defaultValue>
                      - - 請選擇 - -
                    </option>
                    <option value="貨到付款">貨到付款</option>
                    <option value="信用卡付款">信用卡付款</option>
                  </select>
                  <div className="d-flex my-3">
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="form-control checkMing"
                      style={{ width: '16px', height: '16px' }}
                      checked={check}
                      onChange={(event) => {
                        inputCheck(event)
                        setCheck(event.target.checked)
                      }}
                    />
                    <p className="consigneeTitleMing fz20Ming">
                      新增收件人資料
                    </p>
                  </div>
                  <input
                    type="text"
                    className="form-control formInputMing consigneeMing"
                    placeholder="請輸入收件人姓名"
                    name="consignee"
                    value={fields.consignee}
                    onChange={handleFieldChange}
                    onBlur={(event) => inputCheck(event)}
                    disabled={check ? false : true}
                    required
                    style={{ marginBottom: '0px' }}
                  />
                  <div
                    className={
                      showHint.consignee
                        ? 'formInputMing team-error'
                        : 'formInputMing team-error invisible'
                    }
                    style={{ marginBottom: '16px' }}
                  >
                    請輸入收件人姓名
                  </div>
                  <input
                    type="text"
                    className="form-control formInputMing consigneeMing"
                    placeholder="請輸入收件人電話"
                    name="consignee_phone"
                    value={fields.consignee_phone}
                    onChange={handleFieldChange}
                    onBlur={(event) => inputCheck(event)}
                    disabled={check ? false : true}
                    required
                    style={{ marginBottom: '0px' }}
                  />
                  <div
                    className={
                      showHint.consignee_phone
                        ? 'formInputMing team-error'
                        : 'formInputMing team-error invisible'
                    }
                    style={{ marginBottom: '16px' }}
                  >
                    請輸入正確的手機格式
                  </div>
                  <textarea
                    name="remark"
                    className="form-control formInputMing consigneeMing"
                    placeholder="請輸入備註事項(選填)"
                    value={fields.remark}
                    onChange={handleFieldChange}
                    disabled={check ? false : true}
                  ></textarea>
                  <button
                    type="submit"
                    style={{ display: 'none' }}
                    id="hand_over_order_list"
                    // onClick={handleSubmit}
                  ></button>
                </form>
                <div
                  className="btnMing mx-auto mb55Ming"
                  onClick={() =>
                    document.querySelector('#hand_over_order_list').click()
                  }
                >
                  送出訂單
                </div>
              </div>
              <div className="col-lg-5 orderMing">
                <h4 className="d-lg-block d-none abstractMing">訂單摘要</h4>
                <div className="d-flex justify-content-between calculate2Ming fz16Ming">
                  <div className="calculateLeft">
                    <p>小計</p>
                    <p>預估運費及手續費</p>
                    <p>滿額折扣</p>
                  </div>

                  <div className="text-right">
                    <p>
                      {formatter.format(price.sub_total).slice(0, 1) +
                        ' ' +
                        formatter.format(price.sub_total).slice(1)}
                    </p>
                    <div className="mb16Ming">
                      <a data-tip data-for="shipHintMing" className="q1Ming">
                        <i className="far fa-question-circle d-inline-block qesIconMing"></i>
                      </a>
                      <ReactTooltip id="shipHintMing" type="info" place="left">
                        <span>消費金額達NT$ 4500享免運費</span>
                      </ReactTooltip>
                      <span className="team-success pl-1">
                        {formatter.format(price.shipping).slice(0, 1) +
                          ' ' +
                          formatter.format(price.shipping).slice(1)}
                      </span>
                    </div>
                    <div>
                      <a
                        data-tip
                        data-for="discountHintMing"
                        className="q1Ming"
                      >
                        <i className="far fa-question-circle d-inline-block qesIconMing"></i>
                      </a>
                      <ReactTooltip
                        id="discountHintMing"
                        type="info"
                        place="left"
                      >
                        <span>消費金額達NT$ 6000享9折優惠</span>
                      </ReactTooltip>
                      <span className="team-success pl-1">
                        {formatter.format(price.discount).slice(0, 1) +
                          ' ' +
                          formatter.format(price.discount).slice(1)}
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
                  <div className="calculateLeft mb-5">
                    <p>總計</p>
                  </div>
                  <p className="team-primary">
                    NT{' '}
                    {formatter.format(price.total).slice(0, 1) +
                      ' ' +
                      formatter.format(price.total).slice(1)}
                  </p>
                </div>
                {cartData.length > 0 &&
                  cartData.map((v, i) => {
                    return (
                      <div className="d-lg-block d-none mb-3" key={i}>
                        <div className="d-flex  fz16Ming">
                          <div className="productImgMing">
                            <img
                              src={
                                'http://localhost:3000/products_img/colorSelect/' +
                                v.colorImg
                              }
                              alt=""
                            />
                          </div>
                          <div className="productDetailMing ml-4">
                            <p className="productNameMing">{v.product_name}</p>
                            <p className="productCategoryMing ">
                              {v.product_category}
                            </p>
                            <p>尺寸 {v.product_size}</p>
                            <p>數量 {v.quantity}</p>
                            <p className="d-lg-block d-none mb-0">
                              {formatter
                                .format(v.price * v.quantity)
                                .slice(0, 1) +
                                ' ' +
                                formatter.format(v.price * v.quantity).slice(1)}
                            </p>
                          </div>
                          <p className="d-block d-lg-none">
                            {formatter
                              .format(v.price * v.quantity)
                              .slice(0, 1) +
                              ' ' +
                              formatter.format(v.price * v.quantity).slice(1)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default withRouter(CheckOut)
