import type { Experience } from "@/lib/schemas";

export const experienceData: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp",
    companyUrl: "https://example.com",
    location: "Remote / {{CITY}}",
    type: "Full-time",
    start: "2023-03",
    end: "Present",
    bullets: [
      "Architected event-driven microservices that reduced data sync latency across 4 core business domains by 65%.",
      "Mentored a team of 6 engineers on TypeScript strict patterns and continuous delivery automation.",
      "Optimized cold-start cloud functions, reducing customer checkout drop-off rate by 18%.",
    ],
    tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "Starlight Labs",
    companyUrl: "https://example.com",
    location: "{{CITY, COUNTRY}}",
    type: "Full-time",
    start: "2021-06",
    end: "2023-02",
    bullets: [
      "Engineered real-time dashboard analytics processing over 5M user transactions daily.",
      "Replaced monolith database queries with Redis-backed read caches, cutting peak p95 latency from 450ms to 40ms.",
      "Co-authored internal component library adopted across 3 engineering divisions.",
    ],
    tech: ["React", "TypeScript", "Go", "Redis", "Docker"],
  },
  {
    role: "Junior Developer",
    company: "Nexus Technologies",
    companyUrl: "https://example.com",
    location: "{{CITY, COUNTRY}}",
    type: "Internship",
    start: "2020-08",
    end: "2021-05",
    bullets: [
      "Constructed REST APIs and integrated Stripe webhooks for recurring subscription billing.",
      "Automated end-to-end regression test suites with Playwright, catching 40+ pre-release bugs.",
    ],
    tech: ["JavaScript", "Node.js", "Express", "MongoDB", "Jest"],
  },
];
