const Joi = require("joi");
const { phoneMethod } = require("../helpers/joiValidationHelpers");

const staffValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(10).custom(phoneMethod, "custom validation"),
    gender: Joi.string().required(),
    role: Joi.string(),
    password: Joi.string().required().min(6),
    password2: Joi.string().required().min(6).valid(Joi.ref("password")),
  });

  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phone: Joi.string().required().min(10).custom(phoneMethod, "custom validation"),
  });

  return schema.validate(data);
};

const passwordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6),
    password2: Joi.string().required().min(6).valid(Joi.ref("password")),
  });

  return schema.validate(data);
};

module.exports = { staffValidation, passwordValidation, updateValidation };
