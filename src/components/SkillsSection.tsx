import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { enggarProfile } from "@/content/enggar";

export default function SkillsSection() {
  return (
    <SectionShell id="skills" eyebrow="SKILLS" title="Things I do well">
      <div className="grid gap-6 lg:grid-cols-12">
        {enggarProfile.skillGroups.map((group, idx) => (
          <Reveal key={group.title} delayMs={idx * 90} className="lg:col-span-4">
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="text-sm font-semibold text-white">{group.title}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-white/75 transition hover:bg-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
