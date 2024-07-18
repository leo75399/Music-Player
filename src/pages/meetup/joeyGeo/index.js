class GeoInfo {
  // NOTE public field
  userLat // 用戶自己從地圖上選擇的 lat
  userLng // 用戶自己從地圖上選擇的 lng

  // PRIVATE 瀏覽器API 取得當前地理座標 ps. 基本上用 getCurrentGeo
  _getGeo() {
    // input: null
    // output: latitude,  longitude, accuracy etc.
    return new Promise((resolve, reject) => {
      // WARN 此為設定檔 要再討論
      const options = {
        enableHighAccuracy: true,
        // WARN timeout:won't return until the position is available
        // maybe change to 5000?
        timeout: Infinity,
        maximumAge: 0,
      }

      //  if reject
      const userDenied = () =>
        reject(new Error('☜(ﾟヮﾟ☜) 請允許瀏覽器讀取您的位置資料 QQ'))

      navigator.geolocation.getCurrentPosition(resolve, userDenied, options)
    })
  }
  //  USE 回傳當前的經緯度
  async getCurrentGeo() {
    // input: null
    // output: lat,lng
    try {
      const geoInfo = await this._getGeo()
      const { latitude: lat, longitude: lng } = geoInfo.coords
      //   小專有用準確度 大專應該用不到 但先留著
      //   const { accuracy } = geoInfo.coords; //準確度(誤差值) 以meters(公尺)為單位
      console.log(lat, lng)
      return { lat, lng }
    } catch (err) {
      throw err
    }
  }
  // PRIVATE  geo reverse 取得當前地理位置 ps. 基本上用 getLocationName
  async _geoReverse(lat, lng) {
    // input: lat, lng
    // output: Object contains all info
    const revResult = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=zh`
    )

    if (!revResult.ok) throw new Error('Problem with geoReverse')

    const finalResult = await revResult.json()
    return finalResult
  }

  // USE  回傳當前位置的城市名稱 & 區域 並且硬 fix 桃園改名問題 QQ
  async getLocationName(lat, lng) {
    try {
      // input: lat, lng
      // output:  { city, locality }
      const cityInfo = await this._geoReverse(lat, lng)

      let { city } = cityInfo //所在城市 e.g.台北市 (因桃園改為市 因此這邊改設為let)
      let { locality } = cityInfo //所在區  e.g. 中正區  (因桃園改為市 因此這邊改設為let)
      console.log(cityInfo)

      // fix 桃園改名
      if (city === '桃園縣') {
        city = '桃園市'
        locality = locality.slice(0, -1) + '區'
      }

      return { city, locality }
    } catch (err) {
      throw err
    }
  }
}

export default new GeoInfo()
// joeyGeo
