import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-full flex-1 space-y-4 p-4">
      <Skeleton className="h-10" />
      <Skeleton className="h-[calc(100%-100px)]" />
    </div>
  );
}
