import { StatusBar } from "expo-status-bar";
import * as React from "react";

/**
 * @description
 * Status bar which has predefined props that can be used over the app screens
 */
export const AppStatusBar: React.FC<React.ComponentProps<typeof StatusBar>> = (
  props,
) => {
  return <StatusBar style="dark" animated {...props} />;
};
