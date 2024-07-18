import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import styles from './Login.module.scss'
import { API_HOST, RECAPTCHA_SITE_KEY } from './../../../config'
// import Google from './../images/Google__G__Logo.svg'
import Swal from 'sweetalert2'
// import meme from '/../images/nyan-cat.gif'
import logo from './../images/HERE-black.png'
import Input from './../Input'
import ReCAPTCHA from 'react-google-recaptcha'

function Login(props) {
  const { showLogin, setShowLogin, setUser, setShowSignUp, setForgetPassword } =
    props
  const closeJoeyLogin = () => setShowLogin(false)
  const [showPassword, setShowPassword] = useState(true)
  const [google, setGoogle] = useState('')
  const [human, setHuman] = useState(false)
  const defaultForm = {
    account: { value: '', valid: true, error: '' },
    password: { value: '', valid: true, error: '' },
  }

  const [formCheck, setFormCheck] = useState(defaultForm)
  const Loginform = {
    account: formCheck.account.value,
    password: formCheck.password.value,
    google: google,
  }
  useEffect(() => {
    if (!showLogin) {
      setFormCheck(defaultForm)
      reRef.current.reset()
      // if(human){
      //   setHuman(false)
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLogin])

  const reRef = useRef()
  function onChangeGoogle(value) {
    // console.log('Captcha value:', value)
    setHuman(true)
    setGoogle(value)
  }

  const onChange = ({ key, data }) => {
    setFormCheck({ ...formCheck, [key]: { ...formCheck[key], ...data } })
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

  const accountReg = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
  // const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
  // console.log(formCheck)

  const onSubmitHandler = (e) => {
    if (human) {
      const newForm = clearError(formCheck, ['account', 'password'])
      let errorStatus = 0
      if (!accountReg.test(newForm.account.value)) {
        newForm.account = {
          ...newForm.account,
          valid: false,
          error: '帳號需字母開頭，長度在3-15之間',
        }
        errorStatus = 400
      }
      // if (!passwordReg.test(newForm.password.value)) {
      //   newForm.password = {
      //     ...newForm.password,
      //     valid: false,
      //     error:
      //       '密碼必須包含大小寫字母和數字的組合，不能使用特殊字符，長度在6-15之間',
      //   }
      //   errorStatus = 400
      // }
      setFormCheck({ ...formCheck, ...newForm })

      if (errorStatus === 400) {
        return
      }
      // e.preventDefault()

      // const fd = new FormData(document.loginForm)
      // const fd = {}

      fetch(API_HOST + '/members/login', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: new URLSearchParams(fd).toString(),
        body: JSON.stringify(Loginform),
      })
        .then((r) => r.json())
        .then((obj) => {
          // console.log(obj)
          if (obj.success) {
            // NOTE 登入成功時 將初始畫面呈現需要的資料寫入localStorage 避免user refresh
            localStorage.setItem('token', obj.token)
            localStorage.setItem('member', JSON.stringify(obj.member)) // 儲存到 localStorage
            // console.log(props)
            // alert('登入成功')
            Swal.fire({
              title: '您已成功登入',
              width: 400,
              icon: 'success',
              padding: '2em',
              background: '#fff url(/images/trees.png)',
              showConfirmButton: false,
              timer: 2000,
              backdrop: `
              rgba(0, 0, 0, 0.356)
                url("${logo}")
                left bottom
                no-repeat
              `,
            })
            // console.log(new URLSearchParams(fd).toString())
            const { id, avatar, nickname } = obj.member
            setUser({
              login: true,
              member_sid: id, //會員ID
              avatar: avatar, //大頭貼路徑
              nickname: nickname, //會員的暱稱
            })
            // NOTE update user state
            // console.log(obj)
            closeJoeyLogin()
          } else {
            // alert('登入失敗\n' + (obj.error || ''))
            Swal.fire({
              title: '登入失敗\n' + (obj.error || ''),
              width: 400,
              icon: 'warning',
              padding: '2em',
              background: '#fff url(/images/trees.png)',
              showConfirmButton: false,
              timer: 1800,
              backdrop: `
              rgba(0, 0, 0, 0.356)
                url("${logo}")
                left top
                no-repeat
              `,
            })
            closeJoeyLogin()
          }
        })
    } else {
      closeJoeyLogin()
      setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '你不是人類喔！',
          footer: '<a href="">請勾選我不是機器人</a>',
          showConfirmButton: false,
          timer: 2000,
        })
      }, 1000)
      setTimeout(() => {
        // console.log('hi')
        setShowLogin(true)
      }, 3500)
    }
  }
  return (
    <>
      <div
        className={classnames(styles.Tommy_bg_under, !showLogin && 'd-none')}
        onMouseDown={closeJoeyLogin}
        onKeyDown={(e) => {
          // console.log(e)
          if (e.code === 'Enter') {
            // console.log(e)
            onSubmitHandler()
          }
        }}
        tabIndex="0"
      >
        <div
          className={classnames('bg-white', styles.signUp)}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={classnames('h-100', 'p-3', styles.Tommy_inner_bg)}>
            <div className={classnames('d-flex', 'justify-content-between')}>
              <p>歡迎回來</p>
              <i
                className={classnames('fas fa-times', styles.close)}
                onClick={closeJoeyLogin}
              ></i>
            </div>
            <h2>登入</h2>
            <Input
              label="帳號"
              value={formCheck.account.value}
              onChange={(e) => {
                onChange({
                  key: 'account',
                  data: { value: e.target.value },
                })
              }}
              error={!formCheck.account.valid}
              errorText={formCheck.account.error}
              className={classnames('form-control', styles.input_size)}
              placeholder="Enter account"
            />
            <Input
              label="密碼"
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
            <div className="d-flex justify-content-between">
              <i
                className={classnames(
                  'far',
                  'fa-laugh-beam',
                  'mt-1',
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
                className={classnames(styles.forgetPassword)}
                onClick={() => {
                  closeJoeyLogin()
                  setForgetPassword(true)
                }}
              >
                忘記密碼
              </p>
            </div>

            {/* <div className="form-group">
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                className={classnames('form-control', styles.input_size)}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div> */}
            <small id="form-text" className="form-text"></small>
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
              登入
            </button>
            {/* <button
              type="submit"
              className={classnames(
                styles.google_submit,
                'btn',
                'w-100',
                'mb-4'
              )}
            >
              <div className="d-flex justify-content-center ">
                <img src={Google} alt="" />
                <span className="mx-5">使用 Google 帳號登入</span>
              </div>
            </button> */}
            <div className="d-flex justify-content-center my-4">
              <ReCAPTCHA
                ref={reRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onChangeGoogle}
                // onKeyDown={(e) => {
                //   console.log(e)
                //   if (e.code === 'Enter') {
                //     console.log(e)
                //     // onSubmitHandler()
                //   }
                // }}
              />
            </div>

            {/* </form> */}
            <p className={classnames('text-center', styles.Tommy_to_login)}>
              還沒有帳戶？點
              <span
                className={styles.here}
                onClick={() => {
                  closeJoeyLogin()
                  setShowSignUp(true)
                }}
              >
                這裡
              </span>
              註冊
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
