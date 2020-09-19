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
import { useNavigation } from "@react-navigation/native";

export default function Post({ navigation, data: post }, ...props) {
  const author = "author 1"; /* Corresponds to current user */
  /* TODO:  Call backend API with postID as a parameter */
  return (
    <Layout navigation={props.navigation}>
      <Card>
        <Card.Title title={post.title} />
        <Card.Content>
          <Paragraph>{post.description}</Paragraph>
        </Card.Content>
      </Card>
    </Layout>
  );
}
