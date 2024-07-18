// NOTE 第一種
// import { useEffect } from 'react'
// import { useHistory } from 'react-router-dom'

// NOTE 第二種
import useTeamPush from '../useTeamPush'

const DemoLoginLogic = (props) => {
  const { user, setShowLogin } = props

  // NOTE 第二種
  useTeamPush(user)

  // NOTE 第一種
  // const history = useHistory()

  // useEffect(() => {
  //   !user.login && history.push('/')
  //   // eslint-disable-next-line
  // }, [user])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>登入邏輯演示</h2>
          {!user.login ? (
            <button className="btn team-btn" onClick={() => setShowLogin(true)}>
              請先登入後才能使用此服務
            </button>
          ) : (
            <button
              className="btn team-btn"
              onClick={() => alert(`看到代表您已成功登入: Hi ${user.nickname}`)}
            >
              您已經登入
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DemoLoginLogic
