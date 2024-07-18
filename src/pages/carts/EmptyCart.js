import React, { useState, useEffect } from 'react'
import { Cart } from '../../../src/config'
import axios from 'axios'
import '../../styles/Henry/Ming.scss'
import { withRouter, Link } from 'react-router-dom'
import Spinner from './Spinner'
function EmptyCart(props) {
  const { user } = props
  const [isLoading, setIsLoading] = useState(true) //spinner
  useEffect(() => {
    if (user.login) {
      ;(async () => {
        const r = await axios.get(Cart + `/${user.member_sid}`)
        const quantity = r.data.reduce((a, b) => a + b.quantity, 0)
        if (quantity > 0) {
          props.history.push('/shopList')
        } else {
          setIsLoading(false)
        }
      })()
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <div className="emptyMing fontMing">
          <div className="emptyLeft col-lg-2">
            <svg
              width="174"
              height="158"
              viewBox="0 0 174 158"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="d-block mx-auto"
            >
              <path
                d="M101.79 56.1574L86.5069 42.2008L71.224 56.2233L60.9874 46.8749L76.3423 32.9183L61.0595 18.9616L71.224 9.67911L86.5069 23.6358L101.79 9.61328L112.026 18.9616L96.6714 32.9183L111.954 46.8749L101.79 56.1574V56.1574ZM50.4624 118.502C54.2862 118.502 57.9534 119.889 60.6573 122.358C63.3612 124.827 64.8802 128.176 64.8802 131.668C64.8802 135.16 63.3612 138.509 60.6573 140.979C57.9534 143.448 54.2862 144.835 50.4624 144.835C46.6385 144.835 42.9713 143.448 40.2675 140.979C37.5636 138.509 36.0446 135.16 36.0446 131.668C36.0446 128.176 37.5636 124.827 40.2675 122.358C42.9713 119.889 46.6385 118.502 50.4624 118.502V118.502ZM122.551 118.502C126.375 118.502 130.042 119.889 132.746 122.358C135.45 124.827 136.969 128.176 136.969 131.668C136.969 135.16 135.45 138.509 132.746 140.979C130.042 143.448 126.375 144.835 122.551 144.835C118.728 144.835 115.06 143.448 112.356 140.979C109.653 138.509 108.134 135.16 108.134 131.668C108.134 128.176 109.653 124.827 112.356 122.358C115.06 119.889 118.728 118.502 122.551 118.502V118.502ZM51.6879 97.1058C51.6879 97.5423 51.8778 97.9609 52.2158 98.2696C52.5537 98.5782 53.0121 98.7516 53.4901 98.7516H136.969V111.918H50.4624C46.6385 111.918 42.9713 110.531 40.2675 108.062C37.5636 105.593 36.0446 102.244 36.0446 98.7516C36.0446 96.4474 36.6934 94.2749 37.8468 92.4316L47.5788 76.3024L21.6268 26.3349H7.20898V13.1683H30.7821L37.5585 26.3349L44.4069 39.5016L60.5548 70.6408L61.492 72.4183H112.098L131.995 39.5016L139.925 26.3349H139.997L152.54 32.6549L124.714 78.8041C122.263 82.8858 117.505 85.5849 112.098 85.5849H58.3922L51.9042 96.3158L51.6879 97.1058V97.1058Z"
                fill="#E47B31"
              />
            </svg>
          </div>
          <div className="emptyRight">
            <p className="noProductMing">您的購物車中沒有任何商品</p>
            <Link className="text-decoration-none" to="/products">
              <div className="btnMing mx-auto mt-5">去蝦拚吧！</div>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default withRouter(EmptyCart)
