import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export default function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-20", className)}>
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            {eyebrow ? (
              <div className="text-xs font-medium tracking-widest text-white/50">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[28px] sm:leading-9">
              {title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
