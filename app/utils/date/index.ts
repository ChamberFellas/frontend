// Function takes a time difference in seconds and formats it into now, 1 minute, 1 hour, 1 day, 1 week...
export const dateFormatter = (time_diff: number): string => {
  // Ensure the time difference is positive
  time_diff = Math.abs(time_diff);

  if (time_diff < 60) {
    return "now";
  }

  if (time_diff < 3600) {
    return `${Math.floor(time_diff / 60)} minute${Math.floor(time_diff / 60) > 1 ? "s" : ""}`;
  }

  if (time_diff < 86400) {
    return `${Math.floor(time_diff / 3600)} hour${Math.floor(time_diff / 3600) > 1 ? "s" : ""}`;
  }

  if (time_diff < 604800) {
    return `${Math.floor(time_diff / 86400)} day${Math.floor(time_diff / 86400) > 1 ? "s" : ""}`;
  }

  if (time_diff < 2629746) {
    return `${Math.floor(time_diff / 604800)} week${Math.floor(time_diff / 604800) > 1 ? "s" : ""}`;
  }

  if (time_diff < 31556952) {
    return `${Math.floor(time_diff / 2629746)} month${Math.floor(time_diff / 2629746) > 1 ? "s" : ""}`;
  }

  return "a long time ago";
};