import { useDataNum, DataProvider } from "./data"
export const StoresProvider = ({children}) => {
    return (
        <DataProvider>
            {children}
        </DataProvider>
    )
}

export {useDataNum}