import axios from "axios";
import { BACKEND_URL } from "@env";

export function getComments() {
  axios
    .get(`${BACKEND_URL}/comments`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function createNewComment(body, user, post_id) {
  axios
    .post(`${BACKEND_URL}/comments/`, body, user, post_id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function updateComment(body, user, id) {
  axios
    .put(`${BACKEND_URL}/comments/${id}`, body, user, id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getCommentsByAuthor(id, user) {
  axios
    .get(`${BACKEND_URL}/comments/author/${id}`, user, id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
