import "./App.css";
import { useState, useEffect, useRef } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const clickTimeoutRef = useRef(null);

  const imagesListRef = ref(storage, "images/");


  const uploadFile = () => {
    clearTimeout(clickTimeoutRef.current);

    clickTimeoutRef.current = setInterval(() => {
      setIsButtonClicked(true); 
    }, 2000);

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        console.log(url);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      
      {isButtonClicked && (
        <div className="message">Uploaded Successfully!</div>
      )}

      <div className="image-grid">
      {imageUrls.map((url) => {
        return <img className="image" src={url} alt="This is a File" />;
      })}
      </div>

    </div>
  );
}

export default App;


