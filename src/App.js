import { Router, Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'

// 共同部分
//import JoeyNav from './components/JoeyNav'
import EmmaNav from './components/EmmaNav/EmmaNav'
// import JoeyLogin from './components/JoeyLogin/JoeyLogin'

// 不要動 讓換頁時會捲回頂部
import ScrollToTop from './components/ScrollToTop'

///////////////////////////////////////
//tommy start
import Signup from './pages/accounts/SignUp/SignUp'
import Login from './pages/accounts/Login/Login'
import UserAdminIndex from './pages/accounts/UserAdminIndex/UserAdminIndex'
import SignCode from './pages/accounts/SignUp/SignCode'
import FindPassword from './pages/accounts/FindPassword/FindPassword'
import PasswordCode from './pages/accounts/FindPassword/PasswordCode'
import ResetPassword from './pages/accounts/FindPassword/ResetPassword'
import RefreshPassword from './pages/accounts/UserProfile/RefreshPassword'
import VertifyEmail from './pages/accounts/UserProfile/VertifyEmail'
import { API_HOST } from './config'
import ActiveEmail from './pages/accounts/ActiveEmail/ActiveEmail'

///////////////////////////////////////
// joey start
import MeetupGame from './pages/meetup/meetup-game'
import MeetupDemo from './pages/meetup-demo'
import DemoLoginLogic from './components/DemoLoginLogic'
import MeetupCreate from './pages/meetup/meetup-create'
import MeetupJoin from './pages/meetup/meetup-join'
import MeetupList from './pages/meetup/meetup-list'
import MeetupOne from './pages/meetup/meetup-one'
import MeetupMain from './pages/meetup/meetup-main'

///////////////////////////////////////
// leo start
import Audio from './pages/audio/Audio'
import Playing from './pages/audio/Playing'
import Playlist from './pages/audio/Playlist'

///////////////////////////////////////
// li start
import ProductsDetail from './pages/products/ProductsDetail'
import Products from './pages/products/Products'
import ProductSearchList from './pages/products/ProductSearchList'
import HereByYou from './pages/products/HereByYou'
import HereByYouDetail from './pages/products/HereByYouDetail'
///////////////////////////////////////
// henry start
import EmptyCart from './pages/carts/EmptyCart'
import ShopList from './pages/carts/ShopList'
import CheckOut from './pages/carts/CheckOut'
import FinishOrder from './pages/carts/FinishOrder'
import axios from 'axios'
import { Cart } from '../src/config/index'
///////////////////////////////////////
// emma start

///////////////////////////////////////

// test start
import Home from './pages/home'

// 不要動
import { history } from './joeyLink'
import EmmaFooter from './components/EmmaFooter/EmmaFooter'

//  get Init from localStorage incase user refresh
const getUserInit = () => {
  // NOTE 登出也是這回這個 並且只存一開始畫面呈現需要的
  const initUserState = {
    login: false,
    member_sid: '', //會員ID
    avatar: '', //大頭貼路徑
    nickname: '', //會員的暱稱
  }

  const previousLoginRecord = localStorage.getItem('member')

  // NOTE get previous User Info from localStorage (if there is)
  if (previousLoginRecord) {
    const { id, avatar, nickname } = JSON.parse(previousLoginRecord)
    initUserState.login = true
    initUserState.member_sid = id
    initUserState.avatar = avatar
    initUserState.nickname = nickname
  }

  // 賦予初始值
  return initUserState
}

const App = () => {
  const [user, setUser] = useState(getUserInit()) //控制會員登入狀態
  // const [showJoeyLogin, setShowJoeyLogin] = useState(false) //控制是否顯示會員表單 請改用下面的showLogin
  // ------------以下都Tommy的--------------
  const [showLogin, setShowLogin] = useState(false) //控制是否顯示會員表單
  const [showSignUp, setShowSignUp] = useState(false)
  const [sendVerificationCode, setSendVerificationCode] = useState(false)
  const [forgetPassword, setForgetPassword] = useState(false)
  const [sendPasswordCode, setSendPasswordCode] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [emailInPassword, setEmailInPassword] = useState('')
  const [emailInSignUp, setEmailInSignUp] = useState('')
  const [refresh, setRefresh] = useState('')
  const [isActive, setIsActive] = useState('個人資訊')
  const [vertifyEmail, setVertifyEmail] = useState(false)
  const [navAvatar, setNavAvatar] = useState({})
  const [whoInpassword, setWhoInpassword] = useState('')
  // const [emailInVertify, setEmailInVertify] = useState('')
  //  fetch頭貼

  useEffect(() => {
    // !user.login && history.push('/')
    if (user.login) {
      ;(async () => {
        getMember()
      })()
    }
    // console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  async function getMember() {
    const token = localStorage.getItem('token')

    await fetch(API_HOST + '/members/profile/edit/' + user.member_sid, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj.result)
        if (obj.success) {
          setNavAvatar(obj.result.avatar)
        } else {
          history.push('/')
          console.log(obj.error)
        }
      })
  }
  // ------------以上都Tommy的--------------

  //------------以下都henry的---------------
  //設定購物車裡面商品的數量
  const [itemNumber, setItemNumber] = useState(0)

  useEffect(() => {
    if (user.login) {
      ;(async () => {
        const r = await axios.get(Cart + `/${user.member_sid}`)
        const quantity = r.data.reduce((a, b) => a + b.quantity, 0)
        setItemNumber(quantity)
      })()
    }
    if (!user.login) setItemNumber(0)
  }, [user])
  //設定取貨門市
  const [store, setStore] = useState({ store: '', address: '' })
  //顯示門市名稱、地址
  const [showStore, setShowStore] = useState(false)
  //------------以上都henry的---------------

  return (
    <Router history={history}>
      <>
        {/* WARN 除了 modal外 不可以放在這區 */}
        {/* 上方Nav */}
        <EmmaNav
          isActive={isActive}
          setIsActive={setIsActive}
          user={user}
          setUser={setUser}
          // setShowJoeyLogin={setShowJoeyLogin}
          setShowSignUp={setShowSignUp}
          setShowLogin={setShowLogin}
          itemNumber={itemNumber}
          setItemNumber={setItemNumber}
          navAvatar={navAvatar}
          setNavAvatar={setNavAvatar}
        />
        {/* <JoeyNav
          user={user}
          setUser={setUser}
          // setShowJoeyLogin={setShowJoeyLogin}
          setShowSignUp={setShowSignUp}
          setShowLogin={setShowLogin}
        /> */}
        {/* 登入表單 */}
        {/* <JoeyLogin
          setUser={setUser}
          showJoeyLogin={showJoeyLogin}
          setShowJoeyLogin={setShowJoeyLogin}
        /> */}
        {/* ------以下都Tommy的----- */}
        <Login
          user={user}
          setUser={setUser}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          setForgetPassword={setForgetPassword}
        />
        {/* 註冊表單 */}
        <Signup
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          sendVerificationCode={sendVerificationCode}
          setSendVerificationCode={setSendVerificationCode}
          setShowLogin={setShowLogin}
          setEmailInSignUp={setEmailInSignUp}
          setSendPasswordCode={setSendPasswordCode}
        />
        <SignCode
          setShowLogin={setShowLogin}
          sendVerificationCode={sendVerificationCode}
          setSendVerificationCode={setSendVerificationCode}
          emailInSignUp={emailInSignUp}
          setUser={setUser}
        />
        <FindPassword
          setShowLogin={setShowLogin}
          sendVerificationCode={sendVerificationCode}
          setSendVerificationCode={setSendVerificationCode}
          forgetPassword={forgetPassword}
          setForgetPassword={setForgetPassword}
          setSendPasswordCode={setSendPasswordCode}
          setEmailInPassword={setEmailInPassword}
        />
        <PasswordCode
          setShowLogin={setShowLogin}
          sendPasswordCode={sendPasswordCode}
          setSendPasswordCode={setSendPasswordCode}
          setResetPassword={setResetPassword}
          emailInPassword={emailInPassword}
        />
        <ResetPassword
          setShowLogin={setShowLogin}
          resetPassword={resetPassword}
          setResetPassword={setResetPassword}
          emailInPassword={emailInPassword}
          setUser={setUser}
          whoInpassword={whoInpassword}
        />
        <RefreshPassword
          resetPassword={resetPassword}
          setResetPassword={setResetPassword}
          refresh={refresh}
          setRefresh={setRefresh}
          setSendPasswordCode={setSendPasswordCode}
          setEmailInPassword={setEmailInPassword}
          setUser={setUser}
        />
        <VertifyEmail
          vertifyEmail={vertifyEmail}
          setVertifyEmail={setVertifyEmail}
          setSendVerificationCode={setSendVerificationCode}
          setEmailInSignUp={setEmailInSignUp}
          setUser={setUser}
        />

        {/* ------以上都Tommy的----- */}

        <ScrollToTop>
          <Switch>
            {/* Tommy part start */}
            <Route exact path="/admin/user/:task?/:id?/:order_id?">
              <UserAdminIndex
                isActive={isActive}
                setIsActive={setIsActive}
                user={user}
                setUser={setUser}
                setRefresh={setRefresh}
                setVertifyEmail={setVertifyEmail}
                setNavAvatar={setNavAvatar}
                // setEmailInVertify={setEmailInVertify}
              />
            </Route>
            <Route path="/vertify-email/:verification_code?/:text?" exact>
              <ActiveEmail
                user={user}
                setUser={setUser}
                setShowLogin={setShowLogin}
                setResetPassword={setResetPassword}
                setWhoInpassword={setWhoInpassword}
                setRefresh={setRefresh}
              />
            </Route>
            {/* Tommy part end */}

            {/* Joey part start */}
            {/* TODO: remove meetup-demo */}
            <Route path="/meetup/game" component={MeetupGame} />

            <Route path="/meetup-demo" component={MeetupDemo} />

            <Route path="/demo" exact>
              <DemoLoginLogic user={user} setShowLogin={setShowLogin} />
            </Route>

            <Route
              path="/meetup/create"
              exact
              render={(props) => (
                <MeetupCreate
                  {...props}
                  user={user}
                  setShowLogin={setShowLogin}
                />
              )}
            />

            <Route path="/meetup/join" exact component={MeetupJoin} />
            <Route path="/meetup/list" exact component={MeetupList} />

            {/* TODO: fixed side nav height when change to new nav */}
            <Route
              path="/meetup/list/:id"
              exact
              render={(props) => (
                <MeetupOne {...props} user={user} setShowLogin={setShowLogin} />
              )}
            />

            <Route path="/meetup" exact component={MeetupMain} />
            {/* Joey part end */}

            {/* Leo part start */}
            <Route path="/audio/playing">
              <Playing />
            </Route>
            <Route path="/audio/playlist">
              <Playlist />
            </Route>
            <Route path="/audio">
              <Audio />
            </Route>
            {/* Leo part end */}

            {/* emma part start */}
            <Route path="/">
              <Audio />
            </Route>
            {/* emma part end */}
          </Switch>
        </ScrollToTop>
        {/* 頁尾 */}
        {/* TO EMMA 我需要視情況生成footer by Joey */}
        {/* <EmmaFooter /> */}
      </>
    </Router>
  )
}

export default App
