import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Box,
  useTheme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Search, Home, User, UserCheck } from "lucide-react";
import { Badge } from "@mui/material";

import { AuthDialog } from "./AuthDialog";

import { useUserContext } from "../providers/UserProvider";

export const Navbar: React.FC = () => {
  const { user } = useUserContext();

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openAuth, setOpenAuth] = useState<boolean>(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.4)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          color: "#1D1D1D",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
              }}
            >
              Anywhere Trips
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <Tooltip title="Home">
                <IconButton component={Link} to="/" sx={{ color: "#1D1D1D" }}>
                  <Home size={isDesktop ? 25 : 20} />
                </IconButton>
              </Tooltip>

              {user ? (
                <Tooltip title="Profile">
                  <IconButton
                    component={Link}
                    to="/profile"
                    sx={{ color: "#1D1D1D" }}
                  >
                    <UserCheck size={isDesktop ? 25 : 20} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Profile">
                  <IconButton
                    onClick={() => setOpenAuth(true)}
                    sx={{ color: "#1D1D1D" }}
                  >
                    <User size={isDesktop ? 25 : 20} />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Search">
                <IconButton component={Link} to="/" sx={{ color: "#1D1D1D" }}>
                  <Search size={isDesktop ? 25 : 20} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AuthDialog open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};
