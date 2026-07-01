# Page Design — Enggar Portfolio (EN content, ID spec)

## Global Styles (Design Tokens)
- Approach: desktop-first, lalu turun ke tablet/mobile.
- Breakpoints (contoh): desktop ≥ 1024px, tablet 768–1023px, mobile ≤ 767px.
- Colors:
  - Background: #0B0F14 (atau off-black), Surface: #111827
  - Text primary: #E5E7EB, text secondary: #9CA3AF
  - Accent: #60A5FA (link/CTA), Accent hover: #93C5FD
  - Border: rgba(255,255,255,0.08)
- Typography:
  - Font: Inter/system-ui
  - Scale: H1 48/56, H2 28/36, Body 16/24, Small 14/20
- Buttons:
  - Primary: solid accent, radius 10–12px, hover lighten + subtle lift
  - Secondary: outline + surface hover
- Links:
  - Underline on hover + focus ring jelas
- Motion:
  - Default easing: ease-out, duration 180–320ms
  - Reduced motion: nonaktifkan parallax/reveal; gunakan fade minimal

## Page: Home (Portfolio)

### Layout
- Sistem: hybrid Flexbox + CSS Grid.
- Grid utama: max-width 1100–1200px, center aligned, padding 24–32px (desktop), 16–20px (mobile).
- Spacing: section vertical rhythm 72–96px (desktop), 48–64px (mobile).

### Meta Information
- Title: “Enggar — Site Reliability Engineer (ex-DBA)”
- Description: “English portfolio of Enggar, SRE (ex-DBA). Featuring Risk Insight project, skills, and contact links.”
- Open Graph:
  - og:title sama dengan title
  - og:description sama dengan description
  - og:type: website

### Page Structure (stacked sections)
1. Sticky Header
2. Hero
3. About
4. Featured Project (Risk Insight)
5. Skills
6. Contact
7. Footer

### Sections & Components

#### 1) Sticky Header
- Kiri: wordmark “Enggar”.
- Kanan: menu anchor: About / Project / Skills / Contact.
- CTA kecil: “Contact”.
- Interaksi:
  - Active state berdasarkan posisi scroll (highlight).
  - Mobile: menu menjadi hamburger + drawer.

#### 2) Hero
- Komponen:
  - H1 (EN): “Site Reliability Engineer (ex-DBA)”
  - Subcopy (EN, 1–2 kalimat): fokus reliability, performance, automation.
  - CTA buttons: “View Risk Insight” (scroll ke Project) + “Contact” (scroll ke Contact).
  - Optional: small badges (EN): “SRE”, “Databases”, “Observability”.
- Motion:
  - On load: fade + slide-up 12–16px bertahap (stagger ringan).

#### 3) About (SRE ex-DBA)
- Layout: 2 kolom desktop (bio kiri, highlights kanan), 1 kolom di mobile.
- Konten (EN): ringkasan pengalaman SRE + latar ex-DBA.
- Highlights (bullets, EN): “Incident response”, “SLIs/SLOs”, “Capacity planning”, “Performance tuning”.
- Motion: reveal saat masuk viewport (intersection observer / framer-motion).

#### 4) Featured Project — Risk Insight
- Layout: card besar + area detail.
- Card content (EN):
  - Title: “Risk Insight”
  - Tagline singkat (1 baris)
  - 3 blok ringkas: Problem / Approach / Impact (masing-masing 1–2 bullet)
- Interaksi:
  - Tombol “Read summary” membuka accordion atau modal.
  - Jika ada link eksternal: tombol “Open” buka tab baru.
- Motion:
  - Hover card: elevate + border glow halus.
  - Modal/accordion: animasi height/fade yang lembut, tidak berlebihan.

#### 5) Skills
- Layout: grid chips (auto-wrap), kategori sebagai subheading.
- Kategori (EN): “SRE & Infrastructure”, “Database”, “Observability”, “Automation”, “Cloud/Containers”.
- Interaksi: chip hover state (subtle).

#### 6) Contact
- Layout: card/contact panel.
- Elemen:
  - Heading (EN): “Let’s connect”
  - Email button: mailto:enggar@...
  - LinkedIn button: https://linkedin.com/in/...
  - Microcopy (EN): “Feel free to reach out for SRE/DB reliability work.”
- Aksesibilitas:
  - Semua link bisa diakses via keyboard, focus ring jelas.

#### 7) Footer
- Konten: copyright + “Built with React”.

### Responsive Behavior
- Header: berubah ke hamburger pada mobile.
- Hero CTA: dari horizontal menjadi stacked.
- About: 2 kolom → 1 kolom.
- Skills grid: jumlah kolom menyesuaikan lebar.

### Accessibility & Performance Notes
- Pastikan kontras teks memadai di background gelap.
- Gunakan prefers-reduced-motion untuk menonaktifkan animasi berat.
- Optimalkan aset (SVG icons), minimalkan animasi continuous.
