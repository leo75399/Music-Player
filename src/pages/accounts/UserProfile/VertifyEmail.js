import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import classnames from 'classnames'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import { API_HOST } from './../../../config'
// import meme from './../images/nyan-cat.gif'
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import styles from './VertifyEmail.module.scss'

function VertifyEmail(props) {
  const {
    vertifyEmail,
    setVertifyEmail,
    setSendVerificationCode,
    // setSendPasswordCode,
    // setEmailInVertify,
    // setEmailInPassword,
    setEmailInSignUp,
    setUser,
  } = props
  const closeJoeyLogin = () => setVertifyEmail(false)
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

  useEffect(() => {
    if (!vertifyEmail) {
      setFormCheck(defaultForm)
    }
    setShowPassword(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertifyEmail])
  const history = useHistory()

  const onChange = ({ key, data }) => {
    setFormCheck({ ...formCheck, [key]: { ...formCheck[key], ...data } })
  }
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
    // setEmailInVertify(formCheck.email.value)
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

    fetch(API_HOST + '/active-email', {
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
          closeJoeyLogin()
          setFormCheck(defaultForm)
          SignOut()
          setTimeout(() => {
            setSendVerificationCode(true)
          }, 1000)
          setEmailInSignUp(findPassword)
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
        className={classnames(styles.Tommy_bg_under, !vertifyEmail && 'd-none')}
        onMouseDown={closeJoeyLogin}
      >
        <div
          className={classnames('bg-white', styles.login)}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={classnames('h-100', 'p-3', styles.Tommy_inner_bg)}>
            <div className={classnames('d-flex', 'justify-content-between')}>
              <h3>驗證Email</h3>
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
              label="請輸入密碼"
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
                    email: { ...formCheck, value: 'tommy8852024@gmail.com' },
                    password: { ...formCheck, value: 'W77w77' },
                    password_confirm: { ...formCheck, value: 'W77w77' },
                  })
                }}
                className={classnames(
                  styles.OKButton,
                  'btn',
                  'btn-secondary',
                  'm-0'
                )}
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

export default withRouter(VertifyEmail)
