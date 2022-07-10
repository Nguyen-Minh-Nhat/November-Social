import store from "../redux/store";
const createImgUrl = (file) => {
  if (file && file["type"].split("/")[0] === "image") {
    const url = URL.createObjectURL(file);
    return url;
  }
  return null;
};

const getDiffTime = (startDate, endDate = new Date()) => {
  var diffMs = endDate - startDate; // milliseconds between now & Christmas
  var diffDays = Math.floor(diffMs / 86400000); // days
  if (diffDays > 0) {
    if (diffDays === 1) return diffDays + " day ago";
    return diffDays + " days ago";
  }
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  if (diffHrs > 0) {
    if (diffHrs === 1) return diffHrs + " hour ago";
    return diffHrs + " hours ago";
  }
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  if (diffMins > 0) {
    if (diffMins === 1) return diffMins + " minute ago";
    return diffMins + " minutes ago";
  }
  return "just now";
};

const checkIncludesCurrentUser = (userIds) => {
  const user = store.getState().auth.user;
  return userIds.includes(user._id);
};

export { createImgUrl, getDiffTime, checkIncludesCurrentUser };
