import React, { useEffect, useState } from 'react'
import { Link, withRouter, useParams, useHistory } from 'react-router-dom'
import styles from './UserOrder.module.scss'
import Swal from 'sweetalert2'
// import meme from './../images/nyan-cat.gif'
import { Icon } from '@iconify/react'
import PhoneOrder from './PhoneOrder'
import classnames from 'classnames'
import { API_HOST } from './../../../config'
import moment from 'moment'
import 'animate.css'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'

function UserOrder(props) {
  const { setShowAvatar, user, setIsActive } = props
  const { id } = useParams()
  const history = useHistory()
  // const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  let [color] = useState('#e88239')
  let [loading] = useState(true)
  const [pageNumber, setPageNumber] = useState({
    page: 1,
  })
  let [data, setData] = useState({})
  // let [totalRows, setTotalRows] = useState(0)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (user.login) {
      ;(async () => {
        // setTimeout(() => {
        getOrder(id)
        getMember(id)
        // }, 1000)
      })()
      setIsActive('歷史訂單')

      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => {
        clearTimeout()
        setIsLoading('')
        setIsActive('')
      }
      // !user.login && history.push('/')
    } else {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pageNumber, user])

  // useEffect(() => {
  //   ;(async () => {
  //     // console.log(r.data)
  //     // console.log(data)
  //     getOrder(id)
  //     getMember(id)

  //   })()
  //   !user.login && history.push('/')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id, pageNumber, user])

  // const page = data.totalPages

  const totalPages = () => {
    let newTotalPages = []
    for (let i = 1; i <= data.totalPages; i++) {
      newTotalPages.push(i)
    }
    return newTotalPages
  }

  async function getOrder(id) {
    await fetch(API_HOST + '/admin/user/order/' + id, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageNumber),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          if (obj.result) {
            setData(obj.result)
            // console.log(obj.result)
          }
        } else {
          Swal.fire({
            title: '您還沒有訂單\n' + (obj.error || ''),
            width: 400,
            icon: 'warning',
            padding: '2em',
            background: '#fff url(/images/trees.png)',
            showConfirmButton: false,
            timer: 1800,
            // backdrop: `
            // rgba(0, 0, 0, 0.356)
            //   url("${meme}")
            //   left top
            //   no-repeat
            // `,
          })
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
        styles.order_top_spinning,
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
      <div className={classnames(styles.under_bg, 'd-none', 'd-lg-block')}>
        <div className={classnames(styles.order_top, 'pb-4')}>歷史訂單</div>
        <div>
          <div className="col mt-5">
            <div className={classnames('w-100', 'text-center', 'mt-5')}>
              <div className={classnames(styles.tblHeader, 'd-flex')}>
                <div className="col">訂單編號</div>
                <div className="col">訂購日期</div>
                <div className="col">價錢合計</div>
                <div className="col">訂單狀態</div>
                <div className="col">詳細資訊</div>
              </div>
              <div
                className={classnames(
                  'w-100',
                  'text-center',
                  styles.data_section
                )}
              >
                {/* <tr> */}
                {/* <td>324322432</td>
                  <td>2021/05/19</td>
                  <td>309 million</td>
                  <td>運送中</td>
                  <td>
                    <Link to={'/admin/user/detail/' + id}>歷史訂單</Link>
                  </td> */}
                {data.rows ? (
                  data.rows.map((el) => {
                    return (
                      <div
                        className={classnames('d-flex', styles.data)}
                        key={el.sid}
                      >
                        <div className="col">{el.order_id}</div>
                        <div className="col">
                          {moment(el.created_at).format('YYYY-MM-DD')}
                        </div>
                        <div className="col">{el.total}元</div>
                        <div className="col">{el.delivery_status}</div>
                        <div className="col">
                          {/* <button className="btn bg-dark">123</button> */}
                          <button
                            className={classnames(
                              'btn',
                              'bg-dark',
                              styles.orderBtn
                            )}
                          >
                            <Link
                              className={classnames(
                                'text-light',
                                'text-decoration-none'
                                // 'animate__animated',
                                // 'animate__bounce',
                                // 'animate__infinite'
                              )}
                              // to={`/admin/user/detail/${id}?order=${el.order_id}`}
                              to={`/admin/user/detail/${id}/${el.order_id}`}
                            >
                              訂單細節
                            </Link>
                            {/* <Link
                              className={classnames('text-light')}
                              to={`/admin/user/detail/${id}?/${el.order_id}`}
                            >
                              訂單細節
                            </Link> */}
                          </button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center">
                    <div className={classnames(styles.noOrder)}>
                      您沒有訂單！
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* {console.log(pageNumber)} */}
            {/* {console.log(page2)} */}
            <nav aria-label="Page navigation example">
              <ul className={classnames('pagination')}>
                <div className={classnames('d-flex', 'ml-auto')}>
                  <li className={classnames('page-item', styles.cusor)}>
                    <div
                      className="page-link"
                      onClick={() => {
                        if (pageNumber.page === 1) {
                          setPageNumber({ ...pageNumber, page: 1 })
                        } else {
                          const newPageNumber = pageNumber.page - 1
                          setPageNumber({ ...pageNumber, page: newPageNumber })
                          // setPushPage(pageNumber.page)
                        }
                      }}
                    >
                      <Icon icon="dashicons:arrow-left-alt2" />
                    </div>
                  </li>

                  {totalPages() ? (
                    totalPages().map((el, i) => {
                      return (
                        <li
                          key={i}
                          className={classnames('page-item', styles.cusor)}
                        >
                          <div
                            className={classnames(
                              'page-link',
                              pageNumber.page === el && styles.pageActive
                            )}
                            onClick={() => {
                              // const newPageNumber = {}
                              setPageNumber({ ...pageNumber, page: el })
                              // setPushPage(pageNumber.page)
                            }}
                          >
                            {el}
                          </div>
                        </li>
                      )
                    })
                  ) : (
                    <div></div>
                  )}
                  <li className={classnames('page-item', styles.cusor)}>
                    <div
                      className="page-link"
                      onClick={() => {
                        if (pageNumber.page === data.totalPages) {
                          setPageNumber({
                            ...pageNumber,
                            page: data.totalPages,
                          })
                        } else {
                          const newPageNumber = pageNumber.page + 1
                          setPageNumber({ ...pageNumber, page: newPageNumber })
                          // setPushPage(pageNumber.page)
                        }
                      }}
                    >
                      <Icon icon="dashicons:arrow-right-alt2" />
                    </div>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/*  手機版      */}
      <div
        className={classnames('d-lg-none', 'mt-3', styles.PhoneOrderSection)}
      >
        <h4 className={classnames('mb-3', styles.phoneOrder_top)}>歷史訂單</h4>
        {data.rows ? (
          data.rows.map((el, i) => (
            <PhoneOrder
              user={user}
              key={el.sid}
              order_id={el.order_id}
              birthday={moment(el.birthday).format('YYYY-MM-DD')}
              total={el.total}
              delivery_status={el.delivery_status}
              id={id}
            />
          ))
        ) : (
          <div>您還沒有訂單</div>
        )}
        <div className={classnames(styles.page)}>
          <nav aria-label="Page navigation example">
            <ul className={classnames('pagination')}>
              <div className={classnames('d-flex', 'ml-auto')}>
                <li className={classnames('page-item', styles.cusor)}>
                  <div
                    className="page-link"
                    onClick={() => {
                      if (pageNumber.page === 1) {
                        setPageNumber({ ...pageNumber, page: 1 })
                      } else {
                        const newPageNumber = pageNumber.page - 1
                        setPageNumber({ ...pageNumber, page: newPageNumber })
                        // setPushPage(pageNumber.page)
                      }
                    }}
                  >
                    <Icon icon="dashicons:arrow-left-alt2" />
                  </div>
                </li>
                {totalPages() ? (
                  totalPages().map((el, i) => {
                    return (
                      <li
                        key={i}
                        className={classnames('page-item', styles.cusor)}
                      >
                        <div
                          className={classnames(
                            'page-link',
                            pageNumber.page === el && styles.pageActive
                          )}
                          onClick={() => {
                            // const newPageNumber = {}
                            setPageNumber({ ...pageNumber, page: el })
                            // setPushPage(pageNumber.page)
                          }}
                        >
                          {el}
                        </div>
                      </li>
                    )
                  })
                ) : (
                  <div></div>
                )}
                <li className={classnames('page-item', styles.cusor)}>
                  <div
                    className="page-link"
                    onClick={() => {
                      if (pageNumber.page === data.totalPages) {
                        setPageNumber({
                          ...pageNumber,
                          page: data.totalPages,
                        })
                      } else {
                        const newPageNumber = pageNumber.page + 1
                        setPageNumber({ ...pageNumber, page: newPageNumber })
                        // setPushPage(pageNumber.page)
                      }
                    }}
                  >
                    <Icon icon="dashicons:arrow-right-alt2" />
                  </div>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )

  return <>{isLoading ? spinner : display}</>
}

export default withRouter(UserOrder)
