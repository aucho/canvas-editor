import React from 'react'
import { PEN_TYPE } from '../../utils/config'
import { ZoomIn, ZoomOut, Move, Pen, Text, Rectangle, Backward, Clear, Resize, Rotate } from '../../svg'
import './toolBar.css'
const { PEN, RECTANGLE_STROKE, TEXT } = PEN_TYPE

function ToolBar({setDraw, undo, clear, drag, zoom, resize, rotate}){
  const buttons = [
    {
      name: '拖拽',
      element: <Move style={{marginLeft: "4px"}}/>,
      method: drag,
    },
    {
      name: '画笔',
      element: <Pen />,
      method: () => setDraw(PEN),
    },
    {
      name: '文字',
      element: <Text />,
      method: () => setDraw(TEXT),
    },
    {
      name: '空心矩形',
      element: <Rectangle />,
      method: () => setDraw(RECTANGLE_STROKE),
    },
    {
      name: '自由变换',
      element: <Resize style={{fontSize: '1.2rem'}}/>,
      method: resize
    },
    {
      name: '回退',
      element: <Backward />,
      method: undo,
    },
    {
      name: '清除',
      element: <Clear />,
      method: clear,
    },
  ]

  const transButton = [
    {
      name: '旋转',
      element: <Rotate style={{fontSize: '1.1rem'}} />,
      method: rotate,
    },
    {
      name: '放大',
      element: <ZoomIn />,
      method: () => zoom(true), 
    },
    {
      name: '缩小',
      element: <ZoomOut />,
      method: () => zoom(false), 
    },
  ]

  return (
    <div className="tool-bar">
      {/* <button onClick={undo}>回退</button>
      <button onClick={clear}>清除</button>
      <button onClick={()=>setDraw(PEN)}>画笔</button>
      <button onClick={()=>setDraw(RECTANGLE_STROKE)}>矩形画笔</button>
      <button onClick={()=>setDraw(TEXT)}>文字</button>
      <button onClick={drag}>拖拽</button>
      <button onClick={resize}>自由变换</button>
      <button onClick={()=>zoom(true)}>放大</button>
      <button onClick={()=>zoom(false)}>缩小</button> */}
      <div className="draw-tool-area">
        {buttons.map(eachButton => (
          <div key={eachButton.name} onClick={eachButton.method} className="tool-button" title={eachButton.name}>
            <div className="mit-center">{eachButton.element}</div>
          </div>
        ))}
      </div>
      <div className="zoom-area">
        {transButton.map(eachButton => (
          <div key={eachButton.name} onClick={eachButton.method} className="tool-button" title={eachButton.name}>
            <div className="mit-center">{eachButton.element}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ToolBar