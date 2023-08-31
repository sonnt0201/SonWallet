import { createContext, useContext, useReducer } from "react";

const MoneyContext = createContext();

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
    type: MoneyActions.ADD_TRADE,
    trade: new Trade({params})
}
*/

// TO-DO: when implementing multi-wallet, change array index 0 into action.trade.walletID
const moneyReducer = (money, action) => {
  switch (action.type) {
    case MoneyActions.ADD_TRADE:
      const newTradeID = money.latestTradeID + 1;
      money[newTradeID] = action.trade ;
      if (action.trade.isMoneySubtraction){
        money.wallets[0] = action.trade.balance;
      }
    break;
    
    default: break
  }
};

export const useMoney = () => useContext(MoneyContext)

export const MoneyProvider = ({ children }) => {
  const [money, dispatchMoney] = useReducer(moneyReducer, moneyInit);

  return <MoneyContext.Provider value={[money, dispatchMoney]}>{children}</MoneyContext.Provider>;
};

export class Trade {
  constructor({
    title,
    cost,
    date,
    isMoneySubtraction,
    isDebt,
    walletID,
    balance,
  }) {
    this.title = title;
    this.cost = cost;
    this.date = date;
    this.isMoneySubtraction = isMoneySubtraction;
    this.isDebt = isDebt;
    this.walletID = walletID;
    this.balance = balance;
  }
}

export const MoneyActions = Object.freeze({
  ADD_TRADE: "add",
  REMOVE_LATEST_TRADE: "remove-latest-trade",
});
