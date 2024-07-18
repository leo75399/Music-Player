import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_HOST } from './../../../config'
import FilterText from './FilterText'
import { Icon } from '@iconify/react'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import SpinnerInProducts from '../SpinnerInProducts'
const FilterLG = (props) => {
  const { setPage, page, setLiData, setDisplayProducts, count, setCount } =
    props
  const [sortBy, setSortBy] = useState('')
  const [click, setClick] = useState('')
  const [gender, setGender] = useState([])
  const [type, setType] = useState([])
  const [typeData, setTypeData] = useState([])
  const [brands, setBrands] = useState([])
  const [brandsData, setBrandsData] = useState([])
  const [price, setPrice] = useState([800, 7000])
  const [valuePrice, setValuePrice] = useState([800, 7000])
  const [priceChecked, setPriceChecked] = useState(true)
  const [loading1, setLoading1] = useState(false)
  useEffect(() => {
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/brands`)
      setBrandsData(r.data)
    })()
    ;(async () => {
      let r = await axios.get(`${API_HOST}/products/type`)
      setTypeData(r.data)
    })()
  }, [])
  useEffect(() => {
    if (count) {
      setLoading1(true)
    }
    ;(async () => {
      let r = await axios.post(`${API_HOST}/products/test`, {
        gender: gender.join(','),
        type: type.map((v) => v.value).join(','),
        brands: brands.map((v) => v.value).join(','),
        page: page,
        sortBy: sortBy,
        price: price,
      })

      setLiData(r.data)
      setDisplayProducts(r.data.rows)
      // setLoading1(false)
    })()
    let timerID = setTimeout(() => {
      setLoading1(false)
    }, 800)
    return () => {
      clearTimeout(timerID)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, page, type, brands, sortBy, price])

  useEffect(() => {
    setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, type, brands, price])
  const handleGenderChecked = (e) => {
    const value = e.target.value || e.currentTarget.value
    if (!gender.includes(value)) {
      setCount(count + 1)
      return setGender([...gender, value])
    }
    if (gender.includes(value)) {
      setCount(count - 1)
      const newGender = gender.filter((v) => v !== value)
      setGender(newGender)
    }
  }
  const handleTypeChecked = (e) => {
    const value = e.target.value || e.currentTarget.value
    const name = e.target.name || e.currentTarget.name
    if (!type.some((v) => v.value === value)) {
      setCount(count + 1)
      return setType([...type, { type: name, value: value }])
    }
    if (type.some((v) => v.value === value)) {
      setCount(count - 1)
      const newType = type.filter((i) => i.value !== value)
      setType(newType)
    }
  }
  const handleChecked = (e) => {
    const value = e.target.value || e.currentTarget.value
    const name = e.target.name || e.currentTarget.name
    if (!brands.some((v) => v.value === value)) {
      setCount(count + 1)
      return setBrands([...brands, { brandsName: name, value: value }])
    }
    if (brands.some((v) => v.value === value)) {
      const newBrands = brands.filter((i) => i.value !== value)
      setBrands(newBrands)
      setCount(count - 1)
    }
  }

  const display = (
    <div className="d-none d-lg-flex justify-content-between flex-wrap mt-3 li_stickyFilter py-3">
      <div className="li_vCenter">
        <div className="li_filter pl-0">
          <Icon
            icon="mdi:filter-variant"
            width="24"
            onClick={() => {
              click === 'filter' ? setClick('') : setClick('filter')
            }}
          />
          <span className="mr-3">{count}</span>
          {click === 'filter' && count > 0 ? (
            <div className="li_filterClick">
              <FilterText
                gender={gender}
                handleGenderChecked={handleGenderChecked}
                type={type}
                handleTypeChecked={handleTypeChecked}
                brands={brands}
                handleChecked={handleChecked}
                price={price}
                setPrice={setPrice}
                setCount={setCount}
                count={count}
                setPriceChecked={setPriceChecked}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_filter ">
          <div
            className="li_between"
            onClick={() => {
              click === 'gender' ? setClick('') : setClick('gender')
            }}
          >
            <p className="mb-0 mr-1">性別</p>
            {click === 'gender' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>
          {click === 'gender' ? (
            <div
              className="li_filterClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              <div className="my-3 li_pointer">
                <label className="mb-0 li_vCenter ">
                  {gender.includes('2') ? (
                    <Icon
                      icon="mdi:checkbox-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  ) : (
                    <Icon
                      icon="mdi:checkbox-blank-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  )}
                  <input
                    type="checkbox"
                    name="female"
                    value="2"
                    checked={gender.includes('2')}
                    onChange={handleGenderChecked}
                  />
                  女鞋
                </label>
              </div>
              <div className="my-3 li_pointer">
                <label className="mb-0 li_vCenter ">
                  {gender.includes('1') ? (
                    <Icon
                      icon="mdi:checkbox-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  ) : (
                    <Icon
                      icon="mdi:checkbox-blank-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  )}
                  <input
                    type="checkbox"
                    value="1"
                    checked={gender.includes('1')}
                    onChange={handleGenderChecked}
                  />{' '}
                  男鞋
                </label>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_typeFilter li_filter">
          <div
            className="li_between"
            onClick={() => {
              click === 'type' ? setClick('') : setClick('type')
            }}
          >
            <p className="mb-0 mr-1">種類</p>
            {click === 'type' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>

          {click === 'type' ? (
            <div
              className="li_filterClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              {typeData.length > 0 &&
                typeData.map((v) => {
                  return (
                    <div key={v.id} className="my-3 li_pointer">
                      <label className="mb-0 li_vCenter ">
                        {type.some((i) => i.value === v.id.toString()) ? (
                          <Icon
                            icon="mdi:checkbox-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        ) : (
                          <Icon
                            icon="mdi:checkbox-blank-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        )}
                        <input
                          type="checkbox"
                          checked={type.some(
                            (i) => i.value === v.id.toString()
                          )}
                          name={v.type}
                          value={v.id}
                          onChange={handleTypeChecked}
                        />
                        {v.type}
                      </label>
                    </div>
                  )
                })}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_brandsFilter li_filter ">
          <div
            className="li_between"
            onClick={() => {
              click === 'brands' ? setClick('') : setClick('brands')
            }}
          >
            <p className="mb-0 mr-1">品牌</p>
            {click === 'brands' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>

          {click === 'brands' ? (
            <div
              className="li_filterClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              {brandsData.length > 0 &&
                brandsData.map((v) => {
                  return (
                    <div key={v.id} className="my-3 li_pointer">
                      <label className="mb-0 li_vCenter ">
                        {brands.some((i) => i.value === v.id.toString()) ? (
                          <Icon
                            icon="mdi:checkbox-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        ) : (
                          <Icon
                            icon="mdi:checkbox-blank-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        )}
                        <input
                          type="checkbox"
                          checked={brands.some(
                            (i) => i.value === v.id.toString()
                          )}
                          name={v.brandsName}
                          value={v.id}
                          onChange={handleChecked}
                        />
                        {v.brandsName}
                      </label>
                    </div>
                  )
                })}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_filter">
          <div
            className="li_between"
            onClick={() => {
              click === 'price' ? setClick('') : setClick('price')
            }}
          >
            <p className="mb-0 mr-1">價格</p>
            {click === 'price' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>

          {click === 'price' ? (
            <div
              className="li_filterClick li_PriceClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              {`$${valuePrice[0]}~$${valuePrice[1]}`}
              <Range
                marks={{ 800: 800, 7000: 7000 }}
                railStyle={{
                  backgroundColor: '#aaa',
                }}
                trackStyle={{ backgroundColor: '#E88239' }}
                handleStyle={{
                  borderColor: '#E88239',
                }}
                dotStyle={{
                  display: 'none',
                }}
                min={800}
                max={7000}
                value={valuePrice}
                onChange={(e) => {
                  setValuePrice(e)
                }}
                onAfterChange={() => {
                  setPrice(valuePrice)
                  if (priceChecked) {
                    setCount(count + 1)
                    setPriceChecked(false)
                  }
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <select
        className="li_sort"
        onChange={(e) => {
          return setSortBy(e.target.value)
        }}
        onClick={() => {
          setClick('')
        }}
        value={sortBy}
      >
        <option>排序方式</option>
        <option value="TopSeller">最熱銷</option>
        <option value="newest">最新</option>
        <option value="l2h">價格低 到 高</option>
        <option value="h2l">價格高 到 低</option>
      </select>
    </div>
  )
  const displaySpinner = (
    <div className="d-none d-lg-flex justify-content-between flex-wrap mt-3 li_stickyFilter py-3">
      <SpinnerInProducts loading={loading1} name={'li_spinnerList'} />
      <div className="li_vCenter">
        <div className="li_filter pl-0">
          <Icon
            icon="mdi:filter-variant"
            width="24"
            onClick={() => {
              click === 'filter' ? setClick('') : setClick('filter')
            }}
          />
          <span className="mr-3">{count}</span>
          {click === 'filter' && count > 0 ? (
            <div className="li_filterClick">
              <FilterText
                gender={gender}
                handleGenderChecked={handleGenderChecked}
                type={type}
                handleTypeChecked={handleTypeChecked}
                brands={brands}
                handleChecked={handleChecked}
                price={price}
                setPrice={setPrice}
                setCount={setCount}
                count={count}
                setPriceChecked={setPriceChecked}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_filter ">
          <div
            className="li_between"
            onClick={() => {
              click === 'gender' ? setClick('') : setClick('gender')
            }}
          >
            <p className="mb-0 mr-1">性別</p>
            {click === 'gender' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>
          {click === 'gender' ? (
            <div
              className="li_filterClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              <div className="my-3 li_pointer">
                <label className="mb-0 li_vCenter ">
                  {gender.includes('2') ? (
                    <Icon
                      icon="mdi:checkbox-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  ) : (
                    <Icon
                      icon="mdi:checkbox-blank-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  )}
                  <input
                    type="checkbox"
                    name="female"
                    value="2"
                    checked={gender.includes('2')}
                    onChange={handleGenderChecked}
                  />
                  女鞋
                </label>
              </div>
              <div className="my-3 li_pointer">
                <label className="mb-0 li_vCenter ">
                  {gender.includes('1') ? (
                    <Icon
                      icon="mdi:checkbox-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  ) : (
                    <Icon
                      icon="mdi:checkbox-blank-outline"
                      color="#555"
                      inline={true}
                      width="20"
                      className="mr-1"
                    />
                  )}
                  <input
                    type="checkbox"
                    value="1"
                    checked={gender.includes('1')}
                    onChange={handleGenderChecked}
                  />{' '}
                  男鞋
                </label>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_typeFilter li_filter">
          <div
            className="li_between"
            onClick={() => {
              click === 'type' ? setClick('') : setClick('type')
            }}
          >
            <p className="mb-0 mr-1">種類</p>
            {click === 'type' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>

          {click === 'type' ? (
            <div
              className="li_filterClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              {typeData.length > 0 &&
                typeData.map((v) => {
                  return (
                    <div key={v.id} className="my-3 li_pointer">
                      <label className="mb-0 li_vCenter ">
                        {type.some((i) => i.value === v.id.toString()) ? (
                          <Icon
                            icon="mdi:checkbox-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        ) : (
                          <Icon
                            icon="mdi:checkbox-blank-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        )}
                        <input
                          type="checkbox"
                          checked={type.some(
                            (i) => i.value === v.id.toString()
                          )}
                          name={v.typeDisplay}
                          value={v.id}
                          onChange={handleTypeChecked}
                        />
                        {v.type}
                      </label>
                    </div>
                  )
                })}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_brandsFilter li_filter ">
          <div
            className="li_between"
            onClick={() => {
              click === 'brands' ? setClick('') : setClick('brands')
            }}
          >
            <p className="mb-0 mr-1">品牌</p>
            {click === 'brands' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>

          {click === 'brands' ? (
            <div
              className="li_filterClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              {brandsData.length > 0 &&
                brandsData.map((v) => {
                  return (
                    <div key={v.id} className="my-3 li_pointer">
                      <label className="mb-0 li_vCenter ">
                        {brands.some((i) => i.value === v.id.toString()) ? (
                          <Icon
                            icon="mdi:checkbox-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        ) : (
                          <Icon
                            icon="mdi:checkbox-blank-outline"
                            color="#555"
                            inline={true}
                            width="20"
                            className="mr-1"
                          />
                        )}
                        <input
                          type="checkbox"
                          checked={brands.some(
                            (i) => i.value === v.id.toString()
                          )}
                          name={v.brandsName}
                          value={v.id}
                          onChange={handleChecked}
                        />
                        {v.brandsName}
                      </label>
                    </div>
                  )
                })}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="li_filter">
          <div
            className="li_between"
            onClick={() => {
              click === 'price' ? setClick('') : setClick('price')
            }}
          >
            <p className="mb-0 mr-1">價格</p>
            {click === 'price' ? (
              <Icon icon="mdi:chevron-up" width="20" />
            ) : (
              <Icon icon="mdi:chevron-down" width="20" />
            )}
          </div>

          {click === 'price' ? (
            <div
              className="li_filterClick li_PriceClick"
              onMouseLeave={() => {
                setClick('')
              }}
            >
              {`$${valuePrice[0]}~$${valuePrice[1]}`}
              <Range
                marks={{ 800: 800, 7000: 7000 }}
                railStyle={{
                  backgroundColor: '#aaa',
                }}
                trackStyle={{ backgroundColor: '#E88239' }}
                handleStyle={{
                  borderColor: '#E88239',
                }}
                dotStyle={{
                  display: 'none',
                }}
                min={800}
                max={7000}
                value={valuePrice}
                onChange={(e) => {
                  setValuePrice(e)
                }}
                onAfterChange={() => {
                  setPrice(valuePrice)
                  if (priceChecked) {
                    setCount(count + 1)
                    setPriceChecked(false)
                  }
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <select
        className="li_sort"
        onChange={(e) => {
          return setSortBy(e.target.value)
        }}
        onClick={() => {
          setClick('')
        }}
        value={sortBy}
      >
        <option>排序方式</option>
        <option value="TopSeller">最熱銷</option>
        <option value="newest">最新</option>
        <option value="l2h">價格低 到 高</option>
        <option value="h2l">價格高 到 低</option>
      </select>
    </div>
  )
  return loading1 ? displaySpinner : display
}

export default FilterLG
