import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home } from './components';
import { PaperProvider, DefaultTheme,MD3DarkTheme} from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
   
  },
};

export default function App() {

  // const theme = useTheme()

  return (
    <PaperProvider theme={theme} >
       <SafeAreaProvider>
      <View style={[styles.container, ]}>
      <Home/>
    </View>
   </SafeAreaProvider>
    </PaperProvider>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
