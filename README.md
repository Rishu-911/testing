# Node.js CI/CD to OCI Instance (practical)

This repository is a minimal Node.js backend and a GitHub Actions workflow that deploys the app to an OCI Linux instance (user `opc`).

Quick overview
- Push to `main` → GitHub Actions runs → copies files to your OCI instance via SCP → runs remote commands to install deps and start/restart with `pm2`.

Required GitHub secrets
- `SSH_PRIVATE_KEY` — the private SSH key (multiline) for the `opc` user that matches the public key added to the server's `/home/opc/.ssh/authorized_keys`.
- `SERVER_HOST` — public IP or hostname of your OCI instance.
- `SERVER_USER` — typically `opc`.
- `SERVER_PORT` — SSH port (default `22`).
- `REMOTE_PATH` — absolute path on server where app will be copied, e.g. `/home/opc/app`.

Server preparation (one-time)
1. Connect to the server as `opc` and create the destination folder:

```bash
ssh opc@YOUR_SERVER_IP
mkdir -p /home/opc/app
exit
```

2. Install Node.js and npm on the server. On Ubuntu:

```bash
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

On Oracle Linux / RHEL based distros, use NodeSource or `yum` equivalents.

3. Install PM2 (process manager):

```bash
sudo npm install -g pm2
```

4. Add your public SSH key to `/home/opc/.ssh/authorized_keys` so GitHub Actions (using the private key) can authenticate.

How to set GitHub secrets
1. In your GitHub repo go to Settings → Secrets and variables → Actions → New repository secret.
2. Add the five secrets listed above. Paste the private key for `SSH_PRIVATE_KEY`.

Notes and troubleshooting
- Ensure the `opc` user has write permissions to `REMOTE_PATH`.
- The workflow excludes `.git`, `.github`, and `node_modules` from the scp transfer.
- For production use, secure your keys and consider additional hardening (firewall, limited key, deploy key patterns).

Test locally
- Run the app locally with:

```bash
npm install
npm start
# then visit http://localhost:3000
```
