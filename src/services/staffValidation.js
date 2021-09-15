const Joi = require("joi");
const { phoneMethod } = require("../helpers/joiValidationHelpers");

const staffValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    password2: Joi.string().required().min(6).valid(Joi.ref("password")),
    phone: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
    gender: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string().required().min(15),
    geoLocation: Joi.object({
      type: Joi.string().required().valid("Point"),
      coordinates: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    }),
    languageSpoken: Joi.array().items(Joi.string().required()).required(),
    emergencyContactName: Joi.string().required().min(3).max(20),
    emergencyContactNumber: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
    emergencyContactRelationship: Joi.string().required().min(3).max(20),
    emergencyContactAddress: Joi.string().required().min(15),
    role: Joi.string().required().min(3).max(20),
    position: Joi.string().required().min(3).max(20),
    preferedName: Joi.string().required().min(3).max(20),
    accountNumber: Joi.number().unsafe().required(),
    bankId: Joi.number().unsafe().required(),
    taxFileNumber: Joi.number().unsafe().required(),
  });

  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    phone: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
    gender: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string().required().min(15),
    geoLocation: Joi.object({
      type: Joi.string().required().valid("Point"),
      coordinates: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    }),
    languageSpoken: Joi.array().items(Joi.string().required()).required(),
    emergencyContactName: Joi.string().required().min(3).max(20),
    emergencyContactNumber: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
    emergencyContactRelationship: Joi.string().required().min(3).max(20),
    emergencyContactAddress: Joi.string().required().min(15),
    role: Joi.string().required().min(3).max(20),
    position: Joi.string().required().min(3).max(20),
    preferedName: Joi.string().required().min(3).max(20),
    accountNumber: Joi.number().unsafe().required(),
    bankId: Joi.number().unsafe().required(),
    taxFileNumber: Joi.number().unsafe().required(),
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
