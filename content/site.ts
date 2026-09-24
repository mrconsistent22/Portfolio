import type { Site } from "@/lib/schemas";

export const siteData: Site = {
  name: "{{FULL_NAME}}",
  headline: "{{ROLE}} specializing in {{SPECIALTY}}",
  subheadline: "I build {{WHAT}} for {{WHO}}.",
  location: "{{CITY, COUNTRY}}",
  timezone: "UTC",
  city: "{{CITY}}",
  email: "contact@example.com",
  photo: {
    src: "/images/profile.jpg",
    alt: "{{FULL_NAME}} portrait",
    width: 800,
    height: 1000,
  },
  resumeUrl: "/resume.pdf",
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/mrconsistent22",
      label: "GitHub Profile",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/{{USERNAME}}",
      label: "LinkedIn Profile",
    },
    {
      platform: "Email",
      url: "mailto:contact@example.com",
      label: "Email Direct",
    },
  ],
  seo: {
    title: "{{FULL_NAME}} — {{ROLE}}",
    description: "Portfolio of {{FULL_NAME}}, {{ROLE}} specializing in {{SPECIALTY}}.",
    ogImage: "/images/og-default.jpg",
  },
  nav: [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Coding", href: "#coding" },
    { label: "Contact", href: "#contact" },
  ],
};
