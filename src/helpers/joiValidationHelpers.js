const phoneMethod = (value, helpers) => {
  const regExp = /[a-zA-Z]/g;
  const regExp2 = /[$&,:;=?@#|'<>.^*()%!-]/g;

  // for example if the username value is (something) then it will throw an error with flowing message but it throws an error inside (value) object without error message. It should throw error inside the (error) object with a proper error message

  if (regExp.test(value) || regExp2.test(value)) {
    // return new Error("Phone number should not contain");
    return helpers.message({
      message: "custom validation",
      custom: '"phone" number should contain only numbers',
    });
  }

  // Return the value unchanged
  return value;
};

const taxFileMethod = (value, helpers) => {
  const regExp = /[a-zA-Z]/g;
  const regExp2 = /[$&,:;=?@#|'<>.^*()%!-]/g;

  // for example if the username value is (something) then it will throw an error with flowing message but it throws an error inside (value) object without error message. It should throw error inside the (error) object with a proper error message

  if (regExp.test(value) || regExp2.test(value)) {
    // return new Error("Phone number should not contain");
    return helpers.message({
      message: "custom validation",
      custom: '"taxfile" number should contain only numbers',
    });
  }

  // Return the value unchanged
  return value;
};

const passwordMethod = (value, helpers) => {
  const regExp = /[A-Z]/g;
  const regExp1 = /[0-9]/g;
  const regExp2 = /[$&+,:;=?@#|'<>.^*()%!-]/g;
  // for example if the username value is (something) then it will throw an error with flowing message but it throws an error inside (value) object without error message. It should throw error inside the (error) object with a proper error message

  if (!regExp.test(value)) {
    // return new Error("Phone number should not contain");
    return helpers.message({
      message: "custom validation",
      custom: '"password" must contain atleast one uppercase character',
    });
  }
  if (!regExp1.test(value)) {
    // return new Error("Phone number should not contain");
    return helpers.message({
      message: "custom validation",
      custom: '"password" must contain atleast one numeric character',
    });
  }
  if (!regExp2.test(value)) {
    // return new Error("Phone number should not contain");
    return helpers.message({
      message: "custom validation",
      custom: '"password" must contain atleast one special character',
    });
  }

  // Return the value unchanged
  return value;
};

module.exports = { phoneMethod, passwordMethod, taxFileMethod };
