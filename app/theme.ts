// theme.ts (or theme.js)
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Define a custom theme configuration
const config: ThemeConfig = {
  initialColorMode: "light", // Set the initial color mode to light or dark
  useSystemColorMode: false, // If you want to use the system's color mode preference
};

// Extend the theme
const theme = extendTheme({ config });

export default theme;
