import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "./screens/Auth";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Feed from "./screens/Feed";
import { ScreenRoutes } from "./ScreenRoutes";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function Screens() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={ScreenRoutes.Auth} component={Auth} />
        <Tab.Screen name={ScreenRoutes.Login} component={Login} />
        <Tab.Screen name={ScreenRoutes.Register} component={Register} />
        <Tab.Screen name={ScreenRoutes.Feed} component={Feed} />
        <Tab.Screen name={ScreenRoutes.Profile} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
