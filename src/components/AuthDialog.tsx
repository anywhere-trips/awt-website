import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { X } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useUserContext } from "../providers/UserProvider";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { user } = useUserContext();

  useEffect(() => {
    if (user && open) {
      onClose();
    }
  }, [user, open, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ position: "relative", p: 3 }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={onClose}
        >
          <X />
        </IconButton>

        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={600}
          mb={2}
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.45rem" },
            color: "#1d1d1d",
          }}
        >
          {mode === "login" ? "Welcome Back" : "Get Started"}
        </Typography>

        {mode === "login" ? <LoginForm /> : <SignupForm />}

        <Box textAlign="center" mt={2}>
          {mode === "login" ? (
            <Typography
              sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" } }}
              variant="body2"
            >
              Don't have an account?{" "}
              <Box
                component="span"
                sx={{ color: "#1cb690", cursor: "pointer", fontWeight: 600 }}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </Box>
            </Typography>
          ) : (
            <Typography variant="body2">
              Already have an account?{" "}
              <Box
                component="span"
                sx={{ color: "#1cb690", cursor: "pointer", fontWeight: 600 }}
                onClick={() => setMode("login")}
              >
                Login
              </Box>
            </Typography>
          )}
        </Box>

        {mode === "login" && (
          <Box textAlign="center" mt={1}>
            <Typography
              component="a"
              href="#"
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                color: "#1D1D1D",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
