import { redirect, Outlet } from "react-router";
import type { Route } from "./+types/protectedLayout";
import { getToken } from "~/utils/auth/session";

export const loader = async ({ request }: Route.LoaderArgs) => {
  // Check if the user is already logged in
  const token = await getToken(request);
  if (token) {
    throw redirect("/dashboard");
  }

  return null;
};

const AuthLayout = () => {
  return <Outlet />;
};

export default AuthLayout;
