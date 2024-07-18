import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_HOST } from './../../config'
import heart from './home_img/heart.json'
import search from './home_img/search.json'
import community from './home_img/community.json'
import create from './home_img/create.json'
import enjoy from './home_img/enjoy.json'
import axios from 'axios'
import './index.scss'
import home_banner from './home_img/home_banner.png'
import home_classic1 from './home_img/classic1.png'
import home_classic2 from './home_img/classic2.png'
import home_beatit1 from './home_img/beatit.jpeg'
import beatit_cover1 from './../audio/image/cover/cover1.jpg'
import beatit_cover2 from './../audio/image/cover/cover2.jpg'
import beatit_cover3 from './../audio/image/cover/cover3.jpg'
import beatit_cover4 from './../audio/image/cover/cover4.jpg'
import beatit_cover5 from './../audio/image/cover/cover5.jpg'

import { ReactComponent as Circle } from './home_img/circle.svg'
import { ReactComponent as BrandCircle } from './home_img/brand-circle.svg'
import { ReactComponent as Nike } from './home_img/nike.svg'
import { ReactComponent as Puma } from './home_img/puma.svg'
import { ReactComponent as Champion } from './home_img/champion.svg'
import { ReactComponent as UnderArmour } from './home_img/under-armour.svg'
import { ReactComponent as NewBalance } from './home_img/new-balance.svg'
import { BsMusicPlayer } from 'react-icons/bs'

import EmmaMeetUp from '../../components/EmmaMeetUp/EmmaMeetUp.js'
import EmmaCarousel from '../../components/EmmaCarousel/EmmaCarousel.js'

const EmmaMeetUpData = [
  {
    title: '搜尋有興趣的運動項目',
    animationData: search,
    height: 200,
    width: 200,
  },
  {
    title: '查看MEET UP社群',
    animationData: community,
    height: 250,
    width: 250,
  },
  {
    title: '加入您有興趣的活動',
    animationData: heart,
    height: 250,
    width: 250,
  },
  {
    title: '或是   自己創建活動',
    animationData: create,
    height: 250,
    width: 250,
  },
  {
    title: '享受美好運動時刻',
    animationData: enjoy,
    height: 250,
    width: 250,
  },
]

