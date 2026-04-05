import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        color: "#1d1d1d",
        backgroundColor: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          justifyContent="space-between"
        >
          <Box>
            <Typography
              gutterBottom
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                fontWeight: 600,
                color: "#1d1d1d",
              }}
            >
              Anywhere Trips
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                lineHeight: 1.6,
                color: "#1d1d1d",
              }}
            >
              Explore. Discover. Repeat. Anywhere Trips makes every trip a story
              worth telling.
            </Typography>
          </Box>

          <Stack spacing={1}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                color: "#1d1d1d",
              }}
            >
              Quick Links
            </Typography>
            <Link
              href="/"
              underline="hover"
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                color: "#1d1d1d",
              }}
            >
              Home
            </Link>
          </Stack>

          <Stack spacing={1}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                color: "#1d1d1d",
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                color: "#1d1d1d",
              }}
            >
              +91 93621 24857
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                color: "#1d1d1d",
              }}
            >
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://www.facebook.com/anywhere.tripss"
                sx={{
                  color: "#1D1D1D",
                  p: { xs: 0.5, md: 1 },
                }}
                aria-label="Facebook"
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/anywhere.trips"
                sx={{
                  color: "#1D1D1D",
                  p: { xs: 0.5, md: 1 },
                }}
                aria-label="Instagram"
              >
                <Instagram fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ textAlign: "center", mt: { xs: 3, md: 4 } }}>
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
              color: "#1d1d1d",
            }}
          >
            &copy; {new Date().getFullYear()} Anywhere Trips. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
