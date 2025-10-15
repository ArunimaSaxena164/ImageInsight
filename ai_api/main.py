from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import google.generativeai as genai
import pytesseract
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()
API_KEY = os.getenv("GEMINI_API_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=API_KEY)
MODEL_ID = "gemini-2.5-pro"  
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
     
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

       
        model = genai.GenerativeModel(MODEL_ID)
        prompt = "Describe the objects and scene in this image in detail."
        gemini_response = model.generate_content([prompt, image])
        description = gemini_response.text or "No description generated."

        
        text = pytesseract.image_to_string(image)
        text = text.strip() if text else "No text found."

        
        return {
            "description": description,
            "extracted_text": text
        }

    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}
