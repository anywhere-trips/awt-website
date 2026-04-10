import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  CircularProgress,
  Skeleton,
  Dialog,
  DialogContent,
} from "@mui/material";
import { LogOut, Camera, Trash2, ImagePlus, X } from "lucide-react";
import { useUserContext } from "../providers/UserProvider";
import {
  getUserProfile,
  uploadProfilePicture,
  removeProfilePicture,
  getWishlist,
} from "../api/api";

export const Profile: React.FC = () => {
  const { user, token, logout } = useUserContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const helperFontSize = isMd ? "0.9rem" : isSm ? "0.85rem" : "0.8rem";
  const inputFontSize = { xs: "0.9rem", sm: "0.95rem", md: "1rem" };

  const [profile, setProfile] = useState<{
    id?: string;
    username?: string;
    avatar?: string;
  }>({
    username: user?.username || "",
    avatar: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);

  const [wishlistPackages, setWishlistPackages] = useState<any[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      setLoadingProfile(true);
      try {
        const data = await getUserProfile(token);
        setProfile({
          id: data._id,
          username: data.username,
          avatar: data.profile_picture?.url || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return;

      try {
        setWishlistLoading(true);
        const res = await getWishlist(token);

        if (res?.status === "success" && Array.isArray(res?.data)) {
          setWishlistPackages(
            res.data.map((pkg: any) => ({
              _id: pkg._id,
              packageName: pkg.package_name,
              image: pkg.image,
            })),
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setWishlistLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  const validateName = (value: string, field: string, required = true) => {
    const trimmed = value.trim();
    if (required && !trimmed) return `${field} is required`;
    if (trimmed.length > 50) return "Max 50 characters allowed";
    if (/[^A-Za-z\s]/.test(trimmed)) return "Only letters and spaces allowed";
    return "";
  };

  const validateEmail = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Invalid email address";
    return "";
  };

  const handleSave = () => {
    const firstNameError = validateName(firstName, "First name", true);
    const middleNameError = validateName(middleName, "Middle name", false);
    const lastNameError = validateName(lastName, "Last name", true);
    const emailError = validateEmail(email);

    setErrors({
      firstName: firstNameError,
      middleName: middleNameError,
      lastName: lastNameError,
      email: emailError,
    });

    if (firstNameError || lastNameError || emailError) return;

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Information saved (simulation)");
    }, 1000);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarModalOpen(false);
    if (!e.target.files?.[0] || !token) return;
    const file = e.target.files[0];

    try {
      setAvatarLoading(true);
      const data = await uploadProfilePicture(token, file);
      setProfile((prev) => ({
        ...prev,
        avatar: data.url || "",
      }));
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarModalOpen(false);
    if (!token || !profile.avatar) return;

    try {
      setAvatarLoading(true);
      await removeProfilePicture(token);
      setProfile((prev) => ({
        ...prev,
        avatar: "",
      }));
    } catch (err) {
      console.error("Remove failed", err);
    } finally {
      setAvatarLoading(false);
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Typography sx={{ fontSize: "1rem", color: "#1d1d1d" }}>
          Please login to view your profile
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 2, md: 3 },
          textAlign: { xs: "center", md: "left" },
          backgroundColor: "#ffffff",
          p: { xs: 2, md: 3 },
          borderRadius: 5,
        }}
      >
        {loadingProfile ? (
          <Skeleton
            variant="circular"
            width={isDesktop ? 90 : 80}
            height={isDesktop ? 90 : 80}
          />
        ) : (
          <Box
            sx={{
              position: "relative",
              width: { xs: 80, md: 90 },
              height: { xs: 80, md: 90 },
            }}
          >
            <Avatar
              src={profile.avatar || undefined}
              sx={{
                width: "100%",
                height: "100%",
                fontWeight: 500,
                fontSize: { xs: "1.5rem", md: "2rem" },
                backgroundColor: profile.avatar ? "#f8f8f8" : "#1cb690",
                opacity: avatarLoading ? 0.5 : 1,
              }}
            >
              {!profile.avatar && profile.username?.charAt(0).toUpperCase()}
            </Avatar>

            {avatarLoading && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  zIndex: 10,
                }}
              >
                <CircularProgress size={40} sx={{ color: "#fff" }} />
              </Box>
            )}

            <IconButton
              onClick={() => setAvatarModalOpen(true)}
              sx={{
                position: "absolute",
                bottom: -6,
                right: -6,
                borderWidth: 1,
                border: "1px solid #f0f0f0",
                backgroundColor: "#fff",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <Camera size={isDesktop ? 18 : 15} color="#1cb690" />
            </IconButton>
          </Box>
        )}

        <Stack
          sx={{ flex: 1, alignItems: { xs: "center", md: "flex-start" } }}
          spacing={1.5}
        >
          {loadingProfile ? (
            <Skeleton
              sx={{ borderRadius: 1.25 }}
              variant="text"
              width={120}
              height={30}
            />
          ) : (
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                color: "#1d1d1d",
              }}
            >
              {profile.username}
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={logout}
            disabled={loadingProfile}
            disableElevation
            startIcon={<LogOut size={isDesktop ? 18 : 15} color="#1d1d1d" />}
            sx={{
              mt: 1,
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              py: { xs: 0.8, sm: 1 },
              textTransform: "none",
              backgroundColor: "#f8f8f8",
              color: "#1d1d1d",
              borderRadius: 25,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      <Dialog
        open={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 5 },
        }}
      >
        <DialogContent
          sx={{ position: "relative", p: 3, backgroundColor: "#f8f8f8" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography
              fontWeight={600}
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.35rem" },
                color: "#1d1d1d",
              }}
            >
              Profile picture
            </Typography>

            <IconButton onClick={() => setAvatarModalOpen(false)}>
              <X size={isDesktop ? 25 : 20} />
            </IconButton>
          </Box>

          <Stack
            sx={{
              gap: { xs: 8.5, sm: 10, md: 10, lg: 10 },
            }}
            direction="row"
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                onClick={handleRemoveAvatar}
                disabled={avatarLoading}
                sx={{ color: "#d32f2f" }}
              >
                <Trash2 size={isDesktop ? 25 : 20} />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  color: "#1d1d1d",
                }}
                variant="caption"
              >
                Remove
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                sx={{ color: "#1d1d1d" }}
                component="label"
                disabled={avatarLoading}
              >
                <ImagePlus size={isDesktop ? 25 : 20} />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                  color: "#1d1d1d",
                }}
                variant="caption"
              >
                Gallery
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

      <Box sx={{ my: 5 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            mb: 2,
          }}
        >
          Edit Information
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: { xs: "100%", md: 500 } }}>
          {loadingProfile ? (
            [1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                sx={{ borderRadius: 25 }}
                variant="rectangular"
                height={50}
              />
            ))
          ) : (
            <>
              <TextField
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                FormHelperTextProps={{
                  sx: { fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: inputFontSize,
                    backgroundColor: "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 25,
                  },
                }}
              />
              <TextField
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                error={!!errors.middleName}
                helperText={errors.middleName}
                FormHelperTextProps={{
                  sx: { fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: inputFontSize,
                    backgroundColor: "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 25,
                  },
                }}
              />
              <TextField
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                FormHelperTextProps={{
                  sx: { fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: inputFontSize,
                    backgroundColor: "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 25,
                  },
                }}
              />
              <TextField
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                FormHelperTextProps={{
                  sx: { fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: inputFontSize,
                    backgroundColor: "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 25,
                  },
                }}
              />
            </>
          )}
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || loadingProfile}
            disableElevation
            sx={{
              mt: 1,
              fontSize: inputFontSize,
              py: { xs: 1, md: 1.25 },
              textTransform: "none",
              backgroundColor: "#1cb690",
              borderRadius: 25,
              "&:hover": { backgroundColor: "#17a77f" },
            }}
          >
            {saving ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Stack>
      </Box>

      <Box sx={{ my: 5 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            mb: 2,
          }}
        >
          Your Wishlist
        </Typography>

        {wishlistLoading ? (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
            }}
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                width={150}
                height={140}
                sx={{ borderRadius: 3, flex: "0 0 auto" }}
              />
            ))}
          </Box>
        ) : wishlistPackages.length === 0 ? (
          <Box
            sx={{
              p: 3,
              py: 5,
              borderRadius: 5,
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                fontWeight: 600,
                color: "#1d1d1d",
                mb: 1,
              }}
            >
              Your wishlist feels a little empty
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "text.secondary",
              }}
            >
              Start adding dreamy destinations and build your next adventure
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              pb: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {wishlistPackages.map((pkg: any) => (
              <Box
                key={pkg._id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 140, sm: 160, md: 180 },
                }}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  }}
                >
                  <Box
                    component="img"
                    src={pkg.image}
                    alt={pkg.packageName}
                    sx={{
                      width: "100%",
                      height: 110,
                      objectFit: "cover",
                    }}
                  />
                  <Typography
                    sx={{
                      p: 1,
                      fontSize: { xs: "0.8rem", sm: "0.85rem" },
                      fontWeight: 500,
                      color: "#1d1d1d",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {pkg.packageName}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};
