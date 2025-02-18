import { generateMetadata } from "./metadata";
import PokCardDetail from "./PokeCardDetails";

export { generateMetadata };

export default async function PokemonPage({ params }) {
  const { pokemonName } = await Promise.resolve(params);
  return <PokCardDetail pokemonName={pokemonName} />;
}
