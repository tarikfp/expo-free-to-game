import { DefaultTheme } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const btnColor = "indigo";

const btnSize = ["regular", "small"] as const;
type ButtonSize = (typeof btnSize)[number];

const REGULAR_BUTTON_HEIGHT = 50;
const SMALL_BUTTON_HEIGHT = 34;

const buttonHeightBySize: Record<ButtonSize, number> = {
  small: SMALL_BUTTON_HEIGHT,
  regular: REGULAR_BUTTON_HEIGHT,
};

type Props = {
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
  size?: ButtonSize;
} & TouchableOpacityProps;

export const AppButton = React.memo<Props>(
  ({
    label,
    onPress,
    disabled,
    backgroundColor = btnColor,
    size = "regular",
    style,
    ...touchableOpacityProps
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.root,
          {
            height: buttonHeightBySize[size] ?? REGULAR_BUTTON_HEIGHT,
            backgroundColor: disabled
              ? DefaultTheme.colors.border
              : backgroundColor,
          },
          style,
        ]}
        disabled={typeof onPress === "undefined" || disabled}
        onPress={onPress}
        {...touchableOpacityProps}
      >
        <Text
          style={[styles.text, { fontSize: size === "small" ? 16 : 20 }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

AppButton.displayName = "APP_BUTTON";

const styles = StyleSheet.create({
  root: {
    backgroundColor: btnColor,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
  },
});
