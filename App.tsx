import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Schedule } from "./src/components/Schedule";
import "./src/i18n/i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { Moon, Sun } from "lucide-react-native";

function AppContent() {
  const { i18n } = useTranslation();
  const { colors, isDark, toggleTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Scheduler App
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => changeLanguage("en")}
            style={{ marginRight: 10 }}
          >
            <Image
              source={require("./src/assets/images/eua.png")}
              style={{ width: 30, height: 20 }}
            />
          </Pressable>

          <Pressable onPress={() => changeLanguage("pt")}>
            <Image
              source={require("./src/assets/images/brasil.png")}
              style={{ width: 30, height: 20 }}
            />
          </Pressable>
        </View>
      </View>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.content}>
        <Schedule />
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={toggleTheme}
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingHorizontal: 16,
            marginTop: 30,
          }}
        >
          {isDark ? (
            <Sun size={30} color={colors.text} />
          ) : (
            <Moon size={30} color={colors.text} />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontStyle: "italic",
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
});
