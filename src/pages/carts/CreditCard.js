import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import '../../styles/Henry/CreditCard.scss'
import Swal from 'sweetalert2'

function CreditCard(props) {
  const { showCC, setShowCC } = props
  const handleClose = () => setShowCC(false)
  const [colInfo, setColInfo] = useState({
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    name: '',
    month: '',
    year: '',
    ccv: '',
  })
  const [focus, setFocus] = useState({
    column2: false,
    column3: false,
    column4: false,
    name: false,
  })
  const focusState = {
    column2: false,
    column3: false,
    column4: false,
    name: false,
  }
  const [CCVStatus, setCCVStatus] = useState(false)
  useEffect(() => {
    const card_number_1 = document.querySelector('#card-number-1')
    const card_number_2 = document.querySelector('#card-number-2')
    const card_number_3 = document.querySelector('#card-number-3')
    const card_holder = document.querySelector('#card-holder')

    if (focus.column2) {
      card_number_1.focus()
    } else if (focus.column3) {
      card_number_2.focus()
    } else if (focus.column4) {
      card_number_3.focus()
    } else if (focus.name) {
      card_holder.focus()
    }
  }, [focus])
  return (
    <>
      <Modal
        show={showCC}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>請輸入信用卡資訊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="checkoutMing ">
            <div
              className={
                CCVStatus
                  ? 'credit-card-box-Ming hover'
                  : 'credit-card-box-Ming'
              }
            >
              <div className="flip-Ming">
                <div className="front-Ming">
                  <div className="chipMing">
                    <div className="chip-line-Ming"></div>
                    <div className="chip-line-Ming"></div>
                    <div className="chip-line-Ming"></div>
                    <div className="chip-line-Ming"></div>
                    <div className="chip-main-Ming"></div>
                  </div>
                  <svg
                    className="waveMing"
                    viewBox="0 3.71 26.959 38.787"
                    width="26.959"
                    height="38.787"
                    fill="white"
                  >
                    <path d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z"></path>
                    <path d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z"></path>
                    <path d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z"></path>
                  </svg>
                  <div className="logo-Ming">
                    <svg
                      version="1.1"
                      id="visa"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="47.834px"
                      height="47.834px"
                      viewBox="0 0 47.834 47.834"
                      style={{ enableBackground: 'new 0 0 47.834 47.834' }}
                    >
                      <g>
                        <g>
                          <path
                            d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                         c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                         c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                         M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                         c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                         c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                         l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                         C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                         C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                         c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                         h-3.888L19.153,16.8z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="numberMing">
                    {colInfo.column1} {colInfo.column2} {colInfo.column3}{' '}
                    {colInfo.column4}
                  </div>
                  <div className="card-holder-Ming">
                    <label>Card Holder</label>
                    <div className="nameMing">{colInfo.name}</div>
                  </div>
                  <div className="card-expiration-date-Ming">
                    <label>Expires</label>
                    <div className="expiresDateMing">
                      {colInfo.month} / {colInfo.year}
                    </div>
                  </div>
                </div>
                <div className="backMing">
                  <div className="stripMing"></div>
                  <div className="logo-Ming">
                    <svg
                      version="1.1"
                      id="visa"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="47.834px"
                      height="47.834px"
                      viewBox="0 0 47.834 47.834"
                      style={{ enableBackground: 'new 0 0 47.834 47.834' }}
                    >
                      <g>
                        <g>
                          <path
                            d="M44.688,16.814h-3.004c-0.933,0-1.627,0.254-2.037,1.184l-5.773,13.074h4.083c0,0,0.666-1.758,0.817-2.143
                         c0.447,0,4.414,0.006,4.979,0.006c0.116,0.498,0.474,2.137,0.474,2.137h3.607L44.688,16.814z M39.893,26.01
                         c0.32-0.819,1.549-3.987,1.549-3.987c-0.021,0.039,0.317-0.825,0.518-1.362l0.262,1.23c0,0,0.745,3.406,0.901,4.119H39.893z
                         M34.146,26.404c-0.028,2.963-2.684,4.875-6.771,4.875c-1.743-0.018-3.422-0.361-4.332-0.76l0.547-3.193l0.501,0.228
                         c1.277,0.532,2.104,0.747,3.661,0.747c1.117,0,2.313-0.438,2.325-1.393c0.007-0.625-0.501-1.07-2.016-1.77
                         c-1.476-0.683-3.43-1.827-3.405-3.876c0.021-2.773,2.729-4.708,6.571-4.708c1.506,0,2.713,0.31,3.483,0.599l-0.526,3.092
                         l-0.351-0.165c-0.716-0.288-1.638-0.566-2.91-0.546c-1.522,0-2.228,0.634-2.228,1.227c-0.008,0.668,0.824,1.108,2.184,1.77
                         C33.126,23.546,34.163,24.783,34.146,26.404z M0,16.962l0.05-0.286h6.028c0.813,0.031,1.468,0.29,1.694,1.159l1.311,6.304
                         C7.795,20.842,4.691,18.099,0,16.962z M17.581,16.812l-6.123,14.239l-4.114,0.007L3.862,19.161
                         c2.503,1.602,4.635,4.144,5.386,5.914l0.406,1.469l3.808-9.729L17.581,16.812L17.581,16.812z M19.153,16.8h3.89L20.61,31.066
                         h-3.888L19.153,16.8z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="ccvMing">
                    <label>CCV</label>
                    <div className="ccvNumberMing">{colInfo.ccv}</div>
                    <div className="nameBackMing">{colInfo.name}</div>
                  </div>
                </div>
              </div>
            </div>
            <form className="form-Ming" autoComplete="off" formNoValidate>
              <fieldset>
                <label htmlFor="card-number">信用卡卡號</label>
                <div className="d-flex justify-content-between">
                  <input
                    type="num"
                    id="card-number"
                    className="input-cart-number-Ming"
                    maxLength="4"
                    value={colInfo.column1}
                    onChange={(e) => {
                      const newColInfo = { ...colInfo, column1: e.target.value }
                      setColInfo(newColInfo)
                    }}
                    onKeyUp={(e) => {
                      if (e.target.value.length === 4) {
                        setFocus({ ...focusState, column2: true })
                      }
                    }}
                  />
                  <input
                    type="num"
                    id="card-number-1"
                    className="input-cart-number-Ming"
                    maxLength="4"
                    value={colInfo.column2}
                    onChange={(e) => {
                      const newColInfo = { ...colInfo, column2: e.target.value }
                      setColInfo(newColInfo)
                    }}
                    onKeyUp={(e) => {
                      if (e.target.value.length === 4) {
                        setFocus({ ...focusState, column3: true })
                      }
                    }}
                  />
                  <input
                    type="num"
                    id="card-number-2"
                    className="input-cart-number-Ming"
                    maxLength="4"
                    value={colInfo.column3}
                    onChange={(e) => {
                      const newColInfo = { ...colInfo, column3: e.target.value }
                      setColInfo(newColInfo)
                    }}
                    onKeyUp={(e) => {
                      if (e.target.value.length === 4) {
                        setFocus({ ...focusState, column4: true })
                      }
                    }}
                  />
                  <input
                    type="num"
                    id="card-number-3"
                    className="input-cart-number-Ming"
                    maxLength="4"
                    value={colInfo.column4}
                    onChange={(e) => {
                      const newColInfo = { ...colInfo, column4: e.target.value }
                      setColInfo(newColInfo)
                    }}
                    onKeyUp={(e) => {
                      if (e.target.value.length === 4) {
                        setFocus({ ...focusState, name: true })
                      }
                    }}
                  />
                </div>
              </fieldset>
              <fieldset>
                <label htmlFor="card-holder">持卡人姓名</label>
                <input
                  type="text"
                  id="card-holder"
                  value={colInfo.name}
                  onChange={(e) => {
                    const newColInfo = { ...colInfo, name: e.target.value }
                    setColInfo(newColInfo)
                  }}
                />
              </fieldset>
              <fieldset className="fieldset-expiration-Ming">
                <label htmlFor="card-expiration-month">Expiration Date</label>
                <div className="select-Ming">
                  <select
                    id="card-expiration-month"
                    value={colInfo.month}
                    onChange={(e) => {
                      const newColInfo = { ...colInfo, month: e.target.value }
                      setColInfo(newColInfo)
                    }}
                  >
                    <option value="" disabled defaultValue>
                      請選擇
                    </option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
                <div className="select-Ming">
                  <select
                    id="card-expiration-year"
                    value={colInfo.year}
                    onChange={(e) => {
                      const newColInfo = { ...colInfo, year: e.target.value }
                      setColInfo(newColInfo)
                    }}
                  >
                    <option value="" disabled defaultValue>
                      請選擇
                    </option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                  </select>
                </div>
              </fieldset>
              <fieldset className="fieldset-ccv-Ming">
                <label htmlFor="card-ccv">CCV</label>
                <input
                  type="text"
                  id="card-ccv"
                  maxLength="3"
                  value={colInfo.ccv}
                  onFocus={() => {
                    setCCVStatus(true)
                  }}
                  onBlur={() => {
                    setCCVStatus(false)
                  }}
                  onChange={(e) => {
                    const newColInfo = { ...colInfo, ccv: e.target.value }
                    setColInfo(newColInfo)
                  }}
                />
              </fieldset>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <div className="btnMing btn2Ming" onClick={handleClose}>
            取消
          </div> */}
          <Button className="btnCancelMing" onClick={handleClose}>
            取消
          </Button>
          <Button
            className="btnConfirmMing"
            onClick={() => {
              Swal.fire({
                icon: 'success',
                title: '信用卡新增成功',
                showConfirmButton: false,
                timer: 1000,
              })
              handleClose()
            }}
          >
            送出
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreditCard
