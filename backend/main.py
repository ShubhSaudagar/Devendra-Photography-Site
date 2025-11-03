    # main.py
    import os
    import uvicorn
    from server import app  # existing FastAPI app from server.py

    # Include auth router (if present)
    try:
        from auth import router as auth_router
        app.include_router(auth_router, prefix="/api/admin/auth")
        print("Auth router included: /api/admin/auth")
    except Exception as e:
        print("Auth router NOT included:", e)

    # Small startup log for upload dir (helps Render logs)
    UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/tmp/uploads")
    print(f"✅ Upload directory active at: {UPLOAD_DIR}")

    if __name__ == "__main__":
        uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
