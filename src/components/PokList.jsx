"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Pagination,
  Button,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import Loader from "@/utiles/Loader";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PokList = () => {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const router = useRouter();

  const {
    data: pokemonData,
    loading,
    error,
  } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      (currentPage - 1) * itemsPerPage
    }&limit=${itemsPerPage}`
  );

  useEffect(() => {
    const fetchAllPokemonDetails = async () => {
      const details = {};
      for (const pokemon of pokemonData?.results || []) {
        try {
          const response = await axios.get(pokemon.url);
          details[pokemon.name] = {
            abilities: response.data.abilities,
            types: response.data.types,
            image:
              response.data.sprites.other?.dream_world?.front_default ||
              response.data.sprites.front_default,
            height: response.data.height,
            moves: response.data.moves.map((move) => move.move.name),
            movesDetail: response.data.moves.map((move) => move.move.url),
          };
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      }
      setPokemonDetails(details);
    };

    if (pokemonData) {
      fetchAllPokemonDetails();
    }
  }, [pokemonData]);

  const handleMoveSelection = (moveUrl) => {
    router.push(`/moveDetails?url=${encodeURIComponent(moveUrl)}`);
  };

  const handleShowAllImages = (pokemonName) => {
    router.push(`/showImages?name=${encodeURIComponent(pokemonName)}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <Loader />;
  if (error) return <Typography>Error loading data</Typography>;

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {pokemonData?.results.map((pokemon, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                },
                animation: `${fadeIn} 0.5s ease-in-out ${index * 0.1}s`,
              }}
            >
              {pokemonDetails[pokemon.name]?.image && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: "16px 16px 0 0",
                    padding: 2,
                  }}
                >
                  <Image
                    src={
                      pokemonDetails[pokemon.name]?.image || "/placeholder.svg"
                    }
                    alt={pokemon.name}
                    width={150}
                    height={150}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              )}
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Height: {pokemonDetails[pokemon.name]?.height}
                </Typography>
                <Typography variant="subtitle2" mt={1} color="primary">
                  Abilities:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  {pokemonDetails[pokemon.name]?.abilities.map(
                    (ability, idx) => (
                      <Typography key={idx} component="li" variant="body2">
                        {ability.ability.name}
                      </Typography>
                    )
                  )}
                </Box>
                <Typography variant="subtitle2" mt={1} color="secondary">
                  Types:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  {pokemonDetails[pokemon.name]?.types.map((type, idx) => (
                    <Typography key={idx} component="li" variant="body2">
                      {type.type.name}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="subtitle2" mt={1} color="error">
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
                  }}
                >
                  <option value="">Select a move</option>
                  {pokemonDetails[pokemon.name]?.movesDetail
                    .map((moveUrl, idx) => (
                      <option key={idx} value={moveUrl}>
                        {pokemonDetails[pokemon.name]?.moves[idx]}
                      </option>
                    ))
                    .slice(0, 5)}
                </select>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleShowAllImages(pokemon.name)}
                  sx={{ mt: 2 }}
                >
                  Show All Images
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(pokemonData?.count / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </>
  );
};

export default PokList;
