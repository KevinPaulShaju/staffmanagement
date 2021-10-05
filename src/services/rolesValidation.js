const Joi = require("joi");

const validation = Joi.object({
  enabled: Joi.boolean().default(false),
  read: Joi.boolean().default(false),
  write: Joi.boolean().default(false),
}).required();

const rolesValidation = (data) => {
  const schema = Joi.object().required().keys({
    adminModule: validation,
    staffModule: validation,
    financeModule: validation,
    ndisModule: validation,
    nagModule: validation,
    careTakerModule: validation,
    patientModule: validation,
    scheduleModule: validation,
    supportCoordinatorModule: validation,
  });

  return schema.validate(data);
};

const newPermissionsValidation = (data) => {
  const schema = Joi.object().required().keys({
    role: Joi.string().required(),
    adminModule: validation,
    staffModule: validation,
    financeModule: validation,
    ndisModule: validation,
    nagModule: validation,
    careTakerModule: validation,
    patientModule: validation,
    scheduleModule: validation,
    supportCoordinatorModule: validation,
  });

  return schema.validate(data);
};

module.exports = { rolesValidation, newPermissionsValidation };
