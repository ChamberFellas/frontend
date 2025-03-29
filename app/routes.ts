import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Auth routes require user to not be logged in or redirect to dashboard
  layout("routes/auth/authLayout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("forgot-password", "routes/auth/forgotPassword.tsx"),
    route("logout", "routes/auth/logout.tsx"),
  ]),

  route("reset-password/:token", "routes/auth/resetPassword.tsx"),
  route("join-house/:code", "routes/joinHouse.tsx"),

  // Protected routes require user to be logged in or redirect to login
  layout("routes/auth/protectedLayout.tsx", [
    route("dashboard", "routes/protected/dashboard.tsx"),
    route("account", "routes/protected/account.tsx"),
    route("settings", "routes/protected/settings.tsx"),
    route("house", "routes/protected/house.tsx"),


    layout("routes/protected/services/serviceLayout.tsx", [
      route("chores", "routes/protected/services/chores.tsx"),
      route("chores/add", "routes/protected/services/addChore.tsx"),
      route("bills", "routes/protected/services/bills.tsx"),
      route("bills/add", "routes/protected/services/addBills.tsx"), // Add this line
      route("user-settings", "routes/protected/services/userSettings.tsx"), // Add this line

    ]),
  ]),
] satisfies RouteConfig;