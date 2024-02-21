import { createTheme, ThemeProvider } from "@mui/material/styles";
import TerritoryRegisters from "./pages/TerritoryRegisters";

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ed815f",
        light: "#F9B47E",
        dark: "#C65B5B",
        contrastText: "#F1F2F3",
      },
      success: {
        main: "#55E4AC",
        contrastText: "#F1F2F3",
      },
      info: {
        main: "#15aafa",
        contrastText: "#F1F2F3",
      },
      secondary: {
        main: "#494949",
        light: "#F1F2F3",
        dark: "#141827",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TerritoryRegisters />
    </ThemeProvider>
  );
}
