# 🚀 Portfolio & Project Showcase (MERN)

A **full-stack MERN application** to manage a **single developer profile** with projects, skills, work experience, and external links.  
It supports searching projects by title or skill, fetching project details, and adding new projects.

---

## 🏗️ Architecture

- **Frontend**: React (TailwindCSS for styling, React Router for navigation)
- **Backend**: Express.js (Node.js)
- **Database**: MongoDB (Mongoose ODM)
- **API Layer**: REST API with modular routes/controllers
- **Deployment**: 
  - Local via `npm run dev`
  - Production-ready with environment variables (`.env`)

---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
cd client && npm install   # if frontend is separate
```

### 3. Environment variables (.env)
Create .env file in root:
```
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=8000
```

### 4. Run locally
Backend:
```bash
npm run dev
```

Frontend (if separate):
```bash
cd client
npm start
```

### 5. Production build
Frontend:
```bash
cd client
npm run build
```

Serve with:
```bash
npm install -g serve
serve -s build
```

## 🗄️ Database Schema

### Profile Schema
```javascript
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String],
  techStack: [String],
});

const workSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
});

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,
  skills: [String],
  projects: [projectSchema],
  work: [workSchema],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
  },
});
```

## 📡 API Endpoints

### Profile Routes
- POST /profile → Create/Update profile
- GET /profile → Get profile
- GET /profile/projects?skill=React → Get projects by skill
- GET /profile/skills/top → Get top skills
- GET /profile/search?q=developer → Search profile
- GET /profile/projects/title?title=ChatApp → Get projects by title (multiple)
- GET /profile/project/:title → Get a single project by title
- POST /profile/projects → Add new project

## 🧪 Sample Usage (cURL)

### Create/Update Profile
```bash
curl -X POST http://localhost:8000/profile \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "education": "B.Tech CSE",
  "skills": ["React", "Node.js", "MongoDB"],
  "links": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe"
  }
}'
```

### Add Project
```bash
curl -X POST http://localhost:8000/profile/projects \
-H "Content-Type: application/json" \
-d '{
  "title": "ChatApp",
  "description": "A real-time chat application",
  "links": ["https://github.com/johndoe/chatapp"],
  "techStack": ["React", "Node.js", "Socket.io"]
}'
```

### Get Project by Title
```bash
curl http://localhost:8000/profile/project/ChatApp
```

## ⚠️ Known Limitations
- Currently supports only one profile (assumes single portfolio use-case).
- No authentication/authorization — anyone can modify the profile.
- Error handling is minimal (e.g., duplicate project titles not strictly prevented).
- Deployment config not included for Docker/CI/CD.

## 📌 Future Improvements
- Add authentication (JWT)
- Support multiple profiles
- Pagination for projects
- File uploads for project images
- GraphQL API support

---
