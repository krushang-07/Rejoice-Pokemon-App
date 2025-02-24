import dynamic from "next/dynamic";
const PokSpecies = dynamic(() => import("@/components/PokSpecies"));
import { Box, Typography } from "@mui/material";
import React, { Suspense } from "react";
import Loader from "./loading";

const page = () => {
  return (
    <div>
      <Box
        p={4}
        className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800  transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1"
        minHeight="100vh"
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "white" }}
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
