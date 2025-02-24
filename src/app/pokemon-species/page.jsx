import dynamic from "next/dynamic";
const PokSpecies = dynamic(() => import("@/components/PokSpecies"));
import { Box, Typography } from "@mui/material";
import React, { Suspense } from "react";
import Loader from "./loading";

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
        <Suspense fallback={<Loader />}>
          <PokSpecies />
        </Suspense>
      </Box>
    </div>
  );
};

export default page;
