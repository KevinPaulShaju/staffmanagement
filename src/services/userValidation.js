const { string } = require("joi");
const Joi = require("joi");
const {
  phoneMethod,
  taxFileMethod,
} = require("../helpers/joiValidationHelpers");

const userValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(20),
    lastName: Joi.string().required().min(3).max(20),
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
    }).required(),
    languageSpoken: Joi.array().items(Joi.string().required()).required(),
    emergencyContactName: Joi.string().required().min(3).max(20),
    emergencyContactNumber: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
    emergencyContactRelationship: Joi.string().required().min(3).max(20),
    emergencyContactAddress: Joi.string().required().min(15),
    ndicNumber: Joi.number().unsafe().required(),
    tacNumber: Joi.number().unsafe().required(),
    // taxFileNumber: Joi.number().unsafe().required(),
    // maidenName: Joi.string().required().min(3).max(20),
    // preferedName: Joi.string().required().min(3).max(20),
    // isNDIC: Joi.boolean().valid(true, false).required(),
    // isReferred: Joi.boolean().valid(true, false).required(),
  });

  return schema.validate(data);
};

const userUpdateValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(20),
    lastName: Joi.string().required().min(3).max(20),
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
    taxFileNumber: Joi.number().unsafe().required(),
    maidenName: Joi.string().required().min(3).max(20),
    preferedName: Joi.string().required().min(3).max(20),
    isNDIC: Joi.boolean().valid(true, false).required(),
    isReferred: Joi.boolean().valid(true, false).required(),
  });

  return schema.validate(data);
};

module.exports = { userValidation, userUpdateValidation };
