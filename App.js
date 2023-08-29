import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Home } from "./components";
import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { BottomBar } from "./components/bottombar";
import { NavigationContainer } from "@react-navigation/native";

export const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  
  return (
    <PaperProvider theme={globalTheme}>
      <SafeAreaProvider>
      
          <NavigationContainer>
            <BottomBar />
          </NavigationContainer>
       
      </SafeAreaProvider>
    </PaperProvider>

    // <BottomBar/>
  );
}


