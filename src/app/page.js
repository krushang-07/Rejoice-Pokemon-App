import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br bg-blue-950 text-white relative overflow-hidden">
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 animate-spin-slow z-0">
        <img
          src="/pok.png"
          alt="Pokéball"
          className="w-64 h-72 opacity-70 drop-shadow-lg"
        />
      </div>

      <div className="relative w-full max-w-4xl px-8 py-16 text-center z-10">
        <h1 className="text-6xl font-extrabold mb-10 animate-fade-in mt-48 tracking-wide">
          Welcome to the
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            PokéWorld
          </span>
        </h1>

        <p className="text-gray-300 text-xl mb-14 max-w-3xl mx-auto leading-relaxed">
          Explore the vast world of Pokémon through our comprehensive database.
          Discover detailed information about different species and their
          characteristics in a visually stunning interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Link
            href="/pokemon-list"
            className="group relative w-72 px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center text-lg font-semibold tracking-wide">
              List of Pokémon
            </span>
          </Link>

          <Link
            href="/pokemon-species"
            className="group relative w-72 px-10 py-5 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl hover:from-red-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/40 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center text-lg font-semibold tracking-wide">
              Pokémon Species
            </span>
          </Link>

          <Link
            href="/pokemon"
            className="group relative w-72 px-10 py-5 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/40 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center text-lg font-semibold tracking-wide">
              AI Chat Assistant
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
    </div>
  );
}
