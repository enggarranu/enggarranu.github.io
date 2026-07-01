import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className,
  delayMs = 0,
  from = "bottom",
  durationMs = 560,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  from?: "bottom" | "top" | "left" | "right";
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (media?.matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms`, transitionDuration: `${durationMs}ms` }}
      className={cn(
        "transform-gpu transition-[opacity,transform,filter] ease-out motion-reduce:transition-none",
        visible
          ? "opacity-100 translate-x-0 translate-y-0 blur-0"
          : cn(
              "opacity-0 blur-[10px]",
              from === "bottom" && "translate-y-4",
              from === "top" && "-translate-y-4",
              from === "left" && "-translate-x-4",
              from === "right" && "translate-x-4",
            ),
        className,
      )}
    >
      {children}
    </div>
  );
}
