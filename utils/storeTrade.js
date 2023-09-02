import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trade } from "../components/stores"
import { traceData } from "./traceData";

export const storeTrade = async({id, title, cost, isMoneySubtraction, isDebt}) => {

    try {
         // lấy date hiện tại
    const currentDate =new Date();
    const dateSaved = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    // lấy ví hiện tại
    const currentWallet = await JSON.parse(AsyncStorage.getItem("wallet"));
    console.log("currentWallet " + JSON.stringify(currentWallet))
    // tính số dư
    const balance = isMoneySubtraction ? (currentWallet - cost) : (currentWallet + cost)
    // lưu wallet mới
    await AsyncStorage.setItem("wallet",JSON.stringify(balance) );
    // tạo trade mới
    const trade = new Trade({
        title: title,
        cost: cost,
        date: dateSaved,
        isMoneySubtraction: isMoneySubtraction,
        balance: balance,
        isDebt: isDebt
    })
    // lưu trade
    AsyncStorage.setItem(JSON.stringify(id),JSON.stringify(trade));

    // kiem tra
    traceData();
    } catch (error ) {
        console.log("error in storing " )
    }

   
}