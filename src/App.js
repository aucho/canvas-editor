import React, { useState, useEffect } from 'react';
import Canvas from './canvas'
import Uploader from './uploader';
import './App.css';

function App() {
  //===============================！！！此处改为false
  const [isImgUpload, setImgUpload] = useState(true) // 是否有图片上传
  const [imgFile, setImgFile] = useState()           // 存储图片文件
  const [imgBase64, setImgBase64] = useState()       // base64编码
  const [cursor, setCursor] = useState()             // 鼠标图案

  useEffect(() => {
    const reader = new FileReader()
    if (imgFile){
      reader.readAsDataURL(imgFile)
      reader.onload = e =>{ 
        setImgBase64(e.target.result)
      }
    }
  })
  
  const imgUpload = file => {
    setImgFile(file)
    setImgUpload(true)
  }

  const changeCursor = cursor => {
    setCursor(cursor)
  }

  return (
    <div className="App" style={{cursor}}>
      {
        isImgUpload?
          <Canvas imgBase64={imgBase64} changeCursor={changeCursor}/>
        : <Uploader handleImgUpload={imgUpload} />
      }
    </div>
  );
}

export default App;
