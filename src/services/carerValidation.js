const { string } = require("joi");
const Joi = require("joi");
const {
  phoneMethod,
  taxFileMethod,
} = require("../helpers/joiValidationHelpers");

const carerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    phone: Joi.string()
      .required()
      .min(10)
      .max(14)
      .custom(phoneMethod, "custom validation"),
    gender: Joi.string().required(),
    password: Joi.string().required().min(6),
    password2: Joi.string().required().min(6).valid(Joi.ref("password")),
    DOB: Joi.date().required(),
    address: Joi.string().min(18),
    geoLocation: Joi.object({
      type: Joi.string().default("Point"),
      coordinates: Joi.required(),
    }),
    languageSpoken: Joi.array().items(Joi.string()),
    emergencyContactName: Joi.string().required(),
    emergencyContactNumber: Joi.string()
      .required()
      .min(10)
      .max(14)
      .custom(phoneMethod, "custom validation"),
    emergencyContactRelationship: Joi.string().required(),
    emergencyContactAddress: Joi.string().min(18).required(),
    secondaryContactName: Joi.string().required(),
    secondaryContactNumber: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
    secondaryContactRelationship: Joi.string().required(),
    secondaryContactAddress: Joi.string().min(10).required(),
    taxFileNumber: Joi.string()
      .required()
      .min(10)
      .custom(taxFileMethod, "custom validation"),
    maidenName: Joi.string().required(),
    preferredName: Joi.string().required(),
  });

  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    phone: Joi.string()
      .required()
      .min(10)
      .custom(phoneMethod, "custom validation"),
  });

  return schema.validate(data);
};

module.exports = { carerValidation, updateValidation };
