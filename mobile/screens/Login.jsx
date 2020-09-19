import React from "react";
import useSWR from "swr";
import loginUser from "../api/login";

export default function Login() {
  const { user, error } = useSWR("login", loginUser);
}
