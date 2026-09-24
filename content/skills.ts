import type { SkillGroup } from "@/lib/schemas";

export const skillsData: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Go" },
      { name: "Python" },
      { name: "SQL" },
      { name: "HTML / CSS" },
    ],
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "FastAPI" },
      { name: "gRPC" },
      { name: "REST APIs" },
      { name: "WebSockets" },
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "State Machines" },
      { name: "Web Accessibility (a11y)" },
    ],
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "MongoDB" },
      { name: "Prisma / Drizzle" },
      { name: "Query Optimization" },
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "AWS (S3, ECS, Lambda)" },
      { name: "GitHub Actions CI/CD" },
      { name: "Linux Administration" },
    ],
  },
];
