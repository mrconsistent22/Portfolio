import type { Project } from "@/lib/schemas";

export const projectsData: Project[] = [
  {
    slug: "distributed-cache-layer",
    title: "Distributed Memory Cache",
    tagline: "Low-latency in-memory cache system handling high read volumes",
    description:
      "Legacy database calls caused 800ms API p99 latency during peak loads. Designed a distributed caching cluster that reduced response times to under 15ms.",
    role: "Lead Systems Engineer",
    timeframe: "4 months",
    year: "2025",
    featured: true,
    thumbnail: {
      src: "/images/projects/distributed-cache.jpg",
      alt: "Distributed Cache architecture diagram thumbnail",
      width: 1200,
      height: 750,
    },
    tags: ["Go", "Redis", "gRPC", "Docker", "Prometheus"],
    liveUrl: "https://example.com/demo",
    repoUrl: "https://github.com/mrconsistent22/distributed-cache",
    metrics: [
      { label: "p99 Latency", value: "12ms" },
      { label: "Throughput", value: "45k req/s" },
      { label: "Cost Reduction", value: "38%" },
    ],
    order: 1,
  },
  {
    slug: "stream-processing-pipeline",
    title: "Real-time Telemetry Pipeline",
    tagline: "High-throughput log and metrics ingestion engine",
    description:
      "Event ingestion was dropping up to 4% of traffic during spike windows. Implemented a partitioned stream pipeline with zero packet loss across 20M daily events.",
    role: "Backend Architect",
    timeframe: "3 months",
    year: "2024",
    featured: false,
    thumbnail: {
      src: "/images/projects/telemetry-pipeline.jpg",
      alt: "Stream processing pipeline dashboard thumbnail",
      width: 1200,
      height: 750,
    },
    tags: ["Rust", "Apache Kafka", "PostgreSQL", "ClickHouse"],
    liveUrl: "https://example.com/telemetry",
    repoUrl: "https://github.com/mrconsistent22/telemetry-pipeline",
    metrics: [
      { label: "Daily Events", value: "20M" },
      { label: "Data Loss", value: "0.00%" },
    ],
    order: 2,
  },
  {
    slug: "developer-workflow-cli",
    title: "DevOps Orchestration CLI",
    tagline: "Automated container builds and ephemeral environment provisioning",
    description:
      "Onboarding new developers took 2 full days due to manual environment setup. Built a single binary CLI that provisioned full local staging in under 90 seconds.",
    role: "Tools Engineer",
    timeframe: "2 months",
    year: "2024",
    featured: false,
    thumbnail: {
      src: "/images/projects/devops-cli.jpg",
      alt: "CLI terminal interface snapshot",
      width: 1200,
      height: 750,
    },
    tags: ["TypeScript", "Node.js", "Docker", "Kubernetes"],
    liveUrl: "https://example.com/cli",
    repoUrl: "https://github.com/mrconsistent22/devops-cli",
    metrics: [
      { label: "Setup Time", value: "< 90s" },
      { label: "Engineer Adoption", value: "100%" },
    ],
    order: 3,
  },
];
