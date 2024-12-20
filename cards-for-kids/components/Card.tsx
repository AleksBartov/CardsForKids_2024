import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ReText, snapPoint } from "react-native-redash";
import { MyPalette } from "@/constants/Colors";
import { ThemeContext } from "@/app/_layout";

const { width, height } = Dimensions.get("window");

const SNAP_POINTS = [-Math.max(width, height), 0, Math.max(width, height)];
const CARD_WIDTH = width > height ? width * 0.4 : width * 0.6;
const CARD_HEIGHT = CARD_WIDTH * 1.614;
const BORDER_PADDING = 6;
const DURATION = 250;

export default function Card({ textArray, index, shuffleBack, orientation }) {
  const [theme, setTheme, isEnabled] = useContext(ThemeContext);
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-height * 2);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const rotateX = useSharedValue(Platform.OS === "ios" ? 30 : 5);
  const delay = index * DURATION;
  const theta = -10 + Math.random() * 20;
  const step = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
    );
    rotateZ.value = withDelay(delay, withSpring(theta));
  }, [translateY, theta, index, rotateZ, delay]);

  useAnimatedReaction(
    () => shuffleBack.value,
    (v) => {
      if (v) {
        const duration = 150 * index;
        translateX.value = withDelay(
          duration,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          })
        );
        rotateZ.value = withDelay(duration, withSpring(theta));
      }
    }
  );

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value = { x: translateX.value, y: translateY.value };
      rotateX.value = withTiming(0);
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      translateY.value = withSpring(0, { velocity: velocityY });
      rotateX.value = withTiming(Platform.OS === "ios" ? 30 : 5);
      scale.value = withTiming(1, {}, () => {
        const isLast = index === 0;
        const isSwaptLeftOrRight = dest !== 0;
        if (isSwaptLeftOrRight) {
          step.value === textArray.length - 1 ? (step.value = 0) : step.value++;
        }
        if (isLast && isSwaptLeftOrRight) {
          shuffleBack.value = true;
        }
      });
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: `${rotateX.value}deg` },
      { rotateZ: `${rotateZ.value}deg` },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));
  const rTextStyle = useAnimatedStyle(() => ({
    fontSize:
      orientation === 3 || orientation === 4
        ? theme === "fiveLongWords"
          ? (CARD_HEIGHT - 2 * BORDER_PADDING) / 6
          : theme === "fourLongWords"
          ? (CARD_HEIGHT - 2 * BORDER_PADDING) / 5
          : theme === "threeLongWords"
          ? (CARD_HEIGHT - 2 * BORDER_PADDING) / 3
          : (CARD_HEIGHT - 2 * BORDER_PADDING) / 2
        : theme === "fiveLongWords"
        ? (CARD_WIDTH - 2 * BORDER_PADDING) / 6
        : theme === "fourLongWords"
        ? (CARD_WIDTH - 2 * BORDER_PADDING) / 5
        : theme === "threeLongWords"
        ? (CARD_WIDTH - 2 * BORDER_PADDING) / 3
        : (CARD_WIDTH - 2 * BORDER_PADDING) / 2,
  }));

  const date = useDerivedValue(() => {
    const d = textArray[step.value];
    return d;
  });

  return (
    <View style={styles.box} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.card_container,
            {
              width:
                orientation === 3 || orientation === 4
                  ? CARD_HEIGHT
                  : CARD_WIDTH,
              height:
                orientation === 3 || orientation === 4
                  ? CARD_WIDTH
                  : CARD_HEIGHT,
            },
            style,
          ]}
        >
          <View
            style={[
              styles.card_inner_border,
              {
                width:
                  orientation === 3 || orientation === 4
                    ? CARD_HEIGHT - BORDER_PADDING
                    : CARD_WIDTH - BORDER_PADDING,
                height:
                  orientation === 3 || orientation === 4
                    ? CARD_WIDTH - BORDER_PADDING
                    : CARD_HEIGHT - BORDER_PADDING,
              },
            ]}
          >
            <ReText style={[styles.card_text, rTextStyle]} text={date} />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  card_container: {
    backgroundColor: MyPalette.myWhite,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card_inner_border: {
    backgroundColor: MyPalette.myWhite,
    borderRadius: 10,
    borderColor: MyPalette.darkBlue,
    borderWidth: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  card_text: {
    color: MyPalette.darkBlue,
    fontFamily: "Nunito_500Medium",
  },
});
