import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import classnames from 'classnames'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import { API_HOST } from './../../../config'
// import meme from './../images/nyan-cat.gif'
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import styles from './RefreshPassword.module.scss'

function RefreshPassword(props) {
  const {
    // setShowLogin,
    refresh,
    setRefresh,
    // forgetPassword,
    // setForgetPassword,
    setEmailInPassword,
    setSendPasswordCode,
    setUser,
  } = props
  const closeJoeyLogin = () => setRefresh(false)
  const defaultForm = {
    email: { value: '', valid: true, error: '' },
    password: { value: '', valid: true, error: '' },
    password_confirm: { value: '', valid: true, error: '' },
  }
  const [formCheck, setFormCheck] = useState(defaultForm)
  const [showPassword, setShowPassword] = useState(true)
  const findPassword = {
    email: formCheck.email.value,
    password: formCheck.password.value,
    // verification_code: verification_code,
  }
  const history = useHistory()

  useEffect(() => {
    if (!refresh) {
      setFormCheck(defaultForm)
    }
    setShowPassword(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const onChange = ({ key, data }) => {
    setFormCheck({ ...formCheck, [key]: { ...formCheck[key], ...data } })
  }
  const SignOut = () => {
    //   // 清掉localStorage 資料
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
  // const sendEmail = () => {
  //   fetch(API_HOST + '/email', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(findPassword),
  //   })
  //     .then((r) => r.json())
  //     .then((obj) => {
  //       // console.log(obj)
  //       if (obj.success) {
  //         // const { id, avatar, nickname } = obj.member

  //         // NOTE update user state
  //         // console.log(obj)
  //         closeJoeyLogin()
  //         // setSendPasswordCode(true)
  //       } else {
  //         closeJoeyLogin()
  //       }
  //     })
  // }

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
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
  const onSubmitHandler = (e) => {
    // e.preventDefault()
    setEmailInPassword(formCheck.email.value)
    const newForm = clearError(formCheck, [
      'email',
      'password',
      'password_confirm',
    ])
    let errorStatus = 0

    if (!emailReg.test(newForm.email.value)) {
      newForm.email = {
        ...newForm.email,
        valid: false,
        error: '請輸入Email格式',
      }
      errorStatus = 400
    }
    if (!passwordReg.test(newForm.password.value)) {
      newForm.password = {
        ...newForm.password,
        valid: false,
        error:
          '密碼必須包含大小寫字母和數字的組合，不能使用特殊字符，長度在6-15之間',
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

    fetch(API_HOST + '/refresh-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(findPassword),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj)
        if (obj.success) {
          // localStorage.setItem('12345', obj.result)
          // localStorage.setItem('member', JSON.stringify(obj.member)) // 儲存到 localStorag

          // const { id, avatar, nickname } = obj.member

          // NOTE update user state
          // console.log(obj)

          // sendEmail()
          closeJoeyLogin()
          setFormCheck(defaultForm)
          setTimeout(() => {
            SignOut()
          }, 10000)
          setSendPasswordCode(true)
        } else {
          Swal.fire({
            title: '驗證失敗\n' + (obj.error || ''),
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
          closeJoeyLogin()
        }
      })
  }

  return (
    <>
      <div
        className={classnames(styles.Tommy_bg_under, !refresh && 'd-none')}
        onMouseDown={closeJoeyLogin}
      >
        <div
          className={classnames('bg-white', styles.login)}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={classnames('h-100', 'p-3', styles.Tommy_inner_bg)}>
            <div className={classnames('d-flex', 'justify-content-between')}>
              <h3>重設密碼</h3>
              <i
                className={classnames('fas fa-times', styles.close)}
                onClick={closeJoeyLogin}
              ></i>
            </div>

            <Input
              label="請輸入信箱"
              value={formCheck.email.value}
              onChange={(e) => {
                onChange({
                  key: 'email',
                  data: { value: e.target.value },
                })
              }}
              error={!formCheck.email.valid}
              errorText={formCheck.email.error}
              className={classnames('form-control', styles.input_size)}
              placeholder="Enter email"
            />
            <Input
              label="請輸入舊密碼"
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
                    account: { ...formCheck.account, value: 'tommy222' },
                    nickname: { ...formCheck.nickname, value: 'jake' },
                    email: { ...formCheck, value: 'tommy8852024@gmail.com' },
                    password: { ...formCheck, value: 'W77w77' },
                    password_confirm: { ...formCheck, value: 'W77w77' },
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

export default withRouter(RefreshPassword)
