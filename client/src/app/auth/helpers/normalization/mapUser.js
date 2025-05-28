const mapUser = (user) => {
    return {
      first: user.name.first,
      last: user.name.last,
      phone: user.phone,
      email: user.email,
    };
  };
  
  export default mapUser;
  