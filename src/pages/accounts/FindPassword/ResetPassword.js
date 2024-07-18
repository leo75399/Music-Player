import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useHistory } from 'react-router-dom'

import { API_HOST } from './../../../config'
// import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import styles from './ResetPassword.module.scss'

function ResetPassword(props) {
  const {
    resetPassword,
    setResetPassword,
    // emailInPassword,
    setUser,
    whoInpassword,
  } = props
  const closeJoeyLogin = () => setResetPassword(false)
  // const sendPassword = JSON.parse(localStorage.getItem('12345'))

  const defaultForm = {
    password: { value: '', valid: true, error: '' },
    password_confirm: { value: '', valid: true, error: '' },
  }
  const [formCheck, setFormCheck] = useState(defaultForm)
  const [showPassword, setShowPassword] = useState(true)
  const history = useHistory()

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
  const resetPasswordForm = {
    verification_code: whoInpassword,
    password: formCheck.password.value,
  }

  useEffect(() => {
    if (!resetPassword) {
      setFormCheck(defaultForm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPassword])

  const onChange = ({ key, data }) => {
    setFormCheck({ ...formCheck, [key]: { ...formCheck[key], ...data } })
  }

  const sendEmail = () => {
    fetch(API_HOST + '/email-reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetPasswordForm),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj)
        if (obj.success) {
          // const { id, avatar, nickname } = obj.member

          // NOTE update user state
          console.log(obj)
          closeJoeyLogin()
        } else {
          closeJoeyLogin()
        }
      })
  }

  const clearError = (data, keyArray) => {
    const newData = { ...data }
    for (let index = 0; index < keyArray.length; index += 1) {
      newData[keyArray[index]] = {
        ...newData[keyArray[index]],
        valid: true,
        error: '',
      }
    }
    return newData
  }
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
  const onSubmitHandler = (e) => {
    // e.preventDefault()
    const newForm = clearError(formCheck, ['email'])
    let errorStatus = 0

    if (!passwordReg.test(newForm.password.value)) {
      newForm.password = {
        ...newForm.password,
        valid: false,
        error: '密碼必須包含大小寫字母和數字的組合，不能使用特殊字符，長度在6',
      }
      errorStatus = 400
    }
    if (newForm.password.value !== newForm.password_confirm.value) {
      newForm.password_confirm = {
        ...newForm.password_confirm,
        valid: false,
        error: '密碼不一致',
      }
      errorStatus = 400
    }

    setFormCheck({ ...formCheck, ...newForm })

    if (errorStatus === 400) {
      return
    }
    // const fd = new FormData(document.joeyLoginForm)

    fetch(API_HOST + '/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetPasswordForm),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj)
        if (obj.success) {
          // const { id, avatar, nickname } = obj.member
          Swal.fire({
            title: '您已成功更改密碼，下次登入請用新密碼',
            width: 400,
            icon: 'success',
            padding: '2em',
            background: '#fff url(/images/trees.png)',
            showConfirmButton: false,
            timer: 1500,
            // backdrop: `
            //   rgba(0, 0, 0, 0.356)
            //     url("${meme}")
            //     left top
            //     no-repeat
            //   `,
          })
          // NOTE update user state
          // console.log(obj)
          closeJoeyLogin()
          // setTimeout(() => {
          //   setShowLogin(true)
          // }, 1000)
          sendEmail()
          setFormCheck(defaultForm)
          SignOut()
        } else {
          Swal.fire({
            title: '更改失敗\n' + (obj.error || ''),
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
          // closeJoeyLogin()
        }
      })
  }

  return (
    <>
      <div
        className={classnames(
          styles.Tommy_bg_under,
          !resetPassword && 'd-none'
        )}
        onMouseDown={closeJoeyLogin}
      >
        <div
          className={classnames('bg-white', styles.login)}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={classnames('h-100', 'p-3', styles.Tommy_inner_bg)}>
            <div className={classnames('d-flex', 'justify-content-between')}>
              <h3>重新設定密碼</h3>
              <i
                className={classnames('fas fa-times', styles.close)}
                onClick={closeJoeyLogin}
              ></i>
            </div>

            <Input
              label="請輸入新密碼"
              value={formCheck.password.value}
              onChange={(e) => {
                onChange({
                  key: 'password',
                  data: { value: e.target.value },
                })
              }}
              error={!formCheck.password.valid}
              errorText={formCheck.password.error}
              className={classnames('form-control', styles.input_size)}
              placeholder="Enter password"
              type={showPassword ? 'password' : 'text'}
            />
            <Input
              label="再次確認密碼"
              value={formCheck.password_confirm.value}
              onChange={(e) => {
                onChange({
                  key: 'password_confirm',
                  data: { value: e.target.value },
                })
                // setSignUpForm({
                //   ...signUpForm,
                //   password_confirm: e.target.value,
                // })
                // const newForm = clearError(formCheck, ['account'])
                // clearError(newForm)
              }}
              error={!formCheck.password_confirm.valid}
              errorText={formCheck.password_confirm.error}
              className={classnames('form-control', styles.input_size)}
              placeholder="Enter password"
              type={showPassword ? 'password' : 'text'}
            />
            <div className={classnames('d-flex', 'justify-content-between')}>
              <i
                className={classnames(
                  'far',
                  'fa-laugh-beam',
                  styles.openPassword
                )}
                onClick={() => {
                  setShowPassword(!showPassword)
                }}
              >
                {' '}
                顯示密碼
              </i>
              <p
                onClick={() => {
                  setFormCheck({
                    ...formCheck,
                    password: { ...formCheck, value: 'W22w22' },
                    password_confirm: { ...formCheck, value: 'W22w22' },
                  })
                }}
                className={classnames(styles.OKButton, 'btn', 'btn-secondary')}
              >
                一鍵Ok
              </p>
            </div>
            <button
              type="submit"
              className={classnames(
                styles.submit,
                'btn',
                'btn-primary',
                'w-100',
                'mt-4'
              )}
              onClick={() => {
                onSubmitHandler()
              }}
            >
              提交
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ResetPassword)
