# Carsmart

Carsmart is a static, front-end-only prototype of a car marketplace/auction platform, built directly from Figma designs by hand-coded HTML, CSS and JavaScript (no framework, no build step, no AI-assisted code generation — only manual reference to library snippets/docs where needed).

It covers the full customer journey around buying and selling vehicles through live auctions, fixed-price sales, and vendor/dealer tools, plus a matching set of transactional email templates.

## Tech stack

- **HTML5** — every screen is a standalone, hand-written `.html` file (100+ pages at the project root).
- **CSS3 + Bootstrap 5** — Bootstrap (`bootstrap.min.css`) provides the grid, utilities and base components; all custom look-and-feel, layout and one-off page styling lives in `assets/css/custom.css` (~10k lines).
- **Vanilla JS + jQuery** — `assets/js/custom.js` (~900 lines) holds all interactive behaviour, built on top of jQuery 3.7 and Bootstrap's JS bundle (modals, tabs, tooltips, collapses).
- **Third-party UI libraries** (all self-hosted under `assets/`, except two loaded from cdnjs):
  - [AOS](https://michalsnik.github.io/aos/) — scroll animations
  - [Select2](https://select2.org/) — enhanced dropdowns/selects
  - [Slick Carousel](https://kenwheeler.github.io/slick/) — image/content sliders
  - [rangeslider.js](http://andreruffert.github.io/rangeslider.js/) (via CDN) — styled range inputs
  - [Dropzone.js](https://www.dropzone.dev/) (via CDN) — drag-and-drop file upload UI
- **Custom fonts** — `Alexandria` and `Lufga` families (self-hosted `.ttf` files under `assets/fonts/`), loaded via `assets/css/fonts.css`.
- **No backend, no package manager, no bundler** — every page links its CSS/JS with plain `<link>`/`<script>` tags; there's nothing to `npm install` or compile. It runs by opening the HTML files directly or serving the folder with any static file server.

## Project structure

```
├── index.html                # Homepage
├── *.html                    # ~100 individual page templates (see Features below)
├── pages.html                 # Internal dev gallery/index of every page with screenshots
├── sitemap.html               # Site navigation overview
├── assets/
│   ├── css/                  # bootstrap.min.css, custom.css, fonts.css, select2/slick/aos CSS
│   ├── js/                   # jquery, bootstrap.bundle, custom.js, select2/slick/aos JS
│   ├── fonts/                # Alexandria & Lufga font files
│   ├── img/                  # icons, illustrations, logos, screenshots (SVG/PNG)
│   └── vid/                  # video assets
├── thumbnails/                # Generated preview screenshots used by pages.html
└── email-templates/
    ├── index.html             # Gallery of all email templates
    ├── light-*.html / dark-*.html  # Transactional email templates (17 each, light & dark variants)
    ├── assets/                # Email-specific images
    └── thumbnails/            # Preview screenshots used by the email gallery
```

## Main features / page groups

**Marketing & entry**
- Homepage (`index.html`), Sitemap, Terms, Privacy Policy, Cookies (logged-in/out variants), SmartGuidelines, Our Policy, Help center (3 variants)

**Authentication & onboarding**
- Sign up / Sign in (multiple flows), Forgot/Reset password + confirmation, KYC verification, Sitemap-driven navigation

**Vehicle listing flow ("Add a car")**
- An 11-step wizard (`add-car-2` … `add-car-11`) covering vehicle details, condition, wholesale option, delivery, recap/review steps

**Buying & selling formats**
- Live sale bidding, "Buy it now", Quick sale, Wholesale, SmartExchange, SmartConnect sale — each with dedicated car-details pages for public, private, sold-buyer and sold-seller views
- Live sale notice, live chat with sellers/buyers (including payment-from-chat), voided sales & price change confirmations

**Dashboard (buyer/seller/vendor)**
- Listings, live bids, offers (pending/received/offered/outbid/accepted), invoices, credits, closed purchases, voided sales, SmartWallet balance/dashboard

**SmartWallet**
- Balance, add funds, add card/bank, purchase & fee payment flows

**SmartConnect / SmartDrop / SmartMatch / SmartData**
- Landing pages and role-specific information pages for vendors, private sellers and buyers; SmartData sign-in flows; SmartDrop quote request & received-quotes screens; SmartHub fees

**Editions (curated collections/magazine-style content)**
- Landing page, search & filters, sign-in + confirmation, logged-in/out detail views

**Other**
- Favourites, Profile, Change password, Refer a friend, "Sell my car by brand", form validation states (`form-validations.html`), a reusable live-chat widget

**Internal tooling**
- `pages.html` and `email-templates/index.html` are developer-facing screenshot galleries (not part of the customer-facing product) that index every page/template for quick visual QA.

## Transactional emails

`email-templates/` contains 17 email designs, each shipped in a **light** and **dark** variant (34 files total) plus a signature template, covering notifications such as bids, offers, sales, KYC, and account activity — built as standalone HTML emails with their own image assets.

## Running the project

No installation required:
1. Open `index.html` directly in a browser, **or**
2. Serve the folder with any static server, e.g. `npx serve .` or `python3 -m http.server`, and navigate to `index.html`.

Use `pages.html` (and `email-templates/index.html`) to browse a visual index of every screen in the project.
