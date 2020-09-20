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
import { ScreenRoutes } from "../ScreenRoutes";
import Comment from "./Comment";

export default function PostDetail(props) {
  const author = "author 2"; /* Corresponds to current user */
  /* TODO:  Call backend API with postID as a parameter */
  const post = props.route.params.post;
  return (
    <Layout navigation={props.navigation}>
      <Card>
        <Card.Title title={post.title} />
        <Card.Content>
          <Paragraph>{post.description}</Paragraph>
        </Card.Content>
        {/* {post.author == author ? () : null} */}
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
      </Card>
      {/* TO DO: Display Posts Comments*/}
      {post.comments.map((comment) => (
        <Comment data={comment} key={comment._id} />
      ))}
    </Layout>
  );
}
