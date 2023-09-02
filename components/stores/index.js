import { LatestTradeIDProvider,LatestTradeIDActions, useLatestTradeID } from "./latestTradeID"
import { Trade } from "./money"
export {LatestTradeIDActions, useLatestTradeID, Trade} 
export const StoresProvider = ({children}) => {
    return (
        <LatestTradeIDProvider>
            {children}
        </LatestTradeIDProvider>
    )
}