import React from 'react'

import L from 'leaflet'

// esri
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import * as ELG from 'esri-leaflet-geocoder'

// custom btn
import 'leaflet-easybutton/src/easy-button.css'
import 'leaflet-easybutton'

// Leaflet.markercluster
// https://www.npmjs.com/package/leaflet.markercluste
// css -1
import 'leaflet.markercluster/dist/MarkerCluster.css'
// css-2 兩支都要
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

import moment from 'moment'
// 自定義 helper
import joeyGeo from '../joeyGeo'
import { history } from '../../../joeyLink'

// custom marker
import {
  byCurPlace,
  bySearchPlace,
  byMapClick,
  hikeIcon,
  swimIcon,
  runIcon,
  workOutIcon,
  OtherIcon,
} from '../meetup-marker'

import { MEETUP_IMG_PATH } from '../../../config'

class JoinGeoMap extends React.Component {
  mapRef = React.createRef()

  componentDidMount() {
    console.log('DidMount')
    // TODO: setSearchGeo by
    // 1. search
    // 2. esri-search
    // 3. map-click
    // NOTE  添加地圖 L.map(<HTMLElement> el, <Map options> options?)
    this.map = L.map(this.mapRef.current).setView(
      [this.props.lat, this.props.lng],
      14
    )

    // NOTE 添加圖資
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Font Awesome by Dave Gandy',
    }).addTo(this.map)

    // 避免擋到手機板
    this.map.attributionControl.setPosition('topright')

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

            // TODO: setSearchGeo state

            this.props.setSearchGeo((prev) => ({
              ...prev,
              lat,
              lng,
              wayGetGeo: 'byCurPlace',
            }))
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

    // NOTE 1015 利用bubble 成就 history push
    this.mapRef.current.addEventListener('click', (e) => {
      if (e.target.closest('a')?.dataset.id) {
        e.preventDefault()
        history.push('/meetup/list/' + e.target.closest('a').dataset.id)
      }
    })

    // 地圖點擊
    this.map.on('click', async (mapEvent) => {
      // NOTE 這邊取得當前點擊的經緯度 Leaflet
      const { lat, lng } = mapEvent.latlng
      // TODO: setSearchGeo state
      this.props.setSearchGeo((prev) => ({
        ...prev,
        lat,
        lng,
        wayGetGeo: 'byMapClick',
      }))
    })

    // WARN 0917 search bar effect
    searchControl.on('results', async (data) => {
      //   console.log(data)
      // 取得搜尋地點的經緯度
      const [{ latlng }] = data.results
      const { lat, lng } = latlng

      // const { city, locality } = await joeyGeo.getLocationName(lat, lng)

      // WARN 設回state
      // TODO: setSearchGeo state

      this.props.setSearchGeo((prev) => ({
        ...prev,
        lat,
        lng,
        wayGetGeo: 'bySearchPlace',
      }))
    })
    // componentDidMount 結束
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 如果還沒有更新meetup就先不要更新
    // 等await回來再一次更新
    if (this.props.meetup !== nextProps.meetup) return true
    return false
  }

  componentDidUpdate() {
    console.log('updated')
    this.map.flyTo([this.props.lat, this.props.lng], 14)
    // guard duplicate and reset
    this.targetMarker?.remove()
    this.targetCircle?.remove()
    this.meetupMarkers?.clearLayers()

    /////////////////////////
    // 設定座標中心 marker
    let useMaker
    switch (this.props.wayGetGeo) {
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
      .bindPopup(`您的地點`)
      .openPopup()

    /////////////////////////
    // TODO: render distance range
    // 設定新的範圍紅圈
    this.targetCircle = L.circle([this.props.lat, this.props.lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.1,
      // Radius of the circle, in meters.
      radius: this.props.distance,
    }).addTo(this.map)

    /////////////////////////
    //  NOTE render meetup
    // 設定新的 markerClusterGroup
    this.meetupMarkers = L.markerClusterGroup({
      animate: true,
      animateAddingMarkers: true,
    })

    // 跑回圈 並將每個meetup marker添加到新的markerClusterGroup中
    this.props.meetup.forEach((meetup) => {
      const {
        id,
        city,
        locality,
        activity_title,
        activity_type,
        activity_img,
        activity_time,
        lat,
        lng,
        distance,
      } = meetup

      // 避免用中文當key可能會出錯 因此這邊用switch 因為activity_type的值是中文
      let typeIcon = '' // DOM 右上角呈現的icon 用
      let meetupMarkerIcon = {}
      switch (activity_type) {
        case '游泳':
          typeIcon = 'fas fa-swimmer'
          meetupMarkerIcon = { icon: swimIcon }
          break
        case '跑步':
          typeIcon = 'fas fa-running'
          meetupMarkerIcon = { icon: runIcon }
          break
        case '爬山':
          typeIcon = 'fas fa-hiking'
          meetupMarkerIcon = { icon: hikeIcon }
          break
        case '健身':
          typeIcon = 'fas fa-dumbbell'
          meetupMarkerIcon = { icon: workOutIcon }
          break
        default:
          typeIcon = 'fas fa-child'
          meetupMarkerIcon = { icon: OtherIcon }
      }

      const meetupDistance =
        distance >= 1000 ? `${(distance / 1000).toFixed(2)}km` : `${distance}m`

      const meetupPopupContent = `
      <a data-id=${id} href="/meetup/list/${id}" class="j-join-meetup">
      
        <div class="j-join-meetup__img-box">
          <img src="${MEETUP_IMG_PATH + activity_img}" alt="" />
        </div>
 
        <div class="j-join-meetup__info">

            <div class="d-flex justify-content-between">
              <div>${moment(activity_time).format('ddd, MMM D, h:mm A')}</div>
              <div class="j-join-meetup__distance">${meetupDistance}</div>
            </div>

            <div class="j-join-meetup__info--title">${activity_title}</div>

            <div class="d-flex justify-content-between">

              <div>
                <i class="fas fa-map-marker-alt"></i> ${city} ${locality}
              </div>

              <div>
                <i class="${typeIcon} j-join-meetup__info--title"></i>
              </div>

            </div>
        </div>
      </a>`

      // https://leafletjs.com/reference-1.7.1.html#popup
      this.meetupMarkers.addLayer(
        L.marker([lat, lng], meetupMarkerIcon)
          .bindPopup(
            L.popup({
              className: 'meetup-popup',
            })
          )
          .setPopupContent(meetupPopupContent)
      )
    })
    // forEach end

    // 跑完後 將新的 markerClusterGroup掛載到地圖上
    this.map.addLayer(this.meetupMarkers)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount觸發 地圖資料重置')
  }

  render() {
    return <div ref={this.mapRef} className="w-100 h-100"></div>
  }
}

export default JoinGeoMap
