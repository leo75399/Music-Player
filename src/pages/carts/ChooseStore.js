import React, { useState } from 'react'
import '../../styles/Henry/ChooseStore.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'
import { API_HOST } from '../../config'
import Select from 'react-select'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
function ChooseStore(props) {
  const { setStore, showModal, setShowModal } = props
  const [cityId, setCityId] = useState('')
  const [city, setCity] = useState('')
  //鄉鎮市區
  const [town, setTown] = useState([])
  const [townName, setTownName] = useState('')
  //路名
  let [name_X_Y_address, setName_X_Y_address] = useState([])
  const [road, setRoad] = useState([]) //react-select的option需要用物件型式
  const searchTown = async (commandId, cityId) => {
    const city = document.querySelector('#city')
    //抓選擇的text
    const cityName = city.options[city.selectedIndex].text
    setCity(cityName) //搜尋街道與門市需要用到縣市名
    const data = { commandId, cityId }
    const res = await axios.post(API_HOST + '/711/town', data)
    const jq = $(res.data)
    const newTown = []
    jq.find('TownName').each((i, el) => {
      newTown.push($(el).text())
    })
    setTown(newTown) //給第二個下拉選單設定鄉、鎮、市、區
  }

  //先把撈到的店名、經緯度、住址塞進一個大陣列
  const rawRoad_store = []

  //等四個資料都收集完之後用一個小陣列(store)包起來，再推進下方的陣列
  const searchRoad = async (commandId, town) => {
    setTownName(town)
    const data = { commandId, city, town }
    const res = await axios.post(API_HOST + '/711/road', data)
    const jq = $(res.data)
    jq.find('GeoPosition POIName, X, Y, Address').each((i, el) => {
      rawRoad_store.push($(el).text())
    })
    let store = []
    const newRoad_store = []
    for (let i = 0; i < rawRoad_store.length; i++) {
      if (i % 4 !== 3) {
        store.push(rawRoad_store[i])
      } else {
        store.push(rawRoad_store[i])
        newRoad_store.push(store)
        store = []
      }
    }
    //路、街、段
    const onlyRoad = []
    //移除掉重複的街道名
    let uniqRoad = []
    for (let index = 0; index < newRoad_store.length; index++) {
      const town_length = town.length
      const town_index = newRoad_store[index][3].indexOf(town)
      let cut_city_town = newRoad_store[index][3].slice(
        town_length + town_index
      )
      if (cut_city_town.lastIndexOf('滬') > 0) {
        //for 澎湖縣 七美鄉 南滬
        const i = cut_city_town.indexOf('滬')
        cut_city_town = cut_city_town.slice(0, i + 1)
        onlyRoad.push(cut_city_town)
      } else if (cut_city_town.lastIndexOf('村') > 0) {
        const i = cut_city_town.indexOf('村')
        cut_city_town = cut_city_town.slice(0, i + 1)
        onlyRoad.push(cut_city_town)
      } else if (cut_city_town.lastIndexOf('街') > 0) {
        const i = cut_city_town.indexOf('街')
        cut_city_town = cut_city_town.slice(0, i + 1)
        if (cut_city_town.indexOf('里') > 0)
          cut_city_town = cut_city_town.slice(3)
        //把鄰除掉
        if (cut_city_town.indexOf('鄰') > 0) {
          const j = cut_city_town.indexOf('鄰')
          cut_city_town = cut_city_town.slice(j + 1)
        }
        //除掉幾號幾樓
        if (cut_city_town.length > 7) {
          const k = cut_city_town.indexOf('路')
          cut_city_town = cut_city_town.slice(0, k + 1)
        }
        onlyRoad.push(cut_city_town)
      } else if (cut_city_town.lastIndexOf('段') > 0) {
        const i = cut_city_town.indexOf('段')
        cut_city_town = cut_city_town.slice(0, i + 1)
        //把"里"除掉
        if (cut_city_town.indexOf('里') > 0) {
          cut_city_town = cut_city_town.slice(3)
        }
        //把鄰除掉
        if (cut_city_town.indexOf('鄰') > 0) {
          const j = cut_city_town.indexOf('鄰')
          cut_city_town = cut_city_town.slice(j + 1)
        }
        //除掉幾號幾樓
        if (cut_city_town.length > 7) {
          const k = cut_city_town.indexOf('路')
          cut_city_town = cut_city_town.slice(0, k + 1)
        }
        onlyRoad.push(cut_city_town)
      } else if (cut_city_town.lastIndexOf('路') > 0) {
        const i = cut_city_town.indexOf('路')
        cut_city_town = cut_city_town.slice(0, i + 1)
        if (cut_city_town.indexOf('里') > 0)
          cut_city_town = cut_city_town.slice(3)
        //把鄰除掉
        if (cut_city_town.indexOf('鄰') > 0) {
          const j = cut_city_town.indexOf('鄰')
          cut_city_town = cut_city_town.slice(j + 1)
        }
        //野柳港東路→港東路
        if (cut_city_town.includes('野柳')) {
          cut_city_town = cut_city_town.slice(2)
        }
        //for新竹市東區
        if (cut_city_town.length > 5) {
          cut_city_town = cut_city_town.slice(4)
        }
        onlyRoad.push(cut_city_town)
      } else if (cut_city_town.lastIndexOf('門') > 0) {
        //for 澎湖縣湖西鄉的隘門
        const i = cut_city_town.indexOf('門')
        cut_city_town = cut_city_town.slice(0, i + 1)
        onlyRoad.push(cut_city_town)
      } else if (cut_city_town.includes('巴崚')) {
        onlyRoad.push('巴崚')
      }
      uniqRoad = [...new Set(onlyRoad)]
    }
    const with_label = uniqRoad.map((v) => {
      const obj = {}
      obj.value = v
      obj.label = v
      return obj
    })
    setRoad(with_label)
  }

  const rawRoad_store_2 = []
  const searchStore = async (commandId, roadName) => {
    const data = { commandId, city, townName, roadName }
    const res = await axios.post(API_HOST + '/711/store', data)
    const jq = $(res.data)
    jq.find('GeoPosition POIName, X, Y, Address').each((i, el) => {
      if (i % 4 === 1) {
        //轉換經度
        rawRoad_store_2.push(
          $(el).text().slice(0, 3) + '.' + $(el).text().slice(3, 9)
        )
      } else if (i % 4 === 2) {
        //轉換緯度
        rawRoad_store_2.push(
          $(el).text().slice(0, 2) + '.' + $(el).text().slice(2, 8)
        )
      } else {
        rawRoad_store_2.push($(el).text())
      }
    })
    let store = []
    const newRoad_store = []
    for (let i = 0; i < rawRoad_store_2.length; i++) {
      if (i % 4 !== 3) {
        store.push(rawRoad_store_2[i])
      } else {
        store.push(rawRoad_store_2[i])
        newRoad_store.push(store)
        store = []
      }
    }
    setName_X_Y_address(newRoad_store)
  }
  //-------------------------------顯示地圖-------------------------------
  const [showMap, setShowMap] = useState(false)
  const [store_on_map, setStore_on_map] = useState([])
  const icon = L.icon({
    iconAnchor: [10, 41],
    popupAnchor: [8, -40],
    iconUrl: 'http://localhost:3000/other_img/711-map-icon.gif',
  })
  const pop = (
    <>
      <div className="d-flex fontMing">
        <div className="popLeft">
          <h6 style={{ width: '80px', marginBottom: '10px' }}>門市店名：</h6>
          <h6 className="m-0" style={{ width: '80px' }}>
            門市地址：
          </h6>
        </div>
        <div className="popRight">
          <h6 style={{ marginBottom: '10px' }}>{store_on_map[0]}門市</h6>
          <h6 className="m-0">{store_on_map[3]}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="mr-3 p-1 fontMing"
          onClick={() => {
            Swal.fire({
              title: `確定要選擇${store_on_map[0]}門市？`,
              icon: 'question',
              showCancelButton: true,
              cancelButtonColor: '#e88239',
              cancelButtonText: '否',
              confirmButtonText: '是',
              focusConfirm: false,
              // focusCancel: true,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: 'success',
                  title: '門市設定成功',
                  showConfirmButton: false,
                  timer: 1000,
                })
                setStore({
                  store: store_on_map[0],
                  address: store_on_map[3],
                })
                setShowMap(!showMap)
                setShowModal(false)
              }
            })
          }}
        >
          門市確認
        </button>
        <button
          className="ml-3 fontMing"
          onClick={() => {
            setShowMap(!showMap)
          }}
        >
          重新選擇
        </button>
      </div>
    </>
  )
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#1E90FF' : 'white',
      color: state.isFocused ? 'white' : '#495057',
      padding: '1px 12px',
      fontSize: '16px',
      margin: '0px',
    }),
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? '0 0 1px 3px #F9E0CD' : 'red',
      border: state.isFocused ? 'none' : '1px solid #ced4da',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0px',
      margin: '0px',
      border: '1px solid #6C6C6C',
      boxShadow: '1px 1px 4px 2px #D0D0D0',
    }),
  }
  return (
    <>
      <Modal
        size="xl"
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setName_X_Y_address([])
        }}
        className="fontMing"
      >
        <Modal.Body>
          <div className="wrap711Ming">
            <div className="bannerMing">
              <div className="d-flex">
                <div className="logo711Ming">
                  <img
                    src="http://localhost:3000/other_img/7-eleven-logo.png"
                    alt=""
                  />
                </div>
                <div className="bannerTitleMing">
                  <p className="searchMapMing">電子地圖查詢系統</p>
                  <p className="eMapMing">E-Map</p>
                </div>
              </div>
            </div>
            <div className="bannerBottomMing"></div>
            {!showMap ? (
              <div className="mapBodyMing">
                <div className="mapInnerMing">
                  <h6 className="mapTitleMing">
                    取貨不付款取貨時，需出示與取件人相同的身分證明文件方可取件。
                  </h6>
                  <div className="sel_Ming d-flex">
                    <div className="sel_left_Ming">
                      <p className="sel_left_title_Ming">* 為必填欄位</p>
                      <label className="my-0 buttonTitleMing">
                        <span className="starMing"> *</span> 請選擇縣市
                      </label>
                      <select
                        name="city"
                        id="city"
                        className="d-block mb-3 form-control"
                        value={cityId}
                        style={{
                          height: '35px',
                          width: '220px',
                          paddingLeft: '5px',
                        }}
                        onChange={(event) => {
                          setCityId(event.target.value)
                          searchTown('GetTown', event.target.value)
                          setName_X_Y_address([]) //清空右邊門市列表
                        }}
                      >
                        <option value="">Select...</option>
                        <option value="02">基隆市</option>
                        <option value="01">台北市</option>
                        <option value="03">新北市</option>
                        <option value="04">桃園市</option>
                        <option value="05">新竹市</option>
                        <option value="06">新竹縣</option>
                        <option value="07">苗栗縣</option>
                        <option value="08">台中市</option>
                        <option value="11">南投縣</option>
                        <option value="10">彰化縣</option>
                        <option value="12">雲林縣</option>
                        <option value="13">嘉義市</option>
                        <option value="14">嘉義縣</option>
                        <option value="15">台南市</option>
                        <option value="17">高雄市</option>
                        <option value="19">屏東縣</option>
                        <option value="20">宜蘭縣</option>
                        <option value="21">花蓮縣</option>
                        <option value="22">台東縣</option>
                        <option value="23">澎湖縣</option>
                        <option value="25">金門縣</option>
                        <option value="24">連江縣</option>
                      </select>
                      <label className="my-0 buttonTitleMing">
                        <span className="starMing"> *</span>{' '}
                        請選擇鄉、鎮、市、區
                      </label>
                      <select
                        name="town"
                        className="mb-3 form-control"
                        style={{
                          height: '35px',
                          width: '220px',
                          paddingLeft: '5px',
                        }}
                        onChange={(e) => {
                          searchRoad('SearchStore', e.target.value)
                          setName_X_Y_address([]) //清空右邊門市列表
                        }}
                      >
                        <option value="">Select...</option>
                        {town.length > 0 &&
                          town.map((v, i) => (
                            <option value={v} key={i}>
                              {v}
                            </option>
                          ))}
                      </select>
                      <label className="my-0 buttonTitleMing">
                        <span className="starMing"> *</span> 請選擇街道
                      </label>
                      <Select
                        className="street_options_Ming"
                        styles={customStyles}
                        options={road}
                        style={{ height: '35px', width: '220px' }}
                        onChange={(selectedOption) => {
                          searchStore('SearchStore', selectedOption.value)
                        }}
                      />
                    </div>
                    <div className="sel_right_Ming">
                      <p className="sel_right_title_Ming">
                        <span style={{ color: '#ff6600' }}>* </span>
                        請選擇門市
                      </p>
                      <div className="store_list_Ming">
                        <ol
                          style={{ marginLeft: '0', padding: '5px' }}
                          className="d-flex flex-wrap"
                        >
                          {name_X_Y_address.length > 0 &&
                            name_X_Y_address.map((v, i) => (
                              <li
                                className="list_box_Ming"
                                key={i}
                                onClick={() => {
                                  setStore_on_map(name_X_Y_address[i])
                                  setShowMap(!showMap)
                                }}
                              >
                                <p style={{ marginBottom: '0' }}>{v[0]}</p>
                                <p className="store_address_Ming">{v[3]}</p>
                              </li>
                            ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <MapContainer
                center={[store_on_map[2], store_on_map[1]]}
                zoom={20}
                style={{ height: '64vh' }}
                // whenCreated={setMap}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[store_on_map[2], store_on_map[1]]}
                  icon={icon}
                >
                  <Popup>{pop}</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default withRouter(ChooseStore)
