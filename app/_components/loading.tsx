export function Loading() {
  return (
    <div className="grid gap-4 py-4" aria-label="Carregando conteúdo" role="status">
      <span className="sr-only">Carregando...</span>
      <div className="skeleton-shimmer h-6 w-44 rounded-md" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-shimmer aspect-[2/3] rounded-2xl" />)}
      </div>
    </div>
  );
}
