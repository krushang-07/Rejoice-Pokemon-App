"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Pagination,
  MenuItem,
  Select as MuiSelect,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";

import useFetch from "@/hooks/useFetch";
import Select from "react-select";
import PokemonListCard from "./PokemonListCard";

const PokList = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchName, setSearchName] = useState("");

  const itemsPerPage = 24;

  const { data: pokemonData, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      (currentPage - 1) * itemsPerPage
    }&limit=${itemsPerPage}`
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            exp: response.data.base_experience,
          };
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      })
    );
    setPokemonDetails(details);
    setAllTypes(Array.from(typesSet));
  };

  useEffect(() => {
    if (!pokemonData?.results) return;
    fetchAllPokemonDetails();
  }, [pokemonData]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTypeChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
    if (event.target.value === "") {
      fetchAllPokemonDetails();
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchName) return;
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
      );
      const data = response.data;
      const types = data.types.map((typeInfo) => typeInfo.type.name);
      setPokemonDetails({
        [data.name]: {
          image:
            data.sprites.other?.dream_world?.front_default ||
            "/placeholder.png",
          types,
          exp: data.base_experience,
        },
      });
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching Pokémon by name:", error);
    }
  };

  if (!isMounted) return null;
  if (error) return <Typography>Error loading data</Typography>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          mb: 6,
          flexWrap: "wrap",
          px: 3,
        }}
      >
        <TextField
          value={searchName}
          onChange={handleSearchChange}
          placeholder="Search by Name"
          variant="outlined"
          sx={{
            minWidth: 300,
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.2)",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.4)",
              },
            },
          }}
        />
        <Button
          onClick={handleSearchSubmit}
          variant="contained"
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          Search
        </Button>
        <Select
          isMulti
          value={selectedTypes}
          onChange={handleTypeChange}
          options={allTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          placeholder="Search by Type"
          styles={{
            container: (provided) => ({
              ...provided,
              minWidth: 300,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "4px",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.4)",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#4a4a6e" : "transparent",
              color: state.isSelected ? "white" : "#333",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }),
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: "rgba(255,255,255,0.8)" }}>
            Sort Experience
          </InputLabel>
          <MuiSelect
            value={sortOrder}
            onChange={handleSortChange}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              color: "white",
              backdropFilter: "blur(10px)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
                borderWidth: "2px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.4)",
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Lowest First</MenuItem>
            <MenuItem value="desc">Highest First</MenuItem>
          </MuiSelect>
        </FormControl>
      </Box>

      <PokemonListCard
        pokemonDetails={pokemonDetails}
        sortOrder={sortOrder}
        selectedTypes={selectedTypes}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <Pagination
          count={Math.ceil((pokemonData?.count ?? 0) / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              border: "2px solid rgba(255,255,255,0.2)",
              "&.Mui-selected": {
                background: "rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              },
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PokList;
