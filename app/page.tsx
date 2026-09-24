import { getSiteData, getHighlights, getProjects } from "@/lib/content";

export default function Home() {
  const site = getSiteData();
  const highlights = getHighlights();
  const projects = getProjects();

  return (
    <main className="min-h-screen bg-[#F3EFE7] dark:bg-[#12110F] text-[#15130F] dark:text-[#EDE8DD] px-6 py-16 max-w-4xl mx-auto flex flex-col justify-center">
      <div className="border border-[#D8D1C2] dark:border-[#2C2924] p-8 md:p-12 space-y-8 bg-[#EBE5D8]/40 dark:bg-[#1A1815]/40">
        <div className="flex items-center justify-between border-b border-[#D8D1C2] dark:border-[#2C2924] pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#6B655A] dark:text-[#9A9384]">
            Portfolio Skeleton / Phase 00
          </span>
          <span className="font-mono text-xs text-[#E4472B] dark:text-[#FF6A4D] flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E4472B] dark:bg-[#FF6A4D] animate-pulse" />
            Foundations Ready
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight">
            {site.name}
          </h1>
          <p className="text-lg md:text-xl text-[#6B655A] dark:text-[#9A9384]">
            {site.headline}
          </p>
          <p className="font-mono text-xs text-[#6B655A] dark:text-[#9A9384]">
            {site.subheadline} &bull; {site.location}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#D8D1C2] dark:border-[#2C2924]">
          {highlights.map((h) => (
            <div key={h.order} className="space-y-1">
              <span className="font-mono text-2xl md:text-3xl font-bold text-[#E4472B] dark:text-[#FF6A4D]">
                {h.value}
              </span>
              <p className="text-xs text-[#6B655A] dark:text-[#9A9384] leading-snug">
                {h.label}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#D8D1C2] dark:border-[#2C2924] flex items-center justify-between text-xs font-mono text-[#6B655A] dark:text-[#9A9384]">
          <span>Validated Projects: {projects.length} loaded</span>
          <span>Next step: Phase 1 Layout Shell</span>
        </div>
      </div>
    </main>
  );
}
