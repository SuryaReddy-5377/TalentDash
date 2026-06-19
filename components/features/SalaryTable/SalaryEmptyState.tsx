export function SalaryEmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 mb-2">No records found for these filters.</p>
      <button
        onClick={() => window.location.reload()}
        className="text-[#FF5A5F] hover:underline text-sm"
      >
        Clear all filters
      </button>
    </div>
  );
}