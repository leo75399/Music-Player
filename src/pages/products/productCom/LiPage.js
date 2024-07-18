import React from 'react'

const LiPage = (props) => {
  const { liData, page, setPage } = props
  return liData.totalRows > page * 16 ? (
    <div className="py-5 li_center li_page">
      <div
        className="p-2 py-lg-3 px-lg-5 mx-3 li-show  li_showAll li_pointer"
        onClick={() => {
          setPage(liData.totalPages)
        }}
      >
        SHOW ALL ({liData.totalRows - page * 16})
      </div>
      <div
        className="p-2 py-lg-3 px-lg-5 mx-3 li-show li_showNext li_pointer "
        onClick={() => {
          setPage(page + 1)
        }}
      >
        SHOW MORE (16)
      </div>
    </div>
  ) : (
    ''
  )
}

export default LiPage
