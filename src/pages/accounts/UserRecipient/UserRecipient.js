import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import styles from './UserRecipent.module.scss'
import { useParams, useHistory } from 'react-router-dom'
import { API_HOST } from './../../../config'
import Swal from 'sweetalert2'
// import meme from './../images/nyan-cat.gif'
import Input from './../Input'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'

function UserRecipient(props) {
  const { setShowAvatar, user, setIsActive } = props
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  let [color] = useState('#e88239')
  let [loading] = useState(true)
  const defaultForm = {
    name: { value: '', valid: true, error: '' },
    mobile: { value: '', valid: true, error: '' },
    email: { value: '', valid: true, error: '' },
    address: { value: '', valid: true, error: '' },
  }
  const [recipientForm, setRecipientForm] = useState(defaultForm)
  const recipient = {
    member_id: id,
    name: recipientForm.name.value,
    mobile: recipientForm.mobile.value,
    email: recipientForm.email.value,
    address: recipientForm.address.value,

    // sub_total: 0,
    // discount: 0,
    // shipping: 0,
    // total: 0,
    // payment: '',
    // order_status: '',
    // product_delivery: '',
    // delivery_status: '',
    // shipping_address: recipientForm.shipping_address.value,
    // consignee: '',
    // consignee_phone: '',
    // remark: '',
  }

  useEffect(() => {
    if (user.login) {
      ;(async () => {
        // setTimeout(() => {
        getAvatar(id)
        getMember(id)
        // console.log('hi')
        // }, 1000)
      })()
      setIsActive('收件資訊')

      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => {
        setIsLoading('')
        clearTimeout()
        setIsActive('')
      }
    } else {
      history.push('/')
    }
    // !user.login && history.push('/')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user])

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
  const onChange = ({ key, data }) => {
    setRecipientForm({
      ...recipientForm,
      [key]: { ...recipientForm[key], ...data },
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
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const mobileReg = /^09\d{2}-?\d{3}-?\d{3}$/
  const history = useHistory()

  const token = localStorage.getItem('token')

  async function getMember(id) {
    await fetch(API_HOST + '/members/recipient/edit/' + id, {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
        // Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      // body: JSON.stringify(profileForm),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          if (obj.result) {
            setRecipientForm({
              ...recipientForm,
              name: {
                ...recipientForm.name,
                value: obj.result.name,
              },
              mobile: {
                ...recipientForm.mobile,
                value: obj.result.mobile,
              },
              email: {
                ...recipientForm.email,
                value: obj.result.email,
              },
              address: {
                ...recipientForm.address,
                value: obj.result.address,
              },
            })
            // setShowAvatar(user.avatar)
          }

          // {moment(obj.result.birthday).format('YYYY-MM-DD')}
          // { ...profileForm.gender, value: 'Male' }
        } else {
          // alert('登入失敗\n' + (obj.error || ''))
          Swal.fire({
            title: '讀取失敗\n' + (obj.error || ''),
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
          history.push('/')

          // console.log(obj.error )
        }
      })
  }
  // const test = localStorage.getItem('member')
  const onSubmitHandler = (e) => {
    const newForm = clearError(recipientForm, [
      'user_name',
      'user_phone',
      'user_email',
    ])
    let errorStatus = 0
    if (!newForm.name.value) {
      newForm.name = {
        ...newForm.name,
        valid: false,
        error: '不得填空',
      }
      errorStatus = 400
    }
    if (!mobileReg.test(newForm.mobile.value)) {
      newForm.mobile = {
        ...newForm.mobile,
        valid: false,
        error: '請輸入手機的格式',
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

    setRecipientForm({ ...recipientForm, ...newForm })

    if (errorStatus === 400) {
      return
    }

    fetch(API_HOST + '/members/recipient/edit/' + id, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(recipient),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(recipient)
        // console.log(obj)
        if (obj.success) {
          Swal.fire({
            title: '您已成功修改',
            width: 400,
            icon: 'success',
            padding: '2em',
            background: '#fff url(/images/trees.png)',
            showConfirmButton: false,
            timer: 1500,
            // backdrop: `
            // rgba(0, 0, 0, 0.356)
            //   url("${meme}")
            //   left top
            //   no-repeat
            // `,
          })
          // setProfileForm(defaultForm)
        } else {
          // alert('登入失敗\n' + (obj.error || ''))
          Swal.fire({
            title: '修改失敗\n' + (obj.error || ''),
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
        }
      })
  }

  // -------spin樣式
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
        'pb-4',
        'border-bottom-0'
      )}
    >
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
  // ----------主體------------
  const display = (
    <div className="" onClick={(e) => e.stopPropagation()}>
      <div
        className={classnames(
          styles.profile_top,
          'd-flex',
          'justify-content-between',
          'pb-4'
        )}
      >
        <div className={classnames(styles.titleText)}>收件資訊管理</div>

        <button
          type="submit"
          className={classnames(
            'd-none',
            'd-lg-block',
            'btn',
            'btn-dark',
            // 'animate__animated',
            // 'animate__infinite',
            // // 'animate__slow ',
            // 'animate__delay-2s',
            // 'animate__pulse',
            styles.modify_button
          )}
          onClick={() => {
            onSubmitHandler()
          }}
        >
          修改
        </button>
      </div>
      <div className="pt-5">
        <Input
          label="姓名"
          value={recipientForm.name.value}
          onChange={(e) => {
            onChange({
              key: 'name',
              data: { value: e.target.value },
            })
          }}
          error={!recipientForm.name.valid}
          errorText={recipientForm.name.error}
          className={classnames('form-control', 'p-4', styles.input_size)}
          placeholder="Enter name"
        />
        <Input
          label="手機"
          value={recipientForm.mobile.value}
          onChange={(e) => {
            onChange({
              key: 'mobile',
              data: { value: e.target.value },
            })
          }}
          error={!recipientForm.mobile.valid}
          errorText={recipientForm.mobile.error}
          className={classnames('form-control', 'p-4', styles.input_size)}
          placeholder="Enter mobile"
        />
        <Input
          label="Email"
          value={recipientForm.email.value}
          onChange={(e) => {
            onChange({
              key: 'email',
              data: { value: e.target.value },
            })
          }}
          error={!recipientForm.email.valid}
          errorText={recipientForm.email.error}
          className={classnames('form-control', 'p-4', styles.input_size)}
          placeholder="Enter email"
        />
        <Input
          label="收件人地址"
          value={recipientForm.address.value}
          onChange={(e) => {
            onChange({
              key: 'address',
              data: { value: e.target.value },
            })
          }}
          error={!recipientForm.address.valid}
          errorText={recipientForm.address.error}
          className={classnames('form-control', 'p-4', styles.input_size)}
          placeholder="請輸入地址"
          type="text"
        />
        <p
          onClick={() => {
            setRecipientForm({
              ...recipientForm,
              name: { ...recipientForm.name, value: '天才小釣手' },
              email: { ...recipientForm, value: 'tommy8852024@gmail.com' },
              mobile: { ...recipientForm, value: '0933444555' },
              password: { ...recipientForm, value: 'W77w77' },
              address: { ...recipientForm, value: '台北市信義區101號' },
            })
          }}
          className={classnames(styles.OKButton, 'btn', 'btn-secondary')}
        >
          一鍵Ok
        </p>
        <div className={classnames(styles.phone_modify_button, 'd-lg-none')}>
          <button
            type="submit"
            className={classnames(
              'd-lg-none',
              'btn',
              'btn-dark',
              styles.modify_button
            )}
            onClick={() => {
              onSubmitHandler()
            }}
          >
            修改
          </button>
        </div>
      </div>
    </div>
  )
  return <>{isLoading ? spinner : display}</>
}

export default UserRecipient
