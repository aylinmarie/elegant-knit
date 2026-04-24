import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import Gallery from "./Gallery";

import { removeSpace } from "./utility/removeSpace";

import { ThemeProvider, createTheme } from "@mui/material/styles";


const primaryColor = removeSpace(getComputedStyle(document.documentElement)
.getPropertyValue('--wheat'));

// Need to set typography thry MUI.
const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    body1: {
      fontWeight: 300,
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primaryColor,
      contrastThreshold: 4.5,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Gallery />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </ThemeProvider>
);

