import React from 'react'

function Main(props) {
  const { play, setLyricAnimate, lyric, nowLyric, setPlaying, waveCanvasName } =
    props
  return (
    <>
      <section className="leo_playpage_main leo_playpage_left">
        <main>
          <div className="player">
            {/* 唱片轉動 */}
            <div
              className={
                play
                  ? 'record recordRotate '
                  : 'record recordRotate  stopRecordRotate'
              }
            >
              <div className="label"></div>
              <div className="spindle"></div>
            </div>
            <div
              className={play ? 'arm-container playing' : 'arm-container pause'}
            >
              <div className="knob weight bottom"></div>
              <div className="arm"></div>
              <div
                className="knob weight top"
                onClick={function () {
                  play ? setPlaying(false) : setPlaying(true)
                }}
              >
                <button className="play"></button>
              </div>
            </div>
            <div className="speaker">
              <div className="hole"></div>
              <div className="hole"></div>
              <div className="hole"></div>
              <div className="hole"></div>
              <div className="hole"></div>
              <div className="hole"></div>
              <div className="hole"></div>
              <div className="hole"></div>
            </div>
            <div className="knob volume bottom">
              <div className="down"></div>
              <div className="up"></div>
            </div>
            <div className="knob volume top"></div>
          </div>
        </main>
        {/* 左邊flow特效 */}
        <div
          className={
            play ? 'leo_music_flow ' : 'leo_music_flow leo_music_flow_hidden'
          }
        >
          <canvas id={waveCanvasName} height="700" width="700"></canvas>
        </div>
      </section>
      <section className="leo_playpage_main leo_playpage_right">
        <div className="leo_lyric_wrap">
          <ul
            id="leo_lyric"
            style={{
              transform: `translateY(${setLyricAnimate()}px)`,
            }}
          >
            {lyric.map(function (obj, index, array) {
              return (
                <li
                  key={index}
                  id={'lyrics' + obj['index']}
                  className={
                    obj['index'] === nowLyric[0].index ? 'leo_highlight' : ''
                  }
                >
                  {obj['text']}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Main
