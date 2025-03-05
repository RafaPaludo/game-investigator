function generateShortRoomCode (length = 5) {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
};

export {
  generateShortRoomCode
}