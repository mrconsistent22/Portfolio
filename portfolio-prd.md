# Product Requirements Document: Personal Portfolio Website

**Version:** 1.0
**Status:** Ready for implementation
**Audience:** The developer (owner) and any AI coding tool used to build the project

---

## 0. How to use this document (instructions for the AI tool)

Read this whole document before writing code. Then follow these rules:

1. **Build in phases.** Implement ONLY the phase the user asks for (Section 12). Do not build later phases early. After finishing a phase, summarize what was done, list any deviations, and **stop and wait** for approval.
2. **Do not invent content.** All personal content (name, bio, projects, experience, links) comes from the data files in `/content`. Use the placeholders in Section 13 until real data is provided.
3. **Do not add dependencies** beyond the stack in Section 5 without asking first.
4. **Default to Server Components.** Use `"use client"` only where interactivity requires it (theme toggle, mobile menu, animations, contact form UI).
5. **TypeScript strict mode. No `any`.** Validate all content with the Zod schemas in Section 7.
6. **Accessibility and performance are requirements, not extras** (Section 10).
7. **Keep components small and reusable.** No section component should exceed ~200 lines. Extract subcomponents.
8. **Each phase must end in a working, deployable state** (`pnpm build` passes, lint passes, no console errors).
9. Check the latest stable versions of each tool when scaffolding, and use the latest patch of Next.js (security patches are released regularly).

Suggested prompt to start a phase:
> "Read `portfolio-prd.md`. Implement **Phase N** only, exactly as specified, including its acceptance criteria. Do not start other phases. When done, summarize and stop."

---

## 1. Product overview

A fast, accessible, single-page personal portfolio for a software developer, with separate pages for detailed project case studies (and an optional blog). It presents the owner's work, skills, experience, education, certifications, achievements, coding profiles, and GitHub activity, and makes it very easy to download a resume or make contact.

**One-line pitch:** "A recruiter should know who I am, see proof I can do the work, and be able to contact me or download my resume within 30 seconds."

## 2. Goals and non-goals

### Goals
- Convert visitors (recruiters, hiring managers, clients) into contacts or resume downloads.
- Show proof: live demos, code links, metrics, coding profiles, certifications.
- Load fast and look excellent on mobile.
- Be easy to update: all content lives in data files, not in components.
- Serve as a portfolio piece itself (clean code, tests, CI).

### Non-goals (do NOT build)
- No CMS, database, authentication, or admin panel.
- No heavy 3D/WebGL scenes.
- No global state library (Redux, etc.).
- No user accounts, comments, or payments.
- No AI chatbot (may be considered in a future version).

## 3. Target users and their questions

| User | Main question | What the site must provide |
|---|---|---|
| Recruiter / hiring manager | "Is this person relevant and credible?" | Clear headline, projects with proof, resume button, certifications, achievements |
| Engineering manager | "Can they code well?" | Case studies, GitHub, code links, coding profile stats |
| Freelance client | "Can they solve my problem?" | Outcomes, testimonials, easy contact |
| Peer developer | "What have they built or written?" | Projects archive, blog (optional), GitHub |

## 4. Success metrics

- Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices, SEO.
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
- Resume button visible without scrolling on desktop and mobile.
- Contact form delivers email successfully in testing.
- Zero build, lint, type, or test errors on `main`.

## 5. Tech stack (final)

| Layer | Choice |
|---|---|
| Framework | Next.js (latest stable, App Router), React, Node.js LTS |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui (add only components that are used) |
| Animation | Motion (Framer Motion), subtle only |
| Icons | Lucide React (plus simple-icons for brand logos if needed) |
| Theming | next-themes (dark default, light toggle) |
| Fonts | `next/font` (one sans + optional one display font) |
| Content | MDX for case studies/blog, typed `data` files for everything else |
| Validation | Zod |
| Email | Resend, called from a Next.js server action |
| Analytics | Vercel Analytics or Plausible |
| Package manager | pnpm |
| Quality | ESLint, Prettier, Husky + lint-staged, Playwright, axe, Lighthouse CI |
| CI/CD | GitHub Actions, Vercel |
| Updates | Dependabot |

## 6. Architecture

### 6.1 High-level

```
Browser
  │
  ▼
Vercel (Next.js on Node runtime)
  ├── Static/pre-rendered pages: /, /projects/[slug], /blog/[slug]
  ├── Server action: submitContact()  ──► Resend API ──► owner's inbox
  ├── Server-side data fetch (cached/ISR): GitHub API
  └── Static assets: resume.pdf, images, llms.txt, favicon
```

