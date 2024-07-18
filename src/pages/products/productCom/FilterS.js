import React from 'react'
import { Icon } from '@iconify/react'

const FilterS = (props) => {
  const { count } = props
  return (
    <div className="d-flex d-lg-none justify-content-between my-5">
      <div className="li_center">
        <Icon icon="mdi:filter-variant" width="24" className="" />
        <span>{count}</span>
      </div>
      <select
        className="li_sort"
        // onChange={(e) => setSortBy(e.target.value)}
        onClick={() => {}}
      >
        <option>Sort by</option>
        <option value="TopSeller">TopSeller</option>
        <option value="newest">Newest</option>
        <option value="l2h">Price Low to High</option>
        <option value="h2l">Price High to Low</option>
      </select>
    </div>
  )
}

export default FilterS
