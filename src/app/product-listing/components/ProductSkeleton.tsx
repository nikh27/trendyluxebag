const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-luxury overflow-hidden shadow-luxury-sm">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] bg-muted animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export default ProductSkeleton;