import { getToken } from "~/utils/auth/session";
import type { Route } from "./+types/joinHouse";
import { Link } from "react-router";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Join House" },
    { name: "description", content: "Join a house you're invited to" },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const inviteCode = params.code;
  if (!inviteCode) {
    throw new Error("No code provided");
  }

  const token = await getToken(request);

  return {
    token,
    inviteCode,
  };
};

const JoinHousePage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div>
      <h1>Join House</h1>
      <p>Join a house you're invited to</p>
      {loaderData.token ? (
        <></>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default JoinHousePage;
