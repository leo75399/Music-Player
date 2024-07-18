const MeetupSelection = ({ searchGeo, setSearchGeo }) => {
  return (
    <>
      {/*  活動類型 */}
      <select
        className="form-control flex-grow-1 j-join-select__drop"
        value={searchGeo.type}
        onChange={(e) =>
          setSearchGeo((prev) => ({
            ...prev,
            type: e.target.value,
          }))
        }
      >
        <option value="">全部類別</option>
        <option value="跑步">跑步</option>
        <option value="爬山">爬山</option>
        <option value="游泳">游泳</option>
        <option value="健身">健身</option>
        <option value="其他">其他</option>
      </select>

      {/* 活動時間  */}
      <select
        className="form-control flex-grow-1 j-join-select__drop"
        value={searchGeo.time}
        onChange={(e) =>
          setSearchGeo((prev) => ({
            ...prev,
            time: e.target.value,
          }))
        }
      >
        <option value="unlimited">所有時間</option>
        <option value="6">6小時內</option>
        <option value="24">24小時內</option>
        <option value="72">3天內</option>
        <option value="week">7天內</option>
        <option value="month">30天內</option>
      </select>

      {/* 活動距離  */}
      <select
        className="form-control flex-grow-1 j-join-select__drop"
        value={searchGeo.distance}
        onChange={(e) =>
          setSearchGeo((prev) => ({
            ...prev,
            distance: e.target.value,
          }))
        }
      >
        <option value="500">&lt; 0.5km</option>
        <option value="1500">&lt; 1.5km</option>
        <option value="2000">&lt; 2km</option>
        <option value="2500">&lt; 2.5km</option>
        <option value="3000">&lt; 3km</option>
        <option value="5000">&lt; 5km</option>
      </select>
    </>
  )
}

export default MeetupSelection
