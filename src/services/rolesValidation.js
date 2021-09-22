const Joi = require("joi");

const rolesValidation = (data) => {
  const schema = Joi.object()
    .required()
    .keys({
      adminModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      staffModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      financeModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      ndisModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      nagModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      careTakerModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      patientModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
      scheduleModule: Joi.object({
        enabled: Joi.boolean().default(false),
        read: Joi.boolean().default(false),
        write: Joi.boolean().default(false),
      }).required(),
    });

  return schema.validate(data);
};

module.exports = { rolesValidation };
