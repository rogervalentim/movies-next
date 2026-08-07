import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Algo saiu do roteiro",
  description = "Não foi possível carregar este conteúdo. Tente novamente em instantes.",
  onRetry
}: ErrorStateProps) {
  return (
    <div className="page-container flex min-h-[55vh] flex-col items-center justify-center py-16 text-center" role="alert">
      <span className="grid size-14 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
        <AlertCircle className="size-7" />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-white sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">{description}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          <RotateCcw className="size-4" /> Tentar novamente
        </Button>
      )}
    </div>
  );
}
