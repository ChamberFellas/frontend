import type { Config } from "@react-router/dev/config";

// Todo: Look into this to optimize data fetching
// https://reactrouter.com/start/framework/data-loading

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  future: {
    // Test stability of experimental features
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
  },
} satisfies Config;
