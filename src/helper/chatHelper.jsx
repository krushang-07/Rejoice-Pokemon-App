function extractPokemonName(responseContent) {
  const match = responseContent.match(/Name: (\w+)/);
  return match ? match[1] : null;
}

async function fetchPokemonImage(pokemonName) {
  if (!pokemonName) return null;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.sprites.front_default;
}

async function fetchPokemonDetails(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const pokemonInfo = await response.json();
    return {
      type: pokemonInfo.types.map((t) => t.type.name),
      abilities: pokemonInfo.abilities.map((a) => a.ability.name),
      baseStats: pokemonInfo.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      weight: pokemonInfo.weight,
      height: pokemonInfo.height,
    };
  } catch (err) {
    console.error("Error fetching Pokémon data from PokéAPI:", err);
    return null;
  }
}

export { extractPokemonName, fetchPokemonImage, fetchPokemonDetails };
