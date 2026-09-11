# Angelene Badana — Portfolio

A clean, modern portfolio website built from scratch with vanilla HTML, CSS, and JavaScript. No frameworks, no build step — ready to deploy on Vercel.

## Features

- Responsive, mobile-friendly single-page layout
- Sticky navigation with active-section highlighting
- Smooth scroll and scroll-reveal animations
- Skills and projects rendered dynamically
- Education background section
- Contact section with direct phone link

## Getting Started

Clone or download the repo, then open `index.html` in your browser, or run a local server:

```bash
# Python
python -m http.server

# OR with npx (Node.js)
npx serve .
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New → Project**, import this repository, and click **Deploy**.
4. That's it — Vercel auto-detects the static site (see `vercel.json`) and serves it.

## Customizing

- **Profile picture:** replace `images/profile/profile_images.png`
- **Bio / phone / education:** edit the text in `index.html`
- **Skills & projects:** edit the arrays at the top of `js/main.js`
- **Colors:** edit the CSS variables in `css/style.css`

## Structure

```
.
├── index.html          # Page structure
├── css/
│   └── style.css       # Styling
├── js/
│   └── main.js         # Interactivity & dynamic content
├── images/
│   └── profile/
│       └── profile_images.png
├── vercel.json         # Vercel static config
└── .gitignore
```

## License

MIT