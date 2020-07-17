import React, { useEffect } from 'react'
import { POSITIONS, CONFIGS, STATUS } from '../utils/config'
const { DEFAULT_CANVAS_OUTLINE } = CONFIGS
const { START, DURING, END } = STATUS

function Borders(props) {
  const { pos, imgWidth, imgHeight, outline=DEFAULT_CANVAS_OUTLINE, resize, style } = props
  const positions = {}
  positions[POSITIONS.top]    = { width: imgWidth, height:outline, top:0, left:outline, cursor: 'n-resize'}
  positions[POSITIONS.right]  = { width: outline, height:imgHeight,top:outline, right:0, cursor: 'e-resize'}
  positions[POSITIONS.bottom] = { width: imgWidth, height:outline, bottom:0, left:outline, cursor: 's-resize'}
  positions[POSITIONS.left]   = { width: outline, height:imgHeight, top:outline, left:0, cursor: 'w-resize'}
  positions[POSITIONS.topLeft] = { width: outline*1.5, height:outline*1.5, top:-0.5*outline, left: -0.5*outline, cursor: 'nw-resize',}
  positions[POSITIONS.topRight] = { width: outline*1.5, height:outline*1.5, top:-0.5*outline, right: -0.5*outline, cursor: 'ne-resize'}
  positions[POSITIONS.bottomLeft]  = { width: outline*1.5, height:outline*1.5, bottom:-0.5*outline, left:-0.5*outline, cursor: 'sw-resize'}
  positions[POSITIONS.bottomRight] = { width: outline*1.5, height:outline*1.5, bottom:-0.5*outline, right:-0.5*outline, cursor: 'se-resize'}

  return (
    <div className="canvas-border" 
      style={{...positions[pos], ...style}}
      onMouseDown={e => {e.stopPropagation();resize(e, START, pos)} }/>
  )
}

export default Borders