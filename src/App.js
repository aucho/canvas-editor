import React, { useState, useEffect } from 'react';
import Canvas from './canvas'
import Uploader from './uploader';
import ToolBar from './toolBar'
import './App.css';

function App() {
  //===============================！！！此处改为false
  const [isImgUpload, setImgUpload] = useState(true) // 是否有图片上传
  const [imgFile, setImgFile] = useState()           // 存储图片文件
  const [imgBase64, setImgBase64] = useState()       // base64编码

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
  return (
    <div className="App">
      {
        isImgUpload?
        <>
          <ToolBar />
          <Canvas imgBase64={imgBase64} />
        </>
        : <Uploader handleImgUpload={imgUpload} />
      }
    </div>
  );
}

export default App;
