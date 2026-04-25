# EnvHUB Website — Deployment pe Render

## 🚀 Pași pentru hostare pe Render

### 1. Push codul pe GitHub
```bash
# Din folderul EnvHUB-website-main:
git init
git add .
git commit -m "Initial commit - EnvHUB website"
git branch -M main
git remote add origin https://github.com/tudasha/EnvHUB-website.git
git push -u origin main
```

### 2. Creare Web Service pe Render
1. Mergi la [render.com](https://render.com) → **New → Web Service**
2. Conectează repository-ul GitHub: `tudasha/EnvHUB-website`
3. Setează:
   - **Root Directory**: `smart-env`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm run start`
   - **Region**: Frankfurt (cel mai aproape de România)
   - **Plan**: Free (sau Starter pentru uptime permanent)

### 3. Variabile de mediu (Environment Variables)
În Render Dashboard → Environment → adaugă:

| Variabilă | Valoare |
|-----------|---------|
| `DATABASE_URL` | connection string-ul PostgreSQL (Neon.tech) |
| `AUTH_SECRET` | un secret random (poți genera cu `npx auth secret`) |
| `NEXTAUTH_URL` | `https://envhub-website.onrender.com` (URL-ul tău Render) |
| `NEXT_PUBLIC_APP_URL` | `https://envhub-website.onrender.com` |
| `GEMINI_API_KEY` | cheia ta Google Gemini |

> ⚠️ **IMPORTANT**: Nu adăuga niciodată aceste valori direct în cod sau în fișiere `.env` commit-uite pe GitHub!

### 4. După primul deploy
Render va rula automat build-ul. La primul deploy:
- Verifică în **Logs** că `prisma generate` și `npm run build` au rulat cu succes
- Accesează URL-ul Render și testează site-ul

### 5. Re-deploy automat
Orice `git push` pe branch-ul `main` va triggera automat un nou deploy pe Render.

---

## 📁 Structura proiectului
```
EnvHUB-website-main/
├── .gitignore          # ignoră .env, node_modules, etc.
├── .env.example        # template pentru variabile de mediu
├── smart-env/          # aplicația Next.js
│   ├── render.yaml     # configurare Render
│   ├── src/            # codul sursă
│   ├── prisma/         # schema baza de date
│   └── ...
```
