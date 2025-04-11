import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
  colors: typeof lightColors;
}

export const lightColors = {
  background: "#FFFFFF",
  text: "#333333",
  primary: "#666666",
  secondary: "#ECECED",
  border: "#ECECED",
  card: "#FFFFFF",
  cardBackground: "transparent",
  buttonText: "#333333",
  switchTrack: "#666666",
};

export const darkColors = {
  background: "#121212",
  text: "#F5F5F5",
  primary: "#333333",
  secondary: "#333333",
  border: "#333333",
  card: "#1E1E1E",
  cardBackground: "transparent",
  buttonText: "#FFFFFF",
  switchTrack: "#333333",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const deviceColorScheme = useColorScheme();

  const [theme, setTheme] = useState<ThemeType>(
    (deviceColorScheme as ThemeType) || "light"
  );

  useEffect(() => {
    if (deviceColorScheme) {
      setTheme(deviceColorScheme as ThemeType);
    }
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, toggleTheme, setTheme, colors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
