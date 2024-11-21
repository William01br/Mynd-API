export const isEmailValid = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  const passwordRegex = "^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*d)).{8,}$";
  return passwordRegex.test(password);
};
