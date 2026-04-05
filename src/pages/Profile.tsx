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
} from "@mui/material";
import { LogOut } from "lucide-react";
import { useUserContext } from "../providers/UserProvider";
import { getUserProfile } from "../api/api";

export const Profile: React.FC = () => {
  const { user, token, logout } = useUserContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const helperFontSize = isMd ? "0.9rem" : isSm ? "0.85rem" : "0.8rem";
  const inputFontSize = { xs: "0.9rem", sm: "0.95rem", md: "1rem" };

  const [profile, setProfile] = useState<{ id?: string; username?: string }>({
    username: user?.username || "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);

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

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      setLoadingProfile(true);
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
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

  if (!user) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        }}
      >
        {loadingProfile ? (
          <Skeleton
            variant="circular"
            width={isDesktop ? 100 : 80}
            height={isDesktop ? 100 : 80}
          />
        ) : (
          <Avatar
            sx={{
              height: { xs: 80, md: 100 },
              width: { xs: 80, md: 100 },
              fontWeight: 500,
              fontSize: { xs: "1.5rem", md: "2rem" },
              backgroundColor: "#1cb690",
            }}
          >
            {profile.username?.charAt(0).toUpperCase()}
          </Avatar>
        )}

        <Stack
          sx={{ flex: 1, alignItems: { xs: "center", md: "flex-start" } }}
          spacing={1.5}
        >
          {loadingProfile ? (
            <Skeleton sx={{ borderRadius: 1.25 }} variant="text" width={120} height={30} />
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

          <Tooltip title="Logout">
            <IconButton
              sx={{ color: "#1d1d1d", backgroundColor: "#f8f8f8" }}
              onClick={logout}
            >
              <LogOut size={isDesktop ? 23 : 18} />
            </IconButton>
          </Tooltip>
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
          Edit Information
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: { xs: "100%", md: 500 } }}>
          {loadingProfile ? (
            [1, 2, 3, 4].map((i) => (
              <Skeleton key={i} sx={{ borderRadius: 1.25 }} variant="rectangular" height={50} />
            ))
          ) : (
            <>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                FormHelperTextProps={{
                  sx: { px: 0, marginLeft: 0, fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                InputProps={{ sx: { fontSize: inputFontSize } }}
                InputLabelProps={{
                  sx: {
                    fontSize: inputFontSize,
                    "&.Mui-focused": { color: "#1cb690" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#1cb690",
                  },
                }}
              />
              <TextField
                label="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                error={!!errors.middleName}
                helperText={errors.middleName}
                FormHelperTextProps={{
                  sx: { px: 0, marginLeft: 0, fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                InputProps={{ sx: { fontSize: inputFontSize } }}
                InputLabelProps={{
                  sx: {
                    fontSize: inputFontSize,
                    "&.Mui-focused": { color: "#1cb690" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#1cb690",
                  },
                }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                FormHelperTextProps={{
                  sx: { px: 0, marginLeft: 0, fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                InputProps={{ sx: { fontSize: inputFontSize } }}
                InputLabelProps={{
                  sx: {
                    fontSize: inputFontSize,
                    "&.Mui-focused": { color: "#1cb690" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#1cb690",
                  },
                }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                FormHelperTextProps={{
                  sx: { px: 0, marginLeft: 0, fontSize: helperFontSize },
                }}
                size={isDesktop ? "medium" : "small"}
                InputProps={{ sx: { fontSize: inputFontSize } }}
                InputLabelProps={{
                  sx: {
                    fontSize: inputFontSize,
                    "&.Mui-focused": { color: "#1cb690" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#1cb690",
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
    </Container>
  );
};
