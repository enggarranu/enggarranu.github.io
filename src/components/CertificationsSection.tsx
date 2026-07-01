import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { enggarProfile } from "@/content/enggar";
import { ExternalLink } from "lucide-react";

export default function CertificationsSection() {
  return (
    <SectionShell id="certifications" eyebrow="CERTIFICATIONS" title="Certifications">
      <div className="grid gap-6 lg:grid-cols-12">
        {enggarProfile.certifications.map((cert, idx) => (
          <Reveal key={`${cert.name}-${idx}`} delayMs={idx * 90} className="lg:col-span-6">
            <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/6 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.18),0_18px_50px_rgba(0,0,0,0.35)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">{cert.name}</div>
                  <div className="mt-1 text-sm text-white/70">{cert.issuer}</div>
                  {cert.credentialId ? (
                    <div className="mt-1 text-xs text-white/50">Credential ID: {cert.credentialId}</div>
                  ) : null}
                </div>
                {cert.date ? (
                  <div className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-white/70">
                    {cert.date}
                  </div>
                ) : null}
              </div>

              {cert.skills?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-white/75 transition hover:bg-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : null}

              {cert.credentialUrl ? (
                <a
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/10 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View credential
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <div className="mt-4 text-xs text-white/50">
                  Add your certifications in <span className="text-white/70">src/content/enggar.ts</span>.
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
