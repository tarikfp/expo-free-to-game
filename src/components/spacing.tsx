import * as React from "react";
import { View } from "react-native";

/**
 * @description
 * Reusable component which is used to handle layout styling
 */
type Props = {
  height?: number;
  width?: number;
  backgroundColor?: string;
};

const Spacing: React.FC<Props> = ({ height, backgroundColor, width }) => {
  // No need to use memoization here. As we are passing styles to host components(Text,View). Not to composite components.
  // See for more info: https://twitter.com/thymikee/status/1622994311141904384?s=20

  /*   const memoizedStyle = React.useMemo(
    () => ({ height, width, backgroundColor }),
    [backgroundColor, height, width],
  ); */

  return <View style={{ height, width, backgroundColor }} />;
};

export default Spacing;
