export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent" />
        </div>
        <h2 className="text-xl font-semibold text-fg mb-2">Loading TweetMiner</h2>
        <p className="text-text-secondary">Preparing your research tools...</p>
      </div>
    </div>
  );
}
