
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-cover shimmer"></div>

      <div className="skeleton-content">
        <div className="skeleton-line short shimmer"></div>
        <div className="skeleton-line shimmer"></div>
        <div className="skeleton-line medium shimmer"></div>
        <div className="skeleton-button shimmer"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
