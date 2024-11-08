import {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MyPalette } from "@/constants/Colors";
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { ThemeContext } from "./_layout";

const { width, height } = Dimensions.get("window");
const PADDING = 20;
const BOX_SIZE = width > height ? height * 0.1 : width * 0.2;

const styles = StyleSheet.create({
  box: {
    paddingTop: 40,
    paddingHorizontal: PADDING,
    flex: 1,
    gap: 20,
    backgroundColor: MyPalette.myWhite,
  },
  title: {
    color: MyPalette.lightBlue,
    fontSize: 28,
    fontFamily: "Nunito_800ExtraBold",
    textAlign: "left",
  },
  boxes: {
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    height: BOX_SIZE,
    width: BOX_SIZE * 3,
    backgroundColor: MyPalette.middleBlue,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    borderRadius: 10,
    padding: PADDING,
  },
  text: {
    fontFamily: "Nunito_500Medium",
    fontSize: 22,
    color: MyPalette.myWhite,
    textAlign: "center",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 20,
    marginTop: 20,
    width: BOX_SIZE * 4,
  },
  switchText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 18,
    color: MyPalette.darkBlue,
    textAlign: "center",
  },
});

const settings = () => {
  const [theme, setTheme, isEnabled, setIsEnabled] = useContext(ThemeContext);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const router = useRouter();

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Учу:</Text>
      <View style={styles.boxes}>
        <TouchableOpacity
          onPress={() => {
            setTheme("letters");
            router.back();
          }}
        >
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            style={[styles.textBox]}
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
            entering={FadeInDown.delay(250).duration(500)}
            style={[styles.textBox]}
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
            entering={FadeInDown.delay(300).duration(500)}
            style={[styles.textBox]}
          >
            <Text style={styles.text}>слова из 3 букв</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTheme("fourLongWords");
            router.back();
          }}
        >
          <Animated.View
            entering={FadeInDown.delay(350).duration(500)}
            style={[styles.textBox]}
          >
            <Text style={styles.text}>слова из 4 букв</Text>
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.switch}>
          <Text style={styles.switchText}>с дефисом</Text>
          <Switch
            trackColor={{
              false: MyPalette.darkBlue,
              true: "#eae6fd",
            }}
            thumbColor={isEnabled ? MyPalette.lightBlue : MyPalette.myWhite}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

export default settings;
