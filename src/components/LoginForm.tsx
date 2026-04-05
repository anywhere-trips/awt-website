import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUserContext } from "../providers/UserProvider";
import { loginUser } from "../api/api";

const accent = "#1cb690";

export const LoginForm: React.FC = () => {
  const { login } = useUserContext();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const inputFontSize = isMd ? "1rem" : isSm ? "0.95rem" : "0.9rem";
  const helperFontSize = isMd ? "0.9rem" : isSm ? "0.85rem" : "0.8rem";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState({ username: false, password: false });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const validateRequired = (value: string, field: "username" | "password") =>
    !value.trim()
      ? field === "username"
        ? "Username is required"
        : "Password is required"
      : "";

  const handleBlur = (field: "username" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "username")
      setUsernameError(validateRequired(username, "username"));
    else setPasswordError(validateRequired(password, "password"));
  };

  const handleSubmit = async () => {
    const uError = validateRequired(username, "username");
    const pError = validateRequired(password, "password");
    setUsernameError(uError);
    setPasswordError(pError);
    setTouched({ username: true, password: true });
    if (uError || pError) return;

    try {
      setLoading(true);
      const res = await loginUser(username.trim(), password.trim());
      const accessToken = res?.data?.access_token;
      login({ username: username.trim() }, accessToken);
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.response?.data?.detail || "Login failed",
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
            setUsernameError(validateRequired(e.target.value, "username"));
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
            setPasswordError(validateRequired(e.target.value, "password"));
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
          "Login"
        )}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <Alert severity="error" sx={{ fontSize: helperFontSize }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
