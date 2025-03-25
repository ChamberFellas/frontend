import type { Route } from "./+types/home";
import Welcome from "../pages/welcome";
import { getToken } from "~/utils/auth/session";

export const meta = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export const loader = async ({
  request,
}: Route.LoaderArgs): Promise<boolean> => {
  const token = await getToken(request);
  return !!token;
};

const Home = () => {
  return <Welcome />;
};

export default Home;
