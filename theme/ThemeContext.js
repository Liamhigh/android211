import React, { createContext } from "react";
import colors from "./colors";

export const ThemeContext = createContext(colors);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={colors}>
      {children}
    </ThemeContext.Provider>
  );
};
