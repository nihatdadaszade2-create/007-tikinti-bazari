/** Loading state shown while the catalog reads its URL parameters. */
export function CatalogSkeleton() {
  return (
    <div aria-busy="true" aria-label="Məhsullar yüklənir">
      <div className="card h-[132px] animate-pulse" />
      <ul className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="card overflow-hidden">
            <div className="aspect-[4/3] animate-pulse bg-[#ecebe6]" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/3 animate-pulse rounded bg-[#ecebe6]" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-[#ecebe6]" />
              <div className="h-10 animate-pulse rounded bg-[#ecebe6]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
