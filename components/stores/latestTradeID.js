import { createContext, useContext, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LatestTradeIDContext = createContext();

/*
const object = {
  wallets : [123],
  walletsNames: ["wallet"],
  latestTradeID: 12,
  0: "a",
  1: "f",
  2: "g",
  3 : "b",
  12: "h"
}

action = {
    type: latestTradeIDActions.ADD_TRADE,
    trade: new Trade({params})
}
*/

// TO-DO: when implementing multi-wallet, change array index 0 into action.trade.walletID


export const useLatestTradeID = () => useContext(LatestTradeIDContext);

export const LatestTradeIDProvider = ({ children }) => {
  const [latestTradeID, setLatestTradeID] = useState();

  return (
    <LatestTradeIDContext.Provider
      value={[latestTradeID, setLatestTradeID]}
    >
      {children}
    </LatestTradeIDContext.Provider>
  );
};


