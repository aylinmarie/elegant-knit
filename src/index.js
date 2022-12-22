import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { removeSpace } from "./utility/removeSpace";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';


const primaryColor = removeSpace(getComputedStyle(document.documentElement)
.getPropertyValue('--wheat'));

console.log(primaryColor)

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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
    <CssBaseline />
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
