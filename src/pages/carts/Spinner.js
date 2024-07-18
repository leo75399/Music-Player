import React, { useState } from 'react'
import { css } from '@emotion/react'
import PuffLoader from 'react-spinners/PuffLoader'

const Spinner = (props) => {
  const { loading } = props
  let [color] = useState('#e88239')
  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 300px auto;
    border-color: red;
  `
  return (
    <div className={'ming_spinner'}>
      <PuffLoader color={color} loading={loading} css={override} size={150} />
    </div>
  )
}

export default Spinner
