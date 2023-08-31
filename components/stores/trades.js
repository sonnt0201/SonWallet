import { createContext, useReducer} from "react";

const TradesContext = createContext();



export const TradesProvider = ({children}) => {
    const [trades, dispatchTrades] = useReducer(tradesReducer, tradesInit);
    return <TradesContext.Provider>
        {children}
    </TradesContext.Provider>
}