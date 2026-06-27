# NeonBet Casino — Virtual-Currency Prototype

A full-stack online casino prototype with provably-fair gaming, real-time multiplayer, and comprehensive admin tools. **Virtual currency only** — no real-money features.

## 🎮 Stack

### Backend
- **Node.js** + **Express** + **Socket.io** for real-time updates
- **better-sqlite3** for persistence
- **bcrypt** + **JWT** for authentication
- **HMAC-SHA256** provably-fair RNG (Node crypto)

### Frontend
- **React 18** + **Vite** (lightning-fast dev & build)
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Framer Motion** for animations
- **Socket.io client** for real-time chat & game updates

### Games
- **Slots**: 3-reel classic
- **Dice**: Adjustable house edge (1–95%)
- **Crash**: Real-time multiplier with live updates

### Features
- ✅ User registration & login (JWT)
- ✅ Real-time chat (Socket.io)
- ✅ Admin dashboard (user management, balance adjust, ban/unban)
- ✅ Audit logs for all actions
- ✅ Hourly jackpot cron job
- ✅ Provably-fair game verification
- ✅ Virtual currency (no payment gateway)

## 📦 Getting Started

### Prerequisites
- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **npm** or **yarn**

### Setup

1. **Clone & navigate:**
   ```bash
   git clone https://github.com/YOUR_USER/casino-proto.git
   cd casino-proto
   ```

2. **Run initial setup:**
   ```bash
   npm run setup
   ```
   This installs dependencies, runs migrations, and seeds the database.

3. **Start dev server:**
   ```bash
   npm run dev
   ```
   - **Backend**: http://localhost:3001 (REST + Socket.io)
   - **Frontend**: http://localhost:5173 (Vite dev server)

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run setup` | Install dependencies, migrate DB, seed data |
| `npm run dev` | Run backend + frontend (concurrent) |
| `npm run build` | Build frontend (Vite) |
| `npm test` | Run Jest unit tests (backend) |
| `npm run migrate` | Run database migrations |
| `npm run seed` | Seed database with test data |
| `npm run lint` | Lint backend code (eslint) |

## 🔐 Default Credentials

**Admin Account:**
- Username: `admin_arthur`
- Password: `AdminPass123!` (set in seed)

⚠️ Change immediately after first login!

## 📂 Project Structure

```
casino-proto/
├── backend/
│   ├── server.js           # Express + Socket.io entry
│   ├── routes/             # REST endpoints
│   ├── models/             # Database models (SQLite)
│   ├── middleware/         # Auth, validation
│   ├── games/              # Game logic (Slots, Dice, Crash)
│   ├── utils/              # Helpers (RNG, JWT, etc.)
│   ├── migrations/         # Database schema
│   └── tests/              # Jest unit tests
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page containers
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand store
│   │   ├── utils/          # Utilities
│   │   ├── styles/         # Tailwind + custom CSS
│   │   └── App.jsx         # Root component
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions (test, build, audit)
├── .gitignore
├── package.json            # Root (root scripts only)
└── README.md
```

## 🚀 Deployment

### Local Testing
1. `npm run setup` → full local environment
2. `npm run dev` → start both servers
3. Visit http://localhost:5173

### Replit / Cloud
1. Create a new Repl
2. Import from GitHub → select `casino-proto`
3. In shell: `npm run setup`
4. Click **Run** to start

### Production (Node.js host)
```bash
npm ci --only=production
npm run migrate
npm run build
node backend/server.js
```

Set `.env` variables:
```bash
NODE_ENV=production
JWT_SECRET=your-long-random-secret
DB_PATH=/data/prod.sqlite
PORT=3001
FRONTEND_URL=https://your-domain.com
```

## 🧪 Testing & CI

**CI Pipeline** (GitHub Actions on push/PR):
- ✅ Backend unit tests (Node 18, 20)
- ✅ Frontend build verification
- ✅ Security audit (npm audit)
- ✅ Smoke test (server health check)

Run locally:
```bash
npm test                # Backend tests + coverage
npm run build           # Frontend build (frontend/)
npm run lint            # ESLint
```

## 📖 API Documentation

### REST Endpoints
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Get JWT
- `GET /api/users/me` — Fetch profile
- `POST /api/games/play` — Play a game
- `GET /api/leaderboard` — Top players
- `GET /api/admin/users` — List users (admin only)
- `POST /api/admin/balance` — Adjust balance (admin only)

### Socket.io Events
- `join-chat` — Join chat room
- `send-message` — Broadcast message
- `crash-start` — Crash game begins
- `crash-tick` — Multiplier update
- `crash-bust` — Game over

## 🛠 Development

### Adding a New Game
1. Create `backend/games/MyGame.js`
2. Implement `play(userId, bet, seed)` → returns `{ result, payout, fair_hash }`
3. Register in `backend/routes/games.js`
4. Add UI component in `frontend/src/pages/MyGame.jsx`

### Database Migrations
1. Create `backend/migrations/00X_description.sql`
2. Run `npm run migrate`

### Styling
- Use **Tailwind CSS** utility classes in JSX
- Custom CSS in `frontend/src/styles/` (import in components)
- Dark/light mode via Zustand store (configured in Tailwind)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3001 in use | Change `PORT` in `.env` or kill process |
| Database locked | Delete `*.sqlite-wal`, `*.sqlite-shm` in `data/` |
| Frontend build fails | `rm -rf frontend/node_modules && npm ci` (in frontend/) |
| Tests timeout | Run `npm test -- --testTimeout=10000` |
| Socket.io connection fails | Check `FRONTEND_URL` in `.env` matches browser origin |

## 📝 Environment Variables

Create `.env` in project root:
```bash
# Server
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-here
DB_PATH=./data/casino.sqlite

# Frontend
FRONTEND_URL=http://localhost:5173

# Games
JACKPOT_SEED_AMOUNT=10000
JACKPOT_CONTRIBUTION_RATE=0.005

# Security
BCRYPT_ROUNDS=10
```

See `.env.example` for all options.

## 📜 License

MIT — See LICENSE file.

## 👨‍💻 Author

**Arthur Dean** — NeonBet Casino Prototype

---

**Questions?** Check issues or start a discussion in the repo!
