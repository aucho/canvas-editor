function throttle(fn, timeGap=500, showWarn=false){
  let timer = Date.now()
  return function(param) {
    if (showWarn) console.warn(`${Date.now()-timer}ms since last operation`)
    if (Date.now()-timer>timeGap){
      fn(param)
      timer = Date.now()
    }
  }
}

function deepCopy(obj){
  return JSON.parse(JSON.stringify(obj))
}
/**
 * 
 * @param {*} a 传三条边长 求前两条边夹角角度
 */
function calcAngle(a, b, c){
  const angle = (a*a + b*b - c*c) / 2*a*b
  return Math.acos(angle)
}

/**
 * 传两点坐标求边长
 */
function calEdge(x1, y1, x2, y2){
  return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2))
}

export {
  throttle,
  deepCopy,
  calcAngle,
  calEdge,
}