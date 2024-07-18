import React from 'react'
import { Icon } from '@iconify/react'

const FilterText = (props) => {
  const {
    gender,
    handleGenderChecked,
    type,
    handleTypeChecked,
    brands,
    handleChecked,
    price,
    setPrice,
    setCount,
    count,
    setPriceChecked,
  } = props
  return (
    <div className="d-flex flex-wrap li_selectedPart">
      {gender.length > 0 &&
        gender.map((v, i) => {
          return (
            <div key={i} className="li_selected">
              <div className="">{v === '1' ? '男鞋' : '女鞋'}</div>
              <button
                onClick={handleGenderChecked}
                value={v}
                className="li_notStyleInBtn li_center"
              >
                <Icon inline={true} icon="mdi:delete" width="16" />
              </button>
            </div>
          )
        })}
      {type.length > 0 &&
        type.map((v, i) => {
          return (
            <div key={i} className="li_selected">
              <div className="mr-1">{v.type}</div>
              <button
                onClick={handleTypeChecked}
                value={v.value}
                name={v.type}
                className="li_notStyleInBtn li_center"
              >
                <Icon inline={true} icon="mdi:delete" width="16" />
              </button>
            </div>
          )
        })}
      {brands.length > 0 &&
        brands.map((v, i) => {
          return (
            <div key={i} className="li_selected">
              <div className="">{v.brandsName}</div>
              <button
                onClick={handleChecked}
                value={v.value}
                name={v.brandsName}
                className="li_notStyleInBtn li_center"
              >
                <Icon inline={true} icon="mdi:delete" width="16" />
              </button>
            </div>
          )
        })}
      {price[0] > 800 || price[1] < 7000 ? (
        <div className="li_selected li_center ">
          <div className="mr-1">{`$${price[0]} ~ ${price[1]}`}</div>
          <button
            onClick={() => {
              setPrice([799, 7001])
              setCount(count - 1)
              setPriceChecked(true)
            }}
            value={price}
            className="li_notStyleInBtn li_center"
          >
            <Icon inline={true} icon="mdi:delete" width="16" />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default FilterText
