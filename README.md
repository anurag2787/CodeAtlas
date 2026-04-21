# CodeAtlas

> Transform any GitHub repository into an interactive learning experience.

**Live Demo:** Coming Soon

## Features

- 🗂️ **Repository Visualization** - Interactive D3.js graph showing file structure and relationships
- 🤖 **AI-Powered Explanations** - Get explanations for any file using Gemini AI (with ELI5 mode for beginners)
- 📚 **Learning Path Generation** - AI generates personalized learning paths for any codebase
- 📊 **Progress Tracking** - Track your learning progress with interactive checklists and XP system
- ⚡ **Gamification** - Earn XP, complete challenges, and maintain streaks
- 🔥 **Trending Repos** - Discover trending repositories from the week
- 📝 **Repo History** - Quick access to recently explored repositories
- 💬 **AI Chat** - Ask questions about the codebase with AI assistance

## Tech Stack

- **Frontend:** TypeScript, Vite, D3.js
- **AI:** Google Gemini API (via Cloudflare Worker)
- **APIs:** GitHub REST API, OSS Insight API

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js)
- Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/anurag2787/CodeAtlas
cd CodeAtlas

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## Environment Variables

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3000
```

### Backend (.env)

```
GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

```
CodeAtlas/
├── src/
│   ├── main.ts              # Main application entry point
│   ├── style.css            # Base/global styles
│   ├── app.css              # Component-specific styles
│   ├── components/          # Reusable UI components
│   │   ├── FileTree.ts      # File tree visualization
│   │   ├── Graph.ts         # D3.js repository graph
│   │   └── index.ts
│   ├── services/            # API services
│   │   ├── gemini.ts        # Gemini AI integration
│   │   ├── github.ts        # GitHub API client
│   │   └── index.ts
│   ├── state/               # Application state management
│   └── types/               # TypeScript type definitions
├── backend/                 # Node.js backend (routes & challenges)
│   ├── src/
│   │   ├── index.js         # Express server
│   │   ├── lib/gemini.js    # Gemini integration
│   │   └── routes/          # API endpoints
│   └── package.json
├── public/                  # Static assets
├── dist/                    # Production build output
├── index.html               # HTML entry point
├── package.json             # Root dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md
```