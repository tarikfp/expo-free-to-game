import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import { GameStack } from "./src/navigation/game-stack";
import FallbackScreen from "./src/screens/fallback";
import { COMMON_STYLES } from "./src/styles/common-styles";

export default function App() {
  return (
    <GestureHandlerRootView style={COMMON_STYLES.flex()}>
      <NavigationContainer>
        <SafeAreaProvider>
          <ErrorBoundary FallbackComponent={FallbackScreen}>
            <GameStack />
          </ErrorBoundary>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
