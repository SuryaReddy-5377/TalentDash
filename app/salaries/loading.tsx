export default function SalariesLoading() {
  return (
    <div className="container-custom py-8">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-100 rounded mb-6"></div>
        
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="h-12 bg-gray-100 rounded-lg"></div>
          </div>
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-50 rounded-lg"></div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-between">
            <div className="h-6 w-32 bg-gray-100 rounded"></div>
            <div className="flex gap-2">
              <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
              <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}