import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { default as GameListScreen } from "../screens/game-list";
import { RouteNames } from "./route-names";
import { GameStackParamList } from "./types";

const NativeStack = createNativeStackNavigator<GameStackParamList>();

export const GameStack: React.FC = () => {
  // Strongly typed GameStack routes array
  const routes: Array<React.ComponentProps<typeof NativeStack.Screen>> = [
    {
      name: RouteNames.GAME_LIST,
      component: GameListScreen,
      options: {
        headerShown: true,
        headerTintColor: "indigo",
        headerTitle: "Free to game",
      },
    },
  ];

  return (
    <NativeStack.Navigator initialRouteName={RouteNames.GAME_LIST}>
      {routes.map((routeConfig) => (
        <NativeStack.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </NativeStack.Navigator>
  );
};
