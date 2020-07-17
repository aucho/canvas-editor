import React, { useState, useEffect, useCallback } from 'react'
// import Borders from './Borders'
import { CONFIGS, STATUS, PEN_TYPE, POSITIONS } from '../utils/config'
import { throttle, deepCopy } from '../utils'
import './canvas.css'


const { PEN, RECTANGLE_STROKE, TEXT } = PEN_TYPE
const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL } = CONFIGS

function MainCanvas(props) {
  const [drawImg, setDrawImg] = useState({})
  const [ctx, setCtx] = useState()
  const [path, setPath] = useState({ type: PEN, trail:[] }) //存储一条轨迹上的点
  const [inputParams, setInputParams] = useState([])
  const [addInput, setAddInput] = useState(false)
  // const [inputParams, setInputParams] = useState({ 
  //   maxWidth: '600px', 
  //   height: 'auto',
  //   left:0, 
  //   top:0, 
  //   display: 'none',
  //   inputContent: ''
  // })
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
    setIsInk,
  } = props

  const { START, DURING, END, NO_RE } = STATUS
  const canvas = React.createRef()
  const input = React.createRef()

  // // 边缘位置数据处理 支持拖拽的八块区域
  // const borderPositions = []
  // for (let pos in POSITIONS){
  //   borderPositions.push(POSITIONS[pos])
  // }

  // 初始化样式方法
  const initStyle = useCallback(() => {
    const { rgb, fontSize, fontFamily } = pen
    ctx.fillStyle = rgb
    ctx.strokeStyle = rgb
    ctx.font = `${fontSize}px ${fontFamily}`
  },[ctx, pen])

  // canvas更新
  const updateCanvas = useCallback(() => {
    ctx.drawImage(img, 0, 0, width, height)
    // 画布更新后 重新绘制缓存的轨迹
    setInputParams([])
    let tempInputParams = []
    if (paths.length > 0){
      ctx.fillStyle = pen.rgb
      paths.forEach(path => {
        const { type, trail } = path
        const reDraw = {}
        // 定义每种绘制方式的 旧轨迹 在每次更新时的 重新绘制的方法
        // 刷子
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
        // 矩形框
        reDraw[RECTANGLE_STROKE] = () => {
          const { startX, startY, endX, endY } = path.trail
          ctx.beginPath()
          ctx.strokeRect(startX*width, startY*height, (endX-startX)*width, (endY-startY)*height)
        }
        // 文字
        reDraw[TEXT] = () => {
          console.log('exe')
          const { left, top } = path.trail
          tempInputParams.push({
            ...path.trail,
            left: left * width,
            top: top * height,
          })
          // ctx.fillText = () => {
          //   initStyle()
          //   ctx.beginPath()
          //   // ctx.moveTo(x, y)
          //   ctx.fillText(inputContent, left, top, maxWidth)
          // }
        }
        // execute
        initStyle()
        reDraw[type]()
      })
      setInputParams(tempInputParams)
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

  // useEffect(()=>{
  //   if (inputParams.isInputMove){
  //     canvas.current.onMouseMove = e => handleDraw(e, DURING)
  //     canvas.current.onMouseUp = e => handleDraw(e, END)
  //     canvas.current.onMouseLeave = e => handleDraw(e, END)
  //   }
  // })

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

  // function drawText(x, y){
  //   const { inputContent, left, top, maxWidth } = inputParams
  //   initStyle()
  //   ctx.beginPath()
  //   // ctx.moveTo(x, y)
  //   ctx.fillText(inputContent, left, top, parseInt(maxWidth))
  // }

  // 处理鼠标事件
  function handleDraw(e, status, isInputMove = false){
    const { isDrawing, penType, lastX, lastY } = pen
    // 鼠标点位计算
    const offsetX = e.pageX-(e.target.parentElement.offsetLeft)  //居中样式打开还需要 -1/2*width
    const offsetY = e.pageY-(e.target.parentElement.offsetTop)   //
    const statusMethods = {}
    // 定义不同绘制方式在 不同的阶段执行的操作
    const drawMethods = {
      [PEN]:{},
      [RECTANGLE_STROKE]:{},
      [TEXT]: {},
    }
    // pen指哪儿画哪儿
    drawMethods[PEN][DURING] = () => {
      // 存储一个点的坐标；换算为比例 存储到数组里；左上角为坐标原点
      setPath({
        type: penType,
        trail: [...path.trail, {xProportion: offsetX/width, yProportion: offsetY/height}],
        pen: deepCopy(pen)
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
        },
        pen: deepCopy(pen)
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
        },
        pen: deepCopy(pen),
      })
    }
    // 添加文本
    drawMethods[TEXT][START] = () => {
      const inputParam = {
        id: inputParams.length,
        top: offsetY,
        left: offsetX,
        padding: '1px 2px',
        height: 'auto',
        inputContent: '',
        contentEditable: true,
        border: '1px dashed #555',
        cursor: 'text'
      }
      inputParams.push(inputParam)
      setInputParams(deepCopy(inputParams))
      setIsInk(false)
      setPen({...pen, isDrawing: false})
      // if(isInputMove){
      //   setInputParams({
      //     ...inputParams,
      //     originLeft: e.pageX,
      //     originTop: e.pageY,
      //     isInputMove,
      //   })
      //   return
      // }
      // if (inputParams.display === 'none'){
      //   setInputParams({
      //     ...inputParams,
      //     left: offsetX,
      //     top: offsetY,
      //     display: 'inline',
      //     inputContent: '',
      //   })        
      // } 
      // else {
      //   if (inputParams.inputContent){
      //     drawText(offsetX, offsetY)
      //     setPath({
      //       ...path,
      //       type: penType,
      //       trail: inputParams
      //     })          
      //   }
      //   setInputParams({
      //     inputParams,
      //     display: 'none',
      //   })
      // }
    }
    // drawMethods[TEXT][DURING] = () => {
    //   console.log('a')
    //   if (!inputParams.isInputMove) return
    //   console.log(e.pageX-inputParams.originLeft)
    //   setInputParams({
    //     ...inputParams,
    //     left: inputParams.left + e.pageX - inputParams.originLeft,
    //     top: inputParams.top + e.pageY - inputParams.originTop,
    //   })
    // }
    // drawMethods[TEXT][END] = () => {
    //   if(inputParams.isInputMove) return
    //   setInputParams({
    //     ...inputParams,
    //     isInputMove: false,
    //   })
    // }

    // -----------按下鼠标 开启绘画模式--------------
    statusMethods[START] = () => {
      setPen({...pen, isDrawing: true})
      // 开始一条新的轨迹
      setPath({ type: PEN, trail:[], pen, })
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
      // 没有轨迹的话就不存
      if (!path||!path.trail||path.trail.length<=0)
        return
      // 存储一整条轨迹
      setPaths([...paths, path])
      setPathHistory([[...paths, path], ...pathHistory])
      // 结束清轨迹
      setPath({ type: PEN, trail:[], pen, })
    }
    statusMethods[status]()
  }

  // 处理Input移动
  // 需要计入缓存的时刻  输入结束（取消焦点blur）移动结束（END）
  function handleInputBehavior(e, self, index, status){
    e.stopPropagation()
    const { inputContent, left, top, originX, originY, originTop, originLeft } = self[index]
    const inputMethods = []
    let path = {}
    inputMethods['input'] = () => {
      self[index] = {
        ...self[index],
        inputContent: e.target.innerText
      }
    }
    inputMethods['blur'] = () => {
      if (!inputContent){
        self.splice(index, 1)
        return
      }
      self[index] = {
        ...self[index], 
        border: 'none',
        contentEditable: false,
        userSelect: 'none',
        cursor: 'grab',
        padding: '2px 3px',
      }
      path = {
        type: TEXT,
        trail: deepCopy({
          ...self[index],
          left: left/width,
          top: top/height,
        }),
        pen: deepCopy(pen),
      }
    }
    inputMethods['doubleClick'] = () => {
      self[index] = {
        ...self[index],
        contentEditable: true,
        cursor: 'text',
        border: '1px dashed #555',
        padding: '1px 2px'
      }
    }
    inputMethods[START] = () => {
      self[index] = {
        ...self[index],
        cursor: 'grabbing',
        isMoving: true,
        originLeft: left,
        originTop: top,
        originX: e.pageX, 
        originY: e.pageY,
      }
    }
    inputMethods[DURING] = () => {
      self[index] = {
        ...self[index],
        left: originLeft + (e.pageX - originX), 
        top: originTop + (e.pageY - originY),
      }
    }
    inputMethods[END] = () => {
      self[index] = {
        ...self[index],
        cursor: 'grab',
        isMoving: false,
      }
      if((left/width).toFixed(5) === (paths[0].trail.left).toFixed(5) && 
        (top/height).toFixed(5) === (paths[0].trail.top).toFixed(5))
        return
      path = {
        type: TEXT,
        trail: deepCopy({
          ...self[index],
          left: left/width,
          top: top/height,
        }),
        pen: deepCopy(pen),
      }
    }
    // 执行 
    inputMethods[status]()
    setInputParams(deepCopy(self))
    // 没有轨迹的话就不存
    if (!path||!path.trail||path.trail.length<=0)
      return
    // 轨迹
    setPath(path)
    // 存储一整条轨迹 如果文字已经出现过 就改原来的
    let flag = true;
    paths.forEach((eachPath, index, self) => {
      if (eachPath.type ===TEXT && eachPath.trail.id===path.trail.id){
        self[index] = path
        flag = false
      }
    })
    if (flag){
      setPaths([...paths, path])
    }
    // history
    setPathHistory([[...paths, path], ...pathHistory])
    // 结束清轨迹
    setPath({ type: PEN, trail:[], pen, })
  }

  
  return (
    <>
      <canvas className="main-canvas"
        ref={canvas} 
        width={width}
        height={height}
        onMouseDown={e => isInk && handleDraw(e, START)}
        onMouseMove={e => isInk && handleDraw(e, DURING)}
        onMouseUp={e => isInk && handleDraw(e, END)}
        onMouseLeave={e => isInk && handleDraw(e, END)}
      />
      {
        inputParams.map((inputParam,index,self) => {
          return <div
            key={inputParam.id+''}
            className="canvas-text-input"
            ref={input} 
            contentEditable={inputParam.contentEditable}
            suppressContentEditableWarning
            onInput={e => handleInputBehavior(e, self, index, 'input')}
            onBlur ={e => handleInputBehavior(e, self, index, 'blur')}
            onMouseDown={e => !inputParam.contentEditable &&
                          handleInputBehavior(e, self, index, START)}
            onMouseMove={e => inputParam.isMoving && 
                          handleInputBehavior(e, self, index, DURING)}
            onMouseUp={e => inputParam.isMoving &&
                          handleInputBehavior(e, self, index, END)}
            onMouseLeave={e => inputParam.isMoving &&
                          handleInputBehavior(e, self, index, END)}
            onDoubleClick={e => !inputParam.contentEditable &&
                           handleInputBehavior(e, self, index, 'doubleClick')}
            // onInput={e => {console.log( e.target.innerText )}}
            style={{
              ...inputParam,
              fontSize: pen.fontSize,
              fontFamily: pen.fontFamily,
              color: pen.rgb
            }}/>
        })
      }
    </>
  )
}
export default MainCanvas