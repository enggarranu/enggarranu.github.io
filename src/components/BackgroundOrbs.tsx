export default function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_-10%,rgba(96,165,250,0.18),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(148,163,184,0.12),transparent_55%),radial-gradient(900px_500px_at_70%_95%,rgba(96,165,250,0.10),transparent_60%)]" />
      <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-[#60A5FA]/10 blur-3xl motion-safe:animate-[float_12s_ease-in-out_infinite]" />
      <div className="absolute right-[8%] top-[18%] h-96 w-96 rounded-full bg-white/6 blur-3xl motion-safe:animate-[drift_16s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-[#60A5FA]/8 blur-3xl motion-safe:animate-[float_14s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute -left-1/3 top-[32%] h-40 w-[160%] -rotate-6 bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.22),transparent)] blur-2xl motion-safe:animate-[shimmer_7.5s_ease-in-out_infinite] motion-reduce:hidden" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,15,20,0.65),rgba(11,15,20,0.9))]" />
    </div>
  );
}
