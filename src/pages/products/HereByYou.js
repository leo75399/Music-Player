import React, { useState, useEffect } from 'react'
import { API_HOST } from '../../config'
import { Carousel } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import SpinnerInProducts from './SpinnerInProducts'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'

const HereByYou = (props) => {
  const { user } = props
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [nike, setNike] = useState('white')
  const [bg, setBg] = useState('white')
  const [imgPath, setImgPath] = useState(
    `${API_HOST}/products_img/hereByYou/${nike}-${bg}`
  )
  /*
  const path = [
    { name: 'home', url: '/', id: 1 },
    { name: '製作你的專屬鞋子', url: '/products/customized', id: 2 },
  ]
*/

  const color = [
    'white',
    'black',
    'green',
    'rainForest',
    'pink',
    'blue',
    'red',
    'yellow',
  ]
  useEffect(() => {
    if (!user.login) {
      Swal.fire({
        icon: 'error',
        title: '請先登入才能使用此服務',
        showConfirmButton: false,
        timer: 1000,
      })
      history.push('/')
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  useEffect(() => {
    setImgPath(`${API_HOST}/products_img/hereByYou/detail/${nike}-${bg}`)
  }, [nike, bg])

  /* <BreadCrumb path={path} /> */
  const [open, setOpen] = useState('nike')
  const addDesign = async () => {
    await axios.post(`http://localhost:3000/products/customizedAdd`, {
      id: user.member_sid,
      imgPath: imgPath,
    })
    history.push('/customized/productsDetail')
  }
  const display = (
    <div className="li_hereByU">
      <div className="d-flex">
        <div className="col-9 li_center">
          <div className="w-100">
            <Carousel interval={60000} className="w-100">
              <Carousel.Item className="w-100">
                <img
                  className="d-block w-50 li_mr50"
                  src={`${imgPath}-1.jfif`}
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="w-100">
                <img
                  className="d-block w-50 li_mr50"
                  src={`${imgPath}-2.jfif`}
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="w-100">
                <img
                  className="d-block w-50 li_mr50"
                  src={`${imgPath}-3.jfif`}
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="w-100">
                <img
                  className="d-block w-50 li_mr50"
                  src={`${imgPath}-4.jfif`}
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="w-100">
                <img
                  className="d-block w-50 li_mr50"
                  src={`${imgPath}-5.jfif`}
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="col-3 li_choose">
          <div className="d-flex li_bb">
            <div
              className="li_nike col-6 px-0"
              onClick={() => {
                setOpen('nike')
              }}
            >
              {open === 'nike' ? (
                <p className="li_tac li_pointer li_ByUSelected py-3">
                  選擇logo顏色
                </p>
              ) : (
                <p className="li_tac li_pointer py-3">選擇logo顏色</p>
              )}
            </div>
            <div
              className="col-6 px-0"
              onClick={() => {
                setOpen('bg')
              }}
            >
              {open === 'bg' ? (
                <p className="li_tac li_pointer li_ByUSelected py-3">
                  選擇鞋面顏色
                </p>
              ) : (
                <p className="li_tac li_pointer py-3">選擇鞋面顏色</p>
              )}
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {open === 'nike'
              ? color.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="d-flex justify-content-center col-6 px-0 py-3 mt-2"
                    >
                      <div
                        className="li_pointer"
                        onClick={() => {
                          setNike(v)
                        }}
                      >
                        <div>
                          <Icon
                            icon="simple-icons:nike"
                            width="50"
                            key={i}
                            className={`mx-auto  li_colorNike${
                              i + 1
                            } li_center`}
                          />
                        </div>
                        <p className="li_center mb-0 pt-2">{v}</p>
                      </div>
                    </div>
                  )
                })
              : ''}
            {open === 'bg'
              ? color.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="d-flex justify-content-center col-6 px-0 py-3 mt-2"
                    >
                      <div
                        onClick={() => {
                          setBg(v)
                        }}
                        className="li_pointer"
                      >
                        <div
                          className={`mx-auto li_color li_color${i + 1}`}
                        ></div>
                        <p className="li_center mb-0 pt-2">{v}</p>
                      </div>
                    </div>
                  )
                })
              : ''}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn team-btn mr-5 mt-4" onClick={addDesign}>
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return loading ? (
    <SpinnerInProducts loading={loading} name={'li_spinner'} />
  ) : (
    display
  )
}

export default HereByYou
