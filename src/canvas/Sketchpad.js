import React, { useState, useEffect } from 'react'
import { CONFIGS, STATUS } from '../utils/config'
import './canvas.css'

const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL } = CONFIGS

function MainCanvas(props) {
  const [ctx, setCtx] = useState()
  const [pen, setPen] = useState({
    radius: 3,     //笔触
    rgb: 'rgb(0,0,0,1)',
    x: 0,          //记录当前点和上一个点的坐标值
    y: 0,
    lastX: null,
    lastY: null,
    isDrawing: false,
  })
  const { 
    height=DEFAULT_CANVAS_HEIGHT, 
    width=DEFAULT_CANVAS_WIDTH,
    isInk= true   // 是否画图状态
  } = props

  const { START, DURING, END, NO_RE } = STATUS
  const canvas = React.createRef()

  useEffect(()=>{
    // 获取 canvas 元素
    setCtx(canvas.current.getContext('2d'))
  },[canvas])
  // 绘制方法
  function draw(x, y){
    // 将本次x,y存到lastX/Y中
    setPen({
      ...pen,
      lastX: x,
      lastY: y,
    })

    if (!pen.lastX||!pen.lastY) return
    ctx.fillStyle = pen.rgb
    ctx.beginPath()
    ctx.moveTo(pen.lastX,pen.lastY)
    ctx.lineTo(x, y)
    ctx.closePath()
    ctx.stroke()
  }
  
  function handleDraw(e, status){
    const statusMethods = []
    statusMethods[START] = () => {
      setPen({...pen, isDrawing: true})
    }

    statusMethods[DURING] = () => {
      if (!pen.isDrawing) return
      draw(e.pageX, e.pageY)
    }

    statusMethods[END] = () => {
      setPen({...pen, isDrawing: false, lastX: null, lastY: null})
    }
    statusMethods[status]()
  }

  return (
    <canvas className="main-canvas"
      ref={canvas} 
      width={width}
      height={height}
      onMouseDown={e=> isInk && handleDraw(e, START)}
      onMouseMove={e=> isInk && handleDraw(e, DURING)}
      onMouseUp={e=> isInk && handleDraw(e, END)}
      onMouseLeave={e=> isInk && handleDraw(e, END)}
    />
  )
}
export default MainCanvas