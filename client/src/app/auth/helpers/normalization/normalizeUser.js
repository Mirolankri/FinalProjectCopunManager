const normalizeUser = (user) => ({
  name: {
    first: user.first,
    last: user.last,
  },
  phone: user.phone,
  email: user.email,
  password: user.password,
});

export default normalizeUser;
