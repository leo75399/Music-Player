import React, { useState } from 'react'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'

const SpinnerInProducts = (props) => {
  const { loading, name } = props
  let [color] = useState('#e88239')
  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 300px auto;
    border-color: red;
  `

  return (
    <div className={name}>
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
}

export default SpinnerInProducts
