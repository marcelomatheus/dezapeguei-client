import { Skeleton } from "@/src/components/ui/skeleton";

type PageSkeletonProps = {
  variant?: "list" | "detail" | "dashboard" | "form";
};

export function PageSkeleton({ variant = "list" }: PageSkeletonProps) {
  const rows = variant === "dashboard" ? 6 : variant === "detail" ? 4 : 5;

  return (
    <main className="page-motion mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <Skeleton className="h-8 w-44" />
      <Skeleton className="mt-3 h-4 w-72 max-w-full" />

      {variant === "dashboard" ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : null}

      <div className={variant === "form" ? "mt-6 grid gap-4 md:grid-cols-2" : "mt-6 space-y-3"}>
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className={variant === "form" ? "h-11 rounded-lg" : "h-24 rounded-xl"} />
        ))}
      </div>
    </main>
  );
}
