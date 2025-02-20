import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress size={80} sx={{ color: "black" }} />
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{ color: "text.secondary" }}
      >
        Pokemon Image is Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
