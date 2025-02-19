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

export { extractPokemonName, fetchPokemonImage };
