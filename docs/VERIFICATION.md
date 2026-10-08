# Verification record

Verified on 8 October 2026 against the local production build. Live deployment acceptance is recorded separately in the project's private execution state and release report.

## Engineering

- TypeScript: pass.
- ESLint: pass, zero warnings.
- Next.js production build: pass; all public routes prerendered.
- Production dependency audit: zero known vulnerabilities at the time of this check.
- Git whitespace check: pass.
- Initial shared JavaScript: 117 kB; portfolio route: 14.6 kB according to the Next build report.

## Browser verification

39 tests passed, zero failures, skips or flaky cases. Each of 13 scenarios ran in desktop Chromium (1440 × 1000), Chromium with Android Pixel 7 emulation, and WebKit with iPhone 13 emulation.

The suite verifies navigation and content, eight project dialogs, all universe domains, architecture layers and laboratory controls, every HAJI OS command and command history, focus return, mobile navigation, pause motion, accessibility checks, viewport widths from 320 to 1440 pixels, reduced motion, JavaScript-free content, the first-visit intro, rendered evidence, WebGL context recovery, and the business email/copy control.

Automated axe checks found no violations in the tested page and modal states for the selected WCAG 2 A/AA and 2.1 AA rules. This is automated coverage, not a complete manual accessibility certification.

Desktop and mobile section screenshots were inspected. Capture logs recorded zero runtime errors and no horizontal document overflow at 1440 and 390 pixels. Real WebGL rendered on desktop and in the project/universe captures; the mobile hero initially uses the actual sculpture still and starts live 3D on request.

## Lighthouse lab measurements

Lighthouse 13, fresh local production build, Chromium, 8 October 2026. The mobile run uses simulated throttling. Scores are a point-in-time lab result, not field data or measurements from physical devices.

| Profile | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 96 | 100 | 100 | 100 | 0.8 s | 2.7 s | 70 ms | 0.001 |
| Desktop | 100 | 100 | 100 | 100 | 0.2 s | 0.6 s | 0 ms | 0.001 |

The initial mobile rendering path was revised after measurement: a small sculpture still paints immediately, and the expensive hero renderer starts only after a user requests it. Desktop retains the live sculpture. Scene code loads dynamically, scenes initialize near the viewport, pixel ratio is capped, and rendering pauses off-screen and in hidden tabs.

## Content and external links

Content was checked against the owner's brief, inspected project documentation and public AllBee/GitHub sources. Active, experimental, private, client, in-development, planned and concept states are explicit. No revenue, customer counts, awards or trading results were added.

AllBee, HajiHaz AI and GitHub returned successful public responses during verification. The independent RKN site's HTTPS endpoint failed TLS; its external CTA is withheld while the local case study remains functional. No private JARVIS endpoint or unverified personal social profile is exposed.

## Release criteria

Release only to the existing HAJIHAZ Vercel project. Commit scoped files, stage the production build without moving domains, verify the staged response, then promote the verified deployment and inspect the public production alias. Preserve the unrelated working-tree change in next-env.d.ts. Retain the old commit as the recovery point. No force push and no changes to the separate HajiHaz AI application.

## Practical limits

Browser device emulation was used; no physical-device or real-user field measurements were available. The H sculpture and project worlds are original procedural visuals rather than documentary product screenshots. An owner-approved portrait, verified personal social profiles and approved real project screenshots are optional future content additions.
