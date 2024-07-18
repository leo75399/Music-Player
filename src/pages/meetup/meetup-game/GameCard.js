import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MEETUP_IMG_PATH } from '../../../config'

import VanillaTilt from 'vanilla-tilt'
import moment from 'moment'

const GameCard = ({ card }) => {
  const {
    id,
    city,
    locality,
    activity_title,
    activity_type,
    activity_img,
    activity_time,
  } = card

  const targetCard = useRef()

  let typeIcon = ''
  // 根據類型不同給不同class
  switch (activity_type) {
    case '游泳':
      typeIcon = 'fas fa-swimmer'
      break
    case '跑步':
      typeIcon = 'fas fa-running'
      break
    case '爬山':
      typeIcon = 'fas fa-hiking'
      break
    case '健身':
      typeIcon = 'fas fa-dumbbell'
      break
    default:
      typeIcon = 'fas fa-child'
  }

  useEffect(() => {
    VanillaTilt.init(targetCard.current, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.8,
    })
  }, [])

  return (
    <Link to={`/meetup/list/${id}`} className="j-game-card" ref={targetCard}>
      {/* <!-- img box --> */}
      <div className="j-game-card__img-box">
        <img src={MEETUP_IMG_PATH + activity_img} alt="" />
      </div>
      {/* <!-- title --> */}
      <div className="j-game-card__info-box">
        <div className="j-game-card__title">{activity_title}</div>
        <div className="j-game-card__time">
          {moment(activity_time).format('ddd, MMM D, h:mm A')}
        </div>
        <div className="j-game-card__location">
          <i className="fas fa-map-marker-alt"></i>
          <div className="j-game-card__data">{`${city} ${locality}`}</div>
        </div>

        <div className="j-game-card__icon">
          <i className={typeIcon}></i>
        </div>
      </div>
    </Link>
  )
}

export default GameCard
