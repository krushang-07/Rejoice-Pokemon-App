"use client";
import useFetch from "@/hooks/useFetch";
import Loader from "@/utiles/Loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

const PokSpecies = () => {
  const {
    data: pokemonSpecies,
    loading,
    error,
  } = useFetch("https://pokeapi.co/api/v2/pokemon-species");
  const [pokemonSpeciesDetails, setPokemonSpeciesDetails] = useState({});

  useEffect(() => {
    const fetchAllPokemonDetails = async () => {
      const details = {};
      for (const pokemon of pokemonSpecies.results) {
        try {
          const response = await axios.get(pokemon.url);
          details[pokemon.name] = {
            color: response.data.color.name,
            eggGroup: response.data.egg_groups[0]?.name || "Unknown",
            genera: response.data.genera[0]?.genus || "N/A",
            generaLanguage: response.data.genera[0]?.language.name || "N/A",
            growthRate: response.data.growth_rate.name || "Unknown",
          };
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      }
      setPokemonSpeciesDetails(details);
    };

    if (pokemonSpecies?.results) {
      fetchAllPokemonDetails();
    }
  }, [pokemonSpecies]);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={3}
      maxWidth="1200px"
      mx="auto"
    >
      {Object.entries(pokemonSpeciesDetails).map(([name, details]) => (
        <Card
          key={name}
          sx={{
            width: 260,
            boxShadow: 4,
            borderRadius: 3,
            textAlign: "center",
            p: 2,
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.1)), ${details.color}`,
            transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "6px 6px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              textTransform="uppercase"
              gutterBottom
            >
              {name}
            </Typography>
            <Typography variant="body2">
              <strong>Color:</strong> {details.color}
            </Typography>
            <Typography variant="body2">
              <strong>Egg Group:</strong> {details.eggGroup}
            </Typography>
            <Typography variant="body2">
              <strong>Genera:</strong> {details.genera} (
              {details.generaLanguage})
            </Typography>
            <Typography variant="body2">
              <strong>Growth Rate:</strong> {details.growthRate}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PokSpecies;
