# Enggar Ranu Hariawan — Engineering Portfolio

Personal engineering portfolio for **Enggar Ranu Hariawan** — Site Reliability Engineer specializing in database platform engineering, migration architecture, and reliability engineering.

Live site: https://enggarranu.github.io/

## Stack

Plain HTML5, CSS3, and vanilla JavaScript. No build step, no framework, no bundler.

```
.
├── index.html              # all page content/markup
├── assets/
│   ├── css/style.css       # design system: tokens, components, animations
│   └── js/main.js          # theme toggle, scroll reveal, count-up metrics, nav
├── .nojekyll                # tells GitHub Pages to skip Jekyll processing
└── PORTFOLIO_V2_MASTER_PLAN.md  # original content/design spec
```

## Local preview

No build tools needed — just serve the folder:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy to GitHub Pages

This repo is meant to be pushed to **`enggarranu.github.io`** (a user-page repo), which GitHub Pages serves automatically from the `main` branch root — no GitHub Actions workflow or `/docs` folder required.

```bash
git init                                        # if not already a repo
git add -A
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/enggarranu/enggarranu.github.io.git
git push -u origin main
```

Then in the repo's **Settings → Pages**, set:
- Source: `Deploy from a branch`
- Branch: `main` / `root`

The site will be live at `https://enggarranu.github.io/` within a minute or two.

## Updating content

All copy lives directly in `index.html`. Metrics that should animate on scroll use a `data-count` attribute (see `assets/js/main.js`); `data-decimals` controls decimal precision for values like `99.9`.
