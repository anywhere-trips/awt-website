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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Compass, BadgePercent, Map, ShieldCheck } from "lucide-react";
import { useUserContext } from "../providers/UserProvider";

import { getPackages, getCountries } from "../api/api";

export const Home: React.FC = () => {
  const { user } = useUserContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [packages, setPackages] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadContent = async () => {
    try {
      let response;

      response = await getCountries();

      if (
        response?.status &&
        response.status === "success" &&
        response?.count &&
        response.count > 0 &&
        response?.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setCountries(
          response?.data.map((country: any) => ({
            _id: country?._id,
            countryName: country?.country_name,
            image: country?.image,
          })),
        );
      } else {
        throw {};
      }

      response = await getPackages(true);

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
      } else {
        throw {};
      }
    } catch (error: any) {
      setLoading(true);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    loadContent();
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
                    : "Where to next?"}
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
            {(loading ? Array.from({ length: 4 }) : countries).map(
              (country: any, idx) => (
                <Box
                  key={country?._id || idx}
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
                      src={country?.image}
                      alt={country?.countryName}
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
                      {country?.countryName}
                    </Typography>
                  )}
                </Box>
              ),
            )}
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

        <Box sx={{ mt: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Why Choose Anywhere Trips
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },

              "@media (min-width:600px)": {
                display: "grid",
                overflowX: "unset",
                gridTemplateColumns: "repeat(2, 1fr)",
              },
              "@media (min-width:900px)": {
                gridTemplateColumns: "repeat(4, 1fr)",
              },
            }}
          >
            {[
              {
                icon: <Compass size={isDesktop ? 25 : 20} color="#1cb690" />,
                title: "Discover More",
                desc: "Explore destinations and experiences tailored for every traveler.",
              },
              {
                icon: <BadgePercent size={isDesktop ? 25 : 20} color="#1cb690" />,
                title: "Best Value Deals",
                desc: "Get curated packages at great prices without compromising quality.",
              },
              {
                icon: <Map size={isDesktop ? 25 : 20} color="#1cb690" />,
                title: "Easy Planning",
                desc: "Plan your trips effortlessly with a smooth and simple experience.",
              },
              {
                icon: <ShieldCheck size={isDesktop ? 25 : 20} color="#1cb690" />,
                title: "Trusted Experience",
                desc: "Reliable support to make every journey safe and memorable.",
              },
            ].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 220, sm: "auto" },
                  p: 2,
                  borderRadius: "15px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: "0.95rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },
                    color: "#1d1d1d",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.85rem",
                      md: "0.9rem",
                    },
                    color: "text.secondary",
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
