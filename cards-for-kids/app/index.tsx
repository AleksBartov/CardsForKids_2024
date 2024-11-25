import Card from "@/components/Card";
import { MyPalette } from "@/constants/Colors";
import {
  consonants,
  fourLongWords,
  fourLongWords_,
  fiveLongWords,
  LENGTH,
  letters,
  threeLongWords,
  vowels,
  fiveLongWords_,
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
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./_layout";
import * as ScreenOrientation from "expo-screen-orientation";

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
  const [theme, setTheme, isEnabled] = useContext(ThemeContext);
  const [orientation, setOrientation] = useState();
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

  useEffect(() => {
    const getOrientation = async () => {
      const current = await ScreenOrientation.getOrientationAsync();

      setOrientation({
        value: current,
      });
    };
    getOrientation();

    const orientationChangeSub =
      ScreenOrientation.addOrientationChangeListener(orientationChanged);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationChangeSub);
    };
  }, []);

  const orientationChanged = (result) => {
    setOrientation({
      value: result.orientationInfo.orientation,
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  if (
    orientation &&
    (orientation.value === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation.value === ScreenOrientation.Orientation.PORTRAIT_DOWN)
  ) {
    console.log(orientation);
  }
  if (
    orientation &&
    (orientation.value === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation.value === ScreenOrientation.Orientation.LANDSCAPE_RIGHT)
  ) {
    console.log(orientation);
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
      {theme === "fourLongWords" &&
        !isEnabled &&
        fourLongWords.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      {theme === "fourLongWords" &&
        isEnabled &&
        fourLongWords_.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      {theme === "fiveLongWords" &&
        !isEnabled &&
        fiveLongWords.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      {theme === "fiveLongWords" &&
        isEnabled &&
        fiveLongWords_.map((l, i) => (
          <Card key={i} textArray={l} index={i} shuffleBack={shuffleBack} />
        ))}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
