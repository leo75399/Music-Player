import React, { useState, useEffect } from 'react'

import classnames from 'classnames'
import styles from './UserMeetUp.module.scss'
import { useParams, useHistory, Link } from 'react-router-dom'
import { API_HOST, MEETUP_HOST } from './../../../config'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'
import MemberMeetupCard from './MemberMeetupCard'
import axios from 'axios'
import { Icon } from '@iconify/react'

function UserMeetUp(props) {
  const { setShowAvatar, user, setIsActive } = props
  const token = localStorage.getItem('token')

  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  let [color] = useState('#e88239')
  let [loading] = useState(true)
  const history = useHistory()
  const [userHostedMeetup, setUserHostedMeetup] = useState([])
  const [pageNumber, setPageNumber] = useState({
    page: 1,
  })
  const [totalPages, setTotalPages] = useState({})

  const pages = () => {
    let newsPages = []
    for (let i = 1; i <= totalPages.totalPages; i++) {
      newsPages.push(i)
    }
    return newsPages
  }
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        // setTimeout(() => {
        getUserHostedMeetup()
        getAvatar(id)
        // getMember(id)
        // console.log('hi')
        // }, 1000)
      })()

      setIsActive('活動列表')
      // !user.login && history.push('/')
      getUserHostedMeetup()
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => {
        clearTimeout()
        setIsLoading('')
        setIsActive('')
      }
    } else {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, pageNumber])

  async function getUserHostedMeetup() {
    const fd = pageNumber
    const { data } = await axios.post(MEETUP_HOST + id, fd)

    // TODO: 看要不要處理 data.error 但理論上正常操作 + 用戶都有登入的情況下
    // 頂多沒有舉辦紀錄
    if (data.success) {
      setUserHostedMeetup(data.result.rows)
      setTotalPages(data.result)
    } else {
      console.log(data.error)
    }
  }

  async function getAvatar(id) {
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
  // async function getMember(id) {
  //   fetch(API_HOST + '/members/profile/edit/' + id, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //   })
  //     .then((r) => r.json())
  //     .then((obj) => {
  //       // console.log(obj.result)
  //       if (obj.success) {
  //         setShowAvatar({
  //           avatar: obj.result.avatar,
  //           nickname: obj.result.nickname,
  //         })
  //       } else {
  //         console.log(obj.error)
  //       }
  //     })
  // }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `

  const spinner = (
    <div
      className={classnames(
        styles.meetUp_section,
        'd-flex',
        'justify-content-center',
        'pb-4',
        'border-bottom-0'
      )}
    >
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
  const renderedUserHostedMeetup = userHostedMeetup.map((meetup) => (
    <MemberMeetupCard key={meetup.id} meetup={meetup} />
  ))
  // const renderedUserHostedMeetup = userHostedMeetup ? (
  //   userHostedMeetup.map((meetup) => (
  //     <MemberMeetupCard key={meetup.id} meetup={meetup} />
  //   ))
  // ) : (
  //   <div className="text-center">
  //     <div className="bg-warning">您沒有活動！</div>
  //   </div>
  // )

  const display = (
    <div className={classnames(styles.meetUp_section)}>
      <div
        className={classnames(
          'd-lg-flex',
          'justify-content-between',
          'align-items-center',
          styles.meetUp_section_bg,
          'mb-4'
        )}
      >
        <div className={classnames('pb-4', styles.meetUp_section_top)}>
          Meet Up Host
        </div>

        <div>
          <button className={classnames('btn', 'btn-primary')}>
            <Link
              className={classnames(
                styles.JoinLink,
                'text-decoration-none'
                // isActive === '活動列表' && styles.active
              )}
              to={'/admin/user/MeetUpJoin/' + user.member_sid}
              // onClick={() => setIsActive('活動列表')}
            >
              Meet Up Join
            </Link>
          </button>
        </div>
      </div>
      {/* {console.log(pageNumber)} */}
      <div className={classnames('row', styles.cardSection)}>
        {userHostedMeetup ? (
          renderedUserHostedMeetup
        ) : (
          <div className="w-100 text-center">
            <div className="bg-warning">您沒有活動！</div>
          </div>
        )}

        {/* {renderedUserHostedMeetup} */}
      </div>
      <div className={classnames(styles.pageNumber)}>
        <nav aria-label="Page navigation example">
          <ul className={classnames('pagination')}>
            <div className={classnames('d-flex', 'ml-auto')}>
              <li className={classnames('page-item', styles.cusor)}>
                <div
                  className={classnames('page-link')}
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
              {pages() ? (
                pages().map((el, i) => {
                  return (
                    <li
                      key={i}
                      className={classnames('page-item', styles.cusor)}
                      // active={true}
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
                    if (pageNumber.page === totalPages.totalPages) {
                      setPageNumber({
                        ...pageNumber,
                        page: totalPages.totalPages,
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
  )

  return <>{isLoading ? spinner : display}</>
}

export default UserMeetUp
