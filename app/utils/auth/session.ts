import { createCookieSessionStorage, redirect } from "react-router";

/** Represents a user in the system */
type Session = { token: string };

/**
 * Creates a cookie-based session storage.
 * @see https://reactrouter.com/en/dev/utils/create-cookie-session-storage
 */
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["s3cret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export const { commitSession, destroySession } = sessionStorage;

/**
 * Retrieves the user session from the request.
 * @param   request - The incoming request.
 * @returns The user session.
 */
const getSession = async (request: Request) => {
  return await sessionStorage.getSession(request.headers.get("Cookie"));
};

/**
 * Logs out the user by destroying their session.
 * @param    request - The incoming request.
 * @returns  Redirect response after logout.
 */
export const logout = async (request: Request) => {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};

const TOKEN_SESSION_KEY = "token";

/**
 * Retrieves the token from the session.
 * @param   request - The incoming request.
 * @returns The token found, undefined otherwise.
 */
export const getToken = async (
  request: Request
): Promise<Session["token"] | undefined> => {
  const session = await getSession(request);
  const token = session.get(TOKEN_SESSION_KEY);
  return token;
};

/**
 * Creates a new user session.
 * @param    params - The parameters for creating the session.
 * @param    params.request - The incoming request.
 * @param    params.token - The token to store in the session.
 * @param    params.remember - Whether to create a persistent session.
 * @param    [params.redirectUrl] - The URL to redirect to after creating the session.
 * @returns  Redirect response with the new session cookie.
 */
export const createSession = async ({
  request,
  token,
  remember = true,
  redirectUrl,
}: {
  request: Request;
  token: string;
  remember?: boolean;
  redirectUrl?: string;
}) => {
  const session = await getSession(request);
  session.set(TOKEN_SESSION_KEY, token);
  return redirect(redirectUrl || "/", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
};
