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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)",
        position: "relative",
        overflow: "hidden",
        py: 6,
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-30 0a30 30 0 1 0 60 0a30 30 0 1 0 -60 0' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <Typography
        variant="h2"
        sx={{
          color: "white",
          textAlign: "center",
          mb: 6,
          textTransform: "capitalize",
          fontWeight: "bold",
          position: "relative",
          textShadow: "0 0 20px rgba(255,255,255,0.2)",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          },
        }}
      >
        {name} Gallery
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {Object.entries(images).map(
          ([key, value], index) =>
            value &&
            typeof value === "string" && (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "24px",
                    border: "2px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255,255,255,0.2)",
                      "& .sprite-image": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: "0 !important",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: 250,
                        position: "relative",
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={value}
                        alt={key}
                        width={200}
                        height={200}
                        className="sprite-image"
                        style={{
                          objectFit: "contain",
                          transition: "transform 0.3s ease",
                          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: "100%",
                        p: 3,
                        background: "rgba(0,0,0,0.3)",
                        borderBottomLeftRadius: "22px",
                        borderBottomRightRadius: "22px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          textAlign: "center",
                          textTransform: "capitalize",
                          letterSpacing: "0.5px",
                          opacity: 0.9,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          "& span": {
                            color: "rgba(255,255,255,0.7)",
                            display: "block",
                            fontSize: "0.8rem",
                            mt: 0.5,
                          },
                        }}
                      >
                        {key.split("_").join(" ")}
                        <span>Sprite Variant</span>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
}
