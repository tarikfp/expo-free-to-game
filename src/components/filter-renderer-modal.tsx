import { DefaultTheme } from "@react-navigation/native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import Checkbox from "expo-checkbox";
import * as React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { COMMON_STYLES } from "../styles/common-styles";
import {
  FilterType,
  FilterTypeValue,
  formatValueToReadableLabel,
  getCategoryListData,
  PLATFORMS,
  SORT_TYPES,
} from "../utils/game-list";
import { getWindowHeight, getWindowWidth } from "../utils/layout";
import { AppButton } from "./button";
import Spacing from "./spacing";

export const FILTER_MODAL_ANIMATION_IN_TIMING = 300;
export const FILTER_MODAL_ANIMATION_OUT_TIMING = 250;

const FILTER_LIST_ITEM_HEIGHT = 40;

type CheckboxFilterItemsProps = {
  label: string;
  filterItems: Array<string>;
  type: "platform" | "sortBy";
  filters: Record<FilterType, FilterTypeValue>;
  setFilters: React.Dispatch<Partial<Record<FilterType, FilterTypeValue>>>;
};

type ModalFilterItem = {
  value: string;
  label: string;
  onSelect: (value: string) => void;
};

type Props = {
  onApplyFilters: () => void;
  filters: Record<FilterType, FilterTypeValue>;
  setFilters: React.Dispatch<Partial<Record<FilterType, FilterTypeValue>>>;
} & Partial<React.ComponentProps<typeof Modal>>;

