import React, { useState } from 'react'
import { GoTriangleLeft, GoTriangleRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import 'animate.css'

const MAX_VISIBILITY = 3

const Carousel = (props) => {
  const [active, setActive] = useState(2)
  const { playlist, playlistView } = props
  const count = playlist.length

  return (
    <div
      className={playlistView ? 'carousel  leo_scale1' : 'carousel leo_scale0'}
    >
      {
        <div className="coverName">
          {playlist.length > 0 ? playlist[active].playlist_name : ''}
        </div>
      }
      {active > 0 && (
        <button
          className="nav left"
          onClick={() => {
            setActive((i) => {
              return i - 1
            })
          }}
        >
          <GoTriangleLeft />
        </button>
      )}
      {playlist.map((obj, i) => (
        <Link
          to={`playing?playlist=${obj.sid}&order=0`}
          key={i}
          className="card-container"
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}
        >
          <div className="leo_card">
            <img src={`${process.env.PUBLIC_URL}/playlist/cover${i + 1}.jpg`} />
          </div>
        </Link>
      ))}
      {active < count - 1 && (
        <button
          className="nav right"
          onClick={() => {
            setActive((i) => i + 1)
          }}
        >
          <GoTriangleRight />
        </button>
      )}
    </div>
  )
}
export default Carousel
