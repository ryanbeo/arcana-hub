# Deploy Arcana Backend On Linux

This backend can run on a small Linux server with only Python 3, `systemd`, and Nginx.

## What This Backend Needs

- Python 3
- Port for the app itself, default `8000`
- A reverse proxy such as Nginx for public access and HTTPS
- Optional `GEMINI_API_KEY` if you want AI-generated readings

Data is stored locally in `app.db` in the backend folder, so back that file up if the server matters.

## Important Limitation For Backend-Only Hosting

Your frontend currently calls a remote backend URL directly from the browser. That works for guest reads because the app sends a `client_id`, but account login sessions are not fully set up for cross-site cookie auth.

If you host only the backend on `fullhouse.chickenkiller.com` and keep the frontend on another domain:

- Guest mode should work
- Login/signup session cookies may not work reliably without frontend changes

If you want login/signup later, the cleanest path is:

- host frontend and backend on the same site, or
- update the frontend fetch calls to use `credentials: "include"` and update the backend cookie/CORS policy for cross-site cookies over HTTPS

## Suggested Server Layout

Use a simple path like:

```text
/opt/arcana-hub/apps/daily-arcana/backend
```

## Server Setup

Install packages:

```bash
sudo apt update
sudo apt install -y python3 nginx certbot python3-certbot-nginx
```

Copy the backend to the server:

```bash
ssh -p 2246 ryan@fullhouse.chickenkiller.com
sudo mkdir -p /opt/arcana-hub/apps/daily-arcana
sudo chown -R ryan:ryan /opt/arcana-hub
exit

rsync -avz -e "ssh -p 2246" \
  /path/to/arcana-hub/apps/daily-arcana/backend/ \
  ryan@fullhouse.chickenkiller.com:/opt/arcana-hub/apps/daily-arcana/backend/
```

Create the environment file:

```bash
cp /opt/arcana-hub/apps/daily-arcana/backend/deploy/arcana-backend.env.example \
  /opt/arcana-hub/apps/daily-arcana/backend/.env

nano /opt/arcana-hub/apps/daily-arcana/backend/.env
```

Recommended `.env` values:

```dotenv
HOST=127.0.0.1
PORT=8000
ALLOWED_ORIGIN=https://your-frontend-domain.com
```

If you want Gemini:

```dotenv
GEMINI_API_KEY=your_api_key_here
```

Install the `systemd` service:

```bash
sudo cp /opt/arcana-hub/apps/daily-arcana/backend/deploy/arcana-backend.service /etc/systemd/system/arcana-backend.service
sudo systemctl daemon-reload
sudo systemctl enable arcana-backend
sudo systemctl start arcana-backend
sudo systemctl status arcana-backend
```

Install the Nginx site:

```bash
sudo cp /opt/arcana-hub/apps/daily-arcana/backend/deploy/nginx.arcana-backend.conf.example /etc/nginx/sites-available/arcana-backend
sudo ln -s /etc/nginx/sites-available/arcana-backend /etc/nginx/sites-enabled/arcana-backend
sudo nginx -t
sudo systemctl reload nginx
```

Enable HTTPS:

```bash
sudo certbot --nginx -d fullhouse.chickenkiller.com
```

Test it:

```bash
curl http://127.0.0.1:8000/health
curl https://fullhouse.chickenkiller.com/health
```

## Frontend Change Needed

Your frontend points to:

```js
https://arcana-hub.onrender.com
```

Update it to your new backend URL, or set `window.ARCANA_API_BASE_URL` before loading `app.js`.

The current API base line is in:

- `apps/daily-arcana/frontend/js/app.js`

## Operations

Useful commands on the server:

```bash
sudo systemctl restart arcana-backend
sudo systemctl status arcana-backend
journalctl -u arcana-backend -n 100 --no-pager
```

## Security Checklist

- Use SSH on port `2246` as configured
- Disable password SSH later if you can switch to keys
- Keep Nginx public, keep Python bound to `127.0.0.1`
- Only set `ALLOWED_ORIGIN` to your real frontend origin
- Keep regular backups of `app.db`
