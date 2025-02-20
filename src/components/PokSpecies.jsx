import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

const fetchPokemonData = async () => {
  try {
    const speciesResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-species"
    );
    const speciesList = speciesResponse.data.results;

    const speciesDetails = await Promise.all(
      speciesList.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          color: detailsResponse.data.color.name,
          eggGroup: detailsResponse.data.egg_groups[0]?.name || "Unknown",
          genera: detailsResponse.data.genera[0]?.genus || "N/A",
          generaLanguage:
            detailsResponse.data.genera[0]?.language.name || "N/A",
          growthRate: detailsResponse.data.growth_rate.name || "Unknown",
        };
      })
    );

    return speciesDetails;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
};

const PokSpecies = async () => {
  const pokemonSpecies = await fetchPokemonData();

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={3}
      maxWidth="1200px"
      mx="auto"
    >
      {pokemonSpecies.map(
        ({ name, color, eggGroup, genera, generaLanguage, growthRate }) => (
          <Card
            key={name}
            sx={{
              width: 260,
              boxShadow: 4,
              borderRadius: 3,
              textAlign: "center",
              p: 2,
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.1)), ${color}`,
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "6px 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                textTransform="uppercase"
                gutterBottom
              >
                {name}
              </Typography>
              <Typography variant="body2">
                <strong>Color:</strong> {color}
              </Typography>
              <Typography variant="body2">
                <strong>Egg Group:</strong> {eggGroup}
              </Typography>
              <Typography variant="body2">
                <strong>Genera:</strong> {genera} ({generaLanguage})
              </Typography>
              <Typography variant="body2">
                <strong>Growth Rate:</strong> {growthRate}
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </Box>
  );
};

export default PokSpecies;
