import React from "react";
import Layout from "../components/Layout";
import Post from "./Post";
import { useNavigation } from "@react-navigation/native";

export default function UserPosts(props) {
  const navigation = useNavigation();

  /*TODO: Call backend API to populate with posts from logged in user*/
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
  ];

  return (
    <Layout navigation={props.navigation}>
      {posts.map((post) => (
        <Post key={post._id} data={post} {...props} />
      ))}
    </Layout>
  );
}
