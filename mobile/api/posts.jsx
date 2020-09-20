import axios from "axios";
import { BACKEND_URL } from "@env";

export function getPosts() {
  axios
    .get(`${BACKEND_URL}/posts`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getPostById(id) {
  axios
    .get(`${BACKEND_URL}/posts/${id}`, id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function createNewPost(body) {
  axios
    .post(`${BACKEND_URL}/posts/`, body)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function updatePost(body, id) {
  axios
    .put(`${BACKEND_URL}/posts/${id}`, body, id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getPostsByAuthor(id, username) {
  axios
    .get(`${BACKEND_URL}/posts/author/${id}`, id, username)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
