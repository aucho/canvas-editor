const http = require('http')
const fs = require('fs')

http
.createServer((req,res)=>{
  console.log(req.url)
  res.setHeader('Access-Control-Allow-Origin','*')
  res.end('this is a test')
})
.listen(10086, ()=>console.log('link start'))