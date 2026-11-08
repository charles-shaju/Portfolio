# Project rules

- App runs on TanStack Start (SSR); routes live in `src/routes/`, page bodies in `src/pages/`. Why: server-rendered HTML lets social crawlers read per-page tags.
- Per-page title/description/og:url/canonical/og:image come from each route's `head()` via `pageHead()` in `src/lib/seo.ts`; never put canonical or og:image in `__root.tsx`. Why: root tags apply to every page and would override children.
- react-router-style imports go through `@/lib/router-compat`. Why: keeps existing call sites working over TanStack Router.
- Keep project facts in shared typed project records and render only supplied facts on cards/details; do not infer missing dates, roles, or reporting methods. Why: portfolio content must stay consistent and factual across pages and metadata.
