import React from "react";
import { View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Home, HistoryPage, LoanPage} from "./components"
import { CommonActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export function BottomBar() {
  return (
    // <View style={[styles.container]}>
    <Tab.Navigator

      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

<Tab.Screen
        name="History"
        component={HistoryPage}
        options={{
          tabBarLabel: "Lịch sử",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="history" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Loan"
        component={LoanPage}
        options={{
          tabBarLabel: "Vay nợ",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="hand-coin" size={size} color={color} />;
          },
        }}
      />

<Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cogs" size={size} color={color} />;
          },
        }}
      />

      
    </Tab.Navigator>
    // </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
    // backgroundColor: theme.colors.background,

    alignItems: "center",
    justifyContent: "center",
  },
});
