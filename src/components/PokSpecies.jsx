import axios from "axios";

const fetchPokemonData = async () => {
  try {
    const speciesResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-species"
    );
    const speciesList = speciesResponse.data.results;

    const speciesDetails = await Promise.all(
      speciesList.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          color: detailsResponse.data.color.name,
          eggGroup: detailsResponse.data.egg_groups[0]?.name || "Unknown",
          genera: detailsResponse.data.genera[0]?.genus || "N/A",
          generaLanguage:
            detailsResponse.data.genera[0]?.language.name || "N/A",
          growthRate: detailsResponse.data.growth_rate.name || "Unknown",
        };
      })
    );

    return speciesDetails;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
};

const PokSpecies = async () => {
  const pokemonSpecies = await fetchPokemonData();

  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
      {pokemonSpecies.map(
        ({ name, color, eggGroup, genera, generaLanguage, growthRate }) => (
          <div
            key={name}
            className="w-64 shadow-lg rounded-lg text-center p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            style={{
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.1)), ${color}`,
            }}
          >
            <div className="font-bold text-lg uppercase mb-2">{name}</div>
            <div className="text-sm">
              <strong>Color:</strong> {color}
            </div>
            <div className="text-sm">
              <strong>Egg Group:</strong> {eggGroup}
            </div>
            <div className="text-sm">
              <strong>Genera:</strong> {genera} ({generaLanguage})
            </div>
            <div className="text-sm">
              <strong>Growth Rate:</strong> {growthRate}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PokSpecies;
