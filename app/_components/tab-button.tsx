import clsx from "clsx";

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  label: string;
}

export function TabButton({ onClick, isActive, label }: TabButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex min-h-11 items-center justify-center gap-3 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
        isActive
          ? "border-primary/35 bg-primary text-primary-foreground shadow-glow"
          : "border-border bg-card/70 text-muted-foreground hover:border-primary/25 hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      <span>{label}</span>
    </button>
  );
}
