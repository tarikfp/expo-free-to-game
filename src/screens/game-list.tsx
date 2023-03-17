import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterRendererModal, {
  FILTER_MODAL_ANIMATION_OUT_TIMING,
} from "../components/filter-renderer-modal";
import {
  GameListItem,
  GAME_LIST_ITEM_HEIGHT,
} from "../components/game-list-item";
import Spacing from "../components/spacing";
import { AppStatusBar } from "../components/status-bar";
import useAxios from "../hooks/useAxios";
import useGamesFilter from "../hooks/useGamesFilter";
import { RouteNames } from "../navigation/route-names";
import { GameStackScreenProps } from "../navigation/types";
import { COMMON_STYLES } from "../styles/common-styles";
import { Game } from "../types/game";
import {
  FilterType,
  FilterTypeValue,
  gameListInitialFilterState,
} from "../utils/game-list";
import { getWindowHeight, getWindowWidth } from "../utils/layout";

type Props = GameStackScreenProps<RouteNames.GAME_LIST>;

const GameListScreen: React.FC<Props> = ({ navigation }) => {
  const { apiURL, setFilters, filters, handleApplySearchParams } =
    useGamesFilter<Record<FilterType, FilterTypeValue>>(
      gameListInitialFilterState,
    );

  const {
    loading,
    response: games,
    handleFetchData,
  } = useAxios<Array<Game>>(apiURL);

  const applySearchParamsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const [isFilterRendererModalVisible, setIsFilterRendererModalVisible] =
    React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Free to game\n(${games?.length} games found)`,
      headerRight: () => (
        <Pressable
          onPress={() => setIsFilterRendererModalVisible(true)}
          hitSlop={{
            bottom: 12,
            left: 12,
            right: 12,
            top: 12,
          }}
        >
          {/**
           * render count of active filters as a badge on header top right
           */}
          {Object.values(filters).filter(Boolean).length > 0 && (
            <View style={styles.filterCountBadgeContainer}>
              <Text style={styles.filterCountBadgeText}>
                {Object.values(filters).filter(Boolean).length}
              </Text>
            </View>
          )}
          <FontAwesome5 name="filter" size={28} color="indigo" />
        </Pressable>
      ),
    });
  }, [navigation, games?.length, filters]);

  React.useEffect(() => {
    // clean up timeout on unmount
    const timeoutRef = applySearchParamsTimeoutRef.current;

    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, []);

  const renderGameItem = React.useCallback(
    ({
      index,
      item: {
        genre,
        title,
        release_date,
        platform,
        thumbnail,
        publisher,
        short_description,
      },
    }: ListRenderItemInfo<Game>) => {
      return (
        <Animated.View entering={FadeIn.delay(index * 150)}>
          <GameListItem
            genre={genre}
            publisher={publisher}
            release_date={release_date}
            short_description={short_description}
            platform={platform}
            thumbnail={thumbnail}
            title={title}
          />
        </Animated.View>
      );
    },
    [],
  );

  const getKeyExtractor = React.useCallback(
    (item: Game) => item.id.toString(),
    [],
  );

  const renderListItemSeparatorComponent = React.useCallback(
    () => <Spacing height={8} />,
    [],
  );

  const renderListEmptyComponent = React.useCallback(
    () => (
      <View style={COMMON_STYLES.flexCenter}>
        <Text style={styles.notFoundText}>
          No games found with the given filters... Consider searching with
          different filters
        </Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeAreaView}>
      <AppStatusBar />

      <View style={COMMON_STYLES.flex()}>
        {loading ? (
          <View style={COMMON_STYLES.flexCenter}>
            <ActivityIndicator color="indigo" size="large" />
          </View>
        ) : (
          <View
            style={{ width: getWindowWidth(100), height: getWindowHeight(90) }}
          >
            <FlashList
              data={games}
              estimatedItemSize={GAME_LIST_ITEM_HEIGHT}
              ListEmptyComponent={renderListEmptyComponent}
              contentContainerStyle={styles.listContentContainer}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={handleFetchData}
                />
              }
              ItemSeparatorComponent={renderListItemSeparatorComponent}
              keyExtractor={getKeyExtractor}
              renderItem={renderGameItem}
            />
          </View>
        )}
      </View>

      <FilterRendererModal
        filters={filters}
        onApplyFilters={() => {
          setIsFilterRendererModalVisible(false);
          applySearchParamsTimeoutRef.current = setTimeout(() => {
            handleApplySearchParams();
          }, FILTER_MODAL_ANIMATION_OUT_TIMING + 50);
        }}
        setFilters={setFilters}
        onBackButtonPress={() => setIsFilterRendererModalVisible(false)}
        onBackdropPress={() => setIsFilterRendererModalVisible(false)}
        isVisible={isFilterRendererModalVisible}
      />
    </SafeAreaView>
  );
};

export default GameListScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  listContentContainer: {
    padding: 12,
  },
  notFoundText: {
    width: "90%",
    textAlign: "center",
    fontSize: 16,
  },
  filterCountBadgeContainer: {
    position: "absolute",
    bottom: 24,
    right: -7.5,
    height: 16,
    width: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "indigo",
  },
  filterCountBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
});
