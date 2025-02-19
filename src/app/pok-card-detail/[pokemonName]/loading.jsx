import React from "react";

const loading = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-100"></div>
          <div className="p-4">
            <div className="h-64 bg-gray-100 rounded-full max-w-xs mx-auto"></div>
            <div className="space-y-3 mt-4">
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
