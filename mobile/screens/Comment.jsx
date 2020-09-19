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

export default function Comment(props, { route }) {
  const author = "author 1"; /* Corresponds to current user */
  const { commentID } = route.params;
  /* TODO:  Call backend API with commentID as a parameter to fetch comment details*/
  const { comment } = commentID;

  return (
    <Layout navigation={props.navigation}>
      <Card>
        <Card.Title title={comment.title} />
        <Card.Content>
          <Title>{comment.title}</Title>
          <Paragraph>{comment.description}</Paragraph>
        </Card.Content>
        {comment.author == author ? (
          <Card.Actions>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </Card.Actions>
        ) : null}
      </Card>
      ))
    </Layout>
  );
}
