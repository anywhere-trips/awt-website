import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface AppLayoutProps {}

export const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
};
