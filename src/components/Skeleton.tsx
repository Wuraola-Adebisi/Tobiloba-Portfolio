interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-border-light dark:border-border-dark bg-card dark:bg-card-dark animate-pulse ${className}`}
    />
  );
}
