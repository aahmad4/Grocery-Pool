import React from "react";
import { Title, Paragraph, Avatar, Text } from "react-native-paper";
import { ScreenRoutes } from "../ScreenRoutes";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NativeIcon from "../components/NativeIcon";

export default function Post({ data: post }, ...props) {
  const navigation = useNavigation();
  const author = "author 1"; /* Corresponds to current user */

  /* TODO:  Call backend API with postID as a parameter */
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ScreenRoutes.PostDetail, { post })}
      style={styles.postContainer}
    >
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{
            uri: post.author.imageUrl,
          }}
          progressiveRenderingEnabled={true}
          size={55}
          style={styles.postAvatar}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.upperContainer}>
          <Text>{post.author.name}</Text>
          <Text style={styles.postTime}>{post.createdAt}</Text>
        </View>
        <Title style={styles.postTitle}>{post.title}</Title>
        <Text style={styles.postDescription}>
          {post.description.substring(0, 50) +
            (post.description.length > 50 ? "..." : "")}
        </Text>
        <View>
          <View style={styles.locationContainer}>
            <NativeIcon name="location-on" size={18} />
            <Text> {post.address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginLeft: 5,
    padding: 4,
  },
  contentContainer: {
    marginLeft: 16,
    width: "70%",
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationContainer: {
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  postTime: {
    fontWeight: "bold",
    fontSize: 14,
  },
  postTitle: {},
  postDescription: {},
  postAddress: {},
  postAuthor: {},
});
