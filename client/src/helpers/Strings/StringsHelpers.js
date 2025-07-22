const ShortString = (str, length = 30) => {
  if (str && str.length > length) {
    return str.substring(0, length) + '...';
  }
  return str;
};

export { ShortString };