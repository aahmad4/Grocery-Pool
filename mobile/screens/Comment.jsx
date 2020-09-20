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

export default function Comment(props) {
  const author = "author 1"; /* Corresponds to current user */

  /* TODO:  comment should be replaced with commentID (PostDetail will pass in commentID)
  Call backend API with commentID as a parameter to fetch comment details */
  const { data: comment } = props;

  return (
    <Card>
      <Card.Content>
        <Title>{comment.author}</Title>
        <Paragraph>{comment.description}</Paragraph>
      </Card.Content>
      {/* {comment.author == author ? () : null} */}
      <Card.Actions>
        <Button
          compact
          mode="contained"
          onPress={() =>
            props.navigation.navigate(ScreenRoutes.CommentForm, {
              comment: comment,
              formTitle: "Edit Comment",
            })
          }
        >
          Edit
        </Button>
        <Button compact mode="contained">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
}
