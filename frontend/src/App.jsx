// import React, { useState, useRef } from "react";
// import axios from "axios";
// import "./style.css";

// function App() {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//     setDescription("");
//     setExtractedText("");
//     setError("");
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setDescription("");
//     setExtractedText("");
//     setError("");
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // reset input
//     }
//   };

//   const handleAnalyze = async () => {
//     if (!image) {
//       setError("Please upload an image first!");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await axios.post("http://localhost:5000/analyze", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setDescription(res.data.description || "No description found.");
//       setExtractedText(res.data.extracted_text || "No text found.");
//     } catch (err) {
//       console.error(err);
//       setError("Error analyzing image.");
//       setDescription("");
//       setExtractedText("");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">AI Image Analyzer</h1>

//       <div className="upload-box">
//         <label htmlFor="fileInput" className="custom-file-button">
//           {image ? "Change Image" : "Choose Image"}
//         </label>
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           ref={fileInputRef}
//           style={{ display: "none" }}
//         />

//         {image && (
//           <button onClick={handleRemoveImage}>
//             &times; Remove Image
//           </button>
//         )}

//         <button onClick={handleAnalyze} disabled={loading}>
//           {loading ? "Analyzing..." : "Show Result"}
//         </button>
//       </div>

//       {error && <div className="error">{error}</div>}

//       {image && (
//         <div className="preview">
//           <img src={URL.createObjectURL(image)} alt="Preview" />
//         </div>
//       )}

//       {(description || extractedText) && (
//         <div className="result-box">
//           {description && (
//             <>
//               <h3>Image Description:</h3>
//               <p>{description}</p>
//             </>
//           )}
//           {extractedText && (
//             <>
//               <h3>Extracted Text:</h3>
//               <p>{extractedText}</p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./style.css";

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setDescription("");
    setExtractedText("");
    setError("");
  };

  const handleRemoveImage = () => {
    setImage(null);
    setDescription("");
    setExtractedText("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset input
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError("Please upload an image first!");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDescription(res.data.description || "No description found.");
      setExtractedText(res.data.extracted_text || "No text found.");
    } catch (err) {
      console.error(err);
      setError("Error analyzing image.");
      setDescription("");
      setExtractedText("");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">AI Image Analyzer</h1>

      <div className="upload-box">
        <label htmlFor="fileInput" className="custom-file-button">
          {image ? "Change Image" : "Choose Image"}
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        {image && (
          <button onClick={handleRemoveImage}>
            &times; Remove Image
          </button>
        )}

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Show Result"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {image && (
        <div className="preview">
          <img src={URL.createObjectURL(image)} alt="Preview" />
        </div>
      )}

      {(description || extractedText) && (
        <div className="result-box">
          {description && (
            <div className="card">
              <h3>Image Description:</h3>
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
          {extractedText && (
            <div className="card">
              <h3>Extracted Text:</h3>
              <p>{extractedText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
