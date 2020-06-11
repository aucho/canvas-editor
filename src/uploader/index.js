import React from 'react'

export default function Uploader(props){

  const handleUpload = event=> {
    event.stopPropagation()
    const file = event.target.files
    console.log(file)
    if (file){
      props.handleImgUpload(file[0])
      console.log(file[0])
    }
  }
  return (
    <div className="uploader-container">
      <input type="file" capture='image/*' onChange={handleUpload}/>
    </div>
  )
}