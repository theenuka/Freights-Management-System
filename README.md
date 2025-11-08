<div align="center">
	<img src="./assets/logo.png" alt="FMS Logo" height="72" />
	<h1>Freights Management System (FMS)</h1>
	<p>End‑to‑end freight & parcel tracking platform – Admin control, Customer visibility, Background automation.</p>
	<p>
		<a href="#getting-started"><strong>Getting Started »</strong></a> ·
		<a href="#live-demo">Demo</a> ·
		<a href="#roadmap">Roadmap</a> ·
		<a href="#contributing">Contribute</a>
	</p>
	<img src="https://img.shields.io/badge/status-active-brightgreen" />
	<img src="https://img.shields.io/badge/backend-node%20%2F%20express-blue" />
	<img src="https://img.shields.io/badge/frontend-react%20%2B%20vite-ff69b4" />
	<img src="https://img.shields.io/badge/license-ISC-lightgrey" />
</div>

---

## ✨ Overview

FMS is a full‑stack logistics web application built to manage parcels from creation to delivery. It provides:

- Real‑time parcel status & shipment visibility
- Role‑based access (Admin vs User)
- Secure authentication (JWT + AES encrypted passwords)
- Automated background email notifications (welcome, pending, delivered)
- Clean, responsive UI (React + Tailwind)

The repo hosts **four** actively cooperating parts:

| Layer | Path | Purpose |
|-------|------|---------|
| Frontend | `Frontend/` | Customer portal: login, view & track parcels |
| Admin | `Admin/` | Management dashboard: create parcels, manage users |
| Backend API | `Backend/` | REST API (Express/MongoDB) auth, users, parcels |
| Background Services | `BackgroundServices/` | Out‑of‑band email jobs & templates |

> Screenshots (add yours):
> - `docs/screenshots/frontend-login.png`
> - `docs/screenshots/admin-dashboard.png`
> - `docs/screenshots/parcel-detail.png`

---
## 🧱 Architecture

```
Browser (React SPA: Frontend / Admin)
				|  Fetch / Axios (JWT in Authorization header)
				v
Express API (Auth, Parcels, Users) ----> MongoDB
				|
				+--> BackgroundServices (scheduled / event-driven emails)
```

### Tech Stack
- **Frontend / Admin:** React + Vite, React Router, Redux Toolkit, Tailwind CSS, React Icons, Toast notifications
- **Backend:** Node.js, Express, Mongoose (MongoDB), JWT, CryptoJS AES
- **Background Services:** Node + nodemailer (via helper), EJS templates
- **Tooling:** Nodemon, kill-port (dev convenience), PostCSS, dotenv

### Security
- Passwords AES encrypted at rest using `PASS` secret.
- JWT access tokens signed with `JWT_SEC`, 10 day validity.
- CORS enabled for frontend origins.
- Error responses normalized (401, 404, 500) for consistent client handling.

---
## 🚀 Getting Started

### 1. Clone
```bash
git clone https://github.com/theenuka/Freights-Management-System.git
cd Freights-Management-System
```

### 2. Install Dependencies
```bash
cd Backend && npm install && cd ..
cd Frontend && npm install && cd ..
cd Admin && npm install && cd ..
cd BackgroundServices && npm install && cd ..
```

### 3. Environment Variables
Create a `.env` file in `Backend/`:
```
PORT=8000            # optional; auto-fallback if busy
DB=mongodb+srv://<user>:<pass>@cluster/sample
PASS=<aes_encryption_secret>
JWT_SEC=<jwt_signing_secret>
```
For **BackgroundServices** (if separate):
```
DB=mongodb+srv://<user>:<pass>@cluster/sample
EMAIL_USER=<smtp_user>
EMAIL_PASS=<smtp_password_or_app_password>
```

### 4. Run Backend
```bash
cd Backend
npm run dev
```
Dynamic port finder will pick the first free port ≥ 8000.

### 5. Run Frontend & Admin (separate terminals)
```bash
cd Frontend && npm run dev
cd Admin && npm run dev
```

### 6. Background Email Service (optional)
```bash
cd BackgroundServices
npm run start
```

### 7. Login Flow
1. Register user via API or Admin UI
2. Backend stores encrypted password
3. User logs in, receives JWT
4. JWT attached on future protected requests

---
## 🔌 API Summary

Base URL: `http://localhost:<PORT>/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new user |
| POST | `/auth/login` | Authenticate (email, password) |
| GET | `/users` | List users (protected) |
| GET | `/parcels` | List parcels (protected) |
| POST | `/parcels` | Create parcel (admin) |
| PUT | `/parcels/:id` | Update parcel status |

> Add more endpoints here as they evolve.

### Auth Notes
- 401: wrong credentials
- 404: user not found
- 500: internal server error (generic message)

---
## 🧪 Development Utilities
- `npm run reset-password -- <email> <newPassword>` (Backend) – Re-encrypt a user password with current AES key.
- Auto port fallback prevents local clash loops (no more manual kill). 

---
## 📂 Folder Structure (Root excerpt)
```
Backend/
	controllers/   # auth, parcel, user logic
	models/        # Mongoose schemas
	routes/        # Express routers
	scripts/       # maintenance utilities
Frontend/
	src/components # Shared UI components
	src/pages      # User-facing pages (Login, Parcels, MyParcels)
Admin/
	src/pages      # Admin pages (Login, Users, Parcels, Dashboard)
BackgroundServices/
	EmailService/  # EJS templates + mail helpers
```

---
## 🧭 Roadmap
- [ ] Parcel timeline / tracking events
- [ ] File uploads (invoices / proof of delivery)
- [ ] Role-based granular permissions (super-admin, dispatcher)
- [ ] Refresh token flow & token revocation list
- [ ] Metrics dashboard (daily parcels, delivery SLA)
- [ ] Dockerization & CI pipeline
- [ ] Internationalization (i18n)

---
## 🤝 Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome"`
4. Push: `git push origin feat/awesome`
5. Open a Pull Request

Please keep changes scoped and include screenshots for UI updates.

---
## 🐞 Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| 401 on login | Wrong PASS key / old password | Run reset-password script or re-register |
| Port already in use | Ghost process on 8000 | Dynamic port fallback or manually kill with `lsof -ti:8000 | xargs kill` |
| Red toast but success earlier | Old frontend code always toasted success | Pull latest, ensure structured login result used |
| Emails not sending | Missing SMTP vars | Set EMAIL_USER / EMAIL_PASS in .env |

---
## 📄 License
ISC License – feel free to use, learn, extend.

---
## ❤️ Acknowledgements
- React + Vite ecosystem
- Tailwind CSS
- MongoDB & Mongoose
- Contributors & testers improving FMS usability

> Built for clarity, speed and operational visibility in modern freight workflows.
