/**
 * SkeletonSection - Lightweight loading placeholder for lazy-loaded sections
 * Shows a content structure skeleton while sections load
 */
const SkeletonSection = ({ 
  height = 'min-h-[400px]',
  showCards = false 
}: { 
  height?: string;
  showCards?: boolean;
}) => {
  return (
    <div className={`${height} w-full bg-background animate-pulse`}>
      <div className="container mx-auto px-6 py-16">
        {/* Title skeleton */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-3 w-24 bg-muted rounded-full" />
          <div className="h-8 w-64 bg-muted rounded-lg" />
          <div className="h-4 w-80 bg-muted/60 rounded-lg" />
        </div>
        
        {/* Cards skeleton */}
        {showCards && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="h-48 bg-muted rounded-xl"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}
        
        {/* Simple content skeleton */}
        {!showCards && (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="h-4 w-full bg-muted rounded-lg" />
            <div className="h-4 w-5/6 bg-muted/80 rounded-lg" />
            <div className="h-4 w-4/6 bg-muted/60 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonSection;
