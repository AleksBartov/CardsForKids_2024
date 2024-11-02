import { MyPalette } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function RootLayout() {
  const [theme, setTheme] = useState("syllable");
  const router = useRouter();
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
            headerTitle: "",
            headerShadowVisible: true,
            headerStyle: { backgroundColor: MyPalette.myWhite },
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close" size={30} color={MyPalette.darkBlue} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeContext.Provider>
  );
}
