import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

export default function Button({
  as = "a",
  variant = "primary",
  className,
  ...props
}: ({
  as?: "a";
  variant?: ButtonVariant;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) | ({
  as?: "button";
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>)) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F14]";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#60A5FA] text-[#06101F] shadow-sm shadow-[#60A5FA]/20 hover:bg-[#93C5FD] hover:shadow-md hover:shadow-[#60A5FA]/25 active:translate-y-px",
    secondary:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/15",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
  };

  if (as === "button") {
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return <button {...buttonProps} className={cn(base, styles[variant], className)} />;
  }

  const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
  return <a {...anchorProps} className={cn(base, styles[variant], className)} />;
}
