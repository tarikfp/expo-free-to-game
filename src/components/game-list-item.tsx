import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Game } from "../types/game";
import {
  getWindowHeight,
  getWindowWidth,
  isSmallHeightDevice,
} from "../utils/layout";
import Spacing from "./spacing";

export const GAME_LIST_ITEM_HEIGHT = getWindowHeight(
  isSmallHeightDevice ? 20 : 17.5,
);

type GameListItemProps = Pick<
  Game,
  | "thumbnail"
  | "platform"
  | "genre"
  | "title"
  | "short_description"
  | "publisher"
  | "release_date"
>;

type GameInfoRowItemProps = {
  Icon: React.ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
};

const GameInfoRowItem: React.FC<GameInfoRowItemProps> = ({
  Icon,
  label,
  style,
}) => {
  return (
    <View style={[styles.rowItemContainer, style]}>
      {Icon}

      <Spacing width={4} />

      <Text numberOfLines={1} style={styles.subtitle}>
        {label}
      </Text>
    </View>
  );
};

// memoizing this component might be useful as it will be used in the list(FlatList)
export const GameListItem = React.memo<GameListItemProps>(
  ({
    genre,
    platform,
    thumbnail,
    title,
    short_description,
    release_date,
    publisher,
  }) => {
    return (
      <View style={styles.root}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.thumbnail}
            source={{ uri: thumbnail }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <Spacing height={6} />

          <Text numberOfLines={2} style={styles.descriptionText}>
            {short_description}
          </Text>

          <Spacing height={12} />

          <View style={styles.rowItemRoot}>
            <GameInfoRowItem
              Icon={<MaterialIcons name="computer" size={16} color="black" />}
              label={platform}
            />

            <Spacing width={8} />

            <GameInfoRowItem
              Icon={<MaterialIcons name="category" size={16} color="black" />}
              label={genre}
            />
          </View>

          <Spacing height={isSmallHeightDevice ? 8 : 2} />

          <View style={styles.rowItemRoot}>
            <GameInfoRowItem
              Icon={<MaterialIcons name="date-range" size={16} color="black" />}
              label={release_date.toString()}
            />

            <Spacing width={8} />

            <GameInfoRowItem
              Icon={<MaterialIcons name="person" size={16} color="black" />}
              label={publisher}
            />
          </View>
        </View>
      </View>
    );
  },
);

GameListItem.displayName = "GAME_LIST_ITEM";

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffff",
    alignItems: "center",
    width: "100%",
    height: GAME_LIST_ITEM_HEIGHT,
    flexDirection: "row",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 0,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 12,
    width: "85%",
    textTransform: "capitalize",
  },
  rowItemRoot: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginLeft: 12,
    padding: 8,
    height: getWindowHeight(17.5),
    width: getWindowWidth(55),
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  rowItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 11,
  },
  imageContainer: {
    width: getWindowWidth(30),
    height: getWindowHeight(isSmallHeightDevice ? 12.5 : 10),
  },
});
