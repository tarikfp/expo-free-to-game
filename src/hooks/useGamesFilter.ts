import React from "react";

const BASE_URL = "https://www.freetogame.com/api/games";
type GameFilterType = string | undefined;

interface GamesFilterState {
  platform: GameFilterType;
  category: GameFilterType;
  sortBy: GameFilterType;
}

const useGamesFilter = <T extends GamesFilterState>(initialFilterState: T) => {
  const [apiURL, setAPIUrl] = React.useState<string>(BASE_URL);

  const [filters, setFilters] = React.useReducer(
    (current: T, update: Partial<T>) => ({
      ...current,
      ...update,
    }),
    initialFilterState,
  );

  const handleApplySearchParams = React.useCallback(() => {
    // CAVEAT: URLSearchParams and URL are polyfills in react-native, see: react-native-url-polyfill

    // creating search params to be appended into BASE_URL, based on filter state
    const searchParamsString = new URLSearchParams({
      ...(filters.platform && { platform: filters.platform }),
      ...(filters.category && { category: filters.category }),
      ...(filters.sortBy && { "sort-by": filters.sortBy }),
    });

    setAPIUrl(getFilteredFullUrl(searchParamsString));
  }, [filters.category, filters.platform, filters.sortBy]);

  return { setFilters, apiURL, filters, handleApplySearchParams };
};

export default useGamesFilter;

const getFilteredFullUrl = (queryParamsString: URLSearchParams) => {
  const url = new URL(BASE_URL);

  // if stringified query params is equal to empty string, it means all of the filters are undefined
  // return BASE_URL in this case
  if (queryParamsString.toString() === "") {
    return url.toString();
  }

  // at least one filter is available, return BASE_URL along with filter search params
  url.search = queryParamsString.toString();

  return url.toString();
};
