import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { API_HOST } from './../../../config'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import styles from './PasswordCode.module.scss'

function PasswordCode(props) {
  const {
    sendPasswordCode,
    setSendPasswordCode,
    setResetPassword,
    emailInPassword,
  } = props
  const closeJoeyLogin = () => setSendPasswordCode(false)
  // const code = JSON.parse(localStorage.getItem('code'))
  // const defaultForm = {
  //   verification_code: { value: '', valid: true, error: '' },
  // }
  // const [formCheck, setFormCheck] = useState(defaultForm)

  const signUpCodeForm = {
    email: emailInPassword,
    // verification_code: formCheck.verification_code.value,
  }

  useEffect(() => {
    // if (!sendPasswordCode) {
    //   setFormCheck(defaultForm)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendPasswordCode])

  // const onChange = ({ key, data }) => {
  //   setFormCheck({ ...formCheck, [key]: { ...formCheck[key], ...data } })
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
  const codeReg = /^\d{6}$/
  const onSubmitHandler = (e) => {
    // e.preventDefault()
    // const newForm = clearError(formCheck, ['verification_code'])
    // let errorStatus = 0

    // if (!codeReg.test(newForm.verification_code.value)) {
    //   newForm.verification_code = {
    //     ...newForm.verification_code,
    //     valid: false,
    //     error: '只能輸入6位數數字',
    //   }
    //   errorStatus = 400
    // }

    // setFormCheck({ ...formCheck, ...newForm })

    // if (errorStatus === 400) {
    //   return
    // }
    // const fd = new FormData(document.joeyLoginForm)

    fetch(API_HOST + '/find-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpCodeForm),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj)
        if (obj.success) {
          // NOTE 登入成功時 將初始畫面呈現需要的資料寫入localStorage 避免user refresh
          // localStorage.setItem('token', obj.token)
          // localStorage.setItem('member', JSON.stringify(obj.member)) // 儲存到 localStorage

          Swal.fire({
            title: '已重新發送',
            width: 400,
            icon: 'success',
            padding: '2em',
            background: '#fff url(/images/trees.png)',
            showConfirmButton: false,
            timer: 1500,
            backdrop: `
            rgba(0, 0, 0, 0.356)
              url("${meme}")
              left top
              no-repeat
            `,
          })

          // const { id, avatar, nickname } = obj.member

          // NOTE update user state
          // console.log(obj)
          // closeJoeyLogin()
          // setTimeout(() => {
          //   setResetPassword(true)
          // }, 2000)
          // setFormCheck(defaultForm)
        } else {
          Swal.fire({
            title: '送出失敗\n' + (obj.error || ''),
            width: 400,
            icon: 'warning',
            padding: '2em',
            background: '#fff url(/images/trees.png)',
            showConfirmButton: false,
            timer: 1800,
            backdrop: `
            rgba(0, 0, 0, 0.356)
              url("${meme}")
              left top
              no-repeat
            `,
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
          !sendPasswordCode && 'd-none'
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
              <h2>請到信箱收取驗證信</h2>
              <i
                className={classnames('fas fa-times', styles.close)}
                onClick={closeJoeyLogin}
              ></i>
            </div>
            <div className={classnames('mt-3')}>
              {/* <Input
                label="請輸入驗證碼"
                value={formCheck.verification_code.value}
                onChange={(e) => {
                  onChange({
                    key: 'verification_code',
                    data: { value: e.target.value },
                  })
                }}
                error={!formCheck.verification_code.valid}
                errorText={formCheck.verification_code.error}
                className={classnames('form-control', styles.input_size)}
                placeholder="輸入驗證碼"
              /> */}

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
      </div>
    </>
  )
}

export default withRouter(PasswordCode)
