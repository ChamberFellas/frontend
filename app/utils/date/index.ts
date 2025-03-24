// Function takes a time and formats it into now, 1 minute, 1 hour, 1 day, 1 week...
export const dateFormatter = (time_diff: number): string => {
  // The date is the difference between the current time and the given time
  // These will be likely large numbers

  if (time_diff < 60) {
    return "now";
  }

  if (time_diff < 3600) {
    return `${Math.floor(time_diff / 60)} minute${time_diff > 60 ? "s" : ""}`;
  }

  if (time_diff < 86400) {
    return `${Math.floor(time_diff / 3600)} hour${time_diff > 3600 ? "s" : ""}`;
  }

  if (time_diff < 604800) {
    return `${Math.floor(time_diff / 86400)} day${
      time_diff > 86400 ? "s" : ""
    }`;
  }

  if (time_diff < 2629746) {
    return `${Math.floor(time_diff / 604800)} week${
      time_diff > 604800 ? "s" : ""
    }`;
  }

  if (time_diff < 31556952) {
    return `${Math.floor(time_diff / 2629746)} month${
      time_diff > 2629746 ? "s" : ""
    }`;
  }

  return "long time";
};
