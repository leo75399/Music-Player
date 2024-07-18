import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import styles from './SignUp.module.scss'
import { API_HOST, RECAPTCHA_SITE_KEY } from './../../../config'
// import Google from './../images/Google__G__Logo.svg'
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import moment from 'moment'
import ReCAPTCHA from 'react-google-recaptcha'

function SignUp(props) {
  const {
    showSignUp,
    setShowSignUp,
    setSendVerificationCode,
    setShowLogin,
    setEmailInSignUp,
    // setSendPasswordCode,
  } = props
  const closeJoeyLogin = () => setShowSignUp(false)

  const defaultForm = {
    account: { value: '', valid: true, error: '' },
    nickname: { value: '', valid: true, error: '' },
    email: { value: '', valid: true, error: '' },
    password_signUp: { value: '', valid: true, error: '' },
    password_confirm: { value: '', valid: true, error: '' },
  }
  const [showPassword, setShowPassword] = useState(true)
  const [human, setHuman] = useState(false)
  const [google, setGoogle] = useState('')
  const [formCheck, setFormCheck] = useState(defaultForm)
  const signUpForm = {
    account: formCheck.account.value,
    nickname: formCheck.nickname.value,
    email: formCheck.email.value,
    password: formCheck.password_signUp.value,
    avatar: 'default_avatar.jpeg',
    mobile: '',
    address: '',
    birthday: moment(new Date()).format('YYYY-MM-DD'),
    cumulative_consumption: 0,
    gender: '',
    google: google,
    // verification_code: verification_code,
  }
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

  const accountReg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/

  const nicknameReg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/

  useEffect(() => {
    if (!showSignUp) {
      setFormCheck(defaultForm)
      reRef.current.reset()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSignUp])
  const onSubmitHandler = (e) => {
    setEmailInSignUp(signUpForm)
    if (human) {
      // e.preventDefault()
      const newForm = clearError(formCheck, ['account'])
      let errorStatus = 0
      if (!accountReg.test(newForm.account.value)) {
        newForm.account = {
          ...newForm.account,
          valid: false,
          error: '帳號需字母開頭，長度在2-15之間',
        }
        errorStatus = 400
      }
      if (!nicknameReg.test(newForm.nickname.value)) {
        newForm.nickname = {
          ...newForm.nickname,
          valid: false,
          error: '暱稱需字母開頭，長度在2-15之間',
        }
        errorStatus = 400
      }
      if (!emailReg.test(newForm.email.value)) {
        newForm.email = {
          ...newForm.email,
          valid: false,
          error: '請輸入email的格式',
        }
        errorStatus = 400
      }
      if (!passwordReg.test(newForm.password_signUp.value)) {
        newForm.password_signUp = {
          ...newForm.password_signUp,
          valid: false,
          error:
            '密碼必須包含大小寫字母和數字的組合，不能使用特殊字符，長度在6-15之間',
        }
        errorStatus = 400
      }

      if (newForm.password_signUp.value !== newForm.password_confirm.value) {
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

      fetch(API_HOST + '/members/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpForm),
      })
        .then((r) => r.json())
        .then((obj) => {
          // console.log(obj)
          if (obj.success) {
            localStorage.setItem('code', JSON.stringify(obj.code))
            // console.log(obj)
            closeJoeyLogin()
            // sendEmail()
            setSendVerificationCode(true)
            // setEmailInSignUp(signUpForm.email)
          } else {
            Swal.fire({
              title: '註冊失敗\n' + (obj.error || ''),
              width: 400,
              icon: 'warning',
              padding: '2em',
              background: '#fff url(/images/trees.png)',
              showConfirmButton: false,
              timer: 1800,
              //       backdrop: `
              // rgba(0, 0, 0, 0.356)
              //   url("${meme}")
              //   left top
              //   no-repeat
              // `,
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
        setShowSignUp(true)
      }, 3500)
    }
  }
  return (
    <>
      <div
        className={classnames(styles.bg_under, !showSignUp && 'd-none')}
        onMouseDown={closeJoeyLogin}
      >
        <div
          className={classnames('bg-white', styles.signUp)}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={classnames('h-100', 'p-3', styles.Tommy_inner_bg)}>
            <div className={classnames('d-flex', 'justify-content-between')}>
              <p>歡迎</p>
              <i
                className={classnames('fas fa-times', styles.close)}
                onClick={closeJoeyLogin}
              ></i>
            </div>
            <h3>註冊</h3>
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
              label="暱稱"
              value={formCheck.nickname.value}
              onChange={(e) => {
                onChange({
                  key: 'nickname',
                  data: { value: e.target.value },
                })
              }}
              error={!formCheck.nickname.valid}
              errorText={formCheck.nickname.error}
              className={classnames('form-control', styles.input_size)}
              placeholder="Enter nickname"
            />
            <Input
              label="email"
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
              label="password"
              value={formCheck.password_signUp.value}
              onChange={(e) => {
                onChange({
                  key: 'password_signUp',
                  data: { value: e.target.value },
                })
              }}
              error={!formCheck.password_signUp.valid}
              errorText={formCheck.password_signUp.error}
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
                    password_signUp: { ...formCheck, value: 'W77w77' },
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
                'mt-3'
              )}
              onClick={() => {
                onSubmitHandler()
              }}
            >
              註冊
            </button>
            <div className="d-flex justify-content-center my-4">
              <ReCAPTCHA
                ref={reRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onChangeGoogle}
              />
            </div>
            {/* <button
              type=""
              className={classnames(
                styles.google_submit,
                'btn',
                'w-100',
                'mb-4'
              )}
            >
              <div className="d-flex justify-content-center">
                <img src={Google} alt="" />
                <span className={classnames('mx-5', styles.google)}>
                  使用 Google 帳戶註冊
                </span>
              </div>
            </button> */}
            {/* </form> */}
            <p className={classnames('text-center', styles.Tommy_to_login)}>
              已經有帳戶？點
              <span
                className={styles.here}
                onClick={() => {
                  closeJoeyLogin()
                  setShowLogin(true)
                }}
              >
                這裡
              </span>
              登入
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
