import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import React from "react";

const PokList = dynamic(() => import("@/components/PokList"));

const page = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1a1a2e",
        minHeight: "100vh",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, #2a2a4e 0%, #1a1a2e 100%)",
        position: "relative",
        overflow: "hidden",
        pt: 4,
        pb: 8,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-30 0a30 30 0 1 0 60 0a30 30 0 1 0 -60 0' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <img src="/pngegg.png" alt="Logo" width={300} height={300} />
      </Box>

      <PokList />
    </Box>
  );
};

export default page;
