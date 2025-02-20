"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const typeColors = {
  normal: "bg-gray-600",
  fire: "bg-gray-700",
  water: "bg-gray-700",
  electric: "bg-gray-600",
  grass: "bg-gray-700",
  ice: "bg-gray-600",
  fighting: "bg-gray-800",
  poison: "bg-gray-700",
  ground: "bg-gray-600",
  flying: "bg-gray-700",
  psychic: "bg-gray-800",
  bug: "bg-gray-600",
  rock: "bg-gray-800",
  ghost: "bg-gray-700",
  dragon: "bg-gray-800",
  dark: "bg-gray-900",
  steel: "bg-gray-600",
  fairy: "bg-gray-700",
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
    <Box
      p={4}
      textAlign="center"
      sx={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        className="container mx-auto p-2"
        style={{ height: "100%", overflowY: "auto" }}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-white capitalize mb-2">
              {pokemonName}
            </h1>
            <div className="flex gap-2">
              {pokemonDetails.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`${
                    typeColors[type.type.name.toLowerCase()]
                  } px-3 py-1 rounded-full text-white text-sm font-medium capitalize`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-64 bg-gray-50 border-b border-gray-200">
            <Image
              src={pokemonDetails.image || "/placeholder.svg"}
              alt={pokemonName}
              fill
              className="object-contain p-4"
              priority
            />
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Stats
              </h2>
              <div className="space-y-4">
                {pokemonDetails.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600 capitalize">
                        {stat.stat.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            (stat.base_stat / 255) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500">Height</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {pokemonDetails.height}m
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500">Weight</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {pokemonDetails.weight}kg
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Abilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pokemonDetails.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700 capitalize"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Typography variant="subtitle2" mt={1} sx={{ color: "black" }}>
                  Moves:
                </Typography>
                <select
                  onChange={(e) => handleMoveSelection(e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginTop: "8px",
                    width: "100%",
                    fontFamily: "inherit",
                    background: "white",
                    color: "black",
                  }}
                >
                  <option value="">Select a move</option>
                  {pokemonDetails.movesDetail
                    .map((moveUrl, idx) => (
                      <option key={idx} value={moveUrl}>
                        {pokemonDetails.moves[idx]}
                      </option>
                    ))
                    .slice(0, 5)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default PokCardDetail;
