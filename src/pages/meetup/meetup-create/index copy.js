import React, { useState } from 'react'
import CreateFormMap from './CreateFormMap'

const MeetupCreate = () => {
  const [geo, setGeo] = useState({ lat: 25.03382, lng: 121.5434 })
  const [locationInfo, setLocationInfo] = useState({ city: '', locality: '' })
  const [show, setShow] = useState(true)
  return (
    <div>
      <div>當前緯度: {geo.lat}</div>
      <div>當前經度: {geo.lng}</div>
      <div>當前城市: {locationInfo.city}</div>
      <div>當前地區: {locationInfo.locality}</div>

      <button
        className="btn btn-primary"
        onClick={() => {
          setGeo({ lat: 22.62014, lng: 120.31226 })
        }}
      >
        飛到高雄
      </button>
      <button onClick={() => setShow(!show)} className="btn btn-secondary">
        切換地圖
      </button>
      {show && (
        <CreateFormMap
          lat={geo.lat}
          lng={geo.lng}
          setGeo={setGeo}
          locationInfo={locationInfo}
          setLocationInfo={setLocationInfo}
        />
      )}
    </div>
  )
}

export default MeetupCreate
