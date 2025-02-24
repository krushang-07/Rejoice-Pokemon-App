import React from "react";
import axios from "axios";
import PokemonSpeciesCard from "./PokemonSpeciesCard";

const PokSpecies = async () => {
  let pokemonSpecies = [];

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

      pokemonSpecies = speciesDetails;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  await fetchPokemonData();

  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto p-4">
      {pokemonSpecies.map((pokemon) => (
        <PokemonSpeciesCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokSpecies;
