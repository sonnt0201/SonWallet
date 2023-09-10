import { useDataNum, DataProvider } from "./data";
import { NotificationProvider, useNotification } from "./noti";
export const StoresProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <DataProvider>{children}</DataProvider>
    </NotificationProvider>
  );
};

export { useDataNum, useNotification };
