// filter constants...
export const CATEGORIES = [
  "mmorpg",
  "shooter",
  "strategy",
  "moba",
  "racing",
  "sports",
  "social",
  "sandbox",
  "open-world",
  "survival",
  "pvp",
  "pve",
  "pixel",
  "voxel",
  "zombie",
  "turn-based",
  "first-person",
  "third-Person",
  "top-down",
  "tank",
  "space",
  "sailing",
  "side-scroller",
  "superhero",
  "permadeath",
  "card",
  "battle-royale",
  "mmo",
  "mmofps",
  "mmotps",
  "3d",
  "2d",
  "anime",
  "fantasy",
  "sci-fi",
  "fighting",
  "action-rpg",
  "action",
  "military",
  "martial-arts",
  "flight",
  "low-spec",
  "tower-defense",
  "horror",
  "mmorts",
];

export const PLATFORMS = ["pc", "browser", "all"];

export const SORT_TYPES = [
  "release-date",
  "popularity",
  "alphabetical",
  "relevance",
];

export type FilterType = "platform" | "category" | "sortBy";
export type FilterTypeValue = string | undefined;

/**
 * @description
 * remove dashes, and capitalizes the first letter of each word
 */
export const formatValueToReadableLabel = (value: string) => {
  return value
    .replace(/-/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const gameListInitialFilterState: Record<FilterType, FilterTypeValue> = {
  category: undefined,
  platform: undefined,
  sortBy: undefined,
};

export const getCategoryListData = (
  onSelect: (categoryValue: string) => void,
) => {
  return CATEGORIES.map((category) => ({
    value: category,
    label: formatValueToReadableLabel(category),
    onSelect: (categoryValue: string) => onSelect(categoryValue),
  })).sort((a, b) => a.label.localeCompare(b.label));
};
