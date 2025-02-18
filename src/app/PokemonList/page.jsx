import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import React, { Suspense } from "react";
import Loader from "../loader";
const PokList = dynamic(() => import("@/components/PokList"));

const page = () => {
  return (
    <div>
      <Box
        p={4}
        textAlign="center"
        sx={{ backgroundColor: "background.default", minHeight: "100vh" }}
      >
        <Typography
          variant="h3"
          mb={4}
          sx={{
            animation: `1s ease-in-out`,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            color: "black",
          }}
        >
          Pokémon List
        </Typography>
        <Suspense fallback={<Loader />}>
          <PokList />
        </Suspense>
      </Box>
    </div>
  );
};

export default page;
