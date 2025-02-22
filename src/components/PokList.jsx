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
  TextField,
  MenuItem,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/navigation";

import useFetch from "@/hooks/useFetch";
import Select from "react-select";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PokList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);

  const itemsPerPage = 24;
  const router = useRouter();

  const { data: pokemonData, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      (currentPage - 1) * itemsPerPage
    }&limit=${itemsPerPage}`
  );
  useEffect(() => {
    setIsMounted(true);
    console.log("mounted");
  }, []);

  useEffect(() => {
    if (!pokemonData?.results) return;

    const fetchAllPokemonDetails = async () => {
      const details = {};
      const typesSet = new Set();
      await Promise.all(
        pokemonData.results.map(async (pokemon) => {
          try {
            const response = await axios.get(pokemon.url);
            const types = response.data.types.map(
              (typeInfo) => typeInfo.type.name
            );
            types.forEach((type) => typesSet.add(type));
            details[pokemon.name] = {
              image:
                response.data.sprites.other?.dream_world?.front_default ||
                "/placeholder.png",
              types,
            };
          } catch (error) {
            console.error("Error fetching Pokémon details:", error);
          }
        })
      );
      setPokemonDetails(details);
      setAllTypes(Array.from(typesSet));
      // console.log(typesSet);
    };

    fetchAllPokemonDetails();
  }, [pokemonData]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
  };

  const handleCardClick = (pokemonName) => {
    router.push(`/pok-card-detail/${encodeURIComponent(pokemonName)}`);
  };

  if (!isMounted) return null;
  if (error) return <Typography>Error loading data</Typography>;
  return (
    <>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Select
            isMulti
            value={selectedTypes}
            onChange={handleTypeChange}
            options={allTypes.map((type) => ({ label: type, value: type }))}
            placeholder="Select Types"
            styles={{
              container: (provided) => ({
                ...provided,
                minWidth: 200,
              }),
            }}
          />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {Object.keys(pokemonDetails)
            .filter((pokemonName) =>
              selectedTypes.length > 0
                ? selectedTypes.some((type) =>
                    pokemonDetails[pokemonName].types.includes(type.value)
                  )
                : true
            )
            .map((pokemonName) => (
              <Grid item key={pokemonName} xs={12} sm={6} md={4} lg={3}>
                <Card
                  onClick={() => handleCardClick(pokemonName)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                    },
                    animation: `${fadeIn} 0.5s ease-in-out`,
                    cursor: "pointer",
                    borderRadius: "50%",
                    margin: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderRadius: "50%",
                      padding: 2,
                    }}
                  >
                    <Image
                      src={
                        pokemonDetails[pokemonName]?.image || "/placeholder.png"
                      }
                      alt={pokemonName}
                      width={150}
                      height={150}
                      priority={true}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "50%",
                        maxHeight: "50%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {pokemonName}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {pokemonDetails[pokemonName]?.types?.map((type) => (
                        <Box
                          key={type}
                          sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography variant="body2">{type}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/show-images/${encodeURIComponent(pokemonName)}`
                        );
                      }}
                      sx={{
                        mt: 2,
                        color: "white",
                        bgcolor: "gray",
                        borderRadius: "50%",
                      }}
                    >
                      Show Images
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil((pokemonData?.count ?? 0) / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
          />
        </Box>
      </div>
    </>
  );
};

export default PokList;
