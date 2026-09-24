import type { CodingProfile } from "@/lib/schemas";

export const codingProfilesData: CodingProfile[] = [
  {
    platform: "github",
    username: "mrconsistent22",
    profileUrl: "https://github.com/mrconsistent22",
    stats: [
      { label: "Public Repos", value: "34" },
      { label: "Contributions", value: "850+" },
    ],
    lastUpdated: "2025-01-15",
  },
  {
    platform: "leetcode",
    username: "{{LEETCODE_USERNAME}}",
    profileUrl: "https://leetcode.com/u/{{LEETCODE_USERNAME}}",
    stats: [
      { label: "Solved", value: "420+" },
      { label: "Contest Rating", value: "1850" },
    ],
    lastUpdated: "2025-01-15",
  },
  {
    platform: "codeforces",
    username: "{{CODEFORCES_USERNAME}}",
    profileUrl: "https://codeforces.com/profile/{{CODEFORCES_USERNAME}}",
    stats: [
      { label: "Max Rating", value: "1480" },
      { label: "Rank", value: "Specialist" },
    ],
    lastUpdated: "2025-01-15",
  },
  {
    platform: "geeksforgeeks",
    username: "{{GFG_USERNAME}}",
    profileUrl: "https://auth.geeksforgeeks.org/user/{{GFG_USERNAME}}",
    stats: [
      { label: "Coding Score", value: "1200+" },
      { label: "Institute Rank", value: "#4" },
    ],
    lastUpdated: "2025-01-15",
  },
];