- The site is **mostly static**. Pages are pre-rendered at build time.
- The only dynamic server logic: the **contact form** and the **GitHub data fetch** (revalidated periodically).
- **No database.** Content is in files inside the repository.

### 6.2 Rendering strategy
- Home page: statically rendered; GitHub section uses server-side fetch with `revalidate` (e.g. 3600 s) and a static fallback.
- Case study and blog pages: statically generated from MDX using `generateStaticParams`.
- Interactive pieces (theme toggle, mobile menu, filters, form UI, scroll animations) are small client components.

### 6.3 Folder structure

```
/
├─ app/
│  ├─ layout.tsx                 # fonts, theme provider, metadata, navbar, footer
│  ├─ page.tsx                   # home: composes all sections in order
│  ├─ globals.css                # tokens (CSS variables), Tailwind layers
│  ├─ projects/[slug]/page.tsx   # case study page
│  ├─ blog/page.tsx              # (optional, Phase 6) blog list
│  ├─ blog/[slug]/page.tsx       # (optional) blog post
│  ├─ opengraph-image.tsx        # default OG image
│  ├─ projects/[slug]/opengraph-image.tsx
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ not-found.tsx
│  └─ actions/contact.ts         # server action
├─ components/
│  ├─ layout/    Navbar, MobileMenu, Footer, ThemeToggle, ResumeButton, SectionWrapper, ScrollProgress
│  ├─ sections/  Hero, Highlights, Projects, Skills, About, Experience, Education,
│  │             Certifications, Achievements, CodingProfiles, GitHubActivity,
│  │             Testimonials, Writing, Contact
│  ├─ ui/        shadcn primitives + Button, Card, Badge, Tag, Tooltip, Dialog
│  └─ shared/    SectionHeading, ProjectCard, TimelineItem, StatCard, SocialLinks, Reveal
├─ content/
│  ├─ site.ts                    # name, headline, photo, links, SEO defaults, nav
│  ├─ projects.ts                # metadata for all projects
│  ├─ skills.ts
│  ├─ experience.ts
│  ├─ education.ts
│  ├─ certifications.ts
│  ├─ achievements.ts
│  ├─ coding-profiles.ts
│  ├─ testimonials.ts
│  ├─ projects/*.mdx             # case study bodies
│  └─ blog/*.mdx                 # optional
├─ lib/
│  ├─ schemas.ts                 # Zod schemas
│  ├─ content.ts                 # typed loaders/validators
│  ├─ github.ts                  # GitHub API client + fallback
│  ├─ mdx.ts                     # MDX loading utilities
│  ├─ seo.ts                     # metadata + JSON-LD helpers
│  └─ utils.ts
├─ public/
│  ├─ images/profile.jpg         # OWNER PHOTO (see 8.2)
│  ├─ images/projects/*
│  ├─ images/certs/*             # optional badge images
│  ├─ resume.pdf
│  ├─ llms.txt
│  └─ favicon assets
├─ tests/                        # Playwright specs
├─ .github/workflows/ci.yml
├─ .env.example
└─ README.md
```

### 6.4 Data flow
1. Content files export typed arrays/objects.
2. `lib/content.ts` validates them with Zod at build time (build fails on bad data).
3. Section components receive data as props from `app/page.tsx` (server component).
4. GitHub data is fetched in `lib/github.ts` on the server; on failure, fall back to values in `content/coding-profiles.ts`.

## 7. Data models (Zod schemas, implement in `lib/schemas.ts`)

```ts
Site        { name, headline, subheadline, location, email, photo{src,alt},
              resumeUrl, socials[{platform,url,label}], seo{title,description,ogImage},
              nav[{label,href}] }

Project     { slug, title, tagline, description, role, timeframe, featured:boolean,
              thumbnail{src,alt}, tags[], liveUrl?, repoUrl?, videoUrl?,
              metrics[{label,value}], order:number }
              // Long-form body lives in content/projects/<slug>.mdx

SkillGroup  { category, items[{name, icon?, level?}] }

Experience  { role, company, location, type, start, end|"Present",
              bullets[] (result-focused, 2-4), tech[] , companyUrl? }

Education   { degree, institution, location, start, end, grade?, highlights[] }

Certification { title, issuer, issueDate, expiryDate?, credentialId?,
                verifyUrl?, category, badge?{src,alt}, featured?:boolean }

Achievement { title, issuer?, date, description?, link?, icon? }

CodingProfile { platform, username, profileUrl, stats[{label,value}],
                badge?, lastUpdated, autoFetch?:boolean }
                // platform: "github"|"leetcode"|"codeforces"|"codechef"|
                //           "hackerrank"|"geeksforgeeks"|"kaggle"|"other"

Testimonial { quote, name, role, company?, avatar?, link? }
```

