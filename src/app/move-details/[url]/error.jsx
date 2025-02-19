"use client";
export default function Error({ reset }) {
  return (
    <div className="text-center p-5 bg-red-100 text-red-700 border border-red-200 rounded-md m-5">
      <h2 className="text-2xl mb-2">
        Something went wrong! move detail fetching error
      </h2>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
