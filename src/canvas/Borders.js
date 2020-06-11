import React, { useEffect } from 'react'
import { POSITIONS, CONFIGS, STATUS } from '../utils/config'
const { DEFAULT_CANVAS_OUTLINE } = CONFIGS
const { START, DURING, END } = STATUS

function Borders(props) {
  const { pos, imgWidth, imgHeight, outline=DEFAULT_CANVAS_OUTLINE, resize } = props
  const positions = {}
  positions[POSITIONS.top]    = { width: imgWidth, height:outline, top:0, left:0, cursor: 'n-resize'}
  positions[POSITIONS.right]  = { width: outline, height:imgHeight,top:0, right:0, cursor: 'e-resize'}
  positions[POSITIONS.bottom] = { width: imgWidth, height:outline, bottom:0, left:0, cursor: 's-resize'}
  positions[POSITIONS.left]   = { width: outline, height:imgHeight, top:0, left:0, cursor: 'w-resize'}
  positions[POSITIONS.topLeft] = { width: outline, height:outline, top:0, left: 0, cursor: 'nw-resize'}
  positions[POSITIONS.topRight] = { width: outline, height:outline, top:0, right: 0, cursor: 'ne-resize'}
  positions[POSITIONS.bottomLeft]  = { width: outline, height:outline, bottom:0, left:0, cursor: 'sw-resize'}
  positions[POSITIONS.bottomRight] = { width: outline, height:outline, bottom:0, right:0, cursor: 'se-resize'}

  return (
    <div className="canvas-border" 
      style={positions[pos]}
      onMouseDown={e=>resize(e, START, pos) }/>
  )
}

export default Borders