import { type MetaFunction } from "react-router";
import { redirect } from "react-router";
import type { Route } from "./+types/logout";
import { logout } from "~/utils/auth/session";

/**
 * Defines metadata for the logout route.
 *
 * @returns An array of metadata objects for the route.
 * @see https://reactrouter.com/en/dev/route/meta
 */
export const meta: MetaFunction = () => {
  return [
    { title: "Logging Out" },
    { name: "description", content: "Logging out..." },
  ];
};

/**
 * Action function for the logout route.
 * Handles the logout process when a POST request is made to this route.
 *
 * @param   params - The action arguments.
 * @returns Redirect response after logging out.
 * @see     https://reactrouter.com/en/dev/route/action
 */
export const action = async ({ request }: Route.ActionArgs) => {
  return await logout(request);
};

/**
 * Loader function for the logout route.
 * Redirects to the login page if accessed directly.
 *
 * @param   params - The loader arguments.
 * @returns Redirect response to the login page.
 * @see     https://reactrouter.com/en/dev/route/loader
 */
export async function loader({ request }: Route.LoaderArgs) {
  return redirect("/login");
}
