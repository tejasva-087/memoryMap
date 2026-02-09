function ViewTripSkeleton() {
  return (
    <aside className="h-full w-full p-5 animate-pulse">
      <div className="bg-zinc-100 dark:bg-zinc-800 h-full rounded-3xl p-8 border border-zinc-200 flex flex-col gap-4">
        <div className="h-10 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
        {/* Meta Skeleton */}
        <div className="h-6 w-1/4 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded" />
        </div>
        {/* Image Gallery Skeleton */}
        <div className="mt-4 h-64 w-full">
          <div className="bg-zinc-200 dark:bg-zinc-700 rounded-xl w-full h-full" />
        </div>
      </div>
    </aside>
  );
}

export default ViewTripSkeleton;
