import { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './EmmaFooter.scss'

function EmmaFooter({ location }) {
  // init
  const [curPath, setCurPath] = useState(location.pathname.slice(1))

  // console.log(location.pathname)

  const targetPath = [
    'meetup/join',
    'meetup/game',
    'audio/playing',
    'audio/playlist',
  ]

  useEffect(() => {
    setCurPath(location.pathname.slice(1))
  }, [location.pathname])

  const shouldShow = targetPath.includes(curPath) ? 'd-none' : ''

  return (
    <footer className={`emma-footer-revamp ${shouldShow}`}>
      <div className="emma-footer-list-wrap">
        <div className="emma-footer-col emma-footer-col-home-top-line">
          <div className="emma-footer-col-line d-flex align-items-center">
            <h4>Home</h4>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className="emma-footer-link-wrap">
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                主打商品
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                精選推薦
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                商品分類
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                合作品牌
              </Link>
            </li>
          </ul>
        </div>
        <div className="emma-footer-col">
          <div className="emma-footer-col-line d-flex align-items-center">
            <h4>Shop</h4>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className="emma-footer-link-wrap">
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                最新發行
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                經典推薦
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                潮流主選
              </Link>
            </li>
          </ul>
        </div>
        <div className="emma-footer-col">
          <div className="emma-footer-col-line d-flex align-items-center">
            <h4>Customer Care</h4>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className="emma-footer-link-wrap">
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                常見問答
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                運費資訊
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                退貨政策
              </Link>
            </li>
          </ul>
        </div>
        <div className="emma-footer-col">
          <div className="emma-footer-col-line d-flex align-items-center">
            <h4>Contact</h4>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className="emma-footer-link-wrap">
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                關於我們
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                媒體報導
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                工作機會
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                品牌上架
              </Link>
            </li>
          </ul>
        </div>
        <div className="emma-footer-col">
          <div className="emma-footer-col-line d-flex align-items-center">
            <h4>Beat It</h4>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className="emma-footer-link-wrap">
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                Beat It Home
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                主打音樂
              </Link>
            </li>
          </ul>
        </div>
        <div className="emma-footer-col">
          <div className="emma-footer-col-line d-flex align-items-center">
            <h4>Meet Up</h4>
            <i className="fas fa-chevron-down"></i>
          </div>
          <ul className="emma-footer-link-wrap">
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                Meet Up Home
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                創立組隊
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                地圖搜尋
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                活動清單
              </Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/" className="emma-footer-link">
                熱門活動推薦
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="emma-footer-col-shop w-100 d-flex">
        <div className="emma-footer-calltoaction-shopnow justify-content-center">
          <Link to="/">Shop Now</Link>
        </div>
      </div>
      <div className="footer-bottom-wrap">
        <div className="emma-footer-siteinfo emma-footer-siteinfo-link">
          <ul className="emma-footer-sitemap">
            <li className="emma-footer-item">
              <Link to="/">網站地圖</Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/">隱私權政策</Link>
            </li>
            <li className="emma-footer-item">
              <Link to="/">會員條款</Link>
            </li>
          </ul>
        </div>
        <div className="emma-footer-siteinfo emma-footer-siteinfo-social d-flex">
          <div className="button-group">
            <Link to="/" className="emma-footer-social-icon">
              <div className="icons-facebook">
                <i className="fab fa-facebook-f"></i>
              </div>
            </Link>
            <Link to="/" className="emma-footer-social-icon">
              <div className="icons-linkedin">
                <i className="fab fa-linkedin-in"></i>
              </div>
            </Link>
            <Link to="/" className="emma-footer-social-icon">
              <div className="icons-instagram">
                <i className="fab fa-instagram"></i>
              </div>
            </Link>
            <Link to="/" className="emma-footer-social-icon">
              <div className="icons-youtube">
                <i className="fab fa-youtube"></i>
              </div>
            </Link>
            <Link to="/" className="emma-footer-social-icon">
              <div className="icons-brand">
                <i className="far fa-comment-dots"></i>
              </div>
            </Link>
            <Link to="/" className="emma-footer-social-icon">
              <div className="icons-mail">
                <i className="far fa-envelope"></i>
              </div>
            </Link>
          </div>
        </div>
        <div className="emma-footer-siteinfo emma-footer-siteinfo-copyright">
          <div className="copyright">
            服務時間 星期一至五 上午 10 點至晚上 7 點<br />© Copyright 2013-21
            HERE. Limited.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default withRouter(EmmaFooter)
