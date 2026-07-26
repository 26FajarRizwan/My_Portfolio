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
(see section 6 below for Firebase setup):

- **Experience, Education, Certifications** — text-based forms
- **Designs** — form + direct image upload (export your Canva design as PNG/JPG, upload it right there, no external image hosting needed)
- **Abilities** — skill name + emoji icon + percentage (drives the animated ring chart)
- **What I Do (Services)** — the 3-panel section, icon + title + description + tags

Until you've added anything through `/admin` for a given section, it falls back
to starter data already written in the matching file under `data/` (except
Designs, which shows an empty-state message until you add your first one).

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

Every editable section on the site is backed by **Firebase Firestore**, and the
**Designs** section also uses **Firebase Storage** for direct image uploads
from the admin panel. Everything updates live — no redeploy needed.

### 6.1 Create the Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → follow the steps (Google Analytics is optional, skip it).
2. Inside the project: **Build → Firestore Database → Create database** → start in **production mode** → pick any region.
3. **Build → Storage → Get started** → start in **production mode** → same region as Firestore.
4. Go to **Project Settings** (gear icon) → **General** → scroll to "Your apps" → click the **Web** icon (`</>`) → register an app (any nickname) → it'll show you a `firebaseConfig` object with your keys.

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
account can *write*:

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

### 6.5 Set Storage security rules (for Designs image upload)

In Firebase Console → **Storage → Rules**, paste this:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /designs/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

### 6.6 Use it

- Run the site locally (`npm run dev`) → go to `http://localhost:3000/admin` → log in with the account you created.
- Switch between the tabs (Experience, Education, Certifications, Designs, Abilities, What I Do), fill the form — for Designs, pick an image file directly — click Add.
- It shows up instantly on the public site — no redeploy needed for content changes.
- On production (Vercel), the same works at `yourdomain.vercel.app/admin`.

### 6.7 Add the same env vars to Vercel

In your Vercel project → **Settings → Environment Variables**, add all six
`NEXT_PUBLIC_FIREBASE_...` keys from your `.env.local`, then redeploy once.

> Firebase's free "Spark" plan is generous for a personal portfolio (50K reads/day
> on Firestore, 5GB Storage) so this should comfortably cover normal use.

---

## Project structure

```
app/            → Next.js App Router pages & global styles
components/     → All UI sections (Header, Hero, About, Projects, etc.)
data/           → Editable content: experience.js, education.js, designProjects.js
public/         → Static assets: profile.jpg, /designs thumbnails
```

---

## License

Code is licensed under the MIT License — see [LICENSE](./LICENSE).
All personal content, writing, and design assets remain © Fajar Rizwan.
