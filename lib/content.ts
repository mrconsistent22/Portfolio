import {
  SiteSchema,
  HighlightSchema,
  ProjectSchema,
  SkillGroupSchema,
  ExperienceSchema,
  EducationSchema,
  CertificationSchema,
  AchievementSchema,
  CodingProfileSchema,
  TestimonialSchema,
  type Site,
  type Highlight,
  type Project,
  type SkillGroup,
  type Experience,
  type Education,
  type Certification,
  type Achievement,
  type CodingProfile,
  type Testimonial,
} from "./schemas";

import { siteData } from "@/content/site";
import { highlightsData } from "@/content/highlights";
import { projectsData } from "@/content/projects";
import { skillsData } from "@/content/skills";
import { experienceData } from "@/content/experience";
import { educationData } from "@/content/education";
import { certificationsData } from "@/content/certifications";
import { achievementsData } from "@/content/achievements";
import { codingProfilesData } from "@/content/coding-profiles";
import { testimonialsData } from "@/content/testimonials";

import type { ZodType, ZodIssue } from "zod";

function validateData<T>(schema: ZodType<T>, data: unknown, source: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((err: ZodIssue) => `  - [${err.path.join(".") || "root"}]: ${err.message}`)
      .join("\n");
    throw new Error(`[Content Validation Error] in "${source}":\n${errorDetails}`);
  }
  return result.data;
}

export function getSiteData(): Site {
  return validateData(SiteSchema, siteData, "content/site.ts");
}

export function getHighlights(): Highlight[] {
  return highlightsData
    .map((h, i) => validateData(HighlightSchema, h, `content/highlights.ts [index ${i}]`))
    .sort((a, b) => a.order - b.order);
}

export function getProjects(): Project[] {
  return projectsData
    .map((p, i) => validateData(ProjectSchema, p, `content/projects.ts [index ${i}]`))
    .sort((a, b) => a.order - b.order);
}

export function getSkills(): SkillGroup[] {
  return skillsData.map((s, i) => validateData(SkillGroupSchema, s, `content/skills.ts [index ${i}]`));
}

export function getExperience(): Experience[] {
  return experienceData.map((e, i) => validateData(ExperienceSchema, e, `content/experience.ts [index ${i}]`));
}

export function getEducation(): Education[] {
  return educationData.map((ed, i) => validateData(EducationSchema, ed, `content/education.ts [index ${i}]`));
}

export function getCertifications(): Certification[] {
  return certificationsData.map((c, i) => validateData(CertificationSchema, c, `content/certifications.ts [index ${i}]`));
}

export function getAchievements(): Achievement[] {
  return achievementsData.map((a, i) => validateData(AchievementSchema, a, `content/achievements.ts [index ${i}]`));
}

export function getCodingProfiles(): CodingProfile[] {
  return codingProfilesData.map((cp, i) => validateData(CodingProfileSchema, cp, `content/coding-profiles.ts [index ${i}]`));
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.map((t, i) => validateData(TestimonialSchema, t, `content/testimonials.ts [index ${i}]`));
}

// Build-time validation trigger to verify all content files immediately
export function validateAllContent() {
  getSiteData();
  getHighlights();
  getProjects();
  getSkills();
  getExperience();
  getEducation();
  getCertifications();
  getAchievements();
  getCodingProfiles();
  getTestimonials();
}

// Auto-run validation upon module load so any build/SSR with invalid content fails immediately
validateAllContent();
