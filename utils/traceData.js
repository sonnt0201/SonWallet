import AsyncStorage from "@react-native-async-storage/async-storage";
export const traceData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log(await AsyncStorage.multiGet(keys))
  }