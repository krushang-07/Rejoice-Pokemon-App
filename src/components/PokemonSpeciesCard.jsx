import React from "react";

const PokemonSpeciesCard = ({ pokemon }) => {
  return (
    <div
      key={pokemon.name}
      className="w-64 bg-gray-800 shadow-lg rounded-lg text-center p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl text-white"
    >
      <div className="font-bold text-lg uppercase mb-2 text-blue-300">
        {pokemon.name}
      </div>
      <div className="text-sm text-gray-300">
        <strong className="text-blue-200">Color:</strong> {pokemon.color}
      </div>
      <div className="text-sm text-gray-300">
        <strong className="text-blue-200">Egg Group:</strong> {pokemon.eggGroup}
      </div>
      <div className="text-sm text-gray-300">
        <strong className="text-blue-200">Genera:</strong> {pokemon.genera} (
        {pokemon.generaLanguage})
      </div>
      <div className="text-sm text-gray-300">
        <strong className="text-blue-200">Growth Rate:</strong>{" "}
        {pokemon.growthRate}
      </div>
    </div>
  );
};

export default PokemonSpeciesCard;
