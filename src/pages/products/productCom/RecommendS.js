import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

const RecommendS = (props) => {
  const { featured } = props
  return (
    <div className="d-lg-none li_carousel">
      <Carousel className="d-lg-none" wrap={false}>
        {featured.map((v, i) => {
          return (
            <Carousel.Item key={i}>
              <Link
                to={'/products/productsDetail/' + v.sid + '/' + v.default}
                className="li_topName li_textDecoration"
              >
                <img
                  className="d-block w-100"
                  src={`http://localhost:3000/products_img/${v.imgName}`}
                  alt="First slide"
                />
                <Carousel.Caption className="li_caption">
                  {/* <h3> {v.name}</h3> */}
                  <h4 className="li_center">{v.name}</h4>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default RecommendS
