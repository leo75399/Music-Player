import React, { useState, useEffect } from 'react'
import styles from './ActiveEmail.module.scss'
import { withRouter, useParams, useHistory } from 'react-router-dom'
import { API_HOST } from './../../../config'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'
import classnames from 'classnames'
import Swal from 'sweetalert2'
import logo from './../images/HERE-black.png'

const ActiveEmail = (props) => {
  const {
    setShowLogin,
    setResetPassword,
    setWhoInpassword,
    // setRefresh,
    setUser,
  } = props
  const { verification_code, text } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()
  // const [isLoading, setIsLoading] = useState(true)
  const SignOut = () => {
    // 清掉localStorage 資料
    localStorage.removeItem('member')
    localStorage.removeItem('token')
    // 將會員資料state 清掉
    setUser({
      login: false,
      member_sid: '', //會員ID
      avatar: '', //大頭貼路徑
      nickname: '', //會員的暱稱
    })
    history.push('/')
  }
  const textform = {
    text: text,
  }
  let [loading] = useState(true)

  let [color] = useState('#e88239')
  // const token = localStorage.getItem('token')
  useEffect(() => {
    // if (user.login) {
    //   ;(async () => {
    getVertify()
    //   })()
    // } else {
    //   history.push('/')
    // }
    setWhoInpassword(verification_code)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verification_code])

  async function getVertify() {
    await fetch(API_HOST + '/vertify-email/' + verification_code, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textform),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          // setNavAvatar({ ...showAvatar, avatar: obj.result.avatar })
          setTimeout(() => {
            setIsLoading(false)
            // console.log('success')
            Swal.fire({
              title: '您已成功驗證',
              width: 400,
              icon: 'success',
              padding: '2em',
              background: '#fff url(/images/trees.png)',
              showConfirmButton: false,
              timer: 1500,
              backdrop: `
              rgba(0, 0, 0, 0.356)
                url("${logo}")
                left bottom
                no-repeat
              `,
            })
          }, 1500)
          setTimeout(() => {
            history.push('/')
            if (obj.text === 'FindPassword') {
              setResetPassword(true)
            } else if (obj.text === 'SignUp') {
              setShowLogin(true)
            } else if (obj.text === 'RefreshPassword') {
              setResetPassword(true)
            } else {
              setShowLogin(true)
              SignOut()
            }
          }, 2500)
        } else {
          // history.push('/')
          // console.log(obj.error)
          console.log('error')
        }
      })
  }

  const display = (
    <div
      className={classnames(
        styles.profile_top,
        'container',
        'd-flex',
        'justify-content-center',
        'pt-5',
        'team-min-height'
      )}
    >
      {/* <p>你成功了</p> */}
    </div>
  )

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `
  const spinner = (
    <div
      className={classnames(
        styles.profile_top,
        'd-flex',
        'justify-content-between',
        'pt-5',
        'team-min-height'
      )}
    >
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
  return <>{isLoading ? spinner : display}</>
}

export default withRouter(ActiveEmail)
