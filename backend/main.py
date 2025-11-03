#!/usr/bin/env python3
"""
DSP Photography API - Main Entry Point
Imports and runs the FastAPI app from server.py
"""
import os
import uvicorn
from server import app

# The FastAPI app is fully configured in server.py with all routes
# This file just runs it with uvicorn for local development

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    print(f"🚀 Starting DSP Photography API on 0.0.0.0:{port}")
    print(f"📁 Working directory: {os.getcwd()}")
    print(f"📁 Upload directory: {os.getenv('UPLOAD_DIR', 'backend/uploads')}")
    
    uvicorn.run(
        "server:app",  # Import string for hot reload
        host="0.0.0.0",
        port=port,
        reload=True
    )
