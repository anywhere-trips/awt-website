import React from "react";
import { Box, Typography } from "@mui/material";

interface PageNotFoundProps {}

export const PageNotFound: React.FC<PageNotFoundProps> = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 1, md: 1.5 },
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        component="p"
        sx={{
          fontWeight: 600,
          color: "#1D1D1D",
          fontSize: {
            xs: "3rem",
            sm: "4rem",
            md: "5rem",
            lg: "6rem",
          },
          lineHeight: 1,
        }}
      >
        404
      </Typography>

      <Typography
        component="p"
        sx={{
          color: "#1D1D1D",
          fontSize: {
            xs: "0.9rem",
            sm: "1rem",
            md: "1.1rem",
            lg: "1.2rem",
          },
          maxWidth: "500px",
          lineHeight: 1.6,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </Typography>
    </Box>
  );
};
