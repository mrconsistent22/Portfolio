import { z } from "zod";

// Helper for URL or valid relative/anchor/mailto path
const urlOrPathSchema = z.string().refine(
  (val) => {
    if (!val) return false;
    if (val.startsWith("/") || val.startsWith("#") || val.startsWith("mailto:")) return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  },
  { message: "Must be a valid URL, relative path (/), anchor (#), or mailto link" }
);

export const SocialLinkSchema = z.object({
  platform: z.string().min(1),
  url: urlOrPathSchema,
  label: z.string().min(1),
});

export const NavItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const ImageAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export const SiteSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  location: z.string().min(1),
  timezone: z.string().default("UTC"),
  city: z.string().default("{{CITY}}"),
  email: z.string().min(1),
  photo: ImageAssetSchema,
  resumeUrl: urlOrPathSchema,
  socials: z.array(SocialLinkSchema),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    ogImage: z.string().min(1),
  }),
  nav: z.array(NavItemSchema),
});

export const MetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const HighlightSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  order: z.number(),
});

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  role: z.string().min(1),
  timeframe: z.string().min(1),
  year: z.string().default("2025"),
  featured: z.boolean(),
  thumbnail: ImageAssetSchema,
  tags: z.array(z.string().min(1)),
  liveUrl: urlOrPathSchema.optional(),
  repoUrl: urlOrPathSchema.optional(),
  videoUrl: urlOrPathSchema.optional(),
  metrics: z.array(MetricSchema),
  order: z.number(),
});

export const SkillItemSchema = z.object({
  name: z.string().min(1),
  icon: z.string().optional(),
  level: z.string().optional(),
});

export const SkillGroupSchema = z.object({
  category: z.string().min(1),
  items: z.array(SkillItemSchema),
});

export const ExperienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1), // ISO date or "Present"
  bullets: z.array(z.string().min(1)).min(2).max(4),
  tech: z.array(z.string().min(1)),
  companyUrl: urlOrPathSchema.optional(),
});

export const EducationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  grade: z.string().optional(),
  highlights: z.array(z.string().min(1)),
});

export const CertificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  issueDate: z.string().min(1),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  verifyUrl: urlOrPathSchema.optional(),
  category: z.string().min(1),
  badge: ImageAssetSchema.optional(),
  featured: z.boolean().optional(),
});

export const AchievementSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().optional(),
  date: z.string().min(1),
  description: z.string().optional(),
  link: urlOrPathSchema.optional(),
  icon: z.string().optional(),
});

export const CodingPlatformEnum = z.enum([
  "github",
  "leetcode",
  "codeforces",
  "codechef",
  "hackerrank",
  "geeksforgeeks",
  "kaggle",
  "other",
]);

export const CodingProfileSchema = z.object({
  platform: CodingPlatformEnum,
  username: z.string().min(1),
  profileUrl: urlOrPathSchema,
  stats: z.array(MetricSchema),
  badge: z.string().optional(),
  lastUpdated: z.string().min(1),
  autoFetch: z.boolean().optional(),
});

export const TestimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().optional(),
  avatar: z.string().optional(),
  link: urlOrPathSchema.optional(),
});

// Inferred Types
export type Site = z.infer<typeof SiteSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type Highlight = z.infer<typeof HighlightSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type CodingPlatform = z.infer<typeof CodingPlatformEnum>;
export type CodingProfile = z.infer<typeof CodingProfileSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
