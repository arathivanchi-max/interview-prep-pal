# 🎯 Interview Prep Pal — Behavioral Interview Coach

A web application that helps job seekers practice and master behavioral interview questions across different categories. Built with React, TypeScript, and Supabase.

## About

Interview Prep Pal is a behavioral interview coaching tool designed to help you prepare for the most common (and trickiest) behavioral questions asked in job interviews. Browse questions organized by category, practice your responses, and track your progress — all in one place.

## Tech Stack

- **Frontend:** React 18 · TypeScript · Vite
- **Styling:** Tailwind CSS · shadcn/ui (Radix UI primitives)
- **State & Data:** TanStack React Query · React Hook Form · Zod
- **Routing:** React Router v6
- **Backend:** Supabase (auth, database, serverless functions)
- **Charts:** Recharts
- **Testing:** Vitest · React Testing Library · Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- A [Supabase](https://supabase.com) project with the required tables and configuration

### Installation

```bash
# Clone the repository
git clone https://github.com/arathivanchi-max/interview-prep-pal.git
cd interview-prep-pal

# Install dependencies
npm install
# or
bun install

# Set up environment variables
# Copy .env and fill in your Supabase credentials
cp .env .env.local
```

### Development

```bash
# Start the dev server
npm run dev

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint the codebase
npm run lint
```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
interview-prep-pal/
├── public/             # Static assets
├── src/                # Application source code
├── supabase/           # Supabase migrations and config
├── index.html          # Entry HTML
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind configuration
├── vitest.config.ts    # Unit test configuration
├── playwright.config.ts# E2E test configuration
└── package.json
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## License

This project is open source. See the repository for license details.
