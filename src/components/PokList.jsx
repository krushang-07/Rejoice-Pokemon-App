"use client";
import { useEffect, useRef, useState } from "react";
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
  TextField,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { debounce } from "lodash";

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
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;
  const router = useRouter();

  const { data: pokemonData, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      (currentPage - 1) * itemsPerPage
    }&limit=${itemsPerPage}`
  );

  useEffect(() => {
    if (pokemonData) {
      const fetchAllPokemonDetails = async () => {
        const details = {};
        for (const pokemon of pokemonData?.results || []) {
          try {
            const response = await axios.get(pokemon.url);
            details[pokemon.name] = {
              image:
                response.data.sprites.other?.dream_world?.front_default ||
                response.data.sprites.front_default,
            };
          } catch (error) {
            console.error("Error fetching Pokémon details:", error);
          }
        }
        setPokemonDetails(details);
      };

      fetchAllPokemonDetails();
    }
  }, [pokemonData]);

  const handleShowAllImages = (pokemonName) => {
    router.push(`/show-images/${encodeURIComponent(pokemonName)}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCardClick = (pokemonName) => {
    router.push(`/pok-card-detail/${encodeURIComponent(pokemonName)}`);
  };

  const debouncedSearch = useRef(
    debounce((query) => {
      setSearchQuery(query.toLowerCase());
    }, 500)
  ).current;

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };

  const filteredPokemon = pokemonData?.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  if (error) return <Typography>Error loading data</Typography>;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search Pokémon"
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {filteredPokemon?.map((pokemon, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick(pokemon.name)}
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
                cursor: "pointer",
              }}
            >
              {pokemonDetails[pokemon.name]?.image && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
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
                    width={50}
                    height={50}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    priority
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
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowAllImages(pokemon.name);
                  }}
                  sx={{ mt: 2, color: "white", bgcolor: "black" }}
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
          sx={{ color: "black" }}
          size="large"
        />
      </Box>
    </>
  );
};

export default PokList;
