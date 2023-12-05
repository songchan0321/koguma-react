import { Box, CircularProgress } from "@mui/material";

const LoadingProgress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default LoadingProgress;
