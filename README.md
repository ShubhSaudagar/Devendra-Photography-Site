# DSP Film's - Photography Portfolio Website

Full-stack photography portfolio and business management platform for professional photographer Devendra S. Shinde.

## 🌟 Features

- **Public Portfolio Website**: Showcase photography services, packages, and testimonials
- **Admin Panel**: Comprehensive content management system
- **AI Integration**: Content generation with Groq/Gemini AI
- **MongoDB Database**: Scalable data storage
- **File Upload System**: Image and media management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Glass-morphism UI**: Modern, cinematic design aesthetics

## 🏗️ Tech Stack

### Backend
- **FastAPI** (Python 3.11.9) - High-performance API framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Uvicorn/Gunicorn** - ASGI server
- **Bcrypt** - Password hashing
- **Python-Jose** - JWT handling

### Frontend  
- **React 18** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client

### Database
- **MongoDB Atlas** - Cloud database

## 🚀 Deployment

### Replit (Current)
The project is configured to run on Replit with:
- Backend on port 8000
- Environment variables managed via Replit Secrets

**To run:**
```bash
python3 main.py
```

### Render (Backend)
The backend is configured for Render deployment using:
- `gunicorn` with uvicorn workers
- `render.yaml` configuration
- Python 3.11.9 runtime

**Build Command:**
```bash
pip install -r backend/requirements.txt
```

**Start Command:**
```bash
gunicorn -c backend/gunicorn.conf.py backend.server:app
```

### Vercel (Frontend)
The React frontend can be deployed to Vercel:
- Build directory: `frontend/build`
- Install command: `yarn install`
- Build command: `yarn build`

## ⚙️ Environment Variables

Required environment variables (set in Replit Secrets or `.env` file):

```
MONGO_URL=your_mongodb_connection_string
DB_NAME=dsp_photography
FRONTEND_URL=your_frontend_url
GROQ_API_KEY=your_groq_api_key (optional)
GEMINI_API_KEY=your_gemini_api_key (optional)
EMERGENCY_RESET_KEY=your_emergency_reset_key
JWT_SECRET=your_jwt_secret
PORT=8000
HOST=0.0.0.0
```

See `backend/.env.example` for complete template.

## 📦 Installation

### Backend Setup

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Configure environment variables (see above)

3. Run the server:
```bash
cd ..
python3 main.py
```

### Frontend Setup

1. Install Node dependencies:
```bash
cd frontend
yarn install
```

2. Configure environment:
```bash
# Create frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8000
```

3. Run development server:
```bash
yarn start
```

## 🔐 Admin Panel

See [README_ADMIN.md](README_ADMIN.md) for complete admin panel documentation.

## 📁 Project Structure

```
├── backend/              # FastAPI backend
│   ├── server.py        # Main API application
│   ├── auth.py          # Authentication logic
│   ├── ai_service.py    # AI integration
│   ├── models.py        # Data models
│   ├── requirements.txt # Python dependencies
│   └── uploads/         # File uploads directory
├── frontend/            # React frontend
│   ├── public/          # Static assets
│   ├── src/             # Source code
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.js       # Main app component
│   └── package.json     # Node dependencies
├── main.py              # Entry point for backend
├── runtime.txt          # Python version specification
├── Procfile             # Process file for deployment
└── replit.md            # Technical documentation
```

## 🔧 Development

### Running Locally

1. Start backend:
```bash
python3 main.py
```

2. Start frontend (in another terminal):
```bash
cd frontend
yarn start
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Testing

```bash
cd backend
pytest
```

## 📝 License

Private repository for Devendra S. Shinde Photography

## 📞 Contact

For questions or support, contact the development team.
