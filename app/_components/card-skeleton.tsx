export function CardSkeleton() {
  return (
    <div className="w-[68%] min-w-[68%] shrink-0 min-[430px]:w-[calc(50%_-_0.5rem)] min-[430px]:min-w-[calc(50%_-_0.5rem)] sm:w-[calc(33.333%_-_0.7rem)] sm:min-w-[calc(33.333%_-_0.7rem)] lg:w-[calc(20%_-_0.8rem)] lg:min-w-[calc(20%_-_0.8rem)] 2xl:w-[calc(16.666%_-_0.85rem)] 2xl:min-w-[calc(16.666%_-_0.85rem)]" aria-hidden="true">
      <div className="skeleton-shimmer aspect-[2/3] rounded-2xl" />
      <div className="skeleton-shimmer mt-3 h-5 w-4/5 rounded-md" />
      <div className="skeleton-shimmer mt-2 h-4 w-1/2 rounded-md" />
    </div>
  );
}
