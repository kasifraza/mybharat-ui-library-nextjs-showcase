# My Bharat Volunteer Portal

A civic-tech volunteer engagement portal for **Mera Yuva Mera Bharat** — built to showcase a complete, production-style web app using the **Next.js App Router**, **Tailwind CSS**, and **[mybharat-react-library](https://www.npmjs.com/package/mybharat-react-library)** as the only UI component library.

All 20 components from the My Bharat design system are used across 5 pages, in both light and dark themes.

---

## Pages

| Route | Description |
|---|---|
| `/` | Dashboard — announcement alert, hero, impact stats, featured missions, "How it works" accordion, CTA |
| `/opportunities` | Mission listing — live search, category chips, state/sort dropdown filters, pagination |
| `/opportunities/[id]` | Mission detail — breadcrumbs, info grid, perks badges, FAQ accordion, share tooltip (12 pre-rendered pages) |
| `/register` | 3-step volunteer registration — personal details → interests → OTP verification, with validation |
| `/profile` | Volunteer profile — tabs (overview / applications / settings), accordion achievements, settings form |
| `404` | Custom not-found page |

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | App Router, Turbopack, static export (`output: "export"`) |
| [React](https://react.dev) | 19 | UI runtime |
| [mybharat-react-library](https://www.npmjs.com/package/mybharat-react-library) | ^0.1.0 | My Bharat design system — all UI components + design tokens |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility styling via `@tailwindcss/postcss` (CSS-first config) |
| [iconsax-react](https://www.npmjs.com/package/iconsax-react) | 0.0.8 | Icon system (all icons in the app) |
| [TypeScript](https://typescriptlang.org) | 5 | Type safety across the app |
| Hanken Grotesk (via `next/font`) | — | Typography (the library's own body/subheading face) |

---

## My Bharat UI Library Components Used

All **20 components** shipped by `mybharat-react-library` are used.

| # | Component | Where Used | Variants / Props Used |
|---|---|---|---|
| 1 | `Button` | All pages | `variant`: `primary`, `neutral` · `styleType`: `filled`, `outline`, `text` · `size`: `l`, `m`, `s` · `iconOnly` + `icon` · `disabled` |
| 2 | `Badge` | Header, mission cards, detail, register, profile | `variant`: `success`, `warning`, `error`, `info`, `secondary` |
| 3 | `Alert` | Home (announcement), register (applying-for, data privacy), opportunities (empty state) | `variant`: `info`, `success`, `warning` · `title` · `description` · `closable` · `actions` (label + variant + onClick) |
| 4 | `Toast` / `ToastContainer` / `toast` API | Global (`ToastHost` in root layout) + every page | `toast.success` / `toast.info` / `toast.error` / `toast.default` · `ToastContainer position="bottom-right"` · `duration` (6s success toast) |
| 5 | `Accordion` (+ `Accordion.Item` / `Accordion.Header` / `Accordion.Body`) | Home (how it works), mission detail (FAQ), profile (impact journey) | `defaultActiveKey` (single key) · `defaultActiveKey` (array) + `alwaysOpen` |
| 6 | `Breadcrumbs` | Opportunities, mission detail, register, profile | `items[]` with `label`, `href`, `active` |
| 7 | `Checkbox` | Register (focus areas) | `label` · `checked` · `onChange` |
| 8 | `Chip` | Opportunities (category filters, clear-all) | `selected` · `variant`: `error` · `styleType`: `ghost` · `leftIcon` · `onClick` |
| 9 | `DatePicker` | Register (date of birth) | `label` · `value` / `onChange(Date)` · `required` · `error` · `helperText` |
| 10 | `Dropdown` | Opportunities (state filter, sort), register (state/UT), profile (language) | `options` · `value` / `onChange` · `placeholder` · `multiple={false}` · `showLeftIcon={false}` · `size="s"` · `aria-label` |
| 11 | `Input` | Register (name, email, mobile), profile (display name) | `type`: `text`, `email`, `tel` · `required` · `error` + `errorMessage` · `success` + `successMessage` · `maxLength` · `inputMode` · `className` |
| 12 | `LinkUrlInput` | Register (portfolio link) | `label` · `placeholder` · `value` / `onChange` · `fullWidth` (https:// prefix) |
| 13 | `Otp` | Register (mobile verification step) | `length={6}` · `value` / `onChange` · `autoFocus` |
| 14 | `Pagination` | Opportunities (result pages) | `variant`: `primary` · `totalPages` · `page` / `onChange` (controlled) · `showPrevNext` |
| 15 | `Radio` | Register (gender) | `name` · `label` · `checked` · `onChange` |
| 16 | `Search` | Opportunities (mission search) | `value` / `onChange` · `onSearch` · `placeholder` · `showMic={false}` |
| 17 | `Tabs` | Profile (overview / applications / settings) | Controlled `activeKey` + `onSelect` · `tabs: TabItem[]` |
| 18 | `TextArea` | Register (motivation) | `label` · `helperText` · `maxLength={300}` (live counter) · `resize="vertical"` · `required` · `error` + `errorMessage` |
| 19 | `Toggle` | Register (availability, code of conduct, consent), profile (notification settings) | `label` (ReactNode) · `checked` / `onChange` · `defaultChecked` |
| 20 | `Tooltip` | Home (why join), mission cards (apply), detail (share), profile (gold badge) | `content` · `placement`: `top`, `left` |

> Every component is also available under its `MYB`-prefixed alias (e.g. `MYBButton`); this project uses the canonical names.

---

## Design Tokens & Theming

- The library ships design tokens as CSS custom properties (`--myb-*`), imported once via `import "mybharat-react-library/style.css"`.
- App chrome tokens (`--brand`, `--page-bg`, `--surface`, `--text-muted`, …) are **mapped 1:1 onto library tokens** — base primary is `--myb-secondary-600` (`#425dda`), with My Bharat saffron (`--myb-primary-600`, `#ff4f02`) as accent.
- **Dark mode** flips automatically: toggling `data-theme="dark"` on `<html>` re-themes both the library components and the app chrome with zero duplicated color values. Preference is persisted in `localStorage` with a pre-hydration init script (no flash).
- `prefers-reduced-motion` is respected; browser surfaces (selection, focus rings, scrollbars, link underlines) are themed to the palette.

---

## Getting Started

```bash
npm install
npm run dev        # local dev server → http://localhost:3000
npm run lint       # ESLint (Next core-web-vitals)
npm run build      # production build → static export to out/
```

Open [http://localhost:3000](http://localhost:3000). Demo OTP for the registration flow: **123456**.

---

## Deploying to Netlify

The app is configured for **static export** (`output: "export"` + `trailingSlash: true`), producing a self-contained `out/` directory — all 19 pages (including the 12 mission detail pages via `generateStaticParams`) are pre-rendered HTML.

**Option 1 — Drag & drop:** drop the `out/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop)

**Option 2 — Git:** connect the repo on Netlify; `netlify.toml` supplies the build command and publish directory

**Option 3 — CLI:**

```bash
npx netlify-cli deploy --prod --dir=out
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, library CSS, theme init, ToastHost
│   ├── globals.css             # Tailwind 4 + token mapping + themed browser surfaces
│   ├── page.tsx                # Home dashboard
│   ├── not-found.tsx           # Custom 404
│   ├── opportunities/
│   │   ├── page.tsx            # Listing: search, chips, dropdowns, pagination
│   │   └── [id]/page.tsx       # Detail: generateStaticParams (SSG)
│   ├── register/page.tsx       # 3-step registration form
│   └── profile/page.tsx        # Tabs: overview / applications / settings
├── components/
│   ├── Header.tsx              # Ministry + My Bharat logos, nav, theme toggle
│   ├── Footer.tsx
│   ├── OpportunityCard.tsx
│   ├── OpportunityDetail.tsx   # Client detail view for the SSG route
│   ├── ThemeToggle.tsx         # data-theme switcher (useSyncExternalStore)
│   ├── ToastHost.tsx           # Client boundary for ToastContainer
│   └── Icons.tsx               # iconsax-react re-exports + category icon map
└── lib/
    └── data.ts                 # Mock missions, categories, states, helpers
```

---

## License

MIT — for showcase/educational purposes. Logos and the My Bharat design system belong to the Ministry of Youth Affairs & Sports, Government of India.
