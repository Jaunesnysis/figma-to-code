# Figma to Code

Convert UI screenshots into clean, production-ready React + Tailwind components using Claude AI.

## Demo

> Upload any UI screenshot → get a live preview + copyable React component in seconds.

## Features

- Upload or drag & drop any UI screenshot
- AI-powered code generation via Claude API
- Syntax highlighted code output
- Live interactive component preview
- Copy to clipboard

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (claude-sonnet-4-6)
- **Deployment**: Vercel

## Getting Started

1. Clone the repo

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/figma-to-code.git
cd figma-to-code
\`\`\`

2. Install dependencies

\`\`\`bash
npm install
\`\`\`

3. Add your API key — create a `.env.local` file:

\`\`\`
ANTHROPIC_API_KEY=your_key_here
\`\`\`

4. Run the dev server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. User uploads a screenshot of any UI design
2. Image is sent to Claude's vision API with a carefully engineered prompt
3. Claude returns a self-contained React + Tailwind component
4. The app renders it live in a sandboxed iframe
5. User can copy the code and drop it straight into their project

## Environment Variables

| Variable            | Description                                       |
| ------------------- | ------------------------------------------------- |
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com |