const FilterRendererModal: React.FC<Props> = ({
  filters,
  setFilters,
  onApplyFilters,
  onBackdropPress,
  onModalHide,
  ...modalProps
}) => {
  const [shouldAutoScrollOnMount, setShouldAutoScrollOnMount] =
    React.useState<boolean>(true);

  const flatListRef = React.useRef<FlashList<
    ReturnType<typeof getCategoryListData>[0]
  > | null>(null);

  const scrollToIndexTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const getKeyExtractor = React.useCallback(
    (item: ModalFilterItem) => item.value.toString(),
    [],
  );

  React.useEffect(() => {
    const timeoutRef = scrollToIndexTimeoutRef.current;

    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, []);

  React.useEffect(() => {
    if (
      modalProps.isVisible &&
      typeof filters.category === "string" &&
      shouldAutoScrollOnMount
    ) {
      const categoryListData = getCategoryListData(() => null);
      const selectedFilterItemIndex = categoryListData.findIndex(
        (category) => category.value === filters.category,
      );

      // there is a UI flickering bug related to FlashList when some specific android devices scroll to the bottom of the list
      const isLastIndexAndAndroid =
        selectedFilterItemIndex === categoryListData.length - 1 &&
        Platform.OS === "android";

      if (selectedFilterItemIndex > 0 && !isLastIndexAndAndroid) {
        // wait for modal to be entirely visible on the screen
        scrollToIndexTimeoutRef.current = setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: selectedFilterItemIndex,
            animated: true,
          });
        }, FILTER_MODAL_ANIMATION_IN_TIMING + 50);
      }
    }
  }, [filters.category, modalProps.isVisible, shouldAutoScrollOnMount]);

  const renderListItemSeparatorComponent = React.useCallback(
    () => (
      <Spacing
        backgroundColor={DefaultTheme.colors.border}
        height={Platform.select({
          ios: StyleSheet.hairlineWidth,
          android: 1,
        })}
      />
    ),
    [],
  );

  const renderFilterItem = React.useCallback(
    ({
      item: { label, value, onSelect },
    }: ListRenderItemInfo<ModalFilterItem>) => {
      const isSelectedFilterItem = filters.category === value;
      return (
        <Pressable
          onPress={() => onSelect(value)}
          style={[
            styles.filterItem,
            {
              backgroundColor: isSelectedFilterItem ? "indigo" : "#ffff",
            },
          ]}
        >
          <Text
            style={[
              styles.filterItemLabel,
              {
                color: isSelectedFilterItem ? "#ffffff" : undefined,
              },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      );
    },
    [filters.category],
  );

  return (
    <Modal
      // https://github.com/react-native-modal/react-native-modal/issues/310#issuecomment-493749004
      backdropTransitionOutTiming={0}
      hasBackdrop
      useNativeDriver
      animationInTiming={FILTER_MODAL_ANIMATION_IN_TIMING}
      animationIn="fadeIn"
      // https://github.com/react-native-modal/react-native-modal/issues/268#issuecomment-494768894
      hideModalContentWhileAnimating
      style={styles.modal}
      animationOut="fadeOutDown"
      animationOutTiming={FILTER_MODAL_ANIMATION_OUT_TIMING}
      backdropOpacity={0.45}
      onModalHide={() => {
        onModalHide?.();
        setShouldAutoScrollOnMount(true);
      }}
      onBackdropPress={onBackdropPress}
      {...modalProps}
    >
      <View
        style={[
          styles.root,
          {
            minHeight: getWindowHeight(60),
          },
        ]}
      >
        <Text style={styles.modalTitle}>Advanced search</Text>

        <View style={COMMON_STYLES.flex(0.8)}>
          <Text style={styles.filterTitle}>Category</Text>

          <Spacing height={6} />

          <View style={styles.categoriesListWrapper}>
            <FlashList
              ref={flatListRef}
              estimatedItemSize={FILTER_LIST_ITEM_HEIGHT}
              ItemSeparatorComponent={renderListItemSeparatorComponent}
              data={getCategoryListData((categoryValue) => {
                setShouldAutoScrollOnMount(false);

                if (filters.category === categoryValue) {
                  setFilters({ category: undefined });
                } else {
                  setFilters({ category: categoryValue });
                }
              })}
              keyExtractor={getKeyExtractor}
              renderItem={renderFilterItem}
            />
          </View>

          <Pressable
            disabled={typeof filters.category === "undefined"}
            onPress={
              typeof filters.category === "string"
                ? () => setFilters({ category: undefined })
                : undefined
            }
          >
            <Text
              style={[
                styles.resetText,
                {
                  color:
                    typeof filters.category === "string" ? "indigo" : "gray",
                },
              ]}
            >
              Reset category
            </Text>
          </Pressable>
        </View>

        <CheckboxFilterItems
          filterItems={PLATFORMS}
          filters={filters}
          setFilters={setFilters}
          label="Platform"
          type="platform"
        />

        <View style={styles.borderLine} />

        <CheckboxFilterItems
          filterItems={SORT_TYPES}
          filters={filters}
          setFilters={setFilters}
          label="Sort type"
          type="sortBy"
        />

        <View style={styles.actionButtonsContainer}>
          <AppButton
            style={COMMON_STYLES.flex()}
            size="small"
            label="Apply"
            onPress={onApplyFilters}
          />

          <Spacing width={4} />

          <AppButton
            style={COMMON_STYLES.flex()}
            size="small"
            backgroundColor="darkgrey"
            label="Cancel"
            onPress={onBackdropPress}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterRendererModal;

// not necessarily need to create another file for this specific component as it will be used in modal only
const CheckboxFilterItems: React.FC<CheckboxFilterItemsProps> = ({
  filterItems,
  label,
  filters,
  setFilters,
  type,
}) => {
  return (
    <View>
      <Text style={styles.filterTitle}>{label}</Text>

      <Spacing height={6} />

      <View style={styles.checkboxWrapperContainer}>
        {filterItems.map((filterItem) => (
          <Pressable
            onPress={() => {
              if (filterItem === filters[type]) {
                setFilters({ [type]: undefined });
              } else {
                setFilters({ [type]: filterItem });
              }
            }}
            hitSlop={{
              bottom: 10,
              left: 10,
              right: 10,
              top: 10,
            }}
            style={styles.checkboxContainer}
            key={filterItem}
          >
            <Checkbox
              hitSlop={{
                bottom: 10,
                left: 10,
                right: 10,
                top: 10,
              }}
              key={filterItem}
              style={styles.checkbox}
              value={filters[type] === filterItem}
              onValueChange={() => {
                if (filterItem === filters[type]) {
                  setFilters({ [type]: undefined });
                } else {
                  setFilters({ [type]: filterItem });
                }
              }}
              color={filters[type] === filterItem ? "indigo" : undefined}
            />
            <Text
              style={[
                styles.checkboxLabel,
                { color: filters[type] === filterItem ? "indigo" : undefined },
              ]}
            >
              {formatValueToReadableLabel(filterItem)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        disabled={typeof filters[type] === "undefined"}
        onPress={
          typeof filters[type] === "string"
            ? () => setFilters({ [type]: undefined })
            : undefined
        }
      >
        <Text
          style={[
            styles.resetText,
            {
              color: typeof filters[type] === "string" ? "indigo" : "gray",
            },
          ]}
        >
          {`Reset ${label}`}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: getWindowHeight(90),
    backgroundColor: "#ffff",
    justifyContent: "space-between",
    width: getWindowWidth(90),
    borderRadius: 12,
    padding: 16,
  },
  checkboxContainer: {
    width: "33%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderLine: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DefaultTheme.colors.border,
  },
  checkboxWrapperContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkbox: {
    width: 22.5,
    height: 22.5,
  },
  categoriesListWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: DefaultTheme.colors.border,
  },
  modalTitle: {
    fontSize: 18,
    color: "indigo",
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    alignSelf: "center",
  },
  filterItem: {
    width: "100%",
    justifyContent: "center",
    height: FILTER_LIST_ITEM_HEIGHT,
    alignItems: "center",
  },
  resetText: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 11,
  },
  filterItemLabel: {
    fontSize: 13,
    textAlign: "center",
  },
  checkboxLabel: {
    fontSize: 13,
    textAlign: "center",
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "indigo",
    textAlign: "left",
  },
});
