import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { API_HOST } from './../../../config'
// import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import styles from './FindPassword.module.scss'

function FindPassword(props) {
  const {
    // setShowLogin,
    forgetPassword,
    setForgetPassword,
    setSendPasswordCode,
    setEmailInPassword,
  } = props
  const closeJoeyLogin = () => setForgetPassword(false)
  const defaultForm = {
    text: 'FindPassword',
    account: { value: '', valid: true, error: '' },
    email: { value: '', valid: true, error: '' },
  }
  const [formCheck, setFormCheck] = useState(defaultForm)

  // const randomFns = () => {
  //   // 生成6位随机数
  //   let code = ''
  //   for (let i = 0; i < 6; i++) {
  //     code += parseInt(Math.random() * 10)
  //   }
  //   return code
  // }
  // const verification_code = randomFns()
  const findPassword = {
    account: formCheck.account.value,
    email: formCheck.email.value,
    // verification_code: verification_code,
  }

  useEffect(() => {
    if (!forgetPassword) {
      setFormCheck(defaultForm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgetPassword])

  const onChange = ({ key, data }) => {
    setFormCheck({ ...formCheck, [key]: { ...formCheck[key], ...data } })
  }

  // const sendEmail = async () => {
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
  const accountReg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const onSubmitHandler = (e) => {
    // e.preventDefault()
    setEmailInPassword(formCheck.email.value)
    const newForm = clearError(formCheck, ['email'])
    let errorStatus = 0
    if (!accountReg.test(newForm.account.value)) {
      newForm.account = {
        ...newForm.account,
        valid: false,
        error: '帳號需字母開頭，長度在2-15之間',
      }
      errorStatus = 400
    }
    if (!emailReg.test(newForm.email.value)) {
      newForm.email = {
        ...newForm.email,
        valid: false,
        error: '請輸入Email格式',
      }
      errorStatus = 400
    }

    setFormCheck({ ...formCheck, ...newForm })

    if (errorStatus === 400) {
      return
    }
    // const fd = new FormData(document.joeyLoginForm)

    fetch(API_HOST + '/find-password', {
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
          // sendEmail()
          // Swal.fire({
          //   title: '送出信件中',
          //   width: 400,
          //   icon: 'success',
          //   padding: '2em',
          //   background: '#fff url(/images/trees.png)',
          //   showConfirmButton: false,
          //   timer: 1500,
          //   backdrop: `
          //     rgba(0, 0, 0, 0.356)
          //       url("${meme}")
          //       left top
          //       no-repeat
          //     `,
          // })
          closeJoeyLogin()
          setFormCheck(defaultForm)
          setTimeout(() => {
            setSendPasswordCode(true)
          }, 1000)
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
        className={classnames(
          styles.Tommy_bg_under,
          !forgetPassword && 'd-none'
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
              <h3>找回密碼</h3>
              <i
                className={classnames('fas fa-times', styles.close)}
                onClick={closeJoeyLogin}
              ></i>
            </div>
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
            <div className="d-flex justify-content-end">
              <p
                onClick={() => {
                  setFormCheck({
                    ...formCheck,
                    account: { ...formCheck.account, value: 'tommy222' },
                    email: { ...formCheck, value: 'tommy8852024@gmail.com' },
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

export default withRouter(FindPassword)
