<div align="center">

# ⚡ LeadDesk Mini

**A lightweight lead-capture system with an animated admin pipeline, dark mode, and a hardened Express/MongoDB API.**

![Status](https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![Made with](https://img.shields.io/badge/made%20with-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📖 Overview

LeadDesk Mini is a two-part application:

- A **public landing page + lead capture form**, where visitors submit contact/budget/project details.
- A **JWT-authenticated admin flow** for reviewing, updating, and managing incoming leads.

The frontend is a single-page React app with dark/light theming and motion-driven UI. The backend is a REST API that owns authentication, validation, and persistence — the frontend never talks to the database directly.

---

## 🧰 Tech Stack

### Frontend

<table>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /><br />
      <sub>Component-based UI</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /><br />
      <sub>Utility-first styling</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /><br />
      <sub>Dev server & bundler</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /><br />
      <sub>Plain JS, no TypeScript</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /><br />
      <sub>Animations & transitions</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logoColor=white" alt="Zustand" /><br />
      <sub>Global state management</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" /><br />
      <sub>Client-side routing</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" /><br />
      <sub>HTTP client</sub>
    </td>
  </tr>
</table>

### Backend

<table>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /><br />
      <sub>Runtime</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /><br />
      <sub>REST API framework</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /><br />
      <sub>Document database</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logoColor=white" alt="Mongoose" /><br />
      <sub>ODM / schema validation</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" /><br />
      <sub>Auth tokens via httpOnly cookie</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/bcryptjs-338033?style=for-the-badge&logoColor=white" alt="bcryptjs" /><br />
      <sub>Password hashing</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/Helmet-000000?style=for-the-badge&logoColor=white" alt="Helmet" /><br />
      <sub>Secure HTTP headers</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/express--rate--limit-FF6F00?style=for-the-badge&logoColor=white" alt="express-rate-limit" /><br />
      <sub>Brute-force & spam protection</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/CORS-4B32C3?style=for-the-badge&logoColor=white" alt="CORS" /><br />
      <sub>Locked to frontend origin</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/cookie--parser-8B4513?style=for-the-badge&logoColor=white" alt="cookie-parser" /><br />
      <sub>Reads the JWT cookie</sub>
    </td>
    <td align="center" width="160">
      <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" alt="dotenv" /><br />
      <sub>Environment config</sub>
    </td>
    <td></td>
  </tr>
</table>

---

## 🔐 Security Features

| Feature | Where | What it does |
|---|---|---|
| **JWT auth (httpOnly cookie)** | `utils/generateToken.js`, `middleware/auth.middleware.js` | Token isn't readable by frontend JS, mitigating XSS token theft |
| **Password hashing** | `models/User.js` (`bcryptjs`, pre-save hook) | Passwords never stored in plaintext |
| **Helmet** | `server.js` | Hardens default Express HTTP headers |
| **Rate limiting** | `middleware/rateLimiter.js` | `generalLimiter` (300/15min), `authLimiter` (10/15min, failed attempts only), `leadCreateLimiter` (20/hour) |
| **Email regex validation** | `utils/validators.js`, schema `match`, controller checks | Rejects malformed emails at both the API and schema layer |
| **Centralized error handling** | `middleware/errorHandler.js` | Normalizes Mongoose cast/validation/duplicate-key errors into clean JSON responses |
| **Client-side validation** | `LeadForm.jsx`, `Login.jsx` | Instant feedback before a request is even sent |

---

## 📂 Project Structure

```
leaddesk-mini/
├── frontend/
│   └── src/
│       ├── components/
│       │   └── layout/
│       │       └── Navbar.jsx        # nav + theme toggle
│       ├── pages/
│       │   ├── Landing.jsx           # marketing/hero page
│       │   ├── LeadForm.jsx          # public lead capture form
│       │   └── Login.jsx             # admin auth
│       ├── store/
│       │   ├── useThemeStore.js      # dark/light mode
│       │   ├── useAuthStore.js       # login/logout/session
│       │   └── useLeadStore.js       # lead CRUD state
│       └── lib/
│           ├── axios.js              # API client (withCredentials)
│           └── validators.js         # shared email regex
│
└── backend/
    ├── server.js                     # app entrypoint
    ├── package.json
    ├── .env.example
    └── src/
        ├── config/
        │   └── db.js                  # MongoDB connection
        ├── models/
        │   ├── User.js
        │   └── Lead.js
        ├── controllers/
        │   ├── auth.controller.js
        │   └── lead.controller.js
        ├── middleware/
        │   ├── auth.middleware.js
        │   ├── errorHandler.js
        │   └── rateLimiter.js
        ├── routes/
        │   ├── auth.routes.js
        │   └── lead.routes.js
        └── utils/
            ├── generateToken.js
            └── validators.js
```

---

## 🚀 Getting Started

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev
```

Backend runs on `http://localhost:3000` by default.

### 2. Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:3000/api" > .env
npm run dev
```

Frontend runs on `http://localhost:5173` by default (Vite).

> Make sure `CLIENT_URL` in the backend `.env` matches the frontend's actual origin — CORS will reject requests otherwise.

### 3. Create your first admin user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"password123"}'
```

You can then log in through the app's `Login.jsx` page.

---

## 🔌 API Reference

### Auth — `/api/auth`

| Method | Route | Access | Body | Notes |
|---|---|---|---|---|
| `POST` | `/register` | Public | `{ username, email, password }` | Rate-limited, email regex validated |
| `POST` | `/login` | Public | `{ identifier, password }` | `identifier` = username **or** email |
| `POST` | `/logout` | Private | — | Clears the auth cookie |
| `GET` | `/me` | Private | — | Returns the logged-in user |

### Leads — `/api/leads`

| Method | Route | Access | Body / Query | Notes |
|---|---|---|---|---|
| `POST` | `/` | Public | `{ name, email, budget, message }` | Rate-limited (20/hour), email regex validated |
| `GET` | `/` | Private | `?status=&page=&limit=` | Paginated list for the admin dashboard |
| `GET` | `/:id` | Private | — | Single lead |
| `PATCH` | `/:id` | Private | `{ status }` | `new → contacted → closed` |
| `DELETE` | `/:id` | Private | — | Removes a lead |
| `GET` | `/stats/summary` | Private | — | Counts by status |

---

## 🌱 Environment Variables

### Backend `.env`

| Variable | Example | Description |
|---|---|---|
| `PORT` | `3000` | API server port |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/leaddesk-mini` | MongoDB connection string |
| `JWT_SECRET` | *(long random string)* | Signs/verifies JWTs |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin |
| `NODE_ENV` | `development` | Toggles `secure`/`sameSite` cookie flags |

### Frontend `.env`

| Variable | Example | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000/api` | Base URL the frontend calls |

---

## 🗺️ Roadmap

- [ ] `Admin.jsx` dashboard consuming `GET /api/leads` + `/stats/summary`
- [ ] Zod schema validation on the frontend forms
- [ ] Email verification flow for new admin accounts
- [ ] Deployment guide (Render/Railway + Vercel)

---

<div align="center">
<sub>Built with React, Express, and MongoDB.</sub>
</div>#   l e a d m i n i  
 #   l e a d m i n i  
 #   l e a d m i n i  
 