Rules: dates as ISO strings; all URLs validated; images must have alt text; `order` controls sorting.

## 8. Features and requirements

### 8.1 Page section order (home page)

| # | Section | Purpose |
|---|---|---|
| 1 | **Navbar** (sticky) | Navigation, theme toggle, **Resume** button |
| 2 | **Hero (with owner's photo)** | Who am I, what do I do, primary actions |
| 3 | **Highlights strip** | 3-4 quick proof points |
| 4 | **Featured Projects** | Best 3-5 projects, links to case studies |
| 5 | **Skills** | Grouped, scannable |
| 6 | **About** | Short personal story + fun facts |
| 7 | **Experience** | Timeline of professional work |
| 8 | **Education** | Compact cards (separate from Experience) |
| 9 | **Certifications** | Verified credentials with links |
| 10 | **Achievements** | Awards, rankings, wins, measurable results |
| 11 | **Coding Profiles and GitHub** | Proof of coding activity |
| 12 | **Testimonials** | Third-party validation |
| 13 | **Writing** (optional) | Blog/articles |
| 14 | **Contact + Footer** | Final call to action |

### 8.2 Hero (with photo)
- Left/top: small greeting, **name**, **headline** (role + specialty), one-line subheadline, short location/availability tag (e.g. "Open to opportunities").
- Buttons: **View Work** (scroll to Projects), **Contact Me** (scroll to Contact), **Download Resume** (secondary style).
- Row of social icons (GitHub, LinkedIn, email, plus coding platforms).
- **Owner's photo:**
  - File: `public/images/profile.jpg` (source at least 800×800; square or 4:5 crop; face centered).
  - Render with `next/image`, `priority`, explicit `width`/`height`, `sizes`, and a blur placeholder. It is the LCP element, so it must not cause layout shift.
  - Styled with a rounded/organic mask or soft border with an accent-color glow that works in both themes.
  - Descriptive `alt` text (from `site.photo.alt`).
  - Desktop: photo on the right; mobile: photo above or beside the name, smaller, so the buttons stay visible without scrolling.
  - Provide a neutral placeholder image until the real photo is added.

### 8.3 Navbar
- Sticky, subtle blur/background on scroll.
- Links: Work, About, Experience, Education, Certifications, Coding, Contact (anchor scroll with active-section highlighting).
- **Resume button** on the far right, visually distinct; opens/downloads `/resume.pdf` (`download` attribute, filename `Firstname-Lastname-Resume.pdf`).
- Theme toggle. Mobile: hamburger menu with full-screen or slide-in panel; Resume button remains reachable.
- Scroll progress indicator (thin bar), optional.

### 8.4 Highlights strip
- 3-4 stat cards (e.g. years of experience, projects shipped, certifications, top award). Numbers can count up on first view (respect `prefers-reduced-motion`).

### 8.5 Featured Projects
- Cards: thumbnail, title, one-line outcome, tech tags, role, **Live Demo** and **Code** buttons, "Read case study" link.
- Featured grid (bento-style: first project larger) for 3-5 items.
- "More projects" archive (compact table/list or expandable) for smaller work.
- Optional tag filter (client component).
- **Case study page** (`/projects/[slug]`):
  - Overview box at the top: Role, Timeframe, Tech, Goal, **Key outcomes (metrics)**, Live/Code links.
  - Body (MDX): Problem, Approach, Architecture/diagram, Challenges and decisions, Result, What I'd improve.
  - Image/video gallery, next/previous project navigation, "Contact me" CTA.

### 8.6 Skills
- Grouped by category (Languages, Frontend, Backend, Databases, DevOps/Tools, Others). Chips with optional icons. No fake percentage bars.

### 8.7 About
- Short story (100-150 words), what I care about, a few fun facts, optional secondary photo. Link to resume.

### 8.8 Experience
- Vertical timeline. Each item: role, company, dates, location, 2-4 result-focused bullets (numbers where possible), tech tags. Internships and freelance count.

### 8.9 Education (separate section)
- Compact cards: degree, institution, years, grade, notable coursework/highlights.

### 8.10 Certifications (new)
- Card grid: title, issuer, issue date, expiry (if any), credential ID, **Verify** link, optional badge image.
- Category filter chips (e.g. Cloud, Web, Data, Programming) as a small client component.
- Show the top 6 by default with a "Show all" toggle.
- Sorted by `featured` then newest first.

### 8.11 Achievements
- Card grid or timeline: icon, title, issuer, date, one-line description, optional proof link. Lead with the strongest. Distinct from Certifications (this is for awards, hackathons, rankings, publications, measurable wins).

### 8.12 Coding Profiles and GitHub (new)
Two parts in one section:

**A. Coding profile cards** (from `content/coding-profiles.ts`)
- One card per platform (LeetCode, Codeforces, CodeChef, HackerRank, GeeksforGeeks, Kaggle, etc.).
- Each shows logo, username, 2-3 key stats (e.g. problems solved, rating, rank, badges), and a **Visit profile** link.
- Stats are **manually maintained** in the data file with a `lastUpdated` date. Do NOT scrape sites or rely on unofficial APIs by default. (An optional, feature-flagged auto-fetch may be added later, always with the static values as fallback.)

**B. GitHub activity** (from GitHub API, server-side)
- Summary: public repos, followers, total stars, top languages.
- **Contribution graph** (last 12 months, via GraphQL `contributionsCollection`).
- **Pinned/featured repositories** (name, description, stars, language, link).
- Fetched on the server with `GITHUB_TOKEN`, cached (`revalidate` ≈ 1 hour).
- **Graceful fallback:** if the API fails or the token is missing, show static values from the data file or hide the affected widgets. The build must never fail because of GitHub.
- The token is never exposed to the browser.

### 8.13 Testimonials
- 1-3 quote cards (name, role, company, optional avatar/link). Section hidden if the array is empty.

### 8.14 Writing (optional)
- Latest 3 posts (title, date, excerpt, reading time) linking to `/blog/[slug]`. Section hidden if no posts.

### 8.15 Contact and footer
- Email link (with copy-to-clipboard button), **contact form** (name, email, message), social links, availability note, repeat **Download Resume** button.
- Form behavior: Zod validation on client and server, honeypot field, minimum-time-to-submit check, loading, success and error states, no page reload. Sends via Resend to `CONTACT_TO_EMAIL`. Optional: rate limiting (e.g. Upstash Ratelimit) and Cloudflare Turnstile if spam appears.
- Footer: copyright, social links, "Back to top".

### 8.16 Global features
- Dark (default) and light themes with no flash on load; respects system preference.
- Smooth anchor scrolling; scroll-reveal animations (subtle, disabled for reduced motion).
- Custom 404 page.
- Analytics (privacy-friendly, no cookie banner).
- `llms.txt`, sitemap, robots, JSON-LD `Person` schema, dynamic Open Graph images.

## 9. Design specification

- **Style:** clean, modern, content-first. Bento-style grids for Projects/Highlights. Bold typography for headings.
- **Themes:** dark default with one accent color; light theme alternative. Define all colors as CSS variables/tokens (background, surface, border, text, muted, accent, accent-foreground).
- **Suggested tokens (owner may change):** accent `#6366f1` (indigo) or `#22d3ee` (cyan); dark background `#0b0d12`; surface `#12151c`; light background `#fafafa`.
- **Typography:** one clean sans (e.g. Inter or Geist) for body; optional display font for headings. Fluid heading sizes (`clamp`).
- **Spacing:** consistent 4/8 px scale; section vertical padding ~80-120 px desktop, ~56-72 px mobile; max content width ~1100-1200 px.
- **Motion:** 150-300 ms, ease-out; only fade/slide/scale on reveal and hover feedback. Respect `prefers-reduced-motion`.
- **Radius and elevation:** consistent rounded corners (e.g. 12-16 px), subtle borders over heavy shadows.
- **Responsive breakpoints:** mobile-first; check 360, 768, 1024, 1440 px.
- **Imagery:** optimized via `next/image`; short looping WebM/MP4 clips for demos instead of GIFs.

## 10. Non-functional requirements

- **Performance:** first load JS kept small; lazy-load below-the-fold sections and heavy widgets; no layout shift; images sized and modern format (AVIF/WebP); fonts via `next/font`.
- **Accessibility (WCAG 2.2 AA):** semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, logical heading order, visible focus states, keyboard-operable menu and filters, color contrast ≥ 4.5:1, alt text on images, "skip to content" link, ARIA only where needed, reduced-motion support.
- **SEO:** unique title/description per page, canonical URLs, Open Graph/Twitter cards, sitemap, robots, JSON-LD `Person`.
- **Security:** secrets only in environment variables; server-side validation; sanitize form input; no secrets in client bundles; keep Next.js and dependencies updated (Dependabot).
- **Privacy:** no third-party trackers requiring a cookie banner.
- **Browser support:** latest two versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome.
- **Maintainability:** typed content, small components, consistent naming, README with setup and update instructions.

## 11. Environment variables (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.dev
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
GITHUB_USERNAME=
GITHUB_TOKEN=            # read-only, public data scope
NEXT_PUBLIC_ANALYTICS_ID=   # optional
# Optional later: UPSTASH_REDIS_REST_URL / TOKEN, TURNSTILE_SITE_KEY / SECRET
```

## 12. Implementation phases

Each phase ends in a working, deployable state. Do not proceed to the next phase until the current one is approved.

### Phase 0: Project setup and foundations
**Goal:** A clean, deployable skeleton.
- Scaffold Next.js (App Router, TypeScript strict, Tailwind, ESLint) with pnpm.
- Add Prettier, Husky + lint-staged, `.env.example`, README, `.gitignore`.
- Set up folder structure from 6.3 (empty files where needed).
- Install and configure shadcn/ui, Motion, Lucide, next-themes, Zod.
- Create Zod schemas (`lib/schemas.ts`) and content files with **placeholder data** for every section.
- Add GitHub Actions CI (lint, typecheck, build).
- Deploy a "Hello" page to Vercel.

**Acceptance criteria:** `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm typecheck` all pass; CI is green; Vercel preview URL works; invalid content data fails the build with a clear error.

### Phase 1: Design system and layout shell
**Goal:** Global look and navigation.
- Design tokens (CSS variables) for dark/light themes; fonts via `next/font`; base typography.
- Build `SectionWrapper`, `SectionHeading`, `Button`, `Card`, `Badge`, `Reveal` (scroll animation).
- Build **Navbar** (sticky, active-section highlighting, theme toggle, **Resume button**), **MobileMenu**, **Footer**, skip-to-content link.
- Add `public/resume.pdf` placeholder.
- Home page renders empty section shells with headings in the correct order.

**Acceptance criteria:** theme toggles with no flash; nav links scroll to the right sections; Resume button downloads the file on desktop and mobile; menu is keyboard accessible; layout works at 360-1440 px.

### Phase 2: Hero (with photo) and Highlights
**Goal:** A strong first screen.
- Build Hero per 8.2 with the owner's photo (`next/image`, priority, blur placeholder), headline, buttons (View Work / Contact / Download Resume), socials, availability tag.
- Build Highlights strip with count-up numbers.
- Wire everything to `content/site.ts`.

**Acceptance criteria:** photo has no layout shift; LCP < 2.5 s on mobile throttling; all three buttons work; hero fits above the fold on common phone and laptop sizes; reduced-motion respected.

### Phase 3: Projects and case studies
**Goal:** Show proof.
- Build `ProjectCard`, featured bento grid, "More projects" archive, optional tag filter.
- Set up MDX pipeline and `/projects/[slug]` page with overview box, gallery, next/previous navigation, CTA.
- Add 2-3 placeholder case studies.
- Add per-project Open Graph image and metadata.

**Acceptance criteria:** pages are statically generated; MDX renders headings, images, code blocks, and callouts; overview box shows role/timeframe/tech/outcomes; live and code links open in a new tab with `rel="noopener noreferrer"`; 404 for unknown slugs.

### Phase 4: Skills, About, Experience, Education
**Goal:** The core story.
- Skills: grouped chips.
- About: story, fun facts, optional second photo.
- Experience: vertical timeline.
- Education: compact cards (separate section).

**Acceptance criteria:** all data renders from content files; timeline reads correctly on mobile; sections are semantic with proper heading levels; no hard-coded content in components.

### Phase 5: Certifications, Achievements, Coding Profiles and GitHub
**Goal:** Credibility and activity.
- Certifications: card grid, category filter, "Show all", verify links, optional badge images.
- Achievements: card grid/timeline with proof links.
- Coding Profiles: platform cards with manual stats and `lastUpdated`.
- GitHub Activity: server-side fetch (`lib/github.ts`), summary stats, contribution graph, pinned repos, caching, and **static fallback**.
- Add GitHub env vars and error handling.

**Acceptance criteria:** the build succeeds with and without `GITHUB_TOKEN`; the token never appears in client bundles; failures show fallback or hide widgets without errors; filters are keyboard accessible; all external links are valid.

### Phase 6: Testimonials, Writing (optional), Contact
**Goal:** Trust and conversion.
- Testimonials section (auto-hidden if empty).
- Optional blog: `/blog` list, `/blog/[slug]`, reading time, latest-3 preview on home (auto-hidden if empty).
- Contact: form with Zod, server action, Resend, honeypot, time check, states; copy-email button; repeat resume button.

**Acceptance criteria:** a real test email arrives in the inbox; invalid input shows clear errors; bots hitting the honeypot are silently rejected; form works without JavaScript errors and is fully keyboard/screen-reader usable.

### Phase 7: SEO, accessibility, performance, testing
**Goal:** Production quality.
- Metadata for all pages, sitemap, robots, `llms.txt`, JSON-LD `Person`, default and dynamic OG images.
- Accessibility audit with axe; fix issues; verify focus order and contrast in both themes.
- Performance pass: image sizes, lazy loading, bundle check, font loading.
- Playwright tests: home loads, nav scroll, resume download, theme toggle, project page loads, contact validation, 404.
- Lighthouse CI in GitHub Actions.

**Acceptance criteria:** Lighthouse mobile ≥ 90 in all four categories; axe reports no serious/critical issues; all Playwright tests pass in CI.

### Phase 8: Launch and polish
**Goal:** Go live.
- Replace all placeholders with real content, real photo, real resume.
- Connect custom domain, set production env vars, enable analytics and Dependabot.
- Test on real phones (iOS Safari, Android Chrome); verify link previews on LinkedIn/WhatsApp.
- Final README: how to update content, run tests, and deploy.

**Acceptance criteria:** production site live on the custom domain; no placeholder text anywhere; contact form and resume download verified in production; sitemap submitted to Google Search Console.

### Phase 9 (post-launch, optional)
- `/uses` and `/now` pages, project search, RSS feed, Cal.com booking link, optional auto-fetched coding-platform stats (feature-flagged with static fallback), Sentry, print-friendly `/resume` page, yearly design refresh with archived versions.

## 13. Placeholder content (use until real data is provided)

```
Name:            {{FULL_NAME}}
Headline:        {{ROLE}} specializing in {{SPECIALTY}}
Subheadline:     I build {{WHAT}} for {{WHO}}.
Location:        {{CITY, COUNTRY}}
Email:           {{EMAIL}}
Photo:           /images/profile.jpg  (neutral placeholder until replaced)
Resume:          /resume.pdf
Socials:         GitHub, LinkedIn, X/Twitter (optional), email
Coding profiles: LeetCode, Codeforces, CodeChef, HackerRank, GeeksforGeeks (fill username/stats)
Projects:        3 placeholder projects with tags, metrics, and short MDX case studies
Certifications:  4-6 placeholder entries (title, issuer, date, verify URL)
Achievements:    3-4 placeholder entries
Testimonials:    empty by default (section hidden)
```

**Owner to provide before Phase 8:** final photo, resume PDF, bio, project details and metrics, experience, education, certifications with verify links, achievements, coding-profile usernames and stats, GitHub username, domain name.

## 14. Testing and quality checklist (per phase)

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass
- [ ] No console errors or hydration warnings
- [ ] Works at 360, 768, 1024, 1440 px in both themes
- [ ] Keyboard navigation works; focus states visible
- [ ] Images have alt text and correct dimensions
- [ ] No hard-coded content in components
- [ ] No secrets in client code or committed files
- [ ] Commit message summarizes the phase

## 15. Risks and mitigations

| Risk | Mitigation |
|---|---|
| GitHub API rate limits or downtime | Server-side caching, token auth, static fallback, never fail the build |
| Coding platforms have no stable official APIs | Manual stats with `lastUpdated`; optional auto-fetch later behind a flag |
| Spam through the contact form | Honeypot, time check, Zod, optional rate limit/Turnstile |
| Heavy animation hurting performance | Subtle motion only; respect reduced motion; monitor Lighthouse in CI |
| Outdated content | Single source of truth in `/content`; `lastUpdated` fields; README update guide |
| Framework security issues | Dependabot; use latest patch releases |
| Scope creep | Strict phase gating; non-goals list (Section 2) |

## 16. Definition of done (whole project)

- All Phase 0-8 acceptance criteria met.
- Live on a custom domain with real content, photo, and resume.
- Lighthouse ≥ 90 mobile in every category; CI green.
- Contact form, resume download, GitHub section, certifications, and coding profiles verified in production.
- README explains setup, content updates, testing, and deployment.
