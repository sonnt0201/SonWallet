
import { createContext, useContext, useState } from "react";

export const DataContext = createContext();

export const useDataNum = () => useContext(DataContext);

export const DataProvider = ({children}) => {
    const [dataNum, setDataNum] = useState(0);
    
    return (<DataContext.Provider value={[dataNum, setDataNum]}>
        {children}
    </DataContext.Provider>)
}