# Portfolio Website

A full-stack portfolio website built with React (frontend) and Express.js (backend).

## Features

- Admin dashboard for content management
- Project showcase
- About section
- Responsive design
- RESTful API

## Tech Stack

### Frontend
- React
- TypeScript
- Modern CSS

### Backend
- Node.js
- Express.js
- TypeScript
- RESTful API

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
- Create a `.env` file in the backend directory
- Add necessary environment variables (see `.env.example`)

4. Start the development servers
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm run dev
```

## Project Structure

```
portfolio/
├── backend/           # Express.js backend
│   ├── src/          # Source files
│   ├── uploads/      # File uploads
│   └── package.json
├── frontend/         # React frontend
│   ├── src/         # Source files
│   └── package.json
└── README.md
```

## License

MIT 