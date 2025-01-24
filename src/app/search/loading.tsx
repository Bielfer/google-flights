import { Skeleton } from '~/components/ui/skeleton';

const Loading = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-6 lg:px-8">
        <Skeleton className="mb-10 h-10" />

        <div className="space-y-6">
          <Skeleton className="h-64 sm:h-40" />
          <Skeleton className="h-64 sm:h-40" />
          <Skeleton className="h-64 sm:h-40" />
          <Skeleton className="h-64 sm:h-40" />
          <Skeleton className="h-64 sm:h-40" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
