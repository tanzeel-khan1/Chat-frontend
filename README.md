# Chat App - Frontend

Real-time chat application built with React, Vite, and Tailwind CSS. Connects to the Node.js backend for auth, messaging, and Socket.IO live updates.

**Live demo:** https://chat-steel-eta.vercel.app

## Features


- User signup and login (JWT via HTTP-only cookies)
- One-to-one messaging
- Real-time messages (Socket.IO)
- Notifications: toast, browser alerts, unread badges, tab title count
- **Background push**: alerts when app/tab is closed (Web Push + Service Worker)
- Online / offline status
- Block and unblock users
- Delete messages
- Responsive UI (desktop + mobile)
- Dark theme

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI |
| Vite 7 | Build and dev server |
| Tailwind CSS 4 | Styling |
| Zustand | Chat state |
| Axios | REST API |
| Socket.IO Client | Real-time events |
| React Router | Routing |
| React Hook Form | Forms |
| React Hot Toast | Alerts |

## Project Structure

```
frontend/
  public/           Static assets
  src/
    components/     Login, Signup, Loading, BlockButton, etc.
    context/        Auth, Socket, message hooks
    home/           Chat layout (user list + chat panel)
    hooks/          Block, delete message
    lib/            api.js, notifications.js
    stateman/       Zustand store
    App.jsx
    main.jsx
  index.html
  vite.config.js
  package.json
```

## Prerequisites

- Node.js 18+ (recommended 20+)
- Running chat-backend (see ../chat-backend/README.md)

## Local Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Environment variables

Create `.env` in the frontend folder:

```env
VITE_API_URL=https://my-app1111.bonto.run
VITE_FRONTEND_URL=https://chat-steel-eta.vercel.app
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key
```

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend URL (no trailing slash). API + Socket.IO. |
| VITE_FRONTEND_URL | Production frontend (Vercel). |
| VITE_VAPID_PUBLIC_KEY | Same as backend `VAPID_PUBLIC_KEY`. |

Defaults are in `src/config/urls.js` (production URLs).

### 3. Start dev server

```bash
npm run dev
```

App runs at http://localhost:4001

Note: `vite.config.js` proxies `/api` to port 5002 by default. Set `VITE_API_URL` to your backend port or update the proxy target.

## Scripts

| Command | Description |
|---------|-------------|
| npm run dev | Development server (port 4001) |
| npm run build | Production build to dist/ |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

## Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Set environment variable:

```env
VITE_API_URL=https://my-app1111.bonto.run
VITE_FRONTEND_URL=https://chat-steel-eta.vercel.app
```

3. Deploy.
4. Backend `FRONTEND_URL` must match your Vercel URL.

## Browser & Background Notifications

1. Backend: run `node scripts/generate-vapid-keys.js` in `chat-backend`, add keys to `.env`, run `npm install web-push`.
2. Frontend: set `VITE_VAPID_PUBLIC_KEY` in `.env`.
3. User taps **Enable** in the sidebar (grants permission + registers push subscription).
4. When the receiver is **offline** (no Socket.IO connection), the server sends a Web Push — works even if the browser/app is closed.

HTTPS is required for push notifications. Local dev UI uses localhost; API/socket use production backend by default.

## Related

- Backend: ../chat-backend/README.md

## Author

Tanzeel
