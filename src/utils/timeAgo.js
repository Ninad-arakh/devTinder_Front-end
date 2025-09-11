export const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);   // rough estimate
  const years = Math.floor(days / 365);
  const decades = Math.floor(years / 10);
  const centuries = Math.floor(years / 100);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (weeks < 5) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (years < 10) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (decades < 10) {
    return `${decades} decade${decades > 1 ? "s" : ""} ago`;
  } else {
    return `${centuries} century${centuries > 1 ? "s" : ""} ago`;
  }
};
