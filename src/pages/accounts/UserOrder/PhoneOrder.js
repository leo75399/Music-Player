import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import styles from './PhoneOrder.module.scss'
import classnames from 'classnames'
import { Icon } from '@iconify/react'

const PhoneOrder = (props) => {
  const [collapse, setCollapse] = useState(true)
  const { order_id, birthday, total, delivery_status, id } = props
  const history = useHistory()
  const { user } = props
  useEffect(() => {
    !user.login && history.push('/')
    // eslint-disable-next-line
    }, [user])
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
          <div className={classnames('mr-3')}>訂單號碼</div>
          <div>{order_id}</div>
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
            <div className={classnames('mr-3')}>訂單日期</div>
            <div>{birthday}</div>
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
            <div className={classnames('mr-3')}>價錢合計</div>
            <div>{total}</div>
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
            <div className={classnames('mr-3')}>訂單狀態</div>
            <div>{delivery_status}</div>
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
            <div className={classnames('mr-3')}>詳細資訊</div>
            <button
              className={classnames('btn', 'bg-dark', styles.border_button)}
            >
              <Link
                className={classnames('text-light')}
                // to={`/admin/user/detail/${id}?order=${order_id}`}
                to={`/admin/user/detail/${id}/${order_id}`}
              >
                訂單細節
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PhoneOrder
