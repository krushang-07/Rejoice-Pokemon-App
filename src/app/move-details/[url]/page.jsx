import { notFound } from "next/navigation";
import { Box, Typography, Card, CardContent } from "@mui/material";

const fetchMoveDetails = async (url) => {
  try {
    const response = await fetch(decodeURIComponent(url));
    if (!response.ok) throw new Error("Failed to fetch move details");
    return await response.json();
  } catch (error) {
    console.error("Error fetching move details:", error);
    return null;
  }
};

const MoveDetails = async ({ params }) => {
  const { url } = await params;
  const moveDetails = await fetchMoveDetails(url);
  if (!moveDetails) return notFound();

  return (
    <Box p={4} textAlign="center">
      <Typography variant="h4" mb={4} sx={{ color: "black" }} fontWeight="bold">
        Move Details
      </Typography>
      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          boxShadow: 5,
          p: 4,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom color="textSecondary" mb={2}>
            Move Name:{" "}
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "black" }}
              fontWeight="bold"
            >
              {moveDetails.name || "Not found"}
            </Typography>
          </Typography>
          <Typography variant="body1" mb={2}>
            Power: {moveDetails.power ? moveDetails.power : "Power Not Found"}
          </Typography>
          <Typography variant="body1" mb={2}>
            PP: {moveDetails.pp ? moveDetails.pp : "PP Not Found"}
          </Typography>
          <Typography variant="body1" mb={2}>
            Type: {moveDetails.type?.name || "Type Not Found"}
          </Typography>
          <Typography variant="body1" mb={2}>
            Accuracy: {moveDetails.accuracy || "Accuracy Not Found"}
          </Typography>
          <Typography variant="body1" mb={2}>
            Effect:{" "}
            {moveDetails.effect_entries?.[0]?.effect || "Effect Not Found"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MoveDetails;
