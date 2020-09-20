import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, Card, Paragraph, Surface, Title } from "react-native-paper";
import { ScreenRoutes } from "../ScreenRoutes";
import Comment from "./Comment";
import { getSelfUser } from "../utils/getSelfUser";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const defaultComment = {
  description: "",
};

export default function PostDetail(props) {
  const [user, setUser] = useState(null);
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
  const post = props.route.params.post;

  /* TODO:  Call backend API with postID as a parameter */

  useEffect(() => {
    getSelfUser().then((selfUser) => {
      if (selfUser === null) navigation.navigate(ScreenRoutes.Auth);
      else setUser(selfUser);
    });
  }, []);

  return (
    <Layout navigation={props.navigation}>
      <Surface>
        <Title title={post.title} />
        <Paragraph>{post.description}</Paragraph>
        {post.author._id === user?._id ? (
          <View>
            <Button
              mode="contained"
              onPress={() =>
                props.navigation.navigate(ScreenRoutes.PostForm, {
                  post: post,
                  formTitle: "Edit Post",
                })
              }
            >
              Edit
            </Button>
            <Button mode="contained">Delete</Button>
          </View>
        ) : null}
      </Surface>

      {/* TO DO: Display Posts Comments*/}
      <Button
        mode="contained"
        onPress={() =>
          props.navigation.navigate(ScreenRoutes.CommentForm, {
            comment: defaultComment,
            formTitle: "Leave a new Comment",
          })
        }
      >
        Leave a new comment
      </Button>
      {post.comments.map((comment) => (
        <Comment
          data={comment}
          key={comment._id}
          navigation={props.navigation}
        />
      ))}
    </Layout>
  );
}
