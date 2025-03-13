import { redirect, Outlet } from "react-router";
import type { Route } from "./+types/protectedLayout";
import Navbar from "~/components/navbar";
import { getToken } from "~/utils/auth/session";

export const loader = async ({ request }: Route.LoaderArgs) => {
  // Check if the user is already logged in
  const token = await getToken(request);
  if (!token) {
    throw redirect("/login");
  } else {
    return { token };
  }
};

const ProtectedLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
