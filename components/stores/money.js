import { createContext, useContext, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const MoneyContext = createContext();

/*
const object = {
  wallets : [123],
  walletsNames: ["wallet"],
  lastTradeID: 12,
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


export class Trade {
  constructor({
    title,
    cost,
    date,
    isMoneySubtraction,
    isDebt,
   
    balance,
  }) {
    this.title = title;
    this.cost = cost;
    this.date = date;
    this.isMoneySubtraction = isMoneySubtraction;
    this.isDebt = isDebt;
    
    this.balance = balance;
  }
}

export const MoneyActions = Object.freeze({
  ADD_TRADE: "add",
  REMOVE_LATEST_TRADE: "remove-latest-trade",
});
