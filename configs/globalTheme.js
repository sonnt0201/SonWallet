import { COLOR_PRIMARY } from "./colors";
import {  MD3DarkTheme } from "react-native-paper";
export const globalTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: COLOR_PRIMARY
      // MColors.red300
      // "#FAD6A5",
      // ,
    },
  };