import Button from "@/components/Button";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

export default function Header({
  navItems,
  activeId,
}: {
  navItems: NavItem[];
  activeId: string;
}) {
  const [open, setOpen] = useState(false);
  const items = useMemo(() => navItems, [navItems]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#0B0F14]/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold tracking-wide text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]"
          aria-label="Go to top"
          onClick={(e) => {
            e.preventDefault();
            const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          }}
        >
          Enggar
          <span className="hidden text-xs font-medium text-white/50 sm:inline">
            SRE (ex-DBA)
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]",
                activeId === item.id ? "text-white" : "text-white/70",
              )}
            >
              {item.label}
            </a>
          ))}
          <Button href="#contact" variant="secondary" className="ml-2">
            Contact
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            as="button"
            type="button"
            variant="secondary"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          open ? "block border-t border-white/8 bg-[#0B0F14]/92" : "hidden",
        )}
      >
        <Container className="py-3">
          <div className="grid gap-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm transition hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]",
                  activeId === item.id ? "text-white" : "text-white/75",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
