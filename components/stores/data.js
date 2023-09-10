import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const DataContext = createContext();

export const useDataNum = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((pairs) => {
       
        setDataNum(pairs ? pairs.length : 1);
      
      });
    });
  }, []);

  const [dataNum, setDataNum] = useState(0);

  return (
    <DataContext.Provider value={[dataNum, setDataNum]}>
      {children}
    </DataContext.Provider>
  );
};
