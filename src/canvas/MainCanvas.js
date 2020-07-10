import React, { useState, useEffect, useCallback } from 'react'
import { CONFIGS, STATUS, PEN_TYPE } from '../utils/config'
import './canvas.css'


const { PEN, RECTANGLE_STROKE, } = PEN_TYPE
const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL } = CONFIGS

function MainCanvas(props) {
  const [drawImg, setDrawImg] = useState({})
  const [ctx, setCtx] = useState()
  const [path, setPath] = useState({ type: PEN, trail:[] }) //存储一条轨迹上的点
  const { 
    img = DEFAULT_IMG_URL, 
    height=DEFAULT_CANVAS_HEIGHT, 
    width=DEFAULT_CANVAS_WIDTH,
    isInk= true,   // 是否画图状态
    paths = [[]],  // 所有划过的笔的轨迹s
    setPaths,      // 缓存轨迹方法
    pathHistory,   // 轨迹历史
    setPathHistory,// 轨迹历史方法
    setShouldUpdate, // 是否触发更新函数
    shouldUpdate, // 控制是否触发更新
    pen,    // 笔参数 颜色等
    setPen, // set
  } = props

  const { START, DURING, END, NO_RE } = STATUS
  const canvas = React.createRef()

  // 初始化样式方法
  const initStyle = useCallback(() => {
    const { rgb } = pen
    ctx.fillStyle = rgb
    ctx.strokeStyle = rgb
  },[ctx, pen])

  // canvas更新
  const updateCanvas = useCallback(() => {
    ctx.drawImage(img, 0, 0, width, height)
    // 画布更新后 重新绘制缓存的轨迹
    if (paths.length > 0){
      ctx.fillStyle = pen.rgb
      paths.forEach(path => {
        const { type, trail } = path
        const reDraw = {}
        // 定义每种绘制方式的 旧轨迹 在每次更新时的 重新绘制的方法
        reDraw[PEN] = () => {
          if (trail.length > 0){
            ctx.beginPath()
            ctx.moveTo(path.trail.xProportion*width, path.trail.yProportion*height)
            path.trail.forEach((spot, index, self) => {
              const { xProportion, yProportion } = spot
              ctx.lineTo(xProportion * width, yProportion * height)
            })
            ctx.stroke()
          }
        }
        reDraw[RECTANGLE_STROKE] = () => {
          const { startX, startY, endX, endY } = path.trail
          ctx.beginPath()
          ctx.strokeRect(startX*width, startY*height, (endX-startX)*width, (endY-startY)*height)
        }
        // execute
        initStyle()
        reDraw[type]()
      })
    }
    // 矩形的临时绘制
    if (path.trail.startX&&pen.penType===RECTANGLE_STROKE){
      const { startX, startY, endX, endY } = path.trail
      initStyle()
      ctx.beginPath()
      ctx.strokeRect(startX*width, startY*height, (endX-startX)*width, (endY-startY)*height)
    }
  },[ctx, width, height, img, paths, path, pen, initStyle])

  // console.log(paths)
  useEffect(()=>{
    // getcontext  获取canvas绘制接口
    setCtx(canvas.current.getContext('2d'))
  },[canvas, path, ctx])

  useEffect(()=>{
    // 更新后 绘制图片
    if (ctx && (drawImg.width!==width||drawImg.height!==height||shouldUpdate)){
      updateCanvas()
      setShouldUpdate(false)
    }
    setDrawImg({width,height})
  },[ctx, width, height, img, pen.rgb, paths, shouldUpdate, updateCanvas, drawImg.width, drawImg.height, setShouldUpdate])
  
  // 画笔绘制方法
  function draw(x,y){
    const { lastX, lastY } = pen
    // 将本次x,y存到lastX/Y中 这是异步操作
    setPen({
      ...pen,
      lastX: x,
      lastY: y,
    })
    // 刚点第一下 没有上个点 
    if (!lastX||!lastY){
      return
    }
    initStyle()
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    // ctx.closePath()
    ctx.stroke()
  }

  // 处理鼠标事件
  function handleDraw(e, status){
    const { isDrawing, penType, lastX, lastY } = pen
    // 鼠标点位计算
    const offsetX = e.pageX-(e.target.parentElement.offsetLeft)  //居中样式打开还需要 -1/2*width
    const offsetY = e.pageY-(e.target.parentElement.offsetTop)   //
    const statusMethods = {}
    const drawMethods = {
      [PEN]:{},
      [RECTANGLE_STROKE]:{},
    }

    // 定义不同绘制方式在 不同的阶段执行的操作
    // 指哪儿画哪儿
    drawMethods[PEN][DURING] = () => {
      // 存储一个点的坐标；换算为比例 存储到数组里；左上角为坐标原点
      setPath({
        type: penType,
        trail: [...path.trail, {xProportion: offsetX/width, yProportion: offsetY/height}]
      })
      draw(offsetX, offsetY)
    }

    // 画矩形
    drawMethods[RECTANGLE_STROKE][START] = () => {
      // 这里lastX和lastY存起始位置
      setPen({...pen, isDrawing:true, lastX: offsetX, lastY: offsetY})
    }
    drawMethods[RECTANGLE_STROKE][DURING] = () => {
      setShouldUpdate(true)
      setPath({
        ...path,
        type: penType,
        trail: {
          startX: lastX/width,
          startY: lastY/height,
          endX: offsetX/width,
          endY: offsetY/height,
        }
      })
      // drawRectangle(offsetX, offsetY)
    }
    drawMethods[RECTANGLE_STROKE][END] = () => {
      setShouldUpdate(true)
      setPath({
        ...path,
        type: penType,
        trail: {
          startX: lastX/width,
          startY: lastY/height,
          endX: offsetX/width,
          endY: offsetY/height,
        }
      })
    }

    // -----------按下鼠标 开启绘画模式--------------
    statusMethods[START] = () => {
      setPen({...pen, isDrawing: true})
      // 开始一条新的轨迹
      setPath({ type: PEN, trail:[] })
      // drawMethods
      if (drawMethods[penType][START]){
        drawMethods[penType][START]()        
      }
    }

    // ------------绘画过程中--------------
    statusMethods[DURING] = () => {
      if (!isDrawing) return
      // drawMethods
      if (drawMethods[penType][DURING]){
        drawMethods[penType][DURING]()        
      }
      // // 存储一个点的坐标；换算为比例 存储到数组里；左上角为坐标原点
      // setPath({
      //   type: penType,
      //   trail: [...path.trail, {xProportion: offsetX/width, yProportion: offsetY/height}]
      // })
      // draw(offsetX, offsetY)
    }

    //-------------鼠标离开或松开 关闭绘画模式---------------
    statusMethods[END] = () => {
      if (!isDrawing) return
      // drawMethods
      if (drawMethods[penType][END]){
        drawMethods[penType][END]()        
      }
      setPen({...pen, isDrawing: false, lastX: null, lastY: null})
      // 存储一整条轨迹
      setPaths([...paths, path])
      setPathHistory([[...paths, path], ...pathHistory])
      // 结束清轨迹
      setPath({ type: PEN, trail:[] })
    }
    statusMethods[status]()
  }

  return (
    <canvas className="main-canvas"
      ref={canvas} 
      width={width}
      height={height}
      onMouseDown={e => isInk && handleDraw(e, START)}
      onMouseMove={e => isInk && handleDraw(e, DURING)}
      onMouseUp={e => isInk && handleDraw(e, END)}
      onMouseLeave={e => isInk && handleDraw(e, END)}
    />
  )
}
export default MainCanvas