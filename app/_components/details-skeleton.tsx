export function DetailsSkeleton() {
  return (
    <main aria-label="Carregando detalhes">
      <div className="skeleton-shimmer h-[590px] w-full sm:h-[640px]" />
      <div className="page-container py-8">
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="skeleton-shimmer h-11 w-24 rounded-xl" />)}
        </div>
        <div className="skeleton-shimmer mt-6 h-56 rounded-2xl" />
      </div>
    </main>
  );
}
