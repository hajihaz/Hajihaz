# HAJIHAZ — Building the Unbuilt

A cinematic personal portfolio for Syed Hasan Kuddos Sahib. An original titanium H sculpture, an interactive ecosystem and a considered editorial story connect technology, business, law and capital.

Production: https://hajihaz.vercel.app  
Repository: https://github.com/hajihaz/Hajihaz

## The experience

- Original procedural Three.js H sculpture with studio lighting, machined details, pointer response and scroll-linked camera distance.
- Immediate 33 kB sculpture render on mobile, with a deliberate **Explore in 3D** control. Desktop opens with the live sculpture.
- Five distinct project worlds: a business network, commerce parcels, distributed protocol blocks, architectural rails and a civic grid.
- Eight accessible universe domains. HTML buttons and case studies work independently of WebGL.
- Eight factual project records, with clear distinctions between business, development, client work, experiments, private tools and concepts.
- Eleven connected sections, editorial ivory interludes, restrained crimson signals and warm metal accents.
- Working architecture layers, three local lab experiments and HAJI OS (Command/Ctrl + K).
- First-visit letter resolution, native scrolling, motion controls, system reduced-motion support and progressive heading reveals.
- Canonical metadata, structured person data, a custom H favicon, social card, sitemap and robots.
- No analytics, contact database, paid API service or owner-only data is required by this portfolio.

## Stack

Next.js 15.5.27, React 19.1.9, TypeScript, Three.js 0.186.1, CSS, self-hosted Manrope / Cormorant Garamond / IBM Plex Mono. Heavy scene code is dynamically imported; project and universe scenes initialize near the viewport. Mobile animation is capped at 30 fps. Rendering pauses off-screen and in hidden tabs. GPU context restoration regenerates the studio environment.

Native HTML dialogs provide modal semantics, Escape handling and focus return. There is no simulated terminal execution: HAJI OS only reads public portfolio content.

## Local development

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run start -- --port 3013
npm run test:e2e
```

For browser checks, install the official Playwright browsers:

```bash
npx playwright install chromium webkit
```

The browser suite defaults to http://127.0.0.1:3013. Set PORTFOLIO_URL to run the same suite against a deployment. Profiles cover desktop Chromium, Android Chromium and iPhone WebKit.

## Edit content

`content/site.ts` holds identity, contact links, projects, domain connections, timeline and current focus. Project records contain the idea, system, build, challenge, status and next direction.

The personal email and unverified social profiles from the old site were removed. The configured business email is contact@allbeesolutions.com, verified on AllBee's public website. RKN is accurately presented as a craftsmanship/fabrication client website rather than a legal practice. Its external link is withheld while its HTTPS endpoint fails TLS; the portfolio case study remains available. Namma Road is a concept, JARVIS is private, HajiPay is planned and the protocol project is experimental.

Sources: the owner-supplied execution brief; inspected Suplaykart, HajiHaz Network and RKN project documentation; https://www.allbeesolutions.com/ ; https://github.com/hajihaz . No customer counts, revenue, awards or trading returns are invented.

## Visual assets and fallbacks

All geometry and project visuals are original code-based work. No Higgsfield credits were spent. `public/core-still.webp` is a render of the actual Three.js sculpture, not a generated approximation. The initial hero remains readable without JavaScript. SVG project worlds remain available if WebGL fails.

`scripts/capture.mjs` records browser evidence. `scripts/render-core.mjs` refreshes the mobile still from the local desktop sculpture. Run the capture against a running site; render-core expects the local production server at port 3013. The scene remains active on desktop when refreshing the still.

## Dependency patches

The app remains on the existing Next.js 15 line. Package overrides pin compatible patched PostCSS, source-map-js and Sharp versions. The production dependency audit was re-run after installation and reported zero known vulnerabilities. This is a point-in-time package check, not a blanket security guarantee.

## Release and recovery

Only the existing Vercel project `hajihaz` is in scope. A production build is staged with `--prod --skip-domain`, checked and then promoted. Verify .vercel/project.json matches the existing portfolio project and team before release. Never target the separate HajiHaz AI application.

The pre-rebuild version is retained in Git history at `7aa64c8` and in local branch `checkpoint/pre-cinematic-20261009`. Existing unrelated next-env.d.ts and local agent-state changes are preserved.

## Optional future work

1. Restore the RKN external link after that independent site's HTTPS endpoint recovers.
2. Add an owner-approved portrait and verified personal social profiles.
3. Add approved real product screenshots to complement the conceptual project worlds.

These are future additions, not pending implementation in the delivered first version.
