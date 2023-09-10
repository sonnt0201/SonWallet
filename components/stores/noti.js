import { createContext, useContext, useEffect, useState } from "react";
import { DefaultTheme, Portal, Snackbar, Text } from "react-native-paper";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {


  

  const [notifications, setNotification] = useState([
    { content: "Chào mừng quay trở lại", isError: false },
  ]);

  

  return (
    <NotificationContext.Provider value={[notifications, setNotification]}>
      {children}
     
    </NotificationContext.Provider>
  );
};
