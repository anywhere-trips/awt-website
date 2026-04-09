import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Avatar,
  Stack,
} from "@mui/material";
import { useUserContext } from "../providers/UserProvider";

import { getPackages } from "../api/api";

interface Package {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
}

interface Country {
  id: number;
  name: string;
  image: string;
}

export const Home: React.FC = () => {
  const { user } = useUserContext();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const countries: Country[] = [
    {
      id: 1,
      name: "Bhutan",
      image: "https://i.ccdn.sk/acm/fdad64ff66eccbc68042139cd33ea31b.webp",
    },
    {
      id: 2,
      name: "Nepal",
      image:
        "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/10/Little-Tibet.jpg",
    },
    {
      id: 3,
      name: "Thailand",
      image:
        "https://www.travelandleisure.com/thmb/nDDNqO2EctQhiIfZrxeXTF47zhE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-koh-phi-phi-PLACESTHAILAND1023-09b9d347b3cd4844b4ae19e4e06a9a6d.jpg",
    },
    {
      id: 4,
      name: "Japan",
      image:
        "https://www.swedishnomad.com/wp-content/images/2017/02/Places-to-visit-in-Japan.jpg",
    },
  ];

  const getFeaturedPackages = async () => {
    try {
      const response = await getPackages(true);

      if (
        response?.status &&
        response.status === "success" &&
        response?.count &&
        response.count > 0 &&
        response?.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setPackages(
          response?.data.map((pkg: any) => ({
            _id: pkg?._id,
            packageName: pkg?.package_name,
            shortDescription: pkg?.short_description,
            durationDays:
              pkg?.duration_days != null ? parseInt(pkg.duration_days) : null,
            location: pkg?.location,
            image: pkg?.image,
          })),
        );
        setLoading(false);
      } else {
        throw {};
      }
    } catch (error: any) {
      setLoading(true);
    }
  };

  useEffect(() => {
    getFeaturedPackages();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", py: 5 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 180, md: 260 },
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: 4 }}
            />
          ) : (
            <>
              <Box
                component="img"
                src="https://static.cozycozy.com/images/catalog/bg2/horizontal-edinburgh.jpg"
                alt="Hero"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  px: 2,
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "1.5rem", md: "2.1rem" },
                    fontWeight: 600,
                  }}
                >
                  {user?.username
                    ? "Hello " + user?.username
                    : "Hello. Where to next?"}
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "0.9rem", sm: "1", md: "1.1rem" },
                    fontWeight: 400,
                  }}
                >
                  Explore. Dream. Discover.
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ mt: 5 }}>
          {loading ? (
            <Skeleton
              variant="text"
              sx={{
                width: { xs: 150, sm: 200, md: 250 },
                height: { xs: 30, sm: 35, md: 40 },
                mb: 2,
                borderRadius: 1,
              }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                fontWeight: 600,
                mb: 2,
              }}
            >
              Discover Countries
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              overflowX: "auto",
              pb: 1,
              px: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              "@media (min-width:600px)": {
                display: "grid",
                overflowX: "unset",
                gridTemplateColumns: "repeat(5, 1fr)",
              },
              "@media (min-width:900px)": {
                gridTemplateColumns: "repeat(7, 1fr)",
              },
            }}
          >
            {countries.map((country) => (
              <Box
                key={country.id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 80, sm: "auto" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 0.5,
                }}
              >
                {loading ? (
                  <Box
                    sx={{
                      width: { xs: 80, sm: 90, md: 110 },
                      height: { xs: 80, sm: 90, md: 110 },
                    }}
                  >
                    <Skeleton variant="circular" width="100%" height="100%" />
                  </Box>
                ) : (
                  <Avatar
                    src={country.image}
                    alt={country.name}
                    sx={{
                      width: { xs: 80, sm: 90, md: 110 },
                      height: { xs: 80, sm: 90, md: 110 },
                    }}
                  />
                )}

                {loading ? (
                  <Skeleton
                    variant="text"
                    sx={{
                      width: 60,
                      height: 20,
                      mt: 0.5,
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                      fontWeight: 500,
                    }}
                  >
                    {country.name}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 5 }}>
          {loading ? (
            <Skeleton
              variant="text"
              sx={{
                width: { xs: 150, sm: 200, md: 250 },
                height: { xs: 30, sm: 35, md: 40 },
                mb: 2,
                borderRadius: 1,
              }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                fontWeight: 600,
                mb: 3,
              }}
            >
              Featured Packages
            </Typography>
          )}

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
            }}
          >
            {(loading ? Array.from({ length: 4 }) : packages).map(
              (pkg: any, idx) => (
                <Box key={pkg?._id || idx}>
                  {loading ? (
                    <Skeleton
                      variant="rectangular"
                      height={220}
                      sx={{ borderRadius: 5 }}
                    />
                  ) : (
                    <Card
                      sx={{
                        borderRadius: 5,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      elevation={0}
                    >
                      <Box sx={{ backgroundColor: "#f0f0f0" }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={pkg?.image}
                          alt={pkg?.packageName}
                        />
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: {
                              xs: "1rem",
                              sm: "1.1rem",
                              md: "1.25rem",
                            },
                            mb: 0.5,
                          }}
                        >
                          {pkg?.packageName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.85rem",
                              md: "0.9rem",
                            },
                            color: "text.secondary",
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {pkg?.shortDescription}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: "#1cb690",
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.85rem",
                              md: "0.9rem",
                            },
                          }}
                        >
                          Get a Quote •{" "}
                          {pkg?.durationDays
                            ? `${pkg.durationDays - 1} Nights ${pkg.durationDays} Days`
                            : null}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Box>
              ),
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
