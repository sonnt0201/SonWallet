import AsyncStorage from "@react-native-async-storage/async-storage";
import { traceData } from "./traceData";


export const initStorage = async() => {
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
    
    // traceData()
}