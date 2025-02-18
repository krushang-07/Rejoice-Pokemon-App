import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-4xl px-6 py-12 text-center">
        <h1 className="text-5xl font-bold mb-8 animate-fade-in">
          Welcome to the
          <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Pokémon App
          </span>
        </h1>

        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Explore the vast world of Pokémon through our comprehensive database.
          Discover detailed information about different species and their
          characteristics.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/pokemonlist"
            className="group relative w-64 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl 
                     hover:from-blue-600 hover:to-blue-700 transition-all duration-300 
                     shadow-lg hover:shadow-blue-500/30 
                     transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center text-lg font-semibold">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              List of Pokemon
            </span>
          </Link>

          <Link
            href="/pokemonspecies"
            className="group relative w-64 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl 
                     hover:from-red-600 hover:to-red-700 transition-all duration-300 
                     shadow-lg hover:shadow-red-500/30 
                     transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center text-lg font-semibold">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Pokemon Species
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
}
