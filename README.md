# NOVAZ COMPANY — Website
Static site (HTML, CSS, vanilla JS). No build step, no dependencies.

## Run
Open `index.html`, or: `python3 -m http.server 8000`

## Structure
- `index.html` — page sections
- `css/style.css` — design tokens in `:root` (blue palette), all styles
- `js/main.js` — product data (`PRODUCTS`), scroll animations, counters, filters

## Edit
- Products/categories: edit the `PRODUCTS` array in `js/main.js`
- Colors: change variables in `:root`
- Texts/contact email: `index.html`
- Fonts: Unbounded + Manrope (Google Fonts)

## Next ideas
Real product photos, logo SVG, multi-page catalog, contact form, i18n (PT/EN), deploy on GitHub Pages/Netlify/Vercel.
