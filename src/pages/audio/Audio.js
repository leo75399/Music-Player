import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BsMusicPlayer } from 'react-icons/bs'

import video1 from './image/index/videob.mp4'
import video2 from './image/index/videog.mp4'
import Loading from './audio/Loading'
import 'animate.css'

import '../../styles/audio/index.scss'
import '../../styles/audio/indexwave.css'

function Audio(props) {
  //  mount階段
  const [mount] = useState()
  const [mountUpdate, setMountUpdate] = useState(false)

  // 版面
  const [svgPrecent, setSvgPrecent] = useState(24546.5) // svg
  const [playButton, setPlayButton] = useState(false)
  const [introText, setIntroText] = useState(false)
  const [musicList, setMusicList] = useState(false)
  const svgMain = useRef()
  const audioMainSection = useRef()
  // didMount
  useEffect(() => {
    setTimeout(() => {
      setMountUpdate(true)
    }, 2000)
    window.addEventListener('scroll', svgAnimation)

    console.log('componentDidMount(like)')
  }, [])

  //WillUnmount
  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', svgAnimation)
      console.log('componentWillUnmount(模擬)', mount)
    }
  }, [mount])

  //調整svg動畫的顯示
  function svgAnimation() {
    if (!!svgMain.current) {
      //抓得到元素才執行，避免出錯
      let svgStroke
      let userScrollTOP06 = window.innerHeight * 0.7 + window.scrollY //使用者真正觸發的位置，頁面的八成
      let userScrollTOP09 = window.innerHeight * 0.9 + window.scrollY //使用者真正觸發的位置，頁面的八成

      // let realScrollTOP = window.innerHeight + window.scrollY //使用者瀏覽器的底部，用來計算跑多少動畫

      let svgHeight = svgMain.current.offsetHeight //svg高度

      let startPoint = audioMainSection.current.offsetTop //svg區塊距離頂端的高度
      if (userScrollTOP09 > startPoint) {
        //播放鍵動畫
        setPlayButton(true) //打開播放鍵
      } else {
        setPlayButton(false)
      }

      if (userScrollTOP06 > startPoint) {
        let percent = (userScrollTOP06 - startPoint) / svgHeight
        if (percent >= 1) {
          percent = 1
        }
        // console.log(percent)
        svgStroke = 24546.5 - 24546.5 * percent
        setSvgPrecent(svgStroke)
      } else {
        setSvgPrecent(24546.5)
      }

      if (svgStroke < 21547) {
        setIntroText(true)
      } else {
        setIntroText(false)
      }
      if (svgStroke <= 0) {
        setMusicList(true)
      } else {
        setMusicList(false)
      }
    }
  }
  let close = <Loading />
  let open = (
    <div id="leo_audiopage">
      <div class="leo_banner">
        <div class="leo_banner_title">
          <div class="leo_leftcircle leo_circle"></div>
          <div class="leo_rightcircle leo_circle"></div>
          <div class="leo_midcircle leo_circle"></div>
          <div class="leo_back leo_circle"></div>
          <div class="leo_banner_title_wrap">
            <div class="leo_audio_title">
              <img
                src={require('./image/index/Beat ItWW.svg').default}
                alt=""
              />
            </div>
            <p class="leo_audio_english">Can You Catch My Tempo?</p>
            {/* <h2 class="leo_audio_slogan">
              離超越自己前 <br />
              你還差這一首歌
            </h2> */}
          </div>
          <div class="leo_loader">
            <svg
              id="leo_wave"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 38.05"
            >
              <title>Audio Wave</title>
              <path
                id="Line_1"
                data-name="Line 1"
                d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
              />
              <path
                id="Line_2"
                data-name="Line 2"
                d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
              />
              <path
                id="Line_3"
                data-name="Line 3"
                d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
              />
              <path
                id="Line_4"
                data-name="Line 4"
                d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
              />
              <path
                id="Line_5"
                data-name="Line 5"
                d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
              />
              <path
                id="Line_6"
                data-name="Line 6"
                d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
              />
              <path
                id="Line_7"
                data-name="Line 7"
                d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
              />
              <path
                id="Line_8"
                data-name="Line 8"
                d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
              />
              <path
                id="Line_9"
                data-name="Line 9"
                d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
              />
            </svg>
          </div>
        </div>
        <div class="leo_banner_video_wrap">
          <div class="leo_banner_carousell">
            <div class="animation_bar"></div>
            <div class="leo_banner_img leo_banner_01">
              <img src={require('./image/index/BANNER8.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_02">
              <img src={require('./image/index/BANNER9.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_03">
              <div>
                <video
                  src={video1}
                  type="video/mp4"
                  autoPlay={true}
                  muted
                  loop={true}
                ></video>
              </div>
            </div>
            <div class="leo_banner_img leo_banner_04">
              <img src={require('./image/index/BANNER1.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_05">
              <div>
                <video
                  src={video2}
                  type="video/mp4"
                  autoPlay={true}
                  muted
                  loop={true}
                ></video>
              </div>
            </div>
            <div class="leo_banner_img leo_banner_06">
              <img src={require('./image/index/BANNER4.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_07">
              <img src={require('./image/index/BANNER3.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_08">
              <img src={require('./image/index/BANNER2.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_09">
              <img src={require('./image/index/BANNER5.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_01">
              <img src={require('./image/index/BANNER8.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_02">
              <img src={require('./image/index/BANNER9.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_03">
              <div>
                <video
                  src={video1}
                  type="video/mp4"
                  autoPlay={true}
                  muted
                  loop={true}
                ></video>
              </div>
            </div>
            <div class="leo_banner_img leo_banner_04">
              <img src={require('./image/index/BANNER1.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_05">
              <div>
                <video
                  src={video2}
                  type="video/mp4"
                  autoPlay={true}
                  muted
                  loop={true}
                ></video>
              </div>
            </div>
            <div class="leo_banner_img leo_banner_06">
              <img src={require('./image/index/BANNER4.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_07">
              <img src={require('./image/index/BANNER3.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_08">
              <img src={require('./image/index/BANNER2.jpg').default} alt="" />
            </div>
            <div class="leo_banner_img leo_banner_09">
              <img src={require('./image/index/BANNER5.jpg').default} alt="" />
            </div>
          </div>
          <div className="leo_target_animate">
            <img src={require('./image/index/Pattern.svg').default} alt="" />
          </div>
        </div>
      </div>
      <section class="leo_audio_mainpage" ref={audioMainSection}>
        <div
          class={
            playButton
              ? 'leo_audiopage_playbutton   animate__bounceIn  animate__animated leo_opcity1'
              : 'leo_audiopage_playbutton  '
          }
        >
          <div class="leo_audiopage_playbutton_circletext">
            <img src={require('./image/index/Group 467w.svg').default} alt="" />
          </div>
          <div class="leo_audiopage_playbutton_circle">
            <div>
              <img src={require('./image/index/PolygonO.svg').default} alt="" />
            </div>
          </div>
        </div>
        <div class="leo_audio_mainpage_title">
          <h2 className={introText ? 'display_open' : 'display_none'}>
            Music Brings Energy
          </h2>
          <p className={introText ? 'display_open' : 'display_none'}>
            5千首流行音樂，打造專業運動播放清單 <br />
            你只需要跟著節奏動就好
          </p>
        </div>
        <div className="leo_audiopage_svg" ref={svgMain}>
          <svg
            class=" svg replaced-svg"
            data-name="Layer 1"
            id="Layer_2"
            viewBox="0 0 1402.74 2051.75"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs></defs>
            <path
              class="cls-1"
              d="M257.78,127.61c-6.32,36.36,30.11,62.79,62,79.91s68,24.23,103.21,32.34,71.16,17.88,100.34,39.25c7.65,5.6,15.45,13.7,14,23.07-1.42,9.11-10.84,14.45-19.37,18a257.88,257.88,0,0,1-71.12,18c-29.56,3.11-59.91,1.14-88.53,9.18-51.87,14.57-89.52,59.57-115.79,106.61S197.68,552.54,166,596.08c-5.44,7.48-14,15.52-22.61,12.26-7-2.63-9.45-11.27-9.67-18.74-.53-17.55,5.91-34.56,13.72-50.28,8.77-17.64,19.86-34.84,36.14-45.94s38.7-14.9,55.84-5.2c12.6,7.13,20.73,20.46,24.69,34.39s4.23,28.59,4.47,43.06l1,56.41c.32,19.32,2.51,42.05,19.08,52,37.45,22.47,69.06,59.48,83.75,100.61a122.23,122.23,0,0,1-4.26,91.59c-13.31,28.56-37.46,51.3-48.89,80.67-21.32,54.78,14.82,124.26,71.92,138.25,8.86,2.17,18.7,3,26.7-1.35,13.6-7.45,15.76-25.77,16.08-41.28,3.51-168.74-16.47-338.11.73-506,1.51-14.72,4.09-30.91,15.51-40.31,10-8.26,24.11-8.9,37.11-9.15,242.62-4.8,485.8-9.59,727.55,11.5,7.51.66,15.94,1.83,20.44,7.88,3,4.09,3.5,9.49,3.85,14.57a4210,4210,0,0,1,4.18,501.61c-.53,10.27-1.27,21.09-7,29.65-10,15.06-30.82,17.38-48.89,18.16q-245.1,10.59-490.55,2.19c-77.24-2.65-154.76-6.75-230.56-21.85-4.85-1-10.09-2.22-13.18-6.08-2.81-3.52-3.14-8.34-3.34-12.84q-9.18-204.42-2.65-409.16c1-31.86,2.33-63.78,7-95.31.76-5.1,1.88-10.67,5.95-13.85,3.38-2.63,8-2.93,12.25-3.12q260-11.36,520.33,1.2c4.93.24,10.36.7,13.78,4.25,2.87,3,3.56,7.37,4.08,11.46,6.5,51.83,7.55,153.19-1.52,156.23a254.56,254.56,0,0,1-80.11-2.31c-6.24-1.19-12.89-2.86-17-7.68-4.84-5.63-4.83-13.82-4.58-21.23l3.7-107.7c.14-4.23.46-8.87,3.41-11.91s7.43-3.48,11.58-3.67c21.75-1,43.66-1.63,64.67,4.1,2.51.68,5.38,4.77,6.08,7.27.5,1.76-.3,3.6-1.08,5.26L876.44,799.34c-10.6,22.54-16.58,41.28-40.24,49.06-18.77,6.17-66,14-85.48,17.29-5.63.95-12,12.34-6.09,31.19,5.48,17.57,23.28,11.61,39.07,8.39,23.89-4.88,37.78-10.75,61.67-15.62,6.33-2.38,1.9-23.47-2.5-34.83-29.41,3.46-85.08,21.22-75.81,29.95a494.59,494.59,0,0,0,66.82-7.23c9.38-1.67,19-3.74,26.76-9.3,9.33-6.7,14.62-17.53,19.54-27.91L992.92,602.62c6.68-14.08,12.53-33,.9-43.39-4.5-4-10.65-5.53-16.58-6.57A154.09,154.09,0,0,0,936.72,551c-3.28.3-6.82.84-9.13,3.19-2.65,2.72-2.8,6.94-2.8,10.73,0,16.74-3.93,33.47-3.9,50.21,0,3.85-.92,6.94,1.15,10.2,7.82,12.33,31.11.89,45.71.77,10.31-.08,20.2,1.16,24.15,10.68s3,25.14,3,35.44q-.32,158.37-.64,316.72c-.09,8.79-42.2,1.24-63-1.86-4.75-.71-9.92-1.78-12.93-5.52-2.78-3.46-3-8.26-3-12.69l-1.15-74.54c-.06-4.15.09-8.84,3.17-11.63,2.64-2.4,6.57-2.55,10.14-2.57l42.81-.24c7.82,0,16.43.19,22.26,5.4,6.2,5.53,7.15,14.74,7.32,23a287.89,287.89,0,0,1-5,59.83c-1,5.2-2.38,10.79-6.51,14.1-3.71,3-8.78,3.4-13.53,3.7q-231.93,14.85-464.31,20.75c-7.39.19-15.22.26-21.58-3.51s-10.13-12.87-5.71-18.79c4.79-5.17,13.64,4.71,9.22,10.2s-14,3.23-18.09-2.5-4-13.3-4.33-20.34c-8.47-174.9-7.14-303.92.31-452-10.1-6.25-11.31,17.8-4.13,22s22.08,2.7,30.38,2.07c127-9.67,246.49-19.75,373.8-16.25,6,.16,10.74,4.74,14.37,9.46,2.7,3.5,3.81,11.28,3.77,15.7-.28,27.76,10,93.14,2.75,83-26-30.42-38.91-49.54-69.89-65.74S756,537.18,721.13,535.37c-44.9-2.33-90.82,3.29-131.83,21.72s-76.79,50.42-94.8,91.61c-8.85,20.25-16.27,42.11-20.07,63.88-4.91,28.16-2.87,55.72-1.19,84.26,5.35,90.94,74,167.52,162,191s180-10.35,234.81-83.13c47.62-63.24,50.43-127.86,46.35-196.42-1.43-24-10.7-54.33-34.72-55.83-8.31-.52-16.31,2.92-23.82,6.5-22.91,10.93-46,25-57.85,47.46-13.21,24.94-10.13,55.31-18.71,82.19-15.1,47.26-71.64,81.47-119.42,68.12s-81.41-56.49-67.11-118.33c11.17-48.34,68.56-78.43,116.53-65.78,11.24,3,22.09,4.15,30.38,12.29s17.53,16.58,22.17,27.11c14.36,32.67,18.53,75.61-3.28,103.87-9.81,12.7-24.37,20.85-35.4,32.51-22.16,23.43-27.64,69.17-7.7,94.51,16.21,20.61,60.54,24.32,86.72,22.87,190.12-10.57,222.55,19.33,224.05,3.41-1.33-153.22-2.67-298.45-4-451.67l193.36-1c10-3.86-13.45-7.85-17.4-1.85a218.42,218.42,0,0,1,13.69,73.46c.06,5-.2,10.37-3.35,14.22-4,4.86-11,5.54-17.31,5.79a1237.55,1237.55,0,0,1-150.65-3.16c-2.89-.24-6-.57-8.21-2.42-3.26-2.7-3.5-7.55-3.3-11.78a158.24,158.24,0,0,1,12.39-54.25c6.26-15.59.52,85.77.78,128.66,0,3.54.18,7.45,2.62,10,3,3.17,8.05,2.88,12.41,2.49a209.36,209.36,0,0,1,48.44,1.26c5.57.79,11.52,2,15.36,6.15,4.45,4.76,4.78,11.94,4.86,18.46l2,166.68c.06,4.46,0,9.33-2.91,12.73s-8,4.34-12.57,4.85a412.09,412.09,0,0,1-71,1.77c-4.07-.25-8.57-.77-11.27-3.82s-2.68-7.54-2.49-11.6c2.52-55.19,6.35-180.31,16.13-164.88l5.63,270.54c.1,4.72.31,9.8,3.15,13.58,4.24,5.64,12.38,6.12,19.44,6.09l117.91-.5c4.24,0,8.72-.09,12.36-2.27,6.76-4,7.86-13.18,8.22-21,5.33-117,10.66-234.31,4.18-351.29-15.73-36.29-9.72,178.79-14.59,268.19-.18,3.38-.55,7.15-3.11,9.37-2.3,2-5.64,2.07-8.68,2l-94.69-.79c-6.84,0-14.47.2-19.3,5.05-3.91,3.93-4.87,9.85-5.34,15.37a158.89,158.89,0,0,0,3.21,47.94c3.73,10.27,48.32,2.23,72.48,3.35,11.56.53,27.45,4,38.4.26s9.88-15.84,11.11-27.35c1.38-12.93,6.31-24.89-5.64-30s-33.42-4.94-46.42-4.68l-34.66.68c-4.5.09-9.25.25-13.06,2.65-9.24,5.82-8.34,24.32.64,30.54s22.78,2.89,33.68,2.33l54.82-2.84c6.06-.32,12.8-.4,17.33,3.63,4.26,3.79,5.48,10,5.78,15.66,1.62,31.34,16.25,84.55.14,82.55-244.36-2.49-479.72-5-724.09-7.46-18.43,9.93,160.28,22.52,241.35,23.13l549,4.11c55.88.42,113.71,37.34,132.6,89.93,14.18,39.49,9.42,83,15,124.58A252.43,252.43,0,0,0,1486,1418.44c9.86,10.8,28.35,20.45,37.2,8.81,3.55-4.67,3.6-11.06,3.14-16.91-5.48-68.44-62-125.09-127-147.48s-136.33-16-203.29-.85-131.95,38.79-199.58,50.66-140.3,11.06-201.23-20.58c-12-6.22-25.07-17.66-21.16-30.57,2.94-9.69,14-14.08,23.79-16.57,72.07-18.36,149.83-4.85,216.93,27.23,26.12,12.49,51.41,28.12,69.86,50.43s29.35,52.19,23.8,80.61c-8.13,41.65-49.43,70.13-91.21,77.58s-84.51-1.53-126.28-9q-83.4-15-167.93-22.24c-31.22-2.67-63-4.5-93.56,2.6s-60,24.39-75.07,51.86c-8.39,15.28-11.93,32.81-20,48.23s-23.29,29.4-40.65,27.86c-19.05-1.68-32-21.69-33.46-40.76s5.29-37.66,10-56.19A276.13,276.13,0,0,0,458,1309.94c-23.23-55.89-74.6-107.53-135-103.07-29.58,2.18-57.11,17.86-77.6,39.3-40.58,42.45-54.27,105.72-46.08,163.87s36,111.87,69.16,160.32c16.08,23.47,38.46,50,32.5,77.79-5.67,26.49-18.33,50.65-39,68.2s-45.07,29.94-67.59,45c-11.51,7.69-22.66,16.2-31.41,26.92-11.27,13.81-18.09,30.71-23.35,47.74-11.91,38.53-16.65,79.66-10.27,119.47s24.32,78.23,53.29,106.29c9.89,9.57,21.23,18,34.3,22.35,45.41,15,97-23.09,141.16-4.82,16.66,6.89,29.19,20.8,41.74,33.75,28.15,29,61.22,56.22,101,63.64,9.65,1.8,20.76,2,28-4.68,7.44-6.88,7.85-18.88,4-28.27s-11-16.91-17.46-24.7c-14.92-18-27.14-39.7-27.1-63.05,0-3.44.34-7.07,2.31-9.89,4.86-6.94,17.63-3.27,19.46,5s-5.83,16.62-14.27,17.26-16.46-4.93-20.76-12.21-5.48-16-5.66-24.46c-.21-9.85-2.87-23.63-12.7-22.89-2.88.22-5.41,1.87-8,3.22-17.15,9.13-40.3,5-53.23-9.5-3.36-3.77-6.09-9.46-3.27-13.66s9.38-3.77,14.31-2.13a64.77,64.77,0,0,1,26.3,16.65c2.11,2.21,4.17,5.47,2.61,8.1-1.66,2.8-5.82,2.3-8.9,1.25a78.85,78.85,0,0,1-35.83-25.26c-1.74-2.18-3.44-5-2.45-7.57,1.37-3.55,6.36-3.63,10-2.65,20.65,5.5,38.1,24.28,59.34,21.89,8.59-1,17.95-9.29,14-17-1.42-2.8-4.23-4.57-6.92-6.18a401.77,401.77,0,0,0-67.19-32c-4.73-1.73-10.29-3.31-14.54-.6-7.53,4.82-3.19,16.44,1.85,23.82,5,2-.9-13.68-.39-20.61.72-9.62,9.86-17,19.37-18.56s19.17,1.34,28.11,5a181.37,181.37,0,0,1,38.66,21.42c6.06,4.4,12.13,9.57,14.44,16.69s-.86,16.48-8.12,18.29c-5.1,1.28-10.63-1.36-15.66.15-3.34,1-6,3.74-9.44,4.41-7.14,1.41-12.35-6.13-17.8-10.95-13.8-12.19-34.92-8.08-53.1-11-32.85-5.35-57.27-36.3-63.35-69-7.63-41.12,11.51-82.73,45.22-107.49s79.2-28.86,117-11c10,4.75,20.47,11,28.15,19,15.42,16.11,22.73,35.19,28.23,56.8a18.23,18.23,0,0,0,6.17,9.81c3.14,2.62,6.79,4.73,9.31,8,4.24,5.45,4.46,12.92,4.49,19.83l.12,24.81c0,4.36,0,9-2.32,12.7a3.93,3.93,0,0,1-1.46,1.51,3.52,3.52,0,0,1-3.65-.76c-2.93-2.35-3.45-6.54-3.75-10.29L542.26,1890c-.28-3.57-.54-7.31.88-10.6s5.12-5.9,8.54-4.84c1.18.36,2.22,1.77,3.36,2.22,6.34,2.5,8.31,10.39,9.11,17.16a240.26,240.26,0,0,1,1.68,26.13c.07,7.11-.39,14.81-4.92,20.29s-14.58,6.65-18.17.51c-2.57,10.16-7.09,22.22-17.44,23.92-11.29,1.86-19.62-10.17-23.82-20.82a188.17,188.17,0,0,1-13.07-69.84c.06-9.06,4.61-21.28,13.45-19.34,5.67,1.24,8.2,8.12,7.85,13.91s-2.54,11.45-2.1,17.24c.6,7.91,5.93,14.51,9.45,21.62,5.89,11.93,6.75,25.63,7.5,38.92,12,4-4.09-40.12-9.76-60-1.75-6.15-2.94-12.91-.44-18.79s10-10,15.54-6.72c6,3.51,5.66,12.11,4.57,19a5.13,5.13,0,0,1-7.72-1.36c-3.57-3.32-.71-9.51,3.31-12.26s9.16-4.19,12-8.16c2.44-3.45,2.52-8,2.15-12.21-3.16-36.48-32.74-66.36-66.42-80.73-29.31-12.5-62.9-15.48-93.48-6.52s-57.72,30.18-72.19,58.57c-7.18,14.08-11.23,29.64-13,45.34-3,25.62.14,52.48,12.47,75.13s34.69,40.5,60.25,43.91"
              style={{
                fill: 'none',
                stroke: ' rgb(1, 1, 1)',
                strokeMiterlimit: '10',
                strokeWidth: '2.75px',
                strokeDasharray: '24546.5, 24546.5',
                strokeDashoffset: svgPrecent,
              }}
              transform="translate(-125.16 -127.38)"
            ></path>
          </svg>
        </div>

        <div
          class={
            musicList
              ? 'leo_audiopage_playlist  leo_opcity1'
              : 'leo_audiopage_playlist '
          }
        >
          <h2>
            {/* 現在就開 <span>「動」</span> */}
            <Link to="audio/playlist">
              點我開 <span>「聽」👉</span>
            </Link>
          </h2>
          {/* <div class="leo_carousell_button"></div>
          <div class="leo_carousell">
            <ul>
              <li>
                <Link to="audio/playing?playlist=1&order=0">
                  <img
                    src="http://localhost:3000/audio/playlist/cover1.jpg"
                    alt=""
                  />
                </Link>
                <p>舞力健身</p>
              </li>
              <li>
                <Link to="audio/playing?playlist=3&order=0">
                  <img
                    src="http://localhost:3000/audio/playlist/cover3.jpg"
                    alt=""
                  />
                </Link>
                <p>節奏狂奔</p>
              </li>
              <li>
                <Link to="audio/playing?playlist=4&order=0">
                  <img
                    src="http://localhost:3000/audio/playlist/cover6.jpg"
                    alt=""
                  />
                </Link>
                <p>夜晚電子節拍</p>
              </li>
              <li>
                <Link to="audio/playing?playlist=12&order=0">
                  <img
                    src="http://localhost:3000/audio/playlist/cover12.jpg"
                    alt=""
                  />
                </Link>
                <p>賽跑派對</p>
              </li>
              <li>
                <Link to="audio/playing?playlist=5&order=0">
                  <img
                    src="http://localhost:3000/audio/playlist/cover5.jpg"
                    alt=""
                  />
                </Link>
                <p>皮拉提斯與核心</p>
              </li>

              <li class="readmore_button">
                <Link to="audio/playlist">
                  <BsMusicPlayer />
                  <p> 聆聽更多清單 +</p>
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </section>
    </div>
  )

  // return <>{close}</>
  return <>{mountUpdate ? open : close}</>
}

export default Audio
