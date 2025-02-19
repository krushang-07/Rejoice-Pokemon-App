import { notFound } from "next/navigation";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";

async function fetchPokemonImages(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data.sprites;
  } catch (error) {
    console.error("Error fetching Pokémon images:", error);
    return null;
  }
}

export default async function ShowImages({ params }) {
  const { name } = await params;
  const images = await fetchPokemonImages(name);

  if (!images) return notFound();

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
}
