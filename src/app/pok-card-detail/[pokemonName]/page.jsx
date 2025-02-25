import PokCardDetail from "../../../components/PokeCardDetails";
export async function generateMetadata({ params }) {
  const { pokemonName } = await params;
  const decodedPokemonName = decodeURIComponent(pokemonName);

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${decodedPokemonName}`
    );
    const data = await response.json();

    return {
      title: `${decodedPokemonName.toUpperCase()} - Pokemon Details`,
      description: `Learn more about ${decodedPokemonName}, including stats, abilities, and moves.`,
      openGraph: {
        images: [
          data.sprites.other?.dream_world?.front_default || "/placeholder.png",
        ],
      },
    };
  } catch {
    return {
      title: "Pokemon Not Found",
      description: "Could not find the requested Pokemon.",
    };
  }
}

export default async function PokemonPage({ params }) {
  const { pokemonName } = await params;
  return <PokCardDetail pokemonName={pokemonName} />;
}
