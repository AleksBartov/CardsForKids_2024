import {
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { MyPalette } from "@/constants/Colors";

const purchase = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        backgroundColor: MyPalette.darkBlue,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: MyPalette.myWhite,
          borderRadius: 25,
          width: width * 0.5,
          height: width * 0.5 * 1.618,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          transform: [{ rotateZ: "-10deg" }],
        }}
      >
        <View
          style={{
            width: width * 0.5 - 6,
            height: width * 0.5 * 1.618 - 6,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            borderColor: MyPalette.darkBlue,
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              color: MyPalette.darkBlue,
              fontSize: 45,
              fontFamily: "Nunito_800ExtraBold",
            }}
          >
            ПАРТА
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: MyPalette.myWhite,
          borderRadius: 25,
          width: width * 0.5,
          height: width * 0.5 * 1.618,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          transform: [{ rotateZ: "10deg" }],
        }}
      >
        <View
          style={{
            width: width * 0.5 - 6,
            height: width * 0.5 * 1.618 - 6,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            borderColor: MyPalette.darkBlue,
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              color: MyPalette.darkBlue,
              fontSize: 45,
              fontFamily: "Nunito_800ExtraBold",
            }}
          >
            ОЗЕРО
          </Text>
        </View>
      </View>
      <Button title="купить" />
    </View>
  );
};

export default purchase;

const styles = StyleSheet.create({});
