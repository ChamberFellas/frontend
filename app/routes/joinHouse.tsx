import { getToken } from "~/utils/auth/session";
import type { Route } from "./+types/joinHouse";
import { Link } from "react-router";
import welcomeImage from "./../assets/welcomeImage.jpg"; // Import the image
import "../styles/joinHouse-style.scss"; // Correct the SCSS file path

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
    <div className="join-house-container">
      <h1>Join The House?</h1>
      <p>Felix has invited you to a House!</p>
      {loaderData.token ? (
        <div className="button-container">
          <button className="accept-button">Accept</button>
          <button className="reject-button">Reject</button>
        </div>
      ) : (
        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
 )}
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />

    </div>
  );
};

export default JoinHousePage;