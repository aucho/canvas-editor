import React, { useState, useEffect, useCallback } from 'react'
import { CONFIGS, STATUS } from '../utils/config'
import './canvas.css'

const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL } = CONFIGS

function MainCanvas(props) {
  const [drawImg, setDrawImg] = useState({})
  const [ctx, setCtx] = useState()
  const [path, setPath] = useState([]) //存储一条轨迹上的点
  const [pen, setPen] = useState({
    radius: 3,     //笔大小
    rgb: 'rgb(0,0,0,1)',
    x: 0,          //记录当前点和上一个点的坐标值
    y: 0,
    lastX: null,
    lastY: null,
    isDrawing: false,
  })
  const { 
    img = DEFAULT_IMG_URL, 
    height=DEFAULT_CANVAS_HEIGHT, 
    width=DEFAULT_CANVAS_WIDTH,
    isInk= true,   // 是否画图状态
    paths = [[]],  // 所有划过的笔的轨迹s
    setPaths,      // 缓存笔轨迹方法
  } = props

  const { START, DURING, END, NO_RE } = STATUS
  const canvas = React.createRef()

  useEffect(()=>{
    // getcontext  获取canvas绘制接口
    setCtx(canvas.current.getContext('2d'))
  },[canvas, path, ctx])

  useEffect(()=>{
    // 更新后 绘制图片
    setDrawImg({width,height})
    if (ctx && (drawImg.width!==width||drawImg.height!==height)){
      ctx.drawImage(img, 0, 0, width, height)
      // 画布更新后 重新绘制缓存的轨迹
      if (paths.length > 0){
        ctx.fillStyle = pen.rgb
        paths.forEach(path => {
          if (path.length > 0){
            ctx.beginPath()
            ctx.moveTo(path[0].xProportion*width, path[0].yProportion*height)
            path.forEach((spot,index,self) => {
              const { xProportion, yProportion } = spot
              ctx.lineTo(xProportion * width, yProportion*height)
            })
            ctx.stroke()
          }
        })
      }
    }
  },[ctx, drawImg.height, drawImg.width, height, img, width, pen.rgb, paths])
  
  
  // 绘制方法
  function draw(x,y){
    // 将本次x,y存到lastX/Y中 这是异步操作
    setPen({
      ...pen,
      lastX: x,
      lastY: y,
    })
    // 刚点第一下 没有上个点 
    if (!pen.lastX||!pen.lastY) return
    ctx.fillStyle = pen.rgb
    ctx.beginPath()
    ctx.moveTo(pen.lastX,pen.lastY)
    ctx.lineTo(x, y)
    ctx.closePath()
    ctx.stroke()
  }

  // 处理鼠标事件
  function handleDraw(e, status){
    const statusMethods = []
    // -----------按下鼠标 开启绘画模式--------------
    statusMethods[START] = () => {
      setPen({...pen, isDrawing: true})
      // 开始一条新的轨迹
      setPath([])
    }

    // ------------绘画过程中--------------
    statusMethods[DURING] = () => {
      if (!pen.isDrawing) return
      // 鼠标点位计算
      const offsetX = e.pageX-(e.target.parentElement.offsetLeft-width/2)
      const offsetY = e.pageY-(e.target.parentElement.offsetTop-height/2)

      // 存储一个点的坐标；换算为比例 存储到数组里；左上角为坐标原点
      setPath([...path, {xProportion: offsetX/width, yProportion: offsetY/height}])
      draw(offsetX, offsetY)
    }

    //-------------鼠标离开或松开 关闭绘画模式---------------
    statusMethods[END] = () => {
      setPen({...pen, isDrawing: false, lastX: null, lastY: null})
      // 存储一整条轨迹
      setPaths([...paths, path])
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