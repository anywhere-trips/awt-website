import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { signupUser } from "../api/api";
import { useUserContext } from "../providers/UserProvider";

const accent = "#1cb690";
const usernameRegex = /^[A-Za-z0-9._]+$/;

const validateUsername = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "Username is required";
  if (trimmed.length > 50) return "Username must be at most 50 characters";
  if (!usernameRegex.test(trimmed))
    return "Only letters, digits, dots, underscores allowed";
  if (trimmed.startsWith(".") || trimmed.endsWith("."))
    return "Cannot start or end with dot";
  if (trimmed.includes("..")) return "No consecutive dots allowed";
  if (trimmed.includes(" ")) return "Username cannot contain spaces";
  return "";
};

const validatePassword = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "Password is required";
  if (trimmed.length < 8) return "Minimum 8 characters required";
  return "";
};

export const SignupForm: React.FC = () => {
  const { login } = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [touched, setTouched] = useState({ username: false, password: false });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "error" as "error" | "success",
  });

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const inputFontSize = isMd ? "1rem" : isSm ? "0.95rem" : "0.9rem";
  const helperFontSize = isMd ? "0.9rem" : isSm ? "0.85rem" : "0.8rem";

  const handleBlur = (field: "username" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "username") setUsernameError(validateUsername(username));
    else setPasswordError(validatePassword(password));
  };

  const handleSubmit = async () => {
    const uError = validateUsername(username);
    const pError = validatePassword(password);
    setUsernameError(uError);
    setPasswordError(pError);
    setTouched({ username: true, password: true });
    if (uError || pError) return;

    try {
      setLoading(true);
      const res = await signupUser(username.trim(), password.trim());
      setSnackbar({
        open: true,
        message: "Account created successfully",
        type: "success",
      });
      login({ id: res.data.id, username }, "");
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.detail || "Signup failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        size="small"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (touched.username)
            setUsernameError(validateUsername(e.target.value));
        }}
        onBlur={() => handleBlur("username")}
        error={!!usernameError}
        helperText={usernameError}
        FormHelperTextProps={{
          sx: { px: 0, marginLeft: 0, fontSize: helperFontSize },
        }}
        InputProps={{ sx: { fontSize: inputFontSize } }}
        InputLabelProps={{
          sx: { fontSize: inputFontSize, "&.Mui-focused": { color: accent } },
        }}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: accent,
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        size="small"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (touched.password)
            setPasswordError(validatePassword(e.target.value));
        }}
        onBlur={() => handleBlur("password")}
        error={!!passwordError}
        helperText={passwordError}
        FormHelperTextProps={{
          sx: { px: 0, marginLeft: 0, fontSize: helperFontSize },
        }}
        InputProps={{ sx: { fontSize: inputFontSize } }}
        InputLabelProps={{
          sx: { fontSize: inputFontSize, "&.Mui-focused": { color: accent } },
        }}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: accent,
          },
        }}
      />

      <Button
        fullWidth
        disableElevation
        variant="contained"
        disabled={loading}
        sx={{
          mt: 2,
          backgroundColor: accent,
          textTransform: "none",
          position: "relative",
          "&:hover": { backgroundColor: "#17a77f" },
          fontSize: inputFontSize,
        }}
        onClick={handleSubmit}
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "#fff" }} />
        ) : (
          "Sign Up"
        )}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSnackbar({ open: false, message: "", type: "error" })}
      >
        <Alert severity={snackbar.type} sx={{ fontSize: inputFontSize }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
