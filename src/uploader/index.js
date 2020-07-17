import React from 'react'

export default function Uploader(props){

  const handleUpload = event=> {
    event.stopPropagation()
    const file = event.target.files
    if (file&&file.length>0){
      props.handleImgUpload(file[0])
    }
  }
  return (
    <div className="uploader-container">
      <input type="file" accept='image/*' onChange={handleUpload} />
    </div>
  )
}