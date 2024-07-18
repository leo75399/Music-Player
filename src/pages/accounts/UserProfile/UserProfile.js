import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import styles from './UserProfile.module.scss'
import { API_HOST } from './../../../config'
import { IMG_PATH, UPLOAD_AVATAR } from './../../../config'
import Input from './../Input'
import { Icon } from '@iconify/react'

// import Avatar from './../images/IMG_0001.jpeg'
import moment from 'moment'
import Swal from 'sweetalert2'
// import meme from './../images/nyan-cat.gif'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'
import axios from 'axios'

function UserProfile(props) {
  const {
    user,
    showAvatar,
    setShowAvatar,
    setRefresh,
    setVertifyEmail,
    setIsActive,
    setNavAvatar,
    // setEmailInVertify,
  } = props
  const { id } = useParams()
  // const { user, setUser } = props

  const [isLoading, setIsLoading] = useState(true)
  let [imgSrc, setImgSrc] = useState('')
  const [emailActive, seTEmailActive] = useState(false)

  let [color] = useState('#e88239')
  let [loading] = useState(true)

  const doUpload = async () => {
    const fd = new FormData(document.form1)
    const r = await axios.post(UPLOAD_AVATAR + id, fd)

    // console.log(r.data)
    setImgSrc(r.data.filename)
    // setShowAvatar(r.data.filename)
    setShowAvatar({ ...showAvatar, avatar: r.data.filename })
    setNavAvatar(r.data.filename)

    // localStorage.setItem('a','新的值')
    // const token = localStorage.getItem('token')
    // const data = localStorage.getItem('member')
    // console.log(data)
  }

  const defaultForm = {
    avatar: { value: '', valid: true, error: '' },
    account: { value: '', valid: true, error: '' },
    nickname: { value: '', valid: true, error: '' },
    email: { value: '', valid: true, error: '' },
    mobile: { value: '', valid: true, error: '' },
    gender: { value: '', valid: true, error: '' },
    birthday: { value: '', valid: true, error: '' },
    address: { value: '', valid: true, error: '' },
  }
  const [profileForm, setProfileForm] = useState(defaultForm)

  const profile = {
    avatar: profileForm.avatar.value,
    account: profileForm.account.value,
    nickname: profileForm.nickname.value,
    email: profileForm.email.value,
    mobile: profileForm.mobile.value,
    gender: profileForm.gender.value,
    birthday: profileForm.birthday.value,
    verification_code: '',
  }
  // const test = (profileForm.birthday.value).toString()
  // const [selectedDate, setSelectedDate] = useState(new Date(test))

  const onChange = ({ key, data }) => {
    setProfileForm({ ...profileForm, [key]: { ...profileForm[key], ...data } })
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
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const nicknameReg = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
  const mobileReg = /^09\d{2}-?\d{3}-?\d{3}$/
  const history = useHistory()

  const token = localStorage.getItem('token')
  useEffect(() => {
    // !user.login && history.push('/')
    if (user.login) {
      ;(async () => {
        setTimeout(() => {
          getMember(id)
        }, 1000)
      })()
      setIsActive('個人資訊')
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => {
        clearTimeout()
        setIsLoading('')
        setIsActive('')
      }
    } else {
      history.push('/')
    }
    // console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, emailActive])

  // useEffect(() => {
  //   getMember(id)
  //   // console.log(emailActive)
  //   !user.login && history.push('/')

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id, user, emailActive])

  async function getMember(id) {
    await fetch(API_HOST + '/members/profile/edit/' + id, {
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
          seTEmailActive(obj.result.verification_status)
          setProfileForm({
            ...profileForm,
            account: { ...profileForm.account, value: obj.result.account },
            nickname: { ...profileForm.nickname, value: obj.result.nickname },
            email: { ...profileForm.email, value: obj.result.email },
            mobile: { ...profileForm.mobile, value: obj.result.mobile },
            gender: { ...profileForm.gender, value: obj.result.gender },
            birthday: {
              ...profileForm.birthday,
              // moment(birthday, 'YYYY-MM-DD').format('YYYY/MM/DD)
              //moment(birthday.slice(0, 10), 'YYYY-MM-DD').format('YYYY/MM/DD)
              value: moment(obj.result.birthday).format('YYYY-MM-DD'),
              // value: obj.result.birthday.slice(0, 10),
            },
            avatar: { ...profileForm.avatar, value: obj.result.avatar },
          })
          setImgSrc(obj.result.avatar)
          setShowAvatar({
            avatar: obj.result.avatar,
            nickname: obj.result.nickname,
          })
          // setEmailInVertify(obj.result.email)
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
    const newForm = clearError(profileForm, [
      'account',
      'nickname',
      'email',
      'mobile',
    ])
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

    if (!mobileReg.test(newForm.mobile.value)) {
      newForm.mobile = {
        ...newForm.mobile,
        valid: false,
        error: '請輸入手機的格式',
      }
      errorStatus = 400
    }

    setProfileForm({ ...profileForm, ...newForm })

    if (errorStatus === 400) {
      return
    }

    fetch(API_HOST + '/members/profile/edit/' + id, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(profile),
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(profile)
        // console.log(obj)
        if (obj.success) {
          // const swalWithBootstrapButtons = Swal.mixin({
          //   customClass: {
          //     confirmButton: 'btn bg-white font-italic',
          //   },
          //   buttonsStyling: false
          // })

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
    <div
      className={classnames(styles.bgSection)}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <form> */}
      <div
        className={classnames(
          styles.profile_top,
          'd-lg-flex',
          'justify-content-between',
          'pb-4'
        )}
      >
        {/* <h2>個人資料管理</h2> */}
        <div className={classnames(styles.titleText)}>個人資料管理</div>
        <button
          type="submit"
          className={classnames(
            'd-none',
            'd-lg-block',
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
      <div className={classnames('p-4')}>
        <div className={classnames(styles.avatarBg)}>
          {/* <img
            className={classnames(styles.avatar, 'rounded-circle', 'my-4')}
            src={Avatar}
            alt=""
          /> */}
          <img
            className={classnames(styles.avatar, 'rounded-circle', 'my-4')}
            src={
              imgSrc
                ? IMG_PATH + '/' + imgSrc
                : IMG_PATH + '/default-avatar.jpg'
            }
            alt=""
            width="300px"
            onClick={(e) => document.querySelector('#Tommy_avatar').click()}
          />
          <form name="form1" style={{ display: 'none' }}>
            <input
              type="file"
              id="Tommy_avatar"
              name="avatar"
              accept="image/*"
              onChange={doUpload}
            />
          </form>
        </div>

        <Input
          label="帳號"
          value={profileForm.account.value}
          onChange={(e) => {
            onChange({
              key: 'account',
              data: { value: e.target.value },
            })
          }}
          error={!profileForm.account.valid}
          errorText={profileForm.account.error}
          className={classnames('form-control', styles.input_size)}
          placeholder="Enter account"
          disabled
        />
        <Input
          label="暱稱"
          value={profileForm.nickname.value}
          onChange={(e) => {
            onChange({
              key: 'nickname',
              data: { value: e.target.value },
            })
          }}
          error={!profileForm.nickname.valid}
          errorText={profileForm.nickname.error}
          className={classnames('form-control', styles.input_size)}
          placeholder="Enter nickname"
        />
        <Input
          label="Email"
          value={profileForm.email.value}
          onChange={(e) => {
            onChange({
              key: 'email',
              data: { value: e.target.value },
            })
          }}
          error={!profileForm.email.valid}
          errorText={profileForm.email.error}
          className={classnames('form-control', styles.input_size)}
          placeholder="Enter email"
          disabled
        />
        <div className={classnames('d-flex justify-content-between')}>
          <div className={classnames(emailActive ? 'd-none' : '')}>
            <Icon
              icon="bpmn:end-event-cancel"
              className={classnames(styles.cancel)}
            />
            您的Email沒有驗證
          </div>
          <button
            className={classnames(
              emailActive ? 'd-none' : '',
              'btn',
              styles.verifyButton
            )}
            onClick={() => {
              setVertifyEmail(true)
            }}
          >
            驗證
          </button>
        </div>
        <div className={classnames(emailActive ? '' : 'd-none')}>
          <Icon
            icon="teenyicons:tick-circle-solid"
            className={classnames(styles.tick)}
          />
          您的Email已通過驗證
        </div>

        <button
          className={classnames('btn', styles.refreshPassword)}
          onClick={() => {
            setRefresh(true)
          }}
        >
          更改密碼
        </button>

        <Input
          label="手機號碼"
          value={profileForm.mobile.value}
          onChange={(e) => {
            onChange({
              key: 'mobile',
              data: { value: e.target.value },
            })
          }}
          error={!profileForm.mobile.valid}
          errorText={profileForm.mobile.error}
          className={classnames('form-control', styles.input_size)}
          placeholder="Enter mobile"
        />

        <p>性別</p>
        <div className={classnames('mb-3', 'd-flex', styles.gender)}>
          <div
            className={classnames(
              {
                [styles.gender_active]: profileForm.gender.value === 'Male',
              },
              styles.gender_option,
              'mr-4'
            )}
            // onClick={() => setProfileForm({ ...profileForm, gender: { ...profileForm.gender, value: 'Male' }})}
            onClick={() => {
              onChange({
                key: 'gender',
                data: { value: 'Male' },
              })
            }}
          >
            Male
          </div>
          <div
            className={classnames(
              {
                [styles.gender_active]: profileForm.gender.value === 'Female',
              },
              styles.gender_option
            )}
            onClick={() =>
              onChange({
                key: 'gender',
                data: { value: 'Female' },
              })
            }
          >
            Female
          </div>
        </div>

        <Input
          label="生日"
          // moment(profileForm.birthday.value).format()
          // value={moment(profileForm.birthday.value).format('YYYY-MM-DD')}
          value={profileForm.birthday.value}
          onChange={(e) => {
            onChange({
              key: 'birthday',
              data: { value: e.target.value },
            })
          }}
          error={!profileForm.birthday.valid}
          errorText={profileForm.birthday.error}
          className={classnames('form-control', styles.input_size)}
          placeholder="Enter birthday"
          type="date"
          max={moment(Date.now()).format('YYYY-MM-DD')}
          // moment(Date.now()).format('YYYY-MM-DD')
        />
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

export default UserProfile
