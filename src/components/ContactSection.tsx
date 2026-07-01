import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { enggarProfile } from "@/content/enggar";
import { Github, Gitlab, Linkedin, Mail, PenLine } from "lucide-react";

const email = enggarProfile.contact.email;
const linkedInUrl = enggarProfile.contact.linkedInUrl;
const githubUrl = enggarProfile.contact.githubUrl;
const gitlabUrl = enggarProfile.contact.gitlabUrl;
const mediumUrl = enggarProfile.contact.mediumUrl;

export default function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="CONTACT" title="Let’s connect">
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-sm leading-7 text-white/75">
              Want to talk about reliability, database performance, monitoring, or migrations? Reach out and I’ll get
              back to you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${email}`}>
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button href={linkedInUrl} target="_blank" rel="noreferrer" variant="secondary">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              {githubUrl ? (
                <Button href={githubUrl} target="_blank" rel="noreferrer" variant="secondary">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              ) : null}
              {gitlabUrl ? (
                <Button href={gitlabUrl} target="_blank" rel="noreferrer" variant="secondary">
                  <Gitlab className="h-4 w-4" />
                  GitLab
                </Button>
              ) : null}
              {mediumUrl ? (
                <Button href={mediumUrl} target="_blank" rel="noreferrer" variant="secondary">
                  <PenLine className="h-4 w-4" />
                  Medium
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={120} className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <div className="text-xs font-medium tracking-widest text-white/50">DETAILS</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white/80">
                <div className="text-xs text-white/50">Email</div>
                <div className="mt-1 font-medium">{email}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white/80">
                <div className="text-xs text-white/50">LinkedIn</div>
                <a
                  className="mt-1 inline-flex font-medium text-[#93C5FD] hover:text-[#BFDBFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  /in/enggarranu
                </a>
              </div>
              {githubUrl ? (
                <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white/80">
                  <div className="text-xs text-white/50">GitHub</div>
                  <a
                    className="mt-1 inline-flex font-medium text-[#93C5FD] hover:text-[#BFDBFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {githubUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              ) : null}
              {gitlabUrl ? (
                <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white/80">
                  <div className="text-xs text-white/50">GitLab</div>
                  <a
                    className="mt-1 inline-flex font-medium text-[#93C5FD] hover:text-[#BFDBFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                    href={gitlabUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {gitlabUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              ) : null}
              {mediumUrl ? (
                <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white/80">
                  <div className="text-xs text-white/50">Medium</div>
                  <a
                    className="mt-1 inline-flex font-medium text-[#93C5FD] hover:text-[#BFDBFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
                    href={mediumUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {mediumUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
