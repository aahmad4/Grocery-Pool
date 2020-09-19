import React, { useState, useEffect } from "react";
import Auth from "./screens/Auth";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Feed from "./screens/Feed";
import { ScreenRoutes } from "./ScreenRoutes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./components/Splash";

const Tab = createMaterialTopTabNavigator();

export default function Screens() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isLoading) return <Splash setIsLoading={setIsLoading} />;

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen name={ScreenRoutes.Feed} component={FeedStackScreen} />
          <Tab.Screen
            name={ScreenRoutes.Profile}
            component={ProfileStackScreen}
          />
        </Tab.Navigator>
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
}

const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name={ScreenRoutes.Auth} component={Auth} />
      <AuthStack.Screen name={ScreenRoutes.Login} component={Login} />
      <AuthStack.Screen name={ScreenRoutes.Register} component={Register} />
    </AuthStack.Navigator>
  );
}

const FeedStack = createStackNavigator();
function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name={ScreenRoutes.Feed} component={Feed} />
    </FeedStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name={ScreenRoutes.Profile} component={Profile} />
    </ProfileStack.Navigator>
  );
}
