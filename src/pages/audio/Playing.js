import React, { useEffect, useState, useRef } from 'react'

import ReactPlayer from 'react-player'
import Wave from '@foobar404/wave'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import '../../styles/audio/reset.css'
import '../../styles/audio/playing.scss'
import '../../styles/audio/wave.css'
import '../../styles/audio/radioplayer.css'
import Main from './playing/Main'

import WaveInif from './playing/WaveInif'
import Duration from './playing/Duration' //轉換時間

function Playing(props) {
  const didMountRef = useRef(false) //didupdate
  //[狀態]音樂資料
  const [playlistName, setPlaylistName] = useState({
    playlist_name: '舞力健身',
    playlist_image: '/playlist/cover1.jpg',
  }) //歌曲清單名稱陣列
  const [playlist, setPlaylist] = useState([]) //歌曲陣列清單
  const [lyric, setLyric] = useState([]) //歌詞陣列
  const [nowLyric, setNowLyric] = useState([{ index: 0 }]) //當前歌詞陣列
  const [order, setOrder] = useState(0) //第幾首歌
  //[狀態]播放操控
  const audioPlayer = useRef() //audio player
  const [loop, setLoop] = useState(false) //重複播放
  const [volume, setVolume] = useState(2) //音量
  const [play, setPlaying] = useState(false) //播放中
  const [played, setPlayed] = useState('') //現在播放時間
  const [duration, setDuration] = useState('') //整首歌曲時間
  const [seekStatus, setSeekStatus] = useState(false) //拉動播放吧
  const [seekValue, setSeekValue] = useState('') //拉動播放吧後的值
  const audioRef = useRef(null) // 用于追踪 audio 元素

  //[狀態]介面
  const [wave] = useState(new Wave()) //左方的music flow
  const [playlistView, setplaylistView] = useState(false) //側邊欄
  const [mobilePlayer, setmobilePlayer] = useState(false)
  const leoPlaypageMusiclist = useRef()
  const leosongtime = useRef()

  //網址querystring處理
  // const urlSearchParams = new URLSearchParams(window.location.search)
  // let urlPlaylist = urlSearchParams.get('playlist') //抓到URL中的oredr
  // let urlOrder = urlSearchParams.get('order') //抓到URL中的oredr
  // urlOrder = 0
  // didMount
  useEffect(() => {
    console.log('componentDidMount')
    fetchPlayList() //取得歌曲列表陣列
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // didMount結束後馬上didupdate
  useEffect(() => {
    if (didMountRef.current) {
      console.log('componentDidUpdate')
      setPlaypageMainHeight() //設定中間內容的高度
      leoPlaypageMusiclist.current.classList.add('leo_playpage_musiclist_none') //幫加上class
      // waveConnectToFlow() //將左邊動畫flow綁定給audio
      window.addEventListener('resize', setPlaypageMainHeight) //視窗變化時執行綁定
    } else {
      didMountRef.current = true
    }
  }, [playlist]) // eslint-disable-line react-hooks/exhaustive-deps

  //Unmount
  useEffect(() => {
    return () => {
      console.log('componentWillUnmount(模擬)', playlist)
      window.removeEventListener('resize', setPlaypageMainHeight)
    }
  }, [playlist])

  //取得歌曲列表陣列(didMount)，並且設定當前播放歌曲
  function fetchPlayList() {
    let data = [
      {
        id: '0',
        name: 'Lost Cause',
        singer: 'Billie Eilish',
        time: '03:48',
        image: `${process.env.PUBLIC_URL}/image/BillieEilishLostCause.jpeg`,
        file: `${process.env.PUBLIC_URL}/file/BillieEilishLostCause.mp3`,
        lyric: '/lyric/BillieEilishLostCause.vtt',
      },
      {
        id: '1',
        name: 'Shape of You',
        singer: 'Ed Sheeran',
        time: '04:23',
        image: `${process.env.PUBLIC_URL}/image/EdSheeranShapeofYou.jpg`,
        file: `${process.env.PUBLIC_URL}/file/EdSheeranShapeofYou.mp3`,
        lyric: '/lyric/EdSheeranShapeofYou.vtt',
      },
      {
        id: '2',
        name: 'For Tonight',
        singer: 'Giveon',
        time: '03:22',
        image: `${process.env.PUBLIC_URL}/image/GiveonForTonight.png`,
        file: `${process.env.PUBLIC_URL}/file/GiveonForTonight.mp3`,
        lyric: '/lyric/GiveonForTonight.vtt',
      },
      {
        id: '3',
        name: 'Uptown Funk',
        singer: 'Mark Ronson',
        time: '04:30',
        image: `${process.env.PUBLIC_URL}/image/MarkRonsonUptownFunk.jpeg`,
        file: `${process.env.PUBLIC_URL}/file/MarkRonsonUptownFunk.mp3`,
        lyric: '/lyric/MarkRonsonUptownFunk.vtt',
      },
      {
        id: '4',
        name: 'Lost Stars',
        singer: 'Adam Levine',
        time: '04:34',
        image: `${process.env.PUBLIC_URL}/image/AdamLevineLostStars.jpg`,
        file: `${process.env.PUBLIC_URL}/file/AdamLevineLostStars.mp3`,
        lyric: '/lyric/AdamLevineLostStars.vtt',
      },
    ]
    setPlaylist(data)

    let nowPlaying = data[order] //取得當前播需播放歌曲
    setLeftRecordImage(nowPlaying['image']) //設定左方唱片圖片
    fetchLyric(nowPlaying['lyric']) //取得vtt歌詞
  }

  let audioName
  const [waveCanvasName, setWaveCanvasName] = useState('') //canvas 的id
  //將左邊動畫flow綁定給audio(didupdate)
  function waveConnectToFlow() {
    if (audioRef.current) {
      if (!audioRef.current.isConnectedToWave) {
        const audioName = `leoReactPlayerAudio${Math.ceil(
          Math.random() * 100000
        )}`
        const waveName = `leoReactPlayerWave${Math.ceil(
          Math.random() * 100000
        )}`
        setWaveCanvasName(waveName)

        audioRef.current.id = audioName // 设置 audio 元素的 ID
        wave.fromElement(audioName, waveName, {
          type: 'flower',
          colors: ['#E88239'],
        })

        audioRef.current.isConnectedToWave = true // 标记已经连接
      }
    }
  }
  //設定左方唱片圖片(fetchPlayList)
  function setLeftRecordImage(imageLocation) {
    const record = document.querySelector('.record') //設定圖片
    record.style.setProperty('--songImg-url', `url(${imageLocation})`)
  }
  //取得vtt歌詞(fetchPlayList)
  function fetchLyric(lyricLocation) {
    const publicUrl = process.env.PUBLIC_URL || ''
    const url = `${publicUrl}${lyricLocation}`
    fetch(url, {
      method: 'get',
    })
      .then(function (response) {
        return response.text()
      })
      .then(function (result) {
        parseToLyrics(result) //轉換歌詞成物件
      })
      .catch(function (err) {
        console.log(err)
      })
  }
  //轉換vtt歌詞成物件(fetchLyric)
  function parseToLyrics(result) {
    let lyricsArray = result.split('\n\n')
    let index = 0
    let lyrics = lyricsArray.map(function (item) {
      let parts = item.split('\n')
      let timeSplit = parts[0].split(' ')
      return {
        index: index++,
        timeStart: vttTimeToSecond(timeSplit[0]),
        timeEnd: vttTimeToSecond(timeSplit[2]),
        text: parts[1],
      }
    })
    setLyric(lyrics)
  }
  //將vtt時間轉換為秒鐘(parseToLyrics)
  function vttTimeToSecond(time) {
    let second = time.slice(6, 8)
    let minutes = time.slice(3, 5)
    return minutes * 60 + second * 1
  }
  //設定中間內容的高度(didupdate)
  function setPlaypageMainHeight() {
    //網頁視窗高度-nav-播放器
    let height =
      window.innerHeight -
      document.querySelector('nav').offsetHeight -
      document.querySelector('#leo_player').offsetHeight
    document.querySelector('.leo_playpage_main').style.height = height + 'px'
  }
  //抓到現在是哪句歌詞並給予粗體與放大
  function highlightLyric(played) {
    let s = played
    let nowLyricsArray
    nowLyricsArray = lyric.filter(function (element) {
      return element['timeStart'] < s && element['timeEnd'] > s
    })
    if (nowLyricsArray.length) {
      //如果當前有歌詞，再設定新的狀態
      setNowLyric(nowLyricsArray)
    }
  }
  //歌詞動態滑動
  function setLyricAnimate() {
    if (document.querySelector('#leo_lyric .leo_highlight')) {
      let highlighHigh = document.querySelector(
        '#leo_lyric .leo_highlight'
      ).offsetHeight
      let lyricHeight = document.querySelector('#leo_lyric li').offsetHeight
      return -(highlighHigh / 2 + nowLyric[0].index * lyricHeight)
    }
  }
  //下一首歌
  function nextSong() {
    let newUrlOrder = order + 1
    if (newUrlOrder > playlist.length - 1) {
      return alert('最後一首了')
    }
    changeSong(newUrlOrder)
  }

  //上一首歌
  function previousSong() {
    let newUrlOrder = order - 1
    if (newUrlOrder < 0) {
      return alert('這是第一首')
    }
    changeSong(newUrlOrder)
  }
  //換歌方法
  function changeSong(newUrlOrder) {
    setOrder(newUrlOrder)
    let nowPlaying = playlist[newUrlOrder]
    setLeftRecordImage(nowPlaying['image'])
    fetchLyric(nowPlaying['lyric'])
    setNowLyric([{ index: 0 }])
  }
  return (
    <>
      <ReactPlayer
        ref={audioPlayer}
        progressInterval={250}
        id="leoReactPlayer"
        loop={loop}
        volume={volume * 0.1}
        url={
          ///決定要放什麼音樂
          playlist.length > 0
            ? playlist[order]['file']
            : 'https://leo75399.github.io/audio-player/music/Billie%20Eilish%20-%20Lost%20Cause%20(Official%20Music%20Video).mp3'
        }
        width="0"
        height="0"
        playing={play}
        onReady={() => {
          const internalPlayer = audioPlayer.current.getInternalPlayer()
          if (internalPlayer && !audioRef.current) {
            audioRef.current = internalPlayer
            waveConnectToFlow()
          }
        }}
        onEnded={function () {
          //歌曲結束
          nextSong()
        }}
        onProgress={function (e) {
          //現在播放進度設定(秒)
          setPlayed(e.playedSeconds)
          setDuration(e.loadedSeconds)
          highlightLyric(e.playedSeconds) //抓到現在是哪句歌詞並給予粗體與放大
        }}
      />
      <div
        className={
          playlistView
            ? 'leo_playpage_musiclist leo_playpage_musiclist_open'
            : 'leo_playpage_musiclist '
        }
        onClick={function (e) {
          if (
            e.target.className ===
            'leo_playpage_musiclist leo_playpage_musiclist_open'
          ) {
            setplaylistView(false)
          }
        }}
        ref={leoPlaypageMusiclist}
        onTransitionEnd={function (e) {
          if (!playlistView) {
            e.target.classList.add('leo_playpage_musiclist_none')
          }
        }}
      >
        <div
          className={
            playlistView
              ? 'leo_playpage_musiclist_wrap leo_playpage_musiclist_wrap_open'
              : 'leo_playpage_musiclist_wrap'
          }
        >
          <div className="leo_playlist_cover">
            <div className="leo_playlist_cover_left">
              <img
                src={`${
                  process.env.PUBLIC_URL + playlistName['playlist_image']
                }`}
                alt=""
              />
            </div>
            <div className="leo_playlist_cover_right">
              <h3>{playlistName.playlist_name}</h3>
              <p>共{playlist.length}首歌</p>
            </div>
          </div>
          <h2>待播清單</h2>
          <ul>
            {playlist.map((obj, index) => {
              return (
                <li
                  key={index}
                  className={'songorder' + index}
                  onClick={function (e) {
                    let songOrder = e.currentTarget.classList[0].replace(
                      'songorder',
                      ''
                    )
                    changeSong(songOrder)
                  }}
                >
                  <div className="leo_musiclist_li_left">
                    <img src={obj.image} alt="" />
                  </div>
                  <div className="leo_musiclist_li_mid">
                    <h3>{obj.name}</h3>
                    <p> {obj.singer}</p>
                  </div>
                  <div className="leo_musiclist_li_right">{obj.time}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="leo_playing_wrap">
        <div className="leo_container">
          <div className="leo_playpage_main">
            <Main
              play={play}
              setPlaying={setPlaying}
              setLyricAnimate={setLyricAnimate}
              lyric={lyric}
              nowLyric={nowLyric}
              waveCanvasName={waveCanvasName}
            />
          </div>
        </div>
        <div className="leo_playpage_wave">
          <WaveInif />
        </div>
        <div id="leo_player">
          <div className="leo_songtime" ref={leosongtime}>
            <div id="leo_nowTime">
              <Duration seconds={played} />
            </div>
            <div id="leo_allTime">
              <Duration seconds={duration - played} />
            </div>
          </div>
          <div id="leo_duration">
            <div id="leo_now_duration">
              <Slider
                railStyle={{
                  height: '5px',
                  backgroundColor: 'rgb(104, 104, 104)',
                }}
                trackStyle={{ height: '5px', backgroundColor: '#E88239' }}
                handleStyle={{
                  borderColor: '#E88239',
                }}
                min={0}
                max={Math.ceil(duration)}
                value={seekStatus ? seekValue : Math.ceil(played)}
                onChange={function (e) {
                  setSeekStatus(true)
                  setSeekValue(e) //調整audio時間移動狀態
                }}
                onAfterChange={function (e) {
                  setPlayed(e) //調整audio時間狀態
                  audioPlayer.current.seekTo(e) //audio時間方法
                  setSeekStatus(false)
                }}
              />
            </div>
          </div>
          <div className="leo_player_wrap">
            <div className="leo_player_left">
              <div className="leo_player_left_photo">
                <img
                  src={playlist.length > 0 ? playlist[order]['image'] : ''}
                  alt=""
                />
              </div>
              <div className="leo_player_left_text">
                <h3
                  onClick={() => {
                    setPlayed(84)
                    audioPlayer.current.seekTo(84)
                  }}
                >
                  {playlist.length > 0 ? playlist[order]['name'] : '載入中'}
                </h3>
                <p>{playlist.length > 0 ? playlist[order]['singer'] : ''}</p>
              </div>
            </div>
            <div className="leo_player_mid">
              <ul>
                {/* <li>
                  <button>
                    <img
                      src={require('./image/playericon/shuffle.svg').default}
                      alt=""
                    />
                  </button>
                </li> */}
                <li>
                  <button onClick={previousSong}>
                    <img
                      src={
                        require('./image/playericon/next track-1.svg').default
                      }
                      alt=""
                    />
                  </button>
                </li>
                <li>
                  <button
                    id="leo_play"
                    onClick={function () {
                      if (play) {
                        setPlaying(false)
                      } else {
                        setPlaying(true)
                      }
                    }}
                  >
                    {play ? (
                      <img
                        src={require('./image/playericon/pause.svg').default}
                        alt=""
                      />
                    ) : (
                      <img
                        src={require('./image/playericon/play.svg').default}
                        alt=""
                      />
                    )}
                  </button>
                </li>

                <li>
                  <button>
                    <img
                      onClick={nextSong}
                      src={require('./image/playericon/next track.svg').default}
                      alt=""
                    />
                  </button>
                </li>

                <li>
                  <button
                    onClick={function () {
                      loop ? setLoop(false) : setLoop(true)
                    }}
                  >
                    {loop ? (
                      <img
                        src={
                          require('./image/playericon/cycle arrows active.svg')
                            .default
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        src={
                          require('./image/playericon/cycle arrows.svg').default
                        }
                        alt=""
                      />
                    )}
                  </button>
                </li>
              </ul>
            </div>
            <div className="leo_player_right">
              <ul>
                <li>
                  <button className="volume_button">
                    <div className="volume_bar">
                      <Slider
                        min={0}
                        max={10}
                        value={volume}
                        onChange={function (e) {
                          let barWidth =
                            document.querySelector('.volume_bar').offsetWidth
                          if (barWidth === 100) {
                            setVolume(e) //調整audiog聲音移動狀態
                          }
                        }}
                        trackStyle={{ backgroundColor: '#24ac64' }}
                        handleStyle={{
                          borderColor: '#E88239',
                          height: '12px',
                          width: '12px',
                          marginTop: '-4px',
                        }}
                      ></Slider>
                    </div>
                    <img
                      src={require('./image/playericon/sound.svg').default}
                      alt=""
                    />
                  </button>
                </li>
                <li>
                  <button
                    id="leo_playlist_button"
                    onClick={function () {
                      playlistView
                        ? setplaylistView(false)
                        : setplaylistView(true)
                    }}
                  >
                    <img
                      src={require('./image/playericon/Playlist.svg').default}
                      alt=""
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={
            mobilePlayer
              ? 'leo_player_mobile leo_player_mobile_open'
              : 'leo_player_mobile '
          }
        >
          <div
            className="leo_player_mobile_button"
            onClick={() => {
              mobilePlayer ? setmobilePlayer(false) : setmobilePlayer(true)
            }}
          >
            {mobilePlayer ? (
              <i className="fas fa-chevron-down"></i>
            ) : (
              <i className="fas fa-chevron-up"></i>
            )}
          </div>
          <div className="leo_player_mobile_left">
            <div className="leo_player_photo">
              <img
                src={playlist.length > 0 ? playlist[order]['image'] : ''}
                alt=""
              />
            </div>
            <div className="leo_player_left_text">
              <h3>
                {playlist.length > 0 ? playlist[order]['name'] : '載入中'}
              </h3>
              <p>{playlist.length > 0 ? playlist[order]['singer'] : ''}</p>
            </div>
          </div>
          <div className="leo_player_mobile_right">
            <button
              id="leo_playlist_button"
              onClick={function () {
                playlistView ? setplaylistView(false) : setplaylistView(true)
              }}
            >
              <img
                src={require('./image/playericon/Playlist.svg').default}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Playing
