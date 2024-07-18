import { useEffect, useRef } from 'react'

const MeetupWord = () => {
  const here = useRef()
  const meet = useRef()
  const up = useRef()

  useEffect(() => {
    let shadow = ''
    for (let i = 0; i < 30; i++) {
      shadow += (shadow ? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 #d9d9d9'
    }
    here.current.style.textShadow = shadow
    meet.current.style.textShadow = shadow
    up.current.style.textShadow = shadow
  }, [])

  return (
    <div className="j-list-bg-wrap">
      <div className="j-list-bg here" data-j-text="HERE." ref={here}>
        HERE.
      </div>
      <div className="j-list-bg meet" data-j-text="MEET" ref={meet}>
        MEET
      </div>
      <div className="j-list-bg up" data-j-text="UP" ref={up}>
        UP
      </div>
    </div>
  )
}

export default MeetupWord
