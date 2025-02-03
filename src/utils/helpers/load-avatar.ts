const loadAvatar = async () => {
  try {
    const timestamp = new Date().getTime();
    const avatarUrl = `https://robohash.org/${timestamp}.png?size=100x100`;

    return avatarUrl;
  } catch (error) {
    console.log("Error loading image:", error);
  }
};

export default loadAvatar;