
import { SafeAreaProvider } from "react-native-safe-area-context";


import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";

import {BottomBar} from "./BottomBar"
import { NavigationContainer } from "@react-navigation/native";
import  * as MColors from "react-native-paper/src/styles/themes/v2/colors";
import { StoresProvider } from "./components";
import { MoneyListener } from "./MoneyListener";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { initStorage, traceData } from "./utils";
import { AppHeader } from "./AppHeader";


 const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FAD6A5"
    // MColors.red300
    // "#FAD6A5",
    // ,
  },
};
// initStorage()
AsyncStorage.getItem("0").then(val => {
  if (!val) AsyncStorage.setItem("0", JSON.stringify(0))
})

export default function App() {
  // kiểm tra
  useEffect(() => {
    traceData()
  },[])

  return (
    <NavigationContainer>
    <PaperProvider theme={globalTheme}>
      <SafeAreaProvider>
        <StoresProvider>
            <AppHeader/>
            <BottomBar />
            <MoneyListener/>
        </StoresProvider>
      </SafeAreaProvider>
    </PaperProvider>
    </NavigationContainer>

    // <BottomBar/>
  );
}


