import PokSpecies from "@/components/PokSpecies";
import { Box, Typography } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <div>
      <Box p={4} bgcolor="#f4f4f4" minHeight="100vh">
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "black" }}
          gutterBottom
          fontWeight="bold"
        >
          Pokémon Species List
        </Typography>
        <PokSpecies />
      </Box>
    </div>
  );
};

export default page;
