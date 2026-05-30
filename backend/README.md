# Arab Academy Backend (Cloudflare Workers)

Serverless API that handles:
- **Telegram Mini App authentication** — validates `initData` and issues Firebase custom tokens
- **User progress sync** — stores/retrieves app state from KV storage
- **Firebase token verification** — protects API endpoints

## Setup

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Create a KV namespace:
   ```bash
   wrangler kv:namespace create "USERS_KV"
   ```
   Copy the `id` into `wrangler.toml`.

4. Set secrets:
   ```bash
   wrangler secret put FIREBASE_PROJECT_ID
   wrangler secret put TELEGRAM_BOT_TOKEN
   wrangler secret put FIREBASE_SERVICE_ACCOUNT_KEY
   ```

5. Deploy:
   ```bash
   npm run deploy
   ```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/telegram` | None | Validate TG initData, return Firebase custom token |
| GET | `/api/user/:uid/progress` | Bearer | Fetch user progress |
| PUT | `/api/user/:uid/progress` | Bearer | Save user progress |
| DELETE | `/api/user/:uid` | Bearer | Delete user data |
| GET | `/api/health` | None | Health check |

## Telegram Bot Setup

1. Create a bot with [@BotFather](https://t.me/BotFather)
2. Enable "Web App" and set the URL to your deployed frontend
3. Set the bot token as a Cloudflare secret
4. Users open the bot → click "O'rganish" → Mini App loads → auto-authenticated
