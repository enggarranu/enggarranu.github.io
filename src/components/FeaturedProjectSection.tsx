import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const blocks = {
  problem: [
    "Multiple components lived in separate workflows and lacked a single insight surface.",
    "Operational visibility was fragmented across teams and tools.",
  ],
  approach: [
    "Integrated components into a unified Risk Insight experience with clear ownership boundaries.",
    "Improved reliability signals, dashboards, and alert pathways for faster diagnosis.",
  ],
  impact: [
    "A clearer path from signal → investigation → action for engineers.",
    "More consistent reporting and easier collaboration across stakeholders.",
  ],
};

export default function FeaturedProjectSection() {
  const [open, setOpen] = useState(false);

  return (
    <SectionShell id="project" eyebrow="FEATURED PROJECT" title="Risk Insight">
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
              <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#60A5FA]/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-medium tracking-widest text-white/50">LATEST WORK</div>
                  <div className="mt-2 text-lg font-semibold text-white">Integrating components into Risk Insight</div>
                </div>
                <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-white/70">
                  SRE × DBA
                </div>
              </div>

              <p className="mt-3 text-sm leading-7 text-white/75">
                A focused integration effort to bring multiple pieces into one reliable surface—making it easier to
                understand risk, spot issues, and take action.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button as="button" type="button" variant="secondary" onClick={() => setOpen((v) => !v)}>
                  Read summary
                  <ChevronDown className={cn("h-4 w-4 transition", open ? "rotate-180" : "rotate-0")} />
                </Button>
                <Button href="#contact" variant="ghost">
                  Talk about reliability
                </Button>
              </div>

              <div
                className={cn(
                  "grid gap-4 overflow-hidden pt-0 transition-[max-height,opacity,padding] duration-500 motion-reduce:transition-none",
                  open ? "max-h-[520px] pt-6 opacity-100" : "max-h-0 opacity-0",
                )}
                aria-hidden={!open}
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <ProjectBlock title="Problem" items={blocks.problem} />
                  <ProjectBlock title="Approach" items={blocks.approach} />
                  <ProjectBlock title="Impact" items={blocks.impact} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={120} className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="text-xs font-medium tracking-widest text-white/50">STACK THEMES</div>
            <div className="mt-4 grid gap-3">
              <Tag label="Monitoring & alerting" />
              <Tag label="Performance and reliability" />
              <Tag label="Operational workflows" />
              <Tag label="Safe rollout & migrations" />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function ProjectBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="text-xs font-medium tracking-widest text-white/55">{title.toUpperCase()}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/75">
        {items.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#93C5FD]" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/75">
      {label}
    </div>
  );
}
