import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Surface,
  Text,
  Button,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { ScreenRoutes } from "../ScreenRoutes";
import Comment from "./Comment";

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
  return (
    <Layout navigation={props.navigation}>
      <Card>
        <Card.Title title={post.title} />
        <Card.Content>
          <Paragraph>{post.description}</Paragraph>
        </Card.Content>
        {post.author == user ? (
          <Card.Actions>
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
          </Card.Actions>
        ) : null}
      </Card>
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
