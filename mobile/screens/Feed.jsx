import React from "react";
import Layout from "../components/Layout";
import {
  Surface,
  Text,
  Button,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import Post from "./Post";
import { useNavigation } from "@react-navigation/native";
import { ScreenRoutes } from "../ScreenRoutes";

const defaultValues = {
  title: "",
  description: "",
  address: "",
};

export default function Feed(props) {
  /*TODO: Call backend API to populate all posts*/
  const posts = [
    {
      _id: 1,
      title: "Post 1",
      description: "This is post 1",
      address: "1000 Location Pkway, Austin, TX",
      author: "author 1",
      comments: [
        {
          title: "comment 1",
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
          title: "comment 1",
          title: "comment 2",
        },
      ],
    },
  ];

  return (
    <Layout navigation={props.navigation}>
      <Button
        mode="contained"
        compact
        onPress={() =>
          props.navigation.navigate(ScreenRoutes.PostForm, {
            post: defaultValues,
          })
        }
      >
        Create New Post
      </Button>
      {posts.map((post) => (
        <Surface key={post._id + "_surface"}>
          <Post key={post._id} data={post} {...props} />
          <Button
            key={post._id + "_btn"}
            onPress={() => props.navigation.navigate(ScreenRoutes.PostDetail)}
          >
            View Details
          </Button>
        </Surface>
      ))}
    </Layout>
  );
}
