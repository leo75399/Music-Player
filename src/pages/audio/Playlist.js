import React, { useEffect, useState } from 'react'
import '../../styles/audio/playlist.scss'
import '../../styles/audio/playlistSpace.scss'

import starImg from './image/star.png'
import Carousel from './playlist/Carousel'

import * as THREE from 'three'

function Playlist() {
  const [playlist, setPlaylist] = useState([
    { playlist_name: '舞力健身' },
    { playlist_name: '熱力健跑' },
    { playlist_name: '賽跑鍛鍊' },
    { playlist_name: '動漫健身' },
    { playlist_name: '動感運動' },
    { playlist_name: '深夜健身' },
    { playlist_name: '超越自己' },
  ]) //專輯
  const [playlistView, setPlaylistView] = useState(false) //音樂列表介面

  let scene, camera, renderer, starGeo, stars

  // didMount
  useEffect(() => {
    console.log('componentDidMount')
    // fetchPlayList()
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // function fetchPlayList() {
  //   //抓取歌曲列表資料
  //   fetch('http://localhost:3000/audio/playlist', {
  //     method: 'GET',
  //   })
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (jsonData) {
  //       // 處理資料
  //       console.log(jsonData)
  //       setPlaylist(jsonData)
  //     })
  //     .catch(function (err) {
  //       console.log(err)
  //     })
  // }

  function init() {
    //create scene object
    scene = new THREE.Scene()

    //setup camera with facing upward
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.z = 50
    camera.position.y = 50
    camera.position.x = 50

    camera.rotation.x = Math.PI / 2

    //setup renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight - 56)
    document.getElementById('leo_playlist').appendChild(renderer.domElement)

    //星星
    starGeo = new THREE.Geometry()
    for (let i = 0; i < 6000; i++) {
      let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      )
      star.velocity = 0
      star.acceleration = 0.02
      starGeo.vertices.push(star)
    }

    let sprite = new THREE.TextureLoader().load(starImg)
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
    })
    stars = new THREE.Points(starGeo, starMaterial)
    scene.add(stars)
    // window.addEventListener('resize', onWindowResize, false)

    animate()
  }

  function animate() {
    starGeo.vertices.forEach((p) => {
      p.velocity += p.acceleration
      p.y -= p.velocity

      if (p.y < -200) {
        p.y = 200
        p.velocity = 0
      }
    })
    starGeo.verticesNeedUpdate = true
    stars.rotation.y += 0.002

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  }

  /////
  return (
    <>
      <div className="leo_playlist" id="leo_playlist">
        <div
          className="leo_into_space"
          onAnimationEnd={function () {
            setPlaylistView(true)
          }}
        >
          <div class="scene">
            <div class="wrap">
              <div class="wall wall-right"></div>
              <div class="wall wall-left"></div>
              <div class="wall wall-top"></div>
              <div class="wall wall-bottom"></div>
              <div class="wall wall-back"></div>
            </div>
            <div class="wrap">
              <div class="wall wall-right"></div>
              <div class="wall wall-left"></div>
              <div class="wall wall-top"></div>
              <div class="wall wall-bottom"></div>
              <div class="wall wall-back"></div>
            </div>
          </div>
        </div>
        <div className="app">
          <Carousel
            playlist={playlist}
            playlistView={playlistView}
            setPlaylistView={setPlaylistView}
          ></Carousel>
        </div>
      </div>
    </>
  )
}

export default Playlist
