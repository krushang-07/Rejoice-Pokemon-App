"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";
import Loader from "@/utiles/Loader";

const ShowImages = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchPokemonImages = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        console.log(response.data);
        setImages(response.data.sprites);
      } catch (error) {
        console.error("Error fetching Pokémon images:", error);
      }
    };

    if (name) {
      fetchPokemonImages();
    }
  }, [name]);

  if (!images) return <Loader />;

  return (
    <Box p={4} textAlign="center">
      <Typography variant="h3" mb={4}>
        {name.toUpperCase()} Images
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {Object.entries(images).map(
          ([key, value], index) =>
            value &&
            typeof value === "string" && (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Image src={value} alt={key} width={200} height={200} />
                    <Typography variant="body2" mt={2}>
                      {key}
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
