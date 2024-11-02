import Card from "@/components/Card";
import { MyPalette } from "@/constants/Colors";
import {
  consonants,
  LENGTH,
  letters,
  threeLongWords,
  vowels,
} from "@/constants/CONSTANTS";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import {
  useFonts,
  Nunito_500Medium,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { SplashScreen, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./_layout";

const words = consonants
  .flatMap((con) => {
    return vowels.flatMap((l) => {
      return [`${con}${l}`, `${l}${con}`];
    });
  })
  .reduce((acc, l) => {
    let random = Math.floor(Math.random() * acc.length);
    acc.splice(random, 0, l);
    return acc;
  }, [])
  .reduce((acc, l, i) => {
    const chunk = Math.floor(i / LENGTH);
    if (!acc[chunk]) {
      acc[chunk] = [];
    }
    acc[chunk].push(l);
    return acc;
  }, []);

SplashScreen.preventAutoHideAsync();

export default function App() {
  // console.log(words);
  const [theme, setTheme] = useContext(ThemeContext);
  const router = useRouter();
  const shuffleBack = useSharedValue(false);

  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: MyPalette.middleBlue }}
    >
      <Pressable
        onPress={() => router.push("/settings")}
        style={{
          position: "absolute",
          width: 32,
          right: 24,
          top: 24,
          height: 32,
          marginLeft: 20,
          marginTop: 40,
        }}
      >
        <Ionicons name="settings-outline" color={MyPalette.myWhite} size={30} />
      </Pressable>
      {theme === "syllable" &&
        words.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      {theme === "letters" &&
        letters.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      {theme === "threeLongWords" &&
        threeLongWords.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
