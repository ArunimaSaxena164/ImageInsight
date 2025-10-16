from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import google.generativeai as genai
import pytesseract
from dotenv import load_dotenv
import os
import base64

load_dotenv()
app = FastAPI()
API_KEY = os.getenv("GEMINI_API_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=API_KEY)
MODEL_ID = "gemini-2.5-pro"  
#pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):
    try:
     
        upload_file = image
        image_bytes = await upload_file.read()
        pil_image = Image.open(io.BytesIO(image_bytes))

        image_base64 = base64.b64encode(image_bytes).decode("utf-8")
        mime_type = upload_file.content_type
        model = genai.GenerativeModel(MODEL_ID)
        prompt = "Describe the objects and scene in this image in detail."
        gemini_response = model.generate_content([ 
            {
                "inline_data": {
                    "mime_type": mime_type,
                    "data": image_base64
                }
            }, 
            prompt
        ])
        description = gemini_response.text or "No description generated."

        
        text = pytesseract.image_to_string(pil_image).strip() or "No text found."

        
        return {
            "description": description,
            "extracted_text": text
        }

    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}
