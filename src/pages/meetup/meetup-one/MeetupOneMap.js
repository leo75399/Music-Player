import React from 'react'

import L from 'leaflet'

// TODO: 生成座標 offset 不要太頂

class MeetupOneMap extends React.Component {
  mapRef = React.createRef()

  componentDidMount() {
    console.log('DidMount')
    this.map = L.map(this.mapRef.current).setView(
      [this.props.lat, this.props.lng],
      16
    )

    // NOTE 添加圖資
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map)

    this.targetMarker = L.marker([this.props.lat, this.props.lng])
      .addTo(this.map)
      .bindPopup(`活動的地點`)
      .openPopup()

    // componentDidMount 結束
  }

  shouldComponentUpdate(nextProps, nextState) {
    // NOTE 優化效能 僅在經緯度變更時update (解決同個地點多個活動的情況)
    if (this.props.lat !== nextProps.lat && this.props.lng !== nextProps.lng)
      return true
    return false
  }

  componentDidUpdate() {
    console.log('updated')
    this.targetMarker?.remove()
    this.targetMarker = L.marker([this.props.lat, this.props.lng])
      .addTo(this.map)
      .bindPopup(`活動的地點`)
      .openPopup()

    this.map.flyTo([this.props.lat, this.props.lng], 16, { animate: false })
  }

  componentWillUnmount() {
    console.log('componentWillUnmount觸發 地圖資料重置')
  }

  render() {
    return <div ref={this.mapRef} className="w-100 h-100"></div>
  }
}

export default MeetupOneMap
