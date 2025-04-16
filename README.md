# Offline Tools

This repository contains a monorepo for the Offline Tools project.

## Project Structure

- `landing/`: Landing page application built with Next.js
- `shared/`: Shared utilities and components used across the project

## Working with the Shared Package

The shared package contains common utilities that can be used across different applications in the monorepo.

### JSON Formatter

A utility for formatting JSON strings with different indentation options:
- 2 spaces (default)
- 4 spaces
- 1 tab
- Minified (no whitespace)

### Testing the Shared Package

To run tests for the shared package:

```bash
# Navigate to the shared directory
cd shared

# Run tests
pnpm test

# Run linting
pnpm lint

# Check TypeScript types
pnpm types:check

# Run all checks at once
pnpm lint && pnpm types:check && pnpm test
```

## Development

This project uses pnpm for package management. Do not use npm directly.

```bash
# Install dependencies
pnpm install

# Run development server for the landing page
cd landing
pnpm dev
```