import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Text,
  Button,
  Avatar,
  Title,
  Colors,
  Divider,
} from "react-native-paper";
import Post from "./Post";
import { ScreenRoutes } from "../ScreenRoutes";
import { View, StyleSheet } from "react-native";
import { getSelfUser } from "../utils/getSelfUser";
import NativeIcon from "../components/NativeIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getPosts } from "../api/posts";

const defaultValues = {
  title: "",
  description: "",
  address: "",
};

const postsData = [
  {
    _id: 1,
    title: "Binge @Kroger",
    description: "Going to Kroger at 5 today. Hit me up if you need anything!",
    address: "1000 Location Pkway, Austin, TX",
    createdAt: "8:43 PM",
    author: {
      _id: "1",
      name: "Darlene Alderson",
      imageUrl:
        "https://vignette.wikia.nocookie.net/mr-robot/images/f/ff/Darlene_Alderson.png/revision/latest?cb=20170520170749&path-prefix=fr",
    },
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
    title: "Walmart Shopping",
    description: "Going to walmart tomorrow at 6pm",
    address: "2000 Location Dr, Houston, TX",
    createdAt: "3:34 AM",
    author: {
      _id: "2",
      name: "Elliot Alderson",
      imageUrl:
        "https://vignette.wikia.nocookie.net/mr-robot/images/6/6e/Elliot_Alderson_(infobox).png/revision/latest?cb=20170520171651&path-prefix=fr",
    },
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

  useEffect(() => {
    let data = getPosts();
    setPosts(data);
  }, []);

  useEffect(() => {
    getSelfUser().then((selfUser) => {
      if (selfUser === null) props.navigation.navigate(ScreenRoutes.Auth);
      else setUser(selfUser);
    });
  }, []);

  return (
    <Layout navigation={props.navigation}>
      <View style={styles.initialContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>
              Hi {user?.username.split(" ")[0]},
            </Text>
            <Text style={styles.headerDescription}>
              Keep your groceries in check!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenRoutes.Profile);
            }}
          >
            <Avatar.Image
              style={styles.headerAvatar}
              size={55}
              source={require("../assets/person.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.locationContainer}>
          <NativeIcon name="location-on" size={18} />
          <Text> {user?.address}</Text>
        </View>
        <View style={styles.postTitleContainer}>
          <Title style={styles.postTitle}>Posts</Title>
          <Button
            mode="contained"
            compact
            color={Colors.blue900}
            onPress={() =>
              props.navigation.navigate(ScreenRoutes.PostForm, {
                post: defaultValues,
                formTitle: "Create a New Post",
              })
            }
          >
            New Post
          </Button>
        </View>
      </View>

      <View style={styles.postContainer}>
        {posts &&
          posts.map((post) => (
            <View key={post._id + "_view"}>
              <Post key={post._id} data={post} {...props} />
              <Divider style={styles.divider} />
              <Button
                key={post._id + "_btn"}
                onPress={() =>
                  props.navigation.navigate(ScreenRoutes.PostDetail, {
                    post: post,
                  })
                }
              >
                View Details
              </Button>
            </View>
          ))}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  initialContainer: {
    paddingHorizontal: 18,
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
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTitle: {
    fontSize: 28,
  },
  postContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  divider: {
    marginVertical: 20,
  },
});
