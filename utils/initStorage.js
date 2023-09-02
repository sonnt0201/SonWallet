import AsyncStorage from "@react-native-async-storage/async-storage";
import { traceData } from "./traceData";


export const initStorage = async() => {
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());

    // await AsyncStorage.multiSet([["wallet", "1000"],[ "latestTradeID","0"]])
    traceData()
}