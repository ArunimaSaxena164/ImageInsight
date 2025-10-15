import express from "express";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Multer configuration
const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;

    // Prepare form-data to send to FastAPI
    const form = new FormData();
    form.append("file", fs.createReadStream(imagePath));

    const response = await axios.post("http://127.0.0.1:8000/analyze", form, {
      headers: form.getHeaders(),
    });

    fs.unlinkSync(imagePath); // delete file after sending

    // Forward response to frontend
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
