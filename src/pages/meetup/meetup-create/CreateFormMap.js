import React from 'react'
// import 'leaflet/dist/leaflet.css' //改用cdn
import L from 'leaflet'

// esri
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import * as ELG from 'esri-leaflet-geocoder'

// custom btn
import 'leaflet-easybutton/src/easy-button.css'
import 'leaflet-easybutton'

// 自定義
import joeyGeo from '../joeyGeo'
// import { history } from '../../../joeyLink'

// custom marker
import {
  byPhoto,
  byCurPlace,
  bySearchPlace,
  byMapClick,
} from '../meetup-marker'

class CreateFormMap extends React.Component {
  mapRef = React.createRef()

  componentDidMount() {
    // NOTE  添加地圖 L.map(<HTMLElement> el, <Map options> options?)
    this.map = L.map(this.mapRef.current).setView(
      [this.props.lat, this.props.lng],
      17
    )

    // NOTE 添加圖資
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Font Awesome by Dave Gandy',
    }).addTo(this.map)

    // NOTE 添加自訂義 定位 icon GPS 並添加到地圖上
    L.easyButton({
      // position: 'topright',
      states: [
        {
          icon: 'fa-location-arrow', // and define its properties
          title: '定位當前所在位置', // like its title
          onClick: async (btn, map) => {
            // and its callback
            // 藉由瀏覽器api 取得當前位置的經緯度
            const { lat, lng } = await joeyGeo.getCurrentGeo()
            const { city, locality } = await joeyGeo.getLocationName(lat, lng)

            this.props.setGeo({
              lat,
              lng,
              city,
              locality,
              wayGetGeo: 'byCurPlace',
            })
          },
        },
      ],
    }).addTo(this.map)

    // NOTE 添加搜尋按鈕 並添加到地圖上
    // NOTE 1006 必須要在最後一個 不然search時會被 L.easyButton 蓋過
    const searchControl = new ELG.Geosearch({
      placeholder: '搜尋城市或區域',
      title: '搜尋城市或區域',
      //  If true the geocoder will always return results in the current map bounds.
      useMapBounds: false,

      // NOTE 10/13新增 避免觸發ZOOM 一律讓didUpdate來做動作
      zoomToResult: false,
    }).addTo(this.map)

    //WARN TODO: 搭配下面的為測試history push 原本為初始值 之後記得改
    this.targetMarker = L.marker([this.props.lat, this.props.lng])
      .addTo(this.map)
      .bindPopup('我們的公司在這裡歐')
      .openPopup()

    // NOTE WARN 測試 1007 新增 用history push導向
    // NOTE 1023 改回原本預設的 a tag 導向
    // this.mapRef.current.addEventListener('click', (e) => {
    //   if (e.target.dataset.id) {
    //     e.preventDefault()
    //     history.push(e.target.dataset.id)
    //   }
    // })

    // 地圖點擊
    this.map.on('click', async (mapEvent) => {
      // NOTE 這邊取得當前點擊的經緯度 Leaflet
      const { lat, lng } = mapEvent.latlng
      const { city, locality } = await joeyGeo.getLocationName(lat, lng)

      this.props.setGeo({ lat, lng, city, locality, wayGetGeo: 'byMapClick' })
    })

    // WARN 0917 search bar effect
    searchControl.on('results', async (data) => {
      //   console.log(data)
      // 取得搜尋地點的經緯度
      const [{ latlng }] = data.results
      const { lat, lng } = latlng
      // NOTE 取得地區資料
      const { city, locality } = await joeyGeo.getLocationName(lat, lng)
      // WARN 設回state

      this.props.setGeo({
        lat,
        lng,
        city,
        locality,
        wayGetGeo: 'bySearchPlace',
      })
    })
    // componentDidMount 結束
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 如果沒有更新就不需要刷新
    if (this.props.lat === nextProps.lat) return false

    return true
  }

  componentDidUpdate() {
    this.map.flyTo([this.props.lat, this.props.lng], 14)

    // guard duplicate
    this.targetMarker?.remove()

    // 設定marker
    let useMaker
    switch (this.props.wayGetGeo) {
      case 'byPhoto':
        useMaker = { icon: byPhoto }
        break
      case 'byCurPlace':
        useMaker = { icon: byCurPlace }
        break
      case 'bySearchPlace':
        useMaker = { icon: bySearchPlace }
        break
      case 'byMapClick':
        useMaker = { icon: byMapClick }
        break
      default:
        useMaker = {}
    }

    this.targetMarker = L.marker([this.props.lat, this.props.lng], useMaker)
      .addTo(this.map)
      .bindPopup(`選擇的地點位於:${this.props.city}${this.props.locality}`)
      .openPopup()

    console.log(165, this.targetMarker)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount觸發 地圖資料重置')
  }

  render() {
    return (
      // NOTE 1006 把 id 拿掉 id="map"
      <>
        <div ref={this.mapRef} className="w-100 h-100"></div>
      </>
    )
  }
}

export default CreateFormMap
