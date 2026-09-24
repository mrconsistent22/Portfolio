# Developer Portfolio Website

An art-directed, editorial personal portfolio website for a software developer. Built with Next.js (App Router), TypeScript (strict mode), Tailwind CSS, and Zod-validated content models.

## 🛠 Tech Stack

- **Framework:** Next.js 16 (React 19, App Router, React Server Components)
- **Language:** TypeScript (Strict mode enabled, zero `any`)
- **Styling:** Tailwind CSS (v4) with CSS variable design tokens
- **Primitives:** Custom CVA components & Radix UI primitives
- **Animation:** Motion (`motion`)
- **Icons:** Lucide React (`lucide-react`)
- **Themes:** `next-themes` (Dark "Ink" & Light "Paper")
- **Validation:** Zod (`zod`) schemas executed at build time
- **Package Manager:** `pnpm` (v12)
- **Quality:** ESLint, Prettier, TypeScript compiler, GitHub Actions CI

---

## 🚀 Getting Started

### Prerequisites
- Node.js LTS (v20+ or v22+)
- `pnpm` (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/mrconsistent22/Portfolio.git
cd Portfolio

# Install dependencies
pnpm install
```

### Development Server

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Quality Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Starts Next.js development server with hot reloading |
| `pnpm build` | Compiles production bundle and executes build-time Zod content validation |
| `pnpm typecheck` | Runs `tsc --noEmit` across all `.ts` and `.tsx` files in strict mode |
| `pnpm lint` | Runs ESLint |
| `pnpm format` | Formats all code files with Prettier and Tailwind plugin |
| `pnpm format:check` | Verifies code formatting rules |

---

## 📂 Content Management

All personal and professional information is decoupled from UI components and stored in typed, Zod-validated files inside `/content`:

- `content/site.ts`: Name, headline, bio, contact details, social links, navigation
- `content/highlights.ts`: Key quantified proof points and metrics
- `content/projects.ts`: Project case studies, tags, repo/live links, and outcomes
- `content/skills.ts`: Typographic skill categories and technology listings
- `content/experience.ts`: Professional work experience timeline
- `content/education.ts`: Degrees, institutions, and academic coursework
- `content/certifications.ts`: Verified credentials, issuers, and verification links
- `content/achievements.ts`: Awards, competition wins, and recognitions
- `content/coding-profiles.ts`: Platform handles and statistics (LeetCode, Codeforces, GitHub, etc.)
- `content/testimonials.ts`: Recommendations and quotes (auto-hides when empty)

> **Build Safety:** If any field in `/content` violates its schema in `lib/schemas.ts`, `pnpm build` immediately fails with a descriptive validation error pointing to the exact file and field.
