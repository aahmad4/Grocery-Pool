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
import Post from "./screens/Post";
import PostDetail from "./screens/PostDetail";
import UserPosts from "./screens/UserPosts";
import UserComments from "./screens/UserComments";
import PostForm from "./screens/PostForm";

const Tab = createMaterialTopTabNavigator();

export default function Screens() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check in localStorage (asyncStorage) if JWT, User or anything exists
    setIsAuthenticated(true);
  }, []);

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
          <Tab.Screen
            name={ScreenRoutes.UserPosts}
            component={UserPostStackScreen}
          />
          <Tab.Screen
            name={ScreenRoutes.UserComments}
            component={UserCommentStackScreen}
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
      <FeedStack.Screen name={ScreenRoutes.PostForm} component={PostForm} />
      <FeedStack.Screen name={ScreenRoutes.Post} component={PostStackScreen} />
      <FeedStack.Screen name={ScreenRoutes.PostDetail} component={PostDetail} />
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

const PostStack = createStackNavigator();
function PostStackScreen() {
  return (
    <PostStack.Navigator>
      <PostsStack.Screen name={ScreenRoutes.Post} component={Post} />
    </PostStack.Navigator>
  );
}

const UserPostStack = createStackNavigator();
function UserPostStackScreen() {
  return (
    <UserPostStack.Navigator>
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
    <UserCommentStack.Navigator>
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
