import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import img0 from './carousel_img/1.jpg'
import img1 from './carousel_img/2.jpg'
import img2 from './carousel_img/3.jpg'
import img3 from './carousel_img/4.jpg'
import img4 from './carousel_img/5.jpg'
import img5 from './carousel_img/6.jpg'

const images = [img0, img1, img2, img3, img4, img5]

const MeetupMainCarousel = () => {
  const [imageIndex, setImageIndex] = useState(0)

  const [offsetY, setOffsetY] = useState(0)

  const bannerUp = useRef()
  const bannerDown = useRef()

  useEffect(() => {
    const updatePageYOffset = () => setOffsetY(window.pageYOffset)

    window.addEventListener('scroll', updatePageYOffset)
    return () => window.removeEventListener('scroll', updatePageYOffset)
  }, [])

  useEffect(() => {
    bannerUp.current.style.transform = `translateX(${-150 + offsetY}px)`
    bannerDown.current.style.transform = `translateX(${-300 - offsetY}px)`
  }, [offsetY])

  const imgStyle = (idx, imageIndex) => {
    if (idx === imageIndex) return 'm'
    if (idx - 1 === imageIndex || (imageIndex === 5 && idx === 0)) return 'l'
    if (idx - 4 === imageIndex || idx + 2 === imageIndex) return 'l'

    return 's'
  }

  const settings = {
    infinite: true,
    // dots: true,
    speed: 1000,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    arrows: false, //關掉左右兩邊的按鈕

    autoplay: true, //先關掉 正式版再開啟

    beforeChange: (current, next) => setImageIndex(next),
  }

  return (
    <div className="container-fluid  j-main-slider-wrap  d-none d-xl-block">
      <Slider {...settings} className="j-main-slider">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`j-main-slider__box  j-main-slider__box--${imgStyle(
              idx,
              imageIndex
            )}`}
          >
            <img src={img} alt={img} />
          </div>
        ))}
      </Slider>
      {/*  */}

      <div className="j-main-bg">
        <div className="j-main-bg__banner-up" ref={bannerUp}>
          HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.
        </div>
        <div className="j-main-bg__banner-down" ref={bannerDown}>
          HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.HERE.
        </div>
      </div>
    </div>
  )
}

export default MeetupMainCarousel
