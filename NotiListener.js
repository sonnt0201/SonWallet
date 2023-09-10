import { useState, useEffect } from "react";
import { useNotification } from "./components/stores"
import { Portal, Snackbar, Text } from "react-native-paper";
import { COLOR_PRIMARY } from "./configs";

export const NotiListener = () => {

    const [noti, setNoti] = useNotification();
    const [notiVisible, setNotiVisible] = useState(true);
    const latestNoti = () => noti[noti.length - 1]
    const toggleVisible = () => {
      setNotiVisible(!notiVisible);
    };
    useEffect(() => {
        if (noti.length > 0) {
            // Show Snackbar when notifications change
            setNotiVisible(true);
        
            // Automatically hide the Snackbar after 5 seconds
            const timer = setTimeout(() => {
              setNotiVisible(false);
            }, 5000);
        
            return () => {
              clearTimeout(timer); // Clear the timer when component unmounts or notifications change again
            };
          }
       
     }, [noti]);

     return  <Portal >
     <Snackbar
       visible={notiVisible}
       onDismiss={toggleVisible}
       style={{
         position: "absolute",
         bottom: 80,
         backgroundColor: "#404258",
         
       }}
       // Set the text color to white

       action={{
         label: "Ẩn",
         labelStyle: {
           color: COLOR_PRIMARY,
         },
         onPress: () => {
           toggleVisible();
         },
       }}

       elevation={4}
     >
       <Text
         style={{
           color: latestNoti().isError
             ? "red"
             : "white",
         }}
       >
         {latestNoti().content}
       </Text>
     </Snackbar>
   </Portal>
}