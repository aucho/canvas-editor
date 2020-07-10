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

export {
  throttle
}