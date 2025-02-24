import React from "react";

const PokemonSpeciesCard = ({ pokemon }) => {
  return (
    <div
      key={pokemon.name}
      className="w-64 shadow-lg rounded-lg text-center p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.1)), ${pokemon.color}`,
      }}
    >
      <div className="font-bold text-lg uppercase mb-2">{pokemon.name}</div>
      <div className="text-sm">
        <strong>Color:</strong> {pokemon.color}
      </div>
      <div className="text-sm">
        <strong>Egg Group:</strong> {pokemon.eggGroup}
      </div>
      <div className="text-sm">
        <strong>Genera:</strong> {pokemon.genera} ({pokemon.generaLanguage})
      </div>
      <div className="text-sm">
        <strong>Growth Rate:</strong> {pokemon.growthRate}
      </div>
    </div>
  );
};

export default PokemonSpeciesCard;
