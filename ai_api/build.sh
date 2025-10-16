#!/usr/bin/env bash
set -o errexit

sudo apt-get update && sudo apt-get install -y tesseract-ocr


pip install -r requirements.txt
