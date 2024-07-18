import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

import styles from './PhoneOrder.module.scss'
import classnames from 'classnames'
import { Icon } from '@iconify/react'

const PhoneOrder = (props) => {
  const [collapse, setCollapse] = useState(true)
  const { product_name, chinese, product_size, quantity, price } = props
  return (
    <div className="border-top">
      <div
        className={classnames(
          'd-flex',
          'justify-content-between',
          styles.order,
          styles.order_id
        )}
        onClick={() => {
          setCollapse(!collapse)
        }}
      >
        <div className={classnames('d-flex', styles.idGroup)}>
          <div className={classnames('mr-3')}>商品資訊</div>
          <div>{product_name}</div>
        </div>
        <div>
          <Icon icon="dashicons:arrow-down-alt2" />
        </div>
      </div>
      <div
        className={classnames(collapse ? styles.orderCollapse : styles.show)}
      >
        <div
          className={classnames(
            'd-flex',
            'justify-content-between',
            styles.order_id
          )}
        >
          <div className={classnames('d-flex', styles.idGroup)}>
            <div className={classnames('mr-3')}>顏色</div>
            <div>{chinese}</div>
          </div>
        </div>
        <div
          className={classnames(
            'd-flex',
            'justify-content-between',
            styles.order_id
          )}
        >
          <div className={classnames('d-flex', styles.idGroup)}>
            <div className={classnames('mr-3')}>尺寸</div>
            <div>{product_size}</div>
          </div>
        </div>
        <div
          className={classnames(
            'd-flex',
            'justify-content-between',
            styles.order_id
          )}
        >
          <div className={classnames('d-flex', styles.idGroup)}>
            <div className={classnames('mr-3')}>數量</div>
            <div>{quantity}</div>
          </div>
        </div>
        <div
          className={classnames(
            'd-flex',
            'justify-content-between',
            'border-bottom',
            styles.order_id
          )}
        >
          <div
            className={classnames(
              'd-flex',
              styles.idGroup,
              'align-items-center'
            )}
          >
            <div className={classnames('mr-3')}>單價</div>
            <div>{price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PhoneOrder
