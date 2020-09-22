import { DefaultTheme } from "@react-navigation/native";
import colors from "../app/config/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
