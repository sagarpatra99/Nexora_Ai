export const ProductSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      
      {/* Image */}
      <div className="h-40 bg-gray-300 rounded-lg"></div>

      {/* Title */}
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>

      {/* Price */}
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

    </div>
  );
};