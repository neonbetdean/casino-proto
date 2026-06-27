#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  NeonBet Casino — Git Init + Initial Commit Script
#  Run once from the project root:  bash git-init.sh
#  Optional: pass a GitHub remote URL as first arg to push immediately
#    bash git-init.sh https://github.com/YOUR_USER/casino-proto.git
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'
YELLOW='\033[1;33m'; BOLD='\033[1m'; NC='\033[0m'

info()    { echo -e "${CYAN}[info]${NC}  $*"; }
success() { echo -e "${GREEN}[ok]${NC}    $*"; }
warn()    { echo -e "${YELLOW}[warn]${NC}  $*"; }
error()   { echo -e "${RED}[error]${NC} $*" >&2; exit 1; }
header()  { echo -e "\n${BOLD}${CYAN}── $* ──────────────────────────────────────────────${NC}"; }

[[ -f "package.json" ]] || error "Run this script from the casino-proto project root."

REMOTE_URL="${1:-}"

# ─────────────────────────────────────────────────────────────────────────────
header "1 / 5  Environment checks"
# ─────────────────────────────────────────────────────────────────────────────

command -v git  >/dev/null 2>&1 || error "git is not installed."
command -v node >/dev/null 2>&1 || error "node is not installed."

success "$(git --version)"
success "node $(node --version)"

# ─────────────────────────────────────���───────────────────────────────────────
header "2 / 5  Git identity check"
# ─────────────────────────────────────────────────────────────────────────────

GIT_NAME=$(git config --global user.name  2>/dev/null || true)
GIT_EMAIL=$(git config --global user.email 2>/dev/null || true)

if [[ -z "$GIT_NAME" || -z "$GIT_EMAIL" ]]; then
  warn "Global git identity not set. Configuring for this repo only..."
  read -rp "  Your name  (e.g. Arthur Dean):   " INPUT_NAME
  read -rp "  Your email (e.g. you@domain.com): " INPUT_EMAIL
  [[ -z "$INPUT_NAME"  ]] && error "Name cannot be empty."
  [[ -z "$INPUT_EMAIL" ]] && error "Email cannot be empty."
  git config user.name  "$INPUT_NAME"
  git config user.email "$INPUT_EMAIL"
  success "Identity set (local repo only): $INPUT_NAME <$INPUT_EMAIL>"
else
  success "Using global identity: $GIT_NAME <$GIT_EMAIL>"
fi

# ─────────────────────────────────────────────────────────────────────────────
header "3 / 5  Initialise repository"
# ─────────────────────────────────────────────────────────────────────────────

if [[ -d ".git" ]]; then
  warn ".git directory already exists — skipping git init."
else
  git init
  git branch -M main
  success "Initialised empty Git repository (branch: main)"
fi

# ─────────────────────────────────────────────────────────────────────────────
header "4 / 5  Stage & commit"
# ─────────────────────────────────────────────────────────────────────────────

[[ -f ".env" ]] && warn ".env detected — it will NOT be committed (excluded by .gitignore)."

git add .

echo ""
info "Files to be committed:"
git diff --cached --name-only | sed 's/^/    /'
echo ""

git commit -m "feat: initial NeonBet Casino prototype

Virtual-currency-only online casino prototype.

Stack:
- Backend:  Node.js · Express · Socket.io · better-sqlite3
- Frontend: React 18 · Vite · Tailwind CSS · Zustand · Framer Motion
- Auth:     bcrypt · JWT
- Games:    Slots (3-reel), Dice (adjustable house edge), Crash (realtime)
- RNG:      Provably-fair HMAC-SHA256 (Node crypto)
- Realtime: Socket.io chat · Crash live updates · Hourly jackpot cron
- Admin:    User management · balance adjust · ban/unban · audit logs

Default admin: admin_arthur
No real-money features — virtual currency only."

success "Initial commit created."
echo ""
git log --oneline -1
echo ""

# ─────────────────────────────────────────────────────────────────────────────
header "5 / 5  Remote setup (optional)"
# ─────────────────────────────────────────────────────────────────────────────

if [[ -n "$REMOTE_URL" ]]; then
  info "Adding remote: $REMOTE_URL"
  git remote add origin "$REMOTE_URL" 2>/dev/null \
    || git remote set-url origin "$REMOTE_URL"
  info "Pushing to origin/main..."
  git push -u origin main
  success "Pushed to $REMOTE_URL"
else
  warn "No remote URL provided. To push to GitHub later, run:"
  echo ""
  echo -e "    ${BOLD}git remote add origin https://github.com/YOUR_USER/casino-proto.git${NC}"
  echo -e "    ${BOLD}git push -u origin main${NC}"
  echo ""
  info "Or re-run this script with the URL as the first argument:"
  echo -e "    ${BOLD}bash git-init.sh https://github.com/YOUR_USER/casino-proto.git${NC}"
fi

echo ""
echo -e "${GREEN}${BOLD}✅  Done! Your repo is ready.${NC}"
echo ""
echo -e "  ${CYAN}Next steps:${NC}"
echo -e "  1. Create repo at ${BOLD}https://github.com/new${NC}  (name: casino-proto, Private, no README)"
echo -e "  2. Push:    ${BOLD}bash git-init.sh https://github.com/YOUR_USER/casino-proto.git${NC}"
echo -e "  3. Replit:  New Repl → Import from GitHub → select casino-proto"
echo -e "  4. Shell:   ${BOLD}npm run setup${NC}"
echo ""
