import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { enggarProfile } from "@/content/enggar";

export default function ExperienceSection() {
  return (
    <SectionShell id="experience" eyebrow="EXPERIENCE" title="Work experience">
      <div className="grid gap-6 lg:grid-cols-12">
        {enggarProfile.experience.map((item, idx) => (
          <Reveal key={`${item.role}-${item.company}-${idx}`} delayMs={idx * 90} className="lg:col-span-6">
            <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/6 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.18),0_18px_50px_rgba(0,0,0,0.35)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">{item.role}</div>
                  <div className="mt-1 text-sm text-white/70">{item.company}</div>
                  {item.location ? <div className="mt-1 text-xs text-white/50">{item.location}</div> : null}
                </div>
                <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-white/70">
                  {item.period}
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#93C5FD]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {item.skills?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-white/75 transition hover:bg-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
