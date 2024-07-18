import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { Icon } from '@iconify/react'
import emma_here_logo from './EmmaImg/emma_here_logo.png'
import EmmaProfile from './EmmaProfile'
import './EmmaNav.scss'
import ProductSearch from '../../pages/products/ProductSearch' // Li added
function EmmaNav({
  setShowLogin,
  setShowSignUp,
  user,
  setUser,
  itemNumber,
  history, //joey added
  location,
  isActive, //Tommy added
  setIsActive, //Tommy added
  navAvatar,
  // setNavAvatar,
}) {
  const [showMeetup, setShowMeetup] = useState(false)
  const showMeetupDropdown = (e) => {
    setShowMeetup(true)
  }
  const hideMeetupDropdown = (e) => {
    setShowMeetup(false)
  }

  // TODO:
  // 1. fix nav-link height 56px -done
  // 2. fix active state 'active' : '' -done
  // 3. li_maxWidth 內縮 -待辦
  // 4. 左下角的link 判斷問題 -待辦
  const [navColor, setNavColor] = useState(location.pathname.slice(1))

  // NOTE 10/31 added by Joey : just in case history.push change the pathname
  useEffect(() => {
    setNavColor(location.pathname.slice(1))
  }, [location.pathname])

  return (
    <>
      {/* FIX */}
      <div className="li_maxWidth j-fixed-vertical-align">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="white"
          fixed="top"
          className="emma-nav"
        >
          <Navbar.Brand
          // as={NavLink}
          // to="/"
          // onClick={() => setNavColor('')} // 在這邊控active class state
          >
            <div className="emma-nav-here-logo">
              <img src={emma_here_logo} alt="" />
            </div>
          </Navbar.Brand>
          <div className="ml-auto align-items-center d-lg-none mr-n2">
            <Nav.Link className="d-flex">
              <Icon
                icon="clarity:shopping-cart-line"
                width="22"
                onClick={() => {
                  if (user.login) {
                    if (itemNumber === 0) {
                      history.push('/cart')
                    } else {
                      history.push('/shopList')
                    }
                  } else {
                    setShowLogin(true)
                  }
                }}
              />
              <div className="ml-1 emma-number-color">{itemNumber}</div>
            </Nav.Link>
          </div>
          <Navbar.Toggle
            className="emma-navbar-toggle"
            aria-controls="responsive-navbar-nav"
          >
            <span>
              <Icon icon="ci:menu-duo" color="black" width="24" height="24" />
            </span>
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#search" className="d-lg-none">
                Search
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to="/products"> */}
              {/* <Nav.Link className={'j-nav-active'} to="/products"> */}

              <Nav.Link
              // className={navColor === 'New Releases' ? 'j-nav-active' : ''}
              // as={NavLink}
              // to="/products"
              // onClick={() => setNavColor('New Releases')} // 在這邊控active class state
              >
                New Releases
              </Nav.Link>
              <Nav.Link
              // className={navColor === 'Customized' ? 'j-nav-active' : ''}
              // as={NavLink}
              // to="/customized"
              // onClick={() => setNavColor('Customized')} // 在這邊控active class state
              >
                Customized
              </Nav.Link>

              <Nav.Link
                className={
                  navColor === 'Beat It' || navColor === ''
                    ? 'j-nav-active'
                    : ''
                }
                as={NavLink}
                to="/audio"
                onClick={() => setNavColor('Beat It')} // 在這邊控active class state
              >
                Beat It
              </Nav.Link>

              {/* 會員小螢幕 */}
              <EmmaProfile
                isActive={isActive} //Tommy added
                setIsActive={setIsActive} //Tommy added
                navAvatar={navAvatar} //Tommy added
                user={user}
                setUser={setUser}
                setShowLogin={setShowLogin}
                setShowSignUp={setShowSignUp}
                styleName={'d-lg-none d-sm-block'}
              />
            </Nav>

            {/* 會員大螢幕 */}
            {/* <EmmaProfile
              isActive={isActive} //Tommy added
              setIsActive={setIsActive} //Tommy added
              navAvatar={navAvatar} //Tommy added
              user={user}
              setUser={setUser}
              setShowLogin={setShowLogin}
              setShowSignUp={setShowSignUp}
              styleName={'d-none d-lg-block ml-n2'}
            /> */}

            <div className="emma-cart-color d-none d-none d-lg-block ">
              {/* <Nav.Link className=" ml-n2 d-flex align-items-center">
                <Icon
                  icon="clarity:shopping-cart-line"
                  width="22"
                  onClick={() => {
                    if (user.login) {
                      if (itemNumber === 0) {
                        history.push('/cart')
                      } else {
                        history.push('/shopList')
                      }
                    } else {
                      setShowLogin(true)
                    }
                  }}
                />
                <div className="d-none d-lg-block ml-1 emma-number-color">
                  {itemNumber}
                </div>
              </Nav.Link> */}
            </div>
          </Navbar.Collapse>
        </Navbar>
        {/* fixed nav height */}
        <div style={{ height: '56px' }}></div>
      </div>
    </>
  )
}

export default withRouter(EmmaNav) //joey added
