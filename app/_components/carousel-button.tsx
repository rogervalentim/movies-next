// components/CarouselButton.tsx
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

export function CarouselButton({
  direction,
  onClick,
  disabled = false
}: CarouselButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="outline"
      disabled={disabled}
      className="size-11 rounded-xl"
      aria-label={direction === "left" ? "Anterior" : "Próximo"}
    >
      {direction === "left" ? (
        <ChevronLeftIcon size={16} />
      ) : (
        <ChevronRightIcon size={16} />
      )}
    </Button>
  );
}
