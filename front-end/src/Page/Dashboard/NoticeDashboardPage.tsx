import React from "react";

function NoticeDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notice Dashboard</h1>
      <div className="mt-4">
        <p>Welcome to the Notice Dashboard!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Sample notice cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold">Notice Title {item}</h3>
              <p className="text-gray-600 text-sm mt-2">This is a sample notice description.</p>
              <div className="mt-3 text-xs text-gray-500">Date: Dec {10-item}, 2025</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoticeDashboardPage;
