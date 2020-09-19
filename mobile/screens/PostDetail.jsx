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

export default function PostDetail(props, { route }) {
  const author = "author 1"; /* Corresponds to current user */
  /* TODO:  Call backend API with postID as a parameter */

  const defaultPost = {
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
  };
  const post = defaultPost;
  return (
    <Layout navigation={props.navigation}>
      <Card>
        <Card.Title title={post.title} />
        <Card.Content>
          <Paragraph>{post.description}</Paragraph>
        </Card.Content>
        {post.author == author ? (
          <Card.Actions>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </Card.Actions>
        ) : null}
      </Card>
      {/* TO DO: Display Posts Comments*/}
    </Layout>
  );
}