const Home = () => {
  const [life, setLife] = useState([])
  const [run, setRun] = useState([])
  const [accessory, setAccessory] = useState([])
  useEffect(() => {
    ;(async () => {
      let lifeImg = await axios.get(`${API_HOST}/home/life`)
      setLife(lifeImg.data)
    })()
    ;(async () => {
      let runImg = await axios.get(`${API_HOST}/home/run`)
      setRun(runImg.data)
    })()
    ;(async () => {
      let accessoryImg = await axios.get(`${API_HOST}/home/accessory`)
      setAccessory(accessoryImg.data)
    })()
  }, [])
  // console.log(life)
  return (
    <>
      <div className="container-fluid emma-hide">
        <div className="row justify-content-lg-center">
          <div className="emma-dot-wrap">
            <div className="emma-dot-orange emma-dot1"></div>
            <div className="emma-dot-green emma-dot2"></div>
            <div className="emma-dot-green emma-dot3"></div>
            <div className="emma-dot-orange emma-dot4"></div>
            <div className="emma-dot-orange emma-dot5"></div>
            <div className="emma-dot-green emma-dot6"></div>
            <div className="emma-dot-orange emma-dot7"></div>
            <div className="emma-dot-orange emma-dot8"></div>
          </div>
          <div className="emma-bg-circle-wrap">
            <Circle className="emma-bg-circle" />
          </div>
          <div className="emma-banner-wrap">
            <div className="col-12 emma-home-banner-img-wrap d-flex justify-content-center">
              <img src={home_banner} alt="" />
            </div>
            <div className="d-flex justify-content-center justify-content-lg-end col-12">
              <div className="emma-home-banner-cta-wrap">
                <div className="emma-home-banner-cta-btn ml-lg-auto">
                  <Link to="/products" className="">
                    Shop Now
                  </Link>
                </div>
                <div className="emma-home-banner-cta-words">
                  <div className="mt-4">
                    <p>更多靈感 更多極限</p>
                  </div>

                  <h5>FIND THE BEST OF SPORT</h5>
                  <div className="mt-3">
                    <p>
                      每週為您精選魅力運動商品
                      <br />
                      提供各家潮牌各種資訊
                      <br />
                      豐富您的運動生活
                      <br />
                      立即登入享會員九折優惠活動
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="emma-home-classic-wrap col-12 d-lg-flex align-items-lg-center ">
            <div className="emma-home-classic-img-wrap col-lg-6 m-auto">
              <img src={home_classic1} alt="" />
            </div>
            <div className="d-flex col-lg-6 justify-content-center">
              <div className="emma-home-classic-cta-wrap">
                <div className="emma-home-classic-cta-words">
                  <div className="mt-n3">
                    <p>更多靈感 更多極限</p>
                  </div>

                  <h5>盡享一切精選推薦</h5>
                  <div className="mt-3">
                    <p>
                      HERE. 擁有讓你盡情暢動的必備利器
                      <br />
                      提供最新運動裝備資訊、精彩故事和全球社群
                      <br />
                      一應俱全，為你專屬打造
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="emma-home-classic-wrap emma-home-classic2-wrap col-12 d-lg-flex align-items-lg-center ">
            <div className="emma-home-classic2-img-wrap col-lg-6">
              <img src={home_classic2} alt="" />
            </div>
            <div className="d-flex col-lg-6 justify-content-center">
              <div className="emma-home-classic-cta-wrap">
                <div className="emma-home-classic2-cta-words">
                  <div className="mt-2">
                    <div className="emma-home-classic-cta-btn mr-lg-auto">
                      <Link to="/products" className="">
                        精選推薦
                      </Link>
                    </div>
                  </div>
                  <div className="emma-home-classic-cta-title">
                    <h3>
                      CLASSIC
                      <br />
                      COLLECTION
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block emma-home-feature-wrap emma-cursor mb-5 col-12 px-lg-0">
            <div className="d-flex emma-home-title pb-3 pt-5">
              <h1>Feature</h1>
            </div>
            <EmmaCarousel
              title={'休閒鞋'}
              inputStyle={{ left: 'calc(20vw + 40px)' }}
              data={life}
            />
            <EmmaCarousel
              title={'跑步鞋'}
              inputStyle={{ left: 'calc(60vw + 40px)' }}
              data={run}
            />
            <EmmaCarousel
              title={'熱門配件'}
              inputStyle={{ left: 'calc(20vw + 40px)' }}
              data={accessory}
            />
          </div>
          <div className="emma-home-brand-wrap col-12">
            <div className="emma-brand-circle-wrap">
              <BrandCircle className="emma-brand-circle" />
            </div>
            <div>
              <div className="emma-home-brand-title mb-0 pt-4 pt-lg-5 d-flex justify-content-center">
                <h2>BRANDS</h2>
              </div>
              <div className="emma-home-brand-icon d-flex justify-content-center pb-4 pb-lg-5">
                <div className="emma-home-brand-icon-box">
                  <Nike stroke="#fff" fill="#fff" />
                </div>
                <div className="emma-home-brand-icon-box emma-puma">
                  <Puma stroke="#fff" fill="#fff" />
                </div>
                <div className="emma-home-brand-icon-box emma-champion">
                  <Champion stroke="#fff" fill="#fff" />
                </div>
                <div className="emma-home-brand-icon-box emma-ua">
                  <UnderArmour stroke="#fff" fill="#fff" />
                </div>
                <div className="emma-home-brand-icon-box emma-nb">
                  <NewBalance stroke="#fff" fill="#fff" />
                </div>
              </div>
            </div>
          </div>

          <div className="emma-home-beatit-wrap mt-lg-5 col-12 px-lg-0">
            <div>
              <div className="emma-home-title pt-5">
                <h1>Beat It</h1>
                <div className="emma-home-beatit-title-p">
                  <p>
                    5千首流行音樂，HERE.打造專業運動播放清單,
                    <br />
                    你只需要跟著節奏動就好!
                  </p>
                </div>
              </div>
              <div className="emma-home-beatit-img-wrap mt-lg-5 d-lg-flex justify-content-center align-items-center">
                <div className="emma-home-beatit-img mx-auto py-3 px-lg-5">
                  <Link to="/audio" className="">
                    <img src={home_beatit1} alt="" />
                  </Link>
                </div>
                <div className="emma-home-beatit-img mt-3 mb-5 mx-auto py-3 px-lg-5">
                  <div>
                    <div className="emma_carousell">
                      <ul>
                        <li>
                          <Link to="audio/playing?playlist=1&order=0">
                            <img src={beatit_cover1} alt="" />
                          </Link>
                          <p>舞力健身</p>
                        </li>
                        <li>
                          <Link to="audio/playing?playlist=3&order=0">
                            <img src={beatit_cover2} alt="" />
                          </Link>
                          <p>節奏狂奔</p>
                        </li>
                        <li>
                          <Link to="audio/playing?playlist=12&order=0">
                            <img src={beatit_cover3} alt="" />
                          </Link>
                          <p>賽跑派對</p>
                        </li>
                        <li>
                          <Link to="audio/playing?playlist=5&order=0">
                            <img src={beatit_cover4} alt="" />
                          </Link>
                          <p>皮拉提斯與核心</p>
                        </li>
                        <li>
                          <Link to="audio/playing?playlist=4&order=0">
                            <img src={beatit_cover5} alt="" />
                          </Link>
                          <p>動漫陪你動 peko</p>
                        </li>
                        <li className="readmore_button">
                          <Link to="audio/playlist">
                            <BsMusicPlayer />
                            <p> 更多清單</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="emma-home-meetup-wrap mt-3 mb-lg-5 col-12 px-lg-0">
            <div>
              <div className="emma-home-title pt-lg-5 mt-lg-5">
                <h1>Meet Up</h1>
                <div className="emma-home-beatit-title-p">
                  <p>
                    想要運動卻找不到同伴一起享受嗎？
                    <br />
                    快加入HERE. 的 meet up 社群，
                    <br />
                    在這裡找到志同道合的運動夥伴！
                  </p>
                </div>
              </div>
              <div className="emma-home-meetup-m10 d-flex justify-content-start mt-n3 mb-5 my-lg-5">
                <div className="emma-home-meetup-items w-100">
                  {EmmaMeetUpData.map(
                    ({ title, animationData, height, width }, index) => {
                      return (
                        <EmmaMeetUp
                          title={title}
                          index={index}
                          key={index}
                          animationData={animationData}
                          height={height}
                          width={width}
                        />
                      )
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="emma-menu d-none d-lg-flex align-items-center">
        <button className="emma-menu-tirgger emma-menu-trigger--open emma-txt--topbar">
          <span className="emma-menu-trigger__inner">
            <span className="emma-menu-trigger__txt">Menu</span>
          </span>
          <span className="emma-menu-trigger__icon">
            <svg width="38" height="14" viewBox="0 0 38 14">
              <g>
                <rect x="0" y="0" width="38" height="4"></rect>{' '}
                <rect x="0" y="0" width="38" height="4"></rect>{' '}
              </g>
              <g>
                <rect x="0" y="10" width="20" height="4"></rect>{' '}
                <rect x="0" y="10" width="20" height="4"></rect>{' '}
              </g>
            </svg>
          </span>
        </button>
      </div> */}
    </>
  )
}

export default Home
