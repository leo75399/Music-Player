import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useParams, useHistory } from 'react-router-dom'

import styles from './UserRank.module.scss'
// import axios from 'axios'
import { API_HOST } from './../../../config'

function Favorite(props) {
  const { showMoney, setShowMoney, setShowAvatar, user, setIsActive } = props
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const [rank, setRank] = useState(1)
  const history = useHistory()
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        // !user.login && history.push('/')
        getRank(id)
        // setShowMoney(r.data.count)
        getMember(id)
        setIsActive('會員等級')
      })()
    } else {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user])

  async function getRank(id) {
    await fetch(API_HOST + '/admin/user/rank/' + id, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          setShowMoney(obj.count)
          if (obj.count <= 2100) {
            setRank(1)
          } else if (obj.count <= 4200) {
            setRank(2)
          } else if (obj.count <= 6600) {
            setRank(3)
          } else if (obj.count <= 15000) {
            setRank(4)
          } else {
            setRank(5)
          }
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
          console.log(obj.error)
        }
      })
  }

  return (
    <>
      <div className={classnames(styles.rank_section)}>
        <div className={classnames('pb-4', styles.rank_section_top)}>
          會員等級
        </div>
        <p className={classnames('mt-3')}>
          您目前累積的消費金額是
          <span className={classnames(styles.money, 'mx-2')}>{showMoney}</span>
          元
        </p>
        <p className={classnames(styles.text_size, 'my-5')}>
          根據今年度的累積達到此等級，繼續累積即可升級為白銀會員年度結算日為
          2021/7/2，會員期限至 2023/7/1
        </p>
        <div className={classnames('d-flex')}>
          <div
            className={classnames(
              styles.rank_level,
              'd-flex',
              'flex-column',
              'align-items-center'
            )}
          >
            <div
              className={classnames(
                styles.rank_level_inner,
                rank === 1 && styles.active
              )}
            >
              01
            </div>
            <div className={classnames(styles.line)}></div>
            <div
              className={classnames(
                styles.rank_level_inner,
                rank === 2 && styles.active
              )}
            >
              02
            </div>
            <div className={classnames(styles.line)}></div>
            <div
              className={classnames(
                styles.rank_level_inner,
                rank === 3 && styles.active
              )}
            >
              03
            </div>
            <div className={classnames(styles.line)}></div>
            <div
              className={classnames(
                styles.rank_level_inner,
                rank === 4 && styles.active
              )}
            >
              04
            </div>
            <div className={classnames(styles.line)}></div>
            <div
              className={classnames(
                styles.rank_level_inner,
                rank === 5 && styles.active
              )}
            >
              05
            </div>
          </div>
          <div
            className={classnames(
              styles.rank_text,
              'd-flex',
              'flex-column',
              'justify-content-between'
            )}
          >
            <div className={classnames(styles.rank_text_inner)}>一般會員</div>

            <div className={classnames(styles.rank_text_inner)}>白銀會員</div>
            <div className={classnames(styles.rank_text_inner)}>黃金會員</div>
            <div className={classnames(styles.rank_text_inner)}>鑽石會員</div>
            <div className={classnames(styles.rank_text_inner)}>至尊會員</div>
          </div>

          <div
            className={classnames(
              styles.rank_condition,
              'd-flex',
              'flex-column',
              'justify-content-between'
            )}
          >
            <div className={classnames(styles.rank_condition_inner)}>
              達成條件：註冊會員
            </div>

            <div className={classnames(styles.rank_condition_inner)}>
              達成條件：整年度累積實際消費達 NT$ 2,100
            </div>
            <div className={classnames(styles.rank_condition_inner)}>
              達成條件：整年度累積實際消費達 NT$ 4,200
            </div>
            <div className={classnames(styles.rank_condition_inner)}>
              達成條件：整年度累積交易次數達 4 次或實際消費達 NT$ 6,600
            </div>
            <div className={classnames(styles.rank_condition_inner)}>
              達成條件：整年度累積交易次數達 6 次或實際消費達 NT$ 15,000
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Favorite
