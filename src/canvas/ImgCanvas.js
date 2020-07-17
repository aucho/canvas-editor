import React, { useState, useEffect, useCallback } from 'react'
// import Borders from './Borders'
import { CONFIGS, STATUS, PEN_TYPE, POSITIONS } from '../utils/config'
import './canvas.css'

const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL } = CONFIGS

function ImgCanvas(props) {
  const [drawImg, setDrawImg] = useState({})
  const [ctx, setCtx] = useState()

  const { 
    img = DEFAULT_IMG_URL, 
    height=DEFAULT_CANVAS_HEIGHT, 
    width=DEFAULT_CANVAS_WIDTH,
    shouldUpdate,
    setShouldUpdate,
  } = props

  const canvas = React.createRef()

  useEffect(()=>{
    // getcontext  获取canvas绘制接口
    setCtx(canvas.current.getContext('2d'))
  },[canvas, ctx])

  useEffect(()=>{
    // 更新后 绘制图片
    if (ctx && (drawImg.width!==width||drawImg.height!==height||shouldUpdate)){
      ctx.drawImage(img, 0, 0, width, height)
      setShouldUpdate(false)
    }
    setDrawImg({width,height})
  },[ctx, width, height, img, shouldUpdate, drawImg.width, drawImg.height, setShouldUpdate])
    
  return (
    <canvas className="img-canvas"
      style={{zIndex: -1}}
      ref={canvas} 
      width={width}
      height={height}
    />
  )
}
export default ImgCanvas