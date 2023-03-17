import Entypo from "@expo/vector-icons/Entypo";
import * as React from "react";
import { FallbackProps } from "react-error-boundary";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/button";
import Spacing from "../components/spacing";
import { COMMON_STYLES } from "../styles/common-styles";
import { getErrorMessage } from "../utils/error";

export default function FallbackScreen({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={COMMON_STYLES.flex()}>
      <View style={styles.root}>
        <View style={COMMON_STYLES.flexCenter}>
          <Entypo name="warning" size={36} color="firebrick" />

          <Spacing height={16} />
          <Text style={styles.errorText} numberOfLines={2}>
            {getErrorMessage(error)}
          </Text>
        </View>

        <AppButton
          backgroundColor="firebrick"
          size="small"
          label="Take me to home"
          onPress={resetErrorBoundary}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "firebrick",
  },
});
