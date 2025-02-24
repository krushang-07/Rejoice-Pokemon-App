import { notFound } from "next/navigation";

const typeColors = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-red-400 to-orange-500",
  water: "from-blue-400 to-blue-500",
  electric: "from-yellow-300 to-yellow-500",
  grass: "from-green-400 to-green-500",
  ice: "from-cyan-300 to-cyan-500",
  fighting: "from-red-600 to-red-700",
  poison: "from-blue-400 to-blue-600",
  ground: "from-yellow-600 to-yellow-700",
  flying: "from-blue-300 to-blue-500",
  psychic: "from-blue-400 to-blue-600",
  bug: "from-lime-400 to-lime-600",
  rock: "from-gray-600 to-gray-700",
  ghost: "from-blue-600 to-blue-800",
  dragon: "from-blue-600 to-blue-800",
  dark: "from-gray-700 to-gray-800",
  steel: "from-gray-400 to-gray-600",
  fairy: "from-blue-300 to-blue-500",
};

const fetchMoveDetails = async (url) => {
  try {
    const response = await fetch(decodeURIComponent(url));
    if (!response.ok) throw new Error("Failed to fetch move details");
    return await response.json();
  } catch (error) {
    console.error("Error fetching move details:", error);
    return null;
  }
};

const MoveDetails = async ({ params }) => {
  const { url } = await params;
  const moveDetails = await fetchMoveDetails(url);

  if (!moveDetails) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-gray-300">
          Move Details
        </h1>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-700/30">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">
              {moveDetails.name}
            </h2>
            <div
              className={`w-24 h-1 mx-auto rounded-full bg-gradient-to-r ${
                typeColors[moveDetails.type?.name] ||
                "from-gray-400 to-gray-500"
              }`}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
              <div className="text-gray-400 text-sm mb-2">Power</div>
              <div className="text-white text-xl font-semibold">
                {moveDetails.power || "N/A"}
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
              <div className="text-gray-400 text-sm mb-2">PP</div>
              <div className="text-white text-xl font-semibold">
                {moveDetails.pp || "N/A"}
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
              <div className="text-gray-400 text-sm mb-2">Type</div>
              <div
                className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${
                  typeColors[moveDetails.type?.name] ||
                  "from-gray-400 to-gray-500"
                } text-white font-medium`}
              >
                {moveDetails.type?.name || "Unknown"}
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
              <div className="text-gray-400 text-sm mb-2">Accuracy</div>
              <div className="text-white text-xl font-semibold">
                {moveDetails.accuracy || "N/A"}
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/30">
              <div className="text-gray-400 text-sm mb-2">Effect</div>
              <div className="text-white leading-relaxed">
                {moveDetails.effect_entries?.[0]?.effect ||
                  "No effect description available"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveDetails;
