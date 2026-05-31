# Arabic Academy API — Cloudflare Workers Backend

A serverless backend API for the Arabic Academy learning app. Built with Cloudflare Workers and KV storage.

## Architecture

```
┌──────────────────┐     ┌─────────────────────────┐     ┌──────────────┐
│  Frontend (Vite) │────▶│  Cloudflare Worker API  │────▶│  KV Storage  │
└──────────────────┘     └─────────────────────────┘     └──────────────┘
         │                          │
         │                          ▼
         │               ┌──────────────────────┐
         └──────────────▶│   Firebase Auth      │
                         └──────────────────────┘
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/telegram` | Authenticate Telegram Mini App user |
| `GET` | `/api/user/:uid/progress` | Get user progress data |
| `PUT` | `/api/user/:uid/progress` | Save/update user progress |
| `DELETE` | `/api/user/:uid` | Delete all user data |
| `GET` | `/api/health` | Health check |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)
- A Cloudflare account with Workers enabled
- A Firebase project with Authentication enabled
- A Telegram Bot (for Mini App auth)

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Wrangler

Edit `wrangler.toml` and replace placeholder values:

```toml
[[kv_namespaces]]
binding = "USERS_KV"
id = "your-actual-kv-namespace-id"
preview_id = "your-preview-kv-namespace-id"
```

Create the KV namespace:

```bash
wrangler kv:namespace create "USERS_KV"
wrangler kv:namespace create "USERS_KV" --preview
```

### 3. Set Secrets

Configure secrets for production (never commit these):

```bash
# Telegram Bot Token
wrangler secret put TELEGRAM_BOT_TOKEN

# Firebase Configuration
wrangler secret put FIREBASE_PROJECT_ID
wrangler secret put FIREBASE_SERVICE_ACCOUNT_EMAIL
wrangler secret put FIREBASE_SERVICE_ACCOUNT_KEY
```

**Note:** `FIREBASE_SERVICE_ACCOUNT_KEY` should be the Base64-encoded PKCS8 private key from your Firebase service account JSON file.

To convert the private key:

```bash
# Extract from service account JSON and base64 encode
cat service-account.json | jq -r '.private_key' | \
  openssl pkcs8 -topk8 -nocrypt -inform PEM -outform DER | \
  base64 -w0
```

### 4. Local Development

```bash
# Start local dev server (uses .dev.vars for secrets)
npm run dev
```

Create a `.dev.vars` file for local development:

```
TELEGRAM_BOT_TOKEN=your-bot-token
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_SERVICE_ACCOUNT_KEY=base64-encoded-private-key
```

### 5. Deploy

```bash
npm run deploy
```

## Authentication Flow

### Browser (Email/Google)

1. User signs in via Firebase Auth (email/password or Google)
2. Frontend gets Firebase ID token
3. API requests include `Authorization: Bearer <firebase-id-token>`
4. Backend verifies token with Firebase public keys

### Telegram Mini App

1. User opens app inside Telegram
2. Frontend detects Telegram environment, sends `initData` to backend
3. Backend validates `initData` HMAC-SHA256 signature using bot token
4. Backend creates Firebase custom token for the Telegram user
5. Frontend signs into Firebase with the custom token
6. Subsequent API calls use Firebase ID token (same as browser flow)

## Data Model (KV)

```
Key: user:{uid}:progress
Value: {
  "uid": "string",
  "lessonsCompleted": [...],
  "currentLesson": 1,
  "xp": 0,
  "streak": 0,
  "vocabulary": [...],
  "lastSyncedAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}

Key: user:{uid}:profile
Value: {
  "uid": "string",
  "telegramId": 123456,
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "lastLogin": "ISO-8601"
}
```

## Security

- All progress endpoints require valid Firebase ID tokens
- Telegram initData is validated using HMAC-SHA256 with bot token
- Users can only access/modify their own data (UID matching)
- Auth tokens expire after 5 minutes (Telegram) / 1 hour (Firebase)
- KV data expires after 90 days of inactivity
- CORS headers restrict cross-origin access

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `TELEGRAM_BOT_TOKEN not configured` | Run `wrangler secret put TELEGRAM_BOT_TOKEN` |
| `Firebase service account not configured` | Set all 3 Firebase secrets |
| `Token expired` | Ensure server time is correct; check token age |
| `KV not found` | Create KV namespace and update `wrangler.toml` IDs |
| CORS errors | Verify the Worker is deployed and URL is correct in `.env` |

## License

Private — Arabic Academy Project
