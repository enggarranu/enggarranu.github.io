import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";

const highlights = [
  "Incident response and practical troubleshooting",
  "SLIs/SLOs, alerting, and operational excellence",
  "Capacity planning and performance analysis",
  "Database performance tuning with safe change management",
];

export default function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="ABOUT" title="SRE with a DBA background">
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-sm leading-7 text-white/75">
              I’m Enggar, a Site Reliability Engineer and former Database Administrator. I enjoy making systems stable,
              observable, and easy to operate—while keeping latency low and costs reasonable.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/75">
              My work sits at the intersection of production operations and database engineering: I tune queries, design
              indexing strategies, analyze slow queries, and help teams ship migrations safely.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={120} className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="text-xs font-medium tracking-widest text-white/50">HIGHLIGHTS</div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#93C5FD]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
