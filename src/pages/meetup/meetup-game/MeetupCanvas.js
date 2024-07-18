import React from 'react'

class MeetupCanvas extends React.Component {
  canvasRef = React.createRef()
  myReq = React.createRef()

  componentDidMount() {
    ////////////////////////////////////////
    // canvas setting
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ////////////////////////////////////////
    // calc mouse move
    const mouse = {
      x: null,
      y: null,
      radius: 120, //滑鼠為中心的半徑
    }

    this.canvasDistance = (e) => {
      mouse.x = e.x
      mouse.y = e.y
    }

    window.addEventListener('mousemove', this.canvasDistance)

    ////////////////////////////////////////
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 1
        this.baseX = this.x // init x
        this.baseY = this.y //init y
        this.weight = Math.random() * 150 + 50
        this.color = [255, 255, 255]
      }

      _draw() {
        ctx.fillStyle = `rgb(${this.color.join()})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.random(), 0, Math.PI * 2) //亮晶晶
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        const dx = mouse.x - this.x // 滑鼠與點的x距離
        const dy = mouse.y - this.y // 滑鼠與點的y距離
        const dz = Math.sqrt(dx * dx + dy * dy) //勾股求第三邊

        if (dz < mouse.radius) {
          // 當前比率
          const speed = (mouse.radius - dz) / mouse.radius
          // 滑鼠與點的距離(第三邊): 距離越遠越小 反之越大 推的也越多
          const calcX = dx / dz
          const calcY = dy / dz
          // 越近速度越快
          const pushX = calcX * speed * this.weight
          const pushY = calcY * speed * this.weight
          //   推開
          this.x -= pushX
          this.y -= pushY

          //
          this.color = [0, 255, 0]
          this._draw()
        } else {
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 30 // slow down
          }

          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 30 // slow down
          }

          if (this.color[2] < 255) {
            const r = this.color[0] + (255 - this.color[0]) / 30
            const g = this.color[1] + (255 - this.color[1]) / 30
            const b = this.color[2] + (255 - this.color[2]) / 30
            this.color = [r, g, b]
          }

          this._draw()
        }
      }
    }
    ////////////////////////////////////////
    // init particle
    let particleArray = []

    const init = () => {
      particleArray = []
      for (let i = 0; i < 9000; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        particleArray.push(new Particle(x, y))
      }
    }

    init()

    ////////////////////////////////////////
    // RWD
    this.resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener('resize', this.resizeCanvas)

    ////////////////////////////////////////
    // handle animate loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
      }
      this.myReq.current = requestAnimationFrame(animate) // recursion
    }

    animate()
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillUnmount() {
    console.log('componentWillUnmount觸發 canvas資料重置')
    window.removeEventListener('resize', this.resizeCanvas)
    window.removeEventListener('mousemove', this.canvasDistance)
    window.cancelAnimationFrame(this.myReq.current)
  }

  render() {
    return <canvas ref={this.canvasRef} className="j-canvas"></canvas>
  }
}

export default MeetupCanvas
