import './MeetupGame.scss'
import { useState, useRef, useEffect } from 'react'
import MeetupCanvas from './MeetupCanvas'
import GameCard from './GameCard'

import baffle from 'baffle'

// 自定義
import joeyServer from '../joeyServer' //axios
import { joeyWait } from '../joeyHelper'

const MeetupGame = ({ history }) => {
  const [decode, setDecode] = useState(false)
  const [meetupList, setMeetupList] = useState([])
  const [showMeetup, setShowMeetup] = useState(false)

  const gameTitle1 = useRef()
  const gameTitle2 = useRef()
  const gameTitle3 = useRef()
  const gameBtn = useRef()
  const gameWrap = useRef()
  const gameLoading = useRef(false)

  useEffect(() => {
    const getMeetupInfo = async () => {
      const { data } = await joeyServer.get('/meetup/list')
      setMeetupList(data.result)
    }
    getMeetupInfo()
  }, [])

  const renderedMeetupList = () => {
    const randomMeetup =
      meetupList[Math.floor(Math.random() * meetupList.length)]
    return <GameCard key={randomMeetup.id} card={randomMeetup} />
  }
  const onClickHandler = async () => {
    if (gameLoading.current) return

    const baffleSetting = {
      characters: '▒█▓/>░+-~!=*meetup',
      speed: 100,
    }
    const b1 = baffle(gameTitle1.current, baffleSetting)
    const b2 = baffle(gameTitle2.current, baffleSetting)
    const b3 = baffle(gameTitle3.current, baffleSetting)
    const b4 = baffle(gameBtn.current, baffleSetting)

    b4.start()

    if (decode) {
      gameLoading.current = true
      gameTitle1.current.style.opacity = '0'
      gameTitle2.current.style.opacity = '0'
      gameTitle3.current.style.opacity = '0'

      const gameCard = document.querySelector('.j-game-card')
      if (gameCard) gameCard.style.transform = 'scale(0.001)'

      await joeyWait(1)
      b4.text(() => '再抽一次')
      b4.reveal(1000)
      await joeyWait(0.5)
      history.push('/meetup/game')
      gameLoading.current = false
      setShowMeetup(true)
      return
    }

    b1.text(() => '懵懂無知的初心者啊')
    b1.reveal(1000)

    await joeyWait(1)
    b2.text(() => '不知道要做甚麼嗎')
    b2.reveal(1000)

    await joeyWait(1)
    b3.text(() => '讓我來幫你做抉擇吧')
    b3.reveal(1000)

    await joeyWait(1)
    b4.text(() => '確定')
    b4.reveal(1000)

    setDecode(true)
  }

  return (
    <div className="j-game-wrap" ref={gameWrap}>
      <h2 className="j-game-title" ref={gameTitle1}>
        𒆪𒀀𒉿𒀭𒍣𒀀𒀝𒆠𒇻𒊭𒊑
      </h2>

      <h2 className="j-game-title" ref={gameTitle2}>
        𒌋𒉺𒄴𒊭𒊑𒇷𒆰
      </h2>

      <h2 className="j-game-title" ref={gameTitle3}>
        𒆰𒋫𒀝𒆠𒇻𒀭
      </h2>

      {showMeetup && renderedMeetupList()}

      <button className="j-game-btn" onClick={onClickHandler}>
        <span ref={gameBtn}>開始解密</span>
      </button>

      <MeetupCanvas />
    </div>
  )
}

export default MeetupGame
