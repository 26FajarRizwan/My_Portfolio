# Fajar Rizwan — Portfolio

A modern, bluish-white themed portfolio built with **Next.js 14 + React**, featuring:

- Animated hero, skills radar chart, and 3-panel services section
- Full experience timeline & education, pulled from simple data files
- **Live GitHub projects** — auto-syncs from `github.com/26FajarRizwan` on every page load, no manual editing, **no setup required** — this is already fully working out of the box as long as your repos are public
- **Live Experience / Education / Certifications** — managed from one admin panel (`/admin`), backed by Firebase
- Scroll animations (AOS), sidebar mobile menu, contact section, footer with copyright

---

## 1. Run it locally (in Cursor / VS Code)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 2. Add your photo

Drop a photo named **`profile.jpg`** into the `public/` folder (`public/profile.jpg`).
It's already wired into the Hero and About sections — if the file is missing, it
automatically falls back to an emoji placeholder, so nothing breaks either way.

Recommended: a square-ish photo, at least 600×600px.

---

## 3. Update experience / education / certifications / designs / abilities / services

All six of these sections are manageable from **one admin panel** at `/admin`
(see section 6 below for Firebase setup), with full **Create, Read, Update,
Delete**:

- **Add** a new item via the form at the top of each tab
- **Edit** any existing item — click "Edit" on it, the form pre-fills, click "Update"
- **Delete** any item permanently — click "Delete" (asks for confirmation)
- **Designs** uses a plain **Image URL** field — paste one link, or several
  **comma-separated** for a swipeable carousel (see 3.1 below)
- Works on **every document in the collection**, including ones added manually
  in the Firebase Console before this admin panel existed — nothing is hidden

Changes appear on the public site **instantly** (real-time sync via Firestore's
`onSnapshot`) — no redeploy needed.

Until you've added anything through `/admin` for a given section, Experience,
Education, Abilities, and Services fall back to starter data already written
in their matching file under `data/`. Designs shows an empty-state message
until you add your first one (it has no static fallback).

### 3.1 Getting a direct Image URL for a Design

Canva doesn't give you a permanent direct image link by default, so:

1. In Canva: **Share → Download** → export as PNG/JPG to your computer.
2. Upload that image to any free image host that gives a **direct** link, e.g.
   [postimages.org](https://postimages.org) or [imgbb.com](https://imgbb.com) — no account needed.
3. Copy the **direct image link** (usually ends in `.jpg`/`.png`, not a page URL).
4. Paste that into the **Image URL** field in `/admin` → Designs.

> Note on LinkedIn: LinkedIn does not provide a public API for pulling profile
> data into a website automatically, so nothing here can auto-sync straight
> from LinkedIn — the admin panel is the closest thing to "instant updates"
> without touching code.

---

## 4. Push to GitHub (from Cursor)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/26FajarRizwan/portfolio.git
git push -u origin main
```

---

## 5. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**.
2. Import the GitHub repo you just pushed.
3. Framework preset: **Next.js** (auto-detected). Click **Deploy**.
4. Every future `git push` auto-deploys the update.

---

## 6. Firebase setup (full admin panel: Experience, Education, Certifications, Designs, Abilities, Services)

Every editable section on the site is backed by **Firebase Firestore**. All
Create/Update/Delete actions sync live to the public site — no redeploy needed.

### 6.1 Create the Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → follow the steps (Google Analytics is optional, skip it).
2. Inside the project: **Build → Firestore Database → Create database** → start in **production mode** → pick any region.
3. Go to **Project Settings** (gear icon) → **General** → scroll to "Your apps" → click the **Web** icon (`</>`) → register an app (any nickname) → it'll show you a `firebaseConfig` object with your keys.

### 6.2 Add your keys locally

1. Copy `.env.local.example` to a new file called `.env.local`.
2. Fill in the values from the `firebaseConfig` object you just got.

### 6.3 Create your admin login

1. In Firebase Console → **Build → Authentication → Get started**.
2. Enable the **Email/Password** sign-in method.
3. Go to the **Users** tab → **Add user** → enter the email/password you want
   to log in with at `/admin`.

### 6.4 Set Firestore security rules

In Firebase Console → **Firestore Database → Rules**, paste this so anyone can
*read* your content (for the public site) but only your logged-in admin
account can *write* (create, update, or delete):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /experience/{docId}      { allow read: if true; allow write: if request.auth != null; }
    match /education/{docId}       { allow read: if true; allow write: if request.auth != null; }
    match /certifications/{docId}  { allow read: if true; allow write: if request.auth != null; }
    match /designs/{docId}         { allow read: if true; allow write: if request.auth != null; }
    match /abilities/{docId}       { allow read: if true; allow write: if request.auth != null; }
    match /services/{docId}        { allow read: if true; allow write: if request.auth != null; }
  }
}
```

Click **Publish**.

### 6.5 Use it

- Run the site locally (`npm run dev`) → go to `http://localhost:3000/admin` → log in with the account you created.
- Switch between the tabs (Experience, Education, Certifications, Designs, Abilities, What I Do).
- **Add** new items with the form, **Edit** existing ones (click Edit → form pre-fills → Update), or **Delete** them.
- Everything shows up instantly on the public site — no redeploy needed for content changes.
- On production (Vercel), the same works at `yourdomain.vercel.app/admin`.

### 6.6 Add the same env vars to Vercel

In your Vercel project → **Settings → Environment Variables**, add all six
`NEXT_PUBLIC_FIREBASE_...` keys from your `.env.local`, then redeploy once.

> Firebase's free "Spark" plan is generous for a personal portfolio (50K reads/day
> on Firestore) so this should comfortably cover normal use.

---

## Project structure

The site is now **multi-page** — each main section lives on its own route
instead of one long scrolling page. Header and Footer are shared across every
page via `app/layout.js`.

```
app/layout.js       → Shared Header + Footer + AOS init for every page
app/page.js          → Home ("/") — Hero only
app/about/page.js     → About ("/about")
app/skills/page.js    → Skills ("/skills") — Abilities + What I Do
app/experience/page.js→ Experience ("/experience") — Experience + Education + Certifications
app/projects/page.js  → Projects ("/projects") — live GitHub repos + Designs gallery
app/contact/page.js   → Contact ("/contact")
app/admin/page.js     → Admin panel (auth + tab switcher) — also gets the shared Header/Footer
components/           → Section components (Header, Hero, About, Projects, etc.)
components/admin/     → Reusable admin UI: AdminForm, AdminList, AdminSection
lib/firebase.js       → Firebase app/auth/Firestore setup
lib/useFirestoreCrud.js → Generic real-time CRUD hook used by every admin tab
lib/adminTabs.js      → Field config for each admin-manageable section
lib/skillCategories.js → Category options for the Skills section
data/                 → Fallback/starter content: experience.js, education.js, abilities.js, services.js
public/               → Static assets: profile.jpg
```

---

## License

Code is licensed under the MIT License — see [LICENSE](./LICENSE).
All personal content, writing, and design assets remain © Fajar Rizwan.
