import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Pokémon App</h1>
      <div className="flex gap-4">
        <Link href="/PokemonList" legacyBehavior>
          <a className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            List of Pokemon
          </a>
        </Link>
        <Link href="/PokemonSpecies" legacyBehavior>
          <a className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Pokemon Species
          </a>
        </Link>
      </div>
    </div>
  );
}
