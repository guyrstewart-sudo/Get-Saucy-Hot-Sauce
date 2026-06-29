# Get Saucy — Website + Brand Kit

Craft hot sauce, Asheville NC. This folder contains the brand portfolio book and a complete, deploy-ready GitHub Pages website.

## What's in here — FLAGSHIP BUILD

```
Get Saucy Hot Sauce/
├── index.html        Home — animated flagship (hero ember canvas, cascade gallery, products, story, stats, testimonials, sticky buy bar)
├── shop.html         Shop — animated product cards, heat meters, real photos
├── book.html         Book a private chef (scheduler + inquiry form)
├── about.html        Story / artists / contact
├── brand-book.html   Brand portfolio book (open in a browser)
├── Get Saucy - Brand Portfolio Book.pdf
├── assets/
│   ├── logo.svg      Logo
│   ├── styles.css    Flagship "Smoke & Fire" dark theme
│   ├── motion.js     Motion engine (scroll-reveal, parallax, ember canvas, magnetic buttons, count-up, sticky bar)
│   └── gs-*.jpg      16 REAL photos pulled from @getsaucyhotsauce (already in place)
└── README.md         This file
```

The site is built from the **real brand**: Asheville craft hot sauce, garden-grown peppers, a local artist on every label, rotating limited drops. Theme: near-black charcoal `#0c0805` with Saucy Red `#E23B2E`, Ember `#F2960C`, Gold `#FFD23F`, sparing Teal `#2ABFBF`. Fonts: Archivo Black, Pacifico, Inter. Fully responsive, accessible (skip link, `prefers-reduced-motion` disables all motion), lazy-loaded images, no frameworks — pure static, GitHub-Pages ready.

**Confirmed flavors:** Strabanero (strawberry-habanero, art by @mossy.tats) and Amnesia. Limited rotating batches, each with a new local artist (@artviaathena and others). Peppers garden-grown / from @firebelly_farm.

---

## 1. Photos — DONE ✅

16 real photos were pulled from @getsaucyhotsauce and are **already in `assets/`** (bottles, peppers, harvest, mash, label art). They're Instagram preview-resolution (~640px, crisp for web). For giant hero/print use, drop full-res originals over the same filenames. The only empty slot is a plated-dinner / chef photo for the Book page — add one when you have it.

## 2. Confirm the content placeholders

Search the files for these and replace:
- `STRIPE_PAYMENT_LINK...` — your Stripe Payment Links (see step 4)
- `YOUR_FORMSPREE_ID` — your Formspree form ID (see step 5)
- flavor names + prices in `shop.html` (**Strabanero** and **Amnesia** are confirmed; the rotating drop's name + all prices need confirming)
- Maker name/bio and origin story in `about.html` and `brand-book.html`
- Private-chef package prices, guest counts, and service area in `book.html`

## 3. Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `get-saucy`).
2. Upload everything in this folder to the repo root (drag-and-drop in the GitHub web UI works, or use git).
3. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`. Save.
4. Wait ~1 minute. Your site is live at `https://<username>.github.io/get-saucy/`.

**Custom domain:** In Settings → Pages → Custom domain, enter your domain. Then at your domain registrar add a `CNAME` record pointing to `<username>.github.io` (or 4 A-records to GitHub's IPs for an apex domain — GitHub shows the current ones). GitHub will auto-create a `CNAME` file and provision HTTPS.

## 4. Sell the sauce with Stripe (no backend needed)

1. Create a free Stripe account → **Products** → add each sauce (name, price, image).
2. For each product, create a **Payment Link** (Stripe → Payment Links → New). Enable shipping address collection and your shipping rates.
3. Copy each link and paste it over the matching placeholder in `shop.html`: `STRIPE_PAYMENT_LINK_STRABANERO`, `_AMNESIA`, `_DROP`, `_SET`.

Payment Links handle checkout, tax, and shipping on Stripe's hosted page — perfect for a static GitHub Pages site.

## 5. Booking + contact forms

**Private-chef calendar (`book.html`):** Create a free **Cal.com** or **Calendly** event ("Private Dinner"), copy its inline-embed snippet, and paste it over the dashed placeholder box.

**Inquiry + contact forms:** Create a free **Formspree** form, then replace `YOUR_FORMSPREE_ID` in `book.html` and `about.html` with your form ID. Submissions arrive in your email — no server required.

## 6. Make the branded PDF (optional)

The included PDF uses fallback fonts (the build environment can't reach Google Fonts). For a pixel-perfect, fully-branded PDF: open `brand-book.html` in your browser → **Print → Save as PDF**. Page breaks are already set.

---

### Quick local preview
Double-click `index.html` to open it in your browser. Everything works locally except the Stripe/Formspree/Cal.com integrations, which need the IDs above.
