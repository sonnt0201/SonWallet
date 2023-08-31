
import { SafeAreaProvider } from "react-native-safe-area-context";


import { PaperProvider, DefaultTheme, MD3DarkTheme } from "react-native-paper";

import {BottomBar} from "./BottomBar"
import { NavigationContainer } from "@react-navigation/native";
import  * as MColors from "react-native-paper/src/styles/themes/v2/colors";

 const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: MColors.red300
    // "#FAD6A5",
    // ,
  },
};

export default function App() {
  
  return (
    <NavigationContainer>
    <PaperProvider theme={globalTheme}>
      <SafeAreaProvider>
      
         
            <BottomBar />
          
       
      </SafeAreaProvider>
    </PaperProvider>
    </NavigationContainer>

    // <BottomBar/>
  );
}


