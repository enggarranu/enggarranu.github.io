import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { ArrowRight, Database, ShieldCheck, Waves } from "lucide-react";

const badges = [
  { icon: Waves, label: "SRE" },
  { icon: Database, label: "Databases" },
  { icon: ShieldCheck, label: "Observability" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative">
                <div className="pointer-events-none absolute -left-3 top-[18px] h-10 w-10 rounded-full bg-[#60A5FA]/15 blur-2xl motion-safe:animate-[pulseGlow_4.5s_ease-in-out_infinite]" />
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[56px]">
                  Site Reliability Engineer
                  <span className="text-white/60"> (ex-DBA)</span>
                </h1>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                I build reliable systems and fast databases by combining incident-driven thinking, performance tuning,
                and pragmatic automation.
              </p>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="mt-6 flex flex-wrap gap-2">
                {badges.map((b) => (
                  <div
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition hover:-translate-y-0.5 hover:bg-white/8 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.25),0_10px_30px_rgba(0,0,0,0.25)]"
                  >
                    <b.icon className="h-3.5 w-3.5 text-[#93C5FD]" />
                    {b.label}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#project">
                  View Risk Insight
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="#contact" variant="secondary">
                  Contact
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delayMs={120} from="right">
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/6 hover:shadow-[0_0_0_1px_rgba(96,165,250,0.2),0_18px_50px_rgba(0,0,0,0.35)] sm:p-6">
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#60A5FA]/12 blur-3xl" />
                </div>
                <div className="text-xs font-medium tracking-widest text-white/50">CURRENT FOCUS</div>
                <div className="mt-3 text-lg font-semibold text-white">Reliability + Performance</div>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Monitoring & alerting, troubleshooting, query optimization, indexing strategy, and safe migrations
                  across MySQL and Postgres.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                    <div className="text-xs text-white/50">Databases</div>
                    <div className="mt-1 font-medium text-white/85">MySQL • Postgres</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                    <div className="text-xs text-white/50">SRE</div>
                    <div className="mt-1 font-medium text-white/85">Observability • On-call</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
