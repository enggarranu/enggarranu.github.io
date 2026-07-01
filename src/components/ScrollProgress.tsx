import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,#60A5FA,#93C5FD,#60A5FA)] opacity-70 motion-reduce:hidden"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

