import { StyleSheet, ViewStyle } from "react-native";
import { CONSTANTS as $c } from "../../utils/constants";

interface Styles {
  splash: ViewStyle;
}

export default StyleSheet.create<Styles>({
  splash: {
    flex: 1,
    backgroundColor: $c.colors.primary,
  },
});
