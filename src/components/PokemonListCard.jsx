import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { keyframes } from "@emotion/react";
import Image from "next/image";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const typeColors = {
  normal: "#A8A878",
  fire: "#FF4422",
  water: "#3399FF",
  electric: "#FFCC33",
  grass: "#77CC55",
  ice: "#66CCFF",
  fighting: "#BB5544",
  poison: "#AA5599",
  ground: "#DDBB55",
  flying: "#8899FF",
  psychic: "#FF5599",
  bug: "#AABB22",
  rock: "#BBAA66",
  ghost: "#6666BB",
  dragon: "#7766EE",
  dark: "#775544",
  steel: "#AAAABB",
  fairy: "#EE99EE",
};

const PokemonListCard = ({ pokemonDetails, selectedTypes, sortOrder }) => {
  const router = useRouter();

  const sortedPokemonNames = Object.keys(pokemonDetails).sort((a, b) => {
    const expA = pokemonDetails[a].exp;
    const expB = pokemonDetails[b].exp;
    if (sortOrder === "asc") {
      return expA - expB;
    } else if (sortOrder === "desc") {
      return expB - expA;
    } else {
      return 0;
    }
  });

  const handleCardClick = (pokemonName) => {
    router.push(`/pok-card-detail/${encodeURIComponent(pokemonName)}`);
  };

  return (
    <Grid container spacing={4} sx={{ px: 4 }}>
      {sortedPokemonNames
        .filter((pokemonName) =>
          selectedTypes.length > 0
            ? selectedTypes.some((type) =>
                pokemonDetails[pokemonName].types.includes(type.value)
              )
            : true
        )
        .map((pokemonName, index) => (
          <Grid item key={pokemonName} xs={12} sm={6} md={4} lg={3}>
            <Card
              onClick={() => handleCardClick(pokemonName)}
              sx={{
                height: "100%",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: `${fadeIn} 0.6s ease-out ${index * 0.1}s both`,
                cursor: "pointer",
                borderRadius: "24px",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  "& .pokemon-image": {
                    animation: `${float} 2s ease-in-out infinite`,
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "250px",
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 4,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "150px",
                    height: "150px",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    opacity: 0.5,
                  },
                }}
              >
                <Image
                  src={pokemonDetails[pokemonName]?.image || "/placeholder.png"}
                  alt={pokemonName}
                  width={200}
                  height={200}
                  priority={true}
                  className="pokemon-image"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "80%",
                    maxHeight: "80%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  p: 4,
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    mb: 2,
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {pokemonName}
                </Typography>

                <Typography
                  sx={{
                    textAlign: "center",
                    color: "rgba(255,255,255,0.8)",
                    mb: 3,
                    fontSize: "0.9rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  Experience: {pokemonDetails[pokemonName]?.exp}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  {pokemonDetails[pokemonName]?.types?.map((type) => (
                    <Box
                      key={type}
                      sx={{
                        background: `linear-gradient(135deg, ${typeColors[type]} 0%, ${typeColors[type]}aa 100%)`,
                        px: 3,
                        py: 0.5,
                        borderRadius: "20px",
                        color: "white",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {type}
                    </Box>
                  ))}
                </Box>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/show-images/${encodeURIComponent(pokemonName)}`
                    );
                  }}
                  sx={{
                    width: "100%",
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, #4a4a6e 0%, #2a2a4e 100%)",
                    color: "white",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                      background:
                        "linear-gradient(135deg, #5a5a7e 0%, #3a3a5e 100%)",
                    },
                  }}
                >
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default PokemonListCard;
