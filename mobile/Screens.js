import React, { useState, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ScreenRoutes } from "./ScreenRoutes";

import Auth from "./screens/Auth";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Feed from "./screens/Feed";
import Splash from "./components/Splash";
import Post from "./screens/Post";
import PostDetail from "./screens/PostDetail";
import UserPosts from "./screens/UserPosts";
import UserComments from "./screens/UserComments";
import PostForm from "./screens/PostForm";
import { checkAuthStatus } from "./utils/checkAuthStatus";

function TabBarIcon(props) {
  return <Ionicons size={30} {...props} />;
}

const Tab = createMaterialBottomTabNavigator();

export default function Screens(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check in localStorage (asyncStorage) if JWT, User or anything exists
    checkAuthStatus(setIsAuthenticated);
  }, []);

  if (isLoading) return <Splash setIsLoading={setIsLoading} />;

  return (
    <>
      {isAuthenticated ? (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={ScreenRoutes.Feed}
            shifting={false}
            labeled={true}
          >
            <Tab.Screen
              name={ScreenRoutes.Feed}
              component={FeedStackScreen}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name={ScreenRoutes.UserPosts}
              component={UserPostStackScreen}
              options={{
                tabBarLabel: "Posts",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="book" color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name={ScreenRoutes.UserComments}
              component={UserCommentStackScreen}
              options={{
                tabBarLabel: "Comment",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="comment"
                    color={color}
                    size={24}
                  />
                ),
              }}
            />
            <Tab.Screen
              name={ScreenRoutes.Profile}
              component={ProfileStackScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-circle"
                    color={color}
                    size={24}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStackScreen />
        </NavigationContainer>
      )}
    </>
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
    <FeedStack.Navigator headerMode="none">
      <FeedStack.Screen name={ScreenRoutes.Feed} component={Feed} />
      <FeedStack.Screen name={ScreenRoutes.PostForm} component={PostForm} />
      <FeedStack.Screen name={ScreenRoutes.Post} component={PostStackScreen} />
      <FeedStack.Screen name={ScreenRoutes.PostDetail} component={PostDetail} />
    </FeedStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name={ScreenRoutes.Profile} component={Profile} />
    </ProfileStack.Navigator>
  );
}

const PostStack = createStackNavigator();
function PostStackScreen() {
  return (
    <PostStack.Navigator headerMode="none">
      <PostsStack.Screen name={ScreenRoutes.Post} component={Post} />
    </PostStack.Navigator>
  );
}

const UserPostStack = createStackNavigator();
function UserPostStackScreen() {
  return (
    <UserPostStack.Navigator headerMode="none">
      <UserPostStack.Screen
        name={ScreenRoutes.UserPosts}
        component={UserPosts}
      />

      <UserPostStack.Screen
        name={ScreenRoutes.Post}
        component={PostStackScreen}
      />
    </UserPostStack.Navigator>
  );
}

const UserCommentStack = createStackNavigator();
function UserCommentStackScreen() {
  return (
    <UserCommentStack.Navigator headerMode="none">
      <UserCommentStack.Screen
        name={ScreenRoutes.Comment}
        component={UserComments}
      />
    </UserCommentStack.Navigator>
  );
}

// 1. PostsScreen -- lists of posts -- NO PARAMS
// 2. PostDetailScreen -- Post Detail -- Param: Post
// navigation.navigate("PostDetail", {
//   title: "asd",
//   descritpion: "idk",
//   location: {}
// })
// this going to be inserted into the param
