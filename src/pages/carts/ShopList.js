/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { Cart } from '../../../src/config'
import { Size_Range } from '../../../src/config'
import ReactTooltip from 'react-tooltip'
import Swal from 'sweetalert2'
import Spinner from './Spinner'
import HenryLike from '../products/HenryLike'

function ShopList(props) {
  const { user, setItemNumber } = props
  const successStyle = {
    border: '1px solid var(--success)',
    color: 'var(--success)',
  }
  const failStyle = {
    border: '1px solid var(--error)',
    color: 'var(--error)',
  }
  const [cartData, setCartData] = useState([])

  const [priceSection, setPriceSection] = useState({
    subTotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  })
  const [hintStyle, setHintStyle] = useState({
    discountStyle: {
      text: '未符合折扣活動',
      style: failStyle,
      icon: <i className="fas fa-times-circle"></i>,
    },
    shippingStyle: {
      text: '未符合免運活動',
      style: failStyle,
      icon: <i className="fas fa-times-circle"></i>,
    },
  })
  const [sizeFromProductPage, setSizeFromProductPage] = useState([])
  const [sizeRange, setSizeRange] = useState([])
  const [kind, setKind] = useState(0) //買了幾種商品，讓刪除單樣商品有狀態

  const formatter = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
  })
  const [isLoading, setIsLoading] = useState(true) //spinner
  //讀取購物車的資料
  const getCartData = async () => {
    const r = await axios.get(Cart + `/${user.member_sid}`)
    return r.data
  }
  // const showSpinner = (sec) => {
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, sec)
  // }
  const setPrice = (newST) => {
    const newSubTotal = newST
    const newShipping = newSubTotal >= 4500 ? 0 : 300
    const newDiscount = newSubTotal >= 6000 ? newSubTotal * 0.1 : 0
    const newTotal = newSubTotal + newShipping - newDiscount
    const newPriceSection = {
      ...priceSection,
      subTotal: newSubTotal,
      shipping: newShipping,
      discount: newDiscount,
      total: newTotal,
    }
    setPriceSection(newPriceSection)
  }
  const deleteProduct = async (stock_id, i) => {
    const member_id = user.member_sid
    const dataObj = { member_id, stock_id }
    await fetch(Cart + '/' + stock_id, {
      method: 'DELETE',
      body: JSON.stringify(dataObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await getCartData()
    if (data.length === 0) {
      //購物車商品被刪光，設定為0
      setItemNumber(0)
      props.history.push('/cart')
      return
    } else {
      // Swal.fire({
      //   icon: 'success',
      //   title: '刪除成功',
      //   showConfirmButton: false,
      //   timer: 1000,
      // })
      const quantity = data.reduce((a, b) => a + b.quantity, 0)
      setItemNumber(quantity)
    }
    const newKind = kind - 1
    setKind(newKind)
    //設定剩餘商品數量
    const newQuantity = [...quantity]
    const newUnitSubTotal = [...unitSubTotal]
    const newUnit_price = [...unit_price]
    const j = newQuantity.indexOf(newQuantity[i])
    const k = newUnitSubTotal.indexOf(newUnitSubTotal[i])
    const l = newUnit_price.indexOf(newUnit_price[i])
    if (j > -1) {
      newQuantity.splice(j, 1)
    }
    if (k > -1) {
      newUnitSubTotal.splice(k, 1)
    }
    if (l > -1) {
      newUnit_price.splice(l, 1)
    }
    setQuantity(newQuantity)
    setUnitSubTotal(newUnitSubTotal)
    setUnitPrice(newUnit_price)
    setCartData(data) //購物車裡的商品資料
    const newSubTotal = data.reduce((a, b) => a + b.quantity * b.price, 0)
    setPrice(newSubTotal)
  }

  const onChangeQuantity = async (product_id, stock_id, quantity) => {
    // showSpinner(250)
    await axios.put(Cart + '/quantity/' + product_id, {
      member_id: user.member_sid,
      product_id,
      stock_id,
      quantity,
    })
    const data = await getCartData()
    const q = data.reduce((a, b) => a + b.quantity, 0)
    setItemNumber(q)
  }
  const onBlurQuantity = (newQ, i, newUST) => {
    const newQuantity = [...quantity]
    newQuantity[i] = newQ
    setQuantity(newQuantity)
    const newUnitSubTotal = [...unitSubTotal]
    newUnitSubTotal[i] = newUST
    setUnitSubTotal(newUnitSubTotal)
    const newSubTotal = newQuantity.reduce(
      (a, b, i) => a + b * unit_price[i],
      0
    )
    setPrice(newSubTotal)
  }

  const changeSize = async (stock_id, product_name, i, size, color_id) => {
    const same_size = cartData.filter((v, i) => {
      return v.product_name === product_name && +v.product_size === size
    })
    if (same_size.length > 0) {
      Swal.fire({
        title: '選取目前的尺寸會刪除此商品，並透過另一相同規格商品做更動？',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#000',
        cancelButtonColor: '#e88239',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        focusConfirm: false,
        focusCancel: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const newKind = kind - 1
          setKind(newKind)
          deleteProduct(stock_id, i)
          // showSpinner(250)
        } else {
          //還原下拉選單size顯示
          resetSize(i, sizeFromProductPage[i])
        }
      })
    } else {
      // showSpinner(250)
      await axios.put(Cart + '/size/' + stock_id, {
        member_id: user.member_sid,
        stock_id: stock_id,
        size: size,
        color_id,
      })
      const data = await getCartData()
      const newQuantity = [...quantity]
      newQuantity[i] = 1
      setQuantity(newQuantity)
      setCartData(data)
    }
  }
  const resetSize = (i, size) => {
    const newSize = [...sizeFromProductPage]
    newSize[i] = size
    setSizeFromProductPage(newSize)
  }
  //-------------------------------↓商品數量、單價、單樣商品小計↓-------------------------------
  const [quantity, setQuantity] = useState([])
  const [unit_price, setUnitPrice] = useState([])
  const [unitSubTotal, setUnitSubTotal] = useState([])
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        let quantity
        const data = await getCartData()
        quantity = data.reduce((a, b) => a + b.quantity, 0)
        if (quantity === 0) {
          setItemNumber(0)
          props.history.push('/cart')
        } else {
          const data = await getCartData()
          const newUnit_price = data.map((v) => v.price)
          setUnitPrice(newUnit_price)
          const newUnitSubTotal = data.map((v) => v.quantity * v.price)
          setUnitSubTotal(newUnitSubTotal)
        }
      })()
    } else {
      props.history.push('/')
    }
  }, [])
  //-------------------------------↑商品數量、單樣商品小計↑-------------------------------
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        let quantity
        const data = await getCartData()
        quantity = data.reduce((a, b) => a + b.quantity, 0)
        if (quantity === 0) {
          setItemNumber(0)
          props.history.push('/cart')
        } else {
          const data = await getCartData()
          setCartData(data) //購物車裡的商品資料
          const quantity = data.reduce((a, b) => a + b.quantity, 0)
          setItemNumber(quantity)
          const newQuantity = data.map((v) => v.quantity)
          setQuantity([...newQuantity])
          const newUnitSubTotal = data.map((v) => v.quantity * v.price)
          setUnitSubTotal([...newUnitSubTotal])
          const newSubTotal = data.reduce((a, b) => a + b.quantity * b.price, 0)
          setPrice(newSubTotal)
          //計算商品種類數量
          setKind(data.length)
          const chooseSize = data.map((v) => v.product_size)
          setSizeFromProductPage(chooseSize)
          const res2 = await axios.get(Size_Range + `/${user.member_sid}`)
          setSizeRange(res2.data)
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        }
      })()
    } else {
      props.history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, user])
  //處理提示文字外觀
  useEffect(() => {
    if (priceSection.subTotal >= 6000) {
      const newDiscountStyle = {
        ...hintStyle,
        discountStyle: {
          text: '已符合滿額折扣',
          style: successStyle,
          icon: <i className="fas fa-check-circle mr-2"></i>,
        },
        shippingStyle: {
          text: '已符合免運活動',
          style: successStyle,
          icon: <i className="fas fa-check-circle mr-2"></i>,
        },
      }
      setHintStyle(newDiscountStyle)
    } else if (priceSection.subTotal < 6000 && priceSection.subTotal >= 4500) {
      const newDiscountStyle = {
        ...hintStyle,
        discountStyle: {
          text: '未符合滿額折扣',
          style: failStyle,
          icon: <i className="fas fa-times-circle"></i>,
        },
        shippingStyle: {
          text: '已符合免運活動',
          style: successStyle,
          icon: <i className="fas fa-check-circle mr-2"></i>,
        },
      }
      setHintStyle(newDiscountStyle)
    } else {
      const newDiscountStyle = {
        ...hintStyle,
        discountStyle: {
          text: '未符合折扣活動',
          style: failStyle,
          icon: <i className="fas fa-times-circle"></i>,
        },
        shippingStyle: {
          text: '未符合免運活動',
          style: failStyle,
          icon: <i className="fas fa-times-circle"></i>,
        },
      }
      setHintStyle(newDiscountStyle)
    }
  }, [priceSection.subTotal]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="stepWrapMing fontMing">
        <div className="stepMing">
          <div className="ballMing activeMing">01</div>
          <p className="mt-3">購物清單</p>
        </div>
        <div className="bottomLineMing"></div>
        <div className="stepMing">
          <div className="ballMing">02</div>
          <p className="gray4Ming mt-3">填寫資料</p>
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
          <div className="container fz20Ming fontMing">
            <h4 className="d-lg-block d-none cartTitleMing">購物車清單</h4>
            <div className="row justify-content-between">
              <div className="col-lg-8">
                <div className="d-lg-flex d-none justify-content-between">
                  <div className="productNameMing w70Ming text-center">
                    品名
                  </div>
                  <p className="w15Ming text-center">單價</p>
                  <p className="w15Ming text-center">小計</p>
                </div>
                {cartData.length > 0 &&
                  cartData.map((v, i) => {
                    return (
                      <div
                        className="d-flex justify-content-between itemListMing borderMing"
                        key={i}
                      >
                        <div className="d-flex w70Ming">
                          <div className="productImgMing">
                            <img
                              src={
                                'http://localhost:3000/products_img/colorSelect/' +
                                v.colorImg
                              }
                              alt=""
                            />
                          </div>
                          <div className="productDetailMargin d-flex flex-column justify-content-between">
                            <div className="productNameMing">
                              {v.product_name}
                            </div>
                            <div className="productCategoryMing">
                              {v.product_category}
                            </div>
                            <div className="productColorMing d-lg-block d-none">
                              {v.chinese}
                            </div>
                            <div className="d-flex ">
                              <div>
                                <label
                                  htmlFor="product-size"
                                  className="mb-0
                                "
                                >
                                  尺寸
                                </label>
                                <select
                                  name="product-size"
                                  id=""
                                  className="ml-2 "
                                  value={sizeFromProductPage[i]}
                                  onChange={(e) => {
                                    const selectSize = e.target.value
                                    const newSize = [...sizeFromProductPage]
                                    newSize[i] = selectSize
                                    setSizeFromProductPage(newSize)
                                    changeSize(
                                      v.stock_id,
                                      v.product_name,
                                      i,
                                      +e.target.value,
                                      v.color_id
                                    )
                                  }}
                                >
                                  {sizeRange.map((k, j) => {
                                    if (v.product_name === k.product_name) {
                                      return (
                                        <option value={k.size} key={j}>
                                          {k.size}
                                        </option>
                                      )
                                    }
                                  })}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="" className="ml-2 mb-0">
                                  數量
                                </label>
                                <input
                                  className="text-center amount_input_Ming ml-2"
                                  name="productQuantityMing"
                                  min={1}
                                  type="text"
                                  value={quantity[i] || ''}
                                  onBlur={(e) => {
                                    if (+e.target.value > v.stock) {
                                      Swal.fire({
                                        icon: 'error',
                                        title: `抱歉本商品最多買${v.stock}件`,
                                        // timer: 1500,
                                        showConfirmButton: true,
                                      })
                                      onBlurQuantity(
                                        v.stock,
                                        i,
                                        v.stock * v.price
                                      )
                                      onChangeQuantity(
                                        v.product_id,
                                        v.stock_id,
                                        v.stock
                                      )
                                    } else if (+e.target.value < 1) {
                                      onBlurQuantity(1, i, v.price)
                                      onChangeQuantity(
                                        v.product_id,
                                        v.stock_id,
                                        1
                                      )
                                    } else {
                                      const value = Math.ceil(e.target.value)
                                      onBlurQuantity(value, i, value * v.price)
                                      onChangeQuantity(
                                        v.product_id,
                                        v.stock_id,
                                        +e.target.value
                                      )
                                    }
                                  }}
                                  onChange={(e) => {
                                    const newQuantity = [...quantity]
                                    newQuantity[i] = +e.target.value
                                    setQuantity(newQuantity)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-lg-block d-none w15Ming">
                          <div className="unitPriceMing">
                            <p>
                              {formatter.format(unit_price[i]).slice(0, 1) +
                                ' ' +
                                formatter.format(unit_price[i]).slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="subTotalMing w15Ming">
                          <p>
                            {formatter.format(unitSubTotal[i]).slice(0, 1) +
                              ' ' +
                              formatter.format(unitSubTotal[i]).slice(1)}
                          </p>
                          <i
                            className="far fa-trash-alt trashCanMing"
                            onClick={() => {
                              Swal.fire({
                                title: '確定要刪除此項商品？',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#000',
                                cancelButtonColor: '#e88239',
                                cancelButtonText: '保留',
                                confirmButtonText: '刪除',
                                focusConfirm: false,
                                focusCancel: true,
                                reverseButtons: true,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteProduct(v.stock_id, i)
                                }
                              })
                            }}
                          ></i>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className="col-lg-4 col">
                <div className="d-flex justify-content-between calculate2Ming">
                  <div className="calculateLeft">
                    <p>小計</p>
                    <p>預估運費及手續費</p>
                    <p>滿額折扣</p>
                  </div>

                  <div className="text-right">
                    <p>
                      {formatter.format(priceSection.subTotal).slice(0, 1) +
                        ' ' +
                        formatter.format(priceSection.subTotal).slice(1)}
                    </p>
                    <div className="mb16Ming text-right">
                      <a
                        data-tip
                        data-for="shipHintMing"
                        className="q1Ming d-lg-none d-inline-block"
                      >
                        <i className="far fa-question-circle d-inline-block qesIconMing"></i>
                      </a>
                      <ReactTooltip id="shipHintMing" type="info" place="left">
                        <span>消費金額達NT$ 4500享免運費</span>
                      </ReactTooltip>
                      <span className="team-success pl-1">
                        {formatter.format(priceSection.shipping).slice(0, 1) +
                          ' ' +
                          formatter.format(priceSection.shipping).slice(1)}
                      </span>
                    </div>
                    <div>
                      <a
                        data-tip
                        data-for="discountHintMing"
                        className="q1Ming d-lg-none d-inline-block"
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
                        {formatter.format(priceSection.discount).slice(0, 1) +
                          ' ' +
                          formatter.format(priceSection.discount).slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="separateLineMing"></div>
                <div className="d-flex justify-content-between calculate2Ming">
                  <p>總計</p>
                  <p className="team-primary">
                    {formatter.format(priceSection.total).slice(0, 1) +
                      ' ' +
                      formatter.format(priceSection.total).slice(1)}
                  </p>
                </div>
                <Link className="text-decoration-none" to="/products">
                  <div className="btnMing mx-auto mt-5 btn2Ming">繼續選購</div>
                </Link>
                <Link className="text-decoration-none" to="/checkout">
                  <div className="btnMing mx-auto mt-3 mb100Ming">前往結帳</div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="container fz20Ming mt-5 mb100Ming d-lg-block d-none fontMing">
        <div className="row flex-column p15Ming">
          <div className="discountHintMing">
            <div>{hintStyle.discountStyle.text}</div>
            <div className="d-flex">
              <div
                className="discountBoxMing mt-2"
                style={hintStyle.discountStyle.style}
              >
                {hintStyle.discountStyle.icon}滿額折扣
              </div>
              <div className="my-auto ml-5 conditionMing">
                消費金額達NT$ 6000元享9折優惠
              </div>
            </div>
          </div>
          <div className="freeShipHintMing mt-3">
            <div>{hintStyle.shippingStyle.text}</div>
            <div className="d-flex">
              <div
                className="freeShipBoxMing my-2"
                style={hintStyle.shippingStyle.style}
              >
                {hintStyle.shippingStyle.icon}免運活動
              </div>
              <div className="my-auto ml-5 conditionMing">
                適用於NT$ 4500以上之訂單
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 fontMing li_mb150">
        <HenryLike user={user} />
      </div>
    </>
  )
}

export default withRouter(ShopList)
