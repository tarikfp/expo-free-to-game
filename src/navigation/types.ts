import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteNames } from "./route-names";

/**
 * @description
 * Types that is related to GameStack
 * The reason we have decoupled these types into specific folder is for avoiding dependency cycles.
 */

// Game stack param list type
export type GameStackParamList = {
  [RouteNames.GAME_LIST]: undefined;
};

// Generic reusable type which screens under GameStack can utilize
export type GameStackScreenProps<RouteName extends keyof GameStackParamList> =
  NativeStackScreenProps<GameStackParamList, RouteName>;
