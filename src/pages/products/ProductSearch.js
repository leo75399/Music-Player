import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const ProductSearch = () => {
  const history = useHistory()
  const [search, setSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    setSearchText('')
    setSearch(false)
  }, [])

  return (
    <div>
      {search ? (
        <div className="li_search">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="li_inputSearch"
            placeholder="type here"
            onKeyDown={(event) => {
              const key = event.keyCode
              if (key === 13) {
                history.push({
                  pathname: '/products/search',
                  search: `?keyword=${searchText}`,
                })
                // setSearchText('')
                setSearch(false)
              }
            }}
          />
          {searchText === '' ? (
            <button className="li_notStyleInBtn p-0">
              <Icon
                icon="carbon:search"
                width="22"
                onClick={() => {
                  setSearch(false)
                  Swal.fire({
                    icon: 'error',
                    title: '你輸入的為空字串，請重新輸入',
                    showConfirmButton: false,
                    timer: 1000,
                  })
                }}
              />
            </button>
          ) : (
            <button className="li_notStyleInBtn p-0">
              <Icon
                icon="carbon:search"
                width="22"
                onClick={() => {
                  history.push({
                    pathname: '/products/search',
                    search: `?keyword=${searchText}`,
                  })
                  // setSearchText('')
                  setSearch(false)
                }}
              />
            </button>
          )}
        </div>
      ) : (
        <Icon
          icon="carbon:search"
          width="22"
          onClick={() => {
            setSearch(true)
          }}
        />
      )}
    </div>
  )
}

export default ProductSearch
