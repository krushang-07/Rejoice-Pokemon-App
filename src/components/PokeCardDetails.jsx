"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const typeColors = {
  normal: "#A8A878",
  fire: "#FF4422",
  water: "#3399FF",
  electric: "#FFCC33",
  grass: "#77CC55",
  ice: "#66CCFF",
  fighting: "#BB5544",
  poison: "#AA5599",
  ground: "#DDBB55",
  flying: "#8899FF",
  psychic: "#FF5599",
  bug: "#AABB22",
  rock: "#BBAA66",
  ghost: "#6666BB",
  dragon: "#7766EE",
  dark: "#775544",
  steel: "#AAAABB",
  fairy: "#EE99EE",
};

const PokCardDetail = ({ pokemonName }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const router = useRouter();

  const handleMoveSelection = (moveUrl) => {
    router.push(`/move-details/${encodeURIComponent(moveUrl)}`);
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!pokemonName) return;

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonDetails({
          abilities: response.data.abilities,
          types: response.data.types,
          image: response.data.sprites.other?.dream_world?.front_default,
          height: response.data.height / 10,
          weight: response.data.weight / 10,
          moves: response.data.moves.map((move) => move.move.name),
          movesDetail: response.data.moves.map((move) => move.move.url),
          stats: response.data.stats,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemonDetails();
  }, [pokemonName]);

  if (!pokemonDetails) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-8">
          <h1 className="text-4xl font-bold text-white capitalize mb-4 relative">
            {pokemonName}
          </h1>
          <div className="flex gap-3">
            {pokemonDetails.types.map((type) => (
              <span
                key={type.type.name}
                style={{
                  backgroundColor: typeColors[type.type.name.toLowerCase()],
                }}
                className="px-4 py-1 rounded-full text-white text-sm font-semibold capitalize shadow-lg transition-transform hover:scale-105"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-80 bg-gradient-to-b from-gray-800/50 to-transparent">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Image
                src={pokemonDetails.image || "/placeholder.png"}
                alt={pokemonName}
                width={200}
                height={200}
                className="object-contain transform hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                priority
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6">Base Stats</h2>
            <div className="space-y-4">
              {pokemonDetails.stats.map((stat) => (
                <div key={stat.stat.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white/80 capitalize">
                      {stat.stat.name.replace("-", " ")}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(
                          (stat.base_stat / 255) * 100,
                          100
                        )}%`,
                        backgroundColor: `hsl(${
                          (stat.base_stat / 255) * 120
                        }, 70%, 50%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <h3 className="text-sm text-white/60 mb-1">Height</h3>
                <p className="text-2xl font-bold text-white">
                  {pokemonDetails.height}m
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <h3 className="text-sm text-white/60 mb-1">Weight</h3>
                <p className="text-2xl font-bold text-white">
                  {pokemonDetails.weight}kg
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Abilities</h2>
              <div className="flex flex-wrap gap-3">
                {pokemonDetails.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/90 text-sm capitalize hover:bg-white/10 transition-colors"
                  >
                    {ability.ability.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Moves</h2>
              <select
                onChange={(e) => handleMoveSelection(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <option value="" className="bg-gray-800 text-white">
                  Select a move
                </option>
                {pokemonDetails.movesDetail
                  .map((moveUrl, idx) => (
                    <option
                      key={idx}
                      value={moveUrl}
                      className="bg-gray-800 text-white capitalize"
                    >
                      {pokemonDetails.moves[idx].replace("-", " ")}
                    </option>
                  ))
                  .slice(0, 5)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokCardDetail;
