export const sliceString = (string) => {
  const index = string.lastIndexOf("?");

  if (index === -1) return string;
  return string.slice(0, index);
};
