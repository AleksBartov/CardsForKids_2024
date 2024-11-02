import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { MyPalette } from "@/constants/Colors";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { ThemeContext } from "./_layout";

const { width } = Dimensions.get("window");
const PADDING = 20;
const BOX_SIZE = (width - PADDING * 4) * 0.41;

const styles = StyleSheet.create({
  box: {
    paddingTop: 40,
    paddingHorizontal: PADDING,
    flex: 1,
    gap: 20,
    backgroundColor: MyPalette.myWhite,
    alignItems: "center",
  },
  title: {
    color: MyPalette.lightBlue,
    fontSize: 28,
    fontFamily: "Nunito_800ExtraBold",
    textAlign: "center",
  },
  boxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    width: BOX_SIZE,
    height: BOX_SIZE * 1.618,
    borderWidth: 1.2,
    borderColor: MyPalette.darkBlue,
    backgroundColor: MyPalette.middleBlue,
    alignItems: "center",
    justifyContent: "center",
    margin: PADDING,
    borderRadius: 10,
    padding: PADDING,
  },
  text: {
    fontFamily: "Nunito_500Medium",
    fontSize: 22,
    color: MyPalette.myWhite,
    textAlign: "center",
  },
});

const settings = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const router = useRouter();
  const delta = useSharedValue(0);
  useEffect(() => {
    delta.value = withDelay(
      300,
      withSequence(
        withTiming(-2, { duration: 30 }),
        withRepeat(withTiming(2, { duration: 100 }), 5, true),
        withTiming(0, { duration: 30 })
      )
    );
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${delta.value}deg`,
        },
      ],
    };
  });
  return (
    <View style={styles.box}>
      <Text style={styles.title}>СОДЕРЖАНИЕ КАРТОЧЕК:</Text>
      <View style={styles.boxes}>
        <TouchableOpacity
          onPress={() => {
            setTheme("letters");
            router.back();
          }}
        >
          <Animated.View
            entering={FadeIn.delay(200).duration(500)}
            style={[styles.textBox, rStyle]}
          >
            <Text style={styles.text}>буквы</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTheme("syllable");
            router.back();
          }}
        >
          <Animated.View
            entering={FadeIn.delay(200).duration(500)}
            style={[styles.textBox, rStyle]}
          >
            <Text style={styles.text}>слоги</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTheme("threeLongWords");
            router.back();
          }}
        >
          <Animated.View
            entering={FadeIn.delay(200).duration(500)}
            style={[styles.textBox, rStyle]}
          >
            <Text style={styles.text}>слова из 3 букв</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Animated.View
            entering={FadeIn.delay(200).duration(500)}
            style={[styles.textBox, rStyle]}
          >
            <Text style={styles.text}>слова из 4-5 букв</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default settings;
