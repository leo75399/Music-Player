import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Collapse } from 'react-bootstrap'
import { API_HOST } from './../../../../config'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'
import { AVATAR_PATH } from './../../../../config'

const Review = (props) => {
  const { user, setShowLogin, sid } = props
  const [review, setReview] = useState([])
  const [reviewMember, setReviewMember] = useState([])
  const [reviewStar, setReviewStar] = useState([])

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [showDel, setShowDel] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const handleCloseMore = () => setShowMore(false)
  const handleCloseDel = () => setShowDel(false)
  const handleShowDel = () => setShowDel(true)
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseEdit = () => setShowEdit(false)
  const handleShowEdit = () => setShowEdit(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [star, setStar] = useState(0)
  const [reviewId, setReviewId] = useState(0)
  const [open, setOpen] = useState(false)

  const myDel = async (e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:3000/products/review/del`, {
      data: {
        id: reviewId,
      },
    })
    setShowDel(false)
  }

  const mySubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${API_HOST}/products/review/add`, {
      sid: sid,
      members_id: user.member_sid,
      star: star,
      content: content,
      title: title,
    })
    setShow(false)
  }

  const myEdit = async (e) => {
    e.preventDefault()
    await axios.put(`${API_HOST}/products/review/edit`, {
      star: star,
      content: content,
      title: title,
      id: reviewId,
      images: '',
    })
    setShowEdit(false)
  }
  useEffect(() => {
    ;(async () => {
      let reviewData = await axios.get(
        `http://localhost:3000/products/reviewStar/${sid}`
      )
      setReviewStar(Math.round(reviewData.data[0].avgStar * 10) / 10)
    })()
    ;(async () => {
      let reviewData = await axios.get(
        `http://localhost:3000/products/review/${sid}`
      )
      setReview(reviewData.data)
    })()
    ;(async () => {
      let data = await axios.post(
        `http://localhost:3000/products/reviewMember`,
        {
          sid: sid,
          id: user.member_sid,
        }
      )
      setReviewMember(data.data)
    })()
  }, [sid, show, user, showEdit, showDel, reviewStar])
  let ar = []
  const starDisplay = (star) => {
    ar = []
    for (let i = 0; i < star; i++) {
      ar.push('1')
    }
  }

  return (
    <>
      <div
        className=" li_reviewTitle d-flex justify-content-between align-items-center"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <h5
          className="pr-3"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          評價 ({review.length})
        </h5>
        <div className="d-flex">
          <h5
            className="pl-3"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {reviewStar} / 5
          </h5>
          <h5>
            {open ? (
              <Icon
                icon="mdi:chevron-up"
                width="30"
                inline={true}
                className="mx-3"
              />
            ) : (
              <Icon
                icon="mdi:chevron-down"
                width="30"
                inline={true}
                className="mx-3"
              />
            )}
          </h5>
        </div>
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="my-3">
            <span
              className="li_addReview li_pointer"
              onClick={() => {
                if (user.login) {
                  if (reviewMember.length > 0) {
                    Swal.fire({
                      icon: 'warning',
                      title: '你已經評論過了！',
                      showConfirmButton: false,
                      timer: 1000,
                    })
                  } else {
                    handleShow()
                    setTitle('')
                    setStar(0)
                    setContent('')
                  }
                } else {
                  setShowLogin(true)
                }
              }}
            >
              新增評論
            </span>
          </div>
          <Modal show={show} onHide={handleClose} backdropClassName="li_bgc">
            <Modal.Header closeButton>
              <Modal.Title>寫下你對這件商品的評論吧</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form name="reviewAdd" onSubmit={mySubmit}>
                <div className="form-group">
                  <label htmlFor="">評論標題</label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">評論內容</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                  ></textarea>
                </div>

                <div className="form-group form-check">
                  <label className="" htmlFor="">
                    你的評分是：
                  </label>
                  <input
                    type="radio"
                    className="mx-3"
                    value="5"
                    checked={star === '5'}
                    onChange={(e) => {
                      setStar(e.target.value)
                    }}
                  />
                  <label className="form-check-label">5</label>
                  <input
                    type="radio"
                    className="mx-3"
                    value="4"
                    checked={star === '4'}
                    onChange={(e) => {
                      setStar(e.target.value)
                    }}
                  />
                  <label className="form-check-label">4</label>
                  <input
                    type="radio"
                    className="mx-3"
                    value="3"
                    checked={star === '3'}
                    onChange={(e) => {
                      setStar(e.target.value)
                    }}
                  />
                  <label className="form-check-label">3</label>
                  <input
                    type="radio"
                    className="mx-3"
                    value="2"
                    checked={star === '2'}
                    onChange={(e) => {
                      setStar(e.target.value)
                    }}
                  />
                  <label className="form-check-label">2</label>
                  <input
                    type="radio"
                    className="mx-3"
                    value="1"
                    checked={star === '1'}
                    onChange={(e) => {
                      setStar(e.target.value)
                    }}
                  />
                  <label className="form-check-label">1</label>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary li_colorFFF">
                    新增評論
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          {review.map((v, i) => {
            return i >= 2 ? (
              ''
            ) : (
              <div
                key={i}
                id="li_memberReview"
                className="li_memberReview py-3"
              >
                {starDisplay(v.star)}
                {ar.map((v, i) => {
                  return (
                    <Icon
                      key={i}
                      icon="mdi:star"
                      inline={true}
                      className="mr-1 mb-3"
                      width="20"
                    />
                  )
                })}
                <p className="li_font24 mb-1">{v.title}</p>
                <p>{v.content}</p>
                <p>By {v.nickname}</p>
                {user.nickname === v.nickname ? (
                  <div className="d-flex">
                    <Icon
                      inline={true}
                      icon="mdi:comment-edit-outline"
                      width="24"
                      className=" mr-2 li_pointer"
                      onClick={() => {
                        handleShowEdit()
                        setTitle(v.title)
                        setContent(v.content)
                        setStar(v.star.toString())
                        setReviewId(v.id)
                      }}
                    />

                    <Modal
                      show={showEdit}
                      onHide={handleCloseEdit}
                      backdropClassName="li_bgc"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title> 修改你的評論</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form name="reviewAdd">
                          <div className="form-group">
                            <label htmlFor="">評論標題</label>
                            <input
                              type="text"
                              className="form-control"
                              id=""
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">
                              評論內容
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={content}
                              onChange={(e) => {
                                setContent(e.target.value)
                              }}
                            ></textarea>
                          </div>

                          <div className="form-group form-check">
                            <label className="" htmlFor="">
                              你的評分是：
                            </label>
                            <input
                              type="radio"
                              className="mx-3"
                              value="5"
                              checked={star === '5'}
                              onChange={(e) => {
                                setStar(e.target.value)
                              }}
                            />
                            <label className="form-check-label">5</label>
                            <input
                              type="radio"
                              className="mx-3"
                              value="4"
                              checked={star === '4'}
                              onChange={(e) => {
                                setStar(e.target.value)
                              }}
                            />
                            <label className="form-check-label">4</label>
                            <input
                              type="radio"
                              className="mx-3"
                              value="3"
                              checked={star === '3'}
                              onChange={(e) => {
                                setStar(e.target.value)
                              }}
                            />
                            <label className="form-check-label">3</label>
                            <input
                              type="radio"
                              className="mx-3"
                              value="2"
                              checked={star === '2'}
                              onChange={(e) => {
                                setStar(e.target.value)
                              }}
                            />
                            <label className="form-check-label">2</label>
                            <input
                              type="radio"
                              className="mx-3"
                              value="1"
                              checked={star === '1'}
                              onChange={(e) => {
                                setStar(e.target.value)
                              }}
                            />
                            <label className="form-check-label">1</label>
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                          放棄修改
                        </Button>
                        <Button variant="primary li_colorFFF" onClick={myEdit}>
                          修改完成
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Icon
                      icon="mdi:trash-can-outline"
                      width="24"
                      inline={true}
                      className="li_pointer"
                      onClick={() => {
                        handleShowDel()
                        setReviewId(v.id)
                      }}
                    />

                    <Modal
                      show={showDel}
                      onHide={handleCloseDel}
                      backdropClassName="li_bgc"
                    >
                      <Modal.Body>確定要刪除這留言嗎？ </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDel}>
                          再想想
                        </Button>
                        <Button variant="primary li_colorFFF" onClick={myDel}>
                          我確定
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )
          })}
          {review.length <= 2 ? (
            ''
          ) : (
            <div className="my-3">
              <span
                className="li_addReview li_pointer"
                onClick={() => {
                  setShowMore(true)
                }}
              >
                看更多評論
              </span>
              <Modal
                show={showMore}
                onHide={handleCloseMore}
                backdropClassName="li_bgc"
              >
                <Modal.Header closeButton>
                  <Modal.Title>商品全部留言</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {review.map((v, i) => {
                    return (
                      <div
                        key={i}
                        id="li_memberReview"
                        className="li_memberReview py-3"
                      >
                        {starDisplay(v.star)}
                        {ar.map((v, i) => {
                          return (
                            <Icon
                              key={i}
                              icon="mdi:star"
                              inline={true}
                              className="mr-1 mb-1"
                              width="20"
                            />
                          )
                        })}
                        <p className="li_font24 mb-1">{v.title}</p>
                        <p>{v.content}</p>
                        <div className="li_vCenter">
                          <div className="mr-3 d-flex emma-profile-img">
                            <img
                              src={`${AVATAR_PATH}/${v.avatar}`}
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <p className="mb-0 mr-3">By {v.nickname}</p>
                          {user.nickname === v.nickname ? (
                            <div className="d-flex">
                              <Icon
                                inline={true}
                                icon="mdi:comment-edit-outline"
                                width="24"
                                className=" mr-2 li_pointer"
                                onClick={() => {
                                  handleShowEdit()
                                  setTitle(v.title)
                                  setContent(v.content)
                                  setStar(v.star.toString())
                                  setReviewId(v.id)
                                }}
                              />

                              <Icon
                                icon="mdi:trash-can-outline"
                                width="24"
                                inline={true}
                                className="li_pointer"
                                onClick={() => {
                                  handleShowDel()
                                  setReviewId(v.id)
                                }}
                              />
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    )
                  })}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseMore}>
                    關閉留言
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </div>
      </Collapse>
    </>
  )
}

export default Review
