import React, { useState, useEffect } from 'react'
import { CONFIGS, POSITIONS, STATUS } from '../utils/config'
import Borders from './Borders'
import MainCanvas from './MainCanvas'
import Skectchpad from './Sketchpad'
import './canvas.css'

const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL, DEFAULT_CANVAS_OUTLINE } = CONFIGS
const { START, DURING, END, NO_RE } = STATUS
// 边缘位置数据处理 支持拖拽的八块区域
const borderPositions = []
for (let pos in POSITIONS){
  borderPositions.push(POSITIONS[pos])
}

function Canvas(props) {
  const [ pos, setpos ] = useState({}),   // 动作开始前的 鼠标初始位置
  [ height, setHeight ] = useState(DEFAULT_CANVAS_HEIGHT), // 高
  [ width, setWidth ] = useState(DEFAULT_CANVAS_WIDTH),    // 宽

  // imgPos = {
  //   moveable: [boolean]   可拖拽
  //   isMoving: [boolean],  是否在移动
  //   originTop:  [number], 初始容器相对页面上边距离
  //   originLeft: [number], 初始左边距
  //   top: [number],  当前容器相对页面上边距离
  //   left: [number], 当前左边距
  // }

<<<<<<< HEAD
  [ imgPos, setImgPos ] =useState({moveable:false, isMoving: false}),
=======
  [ imgPos, setImgPos ] =useState({moveable:false, isMoving: false, left:'100px',top:'100px'}),
>>>>>>> 155ebd235dc802ffea0c7ac7c3d3f20c44e1d0e7

  // resizeParam = {
  //   resizeable;:默认 true
  //   isResizing: 默认 false, 正在放大缩小
  //   originWidth: [number] 记录宽
  //   originHeight:[number] 记录高
  //   originTop:[number]    边距
  //   originLeft:[number]
  //   selectedBorderPos: POSITIONS.top, 拖拽的边
  // }
  [ resizeParam, setResizeParam ] =useState({isResizing: false, resizeable: true}),
  [ img, setImg ] = useState(new Image()),                 // 图片对象

  // paths = [
    // [{xProportion, yProportion},{}],  第一段轨迹 存储值为点坐标较画板比例
  //   []  第二段
  // ]
  [ paths, setPaths ] =useState([]),   // 所有绘画轨迹缓存
  
  { imgBase64 = DEFAULT_IMG_URL } = props,
  outline = DEFAULT_CANVAS_OUTLINE,    // 图像非占位边框宽度
  { left, top } = imgPos;      // 图像定位
  // 加载（更新）图片
  useEffect(()=>{
    if(img.src!==imgBase64){
      img.src = imgBase64
    // 图片加载完成（到内存）
      img.onload = function() {
        // 更新长宽
        setHeight(img.height)
        setWidth(img.width)
<<<<<<< HEAD
      }      
=======
      }
>>>>>>> 155ebd235dc802ffea0c7ac7c3d3f20c44e1d0e7
    }
  })

  // 重置大小 监听
  useEffect(()=>{
    if (resizeParam.resizeable){
      document.onmousemove= e => resize(e, DURING) 
      document.onmouseup= e => resize(e, END)      
    }
  })

  // 重置位置
  function rePosition(e, status){
    if (!imgPos.moveable) return
    e.preventDefault()
    switch (status) {
      case START:
        setpos({
          x: e.pageX,
          y: e.pageY,
        })
        setImgPos({
          ...imgPos,
          originLeft:e.target.offsetParent.offsetLeft,
          originTop:e.target.offsetParent.offsetTop,
          isMoving: true
        })
        break
      case END: 
        setImgPos({
          ...imgPos,
          isMoving: false
        })
        break
      case DURING:
        if (!resizeParam.isResizing && imgPos.isMoving){
          return setImgPos({
            ...imgPos,
            left: imgPos.originLeft + e.pageX - pos.x,
            top: imgPos.originTop + e.pageY-pos.y,
          })
        }break
      default: break
    }
  }

  // 拖拽重置大小
  function resize(e, status, positon = resizeParam.selectedBorderPos) {
    const { isResizing, originTop, originLeft, originWidth, originHeight } = resizeParam
    // 8个边缘位置点击以重置大小各自的方法
    const resizeMethods = {};
    // 右
    resizeMethods[POSITIONS.right] = e => { 
      setWidth(originWidth + e.pageX - pos.x)
      setImgPos({...imgPos})
    }
    // 下
    resizeMethods[POSITIONS.bottom] = e => { 
      setHeight(originHeight + e.pageY - pos.y)
      setImgPos({...imgPos})
     }
    // 上
    resizeMethods[POSITIONS.top] = e => { 
      setHeight(originHeight + pos.y - e.pageY)
      setImgPos({...imgPos, top: originTop + e.pageY - pos.y}) 
    }
    // 左
    resizeMethods[POSITIONS.left] = e => { 
      setWidth(originWidth + pos.x - e.pageX)
      setImgPos({...imgPos, left: originLeft + e.pageX - pos.x}) 
    }
    // 左上
    resizeMethods[POSITIONS.topLeft] = e => {
      setHeight(originHeight + pos.y - e.pageY)
      setWidth(originWidth + pos.x - e.pageX)
      setImgPos({...imgPos, left: originLeft + e.pageX - pos.x, top: originTop + e.pageY - pos.y}) 
    }
    // 右上
    resizeMethods[POSITIONS.topRight] = e => {
      setWidth(originWidth + e.pageX - pos.x)
      setHeight(originHeight + pos.y - e.pageY)
      setImgPos({...imgPos, top: originTop + e.pageY - pos.y}) 
    }
    // 左下
    resizeMethods[POSITIONS.bottomLeft] = e => {
      setWidth(originWidth + pos.x - e.pageX)
      setHeight(originHeight + e.pageY - pos.y)
      setImgPos({...imgPos, left: originLeft + e.pageX - pos.x}) 
    }
    // 右下
    resizeMethods[POSITIONS.bottomRight] = e => {
      setWidth(originWidth + e.pageX - pos.x)
      setHeight(originHeight + e.pageY - pos.y)
      setImgPos({...imgPos})
    }

    switch (status) {
      case START:
        console.log('start')
        setResizeParam({ 
          ...resizeParam,
          isResizing:true,
          selectedBorderPos:positon,
          originTop: e.target.offsetParent.offsetTop,
          originLeft: e.target.offsetParent.offsetLeft,
          originWidth: width,
          originHeight: height,
        })
        setpos({
          x: e.pageX,
          y: e.pageY,
        })
        setImgPos({
          top: e.offsetTop,
          left: e.offsetLeft,
        })
        break
      case END: setResizeParam({ ...resizeParam, isResizing:false})
      console.log('end')
        break
      case DURING:
        if (isResizing){
          console.log('during')
          resizeMethods[positon](e)
        }break
      default: return
    }
  }

  return (
    <div style={{width, height, left, top, padding:outline}}
      className="canvas-container"
      onMouseDown={e => imgPos.moveable && rePosition(e, START)}
      onMouseMove={e => imgPos.moveable && rePosition(e, DURING)}
      onMouseLeave={e => imgPos.moveable && rePosition(e, END)}
      onMouseUp={e => imgPos.moveable && rePosition(e, END)}>
      <MainCanvas img={img} width={width} height={height} paths={paths} setPaths={setPaths}/>
      {/* 拖拽处 */}
      {borderPositions.map(pos => {
        return <Borders key={pos}
                imgWidth={width} 
                imgHeight={height} 
                pos={pos}
                resize={resize}/>
      })}
    </div>
  )
}
export default Canvas