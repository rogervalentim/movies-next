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
        "flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md text-sm font-semibold transition-colors",
        isActive
          ? "bg-[#3a3cff] text-white"
          : "bg-secondary text-secondary-foreground hover:bg-[#3a3cff] hover:text-white"
      )}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}
