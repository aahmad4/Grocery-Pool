import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Surface, Text, Button, Avatar, Title } from "react-native-paper";
import Post from "./Post";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoutes } from "../ScreenRoutes";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { getSelfUser } from "../utils/getSelfUser";
import NativeIcon from "../components/NativeIcon";
import { getPosts } from "../api/posts";

const defaultValues = {
  title: "",
  description: "",
  address: "",
};

const postsData = [
  {
    _id: 1,
    title: "Post 1",
    description: "This is post 1",
    address: "1000 Location Pkway, Austin, TX",
    author: "author 1",
    comments: [
      {
        _id: 11,
        author: "comment author 1",
        description: "comment 1",
      },
    ],
  },
  {
    _id: 2,
    title: "Post 2",
    description: "This is post 2",
    address: "2000 Location Dr, Houston, TX",
    author: "author 2",
    comments: [
      {
        _id: 12,
        author: "comment author 1",
        description: "comment 1",
      },
      {
        _id: 13,
        author: "comment author 2",
        description: "comment 2",
      },
    ],
  },
];

export default function Feed(props) {
  const [posts, setPosts] = useState(postsData);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    let data = getPosts();
    setPosts(data);
  }, []);

  useEffect(() => {
    getSelfUser().then((selfUser) => {
      if (selfUser === null) navigation.navigate(ScreenRoutes.Auth);
      else setUser(selfUser);
    });
  }, []);

  return (
    <Layout navigation={props.navigation}>
      <View style={styles.initialContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>
              Hi {user?.name.split(" ")[0]},
            </Text>
            <Text style={styles.headerDescription}>
              Keep your groceries in check!
            </Text>
          </View>
          <View
            onPress={() => {
              console.log("navigatin");
              navigation.navigate(ScreenRoutes.Profile);
              console.log("wot");
            }}
          >
            <Avatar.Image
              style={styles.headerAvatar}
              size={50}
              source={require("../assets/person.jpg")}
            />
          </View>
        </View>
        <View style={styles.locationContainer}>
          <NativeIcon name="location-on" size={18} />
          <Text>
            {"  "}
            {user?.address}
          </Text>
        </View>
        <View style={styles.postTitleContainer}>
          <Title style={styles.postTitle}>Posts</Title>
          <Button
            mode="contained"
            compact
            onPress={() =>
              props.navigation.navigate(ScreenRoutes.PostForm, {
                post: defaultValues,
                formTitle: "Create a New Post",
              })
            }
          >
            Create New Post
          </Button>
        </View>
      </View>

      {posts.map((post) => (
        <Surface key={post._id + "_surface"}>
          <Post key={post._id} data={post} {...props} />
          <Button
            key={post._id + "_btn"}
            onPress={() =>
              props.navigation.navigate(ScreenRoutes.PostDetail, { post: post })
            }
          >
            View Details
          </Button>
        </Surface>
      ))}
    </Layout>
  );
}

const styles = StyleSheet.create({
  initialContainer: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerDescription: {
    fontSize: 14,
  },
  headerAvatar: {
    marginRight: 8,
  },
  locationContainer: {
    marginVertical: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  postTitleContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTitle: {
    fontSize: 28,
  },
  postCreateButton: {},
});
