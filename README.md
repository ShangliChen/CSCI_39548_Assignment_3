Bank of React — Assignment 3 (Debits Only Base)
===============================================

This repository contains our implementation for Assignment 3 – Bank of React. The main branch currently ships the Debits feature only; the Credits feature will be merged via a separate PR.

Live Link
---------
- https://shanglichen.github.io/CSCI_39548_Assignment_3/

Quick Redeploy
---------------
- macOS/Linux:
  - `export NODE_OPTIONS=--openssl-legacy-provider`
  - `npm run deploy`
- Windows (PowerShell):
  - `$env:NODE_OPTIONS="--openssl-legacy-provider"`
  - `npm run deploy`
- Windows (cmd):
  - `set NODE_OPTIONS=--openssl-legacy-provider`
  - `npm run deploy`

Team
----
- Your Name (@your-github)
- Teammate Name (@their-github)

Tech Stack
----------
- React 17, React Router v5, axios, CRA (react-scripts 4)

Run Locally
-----------
1. Install dependencies: `npm install`
2. If using Node ≥ 17 (e.g., Node 20), set OpenSSL legacy provider to avoid CRA v4 build error:
   - macOS/Linux: `export NODE_OPTIONS=--openssl-legacy-provider`
   - Windows (cmd): `set NODE_OPTIONS=--openssl-legacy-provider`
   - Windows (PowerShell): `$env:NODE_OPTIONS="--openssl-legacy-provider"`
3. Start dev server: `npm start`
4. Open http://localhost:3000

Deploy to GitHub Pages
----------------------
1. Homepage (done): `package.json` already contains
   - `"homepage": "https://shanglichen.github.io/CSCI_39548_Assignment_3/"`
2. Router basename (done): `src/App.js` uses `basename={process.env.PUBLIC_URL}`
3. Install deps (if not already): `npm install`
4. On Node ≥ 17, set env var for this terminal session (same as above).
5. Deploy: `npm run deploy`
6. GitHub → Repo → Settings → Pages → Build and deployment:
   - Source: Deploy from a branch
   - Branch: `gh-pages`, Folder: `/ (root)`
7. Wait 1–3 minutes, then open the live link above.

Troubleshooting
---------------
- OpenSSL error (ERR_OSSL_EVP_UNSUPPORTED): use the env var shown above or Node 16 LTS.
- Blank page/404 on GitHub Pages: confirm `homepage` matches exactly (case‑sensitive, trailing slash), re‑deploy with the env var.
- Refresh on non‑root route (e.g., /debits) returns 404: GitHub Pages is static hosting; a minimal SPA fallback is included (`public/404.html`) that redirects to the app root.

Architecture & Data Flow
------------------------
- Top‑level state in `src/App.js`: `accountBalance`, `debitList`, `currentUser`.
- On mount, app loads debits from `https://johnnylaicode.github.io/api/debits.json`.
- Account Balance = `0 - totalDebits` (Credits will be merged later to become `totalCredits - totalDebits`).
- Client‑side routing (React Router v5): `/`, `/debits`, `/userProfile`, `/login`.

Implemented Features
--------------------
- Home: links to Debits, User Profile, Login; shows formatted balance (2 decimals), negative in red.
- Debits:
  - Loads list from API and displays description, amount (2 decimals), date (yyyy‑mm‑dd)
  - Newest‑first ordering; scrollable list
  - Add new debit (description, amount) with today’s date; updates balance
- Profile/Login: mock pages to demonstrate Route/Redirect; login updates username.
- Styling: light blue + white theme; debit/negative styles emphasized.

User Stories (subset)
---------------------
- As a user, I can view my account balance (2 decimals) anywhere it is displayed.
- As a user, I can view my debits with description, amount (2 decimals), and date (yyyy‑mm‑dd).
- As a user, I can add a debit and see it instantly in the list and reflected in my balance.

Credits Feature (Next PR)
-------------------------
- Add `creditList`, `addCredit`, credits API call, and route `/credits`.
- Update balance formula to `totalCredits - totalDebits`.

Assignment Notes
----------------
- Per assignment, a separate PDF contains the project document (business/functional requirements, architecture diagram, epics/stories, acceptance criteria, schedule). Group members and live link are listed here.

Common Errors
-------------
ERR_OSSL_EVP_UNSUPPORTED (OpenSSL 3 + Node ≥ 17 with CRA v4)
- macOS/Linux: `export NODE_OPTIONS=--openssl-legacy-provider`
- Windows (cmd): `set NODE_OPTIONS=--openssl-legacy-provider`
- Windows (PowerShell): `$env:NODE_OPTIONS="--openssl-legacy-provider"`

React Router v5 compatibility
- If a later React Router was installed accidentally, run in order:
  - `npm install`
  - `npm install react-router-dom@5.3.0 react-router@5.2.1`
  - `npm install react-scripts@latest --legacy-peer-deps`
  - `npm start`
