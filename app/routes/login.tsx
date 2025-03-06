import type { Route } from "./+types/home";
import Login from "../pages/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "User login page" },
  ];
}

export default Login;
