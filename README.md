# OfflineTools

OfflineTools is an all-in-one developer toolbox providing essential utilities for developers that work completely offline. It includes a web version (offlinetools.org) and a cross-platform desktop application for macOS, Windows, and Linux.

## Overview

OfflineTools aims to provide developers with a suite of commonly used tools that can be accessed offline, eliminating the need for online services when handling potentially sensitive data. The project focuses on performance, privacy, and a modern user interface.

## Download

- **macOS (Apple Silicon)**: [OfflineTools_arm64.dmg](https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/OfflineTools_arm64.dmg)
- **macOS (Intel)**: [OfflineTools_x64.dmg](https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/OfflineTools_x64.dmg)
- **Windows**: [OfflineTools.exe](https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/OfflineTools.exe)
- **Linux**: [OfflineTools_x86_64.AppImage](https://github.com/IgorShadurin/offlinetools.org/releases/latest/download/OfflineTools_x86_64.AppImage)

## Project Architecture

The project follows a monorepo structure with the following main directories:

- `landing/`: Next.js website (offlinetools.org)
- `shared/`: TypeScript library containing core tool functionality
- `desktop/`: Electron-based desktop application

## Features

OfflineTools currently includes the following utilities:

### JSON Formatter
- Format and validate JSON with customizable indentation options
- Support for 2 spaces, 4 spaces, tab, and minified output
- Error validation and highlighting

### Base64 Codec
- Encode and decode text to/from Base64
- URL-safe mode support (replacing + with - and / with _)
- UTF-8 text handling

### Binary Base64 Codec
- Encode and decode binary data to/from Base64
- Support for file uploads and downloads
- URL-safe mode support

### URL Encoder/Decoder
- Encode and decode URL components
- Support for different encoding standards
- Visual component breakdown

### Text Hash Generator
- Generate cryptographic hashes from text input
- Support for multiple algorithms: MD5, SHA-1, SHA-224, SHA-256, SHA3-256
- Option for uppercase or lowercase output

### File Hash Compare
- Calculate and compare file hashes
- Support for multiple algorithms
- Useful for file integrity verification

## Technology Stack

### Landing Page (Web Version)
- **Framework**: Next.js 15.3.0
- **UI Library**: React 19.0.0 with Shadcn UI components
- **Styling**: Tailwind CSS v4
- **Form Handling**: React Hook Form and Zod validation
- **Analytics**: Vercel Analytics

### Shared Library
- **Language**: TypeScript 5
- **Testing**: Jest with ts-jest
- **Crypto Libraries**: js-md5, js-sha1, js-sha256, js-sha3

### Desktop Application
- **Framework**: Electron 35
- **UI**: React 18.3.1 with Tailwind CSS
- **Build System**: Vite 6.3.1
- **Testing**: Vitest and Playwright
- **Auto-update**: electron-updater

## Development

The project uses pnpm for package management. Do not use npm directly.

```bash
# Install dependencies
pnpm install

# Run tests for shared package
cd shared
pnpm test
pnpm lint
pnpm types:check

# Run development server for the landing page
cd landing
pnpm dev

# Build and run the desktop application
cd desktop
pnpm dev
```

### Testing

The shared package includes comprehensive unit tests for all utilities. Tests are written using Jest and TypeScript. The desktop application includes end-to-end tests using Playwright.

To run all checks:
```bash
pnpm lint && pnpm types:check && pnpm test
```

### Building for Production

#### Web Application
```bash
cd landing
pnpm build
```

#### Desktop Application
```bash
cd desktop
pnpm build
```
This will generate platform-specific installers in the `desktop/release` directory.

## Project Structure Details

### Shared Package

The shared package provides core functionality that is used by both the web and desktop applications. Each tool is implemented in its own directory with corresponding tests:

```
shared/
├── src/
│   ├── json-formatter/
│   ├── base64-codec/
│   ├── binary-base64-codec/
│   ├── url-encoder/
│   ├── text-hash-generator/
│   ├── file-hash-compare/
│   └── index.ts
├── package.json
├── tsconfig.json
└── jest.config.ts
```

### Landing Page

The landing page follows Next.js's App Router structure:

```
landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── tools/
│   │   ├── json-formatter/
│   │   ├── base64-codec/
│   │   ├── binary-base64-codec/
│   │   ├── url-encoder/
│   │   ├── text-hash-generator/
│   │   ├── file-hash-compare/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── ...
├── components/
├── public/
└── ...
```

### Desktop Application

The desktop application is built with Electron and follows a standard structure:

```
desktop/
├── electron/
│   ├── main/
│   ├── preload/
│   └── electron-env.d.ts
├── src/
├── dist/
├── dist-electron/
└── ...
```

## UI/UX Principles

- Mobile-first responsive design
- Dark and light mode support
- Accessible components following WCAG guidelines
- Consistent UI patterns across all tools
- Optimized for both desktop and mobile devices
