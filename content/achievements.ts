import type { Achievement } from "@/lib/schemas";

export const achievementsData: Achievement[] = [
  {
    title: "1st Place Winner — National Cloud Hackathon",
    issuer: "TechFest Innovation Summit",
    date: "2024",
    description:
      "Engineered an automated disaster response telemetry dispatch system with sub-second incident categorization.",
    link: "https://example.com/hackathon-win",
  },
  {
    title: "Global Rank Top 2% — LeetCode Biweekly Contest",
    issuer: "LeetCode",
    date: "2023",
    description:
      "Solved 4/4 algorithmic graph theory and dynamic programming challenges under competition time constraints.",
    link: "https://leetcode.com/mrconsistent22",
  },
  {
    title: "Open Source Contributor of the Quarter",
    issuer: "OpenDev Foundation",
    date: "2023",
    description:
      "Maintained and improved TypeScript definitions and bug fixes for popular ecosystem libraries.",
    link: "https://github.com/mrconsistent22",
  },
];
