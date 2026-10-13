# Battleplan Guides

Unofficial English wiki and strategy guides for **Battleplan, Steam App 3743140**, by Foolish Mortals Games Inc. and Slitherine Ltd.

Canonical site: https://battleplanguides.wiki. Repository: https://github.com/jjasnek-ops/battleplan-guides.

## Content and sources

Eight substantive articles cover starting an operation, Zone Orders, supply, combat, unit roles, Army Constructor, officers and the released game's scope. Each article links its official sources and identifies pre-release diary limitations. No purchased-copy testing, numerical unit database, optimum division template or complete mission walkthrough is claimed. Editorial diagrams are original schematics.

Published content lives in `src/content/wiki/en/`. Site identity is in `src/config/site.ts`; English interface/home/legal copy is in `src/locales/en.json`. Advertising and comments are disabled. The configured GA4 Web stream uses the public measurement ID `G-JC1GM0KG8Z` and loads only after the visitor accepts the native cookie banner. The source and native content controls support a low-maintenance site; they do not automatically rewrite or publish unverified game facts.

## Development

Use Node.js >=22.13 and the pinned pnpm 11 package manager:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Before publishing:

```sh
pnpm check
pnpm lint
pnpm test
pnpm check-config
pnpm check-content
pnpm build
pnpm check-links
pnpm check-sitemap http://127.0.0.1:4323
```

The last command requires a running preview; choose its actual port. Cloudflare Pages serves `dist/`. Set `SITE_URL=https://battleplanguides.wiki`; `wrangler.toml` and the Astro fallback retain this formal origin. GA4 also needs `PUBLIC_GA_ID=G-JC1GM0KG8Z` at Astro build time; Wrangler Function bindings alone do not establish that a static page was built with the identifier. Verify the deployed consent loader after a build. `/sitemap.xml` redirects to `/sitemap-index.xml` in Pages. `/search/` uses native Pagefind and is excluded from indexing.

## Deployment ownership

This repository and workspace are the single source of the site. Publish only a build from its audited commit. Avoid competing deployment copies. Git integration requires Cloudflare's authorized GitHub app; do not grant wider access or publish credentials as a shortcut. The actual project/deployment, domain activation and Google measurement status are recorded separately in local launch reports.

Research, raw source transcripts, account screenshots and execution reports stay in the local ignored `research/` and `reports/` directories. They are not website assets or a public copy of third-party articles. `AGENTS.md` contains recovery instructions and evidence rules.

## Upstream attribution

Built from the official [PNGTRID/AnvilWiki](https://github.com/PNGTRID/AnvilWiki) template **v2.37.0**, base commit `8109ef105d05f15c2a86783717e18d2aef3a27af`. Its MIT [LICENSE](LICENSE) is preserved. The package version identifies this template baseline. Upstream documentation and workflows remain available for maintenance; the site's content and configuration are Battleplan-specific.

Battleplan and its trademarks belong to their respective owners. This site is an independent Unofficial Fan Guide and is not endorsed by the developer or publisher.
