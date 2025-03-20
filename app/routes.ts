import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("logout", "routes/auth/logout.tsx"),

  route("forgot-password", "routes/auth/forgotPassword.tsx"),
  route("reset-password/:token", "routes/auth/resetPassword.tsx"),

  layout("routes/auth/protectedLayout.tsx", [
    route("dashboard", "routes/protected/dashboard.tsx"),
    route("account", "routes/protected/account.tsx"),
    route("settings", "routes/protected/settings.tsx"),

    layout("routes/protected/services/serviceLayout.tsx", [
      route("chores", "routes/protected/services/chores.tsx"),
      route("bills", "routes/protected/services/bills.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
