#!/usr/bin/env bash
set -e

echo "Updating packages and installing Tesseract..."
apt-get update
apt-get install -y tesseract-ocr
echo "Tesseract installed successfully."
