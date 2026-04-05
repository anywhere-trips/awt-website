import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../theme/theme";

import { AppLayout } from "../layouts/AppLayout";

import { SecureRoute } from "./SecureRoute";

import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { PageNotFound } from "../pages/PageNotFound";

import { ScrollToTop } from "../components/ScrollToTop";

interface AppRouteProps {}

export const AppRoute: React.FC<AppRouteProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route
              path="profile"
              element={
                <SecureRoute>
                  <Profile />
                </SecureRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
