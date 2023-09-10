
import { SafeAreaProvider } from "react-native-safe-area-context";
import { globalTheme } from "./configs";

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
import { COLOR_PRIMARY } from "./configs";
import { NotiListener } from "./NotiListener";


 
// initStorage()


export default function App() {
  // kiểm tra
  useEffect(() => {
    // traceData()
  },[])

  return (
    <NavigationContainer>
    <PaperProvider theme={globalTheme}>
      <SafeAreaProvider>
        <StoresProvider>
            <AppHeader/>
            <BottomBar />
            <NotiListener/>
            <MoneyListener/>
        </StoresProvider>
      </SafeAreaProvider>
    </PaperProvider>
    </NavigationContainer>

    // <BottomBar/>
  );
}


