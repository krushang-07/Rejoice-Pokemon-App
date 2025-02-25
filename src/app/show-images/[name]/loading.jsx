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
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #1a202c, #2a4365, #2d3748)",
      }}
    >
      <CircularProgress size={80} sx={{ color: "black" }} />
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{ color: "text.secondary" }}
      >
        Pokemon Images is Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
