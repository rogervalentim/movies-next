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
          ? "border-red-500/50 bg-red-500/20 text-white"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
      )}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      <span>{label}</span>
    </button>
  );
}
