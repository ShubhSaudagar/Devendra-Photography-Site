import os
import sys
from pathlib import Path

backend_dir = Path(__file__).parent / "backend"
os.chdir(backend_dir)
sys.path.insert(0, str(backend_dir))

if __name__ == "__main__":
    import uvicorn
    from server import app
    
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🚀 Starting DSP Photography API on {host}:{port}")
    print(f"📁 Working directory: {os.getcwd()}")
    print(f"📁 Upload directory: {os.getenv('UPLOAD_DIR', '/tmp/uploads')}")
    
    uvicorn.run(
        app,
        host=host,
        port=port,
        reload=False,
        log_level="info"
    )
