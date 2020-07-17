import React, { useState, useEffect } from 'react'
import { CONFIGS, POSITIONS, STATUS, PEN_TYPE, ACTION_TYPE, COLORS } from '../utils/config'
import ToolBar from './toolBar'
import Borders from './Borders'
import MainCanvas from './MainCanvas'
import ImgCanvas from './ImgCanvas'
import './canvas.css'

const { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DEFAULT_IMG_URL, DEFAULT_CANVAS_OUTLINE } = CONFIGS
const { START, DURING, END } = STATUS
const { PEN, RECTANGLE_STROKE, TEXT } = PEN_TYPE
const { MOVE, PAINT, RESIZE } = ACTION_TYPE
const { BLACK } = COLORS
// 边缘位置数据处理 支持拖拽的八块区域
const borderPositions = []
for (let pos in POSITIONS){
  borderPositions.push(POSITIONS[pos])
}

function Canvas(props) {
  const [ pos, setpos ] = useState({x:null, y: null}),     // 动作开始前的 鼠标初始位置
  [ isInk, setIsInk ] = useState(false),
  [ height, setHeight ] = useState(DEFAULT_CANVAS_HEIGHT), // 高
  [ width, setWidth ] = useState(DEFAULT_CANVAS_WIDTH),    // 宽
  [ rotateAngle, setRotateAngle ] = useState(0), // 旋转角度
  // 绘制参数
  [pen, setPen] = useState({
    radius: 3,     //笔大小
    fontSize: 18,
    fontFamily: 'microsoft YaHei',
    rgb: BLACK,
    x: 0,          //记录当前点和上一个点的坐标值
    y: 0,
    lastX: null,
    lastY: null,
    isDrawing: false,
    penType: PEN,
  }),
  // imgPos = {
  //   moveable: [boolean]   可拖拽
  //   isMoving: [boolean],  是否在移动
  //   originTop:  [number], 初始容器相对页面上边de距离
  //   originLeft: [number], 初始左边距
  //   top: [number],  当前容器相对页面上边距离
  //   left: [number], 当前左边距
  // }
  [ shouldUpdate, setShouldUpdate ] = useState(false),
  [ imgPos, setImgPos ] =useState({
    moveable:true, 
    isMoving: false, 
    left:'249px',
    top:'100px'
  }),

  // resizeParam = {
  //   resizeable;:默认 true
  //   isResizing: 默认 false, 正在放大缩小
  //   originWidth: [number] 记录宽
  //   originHeight:[number] 记录高
  //   originTop:[number]    边距
  //   originLeft:[number]
  //   selectedBorderPos: POSITIONS.top, 拖拽的边
  // }
  [ resizeParam, setResizeParam ] =useState({isResizing: false, isRotating: false }),
  [ resizeable, setResizeable ] = useState(false),
  // zoomIndex= 7,
  // zoomSizeArray = [];  // 存一下当前的 缩放比例数组中 取值的位置
  [ zoomParam, setZoomParam ] = useState({zoomIndex: 7, zoomSizeArray: []}),

  [ img ] = useState(new Image()),        // 图片对象

  // paths = [
  // {
  //   trail: [{xProportion, yProportion},{}],   // 画笔轨迹 存储值为点坐标与画板长宽的比值
  //   trail: {startX,startY,endX,endY}          // 矩形轨迹 存左上角的点和右下角的点
  //   type: PEN | RECTANGEL_STROKE | TEXT,      // 存储的绘画类型
  // },           
  //   []  第二段
  // ]
  [ paths, setPaths ] = useState([]),             // 所有绘画轨迹缓存

  [ pathHistory, setPathHistory ] = useState([]), // 轨迹改变时存轨迹的历史状态

  [ action, setAction] = useState(MOVE),            // 按钮选取状态
  
  // 存图像缩放后尺寸序列
  zoomRatioRange = [0.1, 0.25, 0.33, 0.5, 0.66, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 2, 2.5, 3, 4, 5],
  outline = DEFAULT_CANVAS_OUTLINE,               // 图像非占位边框宽度
  { imgBase64 = DEFAULT_IMG_URL, changeCursor } = props,        // Base64图
  { left, top } = imgPos;                         // 图像定位

  // 加载（更新）图片
  useEffect(() => {
    if(img.src!==imgBase64){
      img.src = imgBase64
    // 图片加载完成（到内存）
      img.onload = function() {
        // 更新长宽
        setHeight(img.height)
        setWidth(img.width)
        setZoomSizeArray(img.width, img.height)
      }
    }
  })

  // 自由变化 监听
  useEffect(() => {
    if (resizeable){
      // 表示旋转开始
      document.onmousedown = e => {
        !imgPos.isMoving && resize(e, 'rotateStart')
      }
      // 长宽变换
      document.onmousemove= e => resizeable && resize(e, DURING)
      document.onmouseup= e => resizeable && resize(e, END)
    }
  })

  // 滚动监听 暂时搁置
  // useEffect(()=>{
  //   // window.removeEventListener('mousewheel',handleScroll, { passive: false })
  //   // window.addEventListener('mousewheel', handleScroll, { passive: false })
  //   // 火狐
  //   // window.addEventListener('DOMMouseScroll', e=>console.log(e))
  // },[zoomParam])

  // 该函数需在width和height初始化更新以及拖拽更新时执行
  // 更新所有缩放比例下的宽高
  function setZoomSizeArray(width, height){
    const
      { zoomIndex } = zoomParam,
      oriWidth = width/zoomRatioRange[zoomIndex],
      oriHeight = height/zoomRatioRange[zoomIndex],
      zoomSizeArray = zoomRatioRange.map(ratio => {
        return {
          width: ratio*oriWidth,
          height: ratio*oriHeight,
        }
      })
    setZoomParam({
      ...zoomParam,
      zoomSizeArray,
    })
  }

  // // 当轨迹paths 改变时 触发更新
  // useEffect(() => {
  //   setPathHistory([paths, ...pathHistory])
  // },[paths])

  // 重置位置功能
  function rePosition(e, status){
    if (!imgPos.moveable) return
    e.stopPropagation()
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
        imgPos.isMoving = true
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

  // 旋转
  function rotate(e, status){
    if (!status){
      setRotateAngle((rotateAngle+90)%360)
    }
  }

  // 拖拽重置大小
  function resize(e, status, positon = resizeParam.selectedBorderPos) {
    if (!resizeable){
      return
    }
    const { isResizing, originTop, originAngle, originLeft, originWidth, originHeight, isRotating } = resizeParam
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
        resizeParam.isResizing = true
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
          top: e.target.offsetParent.offsetTop,
          left: e.target.offsetParent.offsetLeft,
        })
        break
        case 'rotateStart':
          if(imgPos.isMoving||resizeParam.isResizing)
            return
          setResizeParam({
            ...resizeParam,
            isRotating: true,
            isResizing: false,
            originAngle: rotateAngle,
          })
          
          setpos({
            x: e.pageX,
            y: e.pageY,
          })
          break
        case DURING:
          if(imgPos.isMoving)
            return
          if (isResizing){
            resizeMethods[positon](e)
          }
          else if (isRotating){
            const canvasMidCoord = { x: parseFloat(left)+width/2, y: parseFloat(top) +height/2 }
            const anglePre = pos.x-canvasMidCoord.x<0 ? 
                              Math.atan((pos.y - canvasMidCoord.y) / (pos.x - canvasMidCoord.x)):
                              Math.atan((pos.y - canvasMidCoord.y) / (pos.x - canvasMidCoord.x)) + Math.PI
            const angleNow = e.pageX-canvasMidCoord.x<0 ? 
                              Math.atan((e.pageY - canvasMidCoord.y) / (e.pageX - canvasMidCoord.x)):
                              Math.atan((e.pageY - canvasMidCoord.y) / (e.pageX - canvasMidCoord.x)) + Math.PI
            const newAngle = originAngle + (angleNow-anglePre)/(Math.PI*2)*360
            setRotateAngle(newAngle)
          }
          break
        case END:
          setResizeParam({ ...resizeParam, originAngle:null, isResizing:false, isRotating: false})
          setZoomSizeArray(width, height)
          break
      default: return
    }
  }

  // 回退功能
  function undo() {
    // let newPaths = JSON.parse(JSON.stringify(paths))
    const newPaths = pathHistory[1] || []
    setPaths(newPaths)
    // 用于触发canvas更新 需修改
    setShouldUpdate(true)
    // 回退历史
    pathHistory.shift();
    setPathHistory(pathHistory)
    // setImg({...setImg})
  }

  // 清除功能
  function clear(e) {
    if (paths.length<=0){
      return
    }
    setPaths([])
    setShouldUpdate(true)
    setPathHistory([[], ...pathHistory])
  }

  // 画笔功能
  function setDraw(penType) {
    setIsInk(true);
    setImgPos({...imgPos, moveable: false})
    setPen({
      ...pen,
      penType,
    })
    setAction(PAINT)
    setResizeable(false)
  }
  // 换色
  function setPenStyle(style) {
    setPen({
      ...pen,
      ...style
    })
  }

  // 拖拽
  function setDrag() {
    setIsInk(false);
    setImgPos({...imgPos, moveable: true})
    setResizeable(false)
    setAction(MOVE)
  }
  // 拖拽放大缩小
  function setResize() {
    setIsInk(false)
    // changeCursor(`url('curve.png')`)
    setResizeable(true)
    setAction(RESIZE)
  }
  // 放大缩小
  function zoom(isEnlarge) {
    let { zoomIndex, zoomSizeArray } = zoomParam
    if (!zoomSizeArray||zoomSizeArray.length<=0){
      return
    }
    if ((!isEnlarge && zoomIndex<=0)
      ||(isEnlarge && zoomIndex>=zoomSizeArray.length-1)){
      return
    }
    isEnlarge? zoomIndex++:zoomIndex--
    setWidth(zoomParam.zoomSizeArray[zoomIndex].width)
    setHeight(zoomParam.zoomSizeArray[zoomIndex].height)
    setZoomParam({...zoomParam, zoomIndex})
  }

  return (
    <>
    <div className="background-layer"/>
    <div style={{width, height, left, top, padding:outline, transform: `rotate(${rotateAngle}deg)`}}
      className="canvas-container"
      onMouseDown = {e => imgPos.moveable && rePosition(e, START)}
      onMouseMove = {e => imgPos.moveable && rePosition(e, DURING)}
      onMouseLeave= {e => imgPos.moveable && rePosition(e, END)}
      onMouseUp   = {e => imgPos.moveable && rePosition(e, END)}>
      <ImgCanvas
        img={img}
        width={width}
        height={height}
        shouldUpdate={shouldUpdate}
        setShouldUpdate={setShouldUpdate} />
      <MainCanvas
        // img={img}
        width={width}
        height={height}
        paths={paths}
        isInk={isInk}
        setIsInk={setIsInk}
        setPaths={setPaths}
        pathHistory={pathHistory}
        shouldUpdate={shouldUpdate}
        setShouldUpdate={setShouldUpdate}
        setPathHistory={setPathHistory}
        pen={pen}
        setPen={setPen}/>
      {/* 拖拽处 */}
      {resizeable &&
      borderPositions.map(pos => {
        return <Borders key={pos}
                  imgWidth={width}
                  imgHeight={height}
                  pos={pos}
                  resize={resize}
                  style={{ backgroundColor: "#99f", opacity: 0.7}}/>
      })}
    </div>
    <ToolBar
      pen = {pen}
      isInk = {isInk}
      zoom = {zoom}
      undo = {undo}
      clear= {clear}
      drag = {setDrag}
      rotate = {rotate}
      setDraw= {setDraw}
      setPen = {setPenStyle}
      resize = {setResize}
      action = {action}
      />
    </>
  )
}
export default Canvas