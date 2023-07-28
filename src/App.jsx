import { useState } from 'react'
import './App.css'
import Spinner from './Spinner/Spinner';
import { saveAs } from 'file-saver';

function App() {
  const [image, setImage] = useState(null);
  const [dataRm, setDataRm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  // console.log(data);

  const removeHandler = async () => {
    setLoading(true);
    const apiKey = 'DmqvQeCEo6ocm5edDQLHpDSg';
    const url = 'https://api.remove.bg/v1.0/removebg'

    const formData = new FormData();

    formData.append('image_file', image, image.name);
    formData.append("size", "auto");

    fetch(url, {
      method: "POST",
      headers: {
        'X-Api-Key': apiKey
      },
      body: formData
    }).then((res) => res.blob()).then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => setDataRm(reader.result)
      reader.readAsDataURL(blob);
      setLoading(false);
    }).catch((err) => {
      setErr(true);
      console.log(err);
    })
  }

  const imgUploadHandler = (event) => {
    setErr(false);
    event.preventDefault();
    setImage(event.target.files[0]);
  }

  const downloadHandler = () => {
    saveAs(dataRm, "image-bg-removed");
  }

  return (
    <div className="App">
      <div>
        <h1 className='heading'>
          Remove image background
        </h1>
        <h3 style={{ color: "white", fontWeight:"bold" }}>*Use only jpg/png images to Avoid any errors</h3>
      </div>
      <div>
        <label className="custom-file-upload">
          Upload
          <input type='file' onChange={imgUploadHandler} />
        </label>
        {image && <p style={{ color: "white" }}>Image Uploaded✅</p>}

        {image && <div className='btn'>
          <button onClick={removeHandler}>Remove Background</button>
        </div>}
      </div>
      {loading && <Spinner />}
      {err && <h2 style={{ color: "red" }}>Only jpg/png files are allowed</h2>}
      <div>
        {dataRm && <button style={{ padding: "5px 40px", marginTop:"20px" }} onClick={downloadHandler}>📥</button>}
      </div>
      {dataRm && <img src={dataRm} alt='background removed image' />}
    </div>
  )
}

export default App
