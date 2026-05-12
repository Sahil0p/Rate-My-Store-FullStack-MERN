export default function SkeletonCard() {
    return (
      <div className="card animate-pulse">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
      </div>
    );
  }
  