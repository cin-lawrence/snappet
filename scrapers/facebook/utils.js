const getGroupPermalink = (groupIdOrName, postId) => (
  `https://www.facebook.com/groups/${groupIdOrName}/permalink/${postId}`
);

module.exports = {
  getGroupPermalink,
};
