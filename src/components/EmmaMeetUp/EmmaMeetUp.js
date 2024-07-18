import React from 'react'
import { Link } from 'react-router-dom'
import './EmmaMeetUp.scss'
import Lottie from 'react-lottie'

function EmmaMeetUp({ index, title, animationData, height, width }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="emma-no-deco">
      <Link to="/meetup">
        <div className="emma-bg">
          <div className="emma-home-meetup-word-line-wrap1 d-flex w-100 justify-content-between justify-content-lg-start">
            <div className="emma-home-meetup-items-word py-3 pr-5 px-lg-5 my-lg-4 font-weight-bold">
              0{index + 1}
            </div>
            <div className="emma-home-meetup-items-word py-3 px-lg-5 my-lg-4">
              {title}
            </div>
            <div className="emma-meetup-img d-none d-lg-block">
              <div className="emma-lottie">
                <Lottie
                  options={defaultOptions}
                  height={height}
                  width={width}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EmmaMeetUp
