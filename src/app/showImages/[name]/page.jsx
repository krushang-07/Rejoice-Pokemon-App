"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";

const ShowImages = () => {
  const { name } = useParams();
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchPokemonImages = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        setImages(response.data.sprites);
      } catch (error) {
        console.error("Error fetching Pokémon images:", error);
      }
    };

    fetchPokemonImages();
  }, [name]);

  if (!images)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={80} color="primary" />
      </Box>
    );

  return (
    <Box p={4} textAlign="center">
      <Typography variant="h3" mb={4}>
        {name} Images
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {Object.entries(images).map(
          ([key, value], index) =>
            value &&
            typeof value === "string" && (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Image src={value} alt={key} width={400} height={400} />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "20px" }}
                      mt={2}
                    >
                      {key.toUpperCase()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
};

export default ShowImages;
