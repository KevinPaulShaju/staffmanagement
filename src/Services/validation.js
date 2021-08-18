const Joi = require("joi");

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(10).custom(method, "custom validation"),
    gender: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().required().min(6),
    password2: Joi.string().required().min(6).valid(Joi.ref("password")),
  });

  return schema.validate(data);
};


const regExp = /[a-zA-Z]/g;

const method = (value, helpers) => {
  // for example if the username value is (something) then it will throw an error with flowing message but it throws an error inside (value) object without error message. It should throw error inside the (error) object with a proper error message
  
  if (regExp.test(value)) {
    // return new Error("Phone number should not contain");
    return helpers.message({
      message: "custom validation",
      custom: '"phone" number should contain only numbers',
    });
  }
  
  // Return the value unchanged
  return value;
};

module.exports = userValidation;