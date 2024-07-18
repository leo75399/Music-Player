import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = (props) => {
  const { path } = props
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb li_breadCrumb">
        {path.length > 0 &&
          path.map((v, i) => {
            return v.id !== path.length ? (
              <li className="breadcrumb-item" key={v.id}>
                <Link to={v.url}>{v.name}</Link>
              </li>
            ) : (
              <li
                className="breadcrumb-item active"
                aria-current="page"
                key={v.id}
              >
                {v.name}
              </li>
            )
          })}
      </ol>
    </nav>
  )
}

export default BreadCrumb
