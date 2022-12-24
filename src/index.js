import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import Supply from "./Supply";
import Gallery from "./Gallery";

import reportWebVitals from "./reportWebVitals";

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
        path: "supplies",
        element: <Supply />,
      },
      {
        path: "/",
        element: <Gallery />,
      },
    ],
  },
]);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
