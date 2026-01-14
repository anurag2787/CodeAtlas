# CodeAtlas

> Transform any GitHub repository into an interactive learning experience.

**Live Demo:** Comming Soon

## Features

- **Repository Visualization** - Interactive D3.js graph showing file structure and relationships
- **AI-Powered Explanations** - Get explanations for any file using Gemini AI (with ELI5 mode)
- **Learning Path Generation** - AI generates personalized learning paths for any codebase
- **Progress Tracking** - Track your learning progress with interactive checklists
- **Trending Repos** - Discover trending repositories from the week
- **Repo History** - Quick access to recently explored repositories

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
git clone https://github.com/mutaician/repox.git
cd repox

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## Environment Variables

### Frontend (.env)

```
VITE_WORKER_URL=https://your-worker.workers.dev
```


## Project Structure

```
repox/
├── src/
│   ├── main.ts           # Main application entry
│   ├── style.css         # Base/global styles
│   ├── app.css           # Component styles
│   ├── components/       # UI components (FileTree, Graph)
│   ├── services/         # API services (GitHub, Gemini)
│   ├── state/            # State management
│   └── types/            # TypeScript type definitions              # Cloudflare Worker (Gemini API proxy)
├── public/               # Static assets
├── dist/                 # Production build output
├── index.html            # HTML entry point
└── package.json
```

---